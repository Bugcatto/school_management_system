//Library Code - 1LCMQVuDk-GznjUvO637F0szJKo5jrdEISSaCLJkg2atIiItWuGw-1YzD
function Initialsetup() {
  FunctionSet.setupsheet();
  FunctionSet.setAccess();
  FunctionSet.setempinfo();
}
function byebye() {
  FunctionSet.byebye();
}
function SetAccess() {
  FunctionSet.setAccess();
}
const M_TITLE = 'Function';
function onOpen(e) {
const menu = SpreadsheetApp.getUi().createMenu(M_TITLE)
  menu
    .addItem('Update Access', 'SetAccess')
    .addToUi();
}
function callbackup7() {
  FunctionSet.backupSpreadsheet7();
}
function callbackup24() {
  FunctionSet.backupSpreadsheet24();
}
