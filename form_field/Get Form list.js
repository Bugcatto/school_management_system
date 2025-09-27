// Function to get Google Form URLs from a specific column with a given header
function getGoogleFormUrls() {
  var sheetName = 'Ins Sheet(DNT!)';
  var headerToFind = 'Data List';

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetName);

  if (sheet) {
    var columnIndex = getHeaderIndex(sheetName, headerToFind);

    if (columnIndex !== -1) {  // Check for -1 instead of 0
      var lastRow = sheet.getLastRow();
      var urls = sheet.getRange(2, columnIndex, lastRow - 1, 1).getValues();
      Logger.log(urls);

      // Filter Google Form URLs
      var googleFormUrls = urls.reduce(function (acc, url) {
        if (checkURLType(url[0]) === 'Google Form') {
          acc.push(url[0]);
        }
        return acc;
      }, []);
      Logger.log('Google Form List:' + googleFormUrls);

      return googleFormUrls;
    } else {
      Logger.log('Header named ' + headerToFind + ' not found.');
      return [];
    }
  } else {
    Logger.log('Sheet named ' + sheetName + ' not found.');
    return [];
  }
}

function checkURLType(url) {
  if (url.includes("/forms/")) {
    return "Google Form";
  } else if (url.includes("/spreadsheets/")) {
    return "Google Sheets";
  } else {
    return "Unknown type";
  }
}