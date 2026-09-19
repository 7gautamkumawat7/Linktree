// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090d16",
};

export const metadata = {
  title: "BitTree — All Your Links in One Stunning Bio Link",
  description:
    "The next-generation bio link platform with rich glassmorphism aesthetics, dynamic themes, instant live previews, and QR code sharing for modern creators.",
  keywords: [
    "link in bio",
    "linktree alternative",
    "bittree",
    "creator links",
    "bio link generator",
    "custom themes",
  ],
  authors: [{ name: "BitTree Team" }],
  openGraph: {
    title: "BitTree — All Your Links in One Stunning Bio Link",
    description:
      "Create your free, customizable, next-gen bio link in seconds. Connect your audience to all your social channels, content, and products.",
    type: "website",
    locale: "en_US",
    siteName: "BitTree",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#090d16] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
        <div className="flex-1 w-full">{children}</div>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
