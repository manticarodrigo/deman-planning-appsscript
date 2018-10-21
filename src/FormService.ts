/**
   Reset Form and build menu.
*/

function updateForm(menus: Array<any>) {
    // Use your form ID here. You can get it from the URL.
    const form = FormApp.openById('1JWr5Fl6AwkpaFgC_CmDlQgvLjyANBqakeP7Wiu6KI_4'); // TODO: create forms for each store
    // Update the form's response destination.
    const ss = SpreadsheetApp.open(DriveApp.getFileById(createEntrySheet(/* TODO: pass in store data */)));
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
    // Delete existing form items.
    clearForm(form);
    // Set form title.
    form.setTitle(`Bienvenido al formulario semanal`);
    form.setDescription('Favor llenar cada dia de la semana en las siguientes paginas.')
    // Loop over each day's menu.
    menus.forEach((menu) => {
        // Add a page break.
        const page = form.addPageBreakItem()
        page.setTitle(menu.name);
        page.setHelpText(`Favor llenar menu para el ${menu.name}`);

        // Create new items.
        menu.values.forEach((row: any) => {
            const item = form.addTextItem();
            const textValidation = FormApp.createTextValidation()
                .setHelpText('Favor ingresar numero entre 0 y 999.')
                .requireNumberBetween(0, 999)
                .build();
            item.setValidation(textValidation);
            item.setTitle(row[1]);
            item.setHelpText(row[0] + ' ' + row[2]);
            item.setRequired(true);
        });
    });
}

function clearForm(form: any) {
    const items = form.getItems();
    while (items.length > 0) {
        form.deleteItem(items.pop());
    }
}

function createEntrySheet() {
    const name = '(Sucursal)_' + getDate(); // TODO: Prefix survey response file w/ store name
    const folderId = '1vwn-J8wuW9rFsbBooqIpDUD98NI8KGwq'; // TODO: store in store folders
    const resource = {
        title: name,
        // @ts-ignore
        mimeType: MimeType.GOOGLE_SHEETS,
        parents: [{ id: folderId }]
    };
    // @ts-ignore
    const file = Drive.Files.insert(resource);
    return file.id;
}

function getDate() {
    const date = new Date();
    return `${date.getDate()}_${date.getMonth() + 1} _${date.getFullYear()}`;
}
