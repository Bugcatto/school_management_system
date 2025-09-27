function onChangetrigger2() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Issued Receipt");

  // Check if any of the specified cells are empty
  if (
    sheet.getRange("A1").getValue() === "" ||
    sheet.getRange("A1").getValue() === "#REF!"
  ) {
    // Clear the sheet before setting the formula
    sheet.clear(); // This will clear all content and formatting from the sheet
    
    // Set the default formula in cell A1
    sheet.getRange("A1").setFormula(
      '=query(IMPORTRANGE(\'Ins Sheet(DNT!)\'!C9,""&\'Ins Sheet(DNT!)\'!E9&"!A:L"),"SELECT * WHERE Col12 <> \'Void\'")'
    );

  }
}
