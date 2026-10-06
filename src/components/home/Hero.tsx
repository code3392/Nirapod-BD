'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ArrowRight, 
  LogIn, 
  PhoneCall
} from 'lucide-react';

export default function Hero() {
  const { language, t, user, openAuthModal } = useApp();

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
        <div className="max-w-3xl space-y-6 sm:space-y-8">

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

            <p className={`max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal ${
              language === 'bn' ? 'font-bengali text-[17px]' : 'tracking-[-0.01em]'
            }`}>
              {language === 'en'
                ? 'See a problem. Report it. Help your community solve it. Nirapod BD unites proactive citizens, AI-assisted verification, and rapid municipal responders across Bangladesh.'
                : 'সমস্যা দেখুন। রিপোর্ট করুন। এলাকাবাসীর সাথে সমাধান করুন। নিরাপদ বিডি নাগরিকদের সক্রিয় অংশগ্রহণ, কৃত্রিম বুদ্ধিমত্তা ও স্থানীয় কর্তৃপক্ষের সমন্বয়ে একটি নিরাপদ সমাজ গড়ে তোলে।'}
            </p>
          </div>

          {/* Exactly 2 Action Buttons: Login / Register & Call 999 (Red) */}
          <div className="flex flex-col min-[420px]:flex-row flex-wrap gap-3 pt-2">
            {!user ? (
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-[0.97] border border-white/25 bg-white/10 hover:bg-white/20 text-white font-extrabold text-base h-12 w-full min-[420px]:w-auto px-7 backdrop-blur-md tracking-[-0.01em] shadow-lg"
              >
                <LogIn className="w-4 h-4 text-sky-400" />
                <span>{language === 'en' ? 'Login / Register' : 'লগইন / নিবন্ধন'}</span>
              </button>
            ) : (
              <Link
                href="/report/new"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-[0.97] border border-white/25 bg-white/10 hover:bg-white/20 text-white font-extrabold text-base h-12 w-full min-[420px]:w-auto px-7 backdrop-blur-md tracking-[-0.01em] shadow-lg group"
              >
                <span>{language === 'en' ? 'Report a Problem' : 'রিপোর্ট করুন'}</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            <a
              href="tel:999"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-[0.97] shadow-lg shadow-red-900/40 text-base h-12 w-full min-[420px]:w-auto bg-emergency hover:bg-emergency-hover text-white px-7 font-extrabold border border-emergency/70 tracking-[-0.01em]"
              title="Immediate Police / Fire / Ambulance Emergency (Call 999)"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>{language === 'en' ? 'Call 999' : 'কল করুন ৯৯৯'}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
