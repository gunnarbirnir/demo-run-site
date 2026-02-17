import { useState, useEffect } from "react";

// ─── Countdown Timer ─────────────────────────────────────────────
function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

// ─── Icons (inline SVGs) ────────────────────────────────────────
function MapPinIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  );
}

function ClockIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function MountainIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 21 7.5-12 4.5 7.5 2.25-3.75L21.75 21H2.25Z" />
    </svg>
  );
}

function RunnerIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
    </svg>
  );
}

// ─── Navigation ──────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#route", label: "Route" },
    { href: "#schedule", label: "Schedule" },
    { href: "#gallery", label: "Gallery" },
    { href: "#register", label: "Register" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-white font-bold text-lg">
            <RunnerIcon className="h-6 w-6 text-sky-400" />
            <span>Hauganes Marathon</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-white/80 hover:text-sky-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-white/80 hover:text-sky-400 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Hero Section ────────────────────────────────────────────────
function Hero() {
  const countdown = useCountdown("2026-06-17T08:00:00");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Eyjafjörður fjord in Iceland"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/50 to-slate-950/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 mb-8 border border-white/20">
          <MapPinIcon className="h-4 w-4 text-sky-400" />
          <span className="text-sm font-medium text-white/90">
            Hauganes, Eyjafjörður, Iceland
          </span>
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-4">
          HAUGANES
          <span className="block text-sky-400">MARATHON</span>
        </h1>

        <p className="text-xl sm:text-2xl text-white/70 font-light mb-4">
          June 17, 2026
        </p>
        <p className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto mb-12">
          Run through one of Iceland's most breathtaking fjords. A 42.195 km
          journey along the shores of Eyjafjörður with towering mountains,
          Arctic coastline, and the midnight sun lighting your way.
        </p>

        {/* Countdown */}
        <div className="flex justify-center gap-4 sm:gap-8 mb-12">
          {[
            { value: countdown.days, label: "Days" },
            { value: countdown.hours, label: "Hours" },
            { value: countdown.minutes, label: "Min" },
            { value: countdown.seconds, label: "Sec" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-3xl sm:text-5xl font-bold text-white tabular-nums bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10 min-w-[70px] sm:min-w-[90px]">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-xs sm:text-sm text-white/50 mt-2 uppercase tracking-widest">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#register"
            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:bg-sky-400 transition-all hover:scale-105"
          >
            Register Now
          </a>
          <a
            href="#route"
            className="inline-flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 text-sm font-semibold text-white hover:bg-white/20 transition-all"
          >
            View Route
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="h-6 w-6 text-white/40" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}

// ─── About Section ───────────────────────────────────────────────
function About() {
  const stats = [
    { value: "42.195", unit: "km", label: "Full Marathon" },
    { value: "~20", unit: "m", label: "Elevation Gain" },
    { value: "500", unit: "+", label: "Runners Expected" },
    { value: "1", unit: "st", label: "Edition" },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 mb-3">
            About the Event
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Where Mountains Meet the Sea
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              The inaugural Hauganes Marathon takes you along the stunning
              coastline of Eyjafjörður, Iceland's longest fjord. Starting and
              finishing in the charming fishing village of Hauganes, this
              flat-and-fast coastal course offers runners an unforgettable
              experience.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Held on June 17th — Icelandic National Day — you'll run under
              the ethereal glow of the midnight sun, with panoramic views of
              snow-capped peaks, calm fjord waters, and the occasional whale
              breaching offshore.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Hauganes is renowned as one of Iceland's best whale-watching
              locations. After your run, relax in natural hot pots overlooking
              the fjord, or join the National Day celebrations in the village.
            </p>
          </div>
          <div className="relative">
            <img
          src="/images/about.jpg"
          alt="Aerial view of Icelandic mountain landscape"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-sky-500 text-white rounded-2xl p-6 shadow-xl">
              <p className="text-3xl font-bold">17</p>
              <p className="text-sm font-medium opacity-90">June 2026</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-slate-50 rounded-2xl p-8 border border-slate-100"
            >
              <div className="text-3xl sm:text-4xl font-bold text-slate-900">
                {stat.value}
                <span className="text-sky-500">{stat.unit}</span>
              </div>
              <p className="text-sm text-slate-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Route Section ───────────────────────────────────────────────
function Route() {
  return (
    <section id="route" className="pt-16 pb-20 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-400 mb-3">
            The Course
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            A Fjordside Journey
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            An out-and-back course along the western shore of Eyjafjörður.
            Flat terrain, ocean breeze, and mountain panoramas the entire way.
          </p>
        </div>
        <div className="flex justify-center">
        <iframe
          height="600"
          style={{ width: '100%', maxWidth: 900 }}
          src={`http://localhost:3000/runs/N4zQOJc8HpKLfxz3KgvS`}
        />
        </div>
      </div>
    </section>
  );
}

// ─── Schedule Section ────────────────────────────────────────────
function Schedule() {
  const events = [
    { time: "June 16", title: "Packet Pickup & Expo", desc: "Hauganes Community Hall — 14:00 to 20:00. Collect your bib, timing chip, and race shirt." },
    { time: "06:30", title: "Race Village Opens", desc: "Bag drop, warm-up area, and last-minute registration at the harbour." },
    { time: "07:45", title: "Opening Ceremony", desc: "Welcome address, safety briefing, and the Icelandic national anthem." },
    { time: "08:00", title: "Marathon Start", desc: "Horn blast at the harbour. Pacers available for 3:00, 3:30, 4:00, 4:30, and 5:00 finish times." },
    { time: "~11:00", title: "First Finishers Expected", desc: "Cheer in the leaders at the harbour finish line." },
    { time: "15:00", title: "Course Closes", desc: "7-hour cutoff. All runners off-course." },
    { time: "16:00", title: "Awards Ceremony", desc: "Prizes for overall, age group, and special categories. Followed by Icelandic National Day celebrations!" },
  ];

  return (
    <section id="schedule" className="py-24 sm:py-32 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 mb-3">
            Race Day
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Schedule
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          {events.map((e, i) => (
            <div
              key={i}
              className="flex gap-6 group"
            >
              {/* Time column */}
              <div className="flex flex-col items-center">
                <div className="flex h-3 w-3 rounded-full bg-sky-500 shrink-0 mt-2 group-hover:scale-125 transition-transform" />
                {i < events.length - 1 && (
                  <div className="w-px flex-1 bg-slate-200" />
                )}
              </div>
              {/* Content */}
              <div className="pb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                  {e.time}
                </span>
                <h3 className="text-lg font-semibold text-slate-900 mt-1">
                  {e.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery Section ─────────────────────────────────────────────
function Gallery() {
  const images = [
    {
      src: "/images/gallery1.jpg",
      alt: "Green valleys in northern Iceland",
      span: "col-span-2 row-span-2",
    },
    {
      src: "/images/gallery2.jpg",
      alt: "Runners in a marathon",
      span: "",
    },
    {
      src: "/images/gallery3.jpg",
      alt: "Runner at sunrise",
      span: "",
    },
    {
      src: "/images/gallery4.jpg",
      alt: "Icelandic fjord landscape",
      span: "col-span-2",
    },
    {
      src: "/images/gallery5.jpg",
      alt: "Coastal Iceland road",
      span: "",
    },
    {
      src: "/images/gallery6.jpg",
      alt: "Marathon finisher celebrating",
      span: "",
    },
  ];

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 mb-3">
            The Experience
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Run Through Paradise
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {images.map((img) => (
            <div
              key={img.alt}
              className={`relative overflow-hidden rounded-2xl group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Registration CTA ────────────────────────────────────────────
function Registration() {
  const tiers = [
    {
      name: "Early Bird",
      price: "15,900 ISK",
      priceNote: "~$115 USD",
      deadline: "Until March 1, 2026",
      features: [
        "Full marathon entry",
        "Race shirt & medal",
        "Chip timing",
        "Aid stations every 5km",
        "Finisher certificate",
      ],
      highlight: true,
    },
    {
      name: "Standard",
      price: "19,900 ISK",
      priceNote: "~$145 USD",
      deadline: "March 2 – June 1, 2026",
      features: [
        "Full marathon entry",
        "Race shirt & medal",
        "Chip timing",
        "Aid stations every 5km",
        "Finisher certificate",
      ],
      highlight: false,
    },
    {
      name: "Late Registration",
      price: "24,900 ISK",
      priceNote: "~$180 USD",
      deadline: "June 2 – June 16, 2026",
      features: [
        "Full marathon entry",
        "Race medal",
        "Chip timing",
        "Aid stations every 5km",
        "Finisher certificate",
      ],
      highlight: false,
    },
  ];

  return (
    <section id="register" className="py-24 sm:py-32 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-400 mb-3">
            Registration
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Secure Your Spot
          </h2>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Limited to 500 runners. Don't miss the chance to be part of the
            inaugural Hauganes Marathon.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-8 border ${
                tier.highlight
                  ? "bg-sky-500/10 border-sky-500/40 ring-1 ring-sky-500/20"
                  : "bg-white/5 border-white/10"
              } relative`}
            >
              {tier.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                  Best Value
                </div>
              )}
              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="text-xs text-white/40 mt-1">{tier.deadline}</p>
              <div className="mt-4 mb-6">
                <span className="text-3xl font-bold">{tier.price}</span>
                <span className="text-sm text-white/40 ml-2">
                  {tier.priceNote}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <svg className="h-4 w-4 text-sky-400 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full rounded-full py-3 text-sm font-semibold transition-all ${
                  tier.highlight
                    ? "bg-sky-500 text-white hover:bg-sky-400 shadow-lg shadow-sky-500/30"
                    : "bg-white/10 text-white border border-white/20 hover:bg-white/20"
                }`}
              >
                Register
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Info / Practical Section ────────────────────────────────────
function Practical() {
  const cards = [
    {
      title: "Getting There",
      desc: "Fly into Akureyri (AEY) — 30 min drive south. Shuttle buses will run from Akureyri on race morning. Driving from Reykjavík takes about 4.5 hours via Route 1.",
    },
    {
      title: "Accommodation",
      desc: "Limited guesthouse rooms in Hauganes — book early! Plenty of hotels and Airbnbs in Dalvík (10 min) and Akureyri (30 min).",
    },
    {
      title: "Weather",
      desc: "Expect 8–14°C in mid-June. Layered clothing recommended. The midnight sun means 24 hours of daylight — no headlamp needed!",
    },
    {
      title: "After the Race",
      desc: "Soak in the Hauganes hot pots, join Icelandic National Day celebrations, or book a whale-watching tour right from the harbour.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 mb-3">
            Plan Your Trip
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Practical Information
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-slate-900 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-950 text-white/50 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
              <RunnerIcon className="h-5 w-5 text-sky-400" />
              Hauganes Marathon
            </div>
            <p className="text-sm">
              The first-ever marathon along the shores of Eyjafjörður, Iceland.
              June 17, 2026.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-sky-400 transition-colors">About</a></li>
              <li><a href="#route" className="hover:text-sky-400 transition-colors">Route</a></li>
              <li><a href="#schedule" className="hover:text-sky-400 transition-colors">Schedule</a></li>
              <li><a href="#register" className="hover:text-sky-400 transition-colors">Register</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>info@hauganesmarathon.is</li>
              <li>Hauganes, 621</li>
              <li>Eyjafjörður, Iceland</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-8 text-center text-xs">
          <p>&copy; 2026 Hauganes Marathon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────
function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Route />
      <Schedule />
      <Gallery />
      <Registration />
      <Practical />
      <Footer />
    </div>
  );
}

export default App;
