// Daakhila Book a Call webhook.
// TODO: review access, retention and the notification workflow before launch.
const SHEET_NAME = 'Leads';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME) || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(['Submitted at', 'Name', 'Class / year', 'Exam', 'Home state', 'Phone', 'Consent', 'Source']);
    sheet.appendRow([new Date(), data.name || '', data.classYear || '', data.exam || '', data.state || '', data.phone || '', data.consent === true ? 'Yes' : 'No', data.source || 'website']);
    if (data.notificationEmail) {
      MailApp.sendEmail({ to: data.notificationEmail, subject: 'New Daakhila book-a-call enquiry', htmlBody: `<p><strong>${escapeHtml(data.name || 'Student')}</strong> submitted a book-a-call enquiry.</p><p>Exam: ${escapeHtml(data.exam || '')}<br>Class / year: ${escapeHtml(data.classYear || '')}<br>Home state: ${escapeHtml(data.state || '')}<br>Phone: ${escapeHtml(data.phone || '')}</p>` });
    }
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    console.error(error);
    return ContentService.createTextOutput(JSON.stringify({ ok: false })).setMimeType(ContentService.MimeType.JSON);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}
