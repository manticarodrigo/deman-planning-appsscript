var exports = exports || {};
var module = module || { exports: exports };
/**
   After any change in the sheet, update the options in the Form.
*/
function onChange(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[2];
    var namedRanges = sheet.getNamedRanges();
    var skuDailyMenus = [];
    // Get data from specified ranges
    for (var i = 0; i < namedRanges.length; i++) {
        var values = namedRanges[i].getRange().getValues();
        skuDailyMenus.push(values);
    }
    // TODO: Use date to determine which menu to create in forms.
    // Currently defaults to Monday.
    updateForm(skuDailyMenus[0]);
}
;
