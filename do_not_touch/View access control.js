function importDataAndViewAccess() {
  try {
    // Log start of function execution
    Logger.log("Starting importDataAndViewAccess function execution...");

    // Open the source spreadsheet by URL
    var sourceSpreadsheet = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
    Logger.log("Source spreadsheet opened successfully.");

    // Open the destination spreadsheet by URL
    var destinationSpreadsheet = SpreadsheetApp.openByUrl(DSPREADSHEET_URL);
    Logger.log("Destination spreadsheet opened successfully.");

    // Get the folder by URL
    var folder = DriveApp.getFolderById(Main_id);
    Logger.log("Folder retrieved successfully.");

    // Get the source sheet ("Folder Accsess Control")
    var sourceSheet = sourceSpreadsheet.getSheetByName("Folder Accsess Control");

    // Check if the source sheet exists
    if (!sourceSheet) {
      throw new Error("Source sheet 'Folder Accsess Control' not found.");
    }
    Logger.log("Source sheet 'Folder Accsess Control' found.");

    try {
      // Get the destination sheet ("View Permission List") in the destination spreadsheet
      var destinationSheet = destinationSpreadsheet.getSheetByName("View Permission List");

      // Check if the destination sheet exists
      if (!destinationSheet) {
        throw new Error("Destination sheet 'View Permission List' not found.");
      }
      Logger.log("Destination sheet 'View Permission List' found.");

      // Get the data range from the source sheet
      var range = sourceSheet.getRange("A2:A");

      // Log the fetched range for debugging
      var fetchedValues = range.getValues();

      // Filter out empty and error values from the source data
      var values = fetchedValues.filter(function (row) {
        return row[0] !== "" && !row[0].match(/#(REF|VALUE|DIV\/0|NAME|N\/A|NUM|NULL)!/);
      });
      Logger.log("Filtered data from source sheet: " + JSON.stringify(values));

      // Clear existing data in the destination sheet
      var lastRow = destinationSheet.getLastRow();

      Logger.log("Last row in destination sheet before clearing: " + lastRow);
      if (lastRow > 1) {
        destinationSheet.getRange("A2:A" + lastRow).clearContent();
        Logger.log("Cleared existing data in destination sheet.");
      } else {
        Logger.log("No data to clear in destination sheet.");
      }

      // Write the filtered data to the destination sheet
      if (values.length > 0) {
        var destinationRange = destinationSheet.getRange(2, 1, values.length, 1);
        destinationRange.setValues(values);
        Logger.log("Filtered data written to destination sheet.");
      } else {
        Logger.log("No data to write to destination sheet.");
      }
    } catch (error) {
      // Log the error
      Logger.log("An error occurred: " + error.message);
      // Display an alert to the user
      SpreadsheetApp.getUi().alert("An error occurred: " + error.message);
    }

    // Ensure there are email addresses to process
    var lastRow = destinationSheet.getLastRow();
    if (lastRow <= 1) {
      Logger.log("No email addresses found in the destination sheet.");
      return;
    }

    // Get email addresses from column A of the destination sheet
    var emails = destinationSheet.getRange("A2:A" + lastRow).getValues().flat().filter(String);
    Logger.log("Retrieved email addresses: " + JSON.stringify(emails));
    Logger.log("Set1");
    // Get existing viewers of the destination spreadsheet
    var existingViewers = destinationSpreadsheet.getViewers();
    Logger.log("Retrieved existing viewers: " + JSON.stringify(existingViewers.map(function (viewer) { return viewer.getEmail(); })));

    // Get existing editors of the folder
    var existingEditors = folder.getEditors();
    Logger.log("Retrieved existing editors: " + JSON.stringify(existingEditors.map(function (editor) { return editor.getEmail(); })));

    emails.forEach(function (email) {
      try {
        // Trim leading and trailing spaces from the email address
        email = email.trim();
        var lowercaseEmail = email.toLowerCase();

        // Validate the email format (basic validation)
        if (!/\S+@\S+\.\S+/.test(email)) {
          Logger.log("Invalid email format: " + email);
          return; // Skip invalid emails
        }

        // Get the owner email of the destination spreadsheet
        var ownerEmail = destinationSpreadsheet.getOwner().getEmail().toLowerCase();

        // Skip if the email is the owner
        if (lowercaseEmail === ownerEmail) {
          Logger.log("Skipping owner email: " + email);
          return; // Skip owner
        }

        // Check if the email address is not already a viewer of the destination spreadsheet
        if (!existingViewers.map(function (viewer) { return viewer.getEmail().toLowerCase(); }).includes(lowercaseEmail)) {
          destinationSpreadsheet.addViewer(email); // Add viewer access to the destination spreadsheet
          Logger.log("Added viewer access for email: " + email);
        }

        // Check if the email address is not already an editor of the folder
        if (!existingEditors.map(function (editor) { return editor.getEmail().toLowerCase(); }).includes(lowercaseEmail)) {
          folder.addEditor(email); // Add editor access to the folder
          Logger.log("Added editor access for email: " + email);
        }

        // Optionally, add a short delay to avoid rate-limiting issues
        // Utilities.sleep(1000);

      } catch (error) {
        Logger.log("An error occurred with email: " + email + " - " + error.message);
      }
    });

    // Remove access for any users who are viewers of the destination spreadsheet but not in the email list
    existingViewers.forEach(function (existingViewer) {
      var existingEmail = existingViewer.getEmail().toLowerCase().trim();
      if (!emails.map(function (email) { return email.toLowerCase().trim(); }).includes(existingEmail)) {
        destinationSpreadsheet.removeViewer(existingViewer.getEmail()); // Remove viewer access from the destination spreadsheet
        Logger.log("Removed viewer access for email: " + existingViewer.getEmail());
      }
    });

    // Remove editor access from the folder for any users not in the email list
    existingEditors.forEach(function (existingEditor) {
      var existingEmail = existingEditor.getEmail().toLowerCase().trim();
      if (!emails.map(function (email) { return email.toLowerCase().trim(); }).includes(existingEmail)) {
        folder.removeEditor(existingEditor.getEmail()); // Remove editor access from the folder
        Logger.log("Removed editor access for email: " + existingEditor.getEmail());
      }
    });

    // Display a toast message indicating successful execution
    //SpreadsheetApp.getActiveSpreadsheet().toast("Data imported and access updated.", "Success", 5);

    // Log success message to the logger
    Logger.log("Data imported and access updated.");

    // Log end of function execution
    Logger.log("ImportDataAndViewAccess function execution completed successfully.");
  } catch (error) {
    // Log the error
    Logger.log("An error occurred: " + error.message);

    // Display an alert to the user
    SpreadsheetApp.getUi().alert("An error occurred: " + error.message);
  }
}
