//Library Code - 1LCMQVuDk-GznjUvO637F0szJKo5jrdEISSaCLJkg2atIiItWuGw-1YzD
function Initialsetup() {
  FunctionSet.setupsheet();
  FunctionSet.setAccess();
  FunctionSet.setempinfo();
  FunctionSet.deleteAllTriggers();
  createInstallableTrigger();
  createTimeDrivenTrigger24();
  createTimeDrivenTrigger7();
  createHourlyTimeDrivenTrigger();
  createMinuteTrigger();
  //createInstallableTriggerDR();
  //createInstallableTriggerWR();
}
function byebye() {
  FunctionSet.byebye();
}
function SetAccess() {
  FunctionSet.setAccess();
}

const M_TITLE = 'Function';
//function onOpen(e) {

function onOpenTrigger() {
FunctionSet.setAccess();
FunctionSet.showUrls();
const menu = SpreadsheetApp.getUi().createMenu(M_TITLE)
  menu
    .addItem('Update Access', 'SetAccess')
    .addItem('Directory', 'FunctionSet.showUrls')
    .addToUi();
}

function createInstallableTrigger() {
  ScriptApp.newTrigger('onOpenTrigger')
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onOpen()
    .create();
}




function createTimeDrivenTrigger24() {
  // Create a time-driven trigger that runs the 'timeTriggerFunction' every day at midnight
  ScriptApp.newTrigger('callbackup24')
    .timeBased()
    .everyDays(1)           // Set the trigger to run every day
    .atHour(0)              // Set the time to run (midnight, 0:00 AM)
    .create();
}

function createTimeDrivenTrigger7() {
  // Create a time-driven trigger that runs the 'timeTriggerFunction' every day at midnight
  ScriptApp.newTrigger('callbackup7')
    .timeBased()
    .everyDays(7)           // Set the trigger to run every week
    .atHour(0)              // Set the time to run (midnight, 0:00 AM)
    .create();
}

function createHourlyTimeDrivenTrigger() {
  // Create a time-driven trigger that runs the 'SetAccess' function every hour
  ScriptApp.newTrigger('SetAccess')
    .timeBased()
    .everyHours(1)          // Set the trigger to run every hour
    .create();
}

function createMinuteTrigger() {
  
  // Create a time-driven trigger that runs the 'copynewstudent' function every minute
  ScriptApp.newTrigger('copynewstudent')
    .timeBased()
    .everyMinutes(1) // Set the trigger to run every minute
    .create();
  
  console.log("Minute trigger created successfully!");
}

function callbackup7() {
  FunctionSet.backupSpreadsheet7();
}
function callbackup24() {
  FunctionSet.backupSpreadsheet24();
}

function authorizeScript() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  Logger.log('Authorization complete for spreadsheet: ' + spreadsheet.getName());
  spreadsheet.toast('Script has been authorized!', 'Authorization', 5);
}
//
//function createDailyTrigger() {
//  // Deletes any existing triggers for this function to avoid duplicates
//  deleteTriggers('callbackup24');
//  
//  // Creates a new daily trigger
//  ScriptApp.newTrigger('callbackup24')
//    .timeBased()
//    .everyDays(1) // Runs every day
//    .atHour(0)    // Runs at midnight (0 means 00:00)
//    .create();
//}
//
//// Helper function to delete existing triggers for a specific function
//function deleteTriggers(functionName) {
//  var allTriggers = ScriptApp.getProjectTriggers();
//  for (var i = 0; i < allTriggers.length; i++) {
//    if (allTriggers[i].getHandlerFunction() === functionName) {
//      ScriptApp.deleteTrigger(allTriggers[i]);
//    }
//  }
//}