function createInvoiceForStudent(tx, templateSheet, ssId) {
  console.log('Function: createInvoiceForStudent');

  // --- Helpers ---
  const setOrClear = (a1, value) =>
    value ? templateSheet.getRange(a1).setValue(value) : templateSheet.getRange(a1).clearContent();

  const setMoneyOrClear = (a1, amount) =>
    amount ? templateSheet.getRange(a1).setValue(amount) : templateSheet.getRange(a1).clearContent();

  const neg = n => (n || 0) * -1;

  const setLine = (labelA1, valueA1, label, amount) => {
    setOrClear(labelA1, label);
    setMoneyOrClear(valueA1, amount);
  };

  const isFollowUpInvoice = inv => {
    // RMxxxx or RMxxxx-xx ; follow-up if suffix > 1
    if (!/^RM\d{4}(-\d{2})?$/.test(inv || '')) return null; // invalid
    const parts = String(inv).split('-');
    if (parts.length !== 2) return false; // first issue (no hyphen)
    const suffix = parseInt(parts[1], 10);
    return suffix > 1;
  };

  // --- Reset & basics ---
  clearTemplateSheet2();

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const printSheet = ss.getSheetByName(PRINT_SHEET_NAME);

  const invoiceNumber = tx.invoice_id;
  const backdate = printSheet.getRange('A4').getValue();
  const todaysDate = new Date().toDateString();

  templateSheet.getRange('H4').setValue(backdate || todaysDate);
  if (backdate) Logger.log('printing with back date');

  templateSheet.getRange('B9').setValue(tx.student_name || '');
  templateSheet.getRange('B10').setValue(tx.phone || '');
  templateSheet.getRange('B11').setValue(tx.email || '');
  templateSheet.getRange('H7').setValue(invoiceNumber || '');
  templateSheet.getRange('H10').setValue(tx.a_paid_by || '');
  templateSheet.getRange('H30').setValue(tx.for_signature || '');
  templateSheet.getRange('A22').setValue(tx.public_remark || '');

  // --- Branch: invoice type ---
  const followUp = isFollowUpInvoice(invoiceNumber);
  if (followUp === null) {
    console.log('Invalid invoice format. Expected RM#### or RM####-##');
    return null;
  }

  // Common: received amount
  templateSheet.getRange('H22').setValue(tx.received || 0);

  if (followUp) {
    // ===== Follow-up invoice (suffix > 1) =====
    templateSheet.getRange('A15').setValue(`${tx.course_name || ''} (Remaining Balance)`);
    // Original formula retained:
    templateSheet.getRange('G15').setValue(tx.total - (tx.total - (tx.received + tx.remaining)));

    templateSheet.getRange('F21').setValue('Remaining Amount');

    const courseTotal = templateSheet.getRange('H15').getValue() || 0;
    templateSheet.getRange('H21').setValue(courseTotal);                    // remaining amount baseline
    templateSheet.getRange('H23').setValue(courseTotal - (tx.received || 0));

  } else {
    // ===== First issue (no suffix or -01) =====
    templateSheet.getRange('A15').setValue(tx.course_name || '');
    templateSheet.getRange('G15').setValue(tx.total_course_fee || 0);

    // A16/G16: Document Fee
    if (tx.document_fee) {
      templateSheet.getRange('A16').setValue('Document Fee');               // fixed typo
      templateSheet.getRange('G16').setValue(tx.document_fee);
    } else {
      templateSheet.getRange('A16').clearContent();
      templateSheet.getRange('G16').clearContent();
    }

    // A18/G18: Discount (percentage/other) + fixed discount (combined as negative)
    const discount = tx.discount_amount ?? 0;
    const pctOrOtherDisc = discount === 0 ? 0 : (tx.total_course_fee ?? 0) - discount;

    const fixedDisc      = tx.discount_fixed || 0;
    const totalDisc18    = pctOrOtherDisc + fixedDisc;
    if (totalDisc18) {
      templateSheet.getRange('A18').setValue(tx.discount_type || 'Discount');
      templateSheet.getRange('G18').setValue(neg(totalDisc18));
    } else {
      templateSheet.getRange('A18').clearContent();
      templateSheet.getRange('G18').clearContent();
    }

    // A19/G19: Additional discount line (label from add_discount, amount from add_amount)
    if (tx.add_amount) {
      templateSheet.getRange('A19').setValue(tx.add_discount || 'Additional Discount');
      templateSheet.getRange('G19').setValue(neg(tx.add_amount));
    } else {
      templateSheet.getRange('A19').clearContent();
      templateSheet.getRange('G19').clearContent();
    }

    // A20/G20: Coupon
    if (tx.coupon_id && tx.coupon_amount) {
      templateSheet.getRange('A20').setValue(tx.coupon_id);
      templateSheet.getRange('G20').setValue(neg(tx.coupon_amount));
    } else {
      templateSheet.getRange('A20').clearContent();
      templateSheet.getRange('G20').clearContent();
    }

    // Totals
    templateSheet.getRange('F21').setValue('Total Amount');

    const h15 = templateSheet.getRange('H15').getValue() || 0;  // Course total
    const h16 = templateSheet.getRange('H16').getValue() || 0;  // Document fee
    const h18 = templateSheet.getRange('H18').getValue() || 0;  // Discount (neg)
    const h19 = templateSheet.getRange('H19').getValue() || 0;  // Additional (neg)
    const h20 = templateSheet.getRange('H20').getValue() || 0;  // Coupon (neg)

    const grandTotal = (h15 + h16) + (h18 + h19 + h20);
    templateSheet.getRange('H21').setValue(grandTotal);
    templateSheet.getRange('H23').setValue(grandTotal - (tx.received || 0));

    // Optional: show a "Discount" heading if any discount-like lines exist
    if (h18 || h19 || h20) templateSheet.getRange('A17').setValue('Discount');
  }

  // --- Export PDF ---
  SpreadsheetApp.flush();
  Utilities.sleep(5000); // allow rendering before export

  const pdf = createPDF2(ssId, templateSheet, `Invoice#${invoiceNumber}-${tx.student_name}`);
  pdf.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  printSheet.getRange('A4').clearContent();

  return [
    invoiceNumber,
    todaysDate,
    tx.course_name,
    tx.id,
    tx.student_name,
    tx.email,
    tx.total_course_fee,
    tx.final_discount_total,
    tx.received,
    tx.remaining,
    pdf.getUrl()
  ];
}