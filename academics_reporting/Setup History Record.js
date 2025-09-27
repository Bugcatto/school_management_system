function getNonEmptyValuesInDRSheet() {
  var sourcesheetName = 'Deposit Form';
  var destinationsheetName = 'Deposit History';
  
  var sourcesheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sourcesheetName);
  
  // Replace with your destination spreadsheet URL
  var destinationSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1wqC8X0nHvwoTS-sO8IgT7aVtqJxaGy766VI8A1VL4qw/edit';
  var destinationSpreadsheet = SpreadsheetApp.openByUrl(destinationSpreadsheetUrl);

  var destinationsheet = destinationSpreadsheet.getSheetByName(destinationsheetName);

  if (!sourcesheet) {
    Logger.log('Sheet "' + sourcesheetName + '" not found.');
    return;
  }
  
  if (!destinationsheet) {
    Logger.log('Sheet "' + destinationsheetName + '" not found.');
    return;
  }
  
  setDR();  // Set initial values and formulas in Deposit Form
  
  var nonEmptyRowsArray = collectNonEmptyRows(sourcesheetName);
  Logger.log(nonEmptyRowsArray);

  if (nonEmptyRowsArray.length > 0) {
    setValuesInItemHistory(nonEmptyRowsArray, sourcesheetName, destinationsheetName);
    Logger.log("Setting history");
  } else {
    Logger.log('No non-empty values found in column B from row 6 onwards in "Deposit Form".');
  }
}


