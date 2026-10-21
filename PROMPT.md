# Prompts used to build this invite with Claude

There are two prompts here:

1. **[The consolidated prompt](#1-consolidated-prompt-recommended)**: use this one. It describes the invite as it is live today, with all the refinements from the build session folded in. Fill in the `[…]` placeholders with your own details.
2. **[The original prompt](#2-the-original-prompt-as-first-written)**: the first message that started the project, kept for reference. The site then evolved over many follow-up requests, and those changes are already in prompt 1.

See [README.md](README.md) for how to run the prompt and what to prepare.

---

## 1. Consolidated prompt (recommended)

> Copy everything inside the box into Claude, preferably **Claude Code**, so it can write files, render previews and publish. Attach your logo, Ganesha image and horse and elephant images when it asks.

```text
Build a mobile-first, single-page Indian wedding invitation website for [GROOM] & [BRIDE]'s destination
wedding in [CITY]. It will be shared as a link on WhatsApp, so it must load fast on 4G phones, look perfect
at 360–430px width, and still look elegant on desktop (centred column, max-width ~480px, decorative
maroon jaali background on the sides). Plain HTML/CSS/JS in one index.html, with no framework and no build step.
Draw illustrations as inline SVG so the page stays around 30 KB gzipped.

=== VISUAL DIRECTION ===
- Theme "Royal [CITY]": modern Mewar/Pichhwai miniature style, soft watercolour textures, fine gold
  linework, jharokha arches, lake, lotus, marigold and peacock motifs.
- Palette: ivory #FBF7EF paper-texture background, antique gold #B8893B, deep maroon #6B1E2E. Each event
  card gets its own sub-palette.
- A thin double gold border frames the viewport, with a small peacock-feather motif in each corner.
- Fonts (Google Fonts, display=swap, preloaded): Cormorant Garamond for headings and names (italic),
  Lora for body text (18px), Tiro Devanagari Sanskrit for the mantra, Cinzel for the small event-card labels,
  EB Garamond for event-card details, Pinyon Script for the closing line only.
- The attached logo must be used exactly as provided: never redrawn, recoloured or distorted. Make a
  display-size WebP copy for the page and keep the original for building the preview image.
- Accessibility: good contrast, alt text, tap targets of at least 44px, and prefers-reduced-motion support
  (animations become simple fades). Never letter-space Devanagari.

=== 0. TAP-TO-OPEN ENVELOPE (landing screen) ===
- Full-screen ivory envelope with gold filigree over a soft illustrated lake-at-dawn backdrop.
  A maroon wax seal holds the logo on an ivory disc.
- Below it, "Tap to open" in italic serif, with a gentle wave running through it letter by letter (each
  letter lifts and turns gold in turn), and "[GROOM] & [BRIDE]" in small spaced capitals. Gold rings
  ripple out from the seal, and every few seconds the flap lifts slightly and settles. No hand or finger icon.
- On tap: the seal cracks into two halves, the flap opens in 3D, a small invitation card slides up, marigold
  petals burst and fall, and music starts (assets/music.mp3; fall back to a soft synthesised santoor tune in
  Raag Bhupali if the file is missing). No visible music button. Pause music when the tab is hidden.
- The page must always start at the top after the envelope opens, even after a reload
  (history.scrollRestoration = 'manual'), except when returning with the Back button.
- Avoid anything that blurs during animation: no blur filters and no scaling of text layers.
- After opening, show a small ivory "Scroll" pill with two animated gold chevrons at the bottom centre.
  It disappears for good once the guest scrolls, and tapping it scrolls down one screen.

=== 1. OPENING ===
- The attached golden Ganesha-in-Om image, about 100–124px wide.
- Below it, the Vakratunda mantra in exactly two lines (Tiro Devanagari Sanskrit, sized with clamp() so the
  longer line always fits), flanked by two small flickering diyas:
  वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।
  निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
- Invitation card (double gold border): "With the blessings of our elders, we joyfully invite you to
  celebrate the wedding of" / [GROOM] / s/o [GROOM'S PARENTS] / & / [BRIDE] / d/o [BRIDE'S PARENTS],
  then the logo shown large. Names in large gold italic serif, with a staggered fade-in as the guest scrolls.

=== 2. SAVE THE DATES ===
- "[DATES]" · "[VENUE], [AREA], [CITY]".
- A live countdown (days, hours, minutes, seconds) to [FIRST EVENT DATE & TIME, with timezone], in gold-bordered tiles.
- An "Add to Calendar" button linking to a static wedding.ics with every event. Each event title starts with
  "[BRIDE] & [GROOM] Wedding · …" and has a 2-hour reminder.
- An illustrated city skyline (palace, lake, boat, sun) with slow parallax layers, fading into the page.

=== 3. THE CELEBRATIONS: one full-width card per event, revealed on scroll ===
Each card has a themed SVG scene, a small label, the event name, and then "When" and "Dress code" only
(no venue line). Each scene has one subtle looping animation, paused while off-screen.
1. [EVENT 1, e.g. Haldi], "[TITLE]": [DATE · TIME]. Dress: [..]. Sunny haveli courtyard, swing draped in
   marigolds, brass bowls of haldi, spinning pastel parasols, rising sparkles.
2. [EVENT 2, e.g. Sangeet], "[TITLE]": [..]. Night terrace over the lake, fairy lights, chandelier, dholak
   and harmonium, drifting bokeh.
3. [EVENT 3, e.g. Baraat · Varmala · Phere], "[TITLE]": [..]. Golden-morning ghat, marigold mandap, sacred
   fire, falling rose petals. Use the attached horse and elephant images, standing on the ghat steps on
   either side of the mandap.
4. [EVENT 4, e.g. Reception], "[TITLE]": [..]. White marble arches, candle stands, white roses,
   a reflecting pool with floating candles.

=== 4. VENUE & TRAVEL ===
- Venue name and address, an "Open in Google Maps" button, and an embedded Google Map that loads only
  when the guest scrolls near it.
- Travel tips: nearest airport and railway station, with approximate distances and drive times.

=== 5. CLOSING ===
- Night lake illustration with a decorated boat drifting and sky lanterns rising, the logo in an ivory medallion,
  "We look forward to celebrating with you" in Pinyon Script, and a "Share this invite" button
  (Web Share API, falling back to WhatsApp).

=== 6. RSVP (last section) ===
- Embed a Google Form in an iframe (…/viewform?embedded=true) inside a gold-bordered white card, loaded
  only when the guest nears it. Below it, an "RSVP on WhatsApp" button.
- Also give me a Google Apps Script that creates the form (Name, Phone, Number of guests, Events attending
  as checkboxes, "Arrival date & time" as free text with the example "e.g. 1 Dec, around 9 AM", and Message
  for the couple) and a linked responses Google Sheet, and prints the form's links.

=== TECHNICAL ===
- Open Graph and Twitter tags with absolute URLs: title "[GROOM] & [BRIDE] · [DATES] · [CITY]",
  description "You are invited to our wedding celebrations", and a 1200x630 preview image of the logo on ivory
  with a gold border and peacock corners (generate it with headless Chrome). Favicons from the logo.
- Lighthouse mobile performance 85+. Lazy-load anything below the first screen. No autoplaying audio before a tap.
- Publish on GitHub Pages (public repo, .nojekyll) and verify every file loads on the live URL.
- Show me each change in a local phone-size preview before publishing.
```

---

## 2. The original prompt (as first written)

> The first message that started the project, with the couple's own details. Several parts were
> changed later: Hindi toggle and music button removed, RSVP moved to Google Forms, a new opening, and so on.

```text
Build a mobile-first, single-page Indian wedding invitation website for Sourabh & Priyal's destination wedding in Udaipur. It will be shared as a link on WhatsApp, so it must load fast on 4G phones, look perfect at 360–430px width, and still look elegant on desktop (centred column, max-width ~480px, decorative background on the sides).

=== VISUAL DIRECTION ===
- Theme: "Royal Udaipur" — modern Mewar/Pichhwai miniature-art illustration style with soft watercolour textures, fine gold-foil linework, jharokha arches, Lake Pichola, lotus, marigold and peacock motifs.
- Base palette: ivory (#FBF7EF) paper-texture background, antique gold (#B8893B), deep maroon (#6B1E2E) for accents. Each event section gets its own sub-palette (below).
- Typography: English headings in an elegant serif (Cormorant Garamond or Playfair Display), body in a clean readable serif/sans at minimum 16px; Devanagari in Tiro Devanagari Hindi or Noto Serif Devanagari. Load via Google Fonts with fallbacks.
- A thin ivory-and-gold ornamental border with small peacock corner motifs frames the viewport throughout.
- The attached image is our WEDDING LOGO. Use it exactly as provided — do not redraw, recolour, or distort it. Show it on the envelope seal, the invitation card, and the closing section.

=== SECTION 0: TAP-TO-OPEN ENVELOPE (landing) ===
- Full-screen ivory envelope with gold filigree, resting on a soft-focus illustrated backdrop of Lake Pichola at dawn. A maroon wax seal carries our logo.
- Small text below: "Tap to open" with a gentle pulse.
- On tap: wax seal cracks, envelope flap opens (CSS 3D), invitation card slides up, marigold petals burst and float down, and soft instrumental shehnai/santoor music begins (royalty-free placeholder file). Show a small floating music on/off toggle for the rest of the visit.
- Respect prefers-reduced-motion: replace animations with simple fades.

=== SECTION 1: AUSPICIOUS OPENING ===
- Top: "ॐ" then "श्री गणेशाय नमः" in gold Devanagari, with a gold-line Lord Ganesha illustration and two flickering diya animations.
- Invitation text:
  "With the blessings of our elders, we joyfully invite you to celebrate the wedding of"
  Sourabh
  s/o Mrs. Vidya Devi & Mr. Umesh Kumar Soni
  &
  Priyal
  d/o Mrs. Rekha & Mr. Giriraj Soni
- Names in large serif gold; parents' lines smaller. Staggered fade-up on scroll.

=== SECTION 2: SAVE THE DATES + COUNTDOWN ===
- "1 & 2 December 2026 · Ceremony Resort, Shobhagpura, Udaipur"
- Live countdown (days / hours / minutes / seconds) to 1 Dec 2026, 11:00 AM IST, in gold-bordered tiles.
- "Add to Calendar" button generating an .ics file with all four events.
- Background: illustrated Udaipur skyline with slow parallax layers (lake, palace, sky).

=== SECTION 3: THE CELEBRATIONS (one full-width card per event, revealed on scroll) ===
Each card: illustrated themed background, event name, date & time, venue, dress code, and one subtle looping animation. Cards swipe horizontally OR stack vertically with scroll-reveal — choose whichever feels smoother on mobile.

1. Rangon Ki Subah — Haldi
   1 December 2026 · 11:00 AM
   Dress code: Playful pastels and cheerful daytime colours
   Look: sunny haveli courtyard, pastel yellow/mint/blush, marigold-draped jhoola, brass urlis of haldi. Animation: floating turmeric sparkles and slowly spinning pastel parasols.

2. Mehfil After Dark — Sangeet
   1 December 2026 · 7:00 PM onwards
   Dress code: Glamorous festive wear with a touch of sparkle
   Look: night terrace over Lake Pichola, midnight blue/plum/rose-gold, fairy-light canopy, chandelier, dholak and harmonium. Animation: twinkling fairy lights and drifting glitter bokeh.

3. Shubh Milan — Baraat, followed by Varmala & Phere
   2 December 2026 · 9:00 AM onwards
   Dress code: Traditional Indian attire
   Look: golden morning ghat, vermilion/marigold/maroon, miniature-art baraat with horse, elephant and dhol players, marigold mandap with sacred fire. Animation: flickering agni and falling rose petals.

4. The Ivory Gala — Reception
   2 December 2026 · 7:00 PM onwards
   Dress code: Elegant evening formals
   Look: white marble arches, ivory/champagne/soft gold, candle stands, white roses, reflecting pool with floating candles. Animation: flickering candlelight and slow shimmer on water.

Use SVG/CSS illustrations or lightweight optimised WebP images (each under 200 KB). No heavy video backgrounds.

=== SECTION 4: VENUE & TRAVEL ===
- Venue name, address "Ceremony Resort, Shobhagpura, Udaipur", "Open in Google Maps" button, and an embedded map (lazy-loaded).
- Travel tips: nearest airport (Udaipur – Maharana Pratap Airport), railway station, and [PLACEHOLDER: stay / transfer details].

=== SECTION 5: RSVP ===
- Form: Name, phone, number of guests, events attending (multi-select checkboxes for the 4 events), arrival date, dietary preference, message for the couple.
- On submit: gold confetti / marigold petal animation and a thank-you message.
- Store responses in [Supabase / Google Sheets — choose one] and give me a simple admin view or export. If backend is not possible, link to [PLACEHOLDER Google Form URL].
- Also show "RSVP on WhatsApp" button: https://wa.me/[PLACEHOLDER NUMBER]?text=Hi, we'll be attending Sourabh & Priyal's wedding!

=== SECTION 6: CLOSING ===
- Night illustration of Lake Pichola with a decorated boat drifting slowly and sky lanterns rising.
- Our logo, then: "We look forward to celebrating with you" and "आपकी उपस्थिति प्रार्थनीय है".
- "Share this invite" button using the Web Share API with WhatsApp fallback.

=== TECHNICAL REQUIREMENTS ===
- Single page, smooth scroll, lightweight animation (CSS + Framer Motion or GSAP ScrollTrigger). Target Lighthouse mobile performance 85+.
- Open Graph + Twitter meta tags: title "Sourabh & Priyal · 1–2 December 2026 · Udaipur", description "You are invited to our wedding celebrations", and a 1200x630 OG image of our logo on ivory with gold border (generate it) so the WhatsApp link preview looks beautiful.
- Favicon from logo. Accessible contrast, alt text on images, tap targets 44px+.
- Optional: a small EN / हिंदी toggle that switches all headings and labels to Hindi.
- Do not autoplay audio before user interaction.
```
