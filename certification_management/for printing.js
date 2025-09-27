function exportCSVWithQRsFromTextAsZip() {
  const sheetName = "for Printing";
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sheet = ss.getSheetByName(sheetName);
  const data = sheet.getDataRange().getValues();

  const certIdCol = 1; // Column B
  const qrTextCol = 19; // Column T
  const zipFolder = DriveApp.createFolder("Temp_Export_" + Date.now());
  const files = [];

  Logger.log("🔄 Starting exportCSVWithQRsFromTextAsZip");
  //ui.showToast("Exporting CSV and QR files... Please wait", "Progress", 3);

  // 1. Create CSV file
  const csvContent = data.slice(1).map(row =>
    row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(",")
  ).join("\n");

  const csvFile = zipFolder.createFile("For_Printing_Export.csv", csvContent, MimeType.PLAIN_TEXT);
  files.push(csvFile);
  Logger.log("✅ CSV file created");

  // 2. Generate QR codes
  let qrCount = 0;
  data.slice(1).forEach((row, index) => {
    const certId = row[certIdCol];
    const qrText = row[qrTextCol];
    const rowNum = index + 2;

    if (certId && qrText) {
      try {
        const encodedText = encodeURIComponent(qrText);
        const qrUrl = `https://quickchart.io/qr?text=${encodedText}&size=150`;
        const response = UrlFetchApp.fetch(qrUrl);
        const blob = response.getBlob().setName(`${certId}.png`);
        const file = zipFolder.createFile(blob);
        files.push(file);
        qrCount++;
        Logger.log(`✅ QR image saved for ${certId}`);
      } catch (err) {
        Logger.log(`❌ Failed QR for ${certId}: ${err}`);
      }
    } else {
      Logger.log(`⚠️ Skipped row ${rowNum}: Missing certId or QR text`);
    }
  });

  Logger.log(`✅ Total QR images generated: ${qrCount}`);

  // 3. Zip the files
  const zipFileName = sheet.getRange("B1").getValue().toString().trim() || "Certificates_Export";
  const zipBlob = Utilities.zip(files.map(f => f.getBlob()), zipFileName + ".zip");
  const zipFile = DriveApp.createFile(zipBlob);
  zipFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  Logger.log("✅ ZIP file created: " + zipFile.getUrl());

  // 4. Append to last row of 'Add Issued Link' sheet
  let issuedSheet = ss.getSheetByName("Add Issued Link");
  if (!issuedSheet) {
    Logger.log("📄 'Add Issued Link' sheet not found. Creating...");
    issuedSheet = ss.insertSheet("Add Issued Link");
    issuedSheet.appendRow(["Date", "Download Link"]);
  }

  const lastRow = issuedSheet.getLastRow() + 1;
  const formattedDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
  issuedSheet.getRange(lastRow, 1, 1, 2).setValues([[formattedDate, zipFile.getUrl()]]);
  Logger.log(`📌 Link saved to 'Add Issued Link' at row ${lastRow}`);

  // 5. Cleanup
  zipFolder.setTrashed(true);
  Logger.log("🗑️ Temp folder trashed");

  //ui.showToast("✅ Export complete! ZIP saved & logged", "Success", 4);
  Logger.log("🎉 Finished exportCSVWithQRsFromTextAsZip");
  clearCertificateIssuedProcessing(sheetName);
  setupForPrintingTemplate();
}
