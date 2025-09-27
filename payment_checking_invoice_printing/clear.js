function clearTemplateSheet3() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const templateSheet = ss.getSheetByName(INVOICE_TEMPLATE_SHEET_NAME_2);
  

  // List of all the ranges where values are set in createInvoiceForStudent
  const rngClear = templateSheet.getRangeList([
    'H7', 'B9', 'B10', 'B11','A15','A16', 'A17','A18','A19', 'H4', 'H7', 'H10', 'A15', 'A22', 
    'G15','G16', 'H22', 'A18', 'G18', 'A19', 'G19', 'G20', 'H21', 'H23', 'H30'
  ]).getRanges();
  // Clear the content of all the specified ranges
  rngClear.forEach(function (cell) {
    cell.clearContent();
  });
}