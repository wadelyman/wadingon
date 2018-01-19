function loopy() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var getCell = ss.getRange('M1:M1').getValue();
  var sheet = ss.getSheetByName('Quote Generator');   // name of the target sheet
  var data = sheet.getRange(getCell).getValues();
  for (var i = 0; i < data.length; i++) {
    sheet.getRange('J4').setValue(data[i][0]);
    checkCondition2();
    Save_AS_PDF();
    SpreadsheetApp.flush();
    Utilities.sleep(2000);
  }
}
