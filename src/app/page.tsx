'use client';

import React from 'react';
import Hero from '@/components/home/Hero';
import LiveStatistics from '@/components/home/LiveStatistics';
import CitizenVideoReels from '@/components/home/CitizenVideoReels';
import HowItWorks from '@/components/home/HowItWorks';
import MapPreviewSection from '@/components/home/MapPreviewSection';
import CivicWorksGallery from '@/components/home/CivicWorksGallery';
import PartnershipShowcase from '@/components/home/PartnershipShowcase';
import AboutUsSection from '@/components/home/AboutUsSection';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ShieldCheck, PhoneCall, ArrowRight, CheckCircle2, Users, MapPin } from 'lucide-react';

export default function HomePage() {
  const { language, t } = useApp();

  return (
    <div className="space-y-0">
      {/* 1. Impressive Hero Section */}
      <Hero />

      {/* 2. Live Safety Statistics */}
      <LiveStatistics />

      {/* 3. Citizen Video Incident Reels (Citizen.com style) */}
      <CitizenVideoReels />

      {/* 4. Live Safety Map Preview Section */}
      <MapPreviewSection />

      {/* 5. 5-Step How It Works Section */}
      <HowItWorks />

      {/* 6. Real Civic Works & Drain Clearing Gallery (nirapodbangladesh.org style) */}
      <CivicWorksGallery />

      {/* 7. Public Safety Partnership Showcase (bSafe style) */}
      <PartnershipShowcase />

      {/* 5. Bottom Community Action Callout with High-Impact Photographic Background */}
      <section className="py-20 bg-surface border-t border-surface-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-14 rounded-3xl bg-[#071320] text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/15 group">
            {/* Atmospheric Background Image with Navy Gradient Vignette */}
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=80"
                alt="Dhaka Civic Patrol"
                className="w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#071320] via-[#0A2540]/90 to-[#071320]/95" />
            </div>

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
                  ? 'Join 4,500+ active citizens verifying problems, preventing hazards, and collaborating with local authorities.'
                  : '৪,৫০০-এর বেশি সক্রিয় নাগরিকের সাথে যোগ দিন। সমস্যা চিহ্নিত করুন, তথ্য যাচাই করুন এবং কর্তৃপক্ষের সাথে সমন্বয় করুন।'}
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

      {/* 6. Authentic About Us Section (Requirement 7) */}
      <AboutUsSection />
    </div>
  );
}
