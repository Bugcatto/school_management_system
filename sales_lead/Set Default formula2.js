function setDefaultFormula2() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("General Enquiry");
  
  sheet.setFrozenRows(1);
  var format = "M/d/yyyy HH:mm:ss";
  
  // Remove the filter, if it exists
  var filter = sheet.getFilter();
  
  if (filter) {
    filter.remove();
  }
  // Clean columns before setting default formulas
  cleanColumn(sheet.getRange("A2:A"));
  cleanColumn(sheet.getRange("B2:B"));
  cleanColumn(sheet.getRange("C2:C"));
  cleanColumn(sheet.getRange("D2:D"));
  cleanColumn(sheet.getRange("E2:E"));
  cleanColumn(sheet.getRange("W2:W"));
  cleanColumn(sheet.getRange("AA2:AA"));
  cleanColumn(sheet.getRange("AC2:AC"));
  cleanColumn(sheet.getRange("AE2:AE"));
  cleanColumn(sheet.getRange("AH2:AH"));
  cleanColumn(sheet.getRange("AJ2:AJ"));
  cleanColumn(sheet.getRange("AQ2:AR"));
  cleanColumn(sheet.getRange("I2:Q"));
  
  var columnT = "T:T"; // Column T
  var range = sheet.getRange(columnT);
  range.setNumberFormat(format);

  // Now set the default formulas
  sheet.getRange("A2").setFormula(
    '=arrayformula(if(isblank(J2:J),,if(D2:D="Old",ifna(vlookup(J2:J,\'Old ID\'!$C$2:$J,match("Student ID",\'Old ID\'!$C$1:$J$1,0),false),"Check Name"),if(isna(VLOOKUP(K2:K,\'New ID\'!$D$2:$J,Match("Student ID",\'New ID\'!$D$1:$J$1,0),False)),if(E2:E="Enroll","Email Missing","No Enrollment"),if(isna(vlookup(J2:J,\'New ID\'!C2:J,Match("Student ID",\'New ID\'!$C$1:$J$1,0),False)),"Check New Name",VLOOKUP(K2:K,\'New ID\'!$D$2:$J,Match("Student ID",\'New ID\'!$D$1:$J$1,0),False))))))'
  );

  sheet.getRange("B2").setFormula(
    '={\'Incoming Lead\'!B2:B}');

  sheet.getRange("C2").setFormula(
    '=arrayformula(if(isblank(J2:J),"",ifna(VLOOKUP(F2:F&" "&H2:H &IF(isblank(G2:G),""," "&Vlookup(G2:G, \'Sub Course\'!$A:$B,2,False)),\'Full Price List Link\'!C2:Z,match("Quarter",\'Full Price List Link\'!$C$1:$Z$1,0),False),"Not Found")))'
  );

  sheet.getRange("D2").setFormula(
    '=arrayformula(if(isblank(J2:J),"",if(iferror(Vlookup(K2:K,index(\'Old ID\'!A1:E,,Match(K$1,\'Old ID\'!A1:E1,0)),1,false),false)=false,if(iferror(Vlookup(M2:M,index(\'Old ID\'!A1:E,,Match(K$1,\'Old ID\'!A1:E1,0)),1,false),false)=false,"New","Old"),"Old")))'
  );

  sheet.getRange("E2").setFormula(
    '=arrayformula(if(isblank(J2:J),"",if(isblank(S2:S),"Please Input Data",if(S2:S="NO","Follow-Up",if(S2:S="MAYBE","Follow-Up",if(S2:S="SCHOLARSHIP","Enroll",if(S2:S="FOC","Enroll",If(S2:S="Paid","Enroll",If(S2:S="Yes","Confirm",)))))))))'
  );

  sheet.getRange("W2").setFormula(
    '=arrayformula(if(isblank(J2:J),"",if(isblank(V2:V),0,ifna(VLOOKUP(F2:F&" "&H2:H &IF(isblank(G2:G),""," "&Vlookup(G2:G, \'Sub Course\'!A:B,2,False)),\'Full Price List Link\'!C2:Z,match(V2:V,\'Full Price List Link\'!$C$1:$Z$1,0),False),"Not Found"))))'
  );

  sheet.getRange("AA2:AA").setFormula(
    '=if(isblank(Z2),,if(COUNTIF(\'Coupon Check\'!$C$2:$C,Z2)>1,"Duplicate",""))'
  );

  sheet.getRange("AC2").setFormula(
    '=arrayformula(if(isblank(J2:J),,ifna(vlookup(A2:A,\'Star Point Link\'!$A$2:$C,3,False),"")))'
  );

  sheet.getRange("AE2").setFormula(
    '=arrayformula(if(isblank(AD2:AD),"",AD2:AD*800))'
  );

  sheet.getRange("AH2").setFormula(
    '=arrayformula(if(isblank(J2:J),"",ifna(VLOOKUP(F2:F&" "&H2:H &IF(isblank(G2:G),""," "&Vlookup(G2:G, \'Sub Course\'!$A:$B,2,False)),\'Full Price List Link\'!C2:Z,match(if(U2:U="Installment","Installment","Original Price"),\'Full Price List Link\'!$C$1:$Z$1,0),False),"Not Found")))'
  );

  sheet.getRange("AJ2:AJ").setFormula(
    '=iferror(if(AH2="","",AH2+AI2-if(W2=0,0,(AH2-W2))-Y2-AB2-AE2-AF2),"Check cost")'
  );

  sheet.getRange("AQ2").setFormula(
    '=arrayformula(if(isblank(T2:T),,row(T2:T)))'
  );

  sheet.getRange("AR2").setFormula(
    '=arrayformula(if(isblank(J2:J),,VLOOKUP(C2:C,\'Data Validation List\'!$I$2:$J$5,2,False)))'
  );

  sheet.getRange("I2").setFormula(
    '={\'Incoming Lead\'!D2:L}'
  );
  setDefaultFormat();

}


