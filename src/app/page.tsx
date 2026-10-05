'use client';

import React from 'react';
import Hero from '@/components/home/Hero';
import LiveStatistics from '@/components/home/LiveStatistics';
import HowItWorks from '@/components/home/HowItWorks';
import MapPreviewSection from '@/components/home/MapPreviewSection';
import PartnershipShowcase from '@/components/home/PartnershipShowcase';
import AboutUsSection from '@/components/home/AboutUsSection';
import MovingTickerSection from '@/components/home/MovingTickerSection';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ArrowRight, PhoneCall, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  const { language, t } = useApp();

  return (
    <div className="space-y-0">
      {/* 1. Impressive Hero Section with Dhaka Sentinel Radar */}
      <Hero />

      {/* 2. Live Safety Statistics (Authentic Community Mesh Counts) */}
      <LiveStatistics />

      {/* 3. Live Safety Map Preview Section */}
      <MapPreviewSection />

      {/* 4. 5-Step Civic Reporting Workflow */}
      <HowItWorks />

      {/* 5. Public Safety Partnership Showcase (Official 999, DNCC, DSCC, WASA, DESCO) */}
      <PartnershipShowcase />

      {/* 6. Community Action Callout with Modern SVG Cyber Mesh */}
      <section className="py-20 bg-transparent border-t border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#0E081B] text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/15 group">
            
            {/* Pure CSS/SVG Background Grid (Zero stock photos) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.25),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px] pointer-events-none" />

            <div className="space-y-3.5 max-w-xl text-center lg:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-civic-blue/20 text-sky-300 border border-civic-blue/30 text-xs font-black uppercase tracking-wider backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                <span>Take Collective Action</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {language === 'en'
                  ? 'Ready to make your neighborhood safer?'
                  : 'আপনার এলাকাকে আরও নিরাপদ করতে প্রস্তুত?'}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {language === 'en'
                  ? 'Join verified citizens across Dhaka. Report hazards, verify neighborhood alerts, and collaborate directly with municipal services.'
                  : 'ঢাকার সচেতন নাগরিকদের সাথে যোগ দিন। সমস্যা চিহ্নিত করুন, তথ্য যাচাই করুন এবং কর্তৃপক্ষের সাথে সমন্বয় করুন।'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto relative z-10">
              <Link
                href="/report/new"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emergency hover:bg-emergency-hover text-white font-extrabold text-sm text-center shadow-emergency transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] active:translate-y-0 flex items-center justify-center gap-2 border border-emergency/50"
              >
                <span>🚨 {t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/map"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm text-center border border-white/25 hover:border-sky-400/50 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
              >
                {t.hero.secondaryCta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Authentic About Us Section */}
      <AboutUsSection />

      {/* 8. Moving Text Blocks (Continuous Sentinel Stream) */}
      <MovingTickerSection />
    </div>
  );
}
