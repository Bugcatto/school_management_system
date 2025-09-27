function getHeader(sheetName, column) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headerRange = sheet.getRange(1, column);
  return headerRange.getValue();
}

function getHeaderIndex(sheetName, header) {
  Logger.log(sheetName);
  Logger.log(header); 
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  Logger.log(sheet);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; //  to get the header from the table
  Logger.log(headers);
  return headers.indexOf(header) + 1;
}

function cleanColumn(range) {
  range.clearContent();
}

function setDefaultFormat() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();

  // Get the dimensions of the sheet
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn();

  // Set default font size, font family, and text clipping for the entire sheet
  sheet.getRange(1, 1, lastRow, lastColumn)
    .setFontFamily("Arial")
    .setFontSize(9)
    .setWrap(false)
    .setVerticalAlignment("top"); // Set to false for text clipping

  // Set the first row as bold
  sheet.getRange(1, 1, 1, lastColumn).setFontWeight("bold");

  // Trim white spaces in columns J, K, M
  sheet.getRange(1, 10, lastRow, 1).setNumberFormat("@");
  sheet.getRange(1, 11, lastRow, 1).setNumberFormat("@");
  sheet.getRange(1, 13, lastRow, 1).setNumberFormat("@");

  // Add more formatting as needed

  Logger.log("Default format set for the entire sheet.");
}

// Function to trim and convert to lowercase
function trimAndLowerCase(value) {
  if (typeof value === 'string') {
    return value.trim().toLowerCase();
  }
  return value; // If not a string, return as is
}

// Function to handle numeric values with a minimum decimal place
function handleNumeric(value) {
  if (typeof value === 'number') {
    return value.toFixed(1); // Set minimum decimal place to 1
  }
  return value; // If not a number, return as is
}

function getTableWithHeaders(sheet) {
  var range = sheet.getDataRange();
  var values = range.getValues();
  var headers = values[0];
  var data = values.slice(1);
  return [headers].concat(data);
} 

function getRowData(sheet, row, column, numRows, numColumns) {
  var headers = sheet.getRange(1, column, 1, numColumns).getValues()[0];
  var values = sheet.getRange(row, column, numRows, numColumns).getValues()[0];
  return [headers].concat([values]); // Ensure values is wrapped in an additional array
}


// Updated isDuplicate function
function isDuplicate(sheetName, rowData, headers) {
  var salesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  // Get the mapped table with headers from the "Sales Record" sheet
  var salesData = getTableWithHeaders(salesSheet);
  Logger.log("In Checking Duplicate");
  Logger.log(rowData);
  Logger.log(salesData);
  Logger.log(salesData.length);

  // Check if the rowData already exists in the "Sales Record" sheet under the specified headers
  for (var i = 1; i < salesData.length; i++) {
    var isDuplicate = true;


    // Check each specified header
    for (var j = 0; j < headers.length; j++) {
      var headerIndex = salesData[0].indexOf(headers[j]);
      var rowdataindex = rowData[0].indexOf(headers[j]);

      // Use the separate functions for trimming and handling numeric values
      var salesValue = handleNumeric(trimAndLowerCase(salesData[i][headerIndex]));
      var rowValue = handleNumeric(trimAndLowerCase(rowData[1][rowdataindex]));
      // Compare the values
      if (salesValue !== rowValue) {
        Logger.log(salesValue);
        Logger.log(rowValue);
        Logger.log(j);
        Logger.log(i);
        // If any of the specified headers doesn't match, it's not a duplicate
        isDuplicate = false;
        break;
      }
    }
    

    if (isDuplicate) {
      return true; // Duplicate found
    }
  }

  return false; // No duplicate found
}


