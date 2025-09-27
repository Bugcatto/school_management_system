function onEditSalesRecord(e) {
  var paidstatus='P.Status'
  var soursesheet = 'General Enquiry';
  var sheetName = e.source.getSheetName();
  var salesRecordName = 'Sales Record';
  var currentDate = new Date();
  var formattedDate = Utilities.formatDate(currentDate, 'Asia/Yangon', 'MM/dd/yy HH:mm:ss');
  Logger.log(sheetName);
  var editedrow = e.range.getRow();
  var editedcol = e.range.getColumn();
  Logger.log(editedcol);
  Logger.log(editedrow);

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(soursesheet);
  Logger.log("Stage 1");

  // Check if the edit is in the specified sheet and column
  if (sheetName === soursesheet && paidstatus === getHeader(soursesheet,editedcol)) {
    //var editedValue = e.value.toLowerCase(); // Convert to lowercase for case-insensitivity
    var editedValue = e.value; // retrieve value from event
    Logger.log("Stage 2");
    Logger.log(editedValue);
    if (editedValue === "Paid" || editedValue === "FOC" || editedValue === "SCHOLARSHIP"){
      
      var headersToCheck = ['Course', 'Sub-Course', 'Batch', 'Facebook Name', 'Name', 'Email', 'Gender', 'Phone'];
      Logger.log (headersToCheck.length);

      
      // Log details for debugging
      Logger.log('Edit detected. Edited value: ' + editedValue)
      // Display a toast message for debuggin

      // Find the position of the edited value in the 'P.status' column
      var rowIndex = e.range.getRow()
      
      // Log details for debugging
      Logger.log('Row Index: ' + rowIndex)
      
      // Copy the entire row to "Sales Record" starting from column 2
      var salesSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sales Record');
      var filter = sheet.getFilter();
      if (filter){
       filter.remove();
      }
      var lastColumn = sheet.getLastColumn()
      
      // Limit the number of columns to 38
      var numberOfColumnsToCopy = 44;
      lastColumn = Math.min(lastColumn, numberOfColumnsToCopy);
      var rowData = getRowData(sheet, rowIndex, 1, 1, lastColumn);
      Logger.log(rowData);
      Logger.log("Checking Duplicate");
      if(!isDuplicate(salesRecordName, rowData, headersToCheck)){
        //Logger.log (isDuplicate(salesRecordName, rowData, headersToCheck));


            // Log details for debugging
            Logger.log('Copying row to "Sales Record".');

            // Get the values from the edited row
            var rowData = sheet.getRange(rowIndex, 1, 1, lastColumn).getValues()[0];

            // Log details for debugging
            Logger.log('Row Data: ' + rowData);

            // Paste the values to "Sales Record" starting from column 2 after a delay of 2000 milliseconds (2 second)
            Utilities.sleep(2000);
            salesSheet.getRange(salesSheet.getLastRow() + 1, 2, 1, lastColumn).setValues([rowData]);
            // Set the format of the entire pasted row to text
            var salesRecordRange = salesSheet.getRange(salesSheet.getLastRow(), 2, 1, lastColumn);
            salesRecordRange.setNumberFormat('@');

            // Log details for debugging
            Logger.log('Row copied to "Sales Record".');

            // Set the date in the "Date" column of the same row
            var dateColumnNumber = getHeaderIndex(salesRecordName, 'Date'); // Replace 'Date' with your actual column name

            // Log details for debugging
            Logger.log('Setting date in "Date" column.');

            salesSheet.getRange(salesSheet.getLastRow(), dateColumnNumber).setValue(formattedDate);

            // Log details for debugging
            Logger.log('Date set.');

            // Display a toast message for debugging
            SpreadsheetApp.getActiveSpreadsheet().toast('Row copied to "Sales Record" and date set.');
      }
    
    }
  }
  retrieveSalesData();
}

