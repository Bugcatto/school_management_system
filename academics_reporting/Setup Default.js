function setMR() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Marking Criteria Setup Sheet');
  if (!sheet) {
    Logger.log('Sheet "Marking Criteria Setup Sheet" not found.');
    return;
  }

  // === Clear previous content ===
  sheet.getRange('A1:A3').clearContent();
  sheet.getRange('A5:B5').clearContent();
  sheet.getRange('D5:F5').clearContent();
  sheet.getRange('H5:J5').clearContent();
  sheet.getRange('B1').clearContent();
  sheet.getRange('B3').clearContent();
  sheet.getRange('F6').clearContent();

  // === Set colors ===
  sheet.getRange("A1:A3").setBackground("#FF9900"); // Dark Orange 1
  sheet.getRange("4:4").setBackground("#999999");   // Dark Gray 4
  sheet.getRange("C:C").setBackground("#999999");
  sheet.getRange("G:G").setBackground("#999999");

  // === Set alternating color bands if not already set ===
  const maybeBand = (rangeStr) => {
    const range = sheet.getRange(rangeStr);
    const bandings = sheet.getBandings();
    const isBanded = bandings.some(b => b.getRange().getA1Notation() === range.getA1Notation());
    if (!isBanded) {
      const band = range.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
      band.setHeaderRowColor(null);
    }
  };

  //maybeBand("A5:B");
  //maybeBand("D5:F");
  //maybeBand("H5:J");

  // === Set values in A1:A3 ===
  sheet.getRange('A1:A3').setValues([
    ['Select Instructor'],
    ['Select Course'],
    ['Total Score']
  ]);

  // === Set headers ===
  sheet.getRange("A5:B5").setValues([["Main Area", "Weighting"]]);
  sheet.getRange("D5:F5").setValues([["Main Criteria (Required)", "Main Area", "Main Weighting (Auto)"]]);
  sheet.getRange("H5:J5").setValues([["Marking Criteria (Required)", "Select Main Area", "Sub Weighting"]]);

  // === Set formulas ===
  sheet.getRange("B1").setFormula("=ifna(VLOOKUP(B2,'Course Database Link'!A2:Z,match(\"Instructors' Name\",'Course Database Link'!A1:Z1,0),false),)");
  sheet.getRange("B3").setFormula("=SUM(B6:B)");
  sheet.getRange("F6").setFormula("=ARRAYFORMULA(if(isblank(D6:D),,sumif($I$6:$I,D6:D,$J6:$J)))");

  // === Set dropdowns ===
  sheet.getRange("B2").setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInRange(sheet.getRange('Data Type!$A$2:$A')).build()
  );

  sheet.getRange("E6:E").setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInRange(sheet.getRange("A6:A")).build()
  );

  sheet.getRange("I6:I").setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInRange(sheet.getRange("D6:D1002")).build()
  );

  Logger.log("Setup completed successfully.");
}
