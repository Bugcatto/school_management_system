function getCourseOccurrenceCount(courseName, historySheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(historySheetName);
  var serialCol = getHeaderIndex(historySheetName, "Serial");
  var courseCol = getHeaderIndex(historySheetName, "Course Name");

  Logger.log("Sheet: " + historySheetName);
  Logger.log("Course Name: " + courseName);
  Logger.log("Serial Column Index: " + serialCol);
  Logger.log("Course Column Index: " + courseCol);

  if (serialCol === 0 || courseCol === 0) {
    Logger.log("Required headers not found.");
    return 1;
  }

  var lastRow = sheet.getLastRow();
  Logger.log("Last Row: " + lastRow);
  if (lastRow < 2) {
    Logger.log("Sheet has no data rows.");
    return 1;
  }

  var courseData = sheet.getRange(2, courseCol, lastRow - 1).getValues();
  var serialData = sheet.getRange(2, serialCol, lastRow - 1).getValues();

  var maxSerial = 0;

  for (var i = 0; i < courseData.length; i++) {
    Logger.log("Checking row " + (i + 2) + ": " + courseData[i][0] + " | Serial: " + serialData[i][0]);
    if (courseData[i][0] === courseName) {
      var serial = parseInt(serialData[i][0]);
      if (!isNaN(serial)) {
        Logger.log("Valid serial found: " + serial);
        if (serial > maxSerial) {
          maxSerial = serial;
        }
      }
    }
  }

  Logger.log("Max serial found: " + maxSerial);
  return maxSerial + 1;
}
