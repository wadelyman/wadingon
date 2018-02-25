function Save_AS_PDF() {
var ss = SpreadsheetApp.getActiveSpreadsheet();
var source = ss.getSheetByName("Quote Generator");
var destination = ss.getSheetByName("Edit Quote");

var range = source.getRange("B1:F30");

// This copies the data in B2:D4 in the source sheet to
// D4:F6 in the second sheet
range.copyValuesToRange(destination, 1, 6, 1, 6);
range.copyFormatToRange(destination, 1, 6, 1, 6);

// Asigns specific cells to script variables
var sheetName = "Edit Quote";
var folderID = source.getRange("K4:K4").getValue(); // Folder id to save in a folder.
var name = source.getRange("J4:J4").getValue();
var docType = source.getRange("F1:F1").getValue();
var pdfName = docType + " - "+ name;

// The row and column here are relative to the range
// getCell(1,1) in this code returns the cell at B2, B2
var sheet = ss.getSheets()[0];
var range = sheet.getRange("B2:D4");
var cell = range.getCell(1, 1);
Logger.log(cell.getValue());


var sourceSpreadsheet = SpreadsheetApp.getActive();
var sourceSheet = sourceSpreadsheet.getSheetByName(sheetName);
var folder = DriveApp.getFolderById(folderID);

//Copy whole spreadsheet
var destSpreadsheet = SpreadsheetApp.open(DriveApp.getFileById(sourceSpreadsheet.getId()).makeCopy("tmp_convert_to_pdf", folder))

//delete redundant sheets
var sheets = destSpreadsheet.getSheets();
for (i = 0; i < sheets.length; i++) {if (sheets[i].getSheetName() != sheetName){destSpreadsheet.deleteSheet(sheets[i]);}}

//repace cell values with text (to avoid broken references)
var destSheet = destSpreadsheet.getSheets()[0];
var sourceRange = sourceSheet.getRange(1,1,sourceSheet.getMaxRows(),sourceSheet.getMaxColumns());
var sourcevalues = sourceRange.getValues();
var destRange = destSheet.getRange(1, 1, destSheet.getMaxRows(), destSheet.getMaxColumns());
destRange.setValues(sourcevalues);

//save to pdf
var theBlob = destSpreadsheet.getBlob().getAs('application/pdf').setName(pdfName);
var newFile = folder.createFile(theBlob);

//Delete the temporary sheet
DriveApp.getFileById(destSpreadsheet.getId()).setTrashed(true);
}

//find the extend of the universe
//transcendence is relative