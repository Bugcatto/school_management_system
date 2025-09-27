function setHeader() {
  var headerValues = [
    'ID', 'Enquiry Date', 'Quarter', 'DB', 'Status', 'Course', 'Sub-Course',
    'Batch', 'Facebook Name', 'Name', 'Email', 'Gender', 'Phone',
    'Position', 'Organisation', 'Education', 'Region', 'Source', 'P.Status',
    'P.date', 'P.Type', 'Discount Type', 'Discount Amount', 'ADD Discount',
    'ADD Amount', 'Coupon ID', 'Check', 'Coupon Amount', 'A.SP', 'C.SP',
    'SP=Cash', 'Discount Fixed', 'Paid By', 'Course Fees', 'Doc Fees',
    'Total', 'Refered by', 'By:', 'Attendance Type','Last Follow-up By', 'Last Follow-up Date', 'Times','Paid Serial',
    'Quarter Order'
  ];

  var sheetName = 'General Enquiry';
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }

  var headerRange = sheet.getRange(1, 1, 1, headerValues.length);
  headerRange.setValues([headerValues]);
}
