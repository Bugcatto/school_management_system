function setPermissionsForFolder() {
  var folderId = Main_id; // Your folder ID
  var folder = DriveApp.getFolderById(folderId);
  
  // Apply permissions to all files and subfolders
  processFolder(folder);
}

function processFolder(folder) {
  var files = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    setPermissionsForFile(file);
  }

  var subfolders = folder.getFolders();  // Handle subfolders
  while (subfolders.hasNext()) {
    var subfolder = subfolders.next();
    processFolder(subfolder);  // Recursive call to handle files in subfolders
  }
}

function setPermissionsForFile(file) {
  var fileId = file.getId();

  // Set file sharing to restricted (no one outside can view)
  file.setSharing(DriveApp.Access.PRIVATE, DriveApp.Permission.VIEW);

  // Use Google Drive API to further restrict permissions
  var resource = {
    copyRequiresWriterPermission: true,
    viewersCanCopyContent: false,
    writersCanShare: false  // Prevent editors from changing permissions and sharing
  };

  var url = "https://www.googleapis.com/drive/v3/files/" + fileId;
  var params = {
    method: "patch",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer " + ScriptApp.getOAuthToken()
    },
    payload: JSON.stringify(resource),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(url, params);
  Logger.log(response.getContentText());
}
