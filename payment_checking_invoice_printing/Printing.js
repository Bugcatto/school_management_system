

//// Define a function to print a transaction receipt for a student
//function printTransaction() {
//  console.log('Function: printTransaction');
//
//  // Get the active spreadsheet and the various sheets needed for the script
//  const ss = SpreadsheetApp.getActiveSpreadsheet();
//  const transactionsSheet = ss.getSheetByName(TRANSACTIONS_SHEET_NAME);
//  const printSheet = ss.getSheetByName(PRINT_SHEET_NAME);
//  const invoiceTemplateSheet = ss.getSheetByName(INVOICE_TEMPLATE_SHEET_NAME);
//  const invoicesSheet = ss.getSheetByName(INVOICES_SHEET_NAME);
//  const dataSheet = ss.getSheetByName(DATA_SHEET_NAME);
//  const yesCountCell = dataSheet.getRange('B2');
//  const yesCount = yesCountCell.getValue();
//  var invoiceidcol = "Invoice ID";
//  
//  // Remove the filter, if it exists
//  var filter = transactionsSheet.getFilter();
//
//  if (filter) {
//    filter.remove();
//  }
//
//  if (!transactionsSheet || !printSheet || !invoiceTemplateSheet || !invoicesSheet || !dataSheet) {
//    console.log("Required sheets not found. Please ensure all required sheets exist.");
//    ss.toast("Required sheets not found. Please ensure all required sheets exist.", APP_TITLE, 5);
//    return;
//  }
//
//  console.log('Getting data from sheets...');
//  ss.toast('Getting data from sheets...', APP_TITLE, -1);
//  const transId = printSheet.getRange('A2').getValue();
//  console.log('getting transaction');
//  const transactions = findidInSpecificSheet();
//  const transaction = transactions[0];
//
//  if (!transId) {
//    console.log("Transaction ID not provided. Please enter a valid Transaction ID.");
//    ss.toast("Transaction ID not provided. Please enter a valid Transaction ID.", APP_TITLE, 5);
//    return;
//  }
//  invoiceTemplateSheet.showSheet();
//
//
//  Logger.log(transaction);
//  console.log('tdata');
//  var headerRow = transactionsSheet.getRange(1, 1, 1, transactionsSheet.getLastColumn()).getValues()[0];
//  var invoiceindex = headerRow.indexOf(invoiceidcol); // Add 1 to convert to 1-based index
//  const tData = transactionsSheet.getRange('A2:U').getValues();
//  const dataList = tData.map(x => x[invoiceindex]);
//  const index = dataList.indexOf(transId);
//  console.log('checking tData and index');
//  Logger.log(index);
//  console.log('index');
//
//
////  if (!transaction) {
////    ss.toast(`Transaction ID ${transId} not found in the Transactions sheet. Please check and try again.`, 'Print Transaction', 5);
////    Logger.log(`Transaction ID ${transId} not found in the Transactions sheet.`);
////    return;
////  }
//  console.log("Checking Transaction");
//  const iStatus = transaction.issued_status;
//  const aStatus = transaction.approved_status;
//  const tinvoiceid = transaction.invoice_id;
//  Logger.log(transaction.student_name);
//  Logger.log(aStatus);
//
//  console.log('Checking if the student has already been issued a receipt...');
//  ss.toast('Checking if the student has already been issued a receipt...', 'Print Transaction', -1);
//  // Check if the student has already been issued a receipt for this transaction ID
//  if (iStatus === 'Yes') {
//    ss.toast(`Duplicate request for Transaction ID ${transId}`, 'Print Transaction', 5);
//    Logger.log(`Duplicate request for Transaction ID ${transId}`);
//    return;
//  }
//
//  console.log('Checking if the student has not been issued a receipt yet and if the transaction has been completed...');
//  ss.toast('Checking if the student has not been issued a receipt yet and if the transaction has been completed...', 'Print Transaction', -1);
//  // If the student has not been issued a receipt yet, and if the transaction has been completed, create invoices
//  if (iStatus === 'No' && aStatus === 'Yes') {
//    ss.toast('Creating Invoices', 'Print Transaction', -1);
//    Logger.log('Creating Invoices');
//    const invoices = [];
//
//    // Create an invoice for the current transaction and add it to the list of invoices
//    const invoice = createInvoiceForStudent(transaction, invoiceTemplateSheet, ss.getId());
//    if (invoice) {
//      invoices.push(invoice);
//    }
//    console.log('checking invoice'),
//    Logger.log(invoice);
//
//    console.log('Checking if there are any invoices to add...');
//    ss.toast('Checking if there are any invoices to add...', 'Print Transaction', -1);
//    // If there are any invoices, add them to the invoices sheet
//    if (invoices.length > 0) {
//      ss.toast(`Adding ${invoices.length} invoices to the Invoices sheet...`, 'Print Transaction', -1);
//      Logger.log(`Adding ${invoices.length} invoices to the Invoices sheet...`);
//      invoicesSheet.getRange(yesCount + 1, 1, invoices.length, invoices[0].length).setValues(invoices);
//    }
//    const tissuestatusindex=getdHeaderIndex(tissuestatus,transactionsSheet);
//
//    // Update the transaction sheet to indicate that a receipt has been issued for this transaction ID
//    transaction.issued_status = 'Yes'; // Assuming the field name is 'issued_statusd'
//    transactionsSheet.getRange(index + 2, tissuestatusindex).setValue('Yes');
//    yesCountCell.setValue(yesCount + 1);
//    console.log("checking data");
//    var paymentDateColumnIndex = getdHeaderIndex(destinationcolumn, dataSheet);
//    var issueddateIndex = getdHeaderIndex(dissueddate, dataSheet);
//    var dissuedinvoiceIndex = getdHeaderIndex(dissuedinvoice, dataSheet);
//    Logger.log(paymentDateColumnIndex);
//    dataSheet.getRange(yesCount + 1, paymentDateColumnIndex).setValue('Yes');
//    dataSheet.getRange(yesCount + 1, issueddateIndex).setValue(new Date());
//    dataSheet.getRange(yesCount + 1, dissuedinvoiceIndex).setValue(tinvoiceid);
//
//
//    ss.toast('Receipts generated successfully!', 'Print Transaction', 3);
//    Logger.log('Receipts generated successfully!');
//    const range = printSheet.getRange('A2');
//    range.clearContent();
//  }
//  Logger.log(transaction);
//
//  console.log('Clearing the invoice template sheet for future use...');
//  ss.toast('Clearing the invoice template sheet for future use...', 'Print Transaction', -1);
//  // Clear the invoice template sheet for future use
//  clearTemplateSheet();
//  invoiceTemplateSheet.hideSheet();
//  console.log('printTransaction function completed.');
//  ss.toast('printTransaction function completed.', 'Print Transaction', 3);
//}
//
//
//// Function to create an invoice for a student based on transaction data
//function createInvoiceForStudent(transactions, templateSheet, ssId) {
//  console.log('Function: createInvoiceForStudent');
//  // This function takes in the transaction data, the template sheet, and the ID of the current Google Sheets file
//  // Clears the template sheet before filling it in with new data
//  clearTemplateSheet();
//
//  // Extracts relevant data from the transaction object
//  const invoiceNumber = transactions.invoice_id;
//  const todaysDate = new Date().toDateString();
//
//  // Fills in the template sheet with the extracted data
//  templateSheet.getRange('E8').setValue(transactions.student_name);
//  templateSheet.getRange('E9').setValue(transactions.id);
//  templateSheet.getRange('E10').setValue(transactions.phone);
//  templateSheet.getRange('E11').setValue(transactions.email);
//  templateSheet.getRange('D5').setValue(invoiceNumber);
//  templateSheet.getRange('H5').setValue(todaysDate);
//  templateSheet.getRange('B15').setValue(transactions.course_name);
//  //templateSheet.getRange('B17').setValue(transactions.remark);
//  templateSheet.getRange('H15').setValue(transactions.total_course_fee);
//  templateSheet.getRange('H16').setValue(transactions.final_discount_total);
//  templateSheet.getRange('H17').setValue(transactions.received);
//  templateSheet.getRange('H18').setValue(transactions.remaining);
//  
//  templateSheet.getRange('G25').setValue(transactions.for_signature);
//
//  // Flushes the spreadsheet to ensure all pending changes are made before continuing
//  SpreadsheetApp.flush();
//  // Waits 500ms to offset any potential latency in creating the PDF
//  Utilities.sleep(5000);
//  // Creates a PDF of the template sheet
//  const pdf = createPDF(ssId, templateSheet, `Invoice#${invoiceNumber}-${transactions.student_name}`);
//  // Returns an array of relevant data, including the invoice data and the URL of the created PDF
//  // Set the sharing settings to "Anyone with the link can view"
//  pdf.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
//  return [invoiceNumber, todaysDate, transactions.course_name, transactions.id, transactions.student_name, transactions.email,transactions.total_course_fee,transactions.final_discount_total, transactions.received, transactions.remaining, pdf.getUrl()];
//}
//
//
//// Define a function to clear relevant cells in the template sheet before creating a new invoice
//function clearTemplateSheet() {
//  const ss = SpreadsheetApp.getActiveSpreadsheet();
//  const templateSheet = ss.getSheetByName(INVOICE_TEMPLATE_SHEET_NAME);
//  // Clears existing data from the template.
//  const rngClear = templateSheet.getRangeList(['E8', 'E9', 'E10', 'E11', 'D5', 'H5', 'B15','B17','H15', 'H16', 'H17', 'H18', 'G25']).getRanges();
//  rngClear.forEach(function (cell) {
//    cell.clearContent();
//  });
//}
//
//
//function createPDF(ssId, sheet, pdfName) {
//  console.log('Function: createPDF');
//
//  const fr = 0, fc = 0, lc = 9, lr = 33;
//  const url = "https://docs.google.com/spreadsheets/d/" + ssId + "/export" +
//    "?format=pdf&" +
//    "size=a5&" +
//    "fzr=true&" +
//    "portrait=true&" +
//    "fitw=true&" +
//    "gridlines=false&" +
//    "printtitle=false&" +
//    "top_margin=0.5&" +
//    "bottom_margin=0.25&" +
//    "left_margin=0.5&" +
//    "right_margin=0.5&" +
//    "sheetnames=false&" +
//    "pagenum=UNDEFINED&" +
//    "attachment=true&" +
//    "gid=" + sheet.getSheetId() + '&' +
//    "r1=" + fr + "&c1=" + fc + "&r2=" + lr + "&c2=" + lc;
//
//  // Sends an HTTP request to create the PDF
//  const params = {
//     muteHttpExceptions: true,
//     headers: {
//       Authorization: 'Bearer ' +  ScriptApp.getOAuthToken(),
//     },
//   };
//  const blob = UrlFetchApp.fetch(url, params).getBlob().setName(pdfName + '.pdf');
//
//  // Gets the folder in Drive where the PDFs are stored.
//  const folder = getFolderByName_(OUTPUT_FOLDER_NAME);
//
//  const pdfFile = folder.createFile(blob);
//  return pdfFile;
//}
//
//function getHeader(column) {
//  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//  var headerRange = sheet.getRange(1, column);
//  return headerRange.getValue();
//}
//
//function getdHeaderIndex(header, dsheet) {
//  var headers = dsheet.getRange(1, 1, 1, dsheet.getLastColumn()).getValues()[0]; // to get the header from the table
//  return headers.indexOf(header) + 1;
//}
//