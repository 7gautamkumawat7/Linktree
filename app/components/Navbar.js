// app/components/Navbar.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, ArrowRight, Menu, X, Layers, Compass, HelpCircle, Palette } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show navbar on landing and generate pages
  const isProfilePage = pathname && pathname !== "/" && pathname !== "/generate";
  if (isProfilePage) {
    return null; // Public link bio profiles have their own full-screen immersive design
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
          isScrolled
            ? "glass-nav shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-white/15"
            : "bg-slate-900/60 backdrop-blur-md border border-white/10"
        }`}
      >
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-fuchsia-500 p-0.5 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.7)] transition-all transform group-hover:scale-105">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles size={18} className="text-cyan-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
              BitTree
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                PRO
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <li>
            <Link
              href="/#features"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Layers size={14} className="text-cyan-400/70" />
              Features
            </Link>
          </li>
          <li>
            <Link
              href="/#themes"
              className="hover:text-purple-400 transition-colors flex items-center gap-1.5"
            >
              <Palette size={14} className="text-purple-400/70" />
              Themes
            </Link>
          </li>
          <li>
            <Link
              href="/#showcase"
              className="hover:text-pink-400 transition-colors flex items-center gap-1.5"
            >
              <Compass size={14} className="text-pink-400/70" />
              Showcase
            </Link>
          </li>
          <li>
            <Link
              href="/#faq"
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <HelpCircle size={14} className="text-amber-400/70" />
              FAQ
            </Link>
          </li>
        </ul>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          {pathname !== "/generate" ? (
            <Link
              href="/generate"
              className="relative group px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 hover:from-cyan-300 hover:to-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_28px_rgba(6,182,212,0.7)] transition-all transform hover:scale-102 flex items-center gap-2"
            >
              <span>Claim Handle</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-300 bg-slate-800/80 hover:bg-slate-750 border border-slate-700 transition-colors"
            >
              Back to Home
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700/60"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-4 right-4 bg-slate-900/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <ul className="flex flex-col gap-3 font-medium text-slate-200 text-sm">
            <li>
              <Link
                href="/#features"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-800 transition"
              >
                <Layers size={16} className="text-cyan-400" />
                Features
              </Link>
            </li>
            <li>
              <Link
                href="/#themes"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-800 transition"
              >
                <Palette size={16} className="text-purple-400" />
                Themes
              </Link>
            </li>
            <li>
              <Link
                href="/#showcase"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-800 transition"
              >
                <Compass size={16} className="text-pink-400" />
                Showcase
              </Link>
            </li>
            <li>
              <Link
                href="/#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded-xl hover:bg-slate-800 transition"
              >
                <HelpCircle size={16} className="text-amber-400" />
                FAQ
              </Link>
            </li>
          </ul>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <Link
              href="/generate"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-2xl text-center text-sm font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              Claim Your Handle
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
