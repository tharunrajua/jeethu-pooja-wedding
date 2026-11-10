JEETHU & POOJA WEDDING WEBSITE — UPDATE PACKAGE

WHAT'S UPDATED
1. The phrase “A Serendipitous Beginning” now appears only once in the Our Story section.
2. Scratch reveal date card now fades away after 2 seconds.
3. Haldi: 9 December 2026, 3:00 PM onwards.
4. Haldi dress code: Pastel Pink or Light Pink.
5. Invitation wording: “With blessings of Raju and Guruji Family”.
6. Guests who RSVP yes are offered a calendar file containing only the event date(s) they selected. The calendar file includes an alert one day before and the event times/venue in the event details.
7. A luxury-styled guest Blessings wall has been added. New messages are saved to a separate Google Sheet tab named “Wedding Blessings” and the page refreshes the public list every 30 seconds.

IMPORTANT CALENDAR NOTE
A website cannot silently add events to a visitor's personal Google/Apple calendar. After submitting an RSVP, the guest must tap “Add calendar reminders (.ics)” and accept/import the calendar file. This is the normal privacy-safe browser flow. Selected dates are added as all-day calendar entries with the exact event times in the descriptions, because event end-times were not supplied.

IMPORTANT GOOGLE APPS SCRIPT STEP — REQUIRED FOR BLESSINGS
The website and Google-Sheets-RSVP-Code.gs are both updated, but the live guestbook needs the new Apps Script deployed:
1. Open the existing Google Apps Script project “Jeethu & Pooja Wedding RSVPs”.
2. Open Code.gs, select all old code, and replace it with the supplied Google-Sheets-RSVP-Code.gs.
3. Save.
4. Deploy > Manage deployments > pencil/Edit > Version: New version > Deploy.
5. Keep the existing Web app URL and access setting (Anyone) unchanged.
The new script keeps RSVP rows in “RSVP Responses” and creates a separate “Wedding Blessings” tab automatically when the first blessing is submitted.

DEPLOY WEBSITE
Replace the website files in the existing GitHub repository with the files in this ZIP, keeping all image assets in the same root folder as index.html. Commit/push; Vercel should redeploy automatically.

NOTE
RSVP and blessings submissions use the existing Apps Script endpoint. The browser uses no-cors for form posts, so it cannot verify a server-side save from the response itself. After deployment, test one RSVP and one blessing and confirm they appear in the respective Google Sheets tabs.
