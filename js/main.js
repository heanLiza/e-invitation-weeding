/* Wedding invitation — behaviour. Content lives in data.js (W = settings, T = texts). */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

const KHMER_DIGITS = "០១២៣៤៥៦៧៨៩";
let lang = "kh";

const num = (n) => (lang === "kh" ? String(n).replace(/\d/g, (d) => KHMER_DIGITS[d]) : String(n));
const photoUrl = (i) => (W.photos[i] ? `url('${W.photos[i]}')` : "none");

/* ---------- Rendering & language ---------- */

function setBackgrounds() {
  const portrait = matchMedia("(orientation:portrait)").matches;
  $("#cvbg").style.backgroundImage = photoUrl(portrait ? W.idx.coverP : W.idx.cover);
  const introBg = $("#ebg"); // removed from the page once the invitation is opened
  if (introBg) introBg.style.backgroundImage = photoUrl(W.idx.couple);
  $("#cbg").style.backgroundImage = photoUrl(W.idx.candle);
  $("#arch").style.backgroundImage = photoUrl(W.idx.arch);
  $("#frame").style.backgroundImage = photoUrl(W.idx.couple);
  const wb = $("#wbg");
  if (wb) wb.style.backgroundImage = photoUrl(W.idx.coverP);
}

function renderProgramme() {
  $("#rows").innerHTML = W.prog
    .map((r) => `<div class="row"><b>${lang === "kh" ? r.kh : r.en}</b><span>:</span><span>${T[lang][r.k]}</span></div>`)
    .join("");
}

function render() {
  document.documentElement.lang = lang === "kh" ? "km" : "en";
  $$("[data-t]").forEach((el) => (el.textContent = T[lang][el.dataset.t]));
  renderProgramme();
  setBackgrounds();
  tickCountdown();
  renderStory();
  observeReveals();
}

$("#lg").onclick = () => {
  lang = lang === "kh" ? "en" : "kh";
  render();
};
addEventListener("resize", setBackgrounds);

/* ---------- Countdown ---------- */

const weddingDate = new Date(W.date);

function tickCountdown() {
  const s = Math.max(0, ((weddingDate - Date.now()) / 1000) | 0);
  const values = [(s / 86400) | 0, ((s % 86400) / 3600) | 0, ((s % 3600) / 60) | 0, s % 60];
  $("#cdw").innerHTML = values
    .map((v, i) => `<div><b>${num(String(v).padStart(2, "0"))}</b><small>${T[lang].d[i]}</small></div>`)
    .join("");
}
setInterval(tickCountdown, 1000);

/* ---------- Scroll reveal ---------- */

const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        revealObserver.unobserve(e.target);
      }
    }),
  { threshold: 0.12 }
);

function observeReveals() {
  $$(".rv:not(.on)").forEach((el) => revealObserver.observe(el));
}

/* ---------- Photo grid + lightbox ---------- */

const photoCount = W.photos.length;
const gallery = $("#gal");
const lightbox = $("#lb");
let current = 0;

gallery.innerHTML = W.photos
  .map((src, i) => `<img src="${src}" alt="" data-i="${i}" decoding="async" onerror="this.remove()">`)
  .join("");

function showPhoto(i) {
  current = (i + photoCount) % photoCount;
  $("#lbi").style.cssText = `background-image:${photoUrl(current)};background-size:contain;background-repeat:no-repeat;background-color:transparent`;
}

gallery.onclick = (e) => {
  const tile = e.target.closest("img");
  if (!tile) return;
  showPhoto(+tile.dataset.i);
  lightbox.classList.add("on");
};
lightbox.querySelector(".x").onclick = () => lightbox.classList.remove("on");
lightbox.querySelector(".p").onclick = () => showPhoto(current - 1);
lightbox.querySelector(".n").onclick = () => showPhoto(current + 1);

let touchStartX = 0;
lightbox.ontouchstart = (e) => (touchStartX = e.touches[0].clientX);
lightbox.ontouchend = (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) showPhoto(current + (dx < 0 ? 1 : -1));
};

addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("on")) return;
  if (e.key === "Escape") lightbox.classList.remove("on");
  if (e.key === "ArrowRight") showPhoto(current + 1);
  if (e.key === "ArrowLeft") showPhoto(current - 1);
});

/* ---------- Scroll progress rail ---------- */

let scrollTicking = false;

function onScroll() {
  scrollTicking = false;
  const pageProgress = scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
  $("#rd").style.top = `calc(${Math.min(1, pageProgress) * 100}% - 5px)`;
}
addEventListener(
  "scroll",
  () => {
    if (!scrollTicking) scrollTicking = requestAnimationFrame(onScroll);
  },
  { passive: true }
);

/* ---------- Story: scroll down -> photos slide sideways (pinned, no scrollbar) ---------- */

let storyDist = 0;

function renderStory() {
  const track = $("#storyTrack");
  if (!track || !W.slides) return;
  const caps = (W.captions && W.captions[lang]) || [];
  const END = { kh: ["ហើយដំណើរនៃស្នេហ៍", "នឹងបន្តរៀងរហូត"], en: ["And our journey of love", "goes on forever"] };
  const t = { ...T[lang], storyEndK: T[lang].storyEndK || END[lang][0], storyEndH: T[lang].storyEndH || END[lang][1] };
  track.innerHTML =
    `<div class="st-title"><small class="h sm">${t.storyk}</small><h2 class="h foil">${t.storyh}</h2></div>` +
    W.slides
      .map(
        (p, i) => `<figure class="st-card"><div class="st-img"><img src="${W.photos[p] || W.photos[0]}" alt="" decoding="async" onerror="this.closest('.st-card').remove();measureStory()"></div>
        <figcaption><b>${num(String(i + 1).padStart(2, "0"))}</b><span>${caps[i] || ""}</span></figcaption></figure>`
      )
      .join("");
  track.querySelectorAll("img").forEach((img) => img.addEventListener("load", measureStory));
  measureStory();
}

function measureStory() {
  const section = $("#story"), track = $("#storyTrack");
  if (!section || !track) return;
  storyDist = Math.max(0, track.scrollWidth - innerWidth);
  section.style.height = `${storyDist + innerHeight}px`; // vertical scroll length = horizontal distance
  onStoryScroll();
}

function onStoryScroll() {
  const section = $("#story"), track = $("#storyTrack");
  if (!section || !track) return;
  const pin = section.querySelector(".st-pin");
  const range = Math.max(1, section.offsetHeight - innerHeight);
  const top = section.getBoundingClientRect().top;
  const p = Math.min(1, Math.max(0, -top / range));
  if (top > 0) pin.style.cssText = "position:absolute;top:0";
  else if (-top >= range) pin.style.cssText = "position:absolute;top:auto;bottom:0";
  else pin.style.cssText = "position:fixed;top:0";
  track.style.transform = `translate3d(${-p * storyDist}px,0,0)`;
}

addEventListener("scroll", onStoryScroll, { passive: true });
addEventListener("resize", measureStory);
addEventListener("load", measureStory);

/* ---------- Cover fireflies ---------- */

const cover = $("#cover");
const fireflyCanvas = $("#ff");
const fireflyCtx = fireflyCanvas.getContext("2d");
let fireflies = [];
let fireflyVisible = true;

function sizeFireflies() {
  fireflyCanvas.width = cover.clientWidth;
  fireflyCanvas.height = cover.clientHeight;
  fireflies = Array.from({ length: 40 }, () => ({
    x: Math.random() * fireflyCanvas.width,
    y: Math.random() * fireflyCanvas.height,
    r: Math.random() * 2.4 + 0.8,
    speed: Math.random() * 0.35 + 0.1,
    phase: Math.random() * 6,
  }));
}

function animateFireflies() {
  if (!fireflyVisible) return;
  const { width, height } = fireflyCanvas;
  fireflyCtx.clearRect(0, 0, width, height);
  fireflies.forEach((f) => {
    f.y -= f.speed;
    f.phase += 0.02;
    if (f.y < -10) {
      f.y = height + 10;
      f.x = Math.random() * width;
    }
    const alpha = 0.35 + 0.35 * Math.sin(f.phase);
    const glow = fireflyCtx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 6);
    glow.addColorStop(0, `rgba(255,214,120,${alpha})`);
    glow.addColorStop(1, "rgba(255,214,120,0)");
    fireflyCtx.fillStyle = glow;
    fireflyCtx.beginPath();
    fireflyCtx.arc(f.x, f.y, f.r * 6, 0, 7);
    fireflyCtx.fill();
  });
  requestAnimationFrame(animateFireflies);
}

new ResizeObserver(sizeFireflies).observe(cover);
sizeFireflies();
new IntersectionObserver((entries) => {
  fireflyVisible = entries[0].isIntersecting;
  if (fireflyVisible) animateFireflies();
}).observe(cover);

/* ---------- Candle water: ripples + floating lotus ---------- */

const candleSection = $("#cl");
const rippleCanvas = $("#cv");
const rippleCtx = rippleCanvas.getContext("2d");
const LOTUS_SVG =
  '<svg viewBox="0 0 40 40"><g fill="#f6eedd" stroke="#d9b15a"><path d="M20 6c5 6 5 14 0 20-5-6-5-14 0-20z"/><path d="M20 26C10 24 5 18 4 12c8 0 14 4 16 14zM20 26c10-2 15-8 16-14-8 0-14 4-16 14z"/></g><circle cx="20" cy="30" r="4" fill="#ffb84d"/></svg>';
let ripples = [];
let candleVisible = false;
let lastLotus = 0;

function sizeRippleCanvas() {
  rippleCanvas.width = candleSection.clientWidth;
  rippleCanvas.height = candleSection.clientHeight;
}

function addRipple(e) {
  const box = candleSection.getBoundingClientRect();
  const x = e.clientX - box.left;
  const y = e.clientY - box.top;
  ripples.push({ x, y, r: 0 });

  if (Date.now() - lastLotus < 500) return;
  lastLotus = Date.now();
  const lotus = document.createElement("div");
  lotus.className = "lot";
  lotus.style.cssText = `left:${x - 17}px;top:${y - 17}px`;
  lotus.innerHTML = LOTUS_SVG;
  candleSection.appendChild(lotus);
  setTimeout(() => lotus.remove(), 6000);
}

function animateRipples() {
  if (!candleVisible) return;
  rippleCtx.clearRect(0, 0, rippleCanvas.width, rippleCanvas.height);
  ripples = ripples.filter((o) => o.r < 160);
  ripples.forEach((o) => {
    o.r += 2.2;
    [0, 18, 36].forEach((offset) => {
      if (o.r <= offset) return;
      rippleCtx.beginPath();
      rippleCtx.arc(o.x, o.y, o.r - offset, 0, 7);
      rippleCtx.strokeStyle = `rgba(231,196,107,${Math.max(0, 0.6 - o.r / 260)})`;
      rippleCtx.lineWidth = 1.5;
      rippleCtx.stroke();
    });
  });
  requestAnimationFrame(animateRipples);
}

new ResizeObserver(sizeRippleCanvas).observe(candleSection);
sizeRippleCanvas();
new IntersectionObserver((entries) => {
  candleVisible = entries[0].isIntersecting;
  if (candleVisible) animateRipples();
}).observe(candleSection);
// Touch must never block page scroll: on phones only a TAP makes a ripple (no drag handling).
let lastPointerType = "mouse";
candleSection.addEventListener("pointerdown", (e) => {
  lastPointerType = e.pointerType;
  if (e.pointerType !== "touch") addRipple(e);
});
candleSection.addEventListener("pointermove", (e) => {
  if (e.pointerType === "mouse" && e.buttons) addRipple(e);
});
candleSection.addEventListener("click", (e) => {
  if (lastPointerType === "touch") addRipple(e);
});

/* ---------- Intro: double doors -> site ---------- */

/* ---------- Intro: double doors -> site ---------- */

const audio = $("#au");
const musicBtn = $("#mu");

if (W.music) audio.src = W.music;
else musicBtn.style.display = "none";

musicBtn.onclick = function (e) {
  e.stopPropagation(); // ការពារកុំឱ្យចុចប៊ូតុងភ្លេងហើយចោទជាការបើកសំបុត្រ
  if (audio.paused) {
    audio.play();
    this.classList.remove("off");
  } else {
    audio.pause();
    this.classList.add("off");
  }
};

// មុខងារសម្រាប់បើកសំបុត្រ
function openEnvelope() {
  const env = $("#env");
  const book = $("#book");
  
  if (!book || book.classList.contains("open")) return;
  
  book.classList.add("open");
  if (W.music) audio.play().catch(() => {});
  
  setTimeout(() => env.classList.add("out"), 2300);
  setTimeout(() => {
    $("#bar").classList.add("on");
    $("#fab").classList.add("on");
    env.remove();
  }, 3800);
}

// ចុចត្រង់ណាក៏បាននៅលើផ្ទាំង Intro (#env) គឺបើកសំបុត្រទាំងអស់
$("#env").onclick = openEnvelope;

/* ---------- Welcome screen (guest name) -> opens the invitation ---------- */

const welcome = $("#welcome");
if (welcome) {
  $("#wbtn").onclick = () => {
    welcome.classList.add("out");
    openEnvelope(); // also starts the music (needs this tap)
    setTimeout(() => welcome.remove(), 900);
  };
}
/* ---------- Venue map, calendar file, QR codes ---------- */

$("#map").src = `https://maps.google.com/maps?q=${W.lat},${W.lng}&output=embed`;
$("#gm").href = `https://maps.google.com/?q=${W.lat},${W.lng}`;

$("#ics").onclick = () => {
  const start = new Date(W.date);
  const end = new Date(+start + 9e6); // +2.5 hours
  const fmt = (d) => d.toISOString().replace(/[-:]|\.\d+/g, "");
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    "SUMMARY:Wedding Meng & Leakhena",
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `GEO:${W.lat};${W.lng}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  link.download = "wedding.ics";
  link.click();
};

[
  ["q1", "d1", "aba"],
  ["q2", "d2", "khqr"],
].forEach(([box, button, key]) => {
  if (W.qr[key]) {
    $("#" + box).style.cssText = `background:#fff url(${W.qr[key]}) center/contain no-repeat`;
    $("#" + button).href = W.qr[key];
  } else {
    $("#" + button).removeAttribute("href");
  }
});

/* ---------- Share buttons ---------- */

const pageUrl = encodeURIComponent(location.href);

$("#s-cp").onclick = (e) =>
  navigator.clipboard?.writeText(location.href).then(() => {
    e.currentTarget.querySelector("span").textContent = "✓";
  });

/* ---------- Personal guest name: ?to=Name ---------- */

const urlParams = new URLSearchParams(location.search);
let guestName = (urlParams.get("to") || "").trim();
if (!guestName && urlParams.get("g") && W.guests) guestName = W.guests[+urlParams.get("g") - 1] || ""; // short link ?g=1..29
guestName = guestName.slice(0, 60);
if (guestName) {
  $$(".guestbox").forEach((box) => {
    box.querySelector("span").textContent = guestName; // textContent = safe, no HTML injection
    box.hidden = false;
    box.closest(".guestwrap")?.removeAttribute("hidden");
  });
}

/* ---------- Start ---------- */

render();
onScroll();