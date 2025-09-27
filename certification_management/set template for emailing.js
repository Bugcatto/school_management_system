function setupForEmailingTemplate() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("For Emailing Certificate") || ss.insertSheet("For Emailing Certificate");

  // Set headers at Row 2
  const headers = [
    "Check", "Status", "Year", "Certificate ID", "No.", "Date", "Name", "ID", "Sort Code", "Course Code", "Course Name",
    "Batch", "Corporate", "Attendance", "Phone", "Email", "Start Date", "End Date", "Date Issued", "Remark", "QR List",
    "For Link Share", "For Digital Badge"
  ];
  sheet.getRange(2, 1, 1, headers.length).setValues([headers]);

  // Set dropdown in A1 ("Process")
  const a1Validation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Process"], true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange("A1").setDataValidation(a1Validation);

  const sourceSheet = ss.getSheetByName("Full Certificate Issued Record");

sheet.getRange('B1')
     .setDataValidation(
       SpreadsheetApp.newDataValidation()
         .requireValueInRange(sourceSheet.getRange('G2:G'), true)
         .setAllowInvalid(false)
         .build()
     );


  // Set formula in A3 to check sent status
  sheet.getRange("A3").setFormula(`=ARRAYFORMULA(IF(ISBLANK(D3:D),,VLOOKUP(D3:D,'Email History'!D2:D,1,FALSE)))`);

  // Set formula in C3 to filter data by course sort code
  sheet.getRange("C3").setFormula(`=FILTER('Full Certificate Issued Record'!A2:V,'Full Certificate Issued Record'!G2:G=B1)`);

  // Set dropdown "Confirm" in B3:B
  const b3Validation = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Confirm"], true)
    .setAllowInvalid(false)
    .build();
  const maxRows = sheet.getMaxRows() - 2;
  sheet.getRange(3, 2, maxRows).setDataValidation(b3Validation);

  ss.toast("✅ Emailing template ready", "Matrix College", 4);
  Logger.log("✅ Emailing template setup complete");
}
