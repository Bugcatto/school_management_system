function onEditDate(e) {
  if (!e) {
    Logger.log("Event object is null. Creating a dummy event object for testing.");

    // Create a dummy event object for testing
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var activeSheet = activeSpreadsheet.getSheetByName("General Enquiry");
    var cell = activeSheet.getRange('S1313');

    // Set the dummy event object
    e = {
      source: activeSpreadsheet,
      range: cell,
      value: "Paid",
      sheet: activeSheet
    };
  }

  try {
    var row = e.range.getRow();
    var col = e.range.getColumn();
    var Generalsheetname = "General Enquiry";
    var Othersheetname = "Other Related Fees";
    var paymentStatusColumn = "P.Status";
    var paymentDateColumn = "P.date";
    var sheetName = e.source.getActiveSheet().getName();
    var otherEmail = "Email";
    var currentDate = new Date();
    var formattedDate = Utilities.formatDate(currentDate, 'Asia/Yangon', 'M/d/yyyy HH:mm:ss');
    Logger.log("Set1");
    
    Logger.log('Sheet: ' + sheetName + ', Row: ' + row + ', Column: ' + col);

    if (sheetName === Generalsheetname && getHeader(Generalsheetname, col) === paymentStatusColumn && row > 1) {
      var paymentStatus = e.range.getValue();

      if (["Paid", "FOC", "SCHOLARSHIP"].includes(paymentStatus)) {
        var paymentDateColumnIndex = getHeaderIndex(Generalsheetname, paymentDateColumn);
        var paymentDateValue = e.source.getActiveSheet().getRange(row, paymentDateColumnIndex).getValue();

        if (!paymentDateValue) {
          e.source.getActiveSheet().getRange(row, paymentDateColumnIndex).setValue(formattedDate);
        }
      }
    }
    Logger.log("set2");

    if (sheetName === Othersheetname && getHeader(Othersheetname, col) === otherEmail && row > 1) {
      var oemail = e.range.getValue();

      if (oemail) {
        var enquirydatecolumnIndex = getHeaderIndex(Othersheetname, "Enquiry Date");
        e.source.getActiveSheet().getRange(row, enquirydatecolumnIndex).setValue(formattedDate);
      }
    }

    if (sheetName === Othersheetname && getHeader(Othersheetname, col) === paymentStatusColumn && row > 1) {
      var paymentStatus = e.range.getValue();

      if (["Paid", "FOC", "SCHOLARSHIP"].includes(paymentStatus)) {
        var paymentDateColumnIndex = getHeaderIndex(Othersheetname, paymentDateColumn);
        var paymentDateValue = e.source.getActiveSheet().getRange(row, paymentDateColumnIndex).getValue();

        if (!paymentDateValue) {
          e.source.getActiveSheet().getRange(row, paymentDateColumnIndex).setValue(formattedDate);
        }
      }
    }

  } catch (error) {
    Logger.log('Error: ' + error.message);
    SpreadsheetApp.getActiveSpreadsheet().toast('Error: ' + error.message, 'Error', 10);
  }
}



