/**
   Reset Form and build menu.
*/
function updateForm(menu) {
    // Use your form ID here. You can get it from the URL.
    var form = FormApp.openById('1JWr5Fl6AwkpaFgC_CmDlQgvLjyANBqakeP7Wiu6KI_4');
    // Update the form's response destination.
    var ss = SpreadsheetApp.open(DriveApp.getFileById(createEntrySheet()));
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    // Delete existing form items.
    clearForm(form);
    // Create new items.
    for (i = 0; i < menu.length; i++) {
        var menuRow = menu[i];
        var item = form.addTextItem();
        var textValidation = FormApp.createTextValidation()
            .setHelpText('Favor ingresar numero entre 0 y 999.')
            .requireNumberBetween(0, 999)
            .build();
        item.setValidation(textValidation);
        item.setTitle(menuRow[1]);
        item.setHelpText(menuRow[0] + ' ' + menuRow[2]);
        item.setRequired(true);
    }
}
function clearForm(form) {
    var items = form.getItems();
    while (items.length > 0) {
        form.deleteItem(items.pop());
    }
}
function createEntrySheet() {
    var name = 'Entradas ' + getDate();
    var folderId = '1m800AgtWh5wm8YLLN8CCr026yQIQZuZg';
    var resource = {
        title: name,
        mimeType: MimeType.GOOGLE_SHEETS,
        parents: [{ id: folderId }]
    };
    var file = Drive.Files.insert(resource);
    return file.id;
}
function getDate() {
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth(); // Be careful! January is 0 not 1
    var year = currentDate.getFullYear();
    var dateString = date + "-" + (month + 1) + "-" + year;
    return dateString;
}
