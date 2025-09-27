function setupCertificateTemplate() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheetname = 'Certificate Issued Processing';
  const sheet = ss.getSheetByName(sheetname);

  /* 1. headers ----------------------------------------------------------- */
  const headers = [
    'Record Status','Status','No.','Name','ID','Sort Code','Course Code',
    'Course Name','Batch','Corporate','Attendance','Phone','Email',
    'Start Date','End Date','Date Issued','Remark'
  ];
  sheet.getRange(2, 1, 1, headers.length).setValues([headers]);

  /* 2. A1 – fixed dropdown --------------------------------------------- */
  sheet.getRange('A1')
       .setDataValidation(
         SpreadsheetApp.newDataValidation()
           .requireValueInList(['Process'], true)
           .build()
       );

  /* 3. B1 – list from Data Type!D2:D ------------------------------------ */
  const dataType = ss.getSheetByName('Data Type');
  sheet.getRange('B1')
       .setDataValidation(
         SpreadsheetApp.newDataValidation()
           .requireValueInRange(dataType.getRange('D2:D'), true)
           .setAllowInvalid(false)
           .build()
       );

  /* 4. B3 – list from Data Type!E2:E ------------------------------------ */
  sheet.getRange('B3')
       .setDataValidation(
         SpreadsheetApp.newDataValidation()
           .requireValueInRange(dataType.getRange('E2:E'), true)
           .setAllowInvalid(false)
           .build()
       );

    sheet.getRange("A3").setFormula(`=ARRAYFORMULA(if(ISBLANK(D3:D),,ifna(VLOOKUP(F3:F&"|"&M3:M,ARRAYFORMULA('Full Certificate Issued Record'!G2:G&"|"&'Full Certificate Issued Record'!N2:N),1,false),"Not Found")))`);
    sheet.getRange("C3").setFormula(`=IF(D3="",,SEQUENCE(COUNTA(D3:D)))`);
    sheet.getRange("D3").setFormula(`=ARRAYFORMULA(Upper(FILTER(INDEX('Front Desk Certification Link'!$A$2:$I,,MATCH(D2,'Front Desk Certification Link'!$A$1:$I$1,0)),INDEX('Front Desk Certification Link'!$A$2:$I,,MATCH("Course Name",'Front Desk Certification Link'!$A$1:$I$1,0))=$B$1)))`);
    sheet.getRange("E3").setFormula(`=ARRAYFORMULA(Upper(FILTER(INDEX('Front Desk Certification Link'!$A$2:$I,,MATCH(E2,'Front Desk Certification Link'!$A$1:$I$1,0)),INDEX('Front Desk Certification Link'!$A$2:$I,,MATCH("Course Name",'Front Desk Certification Link'!$A$1:$I$1,0))=$B$1)))`);
    sheet.getRange("F3").setFormula(`=ARRAYFORMULA(IF(ISBLANK(D3:D),,B1))`);
    sheet.getRange("G3").setFormula(`=ARRAYFORMULA(IF(ISBLANK($F$3:$F),,VLOOKUP($F$3:$F,'Full Certificate Management'!$C$2:$J,MATCH(G2,'Full Certificate Management'!$C$1:$J$1,0),FALSE)))`);
    sheet.getRange("H3").setFormula(`=ARRAYFORMULA(IF(ISBLANK($F$3:$F),,VLOOKUP($F$3:$F,'Full Certificate Management'!$C$2:$J,MATCH(H2,'Full Certificate Management'!$C$1:$J$1,0),FALSE)))`);
    sheet.getRange("I3").setFormula(`=ARRAYFORMULA(IF(ISBLANK($F$3:$F),,VLOOKUP($F$3:$F,'Full Certificate Management'!$C$2:$J,MATCH(I2,'Full Certificate Management'!$C$1:$J$1,0),FALSE)))`);
    sheet.getRange("J3").setFormula(`=ARRAYFORMULA(IF(ISBLANK($F$3:$F),,VLOOKUP($F$3:$F,'Full Certificate Management'!$C$2:$J,MATCH(J2,'Full Certificate Management'!$C$1:$J$1,0),FALSE)))`);
    sheet.getRange("K3").setFormula(`=FILTER(INDEX('Front Desk Certification Link'!$A$2:$I,,MATCH(K2,'Front Desk Certification Link'!$A$1:$I$1,0)),INDEX('Front Desk Certification Link'!$A$2:$I,,MATCH("Course Name",'Front Desk Certification Link'!$A$1:$I$1,0))=$B$1)`);
    sheet.getRange("L3").setFormula(`=FILTER(INDEX('Front Desk Certification Link'!$A$2:$I,,MATCH(L2,'Front Desk Certification Link'!$A$1:$I$1,0)),INDEX('Front Desk Certification Link'!$A$2:$I,,MATCH("Course Name",'Front Desk Certification Link'!$A$1:$I$1,0))=$B$1)`);
    sheet.getRange("M3").setFormula(`=FILTER(INDEX('Front Desk Certification Link'!$A$2:$I,,MATCH(M2,'Front Desk Certification Link'!$A$1:$I$1,0)),INDEX('Front Desk Certification Link'!$A$2:$I,,MATCH("Course Name",'Front Desk Certification Link'!$A$1:$I$1,0))=$B$1)`);
    sheet.getRange("N3").setFormula(`=ARRAYFORMULA(IF(ISBLANK($F$3:$F),,VLOOKUP($F$3:$F,'Full Certificate Management'!$C$2:$J,MATCH(N2,'Full Certificate Management'!$C$1:$J$1,0),FALSE)))`);
    sheet.getRange("O3").setFormula(`=ARRAYFORMULA(IF(ISBLANK($F$3:$F),,VLOOKUP($F$3:$F,'Full Certificate Management'!$C$2:$J,MATCH(O2,'Full Certificate Management'!$C$1:$J$1,0),FALSE)))`);
    sheet.getRange("P3").setFormula(`=ARRAYFORMULA(IF(ISBLANK($F$3:$F),,VLOOKUP($F$3:$F,'Full Certificate Management'!$C$2:$J,MATCH(P2,'Full Certificate Management'!$C$1:$J$1,0),FALSE)))`);

}
