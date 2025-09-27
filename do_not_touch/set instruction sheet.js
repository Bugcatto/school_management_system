function setInstSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = "Ins Sheet(DNT!)";
  var selectSheetFunctionValue = "Select Sheet Function =>";
  var linkSuccessfulFormula = '=IF(REGEXMATCH(C2,"Form"),"Link Successful",IF(ISBLANK(E2),,IMPORTRANGE(C2,""&E2&"!B1")))';
  var insSheetFormula = '=ARRAYFORMULA(IF(ISBLANK(C2:C),,if(ISNUMBER(search("Corporate Application",C2:C,1)),,IF(REGEXMATCH(C2:C,"Form"),"https://docs.google.com/forms/d/"&RIGHT(C2:C.url,len(C2:C.url)-find("=",C2:C.url,1)),"Ins Sheet(DNT!)"))))';
  var urlformula = '=arrayformula(if(isblank(C2:C),,C2:C.url))';
  var linkSuccessfulConditionFormula = '=B2=$B$1';
  var nonBlankDConditionFormula = '=ISBLANK(D2)=FALSE';

  // Check if the sheet already exists
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    // If the sheet doesn't exist, create it
    sheet = spreadsheet.insertSheet(sheetName);
    Logger.log('Sheet created: ' + sheetName);
    
    // Set the value of cell A1 to "Select Sheet Function =>"
    setCellValue(sheet, "A1", selectSheetFunctionValue);
    setCellFormatting(sheet, "A1", "white", "bold", "darkblue");
    
    // Set the value of cell B1 to "Link Successful"
    setCellValue(sheet, "B1", "Link Successful");
    setCellFormatting(sheet, "B1", "white", "bold", "#34a853");

    setCellValue(sheet, "C1", "Link here");
    setCellFormatting(sheet, "C1", "white", "bold", "#00008b");
    setCellValue(sheet, "D1", "Url List");
    setCellFormatting(sheet, "D1", "white", "bold", "#34a853");

    setCellValue(sheet, "E1", "Data List");
    setCellFormatting(sheet, "E1", "white", "bold", "#34a853");

    // Set the formula in cells B2:B
    var formulaRangeB = sheet.getRange("B2:B");
    formulaRangeB.setFormula(linkSuccessfulFormula);
    Logger.log('Formula set in B2:B: ' + linkSuccessfulFormula);

    // Set the formula in cell E2
    setCellValue(sheet, "D2", urlformula);
    Logger.log('Formula set in D2: ' + urlformula);

    // Set the formula in cell E2
    setCellValue(sheet, "E2", insSheetFormula);
    Logger.log('Formula set in E2: ' + insSheetFormula);

    // Apply conditional formatting to cells B2:B with linkSuccessfulConditionFormula
    applyConditionalFormatting(sheet, formulaRangeB, linkSuccessfulConditionFormula, "#34a853");

    // Apply conditional formatting to cells B2:B with nonBlankDConditionFormula
    applyConditionalFormatting(sheet, formulaRangeB, nonBlankDConditionFormula, "red");
    
  } else {
    Logger.log('Sheet already exists: ' + sheetName);
  }
}

// Helper function to set cell value
function setCellValue(sheet, cell, value) {
  sheet.getRange(cell).setValue(value);
  Logger.log('Value set in ' + cell + ': ' + value);
}

// Helper function to apply formatting to a cell
function setCellFormatting(sheet, cell, fontColor, fontWeight, backgroundColor) {
  var cellRange = sheet.getRange(cell);

  cellRange.setFontColor(fontColor);
  cellRange.setFontWeight(fontWeight);
  cellRange.setBackground(backgroundColor);

  Logger.log('Formatting applied to ' + cell + ': FontColor - ' + fontColor + ', FontWeight - ' + fontWeight + ', BackgroundColor - ' + backgroundColor);
}

// Helper function to apply conditional formatting
function applyConditionalFormatting(sheet, range, customFormula, backgroundColor) {
  var rule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(customFormula)
    .setBackground(backgroundColor)
    .setFontColor("white")
    .setBold(true)
    .setRanges([range])
    .build();

  var rules = sheet.getConditionalFormatRules();
  rules.push(rule);
  sheet.setConditionalFormatRules(rules);

  Logger.log('Conditional formatting applied with custom formula: ' + customFormula);
}

function getadminonly() {

  // Open the spreadsheet using the URL ID
  var sslink = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get the data range from "Ins Sheet(DNT!)"
  var insSheet = spreadsheet.getSheetByName("Ins Sheet(DNT!)");
  var insData = insSheet.getRange("A2:A" + insSheet.getLastRow()).getValues();
  
  // Add "System Administrator" to insData
  insData.push(["System Administrator"]);
  
  // Get the data range from "Access Right" sheet
  var accessSheet = sslink.getSheetByName("Access Control");
  var accessData = accessSheet.getRange("B1:S" + accessSheet.getLastRow()).getValues();
  
  // Create an array to store the email addresses
  var emailList = [];
  
  // Loop through each header in the "Access Right" sheet
  for (var i = 0; i < accessData[0].length; i++) {
    var header = accessData[0][i];
    
    // Check if the header matches any item in the "Ins Sheet(DNT!)"
    if (insData.flat().includes(header)) {
      // If there's a match, collect the emails under that header
      for (var j = 1; j < accessData.length; j++) {
        var email = accessData[j][i];
        if (email !== "") {
          emailList.push(email);
        }
      }
    }
  }
  
  // Return the emailList array
  return emailList;
}