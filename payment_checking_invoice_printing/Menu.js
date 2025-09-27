const M_TITLE = 'Function';
function onOpen(e) {
const menu = SpreadsheetApp.getUi().createMenu(M_TITLE)
  menu
    .addItem('Print Selected Transaction', 'printTransaction2')
    .addSeparator()
    .addItem('Print All', 'printallapproved')
    .addToUi();
}

function authorizeScript() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Authorization complete for spreadsheet: ' + spreadsheet.getName());
  spreadsheet.toast('Script has been authorized!', 'Authorization', 5);
}
