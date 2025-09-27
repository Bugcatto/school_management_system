function importsaletopaycheck() {
  var sourceSheetUrl = "https://docs.google.com/spreadsheets/d/1vTtc5e0-R7mDLttwkB9mxJ3WdHqppdQ-PzIpZ_PHSOI/edit";
  var sourceSheetName = "Payment Data";
  var destinationSheetName = "Raw General Enquiry Link";
  var destinationColumn = 3; // Start pasting data from column 3 (C)

  var sourceSpreadsheet = SpreadsheetApp.openByUrl(sourceSheetUrl);
  var sourceSheet = sourceSpreadsheet.getSheetByName(sourceSheetName);
  var destinationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(destinationSheetName);
  
  if (sourceSheet && destinationSheet) {
    var range = sourceSheet.getDataRange();
    var values = range.getValues();
    
    // Paste the data into the destination sheet starting from the specified column
    var destinationRange = destinationSheet.getRange(1, destinationColumn, values.length, values[0].length);
    destinationRange.setValues(values);
    
    SpreadsheetApp.getActiveSpreadsheet().toast("Sales Updated", "Success", 5);
    Logger.log("Data pasted successfully.");
  } else {
    Logger.log("Source or destination sheet not found.");
  }
}
