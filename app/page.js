// app/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Share2,
  QrCode,
  Palette,
  ShieldCheck,
  Zap,
  Layers,
  ChevronDown,
  Globe,
  ExternalLink,
  Users,
  Compass
} from "lucide-react";
import PhonePreview from "./components/PhonePreview";
import { THEMES } from "./lib/ThemeConfig";

export default function Home() {
  const router = useRouter();
  const [handleText, setHandleText] = useState("");
  const [activeHeroTheme, setActiveHeroTheme] = useState("cyber-dark");
  const [faqOpenIndex, setFaqOpenIndex] = useState(0);

  const handleClaim = (e) => {
    if (e) e.preventDefault();
    const clean = handleText.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
    if (clean) {
      router.push(`/generate?handle=${encodeURIComponent(clean)}`);
    } else {
      router.push("/generate");
    }
  };

  // Demo data for hero phone sandbox
  const heroDemoProfile = {
    handle: handleText.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "") || "alexa.design",
    displayName: "Alexa Rivera ✨",
    bio: "Product Designer & Creative Technologist. Building the future of spatial web & AI interfaces 🚀",
    pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    theme: activeHeroTheme,
    socials: {
      instagram: "https://instagram.com",
      twitter: "https://x.com",
      youtube: "https://youtube.com",
      github: "https://github.com",
      spotify: "https://spotify.com",
    },
    links: [
      { linktext: "Latest Design Case Studies (2026)", link: "https://dribbble.com", platform: "globe" },
      { linktext: "Watch My UI/UX Masterclass on YouTube", link: "https://youtube.com", platform: "youtube" },
      { linktext: "Download Free Glassmorphism UI Kit", link: "https://github.com", platform: "github" },
      { linktext: "Listen to My Creative Focus Playlist", link: "https://spotify.com", platform: "spotify" },
    ],
  };

  const showcaseProfiles = [
    {
      handle: "harry",
      name: "Code With Harry",
      category: "Developer & Educator",
      bio: "Web Development, Tutorials & Developer Tools 💻",
      theme: "cyber-dark",
      pic: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      linksCount: 4,
    },
    {
      handle: "sarah",
      name: "Sarah Chen",
      category: "UI/UX & 3D Artist",
      bio: "Futuristic interface concepts & interactive design 🎨",
      theme: "sunset-luxe",
      pic: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      linksCount: 3,
    },
    {
      handle: "alex",
      name: "Alex Rivers",
      category: "Music Producer",
      bio: "New EP 'Midnight Neon' streaming on all platforms 🎧",
      theme: "neon-glow",
      pic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      linksCount: 3,
    },
  ];

  const featuresList = [
    {
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      title: "8 Curated Dynamic Themes",
      desc: "From sleek Cyber Dark to Sunset Luxe, switch themes with one click and create a look that matches your personal brand.",
      color: "from-pink-500/20 to-purple-500/10",
      border: "border-pink-500/20",
    },
    {
      icon: <Zap className="w-6 h-6 text-cyan-400" />,
      title: "Split-Screen Live Studio",
      desc: "Watch your mobile page update live in real-time as you add links, customize bios, and tweak theme palettes.",
      color: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/20",
    },
    {
      icon: <QrCode className="w-6 h-6 text-emerald-400" />,
      title: "Instant QR Code & Sharing",
      desc: "Generate sharp, scan-ready vector QR codes and share across WhatsApp, Twitter, LinkedIn, or native device share sheets.",
      color: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/20",
    },
    {
      icon: <Layers className="w-6 h-6 text-amber-400" />,
      title: "Smart Social Icon Detection",
      desc: "Paste any link (YouTube, Spotify, GitHub, Instagram, TikTok) and BitTree automatically detects and displays the platform brand badge.",
      color: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/20",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-400" />,
      title: "Instant Handle Validation",
      desc: "Real-time handle availability checks ensure you claim the cleanest username for your brand in seconds.",
      color: "from-indigo-500/20 to-violet-500/10",
      border: "border-indigo-500/20",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      title: "Rich Glassmorphism Aesthetics",
      desc: "Built with smooth backdrop blurs, glow lighting, subtle hover physics, and celebratory confetti effects upon publishing.",
      color: "from-purple-500/20 to-pink-500/10",
      border: "border-purple-500/20",
    },
  ];

  const faqs = [
    {
      q: "What is BitTree and how does it work?",
      a: "BitTree is a next-generation link-in-bio platform that lets you combine all your websites, social media channels, stores, playlists, and portfolios into a single, beautifully designed link to put in your bio on Instagram, TikTok, Twitter, YouTube, and more.",
    },
    {
      q: "Can I customize the themes and background styles?",
      a: "Yes! BitTree includes 8 handcrafted themes ranging from dark cyber glass to vibrant retro aesthetics. You can switch between themes anytime with instant live preview.",
    },
    {
      q: "How does the QR Code sharing work?",
      a: "Every BitTree profile automatically generates a dedicated vector QR code that anyone can scan with their phone camera to instantly land on your bio link.",
    },
    {
      q: "Is BitTree free to use?",
      a: "Yes! You can claim your custom handle, add unlimited links, connect all your social channels, and customize your theme 100% free.",
    },
    {
      q: "How fast is BitTree and does it work on mobile?",
      a: "BitTree is built on Next.js with responsive design, optimized typography, and glassmorphism styling that looks incredible on iPhones, Androids, tablets, and desktop displays.",
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#090d16] text-slate-100 overflow-hidden">
      {/* Background Ambience Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow"></div>
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none -z-10"></div>

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Claim Handle Input */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md">
              <Sparkles size={14} className="text-cyan-400" />
              <span>Next-Gen Link in Bio for Creators & Builders</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
              One Link. <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 bg-clip-text text-transparent">
                Infinite Possibilities.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Connect your audience to everything you create, curate, and share. Showcase your social channels, projects, videos, and music with stunning glassmorphism aesthetics.
            </p>

            {/* Interactive Handle Claim Form */}
            <form
              onSubmit={handleClaim}
              className="w-full max-w-lg p-2 rounded-2xl bg-slate-900/90 border border-white/15 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row gap-2 mt-2 group focus-within:border-cyan-400/80 focus-within:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all"
            >
              <div className="flex items-center flex-1 px-3 py-2 bg-slate-950/70 rounded-xl border border-slate-800">
                <span className="text-xs sm:text-sm font-mono text-cyan-400 font-semibold select-none">
                  bittr.ee/
                </span>
                <input
                  type="text"
                  value={handleText}
                  onChange={(e) => setHandleText(e.target.value)}
                  placeholder="yourname"
                  className="w-full bg-transparent px-1.5 py-1 text-sm sm:text-base font-mono text-white placeholder-slate-500 focus:outline-none"
                  aria-label="Claim your handle"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all transform hover:scale-102 active:scale-98 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <span>Claim BitTree</span>
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Social Proof Stats */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                <span>Zero Ads or Clutter</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-cyan-400" />
                <span>Live QR Code Included</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Phone Mockup with Interactive Theme Switcher */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Phone Frame */}
            <div className="relative animate-float">
              {/* Glowing ring behind phone */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-pink-500/30 rounded-[56px] blur-2xl -z-10 opacity-70"></div>
              
              <PhonePreview
                handle={heroDemoProfile.handle}
                displayName={heroDemoProfile.displayName}
                bio={heroDemoProfile.bio}
                pic={heroDemoProfile.pic}
                theme={activeHeroTheme}
                links={heroDemoProfile.links}
                socials={heroDemoProfile.socials}
              />
            </div>

            {/* Interactive Theme Switcher Sandbox Bar under Hero Phone */}
            <div className="mt-8 w-full max-w-md p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-2.5 px-1">
                <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Palette size={14} className="text-cyan-400" />
                  Try live theme switcher:
                </span>
                <span className="text-[11px] font-mono text-cyan-400 font-bold">
                  {THEMES[activeHeroTheme]?.name}
                </span>
              </div>

              {/* Theme Mini Swatches */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {Object.values(THEMES).map((th) => (
                  <button
                    key={th.id}
                    onClick={() => setActiveHeroTheme(th.id)}
                    title={th.name}
                    style={{ background: th.previewBg }}
                    className={`h-8 rounded-xl border-2 transition-all transform hover:scale-110 relative ${
                      activeHeroTheme === th.id
                        ? "border-cyan-400 scale-105 shadow-[0_0_12px_rgba(6,182,212,0.6)]"
                        : "border-slate-700 opacity-70 hover:opacity-100"
                    }`}
                  >
                    {activeHeroTheme === th.id && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <CheckCircle2 size={12} className="text-white drop-shadow" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            Engineered For Creators
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Everything You Need to Stand Out
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Stop losing followers across scattered links. Centralize your presence with an aesthetic bio link engineered for high conversions.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((feat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl bg-slate-900/60 border ${feat.border} hover:bg-slate-900/90 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group relative overflow-hidden`}
            >
              {/* Ambient gradient corner */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${feat.color} rounded-bl-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`}
              ></div>

              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 w-fit mb-4 group-hover:scale-110 transition-transform">
                {feat.icon}
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= THEMES SHOWCASE SECTION ================= */}
      <section id="themes" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
            Aesthetic Customization
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            8 Curated Visual Themes
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Choose from a spectrum of vibrant, dark, glassmorphic, and pastel themes crafted by professional designers.
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {Object.values(THEMES).map((th) => (
            <div
              key={th.id}
              onClick={() => {
                setActiveHeroTheme(th.id);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/60 transition-all group cursor-pointer hover:scale-103"
            >
              {/* Visual preview swatch box */}
              <div
                className="h-28 rounded-xl mb-3 flex flex-col justify-end p-3 border border-white/10 shadow-inner"
                style={{ background: th.previewBg }}
              >
                <div className="w-full h-3 rounded bg-white/20 mb-1.5 backdrop-blur-sm"></div>
                <div className="w-3/4 h-3 rounded bg-white/30 backdrop-blur-sm"></div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {th.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">{th.category}</span>
                </div>
                <span className="text-xs text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Preview
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CREATOR SHOWCASE ================= */}
      <section id="showcase" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-2">
              Featured Profiles
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Explore Live Creator Trees
            </h2>
          </div>
          <Link
            href="/generate"
            className="text-xs sm:text-sm font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
          >
            Create your own tree <ArrowRight size={14} />
          </Link>
        </div>

        {/* Creator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {showcaseProfiles.map((creator, idx) => (
            <Link
              key={idx}
              href={`/${creator.handle}`}
              className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-400/80 shadow-md">
                    <img
                      src={creator.pic}
                      alt={creator.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors flex items-center gap-1">
                      {creator.name}
                      <CheckCircle2 size={14} className="text-cyan-400 fill-cyan-400/20" />
                    </h3>
                    <span className="text-xs font-mono text-cyan-400">@{creator.handle}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {creator.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono bg-slate-800 px-2.5 py-1 rounded-lg">
                  {creator.linksCount} active links
                </span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  View Tree <ExternalLink size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FAQ ACCORDION ================= */}
      <section id="faq" className="py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = faqOpenIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/80 border border-slate-800/90 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setFaqOpenIndex(isOpen ? -1 : index)}
                  className="w-full p-5 flex items-center justify-between text-left text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? "rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FINAL CALL TO ACTION ================= */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="relative rounded-[36px] bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border border-cyan-500/30 p-8 sm:p-14 text-center overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)]">
          {/* Ambient lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Ready to claim your official{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-pink-400">
                BitTree?
              </span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
              Join thousands of creators who share their world through one memorable link. Set up your page in less than 60 seconds.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/generate"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Sparkles size={16} />
                <span>Create Your BitTree Now</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
