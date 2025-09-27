function insertImageFromSourceSheet() {
  // Change "Source" to the name of the sheet where the image is located
  var sourceSheetName = "Data Validation";

  // Change "A1" to the cell reference in the "Source" sheet containing the image URL
  var sourceCell = "C2";
  
  // Change "Sheet1!B2:D3" to the target cell range where you want the image to be displayed
  var targetCellRange = "Sheet20!B2";
  
  var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sourceSheetName);
  var imageUrl = sourceSheet.getRange(sourceCell).getValue();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet20"); // Change "Sheet1" to your sheet name
  var image = sheet.getRange(targetCellRange).insertImage(imageUrl);
  image.setWidth(100).setHeight(100);
  
}
