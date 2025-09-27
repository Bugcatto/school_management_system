function copynewstudent() {
  try {
    // Get the active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Get the "New Student Check" sheet
    var sourceSheet = ss.getSheetByName("New Student Check");
    
    // Check if the source sheet exists
    if (!sourceSheet) {
      throw new Error("Source sheet 'New Student Check' not found.");
    }
    
    // Check the value in cell A1 of the "New Student Check" sheet
    var a1Value = sourceSheet.getRange("A1").getValue();
    
    // Exit the function if the value in A1 is 0
    if (a1Value === 0) {
      console.log("A1 value is 0. Exiting script.");
      return;
    }
    
    // Get the "ID Issuer" sheet
    var targetSheet = ss.getSheetByName("ID Issuer");
    
    // Check if the target sheet exists
    if (!targetSheet) {
      throw new Error("Target sheet 'ID Issuer' not found.");
    }
    
    // Get the range of data from "New Student Check" sheet (B2:E to the last row with data)
    var sourceRange = sourceSheet.getRange(2, 2, sourceSheet.getLastRow() - 1, 4);
    
    // Get the values from the source range
    var sourceValues = sourceRange.getValues();
    
    // Find the last row with data in "ID Issuer" sheet (column D)
    var lastRow = targetSheet.getRange("D:D").getValues().filter(String).length;
    
    // If the last row is 1, it means there's only a header, so start appending from row 2
    if (lastRow <= 1) {
      lastRow = 2;
    } else {
      lastRow += 1; // Start appending after the last row with data
    }
    
    // Set the values from the source range to the target range (starting from the last row + 1)
    targetSheet.getRange(lastRow, 4, sourceValues.length, sourceValues[0].length).setValues(sourceValues);
    
    // Log success message
    console.log("Data appended successfully!");
  } catch (error) {
    // Log and handle errors
    console.error("Error: " + error.message);
    SpreadsheetApp.getUi().alert("Error: " + error.message);
  }
}