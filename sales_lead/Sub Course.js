function updateSubCourse(e) {

  if (!e) {
    Logger.log("Event object is null. Creating a dummy event object for testing.");

    // Create a dummy event object for testing
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var activeSheet = activeSpreadsheet.getSheetByName("General Enquiry");
    var cell = activeSheet.getRange('F1197');
  
    // Set the sheet name to "Test Ge Sheet"
    e = {
      source: activeSpreadsheet,
      range: cell,
      value: "AAT 3",
      sheet: activeSheet
    };
  }

  var courseName = "General Enquiry";
  var courseNameHeader = getHeaderIndex(courseName, "Course");

  // Check if the edit occurred in the "Course Schedule Test" sheet
  if (e.source.getSheetName() === courseName && e.range) {
    var editedColumn = e.range.getColumn();
    var editedRow = e.range.getRow();

    // Check if the edit occurred in the "Course Name" column
    if (editedColumn === courseNameHeader) {
      var editedValue = e.value;

      // Logger for debugging
      Logger.log('Edit in "Course Name" column. Value:', editedValue);

      // Retrieve the "Sub Course" sheet
      var spreadsheet = e.source;
      var subCourseSheet = spreadsheet.getSheetByName('Sub Course');

      if (subCourseSheet) {
        // Get the data range of the table in "Sub Course" sheet
        var subCourseDataRange = subCourseSheet.getDataRange();
        var subCourseValues = subCourseDataRange.getValues();

        // Get the header row
        var headerRow = subCourseValues[0];

        // Find the matching column based on the edited cell value
        var columnIndex = headerRow.indexOf(editedValue);

        if (columnIndex !== -1) {
          // You have the index of the matching column
          Logger.log('Matching column found at index: ' + columnIndex);

          // Retrieve data from the corresponding column in the table
          var columnData = subCourseValues.map(function(row) {
            return row[columnIndex];
          });

          // Filter out empty values and remove duplicates, excluding the header
          var uniqueValues = columnData.filter(function(value, index) {
            return value !== "" && value !== " " && index !== 0;
          }).filter(function(value, index, self) {
            return self.indexOf(value) === index;
          });

          // Set data validation with the retrieved values
          var sheet = e.source.getSheetByName(courseName);
          var headerValues = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
          var subCourseHeaderIndex = headerValues.indexOf('Sub-Course');
          Logger.log(subCourseHeaderIndex);

          var rule = SpreadsheetApp.newDataValidation().requireValueInList(uniqueValues).build();
          sheet.getRange(editedRow, subCourseHeaderIndex + 1).setDataValidation(rule);

          // Logger for debugging
          Logger.log('Dropdown with values set successfully.');

        } else {
          // The edited value is not found in the header row
          Logger.log('Matching column not found for value: ' + editedValue);
        }
      } else {
        // Logger for debugging
        Logger.log('Sheet "Sub Course" not found.');
      }
    }
  }
  // Add more conditions or logic based on other sheets or columns if needed
}
