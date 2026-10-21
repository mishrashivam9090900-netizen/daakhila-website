# Daakhila | Admission Partner

Static-first, mobile-first website for Daakhila. The browser UI has no framework runtime; Vercel supplies the serverless contact endpoint and Web Analytics.

## Run

```bash
npm run build
npm run lint
npx serve .
```

Open the displayed local URL. The browser module imports the typed-style data in `data/site-config.js`. Use `vercel dev` to test the API locally.

## Contact backend

`/api/contact` validates the form, rejects the honeypot, applies best-effort in-memory rate limiting, and forwards the lead to the Apps Script webhook. The webhook should append the row to Google Sheets and send the notification email supplied as `notificationEmail`.

Copy `.env.example` to `.env` for local configuration. Set these variables in Vercel Project Settings:

- `GOOGLE_SHEETS_WEBHOOK_URL`: deployed Google Apps Script web-app URL.
- `CONTACT_NOTIFICATION_EMAIL`: inbox that Apps Script should notify, currently `daakhila.sathi@gmail.com`.

Never commit `.env`.

## Test the site

- Open the page at desktop width and at a narrow phone width such as 360px.
- Use the quota checker through all four questions and use Start again.
- Submit the contact form empty and with an invalid phone number to see field errors; submit valid data to confirm the honest demo status and WhatsApp/email links.
- Test the state filter, rank input, cutoff selector, checklist print button, EMI sliders, FAQ accordions, navigation anchors and dark-mode button.
- Run `node --check app.js` and `node --check data/site-config.js` after JavaScript edits.
- Run `vercel dev` to test `/api/contact` locally with the environment variables loaded.

## Where to edit content

- `data/site-config.js`: brand configuration, states, courses and services.
- `index.html`: copy, page structure and founder-supplied placeholders.
- `styles.css`: design tokens, responsive layout and print styling.
- `app.js`: interactive behavior and the `submitLead()` integration point.

## Add a state

1. Add one object to `states` in `data/site-config.js`.
2. Give it a `name`, `code`, `counselling`, `exam`, `seats`, `note`, and one status: `live`, `soon`, or `request`.
3. Add a course object to `courses` when its guide is ready.
4. Replace sample data with the official brochure, current dates, checked cutoffs and source link before marking a state Live.

## Launch review

Pricing, refund terms, mentor profiles, stories, logo, Hindi strings and final legal review remain to be supplied. All seat shares, dates and cutoff examples must be verified against the current official source. See `CONTENT_REVIEW.md`.
