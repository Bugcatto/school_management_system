function getQueryData(e) {
  // Open the source spreadsheet and get the Role Assignment sheet
  var ss = SpreadsheetApp.openByUrl(e);
  var sheet = ss.getSheetByName("Role Assignment");
  
  // Get the data from the Role Assignment sheet
  var data = sheet.getRange("A:Z").getValues();
  
  // Get the filter values from Ins Sheet(DNT!) of the active spreadsheet
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var insSheet = activeSpreadsheet.getSheetByName("Ins Sheet(DNT!)");
  var filterValues = insSheet.getRange("A2:A" + insSheet.getLastRow()).getValues().flat();
  
  // Get the Employee Info sheet
  var employeeInfoSheet = activeSpreadsheet.getSheetByName("Employee Info");
  
  // Check if the filterValues array is empty
  if (filterValues.length === 0 || (filterValues.length === 1 && filterValues[0] === "")) {
    // Clear the Employee Info sheet if A2:A is blank
    employeeInfoSheet.clear();
    Logger.log('Employee Info sheet cleared because A2:A is blank.');
  } else {
    // Filter the data based on a direct match with filterValues
    var filteredData = data.filter(function(row) {
      return row[0] && filterValues.includes(row[0]);
    });

    // Set the filtered data to the Employee Info sheet
    if (filteredData.length > 0) {
      employeeInfoSheet.getRange(1, 1, filteredData.length, filteredData[0].length).setValues(filteredData);
      Logger.log('Data successfully set to Employee Info sheet.');
    } else {
      employeeInfoSheet.clear();
      Logger.log('No matching data found, Employee Info sheet cleared.');
    }
  }
}
