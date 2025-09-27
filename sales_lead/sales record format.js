function setNumberFormat() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var ssheet = "Sales Record";
  var sheet2 = spreadsheet.getSheetByName(ssheet);
  var range = sheet2.getRange('AR:AR');
  range.setNumberFormat('0');
  var dateRange = sheet2.getRange('A:A');
  dateRange.setNumberFormat('M/d/yyyy HH:mm:ss');
}
