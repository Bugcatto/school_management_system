function loadPreviousScoresIfMatchFound() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSheet = ss.getSheetByName("Score Card");
  var destSheet = ss.getSheetByName("Record Score Criteria History");

  if (!sourceSheet || !destSheet) {
    SpreadsheetApp.getUi().alert("One or both sheets not found.");
    return;
  }

  // Get C3:C7 values from source
  var sourceValues = sourceSheet.getRange("C3:C7").getValues().flat();

  // Get B:F data from destination (skip header row)
  var destData = destSheet.getRange(2, 2, destSheet.getLastRow() - 1, 5).getValues();

  // Find matching row
  var matchIndex = destData.findIndex(row =>
    row.every((val, idx) => val === sourceValues[idx])
  );

  if (matchIndex === -1) {
    SpreadsheetApp.getActive().toast("No matching score found in history.");
    clearValuesC10();
    return;
  }

  // Get row index in sheet (offset by 2 because we skipped the header)
  var destRow = matchIndex + 2;

  // Get H to last column data from matched row
  var lastCol = destSheet.getLastColumn();
  if (lastCol < 8) {
    SpreadsheetApp.getActive().toast("No score data to retrieve.");
    clearValuesC10();
    return;
  }

  var scoreData = destSheet.getRange(destRow, 8, 1, lastCol - 7).getValues()[0];

  // Paste data vertically starting at C9
  var targetRange = sourceSheet.getRange(9, 3, scoreData.length, 1);
  var verticalData = scoreData.map(v => [v]);
  targetRange.setValues(verticalData);

  SpreadsheetApp.getActive().toast("Previous score loaded.");
}
