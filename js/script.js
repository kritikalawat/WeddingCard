/* ==========================================================
   WEDDING CARD — RENDER ENGINE
   Reads everything from `window.weddingData` (wedding-data.js)
   and builds the page. Edit wedding-data.js, not this file,
   to change the content of the card.
   ========================================================== */

(function () {
  const data = window.weddingData;
  if (!data) {
    console.error("wedding-data.js not loaded or weddingData missing.");
    return;
  }

  const $ = (id) => document.getElementById(id);

  // Adds/ensures the "embedded=true" param Google Forms needs to render inline.
  function toEmbeddedFormUrl(url) {
    try {
      const u = new URL(url);
      u.searchParams.set("embedded", "true");
      return u.toString();
    } catch (e) {
      return url;
    }
  }

  // ---------------------------------------------------------
  // THEME
  // ---------------------------------------------------------
  // Converts "#rrggbb" to "r, g, b" for use in rgba()-based shadows/borders.
  function hexToRgbChannels(hex) {
    const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!match) return null;
    return [1, 2, 3].map((i) => parseInt(match[i], 16)).join(", ");
  }

  function applyTheme() {
    const t = data.theme || {};
    const root = document.documentElement.style;
    if (t.primary) {
      root.setProperty("--color-primary", t.primary);
      const rgb = hexToRgbChannels(t.primary);
      if (rgb) root.setProperty("--color-primary-rgb", rgb);
    }
    if (t.secondary) root.setProperty("--color-secondary", t.secondary);
    if (t.gold) {
      root.setProperty("--color-gold", t.gold);
      const rgb = hexToRgbChannels(t.gold);
      if (rgb) root.setProperty("--color-gold-rgb", rgb);
    }
    if (t.cream) root.setProperty("--color-cream", t.cream);
    if (t.ink) root.setProperty("--color-ink", t.ink);
    if (t.blush) {
      root.setProperty("--color-blush", t.blush);
      const rgb = hexToRgbChannels(t.blush);
      if (rgb) root.setProperty("--color-blush-rgb", rgb);
    }
  }

  // ---------------------------------------------------------
  // HERO
  // ---------------------------------------------------------
  function renderHero() {
    const c = data.couple || {};
    $("invitationLine").textContent = c.invitationLine || "";
    $("groomName").textContent = c.groomName || "";
    $("brideName").textContent = c.brideName || "";

    const groomParents = [c.groomFather, c.groomMother].filter(Boolean).join(" & ");
    const brideParents = [c.brideFather, c.brideMother].filter(Boolean).join(" & ");
    $("groomParents").textContent = groomParents ? `s/o ${groomParents}` : "";
    $("brideParents").textContent = brideParents ? `d/o ${brideParents}` : "";

    if (c.logo) {
      const img = $("logoImg");
      img.src = c.logo;
      img.hidden = false;
    }

    document.title = c.groomName && c.brideName
      ? `${c.groomName} & ${c.brideName} — Wedding Invitation`
      : "Wedding Invitation";
  }

  // ---------------------------------------------------------
  // SAVE THE DATE + COUNTDOWN
  // ---------------------------------------------------------
  function renderSaveTheDate() {
    const w = data.wedding || {};
    $("dateRange").textContent = w.displayDateRange || "";
    const venueBits = [w.venueName, w.venueAddress].filter(Boolean).join(", ");
    $("venueLine").textContent = venueBits;

    if (w.countdownTarget) {
      startCountdown(w.countdownTarget);
    } else {
      $("countdown").hidden = true;
    }

    buildIcsLink();
  }

  function startCountdown(targetIso) {
    const target = new Date(targetIso).getTime();
    if (isNaN(target)) {
      $("countdown").hidden = true;
      return;
    }

    function tick() {
      const now = Date.now();
      const diff = target - now;
      if (diff <= 0) {
        $("cdDays").textContent = "00";
        $("cdHours").textContent = "00";
        $("cdMins").textContent = "00";
        $("cdSecs").textContent = "00";
        clearInterval(timer);
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      $("cdDays").textContent = String(days).padStart(2, "0");
      $("cdHours").textContent = String(hours).padStart(2, "0");
      $("cdMins").textContent = String(mins).padStart(2, "0");
      $("cdSecs").textContent = String(secs).padStart(2, "0");
    }

    tick();
    const timer = setInterval(tick, 1000);
  }

  function buildIcsLink() {
    const w = data.wedding || {};
    const c = data.couple || {};
    if (!w.countdownTarget) {
      $("icsLink").hidden = true;
      return;
    }
    const start = new Date(w.countdownTarget);
    const end = new Date(start.getTime() + 2 * 24 * 60 * 60 * 1000); // default 2-day event
    const fmt = (d) =>
      d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const title = `${c.groomName || ""} & ${c.brideName || ""} Wedding`.trim();
    const location = [w.venueName, w.venueAddress].filter(Boolean).join(", ");

    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${fmt(start)}`,
      `DTEND:${fmt(end)}`,
      `SUMMARY:${title}`,
      `LOCATION:${location}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar" });
    $("icsLink").href = URL.createObjectURL(blob);
  }

  // ---------------------------------------------------------
  // EVENTS / CELEBRATIONS
  // ---------------------------------------------------------
  function renderEvents() {
    const events = data.events || [];
    const grid = $("eventsGrid");
    if (!events.length) {
      document.getElementById("celebrations").hidden = true;
      return;
    }

    grid.innerHTML = events
      .map((ev) => {
        const mediaStyle = ev.image
          ? ` style="background-image:url('${ev.image}')"`
          : "";
        const mediaContent = ev.image ? "" : ev.icon || "💍";
        return `
          <article class="event-card reveal">
            <div class="event-media"${mediaStyle}>${mediaContent}</div>
            <div class="event-body">
              <span class="event-tag">${ev.tag || ""}</span>
              <h3 class="event-title">${ev.title || ""}</h3>
              <p class="event-meta"><b>When:</b> ${[ev.date, ev.time].filter(Boolean).join(" · ")}</p>
              ${ev.dressCode ? `<p class="event-meta"><b>Dress Code:</b> ${ev.dressCode}</p>` : ""}
            </div>
          </article>
        `;
      })
      .join("");

    observeReveals(grid.querySelectorAll(".reveal"));
  }

  // ---------------------------------------------------------
  // VENUE & TRAVEL
  // ---------------------------------------------------------
  function renderVenue() {
    const w = data.wedding || {};
    const t = data.travel || {};

    $("venueName").textContent = w.venueName || "";
    $("venueAddress").textContent = w.venueAddress || "";

    const query = encodeURIComponent(w.mapQuery || w.venueAddress || "");
    if (query) {
      $("mapLink").href = `https://www.google.com/maps/search/?api=1&query=${query}`;
      $("mapEmbed").src = `https://www.google.com/maps?q=${query}&output=embed`;
    } else {
      document.querySelector(".map-embed").hidden = true;
      $("mapLink").hidden = true;
    }

    const rows = [];
    if (t.nearestAirport) {
      rows.push(`<div class="travel-row"><b>Nearest Airport</b>${t.nearestAirport}</div>`);
    }
    if (t.nearestRailway) {
      rows.push(`<div class="travel-row"><b>Railway Station</b>${t.nearestRailway}</div>`);
    }
    $("travelInfo").innerHTML = rows.join("");
    if (!rows.length) $("travelInfo").hidden = true;
  }

  // ---------------------------------------------------------
  // CLOSING / RSVP
  // ---------------------------------------------------------
  function renderClosing() {
    const closing = data.closing || {};
    const rsvp = data.rsvp || {};
    const c = data.couple || {};

    $("closingMessage").textContent = closing.message || "";
    $("footerLine").textContent = closing.footerLine || "";
    $("shlokSanskrit").textContent = closing.shlokSanskrit || "";
    $("shlokMeaning").textContent = closing.shlokMeaning || "";

    if (!closing.shlokSanskrit) document.querySelector(".shlok").hidden = true;

    const contactsHtml = (rsvp.contacts || [])
      .map((p) => `<div class="rsvp-contact"><b>${p.name}:</b> ${p.phone}</div>`)
      .join("");
    $("rsvpContacts").innerHTML = contactsHtml;

    if (rsvp.googleFormUrl) {
      $("googleFormIframe").src = toEmbeddedFormUrl(rsvp.googleFormUrl);
      $("googleFormEmbed").hidden = false;
      $("googleFormLink").href = rsvp.googleFormUrl;
      $("googleFormLink").hidden = false;
    }

    if (rsvp.whatsappNumber) {
      const msg = encodeURIComponent(rsvp.whatsappMessage || "");
      $("whatsappLink").href = `https://wa.me/${rsvp.whatsappNumber}?text=${msg}`;
      $("whatsappLink").hidden = false;
    } else if (rsvp.whatsappMessage) {
      // No specific number: generic share link (matches original card behaviour)
      const msg = encodeURIComponent(rsvp.whatsappMessage);
      $("whatsappLink").href = `https://wa.me/?text=${msg}`;
      $("whatsappLink").hidden = false;
    }

    if (!contactsHtml && $("googleFormLink").hidden && $("whatsappLink").hidden) {
      $("rsvpBox").hidden = true;
    }
  }

  // ---------------------------------------------------------
  // SCROLL REVEAL ANIMATIONS
  // ---------------------------------------------------------
  let revealObserver;
  function observeReveals(nodeList) {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
    }
    nodeList.forEach((el) => revealObserver.observe(el));
  }

  // ---------------------------------------------------------
  // DOT NAVIGATION
  // ---------------------------------------------------------
  function buildDotNav() {
    const sections = document.querySelectorAll(".section");
    const nav = $("dotNav");
    nav.innerHTML = Array.from(sections)
      .map((s) => `<a href="#${s.id}" data-target="${s.id}"></a>`)
      .join("");

    const dots = nav.querySelectorAll("a");
    const dotObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const dot = nav.querySelector(`a[data-target="${entry.target.id}"]`);
          if (!dot) return;
          if (entry.isIntersecting) {
            dots.forEach((d) => d.classList.remove("active"));
            dot.classList.add("active");
          }
        });
      },
      { threshold: 0.5 }
    );
    sections.forEach((s) => dotObserver.observe(s));
  }

  // ---------------------------------------------------------
  // ENVELOPE LANDING GATE
  // ---------------------------------------------------------
  function renderDeityImage() {
    const src = data.deityImage;
    const gateImg = $("deityImage");
    const slot = $("deitySlot");
    if (!src) {
      if (gateImg) gateImg.hidden = true;
      if (slot) slot.hidden = true;
      return;
    }
    if (gateImg) gateImg.src = src;
  }

  // Flies the deity image from its spot on the envelope gate up to the
  // hero section, shrinking/growing to match the hero's reserved slot.
  function flyDeityImageToHero() {
    const img = $("deityImage");
    const slot = $("deitySlot");
    if (!img || !slot || img.hidden || slot.hidden || !img.getAttribute("src")) return;

    const startRect = img.getBoundingClientRect();
    document.body.appendChild(img);
    Object.assign(img.style, {
      position: "fixed",
      top: `${startRect.top}px`,
      left: `${startRect.left}px`,
      width: `${startRect.width}px`,
      height: `${startRect.height}px`,
      margin: "0",
      zIndex: "1000",
      transition: "top 0.9s ease, left 0.9s ease, width 0.9s ease, height 0.9s ease",
    });

    requestAnimationFrame(() => {
      const endRect = slot.getBoundingClientRect();
      img.style.top = `${endRect.top}px`;
      img.style.left = `${endRect.left}px`;
      img.style.width = `${endRect.width}px`;
      img.style.height = `${endRect.height}px`;
    });

    img.addEventListener(
      "transitionend",
      () => {
        slot.replaceWith(img);
        img.removeAttribute("style");
      },
      { once: true }
    );
  }

  function initEnvelopeGate() {
    const c = data.couple || {};
    const gate = $("envelopeGate");
    const envelope = $("envelopeBtn");
    if (!gate || !envelope) return;

    const initials = [c.groomName, c.brideName]
      .filter(Boolean)
      .map((n) => n[0])
      .join(" & ");
    $("envelopeMonogram").textContent = initials;
    $("envelopeNames").textContent = [c.groomName, c.brideName].filter(Boolean).join(" & ");

    document.body.classList.add("gate-locked");

    function openEnvelope() {
      if (envelope.classList.contains("is-open")) return;
      envelope.classList.add("is-open");
      flyDeityImageToHero();
      window.setTimeout(() => {
        gate.classList.add("gate-hidden");
        document.body.classList.remove("gate-locked");
      }, 750);
    }

    envelope.addEventListener("click", openEnvelope);
  }

  // ---------------------------------------------------------
  // FLOATING PETALS DECORATION
  // ---------------------------------------------------------
  function buildPetals() {
    const layer = document.querySelector(".petals");
    const glyphs = ["❀", "✿", "🌸", "🪔"];
    const count = 16;
    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.className = "petal";
      span.textContent = glyphs[i % glyphs.length];
      span.style.left = `${Math.random() * 100}%`;
      span.style.animationDuration = `${12 + Math.random() * 10}s`;
      span.style.animationDelay = `${Math.random() * 10}s`;
      span.style.fontSize = `${0.8 + Math.random()}rem`;
      layer.appendChild(span);
    }
  }

  // ---------------------------------------------------------
  // INIT
  // ---------------------------------------------------------
  document.addEventListener("DOMContentLoaded", () => {
    applyTheme();
    renderHero();
    renderDeityImage();
    renderSaveTheDate();
    renderEvents();
    renderVenue();
    renderClosing();
    buildPetals();
    buildDotNav();
    observeReveals(document.querySelectorAll(".reveal"));
    initEnvelopeGate();
  });
})();
