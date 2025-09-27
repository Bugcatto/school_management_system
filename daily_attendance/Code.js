function getQRCodeUrl() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('QR Generator');
  if (!sheet) {
    Logger.log('Sheet "QR Generator" not found.');
    return 'Sheet not found';
  }
  
  const url = sheet.getRange('B2').getValue();
  if (!url) {
    Logger.log('No URL found in cell B2.');
    return 'No URL found';
  }
  
  // Log the URL to check what’s being used
  Logger.log('URL from cell B2: ' + url);
  
  // Use the Tec-It QR Code API URL
  const qrCodeUrl = `https://qrcode.tec-it.com/API/QRCode?data=${encodeURIComponent(url)}`;
  
  // Log the generated QR code URL
  Logger.log('Generated QR Code URL: ' + qrCodeUrl);
  
  return qrCodeUrl;
}

function doGet() {
  Logger.log('doGet function called');
  return HtmlService.createHtmlOutputFromFile('Index');
}
