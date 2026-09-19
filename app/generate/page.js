// app/generate/page.js
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Loader2,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  ArrowRight,
  Palette,
  Link as LinkIcon,
  User,
  Share2,
  Image as ImageIcon,
  Flame,
  Globe
} from "lucide-react";
import PhonePreview from "@/app/components/PhonePreview";
import QRCodeModal from "@/app/components/QRCodeModal";
import SocialIcon, { getPlatformFromUrl } from "@/app/components/SocialIcon";
import { THEMES } from "@/app/lib/ThemeConfig";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

function StudioBuilder() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialHandle = searchParams.get("handle") || "";

  const [handle, setHandle] = useState(initialHandle.toLowerCase().replace(/[^a-z0-9_-]/g, ""));
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("Welcome to my links! Tap below to explore my latest content & projects 🚀");
  const [pic, setPic] = useState(DEFAULT_AVATAR);
  const [selectedTheme, setSelectedTheme] = useState("cyber-dark");

  const [socials, setSocials] = useState({
    instagram: "",
    twitter: "",
    youtube: "",
    github: "",
    linkedin: "",
    spotify: "",
    tiktok: "",
    mail: "",
  });

  const [links, setLinks] = useState([
    { linktext: "My Portfolio Website", link: "https://mywebsite.com", platform: "globe" },
    { linktext: "Subscribe on YouTube", link: "https://youtube.com", platform: "youtube" },
    { linktext: "Latest Project Repository", link: "https://github.com", platform: "github" },
  ]);

  // Handle Availability State
  const [isCheckingHandle, setIsCheckingHandle] = useState(false);
  const [handleStatus, setHandleStatus] = useState(null); // { available: boolean, message: string }

  // Generation & Success States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdData, setCreatedData] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  // Sync initial handle
  useEffect(() => {
    if (initialHandle) {
      const clean = initialHandle.toLowerCase().replace(/[^a-z0-9_-]/g, "");
      setHandle(clean);
      setDisplayName(clean.charAt(0).toUpperCase() + clean.slice(1));
    }
  }, [initialHandle]);

  // Debounced handle availability check
  useEffect(() => {
    if (!handle || handle.trim().length < 2) {
      setHandleStatus(null);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingHandle(true);
      try {
        const res = await fetch(`/api/check-handle?handle=${encodeURIComponent(handle)}`);
        const data = await res.json();
        setHandleStatus({
          available: data.available,
          message: data.message,
        });
      } catch (e) {
        setHandleStatus({ available: true, message: "Handle ready" });
      } finally {
        setIsCheckingHandle(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [handle]);

  // Link Handlers
  const handleLinkChange = (index, field, value) => {
    const updated = [...links];
    updated[index][field] = value;
    if (field === "link") {
      updated[index].platform = getPlatformFromUrl(value, updated[index].linktext);
    } else if (field === "linktext" && (!updated[index].link || updated[index].platform === "globe")) {
      updated[index].platform = getPlatformFromUrl(updated[index].link, value);
    }
    setLinks(updated);
  };

  const addLink = () => {
    setLinks([...links, { linktext: "", link: "", platform: "globe" }]);
  };

  const removeLink = (index) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index));
    } else {
      setLinks([{ linktext: "", link: "", platform: "globe" }]);
    }
  };

  // Social Handler
  const handleSocialChange = (platform, value) => {
    setSocials({ ...socials, [platform]: value });
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    if (!handle || handle.trim().length < 2) {
      alert("Please enter a valid handle (at least 2 characters).");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        handle: handle.trim().toLowerCase(),
        displayName: displayName.trim() || handle,
        bio: bio.trim(),
        pic: pic.trim(),
        theme: selectedTheme,
        socials: socials,
        links: links.filter((l) => l.linktext?.trim() || l.link?.trim()),
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        setCreatedData(result.data || payload);
        setShowSuccessModal(true);

        // Confetti celebration
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#06b6d4", "#3b82f6", "#ec4899", "#8b5cf6", "#f59e0b"],
          });
        } catch (err) {}
      } else {
        alert(result.message || "Failed to create BitTree");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fullGeneratedUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${handle}`
      : `https://bittr.ee/${handle}`;

  const copyGeneratedLink = async () => {
    try {
      await navigator.clipboard.writeText(fullGeneratedUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 pt-24 pb-20 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Studio Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles size={13} />
              BitTree Studio
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Design & Publish Your Bio Link
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !handle || handle.trim().length < 2}
              className="px-6 py-3 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 hover:from-cyan-300 hover:to-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all transform hover:scale-102 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Publish BitTree</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Split-Screen Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ================= LEFT COLUMN: STEP BY STEP BUILDER ================= */}
          <div className="lg:col-span-7 space-y-8">
            {/* STEP 1: Handle & Profile Identity */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5 backdrop-blur-md">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <User size={18} />
                </div>
                <div>
                  <h2 className="font-bold text-base text-white">1. Identity & Handle</h2>
                  <p className="text-xs text-slate-400">Claim your username and profile bio</p>
                </div>
              </div>

              {/* Handle Input with Live Validation Badge */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Handle (Username)
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-xs font-mono text-cyan-400 font-bold select-none">
                    bittr.ee/
                  </span>
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))}
                    placeholder="yourhandle"
                    className="w-full pl-20 pr-24 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 text-sm font-mono text-white transition-all placeholder-slate-600"
                  />
                  <div className="absolute right-3 flex items-center">
                    {isCheckingHandle ? (
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Loader2 size={13} className="animate-spin text-cyan-400" />
                        Checking
                      </span>
                    ) : handleStatus ? (
                      handleStatus.available ? (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
                          <CheckCircle2 size={12} /> Available
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-950/50 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">
                          <Flame size={12} /> Existing (Update)
                        </span>
                      )
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Gautam Sharma ✨"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 text-sm text-white transition-all placeholder-slate-600"
                />
              </div>

              {/* Bio */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Short Bio / Description
                  </label>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {bio.length}/150
                  </span>
                </div>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value.slice(0, 150))}
                  rows={2}
                  placeholder="Write a brief tagline about who you are..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 text-xs sm:text-sm text-white resize-none transition-all placeholder-slate-600"
                />
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Profile Picture URL
                </label>
                <input
                  type="url"
                  value={pic}
                  onChange={(e) => setPic(e.target.value)}
                  placeholder="https://... image URL"
                  className="w-full px-4 py-2.5 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 text-xs sm:text-sm text-white transition-all placeholder-slate-600"
                />
              </div>
            </div>

            {/* STEP 2: Theme Selector */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Palette size={18} />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-white">2. Visual Theme</h2>
                    <p className="text-xs text-slate-400">Select your glassmorphism color palette</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-purple-300 font-bold bg-purple-950/60 border border-purple-500/30 px-2.5 py-1 rounded-full">
                  {THEMES[selectedTheme]?.name}
                </span>
              </div>

              {/* Themes Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.values(THEMES).map((th) => (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => setSelectedTheme(th.id)}
                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 ${
                      selectedTheme === th.id
                        ? "border-cyan-400 bg-slate-800/90 shadow-[0_0_18px_rgba(6,182,212,0.35)] scale-102"
                        : "border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-900/60"
                    }`}
                  >
                    <div
                      className="w-full h-12 rounded-xl border border-white/10 shadow-sm flex items-center justify-center"
                      style={{ background: th.previewBg }}
                    >
                      {selectedTheme === th.id && (
                        <CheckCircle2 size={16} className="text-white drop-shadow" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-200 truncate w-full">
                      {th.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 3: Social Links Tray */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 backdrop-blur-md">
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  <Share2 size={18} />
                </div>
                <div>
                  <h2 className="font-bold text-base text-white">3. Social Icons Tray</h2>
                  <p className="text-xs text-slate-400">Quick-access profile buttons displayed at the top</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: "instagram", label: "Instagram URL", icon: "instagram", placeholder: "https://instagram.com/username" },
                  { id: "twitter", label: "X / Twitter URL", icon: "twitter", placeholder: "https://x.com/username" },
                  { id: "youtube", label: "YouTube Channel", icon: "youtube", placeholder: "https://youtube.com/@channel" },
                  { id: "github", label: "GitHub Profile", icon: "github", placeholder: "https://github.com/username" },
                  { id: "linkedin", label: "LinkedIn URL", icon: "linkedin", placeholder: "https://linkedin.com/in/username" },
                  { id: "spotify", label: "Spotify / Music", icon: "spotify", placeholder: "https://open.spotify.com/artist/..." },
                  { id: "tiktok", label: "TikTok URL", icon: "tiktok", placeholder: "https://tiktok.com/@username" },
                  { id: "mail", label: "Email Contact", icon: "mail", placeholder: "mailto:hello@domain.com" },
                ].map((item) => (
                  <div key={item.id} className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-300 flex items-center gap-1.5">
                      <SocialIcon platform={item.icon} size={13} className="text-cyan-400" />
                      {item.label}
                    </label>
                    <input
                      type="text"
                      value={socials[item.id] || ""}
                      onChange={(e) => handleSocialChange(item.id, e.target.value)}
                      placeholder={item.placeholder}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 text-xs text-white placeholder-slate-600 transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 4: Custom Links Manager */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <LinkIcon size={18} />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-white">4. Dynamic Links</h2>
                    <p className="text-xs text-slate-400">Add links to your websites, videos, stores, and playlists</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={addLink}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-cyan-400 text-xs font-semibold border border-slate-700/80 flex items-center gap-1 transition-all"
                >
                  <Plus size={14} /> Add Link
                </button>
              </div>

              {/* Links List */}
              <div className="space-y-3">
                {links.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-slate-700 space-y-2.5 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-cyan-400 border border-slate-800">
                          <SocialIcon platform={item.platform || "globe"} size={13} />
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          Link #{index + 1}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeLink(index)}
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        title="Delete link"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.linktext}
                        onChange={(e) => handleLinkChange(index, "linktext", e.target.value)}
                        placeholder="Link Title (e.g. My Portfolio)"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs text-white placeholder-slate-600 transition-all font-medium"
                      />
                      <input
                        type="text"
                        value={item.link}
                        onChange={(e) => handleLinkChange(index, "link", e.target.value)}
                        placeholder="Destination URL (https://...)"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-xs text-white placeholder-slate-600 transition-all font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addLink}
                className="w-full py-3 rounded-2xl border border-dashed border-slate-700 hover:border-cyan-400/80 text-slate-400 hover:text-cyan-400 text-xs font-semibold flex items-center justify-center gap-2 transition-all bg-slate-950/40"
              >
                <Plus size={16} /> Add Another Link Row
              </button>
            </div>

            {/* Final Publish Button */}
            <div className="pt-2">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !handle || handle.trim().length < 2}
                className="w-full py-4 rounded-2xl font-black text-base text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 hover:from-cyan-300 hover:to-white disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:scale-101 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Publishing your BitTree...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Publish & Go Live</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: STICKY REAL-TIME PHONE PREVIEW ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col items-center">
            <div className="mb-3 text-center">
              <span className="text-xs font-mono text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-500/30 px-3 py-1 rounded-full">
                ⚡ Live Interactive Preview
              </span>
            </div>

            <PhonePreview
              handle={handle || "yourname"}
              displayName={displayName || handle || "Your Name"}
              bio={bio}
              pic={pic}
              theme={selectedTheme}
              links={links}
              socials={socials}
              onShareClick={() => setShowQRModal(true)}
            />
          </div>
        </div>
      </div>

      {/* ================= SUCCESS CELEBRATION MODAL ================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-center text-slate-100 overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-400 to-fuchsia-500 p-0.5 mx-auto shadow-[0_0_30px_rgba(6,182,212,0.6)]">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-cyan-400">
                  <Sparkles size={32} />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Your BitTree is Live! 🎉
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Your official bio link is ready to share with the world.
                </p>
              </div>

              {/* Link Box */}
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-mono text-cyan-400 truncate pl-2 font-bold">
                  {fullGeneratedUrl}
                </span>
                <button
                  onClick={copyGeneratedLink}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    copiedLink
                      ? "bg-emerald-500 text-white"
                      : "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
                  }`}
                >
                  {copiedLink ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowQRModal(true)}
                  className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <QrCode size={16} className="text-cyan-400" />
                  View QR Code
                </button>

                <a
                  href={`/${handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Open Live BitTree</span>
                  <ExternalLink size={15} />
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
                >
                  Keep editing in studio
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        handle={handle || "yourname"}
        displayName={displayName || handle}
        fullUrl={fullGeneratedUrl}
      />
    </div>
  );
}

export default function Generate() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-cyan-400">
          <div className="flex items-center gap-3">
            <Loader2 className="animate-spin" size={24} />
            <span className="text-sm font-mono">Loading BitTree Studio...</span>
          </div>
        </div>
      }
    >
      <StudioBuilder />
    </Suspense>
  );
}
