'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Users, 
  ChevronRight, 
  ArrowUpRight,
  CheckCircle2,
  Radio,
  Zap,
  Play,
  Pause,
  Eye,
  Camera,
  Layers,
  Volume2,
  VolumeX
} from 'lucide-react';

export default function Hero() {
  const { language, t, reports } = useApp();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const emergencyCount = reports.filter(r => r.severity === 'emergency').length;
  const verifiedCount = reports.filter(r => r.status === 'VERIFIED' || r.status === 'RESOLVED').length;

  // Active rotating highlight index
  const [activeHazardIndex, setActiveHazardIndex] = useState(0);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  const liveDhakaAlerts = [
    {
      id: 0,
      area: 'Mirpur Road (Sec 10)',
      hazard: 'Severe Road Cave-In & Gridlock',
      tag: 'Verified • High Priority',
      badge: '🚨 CRITICAL',
      color: 'border-emergency/50 bg-emergency/15 text-emergency',
      coords: '23.8041° N, 90.3667° E',
      confirmations: 19,
      image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
      time: '18m ago',
      category: 'Road Hazard',
      pos: { top: '32%', left: '36%' },
      icon: '!'
    },
    {
      id: 1,
      area: 'Uttara Sector 7 Crossing',
      hazard: 'Live Overhead 11kV Wire Shielded',
      tag: 'DESCO Response Completed',
      badge: '⚡ LIVE HAZARD',
      color: 'border-red-500/50 bg-red-500/15 text-red-300',
      coords: '23.8759° N, 90.3795° E',
      confirmations: 24,
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
      time: '32m ago',
      category: 'Electrical Hazard',
      pos: { top: '18%', left: '54%' },
      icon: '⚡'
    },
    {
      id: 2,
      area: 'Dhanmondi Lake 27',
      hazard: 'Stormwater Culvert Clearing Underway',
      tag: 'In Progress • Municipal Team',
      badge: '⚡ ACTIVE DISPATCH',
      color: 'border-amber-500/50 bg-amber-500/15 text-amber-400',
      coords: '23.7538° N, 90.3752° E',
      confirmations: 12,
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80',
      time: '45m ago',
      category: 'Waterlogging',
      pos: { top: '58%', left: '42%' },
      icon: '💧'
    },
    {
      id: 3,
      area: 'Mohammadpur Townhall',
      hazard: 'Open High-Risk Drain Pit Covered',
      tag: 'Community Guard Verified',
      badge: '✓ SAFEGUARDED',
      color: 'border-civic-blue/50 bg-civic-blue/15 text-sky-300',
      coords: '23.7658° N, 90.3582° E',
      confirmations: 15,
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80',
      time: '1h ago',
      category: 'Infrastructure',
      pos: { top: '68%', left: '64%' },
      icon: '✓'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHazardIndex((prev) => (prev + 1) % liveDhakaAlerts.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [liveDhakaAlerts.length]);

  const toggleVideoPlayback = () => {
    if (!videoRef.current) return;
    if (isVideoPlaying) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    } else {
      videoRef.current.play();
      setIsVideoPlaying(true);
    }
  };

  const currentAlert = liveDhakaAlerts[activeHazardIndex];
  const activeDisplayAlert = hoveredMarker !== null ? liveDhakaAlerts[hoveredMarker] : currentAlert;

  return (
    <section className="relative overflow-hidden bg-[#06121E] text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* 1. Cinematic Background Video Layer (Traffic & Civic Atmosphere) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-35 filter brightness-110 contrast-125 transition-opacity duration-1000"
        >
          <source src="/videos/hero-traffic.webm" type="video/webm" />
          <source src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Cars_Passing_by_at_Night.webm" type="video/webm" />
        </video>
        {/* Deep Civic Navy Gradient Vignette for Razor-Sharp Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06121E] via-[#081e35]/85 to-[#06121E]/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#06121E]/60 to-[#06121E]" />
      </div>

      {/* 2. Background Animated High-Tech Grid & Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d_1px,transparent_1px),linear-gradient(to_bottom,#1f293d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none z-1" />
      
      {/* 3. Ambient Cyber Luminous Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-civic-blue/25 rounded-full blur-[110px] pointer-events-none animate-pulse z-1" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse z-1" style={{ animationDuration: '6s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Floating Civic Status Bar with Video Controller & Audio Wave */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emergency"></span>
            </span>
            <span className="font-extrabold uppercase tracking-widest text-[11px] text-white flex items-center gap-1.5">
              <span>Dhaka Civic Sentinel</span>
              <span className="px-2 py-0.5 rounded bg-emergency/20 text-red-300 font-mono text-[10px]">LIVE FEED</span>
            </span>
            <span className="hidden sm:inline text-slate-400 font-mono text-[11px]">
              GPS: 23.8103° N, 90.4125° E
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Audio Waveform Simulation */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
              <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span className="text-[11px] font-mono text-slate-300">142.8 MHz Dispatch:</span>
              <div className="flex items-center gap-0.5 h-5 px-1">
                <span className="w-1 bg-sky-400 rounded-full audio-bar-1 inline-block" />
                <span className="w-1 bg-blue-400 rounded-full audio-bar-2 inline-block" />
                <span className="w-1 bg-sky-300 rounded-full audio-bar-3 inline-block" />
                <span className="w-1 bg-blue-500 rounded-full audio-bar-4 inline-block" />
                <span className="w-1 bg-sky-400 rounded-full audio-bar-5 inline-block" />
              </div>
            </div>

            {/* Video Motion Controller */}
            <button
              onClick={toggleVideoPlayback}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-[11px] font-bold transition backdrop-blur-md active:scale-95"
              title={isVideoPlaying ? 'Pause ambient video' : 'Play ambient video'}
            >
              {isVideoPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-sky-300" />
                  <span>Pause Motion</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 fill-sky-300 text-sky-300" />
                  <span>Play Motion</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Subtitle & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Live Trust Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner transition-all hover:border-civic-blue/50">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-civic-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-civic-blue"></span>
              </span>
              <span className="text-xs font-bold text-slate-200 tracking-wide">
                Community-Powered • AI-Assisted • Location-Aware
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-civic-blue/20 text-blue-300 border border-civic-blue/30 hidden sm:inline">
                Real-Time Network
              </span>
            </div>

            {/* Main Punchy Heading with Gradient Shimmer */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              {t.hero.titleLine1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200 drop-shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* CTAs with Elevated Hover Transitions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/report/new"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emergency hover:bg-emergency-hover text-white text-base font-extrabold px-8 py-4 rounded-2xl shadow-emergency transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_35px_rgba(220,38,38,0.45)] active:translate-y-0 group border border-emergency/50"
              >
                <span className="text-lg">🚨</span>
                <span>{t.hero.primaryCta}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                href="/map"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/25 hover:border-civic-blue/50 text-white text-base font-bold px-7 py-4 rounded-2xl backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-glow"
              >
                <span className="text-lg">🗺️</span>
                <span>{t.hero.secondaryCta}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-300" />
              </Link>
            </div>

            {/* Dynamic Live Ticker Card with Photo Preview */}
            <div className="pt-2">
              <div className={`p-4 rounded-2xl border ${activeDisplayAlert.color} backdrop-blur-md transition-all duration-500 text-left flex items-center justify-between gap-4 shadow-xl hover:border-white/30`}>
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/20">
                    <img 
                      src={activeDisplayAlert.image} 
                      alt={activeDisplayAlert.hazard} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    />
                    <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-emergency animate-pulse" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-white/10">
                        {activeDisplayAlert.badge}
                      </span>
                      <span className="text-[11px] text-slate-300 font-mono">
                        {activeDisplayAlert.area}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-extrabold text-white truncate">
                      {activeDisplayAlert.hazard}
                    </p>
                    <p className="text-[11px] text-slate-300">
                      {activeDisplayAlert.time} • GPS: {activeDisplayAlert.coords}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block text-right shrink-0">
                  <span className="text-[10px] text-slate-300 block">{activeDisplayAlert.tag}</span>
                  <span className="text-xs font-black text-white">
                    👥 {activeDisplayAlert.confirmations} confirmed
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
                <CheckCircle2 className="w-4 h-4 text-civic-blue" />
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

          {/* Right Column: Interactive Cyber Bangladesh Safety Radar Map Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Cyber Glow Ring */}
              <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-r from-civic-blue via-sky-500 to-blue-700 opacity-40 blur-xl animate-pulse" />

              {/* Glass Card Container */}
              <div className="relative rounded-3xl bg-[#091C30]/90 border border-white/20 p-6 backdrop-blur-2xl shadow-2xl overflow-hidden">
                
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
                  <span className="text-[10px] font-mono font-bold text-blue-300 bg-civic-blue/20 px-2.5 py-0.5 rounded-full border border-civic-blue/30 shadow-2xs">
                    Live Mesh 24/7
                  </span>
                </div>

                {/* Stylized Map Viewport with Animated Radar Sweeper */}
                <div className="relative h-72 sm:h-80 w-full my-4 rounded-2xl bg-[#05111D] overflow-hidden border border-white/10 flex items-center justify-center">
                  
                  {/* Subtle Map Grid lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="radar-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#radar-grid)" />
                    {/* Concentric Radar Rings */}
                    <circle cx="50%" cy="50%" r="50" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="50%" cy="50%" r="100" fill="none" stroke="#3B82F6" strokeWidth="0.8" opacity="0.6" />
                    <circle cx="50%" cy="50%" r="140" fill="none" stroke="#3B82F6" strokeWidth="0.5" opacity="0.4" />
                  </svg>

                  {/* Animated Radar Sweep Cone */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div 
                      className="w-72 h-72 rounded-full border border-civic-blue/30 origin-center animate-radar-sweep"
                      style={{ 
                        background: 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(37, 99, 235, 0.28) 360deg)'
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

                  {/* Interactive Glowing Animated Markers with Hover Card */}
                  {liveDhakaAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      onMouseEnter={() => setHoveredMarker(alert.id)}
                      onMouseLeave={() => setHoveredMarker(null)}
                      onClick={() => setHoveredMarker(alert.id)}
                      style={{ top: alert.pos.top, left: alert.pos.left }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                    >
                      <span className={`absolute -inset-2 rounded-full animate-ping ${alert.id === 0 || alert.id === 1 ? 'bg-emergency/40' : 'bg-civic-blue/40'}`} />
                      <div className={`relative w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shadow-lg transition-transform duration-300 group-hover:scale-125 ${
                        alert.id === 0 ? 'bg-emergency text-white shadow-emergency' :
                        alert.id === 1 ? 'bg-orange-600 text-white' :
                        alert.id === 2 ? 'bg-amber-500 text-navy' :
                        'bg-civic-blue text-white shadow-glow'
                      }`}>
                        {alert.icon}
                      </div>

                      {/* Tooltip on Hover */}
                      <div className="absolute left-7 -top-6 whitespace-nowrap bg-[#06121E]/95 border border-white/20 text-white text-[11px] p-2 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-md flex items-center gap-2 z-30">
                        <img src={alert.image} alt={alert.area} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-white text-[11px] leading-tight">{alert.area}</p>
                          <p className="text-[10px] text-sky-300 font-mono">{alert.hazard}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Card Summary */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-civic-blue/20 text-blue-300 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">AI Vision & Automated Triage</p>
                      <p className="text-[11px] text-slate-300">94.8% hazard classification accuracy</p>
                    </div>
                  </div>
                  <Link
                    href="/map"
                    className="text-xs font-bold text-sky-300 hover:text-white inline-flex items-center gap-1 transition"
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
