# 🛡️ Nirapod BD (নিরাপদ বিডি)
### *“See a problem. Report it. Help your community solve it.”*

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-navy.svg)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Maps-Leaflet%20OSM-18A558.svg)](https://leafletjs.com/)
[![Emergency Hotline](https://img.shields.io/badge/Bangladesh%20Emergency-999-E53935.svg)](tel:999)

**Nirapod BD** is a community-powered safety and civic problem reporting platform engineered specifically for Bangladesh. It enables citizens to report road hazards, waterlogging, electrical faults, sanitation collapses, and missing persons, verify nearby incidents through civic consensus, and monitor verified before-and-after repairs conducted by municipal authorities.

> [!IMPORTANT]
> **Regulatory Disclaimer:** Nirapod BD is a community civic reporting and problem-solving tool. It does **NOT** dispatch emergency services (police, fire, ambulances). For immediate life danger, callers are prominently directed to **Bangladesh National Emergency Service: 999**.

---

## 🌟 Key Capabilities & Features

### 1. 5-Step Assisted Reporting Engine (`/report/new`)
- **Step 1 — Category Selection:** 10 curated civic categories (Road/Traffic, Waste, Waterlogging, Streetlights, Electrical, Fire, Medical, Missing Persons, Infrastructure, Other).
- **Step 2 — Photo Evidence:** Drag-and-drop or camera capture with quick test photo selection.
- **Step 3 — AI Computer Vision Inspection:** Automated hazard identification, confidence scoring (e.g., 94%), risk breakdown (e.g., vehicle axle breakdown, pedestrian injury), and suggested severity.
- **Step 4 — Location Geolocation:** Interactive GPS map pin, reverse geocoding to Dhaka wards (Mirpur, Uttara, Dhanmondi, etc.), with **privacy protection** (exact coordinates rounded to protect domestic residences).
- **Step 5 — Description & Duplicate Detection:** Proactive proximity check detects matching reports within 120m and gives the option to confirm the existing ticket rather than duplicating effort.
- **Emergency Triage Warning:** Immediate warning banner and direct call to **999** if Fire, Medical, or Emergency severity is indicated.

### 2. Full-Screen Interactive Safety Map (`/map`)
- Powered by Leaflet & OpenStreetMap.
- Real-time color-coded pins for Dhaka city:
  - 🔴 **Emergency / High Risk**
  - 🟠 **High Priority**
  - 🟡 **Normal Priority**
  - 🔵 **Information**
  - 🟢 **Resolved / Repaired**
- Area search, Near-Me GPS geolocation, and floating preview cards with direct verification buttons.

### 3. Comprehensive Incident Details & Verification Quorum (`/report/[id]`)
- High-res evidence photo with AI confidence telemetry.
- Community voting system: *"✓ I Can Confirm"* (+5 pts), *"Not Sure"*, *"⚠️ Incorrect / False"*.
- Dynamic consensus progress bar.
- Vertical step-by-step resolution timeline.
- Community update and official municipal comment feed.

### 4. Before & After Interactive Resolution Slider
- Split-screen comparison slider allowing citizens to drag and visually compare the original hazard against the finished municipal repair.
- Citizen confirmation badge: *"Community confirmed resolution ✓"*.

### 5. Civic Authority & Agency Portal (`/organization`)
- Designed for City Corporations (DNCC, DSCC), WASA, DESCO, and Roads & Highways.
- Kanban counters: Open, High Priority, In Progress, Resolved.
- Triage actions: Accept, Assign Team, Mark In Progress, Submit Resolution.
- Modal allowing maintenance crews to upload Before & After proof with descriptions of repair work.

### 6. Admin Control Centre & City Hotspots (`/admin`)
- System-wide metrics: 4,521 Guardians, 1,284 Reports, 973 Verified, 923 Resolved.
- Visual category distribution donut chart and Dhaka hazard hotspot bar charts (Recharts).
- Central moderation and triage log.

### 7. Bilingual English & Bengali (বাংলা)
- Complete toggleable localization stored persistently in `localStorage`.

### 8. User Profile & Non-Spam Gamification (`/profile`)
- Profile: Rahim Ahmed (Community Guardian, 487 Points, Tier 3).
- Badges: First Reporter, Verified Observer, Community Guardian, 25 Helpful Actions, Problem Solver, Area Guardian.
- Rewards verify accuracy and confirmed fixes rather than rewarding spam report creation.

### 9. Offline & PWA Support
- Manifest.json configuration.
- Local storage queuing when offline with automatic background sync when connectivity resumes.

---

## 🎨 Color Palette & Design Identity

- **Primary Navy:** `#0B1F33` (Trust, Authority, Structure)
- **Safety Green:** `#18A558` (Resolution, Verification, Safe State)
- **Emergency Red:** `#E53935` (Urgent Life Danger, Hotline 999)
- **Warning Orange:** `#F59E0B` (High Priority Hazard, Caution)
- **Background Surface:** `#F7F9FC`
- **Dark Text:** `#102A43`
- **Typography:** Inter (English) & Noto Sans Bengali (Bangla)

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+` or `v20+`
- npm or yarn or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/nirapod-bd.git

# Enter project directory
cd nirapod-bd

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Architecture (PostgreSQL / Supabase)

A production SQL schema is included in [`supabase/schema.sql`](./supabase/schema.sql) with:
- `users`
- `reports`
- `report_images`
- `categories`
- `verifications`
- `comments`
- `organizations`
- `resolutions`
- Spatial & status indexes + Row Level Security (RLS) policies.

---

## 🌐 Deploy to Vercel

```bash
# Using Vercel CLI
npx vercel

# Or push to GitHub and import repository on vercel.com
```

---

## 📄 License
Released under the [MIT License](LICENSE). Built for a safer, cleaner, and more resilient Bangladesh.
