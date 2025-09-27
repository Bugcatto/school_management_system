function retrieveSalesData() {
  // Access the spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Sales Data Missing");
  var targetSheet = ss.getSheetByName("Sales Record");
  
  // Get the value of cell A1
  var cellA1Value = sheet.getRange("A1").getValue();
  
  // Check if A1 value is greater than 0
  if (cellA1Value > 0) {
    // Get the range of columns E to AV
    var range = sheet.getRange("E3:AV");
    
    // Get all values in columns E to AV
    var values = range.getValues();
    
    // Initialize an array to store the adjacent row values
    var adjacentValues = [];
    
    // Get current date
    var currentDate = new Date();
    var formattedDate = Utilities.formatDate(currentDate, 'Asia/Yangon', 'M/d/yyyy HH:mm:ss');
    
    // Iterate through each cell in column E
    for (var i = 0; i < values.length; i++) {
      // Check if the cell in column E is not empty
      if (values[i][0] !== "") {
        // Initialize an inner array to store the adjacent row values for this non-empty cell
        var rowAdjacentValues = [];
        
        // Add current date as the first column value
        rowAdjacentValues.push(formattedDate);
        
        // Iterate through columns F to AV for the current row, skipping column E
        for (var j = 1; j < values[i].length; j++) {
          // Push the value to the inner array
          rowAdjacentValues.push(values[i][j]);
        }
        // Push the inner array to the main array
        adjacentValues.push(rowAdjacentValues);
      }
    }
    
    // Set values into the last row of "Sheet91"
    var lastRow = targetSheet.getLastRow() + 1; // Get the next empty row
    targetSheet.getRange(lastRow, 1, adjacentValues.length, adjacentValues[0].length).setValues(adjacentValues);
    
    // Log the array of adjacent values
    Logger.log("Values have been set into the last row of Sheet91.");
    
    // You can do whatever you want with the adjacentValues array here, such as processing it further or displaying it.
  } else {
    Logger.log("Cell A1 does not have a value greater than 0. Script execution halted.");
  }
  setNumberFormat();
}
