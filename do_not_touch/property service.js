function setSpreadsheetUrlProperty() {
  var url = 'https://docs.google.com/spreadsheets/d/10rG7qQzncHN-R8jVfw8tRllc7HLcu2AB8-iajbinmiQ/edit';
  var durl = 'https://docs.google.com/spreadsheets/d/1VXOIfRgEg_wZgGmDrjDqsTVObEbHqC-Vcqch8Mkdg_A/edit';
  
  var folder_id= '14qJ0RTZWcPKTeku82vacW_ZHpAmMaC5O';
  PropertiesService.getScriptProperties().setProperty('spreadsheetUrl', url);
  PropertiesService.getScriptProperties().setProperty('dspreadsheetUrl', durl);
  PropertiesService.getScriptProperties().setProperty('folder id', folder_id);
}