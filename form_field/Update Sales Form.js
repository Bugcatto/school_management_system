function updateDropdown2() {
  try {
    // Specify the form ID
    var formId = "1_zeRTX2m-ZCyDzfwFGD9fwH6G0lhDXj_8p3DzDfA_rE"; // Replace with your actual form ID

    // Specify the titles and IDs of the items you want to update
    var itemConfigs = [
      { title: "Course & Program ဖြည့်ရန်", id: null },
      { title: "Sales Lead Info (2-999)", id: null },
      { title: "Sales Lead Info (1000-1997)", id: null },
      { title: "Sales Lead Info (1998-2995)", id: null }
    ];

    // Open the form
    var form = FormApp.openById(formId);

    // Log form items
    //logFormItems(form);

    // Get the IDs of the items with the specified titles
    for (var i = 0; i < itemConfigs.length; i++) {
      itemConfigs[i].id = getItemIdByTitle(form, itemConfigs[i].title);
      Logger.log(itemConfigs);
      if (!itemConfigs[i].id) {
        throw new Error('Item with title "' + itemConfigs[i].title + '" not found.');
      }
    }

    // Get the form list items and specify the sheet name
    var sheetName = 'Form Field List';

    // Update dropdown choices
    for (var i = 0; i < itemConfigs.length; i++) {
      var formListItem = form.getItemById(itemConfigs[i].id).asListItem();
      var list = getValuesFromSheet(sheetName, itemConfigs[i].title);
      Logger.log(itemConfigs[i].title);
      Logger.log(list);
      formListItem.setChoiceValues(list);
      console.log('Dropdown updated successfully for Form ID: ' + formId);
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}
