'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  const { language, t } = useApp();

  return (
    <footer className="bg-[#06030E]/80 backdrop-blur-xl text-white pt-16 pb-12 relative overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-12">
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
                <Link href="/map" className="hover:text-sky-400 transition-colors">
                  {t.nav.safetyMap}
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
                <Link href="/about" className="hover:text-sky-400 transition-colors">
                  {language === 'en' ? 'About Us' : 'আমাদের সম্পর্কে'}
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
                  {language === 'en' ? 'Civic Community & Groups' : 'কমিউনিটি ও ব্যক্তিগত গ্রুপ'}
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
            <div className="p-4 rounded-2xl bg-[#130C24] border border-white/10 space-y-2 shadow-glass">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Emergency Hotline</span>
                <span className="text-xs font-mono font-black text-white bg-emergency px-2 py-0.5 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                  999
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Police, Fire Service, Ambulance. Toll-free 24/7 across Bangladesh.
              </p>
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
