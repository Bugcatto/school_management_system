function updateDropdown() {
  try {
    // Get form IDs from URLs
    var formUrls = getGoogleFormUrls();
    var formIds = getFormIds(formUrls);

    // Log form IDs
    //Logger.log(formIds);

    // Specify the title of the item you want to update
    var headerName = "*Course/Program (Matrix Team မှသာဖြည့်ရန်)";
    var sheetName = 'Form Field List';

    // Iterate through each form ID
    formIds.forEach(formId => {
      try {
        // Open the form
        var form = FormApp.openById(formId);

        // Log form items
        logFormItems(form);

        // Get the ID of the item with the specified title
        var itemId = getItemIdByTitle(form, headerName);

        // If there's no matching header, skip to the next form
        if (!itemId) {
          console.warn('Item with title "' + headerName + '" not found in Form ID: ' + formId);
          return;
        }

        // Get the form list item
        var formListItem = form.getItemById(itemId).asListItem();

        // Get values from the specified sheet and header
        var list = getValuesFromSheet(sheetName, headerName);

        // Update dropdown choices
        console.log(list);
        formListItem.setChoiceValues(list);

        console.log('Dropdown updated successfully for Form ID: ' + formId);
      } catch (formError) {
        // Log form-specific errors
        console.error('Error updating dropdown for Form ID ' + formId + ':', formError.message);
      }
    });
  } catch (globalError) {
    // Log global errors
    console.error('Global Error:', globalError.message);
  }
}


function getFormIds(urls) {
  return urls.map(url => {
    var formIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)(\/|$)/);
    if (!formIdMatch || formIdMatch.length < 2) {
      throw new Error('Invalid Form URL or ID: ' + url);
    }
    return formIdMatch[1];
  });
}

function getItemIdByTitle(form, title) {
  var items = form.getItems();
  for (var i in items) {
    if (items[i].getTitle() === title) {
      return items[i].getId();
    }
  }
  // Return null if not found
  return null;
}

function logFormItems(form) {
  var items = form.getItems();
  for (var i in items) {
    console.log(items[i].getTitle() + ' - ' + items[i].getId());
  }
}

function getValuesFromSheet(sheetName,headname) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  
  // Assuming "Course List" has a header in the first row
  var header = headname; // Replace with the actual header name

  // Find the column index by header
  var columnIndex = getHeaderIndex(sheetName, header);
  Logger.log(columnIndex);

  // If the header is not found, log an error
  if (columnIndex === -1) {
    throw new Error('Header "' + header + '" not found in sheet "' + sheetName + '".');
  }

  // Get values from the specified column
  var range = sheet.getRange(2, columnIndex, sheet.getLastRow() - 1, 1);
  var list = range.getValues().flat().filter(row => row !== '');
  Logger.log("Item Retrieve");
  Logger.log(list);
  Logger.log(range);

  // Add "Other" as a fixed option
  list.push("Other");

  return list;
}

// Function to get the value of a header in a specific column
function getHeader(sheetName, column) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headerRange = sheet.getRange(1, column);
  return headerRange.getValue();
}

// Function to get the index of a header in a specific sheet
function getHeaderIndex(sheetName, header) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]; // to get the header from the table
  return headers.indexOf(header) + 1;
}
