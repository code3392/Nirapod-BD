'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldAlert, 
  CheckCircle2, 
  MapPin, 
  PhoneCall, 
  Users, 
  Sparkles, 
  Radio, 
  Flame, 
  Eye, 
  Activity,
  HeartHandshake
} from 'lucide-react';

export default function MovingTickerSection() {
  const { language } = useApp();

  const row1Items = [
    {
      icon: '🚨',
      tag: 'EMERGENCY',
      tagColor: 'bg-red-500/20 text-red-400 border-red-500/30',
      title: language === 'en' ? 'Sub-Second 999 Hotlink' : 'দ্রুততম ৯৯৯ জরুরি সংযোগ',
      desc: language === 'en' ? 'Direct dispatch to DMP & Fire Rescue' : 'ডিএমপি ও ফায়ার সার্ভিসে তাত্ক্ষণিক অ্যালার্ট',
    },
    {
      icon: '🛡️',
      tag: 'COMMUNITY MESH',
      tagColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
      title: language === 'en' ? '12,450+ Verified Guardians' : '১২,৪৫০+ যাচাইকৃত নাগরিক প্রহরী',
      desc: language === 'en' ? 'Active across all 54 wards of Dhaka' : 'ঢাকার ৫৪টি ওয়ার্ডে সার্বক্ষণিক সক্রিয়',
    },
    {
      icon: '⚡',
      tag: 'GEO-RADAR',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      title: language === 'en' ? 'Real-Time Hazard Pinpointing' : 'লাইভ হ্যাজার্ড পিনপয়েন্টিং',
      desc: language === 'en' ? 'Precise street GPS tracking without delays' : 'সরাসরি নিখুঁত জিপিএস ম্যাপিং',
    },
    {
      icon: '🤝',
      tag: 'MUNICIPAL SYNC',
      tagColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      title: language === 'en' ? 'DNCC, DSCC & WASA Escalation' : 'ডিএনসিসি, ডিএসসিসি ও ওয়াসা সংযোগ',
      desc: language === 'en' ? 'Direct escalation to repair work orders' : 'নাগরিক সমস্যা সরাসরি সমাধানকারী সংস্থায়',
    },
    {
      icon: '🔍',
      tag: 'AI VISION',
      tagColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      title: language === 'en' ? 'Automated Risk Categorization' : 'স্বয়ংক্রিয় এআই ঝুঁকি মূল্যায়ন',
      desc: language === 'en' ? 'Instant computer-vision damage scanning' : 'ছবি ও ভিডিও থেকে স্বয়ংক্রিয় ঝুঁকি চিহ্নিতকরণ',
    },
    {
      icon: '🌟',
      tag: 'RESOLUTION',
      tagColor: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      title: language === 'en' ? '94.2% Verified Resolution Rate' : '৯৪.২% যাচাইকৃত সমাধান হার',
      desc: language === 'en' ? 'Over 3,800 civic hazards repaired in 2026' : '২০২৬ সালে ৩,৮০০+ নাগরিক সমস্যা সমাধান',
    },
  ];

  const row2Items = [
    {
      icon: '📢',
      tag: 'SAFETY BROADCAST',
      tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      title: language === 'en' ? 'Instant WhatsApp Citizen Alerts' : 'হোয়াটসঅ্যাপে তাত্ক্ষণিক সতর্কতা',
      desc: language === 'en' ? 'Neighbors receive push alerts within 300m' : '৩০০ মিটারের মধ্যে নাগরিকদের কাছে স্বয়ংক্রিয় মেসেজ',
    },
    {
      icon: '🔒',
      tag: 'ZERO SPAM',
      tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
      title: language === 'en' ? 'Community Consensus Verification' : 'নাগরিক ঐকমত্য যাচাই ব্যবস্থা',
      desc: language === 'en' ? 'Dual-stage citizen checks prevent fake reports' : 'ভুয়া তথ্য রোধে মাল্টি-ইউজার কনফার্মেশন',
    },
    {
      icon: '🩺',
      tag: 'HEALTH PROTOCOL',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      title: language === 'en' ? 'Live Medical Hotline 16263' : 'লাইভ স্বাস্থ্য বাতায়ন ১৬২৬৩',
      desc: language === 'en' ? 'Integrated ambulance routing for casualties' : 'জরুরি অ্যাম্বুলেন্স ও হাসপাতাল নির্দেশনা',
    },
    {
      icon: '🚦',
      tag: 'TRAFFIC RADAR',
      tagColor: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      title: language === 'en' ? 'Waterlogging & Cave-in Warning' : 'জলাবদ্ধতা ও সড়ক ধস সতর্কতা',
      desc: language === 'en' ? 'Live commute detour alerts across VIP corridors' : 'মিরপুর, ধানমন্ডি ও কুড়িল রুটে রিয়েল-টাইম ডাইভারশন',
    },
    {
      icon: '🏅',
      tag: 'REPUTATION',
      tagColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
      title: language === 'en' ? 'Citizen Gamification Points' : 'নাগরিক সেফটি রেপুটেশন পয়েন্ট',
      desc: language === 'en' ? 'Earn civic badges and verified trust tiers' : 'সত্য রিপোর্ট যাচাইয়ে সম্মানসূচক ব্যাজ ও পয়েন্ট',
    },
    {
      icon: '🇧🇩',
      tag: 'NATIONWIDE',
      tagColor: 'bg-green-500/20 text-green-300 border-green-500/30',
      title: language === 'en' ? 'For A Safer Bangladesh' : 'একটি নিরাপদ বাংলাদেশের প্রত্যয়',
      desc: language === 'en' ? 'Empowering 20M+ residents through civic action' : 'জনগণের সক্রিয় অংশগ্রহণে নিরাপদ ঢাকা',
    },
  ];

  // Duplicate arrays to create continuous infinite marquee loop
  const track1 = [...row1Items, ...row1Items];
  const track2 = [...row2Items, ...row2Items];

  return (
    <section className="py-16 bg-[#090514] border-t border-white/10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
          <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>{language === 'en' ? 'Live Sentinel Network Feed' : 'লাইভ সেন্টিনেল নেটওয়ার্ক স্ট্রিম'}</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {language === 'en' ? 'Continuous Community Safety Stream' : 'সার্বক্ষণিক নাগরিক নিরাপত্তা আপডেট'}
        </h2>
      </div>

      {/* Edge Gradient Masks for Smooth Fade */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#090514] via-[#090514]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#090514] via-[#090514]/80 to-transparent z-20 pointer-events-none" />

      {/* Marquee Track 1 (Left to Right) */}
      <div className="relative overflow-hidden mb-4">
        <div className="animate-marquee gap-4">
          {track1.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-[#130C24]/90 border border-white/10 hover:border-purple-400/50 backdrop-blur-xl shadow-lg transition duration-200 shrink-0 group min-w-[290px] sm:min-w-[340px]"
            >
              <div className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-sky-300 transition-colors mt-0.5 truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Track 2 (Reverse Right to Left) */}
      <div className="relative overflow-hidden">
        <div className="animate-marquee-reverse gap-4">
          {track2.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3.5 px-5 py-3.5 rounded-2xl bg-[#130C24]/90 border border-white/10 hover:border-sky-400/50 backdrop-blur-xl shadow-lg transition duration-200 shrink-0 group min-w-[290px] sm:min-w-[340px]"
            >
              <div className="text-2xl p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full border ${item.tagColor}`}>
                    {item.tag}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-300 transition-colors mt-0.5 truncate">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
