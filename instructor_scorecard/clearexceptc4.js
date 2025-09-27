function clearSheetExceptC4() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Score Card");
  if (!sheet) return;

  // Store value, formula, and format from C4
  var c4 = sheet.getRange("C4");
  var c4Value = c4.getValue();
  var c4Formula = c4.getFormula();
  var c4Background = c4.getBackground();
  var c4FontColor = c4.getFontColor();
  var c4FontWeight = c4.getFontWeight();

  // Clear content only
  sheet.clear();

  // Restore C4
  if (c4Formula) {
    c4.setFormula(c4Formula);
  } else {
    c4.setValue(c4Value);
  }
  c4.setBackground(c4Background)
    .setFontColor(c4FontColor)
    .setFontWeight(c4FontWeight);
}
