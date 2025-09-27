function protectSheetinstasheet() {
  var emailList = getAdminOnly();
  var sheetName = "Ins Sheet(DNT!)";
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  // Protect the sheet
  var protection = sheet.protect().setDescription('Sheet Protection');

  // Remove all existing editors
  var editors = protection.getEditors();
  for (var i = 0; i < editors.length; i++) {
    protection.removeEditor(editors[i]);
  }

  // Add specified editors
  for (var j = 0; j < emailList.length; j++) {
    try {
      protection.addEditor(emailList[j]);
      Logger.log('Success adding editor: ' + emailList[j]);
    } catch (e) {
      Logger.log('Error adding editor: ' + emailList[j] + ' - ' + e.message);
    }
  }

  // Ensure the sheet owner still has access
  var owner = Session.getEffectiveUser().getEmail();
  protection.addEditor(owner);

  Logger.log('Sheet protected and permissions set for: ' + emailList.join(", "));
}
function getAdminOnly() {
  // Open the spreadsheet using the global URL
  const spreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  
  // Get the "Access Control" sheet
  const accessSheet = spreadsheet.getSheetByName("Access Control");
  const accessData = accessSheet.getRange("B1:S" + accessSheet.getLastRow()).getValues();
  
  // Admin user
  const admin = "System Administrator";
  
  // Array to store email addresses
  let emailList = [];
  
  // Check if the header row contains "System Administrator"
  const headerRow = accessData[0];
  const adminColumnIndex = headerRow.indexOf(admin);
  
  if (adminColumnIndex !== -1) {
    // Loop through each row to collect emails in the admin column
    for (let row = 1; row < accessData.length; row++) {
      const email = accessData[row][adminColumnIndex];
      if (email) {
        emailList.push(email);
      }
    }
  }
  
  Logger.log(emailList);
  
  // Return the emailList array
  return emailList;
}
