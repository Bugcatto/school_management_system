function onChangetrigger() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("General Enquiry");

  // Check if any of the specified cells are empty
  if (
    sheet.getRange("A2").getValue() === "" ||
    sheet.getRange("A2").getValue() === "#REF!" ||
    sheet.getRange("B2").getValue() === "" ||
    sheet.getRange("B2").getValue() === "#REF!" ||
    sheet.getRange("C2").getValue() === "#REF!" ||
    sheet.getRange("D2").getValue() === "" ||
    sheet.getRange("D2").getValue() === "#REF!" ||
    sheet.getRange("E2").getValue() === "" ||
    sheet.getRange("E2").getValue() === "#REF!" ||
    sheet.getRange("W2").getValue() === "" ||
    sheet.getRange("W2").getValue() === "#REF!"
  ) {
    setDefaultFormula2();
  }
  onChangetrigger2();
}
