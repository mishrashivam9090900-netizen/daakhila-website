# Daakhila | Admission Partner

Static-first, mobile-first website prototype for Daakhila. It has no runtime dependencies and can be opened directly from `index.html`, or served with any static server.

## Run

```bash
npx serve .
```

Open the displayed local URL. No build step is required. The browser module imports the typed-style data in `data/site-config.js`.

## Test the site

- Open the page at desktop width and at a narrow phone width such as 360px.
- Use the quota checker through all four questions and use Start again.
- Submit the contact form empty and with an invalid phone number to see field errors; submit valid data to confirm the honest demo status and WhatsApp/email links.
- Test the state filter, rank input, cutoff selector, checklist print button, EMI sliders, FAQ accordions, navigation anchors and dark-mode button.
- Run `node --check app.js` and `node --check data/site-config.js` after JavaScript edits.

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

## Launch TODOs

Pricing, refund terms, mentor profiles, stories, logo, Hindi strings and a server-side lead destination remain to be supplied. All seat shares, dates and cutoff examples must be verified against the current official source.
