// Function to check and store count in cache
function checkAndUpdateCache() {
  try {
    // Specify the sheet name and the column to monitor
    var columnToMonitor = 11; // Column H (1-based index)

    // Open the spreadsheet
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName('Course Schedule Link');
    
    // Get all the data from column H and convert to string values
    var data = sheet.getRange(1, columnToMonitor, sheet.getLastRow(), 1).getValues().flat().map(String);

    // Log the entire data from column H
    Logger.log('Data from Column H:', data);

    // Filter out empty values
    var nonEmptyValues = data.filter(Boolean);
    var len = nonEmptyValues.length;
    Logger.log (len);


    // Log the count of non-empty values
    Logger.log('Number of Non-Empty Values:', nonEmptyValues.length);

    // Get the current count
    var currentCount = nonEmptyValues.length;

    // Retrieve the previous count from the cache
    var cache = CacheService.getDocumentCache();
    var previousCount = cache.get('previousCount');

    // Log the current count and previous count
    Logger.log(currentCount);
    Logger.log(previousCount);

    // If there is no previous count or if the count has increased, update the cache and call the update function
    if (!previousCount || currentCount != parseInt(previousCount)) {
      cache.put('previousCount', currentCount.toString());

      // Call the function to update the form
      updateDropdown();
      updateDropdown2();

      // Log a message indicating that the form has been updated
      Logger.log('Form Updated!');
      
      // Show a toast notification for debugging purposes
      spreadsheet.toast('Form Updated!', 'Debug', 5);
    }
  } catch (error) {
    console.error('Error:', error.message);

    // Show a toast notification for debugging purposes in case of an error
    spreadsheet.toast('Error: ' + error.message, 'Debug', 5);
  }
}
