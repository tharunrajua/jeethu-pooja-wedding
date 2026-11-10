const SPREADSHEET_ID = "1-GiMAiGh3fOHAKVPT0SLBzMyemzNhs0AMJld6zOuzjs";
const SHEET_NAME = "RSVP Responses";
const BLESSINGS_SHEET_NAME = "Wedding Blessings";

function doGet(e) {
  const params = (e && e.parameter) || {};
  if (params.action === "blessings") {
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(BLESSINGS_SHEET_NAME);
    const items = [];
    if (sheet && sheet.getLastRow() > 1) {
      const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getValues();
      rows.reverse().slice(0, 50).forEach(row => {
        items.push({ name: String(row[1] || "Guest"), message: String(row[2] || "") });
      });
    }
    const payload = JSON.stringify({ items: items });
    const callback = String(params.callback || "").replace(/[^a-zA-Z0-9_$.[\]]/g, "");
    if (callback) {
      return ContentService.createTextOutput(callback + "(" + payload + ");")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput("Jeethu & Pooja RSVP and blessings service is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Guest blessings are stored separately from RSVP records.
    if (data.action === "blessing") {
      const name = String(data.name || "").trim().slice(0, 70);
      const message = String(data.message || "").trim().slice(0, 500);
      if (!name || !message) throw new Error("Name and blessing are required.");
      let blessings = spreadsheet.getSheetByName(BLESSINGS_SHEET_NAME);
      if (!blessings) blessings = spreadsheet.insertSheet(BLESSINGS_SHEET_NAME);
      if (blessings.getLastRow() === 0) {
        blessings.appendRow(["Timestamp", "Guest Name", "Blessing"]);
        blessings.setFrozenRows(1);
      }
      blessings.appendRow([new Date(), name, message]);
      return ContentService.createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

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
