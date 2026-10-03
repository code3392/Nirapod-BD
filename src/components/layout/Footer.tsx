'use client';

import React from 'react';
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
  Lock 
} from 'lucide-react';

export default function Footer() {
  const { language, t } = useApp();

  return (
    <footer className="bg-navy text-white pt-16 pb-10 border-t border-navy-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Emergency Triage Callout Banner */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emergency/25 via-emergency/15 to-transparent border border-emergency/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emergency flex items-center justify-center shrink-0 shadow-emergency">
              <PhoneCall className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded bg-emergency text-white tracking-wider">
                  Emergency Notice
                </span>
                <h3 className="text-lg font-bold text-white">
                  {language === 'en' ? 'Is Someone In Immediate Life Danger?' : 'কেউ কি সরাসরি জীবন বিপন্ন পরিস্থিতিতে আছেন?'}
                </h3>
              </div>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                {language === 'en'
                  ? 'Nirapod BD is a community civic reporting tool and CANNOT dispatch police, fire brigades, or ambulances. For immediate emergency response, call 999 directly.'
                  : 'নিরাপদ বিডি একটি নাগরিক সমস্যা জানানোর প্ল্যাটফর্ম এবং এটি সরাসরি পুলিশ বা অ্যাম্বুলেন্স প্রেরণ করে না। তাত্ক্ষণিক বিপদে ৯৯৯ নম্বরে সরাসরি কল করুন।'}
              </p>
            </div>
          </div>

          <a
            href="tel:999"
            className="shrink-0 inline-flex items-center gap-2 bg-emergency hover:bg-emergency-hover text-white font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition-transform hover:scale-105 active:scale-95 text-base"
          >
            <PhoneCall className="w-5 h-5" />
            <span>{language === 'en' ? 'Dial Emergency 999' : 'জরুরি সেবা ৯৯৯ কল করুন'}</span>
          </a>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-navy-light/60">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-navy-light flex items-center justify-center border border-navy-subtle">
                <ShieldAlert className="w-6 h-6 text-civic-blue" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Nirapod BD
              </span>
            </Link>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t.brand.tagline}
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-civic-blue" />
                Community Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-civic-blue" />
                Privacy Protected
              </span>
            </div>

            <div className="pt-2 text-xs text-slate-400">
              <p className="font-medium text-slate-300">
                {language === 'en' ? 'Community Safety Initiative for Bangladesh' : 'বাংলাদেশের জন্য নাগরিক নিরাপত্তা উদ্যোগ'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                Dhaka North & South City Corporation area monitoring active
              </p>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
              {language === 'en' ? 'Platform' : 'প্ল্যাটফর্ম'}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/" className="hover:text-civic-blue transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-civic-blue transition-colors flex items-center gap-1.5">
                  <span>{t.nav.safetyMap}</span>
                  <span className="text-[10px] bg-emergency px-1.5 py-0.2 rounded-full text-white font-bold">
                    Live
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-civic-blue transition-colors">
                  {t.nav.reports}
                </Link>
              </li>
              <li>
                <Link href="/#how-it-works" className="hover:text-civic-blue transition-colors">
                  {t.nav.howItWorks}
                </Link>
              </li>
              <li>
                <Link href="/organization" className="hover:text-civic-blue transition-colors">
                  {t.nav.organizations}
                </Link>
              </li>
            </ul>
          </div>

          {/* Civic Governance & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
              {language === 'en' ? 'Governance' : 'প্রশাসন ও সংস্থা'}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link href="/admin" className="hover:text-civic-blue transition-colors">
                  {t.nav.admin}
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-civic-blue transition-colors">
                  {language === 'en' ? 'Guardian Profile' : 'নাগরিক প্রোফাইল'}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-civic-blue transition-colors">
                  {language === 'en' ? 'Privacy & Data Protection' : 'গোপনীয়তা নীতি'}
                </Link>
              </li>
              <li>
                <Link href="/report/new" className="text-civic-blue hover:underline font-semibold flex items-center gap-1">
                  <span>{t.nav.reportProblem}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency & Support */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
              {language === 'en' ? 'National Emergency' : 'জরুরি হেল্পলাইন'}
            </h4>
            <div className="p-3.5 rounded-2xl bg-navy-light border border-navy-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Emergency Hotline</span>
                <span className="text-xs font-black text-emergency bg-emergency/20 px-2 py-0.5 rounded-full">
                  999
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Police, Fire Service, Ambulance. Toll-free 24/7 across Bangladesh.
              </p>
              <a
                href="tel:999"
                className="block text-center text-xs font-bold py-1.5 rounded-lg bg-navy hover:bg-navy-dark text-white border border-slate-700 transition"
              >
                Call 999
              </a>
            </div>
            <p className="text-[11px] text-slate-400 italic">
              Women & Child Helpline: <strong className="text-slate-300">109</strong> | National Helpline: <strong className="text-slate-300">333</strong>
            </p>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © 2026 <strong>Nirapod BD</strong>. All rights reserved. Built for civic safety across Bangladesh.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <span className="text-slate-400">
              v1.0.0 Production Ready
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
