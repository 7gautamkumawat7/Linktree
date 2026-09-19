# 🌲 BitTree — Next-Gen Bio Link Platform

<p align="center">
  <strong>The modern, glassmorphism-powered link-in-bio platform built for creators, developers, artists, and digital brands.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-Resilient-47a248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
  <img src="https://img.shields.io/badge/License-MIT-purple?style=for-the-badge" alt="License" />
</p>

---

## 🌟 Overview

**BitTree** is a next-generation link-in-bio web application that allows users to create, customize, and share all their social media channels, websites, portfolios, videos, and playlists in one beautiful, high-converting link.

Designed with **futuristic glassmorphism**, vibrant gradients, interactive micro-animations, real-time split-screen studio editing, and instant vector QR code sharing.

---

## 🎨 Key Features

### 1. 🌈 8 Curated Dynamic Themes
Switch between 8 handcrafted visual styles with custom gradients, frosted glass cards, glowing borders, and button hover physics:
- 🌌 **Cyber Dark** — Deep slate with neon cyan & electric blue accents.
- ⚡ **Neon Glow** — Midnight obsidian with pulsing fuchsia & purple neon borders.
- 🌅 **Sunset Luxe** — Warm peach, crimson, and golden amber glow.
- 🌿 **Emerald Forest** — Lush jade, mint mists, and botanical glassmorphism.
- 💎 **Midnight Glass** — Sapphire depths with frosted glass cards.
- 💜 **Lavender Dream** — Soft pastel lilac and dreamy twilight haze.
- ⚪ **Minimal Light** — Crisp modern monochrome with high-contrast borders.
- 🍊 **Retro Vibrant** — High-energy citrus and hot pink pop aesthetic.

### 2. ⚡ Live Studio Builder (`/generate`)
- **Split-View Editor**: Multi-step configuration panel on the left with a real-time, interactive iPhone mockup on the right that syncs instantly as you type.
- **Real-Time Handle Validation**: Instant debounced availability checks against `/api/check-handle` with visual availability badges.
- **Identity Customizer**: Display Name, 150-character bio with counter, custom Avatar URL, and 6 instant avatar presets.
- **Theme Picker**: Visual preview cards showing theme color palettes with one-click selection.
- **Smart Social Tray**: Add one-tap icons for Instagram, YouTube, X / Twitter, GitHub, LinkedIn, Spotify, TikTok, and Email.
- **Dynamic Links Manager**: Add, edit, and delete links with automatic platform icon detection (YouTube, Spotify, GitHub, Discord, Steam, etc.).
- **Celebration Modal**: Confetti explosion (`canvas-confetti`), instant copyable link, live QR code generator, and direct link to the live profile.

### 3. 📱 Ultra-Polished Profile Page (`/[handle]`)
- Fully rendered themed bio link with custom background glow and hover physics.
- Profile header with glowing avatar ring, verified checkmark badge, `@handle`, and bio.
- Quick-access social icon badges at the top.
- Interactive external link cards with platform brand badges.
- **1-Click Share Modal**: Generates a high-res vector QR code, one-click copy URL, and direct sharing to WhatsApp, X (Twitter), LinkedIn, and native Web Share API.
- Floating *"Create your own BitTree"* branded badge.
- **Custom 404 Unclaimed Handle Screen**: Displays a clean *"Claim @handle Now"* CTA button if a visitor lands on an unregistered handle.

### 4. 🛡️ Resilient MongoDB Database & APIs
- Connects automatically to local or cloud MongoDB instances (`MONGODB_URI`).
- **Zero-Crash In-Memory Fallback**: If MongoDB is initializing or offline locally, the app gracefully falls back to an in-memory mock store preloaded with sample creator profiles (`/harry`, `/sarah`, `/alex`).
- Production-ready REST endpoints:
  - `POST /api/generate` — Validates, sanitizes, and persists complete profile payloads.
  - `GET /api/check-handle?handle=foo` — Fast username availability lookup.
  - `GET /api/profile/[handle]` — JSON profile data endpoint.

---

## 🗂️ Project Structure

```text
linktree/
├── app/
│   ├── [handle]/
│   │   ├── page.js             # Server-rendered dynamic profile page & metadata
│   │   └── ProfileClient.js    # Interactive client component (theme, links, share modal)
│   ├── api/
│   │   ├── check-handle/
│   │   │   └── route.js        # Real-time handle availability API
│   │   ├── generate/
│   │   │   └── route.js        # Profile generation & validation API
│   │   └── profile/[handle]/
│   │       └── route.js        # Profile JSON data API
│   ├── components/
│   │   ├── index.js            # Unified barrel export for all UI components
│   │   ├── Footer.js           # Modern glass footer with quick links & status
│   │   ├── Navbar.js           # Floating glass pill navbar with mobile menu
│   │   ├── PhonePreview.js     # Photorealistic iPhone mockup with live preview
│   │   ├── QRCodeModal.js      # Vector QR code generator & social share sheet
│   │   └── SocialIcon.js       # Universal platform detection & inline SVG icons
│   ├── generate/
│   │   └── page.js             # Split-screen studio builder & success modal
│   ├── lib/
│   │   ├── index.js            # Unified barrel export for helpers & themes
│   │   ├── mongodb.js          # Resilient MongoDB client + in-memory store
│   │   └── ThemeConfig.js      # 8 curated themes & styling tokens registry
│   ├── globals.css             # Glassmorphism utilities, scrollbars & keyframes
│   ├── layout.js               # Root layout, fonts (Geist), SEO & viewport tags
│   └── page.js                 # Landing page (Hero, theme sandbox, showcase, FAQ)
├── public/                     # Static assets & icons
├── .env.local                  # Environment variables
├── next.config.mjs             # Next.js configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **npm**, **yarn**, or **pnpm**
- *(Optional)* **MongoDB**: Local MongoDB server or MongoDB Atlas URI (app runs with in-memory fallback if not present)

### 1. Clone & Install Dependencies
```bash
# Navigate to the project directory
cd linktree

# Install all dependencies
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/
NEXT_HOST=http://localhost:3000
```

### 3. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🌐 Sample Preloaded Profiles

You can test these preloaded creator profiles directly out-of-the-box:
- [http://localhost:3000/harry](http://localhost:3000/harry) — Developer & Educator (`cyber-dark` theme)
- [http://localhost:3000/sarah](http://localhost:3000/sarah) — UI/UX & 3D Artist (`sunset-luxe` theme)
- [http://localhost:3000/alex](http://localhost:3000/alex) — Music Producer (`neon-glow` theme)

---

## 🛠️ API Reference

### 1. Check Handle Availability
```http
GET /api/check-handle?handle=yourname
```
**Response:**
```json
{
  "available": true,
  "handle": "yourname",
  "message": "Handle is available!"
}
```

### 2. Generate / Update BitTree
```http
POST /api/generate
Content-Type: application/json
```
**Request Body:**
```json
{
  "handle": "gautam",
  "displayName": "Gautam Sharma",
  "bio": "Building next-gen web apps 🚀",
  "pic": "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  "theme": "cyber-dark",
  "socials": {
    "github": "https://github.com/gautam",
    "twitter": "https://x.com/gautam"
  },
  "links": [
    {
      "linktext": "My Portfolio",
      "link": "https://portfolio.dev",
      "platform": "globe"
    }
  ]
}
```

### 3. Fetch Profile Data
```http
GET /api/profile/:handle
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
