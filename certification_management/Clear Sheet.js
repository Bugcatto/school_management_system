function clearCertificateIssuedProcessing(sourcesheetname) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sourcesheetname);
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  // Clear values only (not formulas) from row 3 onward, columns B to last column
  const rangeToClear = sheet.getRange(1, 1, lastRow, lastCol);
  rangeToClear.clearContent(); // Keeps formatting/formulas in row 3

  SpreadsheetApp.getActiveSpreadsheet().toast("Processing sheet cleared ✅", "Done");
}
