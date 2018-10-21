/**
   After any change in the sheet, update the options in the Form.
*/

const dayOrder: any = {
	'Lunes': 0,
	'Martes': 1,
	'Miercoles': 2,
	'Jueves': 3,
	'Viernes': 4,
	'Sabado': 5,
	'Domingo': 6
}

function onChange() {
	// Get base spreadsheet with weekly product info
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[1];
	const namedRanges = sheet.getNamedRanges();
	// Get data from specified ranges
	const skuDailyMenus: any = [];
	namedRanges.forEach((range) => {
		const values = range.getRange().getValues();
		const name = range.getName();
		const index = dayOrder[name];
		skuDailyMenus.push({ name, values, index });
	});
	// Sort by day order
	skuDailyMenus.sort((a: any, b: any) => a.index - b.index);
	// Create form with pages for each day of the week.
	updateForm(skuDailyMenus);
}