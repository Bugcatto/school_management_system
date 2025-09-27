function setValuesInItemHistory() {
  var sourcesheetName = "Marking Record Template";
  var destinationsheetName = "Marking Criteria Setup History";
  var mainsheet ="Marking Criteria Setup Sheet";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var itemHistorySheet = ss.getSheetByName(destinationsheetName);
  var sourcesheet = ss.getSheetByName(sourcesheetName);
  var array = collectNonEmptyRows(sourcesheetName);

  if (!itemHistorySheet || !sourcesheet) return;

  var filter = itemHistorySheet.getFilter();
  if (filter) filter.remove();

  if (array.length === 0) return;

  var lastRow = itemHistorySheet.getLastRow() + 1;
  var currentDate = new Date();
  var formattedDate = Utilities.formatDate(currentDate, "Asia/Bangkok", 'dd/MM/yy, HH:mm:ss');
  var courseName = sourcesheet.getRange('B2').getValue();
  var serial = getCourseOccurrenceCount(courseName, destinationsheetName);

  for (var i = 0; i < array.length; i++) {
    array[i].unshift(serial);            // Serial number (based on course history)
    //array[i].unshift(courseName);        // Course name
    array[i].unshift(formattedDate);     // Timestamp
  }

  itemHistorySheet.getRange(lastRow, 1, array.length, array[0].length).setValues(array); // Append at column A
  ss.toast('Data saved to history sheet', 'Success', 5);
  clearSheet(mainsheet);
  setMR();
}
