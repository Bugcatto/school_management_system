function setupScoreCardSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Score Card");
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Sheet 'Score Card' not found.");
    return;
  }
  // === Clear all existing conditional formatting ===
  sheet.setConditionalFormatRules([]);

  // === Set Labels in B1:B9 ===
  const labels = [
    ["Please score only between 1-10( lowest - highest)"],
    ["Score Card"],
    ["Program Name"],
    ["Select Batch"],
    ["Select Student by Email"],
    ["ID"],
    ["Name"],
    ["Attendance (Auto)"],
    ["Marking Criteria (Required)"]
  ];
  sheet.getRange("B1:B9").setValues(labels);

  // === Set C1 ===
  sheet.getRange("C1").setValue('Select "Save" ⏬');

  // === Set C2 dropdown ===
  const ruleSave = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Save"])
    .setAllowInvalid(false)
    .build();
  sheet.getRange("C2").setDataValidation(ruleSave);

  // === Set C3 ===
  sheet.getRange("C3").setValue("Professional Diploma in Business Intelligence and Data Analyst");

  // === Set C4 dropdown from 'Data Type'!$A$2:$A ===
  const dataTypeRange = ss.getRangeByName("Data Type!A2:A");
  const ruleC4 = SpreadsheetApp.newDataValidation()
    .requireValueInRange(dataTypeRange)
    .setAllowInvalid(false)
    .build();
  sheet.getRange("C4").setDataValidation(ruleC4);

  // === Set C5 dropdown from 'Attendance List'!$D$2:$D ===
  const attendanceRange = ss.getRangeByName("Attendance List!D2:D");
  const ruleC5 = SpreadsheetApp.newDataValidation()
    .requireValueInRange(attendanceRange)
    .setAllowInvalid(false)
    .build();
  sheet.getRange("C5").setDataValidation(ruleC5);

  // === Set formulas in C6:C9 ===
  sheet.getRange("C6").setFormula(`=IF(ISBLANK($C$5),"Select Email",FILTER(INDEX($H$4:$K,,MATCH($B6,$H$3:$K$3,0)),INDEX($H$4:$K,,MATCH("Email",$H$3:$K$3,0))=$C$5))`);
  sheet.getRange("C7").setFormula(`=IF(ISBLANK($C$5),"Select Email",FILTER(INDEX($H$4:$K,,MATCH($B7,$H$3:$K$3,0)),INDEX($H$4:$K,,MATCH("Email",$H$3:$K$3,0))=$C$5))`);
  sheet.getRange("C8").setFormula(`=IF(ISBLANK($C$5),"Select Email",VLOOKUP(C5,J4:K,2,FALSE))`);
  sheet.getRange("C9").setFormula(`=MAX('Current Marking Criteria'!B2:B)`);

  // === Set A3 and A10 formulas ===
  sheet.getRange("A3").setFormula(`=SEQUENCE(COUNTA(B3:B8))`);
  sheet.getRange("A10").setFormula(`=IF(ISBLANK(B10),,SEQUENCE(COUNTA(B10:B)))`);

  // === Set B10 formula ===
  sheet.getRange("B10").setFormula(`=FILTER('Marking Criteria Setup History Link'!D2:D, 'Marking Criteria Setup History Link'!D2:D<>"", 'Marking Criteria Setup History Link'!D2:D<>"Attendance (Auto)",'Marking Criteria Setup History Link'!B2:B=C9)`);

  // === Set E2 and E3 ===
  sheet.getRange("E2").setValue("Score Overall");
  sheet.getRange("E3").setFormula("={Output_area}");

  // === Set H2 and H3:K3 ===
  sheet.getRange("H2").setValue("Class Attendance");
  sheet.getRange("H3:K3").setValues([["ID", "Name", "Email", "Attendance"]]);

  // === Set formulas in H4:K4 ===
  const headers = ["H3", "I3", "J3", "K3"];
  const targets = ["H4", "I4", "J4", "K4"];
  for (let i = 0; i < headers.length; i++) {
    const formula = `=INDEX('Attendance List'!$A$2:$D,,MATCH(${headers[i]},'Attendance List'!$A$1:$D$1,0))`;
    sheet.getRange(targets[i]).setFormula(formula);
  }

  // === Format titles ===
  const formatRanges = ["A2:C2", "E2:F2", "H2:K2"];
  formatRanges.forEach(range => {
    sheet.getRange(range)
      .setBackground("#4d4d4d")
      .setFontWeight("bold")
      .setFontColor("#ffffff");
  });

  // Format A9:C9
  sheet.getRange("A9:C9")
    .setBackground("#b7b7b7")
    .setFontWeight("bold")
    .setFontColor("#ffffff");

  // Alternating colors
  applyAllBandings();

  // === Gradient conditional formatting for K4:K1000 ===
  const gradientRange = sheet.getRange('K4:K1000');
  const gradientRule = SpreadsheetApp.newConditionalFormatRule()
    .setGradientMaxpointWithValue("#00C853", SpreadsheetApp.InterpolationType.NUMBER, '100%')
    .setGradientMidpointWithValue("#FFEB3B", SpreadsheetApp.InterpolationType.NUMBER, '50%')
    .setGradientMinpointWithValue("#FF5733", SpreadsheetApp.InterpolationType.NUMBER, '10%')
    .setRanges([gradientRange])
    .build();

  // === Conditional formatting for score range E3:F ===
  const scoreRange = sheet.getRange("E3:F");
  const scoreValues = ["Final Score", "Sub Area", "Detail Score"];
  const scoreRules = scoreValues.map(val =>
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(`=$E3="${val}"`)
      .setBackground("#b7b7b7")
      .setFontColor("#ffffff")
      .setRanges([scoreRange])
      .build()
  );

  clearBanding(sheet); // Clear banding on A10:C so conditional formatting can apply
  Logger.log("step test");

  // === Conditional formatting for even rows A10:C ===
  const evenRowRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=ISEVEN($A10)')
    .setBackground('#D3D3D3')
    .setRanges([sheet.getRange('A10:C')])
    .build();

  // === Combine and set all conditional format rules ===
  const allRules = sheet.getConditionalFormatRules();
  allRules.push(gradientRule, ...scoreRules, evenRowRule);
  sheet.setConditionalFormatRules(allRules);
}

function clearBanding(sheet) {
  const bandings = sheet.getBandings();
  bandings.forEach(band => {
    const range = band.getRange();
    // Clear only the one that intersects with A10:C
    if (range.getA1Notation().startsWith("A10")) {
      band.remove();
    }
  });
}


