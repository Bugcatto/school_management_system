function manualTriggerOnEdit() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = 'General Enquiry';
  var sheet = spreadsheet.getSheetByName(sheetName);

  // Check if the sheet exists
  if (sheet) {
    spreadsheet.setActiveSheet(sheet);
    
    // Specify the cell you want to edit (e.g., S3)
    var cell = sheet.getRange('S5');
    // Correct this line

    var fakeValue = 'FOC'; // Set the value to "Paid"

    // Create a fake event object
    var fakeEvent = {
      source: sheet,
      range: cell,
      value: fakeValue,
    };

    // Call the onEditSalesRecord function with the fake event
    onEditSalesRecord(fakeEvent);
  } else {
    Logger.log('Sheet "' + sheetName + '" not found.');
  }
}
