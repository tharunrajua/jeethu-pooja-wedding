# Jeethu & Pooja Royal Wedding Website

Mobile-first wedding invitation with a royal-door opening animation, ivory/antique-gold/deep-green palette, event details, venue map, conditional RSVP travel fields, and photo gallery placeholders.

## Deploy to the existing GitHub/Vercel project
1. Extract this ZIP.
2. Upload `index.html` and the included JPG files to the **root** of the existing repository, replacing `index.html` and replacing same-named image files only if desired.
3. Commit the changes. Vercel should redeploy automatically.

## Important integrations
- Automatic spreadsheet recording is not active yet. In `index.html`, set `RSVP_ENDPOINT` to the deployed Google Apps Script Web App URL after configuring Google Sheets. Until then the form uses WhatsApp as a temporary fallback.
- Shared guest photo uploads are not active yet; the current gallery shows sample images and provides a WhatsApp sharing fallback. A storage provider still needs to be configured.
- Images are expected in the repository root beside `index.html`.
