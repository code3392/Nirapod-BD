'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Eye, 
  Globe2, 
  Users2, 
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function AboutUsSection() {
  const { language } = useApp();

  return (
    <section id="about-us" className="py-24 bg-transparent text-white relative overflow-hidden">
      {/* Background Subtle Tech Matrix & Glowing Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/12 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {language === 'en' ? 'Building a Safer, Cleaner Bangladesh Together' : 'একটি নিরাপদ ও আধুনিক বাংলাদেশের প্রত্যয়ে'}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            {language === 'en'
              ? 'Nirapod BD is Bangladesh’s flagship community-powered safety and civic reporting ecosystem. We unite proactive citizens, local volunteers, and municipal authorities through computer vision AI and verifiable real-time action.'
              : 'নিরাপদ বিডি বাংলাদেশের একটি অগ্রগামী নাগরিক নিরাপত্তা ও সমস্যা সমাধান প্ল্যাটফর্ম। এটি সচেতন নাগরিক, স্বেচ্ছাসেবক এবং সিটি কর্পোরেশন ও সেবা সংস্থাসমূহকে এআই ও স্বচ্ছ প্রমাণের মাধ্যমে সংযুক্ত করে।'}
          </p>
        </div>

        {/* 3 Core Ethical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 sm:p-8 rounded-3xl bg-[#130C24]/85 border border-white/10 backdrop-blur-xl hover:border-purple-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-300 flex items-center justify-center font-bold border border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.2)] group-hover:scale-110 transition-transform">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white group-hover:text-sky-300 transition-colors">Community-Powered</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every civic issue is backed by peer verification from neighbors living in the same ward, eliminating fake reporting and elevating critical priorities.
            </p>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#130C24]/85 border border-white/10 backdrop-blur-xl hover:border-purple-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/15 text-blue-300 flex items-center justify-center font-bold border border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.2)] group-hover:scale-110 transition-transform">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white group-hover:text-sky-300 transition-colors">AI-Assisted Triage</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automated computer vision detects pavement potholes, live electrical sparks, and toxic waste, generating objective hazard severity recommendations in seconds.
            </p>
          </div>

          <div className="p-7 sm:p-8 rounded-3xl bg-[#130C24]/85 border border-white/10 backdrop-blur-xl hover:border-purple-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 space-y-4 group">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 text-sky-400 flex items-center justify-center font-bold border border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.2)] group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white group-hover:text-sky-300 transition-colors">Strict Accountability</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under Rule 25, once authorities mark work complete, citizens verify resolution with before & after photographic evidence to guarantee genuine outcomes.
            </p>
          </div>
        </div>

        {/* Root Platform Authority Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0E081B] via-[#130C24] to-[#0E081B] border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl ring-1 ring-sky-500/15">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/15 text-sky-400 border border-sky-400/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Super Admin Authority
                </span>
                <span className="text-xs font-mono text-slate-300">smdsami59@gmail.com</span>
              </div>
              <p className="text-sm font-bold text-white">
                {language === 'en' ? 'Direct Platform Ownership & Moderation Protocol' : 'প্ল্যাটফর্ম সার্বিক তত্ত্বাবধান ও সমন্বয়'}
              </p>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Independent Civic Non-Profit Technology Initiative for Bangladesh' : 'বাংলাদেশের জন্য একটি স্বাধীন অলাভজনক সামাজিক প্রযুক্তি উদ্যোগ'}
              </p>
            </div>
          </div>

          <Link
            href="/community"
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-black text-xs uppercase tracking-wider transition transform hover:scale-105 shadow-[0_0_20px_rgba(56,189,248,0.35)] shrink-0 flex items-center gap-2"
          >
            <span>{language === 'en' ? 'Join Community Hub' : 'কমিউনিটি হাবে যোগ দিন'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
