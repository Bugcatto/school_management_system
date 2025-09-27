const M_TITLE = 'Function';

function onOpen(e) {
const menu = SpreadsheetApp.getUi().createMenu(M_TITLE)
  menu
    .addItem('Update Access', 'SetAccess')
    .addItem('Update Dropdown','updateDropdown')
    .addItem('Update Sales','updateDropdown2')
    .addToUi();
}