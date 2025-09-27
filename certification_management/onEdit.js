function onEditforCProcess(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const range = e.range;
  const value = e.value;

  if (range.getA1Notation() !== "A1" || value !== "Process") return;

  const sheetName = range.getSheet().getName();

  if (sheetName === "Certificate Issued Processing") {
    const sheet = ss.getSheetByName(sheetName);
    const bValues = sheet.getRange("B3:B" + sheet.getLastRow()).getValues().flat();
    const hasData = bValues.some(v => v !== "");

    if (!hasData) {
      ss.toast("Nothing to issue 🚫", "Info", 4);
      clearCertificateIssuedProcessing();
      setupCertificateTemplate();
      return;
    }

    appendConfirmedRowsUsingSortCodeAndEmail();
  }

  if (sheetName === "For Emailing Certificate") {
    sendMatrixBadgeWithShareLinkAndLogRow();
  }

  if (sheetName === "For Printing") {
    exportCSVWithQRsFromTextAsZip();
  }
}
