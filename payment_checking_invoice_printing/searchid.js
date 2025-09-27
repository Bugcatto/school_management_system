function findidInSpecificSheet() {
  var sheetName = "Transactions"; // Replace "Sheet1" with the name of the specific sheet
  var Printsheetname = "Print Sheet"; // Replace "Search" with the name of the sheet containing the search name
  var searchid = Printsheetname + "!A2";
  var invoiceidcol = "Invoice ID";

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);
  var searchName = ss.getRange(searchid).getValue();

  if (!sheet) {
    Logger.log("Sheet '" + sheetName + "' not found.");
    return [];
  }

  var headerRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var invoiceindex = headerRow.indexOf(invoiceidcol); // Add 1 to convert to 1-based index
  if (invoiceindex === 0) {
    Logger.log("Column with header 'Invoice ID' not found in sheet '" + sheetName + "'.");
    return [];
  }
  Logger.log(invoiceindex);

  var data = sheet.getRange(2, 1, sheet.getLastRow(), sheet.getLastColumn()).getValues();
  var objectKeys = createObjectKeys(headerRow); // Convert header to object keys

  var foundRows = [];
  for (var i = 0; i < data.length; i++) {
  if (data[i][invoiceindex] === searchName) {
    var rowObject = {};
    for (var j = 0; j < objectKeys.length; j++) {
      rowObject[objectKeys[j]] = data[i][j];
    }
    foundRows.push(rowObject);
  }
}

// Add logging for debugging
for (var i = 0; i < foundRows.length; i++) {
  Logger.log("Found row: " + JSON.stringify(foundRows[i]));
}



  if (foundRows.length > 0) {
    Logger.log("Rows with the ID '" + searchName + "' were found in sheet '" + sheetName + "':");
    Logger.log(foundRows);
  } else {
    Logger.log("The ID '" + searchName + "' was not found in sheet '" + sheetName + "'.");
  }
  return foundRows;
}
function createObjectKeys(keys) {
  console.log('Function: createObjectKeys');

  // Check if keys is already a 2D array (assuming the first row is used as column headers)
  if (keys[0] && Array.isArray(keys[0])) {
    return keys[0].map(function(key) {
      return key.replace(/\W+/g, '_').toLowerCase();
    });
  }

  // If keys is a 1D array, return it as is
  return keys.map(function(key) {
    return key.replace(/\W+/g, '_').toLowerCase();
  });
}