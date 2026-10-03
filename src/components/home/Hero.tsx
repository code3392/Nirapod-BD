'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Radio, 
  MapPin, 
  CheckCircle2, 
  Zap, 
  Sparkles,
  Play
} from 'lucide-react';

export default function Hero() {
  const { language, t } = useApp();

  const column1Media = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', label: 'Dhaka Traffic Mesh' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80', label: 'Road Repair Triage' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80', label: 'Drainage Restoration' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', label: 'Dhaka Traffic Mesh' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80', label: 'Road Repair Triage' },
  ];

  const column2Media = [
    { type: 'image', src: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80', label: 'Asphalt Compaction' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80', label: 'Citizen Consensus' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80', label: 'Streetlight Patrol' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=600&q=80', label: 'Asphalt Compaction' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80', label: 'Citizen Consensus' },
  ];

  const column3Media = [
    { type: 'video', src: '/videos/hero-traffic.webm', poster: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', label: 'Live Traffic Reel' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=600&q=80', label: 'First Aid Rescue' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', label: 'Municipal Action' },
    { type: 'video', src: '/videos/hero-traffic.webm', poster: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80', label: 'Live Traffic Reel' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?auto=format&fit=crop&w=600&q=80', label: 'First Aid Rescue' },
  ];

  return (
    <section className="relative min-h-[100svh] lg:h-[100svh] lg:min-h-[660px] w-full border-b border-white/10 bg-[#071320] flex flex-col lg:grid lg:grid-cols-[0.95fr_1.05fr] overflow-hidden text-white">
      {/* Background Subtle Gradient & Grid Texture (findit.works aesthetic) */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,#071320_0%,#091b2e_55%,#050e18_100%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:64px_64px] pointer-events-none" />

      {/* LEFT COLUMN: Giant Editorial Typography & Actions */}
      <div className="relative flex min-h-0 flex-col justify-center px-4 pt-20 pb-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16 lg:h-full z-10">
        
        {/* Top Civic Status Pill */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-sky-300 backdrop-blur-md w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emergency opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emergency"></span>
          </span>
          <span>Bangladesh Civic Network</span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">• 24/7 Mesh</span>
        </div>

        {/* Giant findit.works Style Display Title */}
        <h1 className="max-w-[720px] font-display text-[clamp(3rem,8.5vw,6.5rem)] font-black leading-[0.84] tracking-[-0.075em] text-white">
          NIRAPOD<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
            BD.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:mt-5 sm:text-base sm:leading-7 font-normal">
          {language === 'en'
            ? 'See a problem. Report it. Help your community solve it. Nirapod BD unites proactive citizens, computer vision triage, and municipal responders across Bangladesh.'
            : 'সমস্যা দেখুন। রিপোর্ট করুন। এলাকাবাসীর সাথে সমাধান করুন। নিরাপদ বিডি নাগরিকদের সক্রিয় অংশগ্রহণ ও কর্তৃপক্ষের সমন্বয়ে একটি নিরাপদ বাংলাদেশ গড়ে তোলে।'}
        </p>

        {/* Primary & Secondary Action Buttons (findit.works style) */}
        <div className="mt-6 flex flex-col min-[420px]:flex-row flex-wrap gap-3">
          <Link
            href="/report/new"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-[0.97] shadow-lg text-base h-12 w-full min-[420px]:w-auto rounded-xl bg-emergency hover:bg-emergency-hover px-7 font-extrabold text-white border border-emergency/50 group"
          >
            <span>🚨 {t.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/map"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-[0.97] border shadow-sm text-base h-12 w-full min-[420px]:w-auto rounded-xl border-white/25 bg-white/[0.04] px-7 font-semibold text-white hover:bg-white/10 hover:border-sky-400/50 backdrop-blur-md"
          >
            <span>{t.hero.secondaryCta}</span>
            <ArrowUpRight className="w-4 h-4 ml-1 text-slate-300" />
          </Link>
        </div>

        {/* 3-Column Metrics Ribbon (findit.works signature component) */}
        <div className="mt-8 grid max-w-xl grid-cols-3 border-y border-white/10">
          <div className="border-r border-white/10 py-3 sm:py-4 px-2 sm:px-4">
            <p className="truncate text-xs sm:text-sm font-black text-white">Verified</p>
            <p className="mt-0.5 sm:mt-1 truncate text-[9px] sm:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.16em] text-sky-400 font-mono">
              CITIZEN AUDITED
            </p>
          </div>

          <div className="border-r border-white/10 py-3 sm:py-4 px-2 sm:px-4">
            <p className="truncate text-xs sm:text-sm font-black text-white">54 Wards</p>
            <p className="mt-0.5 sm:mt-1 truncate text-[9px] sm:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.16em] text-slate-400 font-mono">
              DHAKA LIVE MESH
            </p>
          </div>

          <div className="py-3 sm:py-4 px-2 sm:px-4">
            <p className="truncate text-xs sm:text-sm font-black text-white">Toll-Free 999</p>
            <p className="mt-0.5 sm:mt-1 truncate text-[9px] sm:text-[11px] uppercase tracking-[0.08em] sm:tracking-[0.16em] text-red-400 font-mono">
              EMERGENCY PROTOCOL
            </p>
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: 3 Parallel Vertical Continuous Kinetic Scrollers (findit.works signature) */}
      <div className="relative h-[340px] sm:h-[440px] lg:h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10 lg:min-h-0 bg-[#050e18] group/scroller">
        
        {/* Subtle dark gradient overlay on top & bottom for smooth fade */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050e18] to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050e18] to-transparent z-20 pointer-events-none" />

        <div className="relative flex h-full gap-2 sm:gap-3.5 overflow-hidden p-3 sm:p-5 lg:p-6">
          
          {/* Column 1: Scrolling UP */}
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="flex w-full flex-col animate-scroll-up group-hover/scroller:[animation-play-state:paused]">
              {column1Media.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative mb-2.5 sm:mb-3 aspect-[0.78] shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/5 group"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="text-[10px] font-bold text-white block truncate">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Scrolling DOWN */}
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="flex w-full flex-col animate-scroll-down group-hover/scroller:[animation-play-state:paused]">
              {column2Media.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative mb-2.5 sm:mb-3 aspect-[0.78] shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/5 group"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <span className="text-[10px] font-bold text-sky-300 block truncate">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Scrolling UP with Looping Videos */}
          <div className="relative min-w-0 flex-1 overflow-hidden hidden sm:block">
            <div className="flex w-full flex-col animate-scroll-up-fast group-hover/scroller:[animation-play-state:paused]">
              {column3Media.map((item, idx) => (
                <div 
                  key={idx} 
                  className="relative mb-2.5 sm:mb-3 aspect-[0.78] shrink-0 overflow-hidden rounded-xl border border-white/15 bg-white/5 group"
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      poster={item.poster}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.label}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white block truncate">{item.label}</span>
                    {item.type === 'video' && (
                      <span className="w-2 h-2 rounded-full bg-emergency animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
