/**
   After any change in the sheet, update the options in the Form.
*/

function onChange() {
	// Get base spreadsheet with weekly product info
	var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
	var namedRanges = sheet.getNamedRanges();
	
	// Get data from specified ranges
	var skuDailyMenus = [];
	for (var i = 0; i < namedRanges.length; i++) {
		var values = namedRanges[i].getRange().getValues();
		skuDailyMenus.push(values);
	}
	
	// Create form with pages for each day of the week.
	updateForm(skuDailyMenus);
}