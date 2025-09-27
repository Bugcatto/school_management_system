function byebye() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var ownerEmail = ss.getOwner().getEmail();
    
    // Remove editors (excluding the owner)
    var editors = ss.getEditors();
    editors.forEach(function(editor) {
      var editorEmail = editor.getEmail();
      if (editorEmail !== ownerEmail) {
        ss.removeEditor(editorEmail);
        Logger.log("Removed editor access for: " + editorEmail);
      }
    });

    // Remove viewers (excluding the owner)
    var viewers = ss.getViewers();
    viewers.forEach(function(viewer) {
      var viewerEmail = viewer.getEmail();
      if (viewerEmail !== ownerEmail) {
        ss.removeViewer(viewerEmail);
        Logger.log("Removed viewer access for: " + viewerEmail);
      }
    });

    // Show a toast message with the result
    var toastMessage = "Access management completed. Removed access for all editors and viewers except the owner.";
    ss.toast(toastMessage, "Access Management", 5);

    Logger.log(toastMessage);
  } catch (error) {
    // Log any unexpected errors
    Logger.log("Error in access management: " + error);
    // Show an error toast message
    ss.toast("Error in access management. Check the logs for details.", "Error", 5);
  }
}
