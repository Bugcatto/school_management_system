function deleteAllTriggers() {
  // Get all the triggers for the current project
  var allTriggers = ScriptApp.getProjectTriggers();
  
  // Loop through and delete each trigger
  for (var i = 0; i < allTriggers.length; i++) {
    ScriptApp.deleteTrigger(allTriggers[i]);
  }
  
  Logger.log('All triggers have been removed.');
}
