'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Users, 
  ChevronRight, 
  AlertTriangle, 
  ArrowUpRight,
  Activity,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function Hero() {
  const { language, t, reports } = useApp();

  const emergencyCount = reports.filter(r => r.severity === 'emergency').length;
  const verifiedCount = reports.filter(r => r.status === 'VERIFIED' || r.status === 'RESOLVED').length;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy via-navy to-navy-dark text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Subtle Grid & Glowing Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(#18A558_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-safety/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emergency/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-safety animate-pulse" />
              <span className="text-xs font-semibold text-slate-200 tracking-wide">
                {t.brand.badge}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              {t.hero.titleLine1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety via-emerald-400 to-teal-300">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/report/new"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emergency hover:bg-emergency-hover text-white text-base font-extrabold px-7 py-4 rounded-2xl shadow-emergency transition-all transform hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <span className="text-lg">🚨</span>
                <span>{t.hero.primaryCta}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/map"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-base font-bold px-7 py-4 rounded-2xl backdrop-blur-md transition-all hover:border-white/40"
              >
                <span className="text-lg">🗺️</span>
                <span>{t.hero.secondaryCta}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-300" />
              </Link>
            </div>

            {/* Live Ticker / Highlights */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emergency animate-ping" />
                <span>
                  <strong className="text-white font-bold">{emergencyCount}</strong> {language === 'en' ? 'Active Emergencies' : 'জরুরি পরিস্থিতি'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-safety" />
                <span>
                  <strong className="text-white font-bold">{verifiedCount}</strong> {language === 'en' ? 'Verified Incidents' : 'যাচাইকৃত সমস্যা'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-warning" />
                <span>
                  <strong className="text-white font-bold">4,521+</strong> {language === 'en' ? 'Active Guardians' : 'সচেতন নাগরিক'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Bangladesh Safety Radar Map Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glass Card Container */}
              <div className="relative rounded-3xl bg-navy-light/70 border border-white/15 p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Header of Visual */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emergency animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Dhaka City Hazard Radar
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-safety bg-safety/20 px-2 py-0.5 rounded-full border border-safety/30">
                    Live Feed 24/7
                  </span>
                </div>

                {/* Stylized Map Viewport */}
                <div className="relative h-72 sm:h-80 w-full my-4 rounded-2xl bg-[#091522] overflow-hidden border border-white/10 flex items-center justify-center">
                  {/* Subtle Map Grid lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="radar-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#radar-grid)" />
                    {/* Concentric Radar Rings */}
                    <circle cx="50%" cy="50%" r="60" fill="none" stroke="#18A558" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="120" fill="none" stroke="#18A558" strokeWidth="0.8" opacity="0.6" />
                  </svg>

                  {/* Stylized Bangladesh Dhaka Outline Path */}
                  <div className="relative w-48 h-48 opacity-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-500 fill-slate-800 stroke-slate-600 stroke-[1.5]">
                      <polygon points="50,10 70,25 85,50 75,80 50,90 25,80 15,50 30,25" />
                      <circle cx="50" cy="50" r="16" fill="#142C44" stroke="#60A5FA" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Glowing Animated Markers */}
                  {/* Mirpur - Road Hazard */}
                  <div className="absolute top-[32%] left-[36%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    <span className="absolute -inset-2 rounded-full bg-emergency/40 animate-ping" />
                    <div className="relative w-5 h-5 rounded-full bg-emergency text-white flex items-center justify-center text-[10px] font-black shadow-emergency">
                      !
                    </div>
                    {/* Tooltip */}
                    <div className="absolute left-6 -top-2 whitespace-nowrap bg-navy-dark/95 border border-white/20 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg pointer-events-none">
                      <span className="font-bold text-amber-400">Mirpur:</span> Road Cave-in
                    </div>
                  </div>

                  {/* Uttara - Sparking Cable */}
                  <div className="absolute top-[16%] left-[54%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    <span className="absolute -inset-2 rounded-full bg-emergency/30 animate-ping-slow" />
                    <div className="relative w-4 h-4 rounded-full bg-emergency text-white flex items-center justify-center text-[9px] font-black">
                      ⚡
                    </div>
                    <div className="absolute left-5 -top-2 whitespace-nowrap bg-navy-dark/95 border border-white/20 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg pointer-events-none">
                      <span className="font-bold text-red-400">Uttara:</span> Live Cable
                    </div>
                  </div>

                  {/* Dhanmondi - Waterlogging (Resolved) */}
                  <div className="absolute top-[58%] left-[42%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    <div className="relative w-4 h-4 rounded-full bg-safety text-white flex items-center justify-center text-[9px] font-black shadow-glow">
                      ✓
                    </div>
                    <div className="absolute left-5 -top-2 whitespace-nowrap bg-navy-dark/95 border border-white/20 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg pointer-events-none">
                      <span className="font-bold text-safety">Dhanmondi:</span> Drain Cleared
                    </div>
                  </div>

                  {/* Motijheel - Open Manhole */}
                  <div className="absolute top-[68%] left-[64%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    <div className="relative w-4 h-4 rounded-full bg-warning text-navy flex items-center justify-center text-[9px] font-black">
                      ⚠️
                    </div>
                    <div className="absolute right-5 -top-2 whitespace-nowrap bg-navy-dark/95 border border-white/20 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg pointer-events-none">
                      <span className="font-bold text-yellow-300">Motijheel:</span> Open Manhole
                    </div>
                  </div>

                  {/* Gulshan - Pothole */}
                  <div className="absolute top-[38%] left-[68%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
                    <div className="relative w-3.5 h-3.5 rounded-full bg-blue-400 text-navy flex items-center justify-center text-[8px] font-black">
                      💡
                    </div>
                  </div>
                </div>

                {/* Bottom Card Summary */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-safety/20 text-safety flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">AI Real-time Verification</p>
                      <p className="text-[11px] text-slate-300">94.8% automated triage accuracy</p>
                    </div>
                  </div>
                  <Link
                    href="/map"
                    className="text-xs font-bold text-safety hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Map</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
