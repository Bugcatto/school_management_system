function old_createInvoiceForStudent(transactions, templateSheet, ssId) {
  //Logger.log ("step1");
  console.log('Function: createInvoiceForStudent');
  //Logger.log(transactions.course_name);
  
  // Clears the template sheet before filling it in with new data
  clearTemplateSheet2();
  //for backdate printing
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const printSheet = ss.getSheetByName(PRINT_SHEET_NAME);
  const settransdate = printSheet.getRange('A4').getValue();

  


  // Extracts relevant data from the transaction object
  const invoiceNumber = transactions.invoice_id;
  const todaysDate = new Date().toDateString();
  if(!settransdate){
    templateSheet.getRange('H4').setValue(todaysDate);
  }else{
    templateSheet.getRange('H4').setValue(settransdate);
    Logger.log("printing with back date");
  }
  templateSheet.getRange('B9').setValue(transactions.student_name);
  templateSheet.getRange('B10').setValue(transactions.phone);
  templateSheet.getRange('B11').setValue(transactions.email);
  templateSheet.getRange('H7').setValue(transactions.invoice_id);
  
  templateSheet.getRange('H10').setValue(transactions.a_paid_by);
  templateSheet.getRange('H30').setValue(transactions.for_signature);
  templateSheet.getRange('A22').setValue(transactions.public_remark);

  // Check if transId has the format 'RMxxxx' or 'RMxxxx-xx'
  if (/^RM\d{4}(-\d{2})?$/.test(invoiceNumber)) {
    const parts = invoiceNumber.split('-');
    
    if (parts.length === 2) {
      const numberAfterHyphen = parseInt(parts[1], 10);  // Get the number after the hyphen

      // Check if the number after the hyphen is greater than 01
      if (numberAfterHyphen > 1) {
        console.log('Number after hyphen is greater than 01. Calling function...');
        
        // Fills in the template sheet with the extracted data
        templateSheet.getRange('A15').setValue(transactions.course_name + " (Remaining Balance)");
        Logger.log(transactions.course_name);
        templateSheet.getRange('G15').setValue(transactions.total - (transactions.total - ( transactions.received + transactions.remaining ) ) );
        
        templateSheet.getRange('F21').setValue("Remaining Amount");
        var temptotal = templateSheet.getRange('H15').getValue()
        templateSheet.getRange('H21').setValue( temptotal );
        templateSheet.getRange('H22').setValue(transactions.received);
        templateSheet.getRange('H23').setValue( temptotal - transactions.received);
      } else {
      console.log('first issue, continuing...');
      
      // Fills in the template sheet with the extracted data

      templateSheet.getRange('A15').setValue(transactions.course_name);
      Logger.log(transactions.course_name);
      templateSheet.getRange('A22').setValue(transactions.public_remark);
      templateSheet.getRange('G15').setValue(transactions.total_course_fee);
      templateSheet.getRange('H22').setValue(transactions.received);
      

      // Check and set document fee, if document fee is not 0
      if (transactions.document_fee) {
          templateSheet.getRange('A16').setValue("Doucment Fee");
          templateSheet.getRange('G16').setValue(transactions.document_fee);
      } else {
          templateSheet.getRange('A16').clearContent();
          templateSheet.getRange('G16').clearContent();
      }
      
      // discount part continue if no hyphen
      
      // Check and set total course fee minus discount amount in G18, if discount_amount is not 0
      if (transactions.discount_amount || transactions.discount_fixed) {
          templateSheet.getRange('A18').setValue(transactions.discount_type || "Discount");
          templateSheet.getRange('G18').setValue(
          ((transactions.discount_amount || 0) + (transactions.discount_fixed || 0)) * -1
          );
      } else {
          templateSheet.getRange('A18').clearContent();
          templateSheet.getRange('G18').clearContent();
      }
      
      // Check and set add_discount label and value in A19 and G19, if add_amount is not 0
      if (transactions.add_amount) {
          templateSheet.getRange('A19').setValue(transactions.add_discount);
          templateSheet.getRange('G19').setValue(transactions.add_amount * -1);
      } else {
          templateSheet.getRange('A19').clearContent();
          templateSheet.getRange('G19').clearContent();
      }
      
      // Check and set coupon_id in A20 and coupon_amount in G20, if coupon_amount is not 0
      if (transactions.coupon_id && transactions.coupon_amount) {
          templateSheet.getRange('A20').setValue(transactions.coupon_id);
          templateSheet.getRange('G20').setValue(transactions.coupon_amount * -1);
      } else {
          templateSheet.getRange('A20').clearContent();
          templateSheet.getRange('G20').clearContent();
      }
      
      templateSheet.getRange('F21').setValue("Total Amount");
      
      // Calculate the total amount after discounts
      var temptotal = templateSheet.getRange('H15').getValue();  // Reference to templateSheet
      var tempdoc = templateSheet.getRange('H16').getValue();  // Reference to templateSheet
      var temp_mdisc = templateSheet.getRange('H18').getValue(); // Reference to templateSheet
      var temp_adisc = templateSheet.getRange('H19').getValue(); // Reference to templateSheet
      var temp_fixdisc = templateSheet.getRange('H20').getValue(); // Reference to templateSheet

      temptotal = temptotal || 0;
      tempdoc = tempdoc || 0;
      temp_mdisc = temp_mdisc || 0;
      temp_adisc = temp_adisc || 0;
      temp_fixdisc = temp_fixdisc || 0;

      templateSheet.getRange('H21').setValue((temptotal+tempdoc) + (temp_mdisc + temp_adisc + temp_fixdisc));
      templateSheet.getRange('H23').setValue(templateSheet.getRange('H21').getValue() - transactions.received);


      // Check if discount values are not empty
      if (temp_mdisc && temp_adisc && temp_fixdisc) {
        templateSheet.getRange('A17').setValue("Discount");
      }
    }
    } else {
      console.log('no-hyphen, continuing...');
      
      // Fills in the template sheet with the extracted data

      templateSheet.getRange('A15').setValue(transactions.course_name);
      Logger.log(transactions.course_name);
      templateSheet.getRange('A22').setValue(transactions.public_remark);
      templateSheet.getRange('G15').setValue(transactions.total_course_fee);
      templateSheet.getRange('H22').setValue(transactions.received);
      
      // Check and set document fee, if document fee is not 0
      if (transactions.document_fee) {
          templateSheet.getRange('A16').setValue("Doucment Fee");
          templateSheet.getRange('G16').setValue(transactions.document_fee);
      } else {
          templateSheet.getRange('A16').clearContent();
          templateSheet.getRange('G16').clearContent();
      }
      
      // discount part continue if no hyphen
      
      // Check and set total course fee minus discount amount in G18, if discount_amount is not 0
      if (transactions.discount_amount) {
          templateSheet.getRange('A18').setValue(transactions.discount_type);
          templateSheet.getRange('G18').setValue((transactions.total_course_fee - transactions.discount_amount) * -1);
      } else {
          templateSheet.getRange('A18').clearContent();
          templateSheet.getRange('G18').clearContent();
      }
      
      // Check and set add_discount label and value in A19 and G19, if add_amount is not 0
      if (transactions.add_amount) {
          templateSheet.getRange('A19').setValue(transactions.add_discount);
          templateSheet.getRange('G19').setValue(transactions.add_amount * -1);
      } else {
          templateSheet.getRange('A19').clearContent();
          templateSheet.getRange('G19').clearContent();
      }
      
      // Check and set discount_fixed value in G20, if discount_fixed is not 0
      if (transactions.discount_fixed) {
          templateSheet.getRange('G20').setValue(transactions.discount_fixed * -1);
      } else {
          templateSheet.getRange('G20').clearContent();
      }
      
      templateSheet.getRange('F21').setValue("Total Amount");
      
      // Calculate the total amount after discounts
      var temptotal = templateSheet.getRange('H15').getValue();  // Reference to templateSheet
      var tempdoc = templateSheet.getRange('H16').getValue();  // Reference to templateSheet
      var temp_mdisc = templateSheet.getRange('H18').getValue(); // Reference to templateSheet
      var temp_adisc = templateSheet.getRange('H19').getValue(); // Reference to templateSheet
      var temp_fixdisc = templateSheet.getRange('H20').getValue(); // Reference to templateSheet

      temptotal = temptotal || 0;
      tempdoc = tempdoc || 0;
      temp_mdisc = temp_mdisc || 0;
      temp_adisc = temp_adisc || 0;
      temp_fixdisc = temp_fixdisc || 0;

      templateSheet.getRange('H21').setValue((temptotal+tempdoc) + (temp_mdisc + temp_adisc + temp_fixdisc));
      templateSheet.getRange('H23').setValue(templateSheet.getRange('H21').getValue() - transactions.received);

      // Check if discount values are not empty
      if (temp_mdisc && temp_adisc && temp_fixdisc) {
        templateSheet.getRange('A17').setValue("Discount");
      }
    }
  } else {
    console.log('Invalid transId format.');
  }
  
  

  // Flushes the spreadsheet to ensure all pending changes are made before continuing
  SpreadsheetApp.flush();
  Utilities.sleep(5000);// Offset latency in creating the PDF
  
  // Creates a PDF of the template sheet
  const pdf = createPDF2(ssId, templateSheet, `Invoice#${invoiceNumber}-${transactions.student_name}`);
  pdf.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  printSheet.getRange('A4').clearContent();

  return [invoiceNumber, todaysDate, transactions.course_name, transactions.id, transactions.student_name, transactions.email, transactions.total_course_fee, transactions.final_discount_total, transactions.received, transactions.remaining, pdf.getUrl()];
}