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

      {/* 5. Bottom Community Action Callout */}
      <section className="py-16 bg-white border-t border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-navy via-navy to-navy-dark text-white relative overflow-hidden shadow-elevated flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-civic-blue/20 text-blue-300 border border-civic-blue/30 inline-block">
                Take Collective Action
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
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

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <Link
                href="/report/new"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emergency hover:bg-emergency-hover text-white font-extrabold text-sm text-center shadow-emergency transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>🚨 {t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/map"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm text-center border border-white/20 transition"
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
