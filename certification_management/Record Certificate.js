function appendConfirmedRowsUsingSortCodeAndEmail() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sourcesheetname = "Certificate Issued Processing";
  const sourceSheet = ss.getSheetByName(sourcesheetname);
  const targetSheet = ss.getSheetByName("Current Certificate Issued List");

  try {
    // Get headers - source starts at D, target starts at D
    const sourceHeaders = sourceSheet.getRange("D2:Z2").getValues()[0];
    const targetHeaders = targetSheet.getRange("D1:Z1").getValues()[0];

    Logger.log("Source Headers: " + JSON.stringify(sourceHeaders));
    Logger.log("Target Headers: " + JSON.stringify(targetHeaders));

    const getIndex = (headers, name) => headers.findIndex(h => h.trim() === name);

    const sortCodeIndex = getIndex(sourceHeaders, "Sort Code");
    const emailIndex = getIndex(sourceHeaders, "Email");
    const targetSortCodeIndex = getIndex(targetHeaders, "Sort Code");
    const targetEmailIndex = getIndex(targetHeaders, "Email");

    if (sortCodeIndex === -1 || emailIndex === -1 || targetSortCodeIndex === -1 || targetEmailIndex === -1) {
      ui.alert("One or more required columns (Sort Code or Email) not found.");
      return;
    }

    const sourceLastRow = sourceSheet.getLastRow();
    const sourceData = sourceSheet.getRange("B3:Z" + sourceLastRow).getValues();
    Logger.log("Source Data Length: " + sourceData.length);

    const targetLastRow = targetSheet.getLastRow();
    const targetData = targetLastRow > 1
      ? targetSheet.getRange("D2:Z" + targetLastRow).getValues()
      : [];

    Logger.log("Target Data Length: " + targetData.length);

    const existingKeys = new Set(
      targetData.map(row =>
        `${row[targetSortCodeIndex] || ""}|${row[targetEmailIndex] || ""}`
      )
    );

    //const formatDate = date => Utilities.formatDate(date, Session.getScriptTimeZone(), "dd/MM/yy");
    const rowsToAppend = [];

    for (const row of sourceData) {
      const status = row[0]; // Column B
      const dataRow = row.slice(2); // D→Z data
      const key = `${dataRow[sortCodeIndex] || ""}|${dataRow[emailIndex] || ""}`;

      if (status === "Confirm" && !existingKeys.has(key)) {
        rowsToAppend.push([new Date(), ...dataRow]);
      }
    }

    Logger.log("Rows to Append: " + rowsToAppend.length);
    if (rowsToAppend.length > 0) {
      Logger.log("Preview of first row to append: " + JSON.stringify(rowsToAppend[0]));
    }

    if (rowsToAppend.length === 0) {
      ss.toast("No new rows to append ✅", "Certificate Script", 4);
      clearCertificateIssuedProcessing();
      setupCertificateTemplate();
      return;
    }

    const pasteStartRow = Math.max(targetSheet.getLastRow(), 1) + 1;
    const pasteCol = 4;
    Logger.log("Pasting " + rowsToAppend.length + " rows at row " + pasteStartRow + ", column " + pasteCol);

    targetSheet.getRange(pasteStartRow, pasteCol, rowsToAppend.length, rowsToAppend[0].length).setValues(rowsToAppend);

    ss.toast(`Appended ${rowsToAppend.length} new row(s) ✅`, "Certificate Script", 4);
    //generateQRCodes();
    clearCertificateIssuedProcessing(sourcesheetname);
    setupCertificateTemplate();

  } catch (err) {
    Logger.log("❌ Error: " + err.message);
    ui.alert("Error: " + err.message);
  }
}
