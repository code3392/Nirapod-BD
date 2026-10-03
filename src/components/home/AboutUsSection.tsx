'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  HeartHandshake, 
  MapPin, 
  Eye, 
  CheckCircle2, 
  Building2, 
  Award,
  Globe2,
  Users2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function AboutUsSection() {
  const { language } = useApp();

  const civicActionPillars = [
    {
      titleEn: 'Youth & Student Civic Volunteers',
      titleBn: 'তরুণ ও শিক্ষার্থী স্বেচ্ছাসেবক নেটওয়ার্ক',
      roleEn: 'Field Incident Verification & Rapid Alerting',
      roleBn: 'মাঠপর্যায়ে দ্রুত তথ্য সংগ্রহ ও প্রাথমিক সতর্কতা',
      icon: <Users2 className="w-8 h-8 text-sky-400" />,
      tag: 'Field Volunteers',
      metric: '1,200+ Active',
      gradient: 'from-blue-600/30 to-indigo-900/40',
    },
    {
      titleEn: 'Emergency & First Aid Liaison',
      titleBn: 'জরুরি সেবা ও প্রাথমিক চিকিৎসা সমন্বয়',
      roleEn: 'Fast-Track Protocol with 999 & Ambulance Network',
      roleBn: 'জাতীয় ৯৯৯ ও অ্যাম্বুলেন্স নেটওয়ার্কের সাথে দ্রুত যোগাযোগ',
      icon: <HeartHandshake className="w-8 h-8 text-red-400" />,
      tag: 'Emergency Protocol',
      metric: '24/7 Standby',
      gradient: 'from-red-600/30 to-slate-900/40',
    },
    {
      titleEn: 'Municipal Technical Support Desk',
      titleBn: 'পৌর প্রযুক্তিগত সহায়তা ডেস্ক',
      roleEn: 'Direct Coordination with City Corporations & DESCO',
      roleBn: 'সিটি কর্পোরেশন, ডেসকো ও ওয়াসার সাথে সমন্বয়',
      icon: <Building2 className="w-8 h-8 text-sky-400" />,
      tag: 'Public Liaison',
      metric: 'Zone 1-10 Dhaka',
      gradient: 'from-sky-600/30 to-blue-900/40',
    },
    {
      titleEn: 'Neighborhood Safety Circles',
      titleBn: 'ওয়ার্ডভিত্তিক নিরাপত্তা সার্কেল',
      roleEn: 'Community-led Problem Resolution & Accountability',
      roleBn: 'এলাকাভিত্তিক নাগরিক জবাবদিহিতা ও টেকসই সমাধান',
      icon: <ShieldCheck className="w-8 h-8 text-blue-400" />,
      tag: 'Local Guardianship',
      metric: '54 Wards Covered',
      gradient: 'from-indigo-600/30 to-navy/40',
    },
  ];

  return (
    <section id="about-us" className="py-24 bg-[#071320] text-white relative overflow-hidden border-t border-slate-800">
      {/* Background Subtle Tech Matrix & Glowing Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-civic-blue/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-sky-300 uppercase tracking-wider backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>About Nirapod BD</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {language === 'en' ? 'Building a Safer, Cleaner Bangladesh Together' : 'একটি নিরাপদ ও আধুনিক বাংলাদেশের প্রত্যয়ে'}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Nirapod BD is Bangladesh’s flagship community-powered safety and civic reporting ecosystem. We unite proactive citizens, local volunteers, and municipal authorities through computer vision AI and verifiable real-time action.'
              : 'নিরাপদ বিডি বাংলাদেশের একটি অগ্রগামী নাগরিক নিরাপত্তা ও সমস্যা সমাধান প্ল্যাটফর্ম। এটি সচেতন নাগরিক, স্বেচ্ছাসেবক এবং সিটি কর্পোরেশন ও সেবা সংস্থাসমূহকে এআই ও স্বচ্ছ প্রমাণের মাধ্যমে সংযুক্ত করে।'}
          </p>
        </div>

        {/* 3 Core Ethical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-civic-blue/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-civic-blue/20 text-sky-300 flex items-center justify-center font-bold">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Community-Powered</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every civic issue is backed by peer verification from neighbors living in the same ward, eliminating fake reporting and elevating critical priorities.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-sky-400/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">AI-Assisted Triage</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automated computer vision detects pavement potholes, live electrical sparks, and toxic waste, generating objective hazard severity recommendations in seconds.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-blue-400/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Strict Accountability</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under Rule 25, once authorities mark work complete, citizens verify resolution with before & after photographic evidence to guarantee genuine outcomes.
            </p>
          </div>
        </div>

        {/* Real Civic Action & Volunteer Teams (High-Res Photographic Cards) */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black text-white">
              {language === 'en' ? 'Community In Action Across Bangladesh' : 'বাস্তব নাগরিক উদ্যোগ ও স্বেচ্ছাসেবক কার্যক্রম'}
            </h3>
            <p className="text-xs text-slate-400">
              {language === 'en'
                ? 'Authentic citizen patrols and youth volunteers making streets safe every day'
                : 'প্রতিদিনের রাস্তাঘাট নিরাপদ করতে সক্রিয় নাগরিক ও তরুণ স্বেচ্ছাসেবকদের ভূমিকা'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {civicActionPillars.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-civic-blue/50 transition-all duration-300 transform hover:-translate-y-2 group shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${item.gradient} flex items-center justify-center border-b border-white/10`}>
                    <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 backdrop-blur-md">
                      {item.icon}
                    </div>
                    
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#071320]/80 backdrop-blur-md text-sky-300 border border-white/20">
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-2 right-3">
                      <span className="text-[10px] font-mono font-bold text-white bg-civic-blue/80 px-2 py-0.5 rounded-md backdrop-blur-md">
                        {item.metric}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h4 className="font-extrabold text-base text-white group-hover:text-sky-300 transition-colors">
                      {language === 'en' ? item.titleEn : item.titleBn}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {language === 'en' ? item.roleEn : item.roleBn}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Verified Network</span>
                    <CheckCircle2 className="w-4 h-4 text-civic-blue" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Root Platform Authority Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-navy via-navy-light to-navy border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-civic-blue/20 text-sky-400 border border-civic-blue/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-civic-blue text-white">
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
            className="px-6 py-3 rounded-2xl bg-civic-blue hover:bg-civic-royal text-white font-extrabold text-xs transition transform hover:scale-105 shadow-glow shrink-0 flex items-center gap-2"
          >
            <span>{language === 'en' ? 'Join Community Hub' : 'কমিউনিটি হাবে যোগ দিন'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
