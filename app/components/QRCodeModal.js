// app/components/QRCodeModal.js
"use client";

import React, { useState } from "react";
import {
  X,
  Copy,
  Check,
  Share2,
  Download,
  ExternalLink,
  QrCode,
  MessageCircle
} from "lucide-react";
import SocialIcon from "./SocialIcon";

export default function QRCodeModal({
  isOpen,
  onClose,
  handle,
  displayName,
  fullUrl,
}) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const url = fullUrl || (typeof window !== "undefined" ? `${window.location.origin}/${handle}` : `https://bittr.ee/${handle}`);
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(url)}&color=0-0-0&bgcolor=255-255-255&margin=1`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `${displayName || handle}'s BitTree`,
          text: `Check out ${displayName || handle}'s links on BitTree!`,
          url: url,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow effect in background */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <QrCode size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Share BitTree</h3>
              <p className="text-xs text-slate-400">Scan or share your public link</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="my-6 flex flex-col items-center justify-center">
          <div className="p-4 bg-white rounded-2xl shadow-xl border-4 border-cyan-500/20 flex items-center justify-center">
            <img
              src={qrApiUrl}
              alt={`QR Code for ${url}`}
              className="w-44 h-44 object-contain rounded-lg"
              loading="lazy"
            />
          </div>
          <p className="mt-3 text-xs font-mono text-cyan-300 font-medium tracking-wide">
            @{handle}
          </p>
        </div>

        {/* Link Copy Box */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-400 mb-1.5">
            Your unique BitTree URL
          </label>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-2xl p-1.5 pl-3">
            <span className="text-xs font-mono text-slate-300 truncate flex-1">
              {url}
            </span>
            <button
              onClick={copyToClipboard}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                  : "bg-cyan-500 hover:bg-cyan-400 text-slate-950"
              }`}
            >
              {copied ? (
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
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `Check out my BitTree links and profile here: ${url}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white rounded-xl text-xs font-medium border border-slate-700/60 transition-all hover:scale-102"
          >
            <SocialIcon platform="twitter" size={14} className="text-sky-400" />
            <span>X / Twitter</span>
          </a>

          <a
            href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
              `Check out my links on BitTree: ${url}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white rounded-xl text-xs font-medium border border-slate-700/60 transition-all hover:scale-102"
          >
            <MessageCircle size={14} className="text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white rounded-xl text-xs font-medium border border-slate-700/60 transition-all hover:scale-102"
          >
            <SocialIcon platform="linkedin" size={14} className="text-blue-400" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Native Web Share */}
        <button
          onClick={handleNativeShare}
          className="w-full py-2.5 bg-gradient-to-r from-slate-800 to-slate-800/80 hover:from-slate-700 hover:to-slate-750 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Share2 size={14} /> More Sharing Options
        </button>
      </div>
    </div>
  );
}
