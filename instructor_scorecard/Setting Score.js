//function saveScoreCriteria() {
//  var ss = SpreadsheetApp.getActiveSpreadsheet();
//  var sourceSheet = ss.getSheetByName("Score Card");
//  var destSheet = ss.getSheetByName("Record Score Criteria History");
//
//  if (!sourceSheet || !destSheet) {
//    SpreadsheetApp.getUi().alert("One or both sheets not found.");
//    return;
//  }
//
//var bValues = sourceSheet.getRange("B10:B").getValues();
//var cValues = sourceSheet.getRange("C10:C").getValues();
//var lastB = bValues.findIndex(row => row[0] === "");
//Logger.log(lastB);
//if (lastB === 0) return; // nothing to check
//Logger.log("Step1");
//
//for (var i = 0; i < lastB; i++) {
//  if (bValues[i][0] && !cValues[i][0]) {
//    SpreadsheetApp.getActive().toast("Score missing");
//    Logger.log("Missing score at row " + (i + 10));
//    Logger.log("B: " + bValues[i][0] + " | C: " + cValues[i][0]);
//    return;
//  }
//}
//  
//Logger.log("Step2");
//
//  // Copy C3:C until last non-empty row
//  var cData = sourceSheet.getRange("C3:C").getValues();
//  Logger.log(cData);
//  var lastC = cData.findIndex(row => row[0] === "");
//  if (lastC === -1) lastC = cData.length;
//  Logger.log(lastC);
//
//  if (lastC === 0) {
//    SpreadsheetApp.getActive().toast("No score data to save");
//    return;
//  }
//
//    var rowData = cData.slice(0, lastC).map(row => row[0]);
//
//  // Add timestamp at the beginning
//  var timestamp = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), "M/d/yyyy HH:mm:ss");
//  rowData.unshift(timestamp);
//
//  // Paste into last empty row of destination
//  var destLastRow = destSheet.getLastRow() + 1;
//  destSheet.getRange(destLastRow, 1, 1, rowData.length).setValues([rowData]);
//}
//