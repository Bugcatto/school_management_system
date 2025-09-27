function clearValuesC10() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Score Card");
  const range = sheet.getRange("C10:C");
  range.clearContent(); // This clears only the cell values, not formatting or data validation
}