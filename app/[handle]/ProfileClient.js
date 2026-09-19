// app/[handle]/ProfileClient.js
"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Share2,
  ExternalLink,
  Sparkles,
  ArrowRight,
  HelpCircle,
  QrCode
} from "lucide-react";
import SocialIcon, { getPlatformFromUrl } from "@/app/components/SocialIcon";
import QRCodeModal from "@/app/components/QRCodeModal";
import { getTheme } from "@/app/lib/ThemeConfig";

export default function ProfileClient({ profile, handle }) {
  const [showQRModal, setShowQRModal] = useState(false);

  // If profile is not found, render custom aesthetic Unclaimed Handle screen
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none -z-10"></div>

        <div className="max-w-md w-full text-center space-y-6 bg-slate-900/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
            <Sparkles size={32} />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Handle Not Claimed Yet
            </h1>
            <p className="text-sm font-mono text-cyan-400 font-bold">
              bittr.ee/{handle}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              The handle <span className="text-slate-200 font-bold">@{handle}</span> is currently available! Be the first to claim it and build your link in bio.
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <Link
              href={`/generate?handle=${encodeURIComponent(handle)}`}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <span>Claim @{handle} Now</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentTheme = getTheme(profile.theme);
  const fallbackAvatar =
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80";

  const activeSocials = Object.entries(profile.socials || {}).filter(
    ([_, url]) => url && url.trim().length > 0
  );

  const fullUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${profile.handle}`
      : `https://bittr.ee/${profile.handle}`;

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-start py-12 sm:py-16 px-4 sm:px-6 relative transition-colors duration-500 ${currentTheme.bgClass}`}
    >
      {/* Dynamic Theme Glow Background Orbs */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none -z-10 opacity-60"
        style={{ background: currentTheme.previewBg }}
      ></div>

      {/* Floating Share Button in Top Right */}
      <div className="fixed top-6 right-6 z-30">
        <button
          onClick={() => setShowQRModal(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/70 hover:bg-slate-900/90 text-slate-200 hover:text-white border border-white/20 backdrop-blur-xl shadow-lg transition-all transform hover:scale-105 active:scale-95"
          title="Share profile"
        >
          <Share2 size={15} className="text-cyan-400" />
          <span className="text-xs font-semibold hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Profile Container */}
      <div className="w-full max-w-md mx-auto flex flex-col items-center text-center space-y-6 pt-4">
        {/* Avatar with Theme Border Glow */}
        <div className="relative group">
          <div
            className="absolute -inset-2 rounded-full blur-xl opacity-75 animate-pulse-glow"
            style={{ background: currentTheme.previewBg }}
          ></div>
          <div
            className={`relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden ${currentTheme.avatarBorder} bg-slate-900 shadow-2xl transition-transform duration-300 group-hover:scale-105`}
          >
            <img
              src={profile.pic && profile.pic.trim().length > 0 ? profile.pic : fallbackAvatar}
              alt={profile.displayName || profile.handle}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = fallbackAvatar;
              }}
            />
          </div>
        </div>

        {/* Display Name & Verified Badge */}
        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h1
              className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${currentTheme.textColor}`}
            >
              {profile.displayName || `@${profile.handle}`}
            </h1>
            <CheckCircle2 size={20} className="text-cyan-400 fill-cyan-400/20 shrink-0" />
          </div>

          <p className={`text-sm font-mono font-medium ${currentTheme.subtextColor}`}>
            @{profile.handle}
          </p>
        </div>

        {/* Bio */}
        {profile.bio && (
          <p
            className={`text-sm sm:text-base leading-relaxed max-w-sm px-2 ${currentTheme.subtextColor}`}
          >
            {profile.bio}
          </p>
        )}

        {/* Social Icons Tray */}
        {activeSocials.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-xs pt-1">
            {activeSocials.map(([platform, url], idx) => (
              <a
                key={idx}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2.5 rounded-2xl transition-all duration-200 transform hover:scale-115 active:scale-95 shadow-md ${currentTheme.socialIconBg}`}
                title={platform}
              >
                <SocialIcon platform={platform} size={18} />
              </a>
            ))}
          </div>
        )}

        {/* Links List */}
        <div className="w-full space-y-3.5 pt-2">
          {profile.links && profile.links.length > 0 ? (
            profile.links
              .filter((l) => l.linktext || l.link)
              .map((item, index) => {
                const detectedPlatform =
                  item.platform || getPlatformFromUrl(item.link, item.linktext);

                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-full py-4 px-5 flex items-center justify-between transition-all duration-300 transform hover:-translate-y-1 active:scale-98 shadow-md ${currentTheme.buttonShape} ${currentTheme.cardBg}`}
                  >
                    <div className="flex items-center gap-3.5 truncate">
                      <div className="w-8 h-8 rounded-xl bg-black/25 flex items-center justify-center shrink-0 border border-white/10">
                        <SocialIcon platform={detectedPlatform} size={16} />
                      </div>
                      <span className="font-bold text-sm sm:text-base tracking-tight truncate">
                        {item.linktext || item.link}
                      </span>
                    </div>

                    <ExternalLink
                      size={16}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
                    />
                  </a>
                );
              })
          ) : (
            <div className="p-6 rounded-2xl border border-dashed border-white/20 text-center text-sm opacity-60">
              No links available yet.
            </div>
          )}
        </div>

        {/* Floating BitTree Badge */}
        <div className="pt-10 pb-6 flex flex-col items-center gap-2">
          <Link
            href="/generate"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-white/20 backdrop-blur-xl shadow-xl transition-all transform hover:scale-105"
          >
            <Sparkles size={14} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-bold">
              Create your own <span className="text-cyan-400">BitTree</span>
            </span>
            <ArrowRight size={13} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* QR Code Sharing Modal */}
      <QRCodeModal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        handle={profile.handle}
        displayName={profile.displayName}
        fullUrl={fullUrl}
      />
    </div>
  );
}
