'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Radio, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  PhoneCall,
  Search,
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';

export default function Hero() {
  const { language, t } = useApp();
  const [selectedWard, setSelectedWard] = useState<string>('Mirpur');

  const wards = [
    { name: 'Mirpur', area: 'Zone 4', lat: '23.8067° N', lng: '90.3683° E', status: 'Optimal', x: 28, y: 32 },
    { name: 'Uttara', area: 'Zone 1', lat: '23.8759° N', lng: '90.3795° E', status: 'Optimal', x: 38, y: 15 },
    { name: 'Gulshan', area: 'Zone 3', lat: '23.7925° N', lng: '90.4078° E', status: 'Optimal', x: 65, y: 36 },
    { name: 'Dhanmondi', area: 'Zone 2', lat: '23.7461° N', lng: '90.3742° E', status: 'Optimal', x: 36, y: 62 },
    { name: 'Mohammadpur', area: 'Zone 5', lat: '23.7658° N', lng: '90.3584° E', status: 'Optimal', x: 20, y: 52 },
    { name: 'Motijheel', area: 'Zone 6', lat: '23.7330° N', lng: '90.4172° E', status: 'Optimal', x: 72, y: 74 },
  ];

  return (
    <section className="relative min-h-[92svh] w-full bg-transparent flex items-center overflow-hidden text-white py-14 lg:py-20">
      {/* Background Subtle Gradient & Pure CSS Civic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(147,51,234,0.22),rgba(255,255,255,0))]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0E081B]/40 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:64px_64px] pointer-events-none" />

      {/* Floating subtle ambient glow orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT COLUMN: Editorial Typography & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-[clamp(2.5rem,6.2vw,4.85rem)] font-black text-white font-display">
                {language === 'en' ? (
                  <span className="block leading-[1.05] tracking-[-0.03em]">
                    MAKE YOUR<br />
                    COMMUNITY<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                      SAFER.
                    </span>
                  </span>
                ) : (
                  <span className="block font-bengali leading-[1.22] tracking-normal font-extrabold">
                    আপনার এলাকাকে<br />
                    করুন আরও<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                      নিরাপদ।
                    </span>
                  </span>
                )}
              </h1>

              <p className={`max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal ${
                language === 'bn' ? 'font-bengali text-[17px]' : 'tracking-[-0.01em]'
              }`}>
                {language === 'en'
                  ? 'See a problem. Report it. Help your community solve it. Nirapod BD unites proactive citizens, AI-assisted verification, and rapid municipal responders across Bangladesh.'
                  : 'সমস্যা দেখুন। রিপোর্ট করুন। এলাকাবাসীর সাথে সমাধান করুন। নিরাপদ বিডি নাগরিকদের সক্রিয় অংশগ্রহণ, কৃত্রিম বুদ্ধিমত্তা ও স্থানীয় কর্তৃপক্ষের সমন্বয়ে একটি নিরাপদ সমাজ গড়ে তোলে।'}
              </p>
            </div>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col min-[420px]:flex-row flex-wrap gap-3 pt-2">
              <Link
                href="/report/new"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-[0.97] shadow-lg text-base h-12 w-full min-[420px]:w-auto rounded-none bg-emergency hover:bg-emergency-hover px-7 font-extrabold text-white border border-emergency/50 group tracking-[-0.01em]"
              >
                <span>🚨 {t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/map"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-[0.97] border shadow-sm text-base h-12 w-full min-[420px]:w-auto rounded-none border-white/25 bg-white/[0.05] px-7 font-semibold text-white hover:bg-white/10 hover:border-sky-400/50 backdrop-blur-md tracking-[-0.01em]"
              >
                <span>🗺️ {t.hero.secondaryCta}</span>
                <ArrowUpRight className="w-4 h-4 ml-1 text-slate-300" />
              </Link>

              <a
                href="tel:999"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-[0.97] border shadow-sm text-xs h-12 w-full min-[420px]:w-auto rounded-none border-emergency/40 bg-emergency/15 px-4 font-bold text-red-300 hover:bg-emergency/25 backdrop-blur-md font-display"
                title="Immediate Police / Fire / Ambulance Emergency"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emergency" />
                <span>Call 999 Hotline</span>
              </a>
            </div>

          </div>

          {/* RIGHT COLUMN: Dhaka Metropolitan Safety Sentinel Terminal (Pure SVG + Real Telemetry) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl border border-white/15 bg-gradient-to-b from-[#120A24]/90 via-[#0E081B]/95 to-[#06030E] p-5 sm:p-7 backdrop-blur-2xl shadow-2xl space-y-5">
              
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-civic-blue/20 border border-civic-blue/40 flex items-center justify-center text-sky-400">
                    <Activity className="w-4 h-4 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Dhaka Sentinel Radar
                    </h3>
                    <p className="text-[10px] text-slate-400 font-mono">
                      Mesh Grid: ACTIVE • Lat 23.8103° N
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-blue-500/10 text-sky-300 border border-sky-400/30">
                  Live Terminal
                </span>
              </div>

              {/* Radar Graphical Display */}
              <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#05020B] border border-white/10 overflow-hidden flex items-center justify-center">
                {/* Concentric Radar Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border border-sky-500/10" />
                  <div className="w-48 h-48 rounded-full border border-sky-500/15" />
                  <div className="w-32 h-32 rounded-full border border-sky-500/20" />
                  <div className="w-16 h-16 rounded-full border border-sky-500/30" />
                  {/* Crosshair axis */}
                  <div className="absolute w-full h-[1px] bg-sky-500/10" />
                  <div className="absolute h-full w-[1px] bg-sky-500/10" />
                </div>

                {/* Animated Radar Sweep Line */}
                <div 
                  className="absolute inset-0 origin-center pointer-events-none animate-spin"
                  style={{ animationDuration: '8s', animationTimingFunction: 'linear' }}
                >
                  <div className="w-1/2 h-1/2 bg-gradient-to-br from-sky-400/20 via-sky-500/5 to-transparent rounded-tl-full" />
                </div>

                {/* Ward Interactive Nodes */}
                {wards.map((ward) => {
                  const isSelected = selectedWard === ward.name;
                  return (
                    <button
                      key={ward.name}
                      onClick={() => setSelectedWard(ward.name)}
                      style={{ left: `${ward.x}%`, top: `${ward.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-10 transition-transform duration-300"
                    >
                      <div className="relative flex items-center justify-center">
                        <span className={`absolute w-6 h-6 rounded-full transition-all duration-300 ${isSelected ? 'bg-sky-400/30 animate-ping' : 'bg-blue-500/10 group-hover:scale-150'}`} />
                        <div className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${isSelected ? 'bg-sky-400 border-white shadow-[0_0_12px_rgba(56,189,248,0.8)] scale-125' : 'bg-navy border-sky-400/80 group-hover:bg-sky-400'}`}>
                          <div className="w-1 h-1 rounded-full bg-white" />
                        </div>
                      </div>
                      <span className={`absolute top-4 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold whitespace-nowrap px-1.5 py-0.2 rounded transition-colors ${isSelected ? 'bg-sky-400 text-navy' : 'bg-black/70 text-slate-300 group-hover:text-white'}`}>
                        {ward.name}
                      </span>
                    </button>
                  );
                })}

                {/* Center Core Dot */}
                <div className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8] z-20 pointer-events-none" />
              </div>

              {/* Selected Ward Telemetry Readout */}
              {(() => {
                const current = wards.find(w => w.name === selectedWard) || wards[0];
                return (
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-emergency" />
                        <span className="font-extrabold text-white">{current.name}</span>
                        <span className="text-[10px] text-slate-400 font-display">({current.area})</span>
                      </div>
                      <span className="text-[10px] font-display font-bold text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded border border-sky-400/20">
                        {current.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-display tabular-nums text-slate-400 pt-1 border-t border-white/5">
                      <div>GPS: <span className="text-slate-200">{current.lat}, {current.lng}</span></div>
                      <div className="text-right">Threats: <span className="text-sky-300 font-bold">0 Active</span></div>
                    </div>
                  </div>
                );
              })()}

              {/* Guarantee Footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-slate-300 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  Anti-Fraud Moderation Active
                </span>
                <Link href="/map" className="text-sky-400 hover:underline font-bold text-[11px] flex items-center gap-1">
                  <span>Full Map</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
