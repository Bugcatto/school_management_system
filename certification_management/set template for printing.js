function setupForPrintingTemplate() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("for Printing") || ss.insertSheet("for Printing");

  // Set headers at Row 2
  const headers = [
    "Year", "CertificateID", "No", "Date", "Name", "ID", "SortCode", "CourseCode", "CourseName", "Batch", "Corporate",
    "Attendance", "Phone", "Email", "StartDate", "EndDate", "DateIssued", "Remark", "QRList", "ForLinkShare", "QR", "imagename"
  ];
  sheet.getRange(2, 1, 1, headers.length).setValues([headers]);

  // Set FILTER formula at A3
  sheet.getRange("A3").setFormula(`=FILTER('Full Certificate Issued Record'!A2:T, 'Full Certificate Issued Record'!G2:G = B1)`);

  // Set QR formula in Column U (QR image)
  sheet.getRange("U3").setFormula(`=ARRAYFORMULA(IF(ISBLANK(T3:T),,IMAGE("https://quickchart.io/qr?text=" & ENCODEURL(T3:T) & "&size=150")))`);

  // Set image name formula in Column V
  sheet.getRange("V3").setFormula(`=ARRAYFORMULA(IF(ISBLANK(B3:B),,B3:B & ".png"))`);

  // Set data validation in A1 to "Process"
  const a1Validation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Process"], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange("A1").setDataValidation(a1Validation);
  //sheet.getRange("A1").setValue("Process");

  const sourceSheet = ss.getSheetByName("Full Certificate Issued Record");

sheet.getRange('B1')
     .setDataValidation(
       SpreadsheetApp.newDataValidation()
         .requireValueInRange(sourceSheet.getRange('G2:G'), true)
         .setAllowInvalid(false)
         .build()
     );


  ss.toast("✅ Template set for 'for Printing' sheet", "Matrix College", 4);
  Logger.log("✅ Template setup complete for 'for Printing'");
}
