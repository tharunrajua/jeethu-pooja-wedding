JEETHU & POOJA — CONSOLIDATED WEBSITE UPDATE

Included: Save the Date countdown to 10 December 2026 at 12:25 PM IST; Sangeeth only (Mehandi removed from website text); centred RSVP form; attendance date choices for 9 Dec, 10 Dec, or both; existing Google Sheets endpoint; venue and Google Photos link.

IMPORTANT IMAGE NOTE: The four image files H1.png, S1.png, M1.png and U1.png are TEMPORARY PREVIEW COPIES of the old site images because your newly selected PNGs were not attached in this chat. Before uploading this folder to GitHub, replace those four files with your actual new PNG images, keeping the exact filenames H1.png, S1.png, M1.png and U1.png.

PUBLISH: Upload/replace index.html and all image files in this folder at the root of your GitHub repository. Commit to main and wait for Vercel to redeploy. Keep existing other files if your repository has any.

RSVP: Website sends attendingDates to the existing Apps Script endpoint. Make sure your Apps Script Code.gs is the updated date-aware version, deploy a New version, then test an RSVP and confirm the selected dates appear in Google Sheets. The site uses no-cors, so the spreadsheet row is the proof of success.
