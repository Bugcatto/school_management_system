function backupSpreadsheet7() {
  try {
    // Get the current Google Sheet file
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var originalName = spreadsheet.getName();

    // Define the backup folder name under the root folder
    var backupFolderName = "Backup";
    var rootFolder = DriveApp.getRootFolder();

    // Get or create the "Backup" folder in the root directory
    var backupFolder;
    var folders = rootFolder.getFoldersByName(backupFolderName);
    if (folders.hasNext()) {
      backupFolder = folders.next();
    } else {
      backupFolder = rootFolder.createFolder(backupFolderName);
    }

    // Create or get the subfolder with the specific backup name
    var subfolderName = "Backup 7 day - " + originalName;
    var subfolders = backupFolder.getFoldersByName(subfolderName);
    var subfolder;
    if (subfolders.hasNext()) {
      subfolder = subfolders.next();
    } else {
      subfolder = backupFolder.createFolder(subfolderName);
    }

    // Get the list of files in the subfolder and delete them
    var backupFiles = subfolder.getFiles();
    while (backupFiles.hasNext()) {
      var backupFile = backupFiles.next();
      Logger.log("Deleting existing backup: " + backupFile.getName());
      backupFile.setTrashed(true);
    }

    // Create a new spreadsheet for backup
    var newBackupFile = SpreadsheetApp.create("Backup " + originalName);
    var newBackupSpreadsheet = SpreadsheetApp.openById(newBackupFile.getId());

    // Loop through each sheet and copy values to the backup spreadsheet
    var sheets = spreadsheet.getSheets();
    sheets.forEach(function(sheet) {
      var sheetName = sheet.getName();
      var newSheet = sheet.copyTo(newBackupSpreadsheet).setName(sheetName);
    });

    // Remove the default sheet created with the new spreadsheet
    var defaultSheet = newBackupSpreadsheet.getSheets()[0];
    if (defaultSheet.getName() === "Sheet1") {
      newBackupSpreadsheet.deleteSheet(defaultSheet);
    }

    // Move the backup spreadsheet to the backup folder
    var backupFile = DriveApp.getFileById(newBackupSpreadsheet.getId());
    backupFile.moveTo(subfolder);
    Logger.log("Backup completed successfully");

  } catch (e) {
    Logger.log("Error during backup: " + e.message);
  }
}
