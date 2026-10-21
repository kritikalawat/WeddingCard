# Reusable Prompt — Generate a Wedding Invitation Website

Use this prompt (with an AI coding assistant like GitHub Copilot) whenever you
need to create this same style of wedding invitation card for a new couple.
Just paste it in, answer the follow-up questions, and the assistant will do
the rest.

---

## 📋 The Prompt

```
Create a single-page animated wedding invitation website using plain HTML,
CSS, and vanilla JavaScript (no frameworks, no build step, must work by just
opening index.html in a browser or hosting on GitHub Pages).

Architecture requirements:
1. Put ALL couple/wedding-specific content (names, parents, dates, venue,
   events, dress codes, RSVP info, theme colors, blessing/shlok text) into
   ONE standalone data file called `wedding-data.js`, as a single global
   object `window.weddingData`. No other file should contain hardcoded
   wedding content — everything must be rendered dynamically from this data
   file so the site can be reused for a different couple by editing only
   that file.
2. `index.html` should only contain empty containers/placeholders with IDs;
   it must not hardcode any names, dates or text.
3. `js/script.js` should read `window.weddingData` and render:
   - Hero section: invitation line, groom & bride names (with parents),
     optional logo/couple photo, decorative corners.
   - Save-the-date section with a live countdown timer (days/hours/
     minutes/seconds) to the wedding date, plus an "Add to Calendar"
     button that generates a downloadable .ics file on the fly.
   - "The Celebrations" section: a responsive grid of event cards built
     from an `events` array in the data file. Each event has a tag/badge
     (e.g. HALDI, SANGEET, RECEPTION), title, date, time, dress code, and
     an optional image (fallback to a decorative icon/gradient if no
     image is provided).
   - Venue & Travel section: venue name/address, a "Open in Google Maps"
     link and an embedded Google Maps iframe built from a map search
     query (no API key required), plus optional nearest airport/railway
     info rows.
   - Closing section: a closing message, an RSVP box with an optional
     Google Form link, optional contact list, and a WhatsApp RSVP link,
     plus an optional Sanskrit shlok/blessing with its meaning.
   - Any section should automatically hide itself if its related data is
     empty (graceful degradation).
4. `css/style.css` should implement an elegant Indian-wedding aesthetic:
   - Color palette as CSS variables (primary, secondary, gold accent,
     cream background, ink text, and a blush/floral accent) that get
     overridden at runtime from `weddingData.theme` — including derived
     `-rgb` channel variables so rgba()-based shadows/borders re-theme
     correctly too — so re-theming needs no CSS edits.
   - Fonts: an elegant script font for the couple's names (e.g. "Great
     Vibes"), a serif display font for headings (e.g. "Playfair
     Display"), and a readable serif body font (e.g. "Cormorant
     Garamond") loaded from Google Fonts.
   - Scroll-reveal animations (fade + slide up) using IntersectionObserver
     on elements with a `.reveal` class.
   - A floating-petals/decorative background animation (CSS keyframes).
   - A right-side dot navigation that highlights the section currently in
     view.
   - Fully responsive (mobile-first), with the dot nav hidden on small
     screens.
5. Include a `README.md` explaining how to edit `wedding-data.js`, add
   images to `assets/images/`, and deploy to GitHub Pages.
6. Include this same prompt file (`PROMPT.md`) so the project can be
   regenerated or reused for a different couple in the future.

Now ask me for the following details one by one (or let me paste them all
at once), then write/update `wedding-data.js` accordingly:
- Groom's name, father's name, mother's name
- Bride's name, father's name, mother's name
- Wedding date(s) and a short "invitation line"
- Main venue name, address, and a Google Maps search query
- List of events/functions: tag, title, date, time, dress code, and
  (optional) image path for each
- Nearest airport / railway station info (optional)
- RSVP via a Google Form link, RSVP contacts (name + phone), and/or a
  WhatsApp number + message
- A closing message and footer line
- Optional: a Sanskrit/religious blessing + its meaning
- Optional: theme colors if the default maroon/gold palette shouldn't be
  used, and any photos/logo to place in assets/images/
```

---

## 🧩 How to use this prompt

1. Open this project (or a copy of it) in VS Code with GitHub Copilot.
2. Paste the prompt above into the chat.
3. Answer the assistant's follow-up questions about the new couple's
   details (or just paste a filled-in copy of `wedding-data.js`'s fields).
4. The assistant should only need to edit `wedding-data.js` (and drop any
   photos into `assets/images/`) — the HTML/CSS/JS engine stays the same.
5. Open `index.html` in a browser to preview, then deploy (e.g. GitHub
   Pages) when ready.

## 💡 Tip

If you already have another couple's completed `wedding-data.js`, you can
skip the AI entirely — just copy this whole folder and replace that one
file plus any images.
