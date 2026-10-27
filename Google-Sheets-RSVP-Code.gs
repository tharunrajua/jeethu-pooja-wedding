const SPREADSHEET_ID = "1-GiMAiGh3fOHAKVPT0SLBzMyemzNhs0AMJld6zOuzjs";
const SHEET_NAME = "RSVP Responses";

function doGet() {
  return ContentService.createTextOutput("Jeethu & Pooja RSVP service is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

    const headers = ["Timestamp", "Full Name", "Phone Number", "Attendance", "Attending Date(s)", "City", "People Travelling", "Accommodation Needed"];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
    } else {
      const currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      if (!currentHeaders.includes("Attending Date(s)")) {
        const attendanceCol = currentHeaders.indexOf("Attendance");
        const insertCol = attendanceCol >= 0 ? attendanceCol + 2 : sheet.getLastColumn() + 1;
        sheet.insertColumnBefore(insertCol);
        sheet.getRange(1, insertCol).setValue("Attending Date(s)");
      }
    }

    if (!data.name || !data.phone || !data.attending || !data.city) throw new Error("Missing required RSVP details.");
    const row = [new Date(), data.name, data.phone, data.attending,
      Array.isArray(data.attendingDates) ? data.attendingDates.join(", ") : (data.attendingDates || ""),
      data.city, data.travellerCount || "", data.accommodation || ""];
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: String(error) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
