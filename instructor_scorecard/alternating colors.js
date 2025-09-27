function applyAllBandings() {
  applyOrangeBandingToHK();
  applyLightGreyBandingToBC();
}

function applyOrangeBandingToHK() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("score card");
    const targetRange = sheet.getRange("H3:K");
    const bandings = sheet.getBandings();

    const bandingExists = bandings.some(b => {
      try {
        return b.getRange().getA1Notation() === targetRange.getA1Notation();
      } catch {
        return false;
      }
    });

    if (!bandingExists) {
      const banding = targetRange.applyRowBanding(SpreadsheetApp.BandingTheme.ORANGE);
      banding.getRange().offset(0, 0, 1).setFontWeight("bold").setFontColor("#FFFFFF");
    }
  } catch (err) {
    console.warn("Orange banding skipped:", err.message);
  }
}

function applyLightGreyBandingToBC() {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("score card");
    const targetRange = sheet.getRange("B10:C");
    const bandings = sheet.getBandings();

    const bandingExists = bandings.some(b => {
      try {
        return b.getRange().getA1Notation() === targetRange.getA1Notation();
      } catch {
        return false;
      }
    });

    if (!bandingExists) {
      const banding = targetRange.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY);
      banding.setHeaderRowColor(null);
    }
  } catch (err) {
    console.warn("Light grey banding skipped:", err.message);
  }
}
