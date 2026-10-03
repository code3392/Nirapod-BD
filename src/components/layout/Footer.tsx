'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ShieldAlert, 
  MapPin, 
  PhoneCall, 
  AlertTriangle, 
  ExternalLink, 
  HeartHandshake, 
  CheckCircle2, 
  Lock,
  Clock,
  Radio
} from 'lucide-react';

export default function Footer() {
  const { language, t } = useApp();
  const [dhakaTime, setDhakaTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Dhaka (Asia/Dhaka)
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setDhakaTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#040914] text-white pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Emergency Triage Callout Banner (Frosted Crimson Glass) */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-500/15 via-red-600/10 to-transparent border border-red-500/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emergency/20 border border-emergency/40 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <PhoneCall className="w-6 h-6 text-red-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-full bg-emergency text-white tracking-wider">
                  Emergency Notice
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {language === 'en' ? 'Is Someone In Immediate Life Danger?' : 'কেউ কি সরাসরি জীবন বিপন্ন পরিস্থিতিতে আছেন?'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                {language === 'en'
                  ? 'Nirapod BD is a community civic reporting platform and CANNOT dispatch police, fire brigades, or ambulances. For immediate physical emergency response, dial 999 directly.'
                  : 'নিরাপদ বিডি একটি নাগরিক সমস্যা জানানোর প্ল্যাটফর্ম এবং এটি সরাসরি পুলিশ বা অ্যাম্বুলেন্স প্রেরণ করে না। তাত্ক্ষণিক বিপদে ৯৯৯ নম্বরে সরাসরি কল করুন।'}
              </p>
            </div>
          </div>

          <a
            href="tel:999"
            className="shrink-0 inline-flex items-center gap-2 bg-emergency hover:bg-emergency-hover text-white font-extrabold px-6 py-3.5 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-transform hover:scale-105 active:scale-95 text-xs uppercase tracking-wider border border-emergency/50"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{language === 'en' ? 'Dial Emergency 999' : 'জরুরি সেবা ৯৯৯ কল করুন'}</span>
          </a>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-blue-700 flex items-center justify-center border border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-2xl tracking-tight text-white">
                Nirapod<span className="text-sky-400">BD</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed">
              {t.brand.tagline}
            </p>

            {/* Dhaka Time & Telemetry Indicator */}
            {dhakaTime && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                <span>Dhaka (UTC+6):</span>
                <span className="text-sky-300 font-bold">{dhakaTime}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-1 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                Community Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-slate-300">
                <Lock className="w-3.5 h-3.5 text-sky-400" />
                Privacy Protected
              </span>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-black tracking-wider text-slate-400">
              {language === 'en' ? 'Platform' : 'প্ল্যাটফর্ম'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link href="/" className="hover:text-sky-400 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                  <span>{t.nav.safetyMap}</span>
                  <span className="text-[9px] font-mono bg-emergency px-1.5 py-0.2 rounded-full text-white font-extrabold animate-pulse">
                    Live
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-sky-400 transition-colors">
                  {t.nav.reports}
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-sky-400 transition-colors">
                  {t.nav.howItWorks}
                </Link>
              </li>
              <li>
                <Link href="/organization" className="hover:text-sky-400 transition-colors">
                  {t.nav.organizations}
                </Link>
              </li>
            </ul>
          </div>

          {/* Civic Governance & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-black tracking-wider text-slate-400">
              {language === 'en' ? 'Governance' : 'প্রশাসন ও সংস্থা'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 font-medium">
              <li>
                <Link href="/admin" className="hover:text-sky-400 transition-colors">
                  {t.nav.admin}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-sky-400 transition-colors">
                  {language === 'en' ? 'Guardian Profile' : 'নাগরিক প্রোফাইল'}
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-sky-400 transition-colors">
                  {language === 'en' ? 'Area Communities' : 'এলাকাভিত্তিক ফোরাম'}
                </Link>
              </li>
              <li>
                <Link href="/lost-and-found" className="hover:text-sky-400 transition-colors">
                  {language === 'en' ? 'Lost & Found' : 'হারানো ও প্রাপ্তি'}
                </Link>
              </li>
              <li>
                <Link href="/report/new" className="text-sky-400 hover:underline font-bold flex items-center gap-1">
                  <span>{t.nav.reportProblem}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase font-black tracking-wider text-slate-400">
              {language === 'en' ? 'National Emergency' : 'জরুরি হেল্পলাইন'}
            </h4>
            <div className="p-4 rounded-2xl bg-[#0A182B] border border-white/10 space-y-2 shadow-glass">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Emergency Hotline</span>
                <span className="text-xs font-mono font-black text-white bg-emergency px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                  999
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Police, Fire Service, Ambulance. Toll-free 24/7 across Bangladesh.
              </p>
              <a
                href="tel:999"
                className="block text-center text-xs font-bold py-2 rounded-xl bg-emergency/15 hover:bg-emergency/25 text-red-300 border border-emergency/30 transition shadow-sm"
              >
                Call 999 Direct
              </a>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              Women & Child: <strong className="text-slate-200">109</strong> | Civic: <strong className="text-slate-200">333</strong>
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <p>
            © 2026 <strong className="text-white">Nirapod BD</strong>. All rights reserved. Civic Safety Network of Bangladesh.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-slate-500">Dhaka North & South Mesh</span>
            <span>•</span>
            <span className="text-sky-400">
              v1.0.0 Production Live
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
