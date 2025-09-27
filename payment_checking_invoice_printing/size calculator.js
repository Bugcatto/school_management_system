function checkRemainingSheetSize() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = spreadsheet.getSheets();
  var totalCellsUsed = 0;
  var maxCells = 10000000;

  sheets.forEach(function(sheet) {
    var sheetName = sheet.getName();
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var cellsUsed = lastRow * lastColumn;
    totalCellsUsed += cellsUsed;

    Logger.log('Sheet Name: ' + sheetName);
    Logger.log('Rows (last used): ' + lastRow);
    Logger.log('Columns (last used): ' + lastColumn);
    Logger.log('Cells Used: ' + cellsUsed);
    Logger.log('-----------------------------------');
  });

  var cellsRemaining = maxCells - totalCellsUsed;

  Logger.log('Total Cells Used: ' + totalCellsUsed);
  Logger.log('Cells Remaining: ' + cellsRemaining);
}
