function setAccess() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    getQueryData(SPREADSHEET_URL);
    var emailList = getEmailList().map(e => e.toLowerCase().trim()); // normalize email list
    Logger.log(emailList);

    var editors = ss.getEditors();
    var viewers = ss.getViewers();
    var ownerEmail = ss.getOwner().getEmail().toLowerCase();
    var addedEmails = [];

    // Step 1: Remove editor access if not in the list
    editors.forEach(function (editor) {
      var email = editor.getEmail().toLowerCase();
      if (!emailList.includes(email) && email !== ownerEmail) {
        ss.removeEditor(email);
        Logger.log("Removed editor access for: " + email);
      }
    });

    // Step 2: Remove viewer access if not in the list
    viewers.forEach(function (viewer) {
      var email = viewer.getEmail().toLowerCase();
      if (!emailList.includes(email) && email !== ownerEmail) {
        ss.removeViewer(email);
        Logger.log("Removed viewer access for: " + email);
      }
    });

    // Step 3: Add editor access for emails not already editors
    emailList.forEach(function (email) {
      if (email && isValidEmail(email) && !editors.some(e => e.getEmail().toLowerCase() === email)) {
        try {
          ss.addEditor(email);
          Logger.log("Added editor access for: " + email);
          addedEmails.push(email);
        } catch (e) {
          Logger.log("Error adding editor access for " + email + ": " + e);
        }
      }
    });

  } catch (error) {
    Logger.log("Error in setAccess: " + error);
    SpreadsheetApp.getActiveSpreadsheet().toast("Access error. Check logs.", "Error", 5);
  }

  importDataAndViewAccess();
  protectSheetinstasheet();
}



function getEmailList() {

  // Open the spreadsheet using the URL ID
  var sslink = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get the data range from "Ins Sheet(DNT!)"
  var insSheet = spreadsheet.getSheetByName("Ins Sheet(DNT!)");
  var insData = insSheet.getRange("A2:A" + insSheet.getLastRow()).getValues();
  
  // Add "System Administrator" to insData
  insData.push(["System Administrator"]);
  
  // Get the data range from "Access Right" sheet
  var accessSheet = sslink.getSheetByName("Access Control");
  var accessData = accessSheet.getRange("B1:S" + accessSheet.getLastRow()).getValues();
  
  // Create an array to store the email addresses
  var emailList = [];
  
  // Loop through each header in the "Access Right" sheet
  for (var i = 0; i < accessData[0].length; i++) {
    var header = accessData[0][i];
    
    // Check if the header matches any item in the "Ins Sheet(DNT!)"
    if (insData.flat().includes(header)) {
      // If there's a match, collect the emails under that header
      for (var j = 1; j < accessData.length; j++) {
        var email = accessData[j][i];
        if (email !== "") {
          emailList.push(email);
        }
      }
    }
  }
  
  // Return the emailList array
  return emailList;
}

function isValidEmail(email) {
  // You can use a simple regex pattern to check if the email is valid
  var emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailPattern.test(email);
}
