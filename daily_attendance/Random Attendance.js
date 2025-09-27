function addRandomCodeWithDate() {
  // Function to generate a 12-character alphanumeric code
  function generateRandomCode() {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var code = '';
    for (var i = 0; i < 20; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  // Generate the random code
  var randomCode = generateRandomCode();
  
  // Get the current date
  var currentDate = new Date();

  // Format the date as "YYYY-MM-DD HH:MM:SS"
  var formattedDate = Utilities.formatDate(currentDate, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

  // Access the spreadsheet
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("Code History");

  if (sheet) {
    // Find the last row with data
    var lastRow = sheet.getLastRow();

    // Insert the date in the first column and the random code in the second column
    sheet.getRange(lastRow + 1, 1).setValue(formattedDate);
    sheet.getRange(lastRow + 1, 2).setValue(randomCode);
  }
}
