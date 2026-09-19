// app/components/Footer.js
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Heart } from "lucide-react";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const pathname = usePathname();

  // Hide on standalone public profiles
  const isProfilePage = pathname && pathname !== "/" && pathname !== "/generate";
  if (isProfilePage) {
    return null;
  }

  return (
    <footer className="w-full bg-slate-950/80 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden text-slate-400">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-cyan-500/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-fuchsia-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles size={16} className="text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                BitTree
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-slate-400">
              The next-generation bio link platform designed for creators, developers, artists, and modern brands. Share everything you create in one stunning link.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>All Systems Operational & Fast</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/generate" className="hover:text-cyan-400 transition-colors">
                  Create BitTree
                </Link>
              </li>
              <li>
                <Link href="/#themes" className="hover:text-purple-400 transition-colors">
                  Curated Themes
                </Link>
              </li>
              <li>
                <Link href="/#showcase" className="hover:text-pink-400 transition-colors">
                  Creator Showcase
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-amber-400 transition-colors">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Creator */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Community</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="https://github.com/7gautamkumawat7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <SocialIcon platform="github" size={14} /> GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-sky-400 transition-colors"
                >
                  <SocialIcon platform="twitter" size={14} /> Follow on X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/gautam-kumawat-3ab7b637a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                >
                  <SocialIcon platform="linkedin" size={14} /> Connect on LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} BitTree </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Created by gautam</span>
            <Heart size={13} className="text-rose-500 fill-rose-500" />
            <span>for the modern web</span>
          </div>
        </div>
      </div>
    </footer>
  );
}