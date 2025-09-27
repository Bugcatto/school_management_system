function setempinfo() {
  setSpreadsheetUrlProperty();
  try {
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = 'Employee Info';

    // Check if the sheet exists
    var employeeSheet = spreadsheet.getSheetByName(sheetName);

    // If the sheet doesn't exist, create it
    if (!employeeSheet) {
      employeeSheet = spreadsheet.insertSheet(sheetName);
      Logger.log('Created new sheet: ' + sheetName);
    } else {
      // If the sheet exists, clear its content
      employeeSheet.clear();
      Logger.log('Cleared existing sheet: ' + sheetName);
    }

    // Get the URL from the properties

    getQueryData(SPREADSHEET_URL);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
  }
}
