/** Web app entry */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('App Launcher')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Sheet: "Sheet Directory"
 * B = Name, C = Category, D = Link (plain text or HYPERLINK)
 */
function getApps() {
  const cache = CacheService.getScriptCache();
  const cached = cache.get('apps_v1');
  if (cached) return JSON.parse(cached);

  const sh = SpreadsheetApp.getActive().getSheetByName('Sheet Directory');
  if (!sh) throw new Error('Sheet "Sheet Directory" not found');

  const lastRow = sh.getLastRow();
  if (lastRow < 1) return [];

  const values = sh.getRange(1, 2, lastRow, 3).getValues();          // B:D
  const rich   = sh.getRange(1, 4, lastRow, 1).getRichTextValues();   // D only

  // find first non-empty row (in case row 1 is blank)
  let start = 0;
  while (start < values.length && !String(values[start][0] || '').trim() && !String(values[start][2] || '').trim()) {
    start++;
  }
  // header detection on that row
  if (start < values.length) {
    const r0 = values[start].map(v => String(v).trim().toLowerCase());
    const hasHeader = r0[0].includes('name') || r0[1].includes('category') || r0[2].includes('link');
    if (hasHeader) start++;
  }

  const out = [];
  for (let i = start; i < values.length; i++) {
    const [nameRaw, categoryRaw, linkRaw] = values[i];
    const name = String(nameRaw || '').trim();
    const category = String(categoryRaw || '').trim();

    // extract hyperlink from RichText (handles mixed runs)
    let url = '';
    const cellRT = rich[i] && rich[i][0];
    if (cellRT) {
      if (typeof cellRT.getLinkUrl === 'function' && cellRT.getLinkUrl()) {
        url = cellRT.getLinkUrl().trim();
      } else if (typeof cellRT.getRuns === 'function') {
        const runWithLink = (cellRT.getRuns() || []).find(r => r.getLinkUrl());
        if (runWithLink) url = runWithLink.getLinkUrl().trim();
      }
    }
    if (!url) url = String(linkRaw || '').trim();

    if (!name || !url) continue;

    // add scheme if missing
    if (!/^(https?:\/\/|mailto:|tel:)/i.test(url)) url = 'https://' + url;

    out.push({ name, category, url });
  }

  // optional: stable sort by category then name
  out.sort((a,b) => (a.category || '').localeCompare(b.category || '', undefined, {sensitivity:'base'}) ||
                    a.name.localeCompare(b.name, undefined, {sensitivity:'base'}));

  cache.put('apps_v1', JSON.stringify(out), 60); // cache 60s
  return out;
}