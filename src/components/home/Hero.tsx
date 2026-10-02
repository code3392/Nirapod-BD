'use client';

import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  Radio,
  Zap,
  Play,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function Hero() {
  const { language, t, reports } = useApp();

  const emergencyCount = reports.filter(r => r.severity === 'emergency').length;
  const verifiedCount = reports.filter(r => r.status === 'VERIFIED' || r.status === 'RESOLVED').length;

  // Active rotating highlight index
  const [activeHazardIndex, setActiveHazardIndex] = useState(0);

  const liveDhakaAlerts = [
    {
      area: 'Mirpur Road (Sec 10)',
      hazard: 'Severe Road Cave-In & Gridlock',
      tag: 'Verified • High Priority',
      badge: '🚨 CRITICAL',
      color: 'border-emergency/50 bg-emergency/10 text-emergency',
      coords: '23.8041° N, 90.3667° E',
      confirmations: 19
    },
    {
      area: 'Dhanmondi Lake 27',
      hazard: 'Stormwater Drain Re-opening Underway',
      tag: 'In Progress • Municipal Team',
      badge: '⚡ ACTIVE DISPATCH',
      color: 'border-amber-500/50 bg-amber-500/10 text-amber-400',
      coords: '23.7538° N, 90.3752° E',
      confirmations: 12
    },
    {
      area: 'Uttara Sector 7 Crossing',
      hazard: 'Snapped Overhead Electric Wire Shielded',
      tag: 'DESCO Response Completed',
      badge: '✓ RESOLVED',
      color: 'border-safety/50 bg-safety/10 text-safety',
      coords: '23.8759° N, 90.3795° E',
      confirmations: 24
    },
    {
      area: 'Mohammadpur Townhall',
      hazard: 'Open High-Risk Drain Pit Covered',
      tag: 'Community Guard Verified',
      badge: '✓ SAFEGUARDED',
      color: 'border-teal-400/50 bg-teal-400/10 text-teal-300',
      coords: '23.7658° N, 90.3582° E',
      confirmations: 15
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHazardIndex((prev) => (prev + 1) % liveDhakaAlerts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [liveDhakaAlerts.length]);

  const currentAlert = liveDhakaAlerts[activeHazardIndex];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#071320] via-navy to-navy-dark text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Animated Subtle High-Tech Grid & Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
      
      {/* Ambient Cyber Luminous Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-safety/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-emergency/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Trust Pill with Rotating Alert */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner transition-all">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-safety opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-safety"></span>
              </span>
              <span className="text-xs font-bold text-slate-200 tracking-wide">
                Community-Powered • AI-Assisted • Location-Aware
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-safety/20 text-safety border border-safety/30 hidden sm:inline">
                Dhaka Live Mesh
              </span>
            </div>

            {/* Main Punchy Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              {t.hero.titleLine1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-safety via-emerald-400 to-teal-300 drop-shadow-[0_0_25px_rgba(24,165,88,0.4)]">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/report/new"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emergency hover:bg-emergency-hover text-white text-base font-extrabold px-8 py-4 rounded-2xl shadow-emergency transition-all transform hover:-translate-y-0.5 active:translate-y-0 group border border-emergency/50"
              >
                <span className="text-lg">🚨</span>
                <span>{t.hero.primaryCta}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/map"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-base font-bold px-7 py-4 rounded-2xl backdrop-blur-md transition-all hover:border-safety/40 shadow-lg"
              >
                <span className="text-lg">🗺️</span>
                <span>{t.hero.secondaryCta}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-300" />
              </Link>
            </div>

            {/* Dynamic Live Ticker Card */}
            <div className="pt-2">
              <div className={`p-4 rounded-2xl border ${currentAlert.color} backdrop-blur-md transition-all duration-500 text-left flex items-center justify-between gap-4 shadow-lg`}>
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black tracking-wider uppercase">
                        {currentAlert.badge}
                      </span>
                      <span className="text-[11px] text-slate-300 font-mono">
                        {currentAlert.area}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-extrabold text-white truncate">
                      {currentAlert.hazard}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-right shrink-0">
                  <span className="text-[10px] text-slate-300 block">{currentAlert.tag}</span>
                  <span className="text-xs font-black text-white">
                    👥 {currentAlert.confirmations} confirmed
                  </span>
                </div>
              </div>
            </div>

            {/* Live Ticker Metrics */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
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
                <Users className="w-4 h-4 text-amber-400" />
                <span>
                  <strong className="text-white font-bold">4,521+</strong> {language === 'en' ? 'Community Guardians' : 'সচেতন নাগরিক'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Stylized Cyber Bangladesh Safety Radar Map Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Cyber Glow Ring */}
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-safety via-sky-500 to-emergency opacity-30 blur-xl animate-tilt" />

              {/* Glass Card Container */}
              <div className="relative rounded-3xl bg-navy-light/80 border border-white/20 p-6 backdrop-blur-2xl shadow-2xl overflow-hidden">
                
                {/* Header of Visual */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emergency"></span>
                    </span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                      Dhaka City Hazard Radar
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-safety bg-safety/20 px-2.5 py-0.5 rounded-full border border-safety/30 shadow-2xs">
                    Live Mesh 24/7
                  </span>
                </div>

                {/* Stylized Map Viewport with Animated Radar Sweeper */}
                <div className="relative h-72 sm:h-80 w-full my-4 rounded-2xl bg-[#071320] overflow-hidden border border-white/10 flex items-center justify-center">
                  
                  {/* Subtle Map Grid lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="radar-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#radar-grid)" />
                    {/* Concentric Radar Rings */}
                    <circle cx="50%" cy="50%" r="50" fill="none" stroke="#18A558" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="100" fill="none" stroke="#18A558" strokeWidth="0.8" opacity="0.6" />
                    <circle cx="50%" cy="50%" r="140" fill="none" stroke="#18A558" strokeWidth="0.5" opacity="0.4" />
                  </svg>

                  {/* Animated Radar Sweep Cone */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div 
                      className="w-72 h-72 rounded-full border border-safety/30 origin-center animate-spin"
                      style={{ 
                        animationDuration: '7s',
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(24, 165, 88, 0.25) 360deg)'
                      }}
                    />
                  </div>

                  {/* Stylized Bangladesh Dhaka Outline Path */}
                  <div className="relative w-48 h-48 opacity-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-500 fill-slate-800/80 stroke-slate-600 stroke-[1.5]">
                      <polygon points="50,10 70,25 85,50 75,80 50,90 25,80 15,50 30,25" />
                      <circle cx="50" cy="50" r="16" fill="#142C44" stroke="#60A5FA" strokeWidth="1" />
                    </svg>
                  </div>

                  {/* Glowing Animated Markers */}
                  {/* Mirpur - Road Hazard */}
                  <div className="absolute top-[32%] left-[36%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
                    <span className="absolute -inset-2 rounded-full bg-emergency/40 animate-ping" />
                    <div className="relative w-6 h-6 rounded-full bg-emergency text-white flex items-center justify-center text-xs font-black shadow-emergency">
                      !
                    </div>
                    <div className="absolute left-7 -top-2 whitespace-nowrap bg-navy-dark/95 border border-white/20 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg pointer-events-none backdrop-blur-md">
                      <span className="font-bold text-amber-400">Mirpur:</span> Road Cave-in
                    </div>
                  </div>

                  {/* Uttara - Sparking Cable */}
                  <div className="absolute top-[16%] left-[54%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
                    <span className="absolute -inset-2 rounded-full bg-emergency/30 animate-ping-slow" />
                    <div className="relative w-5 h-5 rounded-full bg-emergency text-white flex items-center justify-center text-[10px] font-black">
                      ⚡
                    </div>
                    <div className="absolute left-6 -top-2 whitespace-nowrap bg-navy-dark/95 border border-white/20 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg pointer-events-none backdrop-blur-md">
                      <span className="font-bold text-red-400">Uttara:</span> Live Cable
                    </div>
                  </div>

                  {/* Dhanmondi - Waterlogging (Resolved) */}
                  <div className="absolute top-[58%] left-[42%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
                    <div className="relative w-5 h-5 rounded-full bg-safety text-white flex items-center justify-center text-[10px] font-black shadow-glow">
                      ✓
                    </div>
                    <div className="absolute left-6 -top-2 whitespace-nowrap bg-navy-dark/95 border border-white/20 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg pointer-events-none backdrop-blur-md">
                      <span className="font-bold text-safety">Dhanmondi:</span> Drain Cleared
                    </div>
                  </div>

                  {/* Motijheel - Open Manhole */}
                  <div className="absolute top-[68%] left-[64%] -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10">
                    <div className="relative w-5 h-5 rounded-full bg-warning text-navy flex items-center justify-center text-[10px] font-black shadow-sm">
                      ⚠️
                    </div>
                    <div className="absolute right-6 -top-2 whitespace-nowrap bg-navy-dark/95 border border-white/20 text-white text-[11px] px-2.5 py-1 rounded-lg shadow-lg pointer-events-none backdrop-blur-md">
                      <span className="font-bold text-yellow-300">Motijheel:</span> Open Manhole
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
                      <p className="text-xs font-bold text-white">AI Vision & Automated Triage</p>
                      <p className="text-[11px] text-slate-300">94.8% hazard classification accuracy</p>
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
