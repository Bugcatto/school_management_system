function generateQRCodes() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Issued QR");
  const lastRow = sheet.getLastRow();

  const qrColumn = sheet.getRange("A2:A" + lastRow).getValues(); // QR code image column
  const textColumn = sheet.getRange("B2:B" + lastRow).getValues(); // QR text column

  let count = 0;

  for (let i = 0; i < textColumn.length; i++) {
    const existingQR = qrColumn[i][0];
    const text = textColumn[i][0];

    if (!existingQR && text) {
      const url = encodeURIComponent(text);
      const qrUrl = `https://quickchart.io/qr?text=${url}&size=150`;
      sheet.getRange(i + 2, 1).setFormula(`=IMAGE("${qrUrl}")`);
      count++;
    }
  }

  try {
    ss.toast(`✅ ${count} new QR code(s) generated.`, "Matrix College", 4);
  } catch (e) {
    Logger.log("ℹ️ Toast not supported here – running in non-UI context.");
  }

  Logger.log(`🎉 Finished generating ${count} QR code(s).`);
}
