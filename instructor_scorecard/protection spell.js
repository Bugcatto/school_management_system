function protectSheetsExceptList() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const exceptionSheets = ["Score Card","Record Score Criteria History"]; // Add more sheet names here
  const editors = []; // Add emails like "admin@example.com"

  const allSheets = ss.getSheets();

  allSheets.forEach(sheet => {
    const name = sheet.getName();
    const protections = sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET);
    
    // Remove protection if now in exception list
    if (exceptionSheets.includes(name)) {
      protections.forEach(p => {
        if (p.canEdit()) p.remove();
      });
    } else {
      // Add protection if not already protected
      if (protections.length === 0) {
        const protection = sheet.protect().setDescription("Protected by script");
        protection.removeEditors(protection.getEditors());

        editors.forEach(email => protection.addEditor(email));
        if (protection.canDomainEdit()) protection.setDomainEdit(false);
      }
    }
  });
}
