/**
   After any change in the sheet, update the options in the Form.
*/

function onChange() {
	// Get base spreadsheet with weekly product info
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
	const namedRanges = sheet.getNamedRanges();
	
	// Get data from specified ranges
	const skuDailyMenus: any = [];
	namedRanges.forEach((range) => {
		const values = range.getRange().getValues();
		const name = range.getName();
		skuDailyMenus.push({ name, values });
	});
	
	// Create form with pages for each day of the week.
	updateForm(skuDailyMenus);
}