function clearSheet(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  if (sheet) {
    Logger.log('Clearing content from the sheet: ' + sheet.getName());
    sheet.getDataRange().clearContent();  // Clear all content from the sheet without affecting formatting
  } else {
    Logger.log('Sheet "' + sheetName + '" not found.');
  }
}