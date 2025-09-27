function onEditOtherpayment(e) {
  var sheet = e.source.getSheetByName("Other Related Fees");
  var range = e.range;

  // Adjust the header value and table name as needed
  var headerValue = "Course";
  var tableName = "Table List";
  var targetColumnHeader = "Sub-Course"; // Adjust to your target column header

  // Check if the edited cell is in the "Course" column and not in the header row
  if (getHeaderIndex(headerValue, sheet) == range.getColumn() && range.getRow() > 1) {
    var selectedValue = range.getValue();
    var dropdownValues = getDropdownValuesFromTable(selectedValue, sheet, tableName);

    // Get the target column index based on the header value
    var targetColumnIndex = getHeaderIndex(targetColumnHeader, sheet);

    // Check if the target column index is valid
    if (targetColumnIndex > 0) {
      // Set data validation for the "Sub-Course" column in the edited row
      var dropdownCell = sheet.getRange(range.getRow(), targetColumnIndex);
      var rule = SpreadsheetApp.newDataValidation()
        .setAllowInvalid(false)
        .requireValueInList(dropdownValues)
        .build();
      dropdownCell.setDataValidation(rule);

      // Log success message to the console
      Logger.log("Dropdown values set successfully for Course: " + selectedValue);
      
      // Show a toast message for debugging
      SpreadsheetApp.getActiveSpreadsheet().toast("Dropdown values set successfully", "Debug", 5);
    } else {
      // Log an error message to the console
      Logger.log("Target column not found: " + targetColumnHeader);
      
      // Show an error toast message for debugging
      SpreadsheetApp.getActiveSpreadsheet().toast("Target column not found: " + targetColumnHeader, "Error", 5);
    }
  }
}