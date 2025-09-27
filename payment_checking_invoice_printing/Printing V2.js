// Define constants for various sheet and folder names used in the script
const APP_TITLE = 'Generate Receipts for Customer';
const OUTPUT_FOLDER_NAME = 'Student Receipts';
const TRANSACTIONS_SHEET_NAME = 'Transactions';
const INVOICES_SHEET_NAME = 'Issued Receipt';
const INVOICE_TEMPLATE_SHEET_NAME = 'Receipt Template';
const PRINT_SHEET_NAME = 'Print Sheet';
const DATA_SHEET_NAME = 'Reciept Data Check';
const destinationcolumn = "Print Check";
const dissuedinvoice = "Issued Invoice ID";
const dissueddate = "Issued Date";
const tissuestatus="Issued Status";
const INVOICE_TEMPLATE_SHEET_NAME_2 = 'Receipt Template.v2';


// Define a function to print a transaction receipt for a student
function printTransaction2() {
  console.log('Function: printTransaction');

  // Get the active spreadsheet and the various sheets needed for the script
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transactionsSheet = ss.getSheetByName(TRANSACTIONS_SHEET_NAME);
  const printSheet = ss.getSheetByName(PRINT_SHEET_NAME);
  const invoiceTemplateSheet = ss.getSheetByName(INVOICE_TEMPLATE_SHEET_NAME_2);
  const invoicesSheet = ss.getSheetByName(INVOICES_SHEET_NAME);
  const dataSheet = ss.getSheetByName(DATA_SHEET_NAME);
  const yesCountCell = dataSheet.getRange('B2');
  const yesCount = yesCountCell.getValue();
  var invoiceidcol = "Invoice ID";
  
  // Remove the filter, if it exists
  var filter = transactionsSheet.getFilter();

  if (filter) {
    filter.remove();
  }

  if (!transactionsSheet || !printSheet || !invoiceTemplateSheet || !invoicesSheet || !dataSheet) {
    console.log("Required sheets not found. Please ensure all required sheets exist.");
    ss.toast("Required sheets not found. Please ensure all required sheets exist.", APP_TITLE, 5);
    return;
  }

  console.log('Getting data from sheets...');
  ss.toast('Getting data from sheets...', APP_TITLE, -1);
  const transId = printSheet.getRange('A2').getValue();
  console.log('getting transaction');
  const transactions = findidInSpecificSheet();
  const transaction = transactions[0];

  if (!transId) {
    console.log("Transaction ID not provided. Please enter a valid Transaction ID.");
    ss.toast("Transaction ID not provided. Please enter a valid Transaction ID.", APP_TITLE, 5);
    return;
  }
  invoiceTemplateSheet.showSheet();


  Logger.log(transaction);
  console.log('tdata');
  var headerRow = transactionsSheet.getRange(1, 1, 1, transactionsSheet.getLastColumn()).getValues()[0];
  var invoiceindex = headerRow.indexOf(invoiceidcol); // Add 1 to convert to 1-based index
  const tData = transactionsSheet.getRange('A2:U').getValues();
  const dataList = tData.map(x => x[invoiceindex]);
  const index = dataList.indexOf(transId);
  console.log('checking tData and index');
  Logger.log(index);
  console.log('index');


//  if (!transaction) {
//    ss.toast(`Transaction ID ${transId} not found in the Transactions sheet. Please check and try again.`, 'Print Transaction', 5);
//    Logger.log(`Transaction ID ${transId} not found in the Transactions sheet.`);
//    return;
//  }
  console.log(transaction.issued_status);
  const iStatus = transaction.issued_status;
  const aStatus = transaction.approved_status;
  const tinvoiceid = transaction.invoice_id;
  Logger.log(transaction.student_name);
  Logger.log(aStatus);

  console.log('Checking if the student has already been issued a receipt...');
  ss.toast('Checking if the student has already been issued a receipt...', 'Print Transaction', -1);
  // Check if the student has already been issued a receipt for this transaction ID
  if (iStatus === 'Yes') {
    ss.toast(`Duplicate request for Transaction ID ${transId}`, 'Print Transaction', 5);
    Logger.log(`Duplicate request for Transaction ID ${transId}`);
    return;
  }

  console.log('Checking if the student has not been issued a receipt yet and if the transaction has been completed...');
  ss.toast('Checking if the student has not been issued a receipt yet and if the transaction has been completed...', 'Print Transaction', -1);
  // If the student has not been issued a receipt yet, and if the transaction has been completed, create invoices
  if (iStatus === 'No' && aStatus === 'Yes') {
    ss.toast('Creating Invoices', 'Print Transaction', -1);
    Logger.log('Creating Invoices');
    const invoices = [];

    // Create an invoice for the current transaction and add it to the list of invoices
    const invoice = createInvoiceForStudent(transaction, invoiceTemplateSheet, ss.getId());
    if (invoice) {
      invoices.push(invoice);
    }
    console.log('checking invoice'),
    Logger.log(invoice);

    console.log('Checking if there are any invoices to add...');
    ss.toast('Checking if there are any invoices to add...', 'Print Transaction', -1);
    // If there are any invoices, add them to the invoices sheet
    if (invoices.length > 0) {
      ss.toast(`Adding ${invoices.length} invoices to the Invoices sheet...`, 'Print Transaction', -1);
      Logger.log(`Adding ${invoices.length} invoices to the Invoices sheet...`);
      invoicesSheet.getRange(yesCount + 1, 1, invoices.length, invoices[0].length).setValues(invoices);
    }
    const tissuestatusindex=getdHeaderIndex(tissuestatus,transactionsSheet);

    // Update the transaction sheet to indicate that a receipt has been issued for this transaction ID
    transaction.issued_status = 'Yes'; // Assuming the field name is 'issued_statusd'
    transactionsSheet.getRange(index + 2, tissuestatusindex).setValue('Yes');
    yesCountCell.setValue(yesCount + 1);
    console.log("checking data");
    var paymentDateColumnIndex = getdHeaderIndex(destinationcolumn, dataSheet);
    var issueddateIndex = getdHeaderIndex(dissueddate, dataSheet);
    var dissuedinvoiceIndex = getdHeaderIndex(dissuedinvoice, dataSheet);
    Logger.log(paymentDateColumnIndex);
    dataSheet.getRange(yesCount + 1, paymentDateColumnIndex).setValue('Yes');
    dataSheet.getRange(yesCount + 1, issueddateIndex).setValue(new Date());
    dataSheet.getRange(yesCount + 1, dissuedinvoiceIndex).setValue(tinvoiceid);


    ss.toast('Receipts generated successfully!', 'Print Transaction', 3);
    Logger.log('Receipts generated successfully!');
    const range = printSheet.getRange('A2');
    range.clearContent();
  }
  Logger.log(transaction);

  console.log('Clearing the invoice template sheet for future use...');
  ss.toast('Clearing the invoice template sheet for future use...', 'Print Transaction', -1);
  // Clear the invoice template sheet for future use
  clearTemplateSheet2();
  invoiceTemplateSheet.hideSheet();
  console.log('printTransaction function completed.');
  ss.toast('printTransaction function completed.', 'Print Transaction', 3);
}


// Define a function to clear relevant cells in the template sheet before creating a new invoice
function clearTemplateSheet2() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const templateSheet = ss.getSheetByName(INVOICE_TEMPLATE_SHEET_NAME_2);

  // List of all the ranges where values are set in createInvoiceForStudent
  const rngClear = templateSheet.getRangeList([
    'H7', 'B9', 'B10', 'B11','A15','A16', 'A17','A18','A19', 'H4', 'H7', 'H10', 'A15', 'A22', 
    'G15','G16', 'H22', 'A18', 'G18', 'A19', 'G19', 'G20', 'H21', 'H23', 'H30'
  ]).getRanges();
  // Clear the content of all the specified ranges
  rngClear.forEach(function (cell) {
    cell.clearContent();
  });
}


function createPDF2(ssId, sheet, pdfName) {
  console.log('Function: createPDF');

  const fr = 0, fc = 0, lc = 8, lr = 40;
  const url = "https://docs.google.com/spreadsheets/d/" + ssId + "/export" +
    "?format=pdf&" +
    "size=a5&" +               // A5 size (you can experiment with 'a4' or other sizes)
    "fzr=true&" +               // Preserve frozen rows
    "portrait=true&" +          // Portrait orientation
    "fitw=true&" +              // Fit width (can be false if you don't want the content stretched)
    "gridlines=false&" +        // Hide gridlines
    "printtitle=false&" +       // Do not print the sheet name or title
    "top_margin=0.1&" +         // Reduced top margin
    "bottom_margin=0.1&" +      // Reduced bottom margin
    "left_margin=0.1&" +        // Reduced left margin
    "right_margin=0.1&" +       // Reduced right margin
    "sheetnames=false&" +       // Don't show sheet names
    "pagenum=UNDEFINED&" +      // Hide page number
    "attachment=true&" +        // Force attachment download
    "gid=" + sheet.getSheetId() + '&' +
    "r1=" + fr + "&c1=" + fc + "&r2=" + lr + "&c2=" + lc;

  // Sends an HTTP request to create the PDF
  const params = {
     muteHttpExceptions: true,
     headers: {
       Authorization: 'Bearer ' +  ScriptApp.getOAuthToken(),
     },
   };
  const blob = UrlFetchApp.fetch(url, params).getBlob().setName(pdfName + '.pdf');

  // Gets the folder in Drive where the PDFs are stored.
  const folder = getFolderByName_(OUTPUT_FOLDER_NAME);

  const pdfFile = folder.createFile(blob);
  return pdfFile;
}


function getHeader(column) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var headerRange = sheet.getRange(1, column);
  return headerRange.getValue();
}

function getdHeaderIndex(header, dsheet) {
  var headers = dsheet.getRange(1, 1, 1, dsheet.getLastColumn()).getValues()[0]; // to get the header from the table
  return headers.indexOf(header) + 1;
}
