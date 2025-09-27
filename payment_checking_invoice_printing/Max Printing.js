function printallapproved() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var dataSheet = ss.getSheetByName('Reciept Data Check');
  var printSheet = ss.getSheetByName('Print Sheet');

  if (!dataSheet || !printSheet) {
    Logger.log("Error: One or both sheets not found.");
    SpreadsheetApp.getActiveSpreadsheet().toast("Sheet Missing","Status",5);
    return;
  }

  var dataRange = dataSheet.getRange('A2:A');
  var dataValues = dataRange.getValues();
  
  var dataArray = [];
  for (var i = 0; i < dataValues.length; i++) {
    if (dataValues[i][0] !== "") { // Exclude empty cells
      dataArray.push(dataValues[i][0]);
    }
  }

  if (dataArray.length > 0) {
    var printCell = printSheet.getRange('A2');
    for (var i = 0; i < dataArray.length; i++) {
      printCell.setValue(dataArray[i]);
      printTransaction2(); // Call your custom function here to print the transaction

      // Show a toast notification to indicate progress
      var message = "Printing transaction " + (i + 1) + " of " + dataArray.length;
      SpreadsheetApp.getActiveSpreadsheet().toast(message, "Status", 10);

      // Clear the cell after printing the transaction
      printCell.clearContent();
    }
    SpreadsheetApp.getActiveSpreadsheet().toast("Printing complete!", "Status", 5);
  } else {
    Logger.log("Error: No data found in the Data Sheet column.");
  }
}
