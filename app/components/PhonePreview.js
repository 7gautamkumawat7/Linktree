// app/components/PhonePreview.js
"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, Share2, ExternalLink, Sparkles, Globe } from "lucide-react";
import SocialIcon, { getPlatformFromUrl } from "./SocialIcon";
import { getTheme } from "@/app/lib/ThemeConfig";

export default function PhonePreview({
  handle = "yourname",
  displayName = "Your Name",
  bio = "Welcome to my official links! Designer, Builder & Content Creator 🚀",
  pic = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  theme = "cyber-dark",
  links = [],
  socials = {},
  isInteractive = true,
  onShareClick = null,
}) {
  const currentTheme = getTheme(theme);

  // Active social links array
  const activeSocials = Object.entries(socials || {}).filter(
    ([_, url]) => url && url.trim().length > 0
  );

  const fallbackAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

  return (
    <div className="relative mx-auto w-[310px] sm:w-[340px] h-[640px] sm:h-[680px] bg-slate-950 rounded-[48px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(56,189,248,0.15)] border-[6px] border-slate-800/90 ring-1 ring-white/20 select-none">
      {/* Outer physical phone buttons */}
      <div className="absolute -left-[9px] top-28 w-[4px] h-9 bg-slate-700 rounded-l-md"></div>
      <div className="absolute -left-[9px] top-40 w-[4px] h-12 bg-slate-700 rounded-l-md"></div>
      <div className="absolute -left-[9px] top-56 w-[4px] h-12 bg-slate-700 rounded-l-md"></div>
      <div className="absolute -right-[9px] top-36 w-[4px] h-16 bg-slate-700 rounded-r-md"></div>

      {/* Screen container */}
      <div
        className={`relative w-full h-full rounded-[38px] overflow-hidden flex flex-col transition-all duration-500 ${currentTheme.bgClass}`}
        style={{
          boxShadow: `inset 0 0 40px ${currentTheme.glowColor}`,
        }}
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-5 bg-black/90 rounded-full z-30 flex items-center justify-between px-2.5 border border-white/10 shadow-sm">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-700"></div>
          <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse"></div>
        </div>

        {/* Top Status Bar Mock */}
        <div className="pt-2 px-6 pb-2 flex justify-between items-center text-[10px] font-semibold text-white/70 z-20">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px]">5G</span>
            <div className="w-4 h-2 border border-white/60 rounded-[2px] p-[1px] flex items-center">
              <div className="w-full h-full bg-white rounded-[1px]"></div>
            </div>
          </div>
        </div>

        {/* Share Button Pill in Header */}
        <div className="px-4 py-1 flex justify-end z-20">
          <button
            onClick={() => {
              if (onShareClick) onShareClick();
              else if (typeof navigator !== "undefined" && navigator.clipboard) {
                navigator.clipboard.writeText(window.location.origin + "/" + handle);
              }
            }}
            aria-label="Share profile"
            className="p-1.5 rounded-full bg-black/30 hover:bg-black/50 text-white/80 hover:text-white backdrop-blur-md border border-white/15 transition-all shadow-sm"
          >
            <Share2 size={13} />
          </button>
        </div>

        {/* Scrollable Profile Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-8 pt-1 text-center scrollbar-none flex flex-col items-center">
          {/* Avatar with dynamic glow */}
          <div className="relative group mb-3">
            <div
              className="absolute -inset-1 rounded-full blur-md opacity-70 transition-all"
              style={{ background: currentTheme.previewBg }}
            ></div>
            <div
              className={`relative w-20 h-20 rounded-full overflow-hidden ${currentTheme.avatarBorder} bg-slate-900 mx-auto transition-transform duration-300 group-hover:scale-105`}
            >
              <img
                src={pic && pic.trim().length > 0 ? pic : fallbackAvatar}
                alt={displayName || handle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = fallbackAvatar;
                }}
              />
            </div>
          </div>

          {/* Profile Name & Verified Badge */}
          <div className="flex items-center justify-center gap-1.5 mb-0.5">
            <h2 className={`font-bold text-base tracking-tight leading-snug ${currentTheme.textColor}`}>
              {displayName || (handle ? `@${handle}` : "Your Name")}
            </h2>
            <CheckCircle2 size={14} className="text-cyan-400 fill-cyan-400/20 shrink-0" />
          </div>

          {/* Handle */}
          <p className={`text-xs font-mono mb-2 ${currentTheme.subtextColor}`}>
            @{handle || "handle"}
          </p>

          {/* Bio */}
          {bio && (
            <p
              className={`text-xs leading-relaxed max-w-[240px] mx-auto mb-4 font-normal ${currentTheme.subtextColor}`}
            >
              {bio}
            </p>
          )}

          {/* Social Icons Tray */}
          {activeSocials.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 max-w-[260px]">
              {activeSocials.map(([platform, url], idx) => (
                <a
                  key={idx}
                  href={isInteractive ? url : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl transition-all duration-200 transform hover:scale-110 active:scale-95 ${currentTheme.socialIconBg}`}
                  title={platform}
                >
                  <SocialIcon platform={platform} size={15} />
                </a>
              ))}
            </div>
          )}

          {/* Links List */}
          <div className="w-full space-y-2.5 my-1">
            {links && links.length > 0 ? (
              links
                .filter((l) => l.linktext || l.link)
                .map((item, index) => {
                  const detectedPlatform =
                    item.platform || getPlatformFromUrl(item.link, item.linktext);

                  return (
                    <a
                      key={index}
                      href={isInteractive && item.link ? item.link : undefined}
                      target={isInteractive ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`group w-full py-3 px-3.5 flex items-center justify-between transition-all duration-300 transform active:scale-98 shadow-sm ${currentTheme.buttonShape} ${currentTheme.cardBg}`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center shrink-0">
                          <SocialIcon platform={detectedPlatform} size={13} />
                        </div>
                        <span className="font-semibold text-xs tracking-tight truncate">
                          {item.linktext || item.link || "My Link"}
                        </span>
                      </div>
                      <ExternalLink
                        size={12}
                        className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1"
                      />
                    </a>
                  );
                })
            ) : (
              <div className="p-4 rounded-2xl border border-dashed border-white/20 text-center text-xs opacity-60">
                Add links in the studio to preview them here
              </div>
            )}
          </div>

          {/* BitTree Brand Footer inside Phone */}
          <div className="mt-auto pt-6 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-[9px] uppercase tracking-widest font-mono text-white/60">
              powered by
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-white bg-black/40 px-2.5 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">
              <Sparkles size={10} className="text-cyan-400" />
              <span>BitTree</span>
            </div>
          </div>
        </div>

        {/* iPhone Bottom Home Indicator Bar */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/40 rounded-full"></div>
      </div>
    </div>
  );
}
