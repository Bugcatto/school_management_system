const M_TITLE = 'Function';
const SPREADSHEET_URL = PropertiesService.getScriptProperties().getProperty('spreadsheetUrl');
const DSPREADSHEET_URL = PropertiesService.getScriptProperties().getProperty('dspreadsheetUrl');
const Main_id = PropertiesService.getScriptProperties().getProperty('folder id');

function onOpen() {
const menu = SpreadsheetApp.getUi().createMenu(M_TITLE)
  menu
    .addItem('Update Access', 'setAccess')
    .addToUi();
}