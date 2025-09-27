function isNotEmpty(value) {
  return value !== null && value !== '';
}

function clearSheet(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  if (sheet) {
    Logger.log('Clearing content from the sheet: ' + sheet.getName());
    sheet.getDataRange().clearContent();  // Clear all content from the sheet without affecting formatting
  } else {
    Logger.log('Sheet "' + sheetName + '" not found.');
  }
}

function isNotEmpty(value) {
  return value !== '' && value !== null;
}

function collectNonEmptyRows(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var rangeToCheck = sheet.getRange('B2:B' + lastRow); // Check B2:B
  var values = rangeToCheck.getValues();
  var nonEmptyRowsArray = [];

  for (var i = 0; i < values.length; i++) {
    if (isNotEmpty(values[i][0])) {
      var rowArray = sheet.getRange(2 + i, 2, 1, 7).getValues()[0]; // B to H
      nonEmptyRowsArray.push(rowArray);
    }
  }

  return nonEmptyRowsArray;
}

function getHeaderIndex(sheetName, header) {
  Logger.log(sheetName);
  Logger.log(header); 
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  Logger.log(headers);
  return headers.indexOf(header) + 1;
}

