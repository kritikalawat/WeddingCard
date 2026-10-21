/*
  ============================================================
   WEDDING CARD — DETAILS FILE
  ============================================================
  This is the ONLY file you need to edit to create a new card
  for a different couple. Everything on the website (names,
  dates, events, venue, RSVP links, colors, etc.) is generated
  from the `weddingData` object below.

  HOW TO REUSE FOR SOMEONE ELSE:
   1. Copy this whole project folder.
   2. Edit every field below with the new couple's details.
   3. Put photos/illustrations inside assets/images/ and update
      the matching "image" fields (or leave empty for a
      built-in decorative fallback — no image required).
   4. Open index.html in a browser (or deploy to GitHub Pages).

  TIP: Leaving a value as an empty string "" or empty array []
  will make that section hide itself automatically.
  ============================================================
*/

const weddingData = {
  // ---------------------------------------------------------
  // DEITY / BLESSING IMAGE
  // ---------------------------------------------------------
  // Shown on the envelope landing screen; when the envelope is opened it
  // animates up to the top of the card. Leave "" to hide it everywhere.
  deityImage: "assets/images/ganesh-ji.png",

  // ---------------------------------------------------------
  // COUPLE
  // ---------------------------------------------------------
  couple: {
    groomName: "Kritik",
    brideName: "Deepti",
    groomFather: "Mr. Sanjay Alawat",
    groomMother: "Mrs. Pushpa Ranka",
    brideFather: "Mr. Ashish Mehta",
    brideMother: "Mrs. Renu Mehta",
    // Short line shown above the names on the hero section
    invitationLine:
      "With the blessings of our elders, we joyfully invite you to celebrate the wedding of",
    hashtag: "#KritikDeepti",
    // Optional couple photo / logo, e.g. "assets/images/logo.webp"
    logo: "",
  },

  // ---------------------------------------------------------
  // WEDDING DATES & MAIN VENUE (used for countdown + save-the-date)
  // ---------------------------------------------------------
  wedding: {
    // ISO date-time used by the live countdown timer
    countdownTarget: "2027-01-15T09:00:00",
    // Text shown as the big "save the date" headline
    displayDateRange: "14th & 15th January 2027",
    venueName: "Divine Hills Resort",
    venueAddress: "Sethji Ki Kundal, Udaipur, Rajasthan",
    // Used to build the Google Maps link/embed
    mapQuery: "Divine Hills Resort, Sethji Ki Kundal, Udaipur",
  },

  // ---------------------------------------------------------
  // THEME COLORS (hex) — change these to re-theme the whole site
  // ---------------------------------------------------------
  theme: {
    primary: "#923855", // rosewood maroon (names, headlines)
    secondary: "#5c6b46", // muted sage/olive green (foliage accent)
    gold: "#b9915a", // antique muted gold (borders, eyebrow text)
    cream: "#fffdf8", // near-white background
    ink: "#3a2414", // warm dark brown text
    blush: "#d98fa2", // dusty rose pink (floral accents, petals)
  },

  // ---------------------------------------------------------
  // THE CELEBRATIONS — one entry per event/function.
  // "tag" is the small category badge (e.g. HALDI, SANGEET).
  // "image" is optional; leave "" to use a decorative fallback.
  // ---------------------------------------------------------
  events: [
    {
      tag: "Haldi",
      title: "Rangon Ki Subah",
      date: "15 January 2027",
      time: "11:00 AM",
      dressCode: "Playful pastels and cheerful daytime colours",
      icon: "🌼",
      image: "",
    },
    {
      tag: "Sangeet",
      title: "Mehfil After Dark",
      date: "14 January 2027",
      time: "7:00 PM onwards",
      dressCode: "Glamorous festive wear with a touch of sparkle",
      icon: "🎶",
      image: "",
    },
    {
      tag: "Baraat · Varmala · Phere",
      title: "Shubh Milan",
      date: "15 January 2027",
      time: "2:00 PM onwards",
      dressCode: "Traditional Indian attire",
      icon: "🐘",
      image: "",
    },
    {
      tag: "Reception",
      title: "The Ivory Gala",
      date: "15 January 2027",
      time: "6:30 PM onwards",
      dressCode: "Elegant evening formals",
      icon: "🥂",
      image: "",
    },
  ],

  // ---------------------------------------------------------
  // TRAVEL — leave fields empty to hide that row
  // ---------------------------------------------------------
  travel: {
    nearestAirport:
      "Maharana Pratap Airport (UDR), Dabok — roughly 25 km, about 40 minutes by road.",
    nearestRailway:
      "Udaipur City (UDZ) — roughly 8–10 km, about 25 minutes by road.",
  },

  // ---------------------------------------------------------
  // RSVP
  // ---------------------------------------------------------
  rsvp: {
    // Paste your Google Form's "Send" → link-icon URL here, e.g.
    // "https://docs.google.com/forms/d/e/1FAIpQLS.../viewform"
    // The form will be embedded directly on the page (with a fallback
    // "Open RSVP Form" button that opens it in a new tab).
    googleFormUrl: "",
    // Include country code, digits only, e.g. "919876543210"
    whatsappNumber: "",
    whatsappMessage:
      "Hi, we'll be attending Kritik & Deepti's wedding!",
    contacts: [
      // { name: "Kritik", phone: "+91 90000 00000" },
    ],
  },

  // ---------------------------------------------------------
  // CLOSING / BLESSING
  // ---------------------------------------------------------
  closing: {
    message: "We look forward to celebrating with you",
    footerLine: "Kritik & Deepti · UDAIPUR · 2026",
    shlokSanskrit:
      "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    shlokMeaning:
      "O Lord of the curved trunk and massive body, whose brilliance equals a million suns, please make all my work free of obstacles, always.",
  },
};

// Expose globally so script.js can read it (no build step needed).
window.weddingData = weddingData;
