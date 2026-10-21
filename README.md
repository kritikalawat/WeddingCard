# Wedding Invitation Card

An elegant, animated, single-page wedding invitation website — inspired by
and improved upon [this card](https://ssrbsoni.github.io/sourabh-priyal-wedding/).
No build step, no frameworks: just open `index.html` in a browser, or host
it for free on GitHub Pages.

## ✨ Features

- Live countdown timer to the wedding date
- "Add to Calendar" button (generates a `.ics` file on the fly — no server needed)
- Event cards for every function (Haldi, Sangeet, Baraat, Reception, etc.)
  with tag, date, time and dress code
- Google Maps embed + "Open in Maps" link generated from a simple text query
- RSVP via an embedded Google Form (with a fallback open-in-new-tab button) and/or a WhatsApp RSVP link
- Envelope landing screen with a deity/blessing image that animates up to the top of the card when opened
- Scroll-reveal animations, floating petal decoration, and a side dot-navigation
- Fully responsive, fast, and dependency-free

## 📁 Project structure

```
WeddingCard/
├── index.html          → page structure (no hardcoded content)
├── wedding-data.js      → ⭐ EDIT THIS to change all card content
├── css/style.css        → styling & theme
├── js/script.js         → renders the page from wedding-data.js
├── assets/images/       → put photos/illustrations here (optional)
└── PROMPT.md            → reusable prompt to regenerate this card for someone else
```

## ✏️ How to customize for your own wedding (or someone else's)

1. Open **`wedding-data.js`** — it's the only file you need to touch for
   normal use. It contains clearly commented sections for:
   - Deity/blessing image (shown on the envelope, animates to the hero on open)
   - Couple names & parents
   - Wedding date(s) & venue (drives the countdown + calendar file)
   - Theme colors
   - Events/celebrations (add, remove, or reorder entries freely)
   - Travel info (nearest airport/railway)
   - RSVP (Google Form link, WhatsApp number/message, and/or a contact list)
   - Closing message & blessing/shlok
2. (Optional) Drop photos or illustrations into `assets/images/` and
   reference them in the matching `image`/`logo` fields in
   `wedding-data.js`. Leave a field empty (`""`) to use the built-in
   decorative fallback instead — images are never required.
3. Open `index.html` in your browser to preview.
4. Leaving any section's data empty automatically hides that section.

## 🚀 Deploying to GitHub Pages

1. Push this folder to a GitHub repository.
2. In the repo settings, enable **GitHub Pages** for the `main` branch
   (root folder).
3. Your card will be live at `https://<username>.github.io/<repo>/`.

## 🔁 Reusing this template for someone else

See [PROMPT.md](PROMPT.md) — it contains a ready-to-paste prompt for an AI
coding assistant (like GitHub Copilot) that regenerates this exact project
structure, plus the list of questions it should ask you about the new
couple's details.
