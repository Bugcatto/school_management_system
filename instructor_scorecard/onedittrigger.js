function onEditdata(e) {
  var range = e.range;
  var sheet = range.getSheet();
  var editedValue = e.value;

  if (sheet.getName() !== "Score Card") return;

  if (range.getA1Notation() === "C2" && editedValue === "Save") {
    saveScoreCriteria();
  }

  if (range.getA1Notation() === "C5") {
    loadPreviousScoresIfMatchFound();
  }
}
