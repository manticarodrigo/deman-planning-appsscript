/**
   Reset Form and build menu.
*/

function updateForm(menu: any) {
    // Use your form ID here. You can get it from the URL.
    const form = FormApp.openById('1JWr5Fl6AwkpaFgC_CmDlQgvLjyANBqakeP7Wiu6KI_4'); // TODO: create forms for each store
    // Update the form's response destination.
    const ss = SpreadsheetApp.open(DriveApp.getFileById(createEntrySheet(/* TODO: pass in store data */)));
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    // Delete existing form items.
    clearForm(form);
    // Create new items.
    for (let i = 0; i < menu.length; i++) {
        const menuRow = menu[i];
        const item = form.addTextItem();
        const textValidation = FormApp.createTextValidation()
            .setHelpText('Favor ingresar numero entre 0 y 999.')
            .requireNumberBetween(0, 999)
            .build();
        item.setValidation(textValidation);
        item.setTitle(menuRow[1]);
        item.setHelpText(menuRow[0] + ' ' + menuRow[2]);
        item.setRequired(true);
    }
}

function clearForm(form: any) {
    const items = form.getItems();
    while (items.length > 0) {
        form.deleteItem(items.pop());
    }
}

function createEntrySheet() {
    var name = '(Sucursal) - ' + getDate(); // TODO: Prefix survey response file w/ store name
    var folderId = '1vwn-J8wuW9rFsbBooqIpDUD98NI8KGwq'; // TODO: store in store folders
    var resource = {
        title: name,
        // @ts-ignore
        mimeType: MimeType.GOOGLE_SHEETS,
        parents: [{ id: folderId }]
    };
    // @ts-ignore
    var file = Drive.Files.insert(resource);
    return file.id;
}

function getDate() {
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth(); // Careful! January is 0 not 1
    var year = currentDate.getFullYear();
    var dateString = date + "-" + (month + 1) + "-" + year;
    return dateString;
}
