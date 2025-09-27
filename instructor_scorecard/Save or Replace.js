function saveScoreCriteria() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSheet = ss.getSheetByName("Score Card");
  var destSheet = ss.getSheetByName("Record Score Criteria History");

  if (!sourceSheet || !destSheet) {
    SpreadsheetApp.getUi().alert("One or both sheets not found.");
    return;
  }
  //set default
  setupScoreCardSheet();
  SpreadsheetApp.getActive().toast("Processing Score");
  
  // Get comparison values C3:C7
  var checkValues = sourceSheet.getRange("C3:C7").getValues().map(r => r[0]);

  // Get data from B:F in history (starting from row 2)
  var historyRange = destSheet.getRange(2, 2, destSheet.getLastRow() - 1 || 1, 5).getValues();

  var matchIndex = -1;
  for (var i = 0; i < historyRange.length; i++) {
    var row = historyRange[i];
    if (row.join() === checkValues.join()) {
      matchIndex = i; // 0-based relative to row 2
      break;
    }
  }

  // Validate that all B10:B has values in C10:C
  var bValues = sourceSheet.getRange("B10:B").getValues();
  var cValues = sourceSheet.getRange("C10:C").getValues();
  var lastB = bValues.findIndex(row => row[0] === "");
  if (lastB === -1) lastB = bValues.length;

  for (var i = 0; i < lastB; i++) {
    if (bValues[i][0] && !cValues[i][0]) {
      SpreadsheetApp.getActive().toast("Score missing");
      sourceSheet.getRange("C2").clearContent();
      return;
    }
  }

  // Copy C3:C until last non-empty row
  var cData = sourceSheet.getRange("C3:C").getValues();
  var lastC = cData.findIndex(row => row[0] === "");
  if (lastC === -1) lastC = cData.length;

  if (lastC === 0) {
  sourceSheet.getRange("C2").clearContent(); // Clear only the value, keep dropdown
  SpreadsheetApp.getActive().toast("No score data to save");
  return;
}


  var rowData = cData.slice(0, lastC).map(row => row[0]);

  // Add timestamp at the beginning
  var timestamp = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "M/d/yyyy HH:mm:ss");
  rowData.unshift(timestamp);

  if (matchIndex >= 0) {
    // Replace matched row: clear all columns then write
    destSheet.getRange(matchIndex + 2, 1, 1, destSheet.getLastColumn()).clearContent();
    destSheet.getRange(matchIndex + 2, 1, 1, rowData.length).setValues([rowData]);
  } else {
    // Append as new
    var destLastRow = destSheet.getLastRow() + 1;
    destSheet.getRange(destLastRow, 1, 1, rowData.length).setValues([rowData]);
  }
  clearSheetExceptC4();
  setupScoreCardSheet();
}
