function importfunction() {
  // Open the spreadsheet using the URL ID
  var sshost = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  
  // Define the source and target sheet names
  var sourceSheetName = 'Function List';
  var targetSheetName = 'Function';
  
  // Get the source sheet
  var sourceSheet = sshost.getSheetByName(sourceSheetName);
  if (!sourceSheet) {
    Logger.log('Source sheet ' + sourceSheetName + ' not found.');
    return;
  }

  // Get the destination spreadsheet
  var ssdes = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get or create the target sheet
  var targetSheet = ssdes.getSheetByName(targetSheetName);
  if (!targetSheet) {
    targetSheet = ssdes.insertSheet(targetSheetName);
  } else {
    targetSheet.clear();  // Clear the existing sheet's contents
  }

  // Copy data from the source sheet to the target sheet
  var range = sourceSheet.getDataRange();
  var values = range.getValues();
  targetSheet.getRange(1, 1, values.length, values[0].length).setValues(values);

  // Auto-resize columns for better visibility
  targetSheet.autoResizeColumns(1, targetSheet.getLastColumn());

  Logger.log('Data imported from ' + sourceSheetName + ' to ' + targetSheetName);

  // Call the createDropdownList function (make sure this function is defined elsewhere in your script)
  createDropdownList();
}

function createDropdownList() {
  // Open the active spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  // Get the data from "Function" sheet column 1
  var functionSheet = spreadsheet.getSheetByName("Function");
  var functionValues = functionSheet.getRange("A2:A" + functionSheet.getLastRow()).getValues();

  // Get the active sheet ("Ins Sheet(DNT!)")
  var inssheet = spreadsheet.getSheetByName("Ins Sheet(DNT!)");

  // Set data validation for "insSheet" column 1
  var dropdownRange = inssheet.getRange("A2:A");
  var rule = SpreadsheetApp.newDataValidation().requireValueInList(functionValues.flat()).build();
  dropdownRange.setDataValidation(rule);
}
