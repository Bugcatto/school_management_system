function sendMatrixBadgeWithShareLinkAndLogRow() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const sourcesheetname = "For Emailing Certificate";
  const sourceSheet = ss.getSheetByName(sourcesheetname);
  const historySheet = ss.getSheetByName("Email History");

  const data = sourceSheet.getRange(3, 1, sourceSheet.getLastRow() - 2, sourceSheet.getLastColumn()).getValues();
  const header = sourceSheet.getRange(2, 1, 1, sourceSheet.getLastColumn()).getValues()[0];

  const nameIndex = header.indexOf("Name");
  const emailIndex = header.indexOf("Email");
  const courseIndex = header.indexOf("Course Name");
  const statusIndex = header.indexOf("Status");
  const linkShareIndex = header.indexOf("For Link Share");

  const badgeImageFileId = "12KhwRcnRzZUy8lixkm_z3nZctkGvgLcx"; // badge PNG
  const logoImageFileId = "1EEpRRWKOy19OvRQer_3yaqPl_-KFjv0A"; // Matrix logo

  const badgeBlob = DriveApp.getFileById(badgeImageFileId).getBlob();
  const logoBlob = DriveApp.getFileById(logoImageFileId).getBlob();

  let sentCount = 0;

  //ui.showToast("📤 Sending digital badges... Please wait", "Matrix College", 3);
  Logger.log("🔄 Starting to send digital badges...");

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    const status = String(row[statusIndex]).toLowerCase();

    if (status === "confirm") {
      const name = row[nameIndex];
      const email = row[emailIndex];
      const course = row[courseIndex];
      const badgeLink = row[linkShareIndex];

      const inlineImages = {
        badge: badgeBlob,
        logo: logoBlob
      };

      const subject = `Your Digital Badge for ${course} – Matrix College`;

      const htmlBody = `
        <div style="font-family:Arial,sans-serif;">
          <p>Dear ${name},</p>
          <p>Congratulations on your successful completion of the <strong>${course}</strong> program at Matrix College!</p>
          <p><img src="cid:badge" width="200"/></p>
          <p>You can access and share your badge directly from this link:</p>
          <p><a href="${badgeLink}" target="_blank">${badgeLink}</a></p>
          <p>We encourage you to add this badge to your LinkedIn, resume, or any professional platform.</p>
          <br>
          <p>Warm regards,<br>
          Matrix College Team<br>
          <a href="mailto:admin@matrixcollege.edu.mm">‌admin@matrixcollege.edu.mm</a></p>
          <img src="cid:logo" style="width:160px;margin-bottom:15px"/>
        </div>
      `;

      try {
        MailApp.sendEmail({
          to: email,
          subject: subject,
          htmlBody: htmlBody,
          inlineImages: inlineImages
        });
        historySheet.appendRow(row);
        sentCount++;
        Logger.log(`✅ Badge sent to ${name} (${email}) for course: ${course}`);
      } catch (error) {
        Logger.log(`❌ Failed to send badge to ${name} (${email}): ${error}`);
      }
    } else {
      Logger.log(`⏭️ Skipping row ${i + 3}: Status not 'confirm'`);
    }
  }
  clearCertificateIssuedProcessing(sourcesheetname);
  setupForEmailingTemplate()

  //ui.showToast(`✅ Finished sending ${sentCount} badge(s).`, "Matrix College", 5);
  Logger.log(`🎉 Completed sending ${sentCount} badge(s) in total.`);
}
