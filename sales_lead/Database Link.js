function importData() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSheet = spreadsheet.getSheetByName('Ins Sheet(DNT!)');
  var sheetNameCell = sourceSheet.getRange('I2');
  var sheetName = sheetNameCell.getValue();
  
  var urlCell = sourceSheet.getRange('C2');
  var spreadsheetUrl = urlCell.getValue();
  
  var externalSpreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  var externalSheet = externalSpreadsheet.getSheetByName(sheetName);
  var data = externalSheet.getRange('A:G').getValues();
  
  var destinationSheet = spreadsheet.getSheetByName('Data Link Script');
  
  // Clear the contents of the destination sheet
  destinationSheet.clearContents();
  
  // Import new data into the destination sheet
  destinationSheet.getRange(1, 1, data.length, data[0].length).setValues(data);
  
  // Now the data is imported into the "Data Link Script" sheet after clearing its contents
}
