'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  PhoneCall, 
  CheckCircle2, 
  ExternalLink,
  Flame,
  Zap,
  Droplet,
  HeartPulse,
  Scale,
  Sparkles,
  Award
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function PartnershipShowcase() {
  const { language } = useApp();

  const partners = [
    {
      nameEn: 'National Emergency Service 999',
      nameBn: 'জাতীয় জরুরি সেবা ৯৯৯',
      categoryEn: 'Direct Emergency Triage',
      categoryBn: 'জরুরি সেবা সংযোগ',
      icon: PhoneCall,
      color: 'bg-red-500/15 text-red-400 border-red-500/30',
      tag: 'Toll-Free 999',
      descriptionEn: 'Prominent 1-tap emergency diversion protocol for acute medical, fire, and police intervention.',
      descriptionBn: 'তাত্ক্ষণিক পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স সহায়তার জন্য সরাসরি রিডাইরেকশন।',
      status: 'Active Protocol',
    },
    {
      nameEn: 'Dhaka North City Corporation (DNCC)',
      nameBn: 'ঢাকা উত্তর সিটি কর্পোরেশন',
      categoryEn: 'Municipal Public Works',
      categoryBn: 'পৌর বর্জ্য ও সড়ক বিভাগ',
      icon: Building2,
      color: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
      tag: 'Zones 1-10',
      descriptionEn: 'Automated problem ticket dispatch for Mirpur, Uttara, Gulshan road potholes and waste clearance.',
      descriptionBn: 'মিরপুর, উত্তরা ও গুলশান এলাকার সড়ক সংস্কার ও পরিচ্ছন্নতা বিভাগে রিপোর্ট প্রেরণ।',
      status: 'Liaison Desk',
    },
    {
      nameEn: 'Dhaka South City Corporation (DSCC)',
      nameBn: 'ঢাকা দক্ষিণ সিটি কর্পোরেশন',
      categoryEn: 'Stormwater & Sanitation',
      categoryBn: 'ড্রেনেজ ও পয়ঃনিষ্কাশন',
      icon: Droplet,
      color: 'bg-blue-600/15 text-blue-300 border-blue-500/30',
      tag: 'Zones 1-10',
      descriptionEn: 'Stormwater drainage unblocking, manhole cover replacements, and canal desilting reports.',
      descriptionBn: 'ধানমন্ডি, মতিঝিল ও পুরান ঢাকা এলাকার ড্রেনেজ ক্লিয়ারেন্স ও ম্যানহোল কাভার প্রতিস্থাপন।',
      status: 'Liaison Desk',
    },
    {
      nameEn: 'Directorate General of Health (DGHS 16263)',
      nameBn: 'স্বাস্থ্য অধিদপ্তর (১৬২৬৩)',
      categoryEn: 'Healthcare & Ambulance',
      categoryBn: 'স্বাস্থ্য ও অ্যাম্বুলেন্স',
      icon: HeartPulse,
      color: 'bg-teal-500/15 text-teal-300 border-teal-400/30',
      tag: 'Shastho Batayan',
      descriptionEn: 'Coordination with government hospitals, dengue vector reports, and rapid trauma transport.',
      descriptionBn: 'সরকারি হাসপাতাল, ডেঙ্গু প্রতিরোধ ও জরুরি ট্রমা সেবা সমন্বয়।',
      status: 'Active Protocol',
    },
    {
      nameEn: 'DESCO & DPDC Electricity Authority',
      nameBn: 'ডেসকো ও ডিপিডিসি বিদ্যুৎ কর্তৃপক্ষ',
      categoryEn: 'Grid & High-Voltage Safety',
      categoryBn: 'বিদ্যুৎ বিপর্যয় ও নিরাপত্তা',
      icon: Zap,
      color: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
      tag: 'Hotline 16120 / 16116',
      descriptionEn: 'Urgent reports on severed overhead cables, sparking transformers, and sub-station outages.',
      descriptionBn: 'ঝুলন্ত বিপজ্জনক তার, ট্রান্সফরমার মেরামত ও জরুরি বিদ্যুৎ বিভ্রাট রিপোর্ট।',
      status: '24/7 Desk',
    },
    {
      nameEn: 'Fire Service & Civil Defence Bangladesh',
      nameBn: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স',
      categoryEn: 'Fire Rescue & Disaster Command',
      categoryBn: 'অগ্নিনির্বাপণ ও উদ্ধার অভিযান',
      icon: Flame,
      color: 'bg-orange-500/15 text-orange-300 border-orange-400/30',
      tag: 'Hotline 102',
      descriptionEn: 'Chemical leakage warnings, gas riser alerts, building structural cracks, and fire rescues.',
      descriptionBn: 'গ্যাস লিকেজ, রাসায়নিক ঝুঁকি ও বহুতল ভবনে অগ্নিকাণ্ডে সরাসরি নিয়ন্ত্রণ কক্ষ সমন্বয়।',
      status: 'Active Protocol',
    },
  ];

  return (
    <section className="py-24 bg-[#090514] border-t border-white/10 relative overflow-hidden text-white">
      {/* Background Subtle Tech Matrix & Glowing Orbs */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-purple-600/12 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-xs font-mono font-bold text-sky-300 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>{language === 'en' ? 'Civic Coordination & Partnership Showcase' : 'সরকারি ও নাগরিক সেবা সমন্বয়'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {language === 'en' 
              ? 'Working Alongside Bangladesh’s Essential Public Authorities'
              : 'বাংলাদেশের প্রধান সরকারি ও জরুরি সংস্থাসমূহের সাথে সমন্বিত'}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {language === 'en'
              ? 'Nirapod BD bridges proactive citizens with official service providers. Verified issues are standardized and dispatched to respective departments for transparent resolution.'
              : 'নিরাপদ বিডি সাধারণ নাগরিক ও সেবাদানকারী কর্তৃপক্ষের মধ্যে নির্ভরযোগ্য সেতুবন্ধন। যাচাইকৃত নাগরিক সমস্যাসমূহ সরকারি সংস্থায় পাঠানো হয়।'}
          </p>
        </div>

        {/* Partnership Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.nameEn}
                className="p-6 sm:p-7 rounded-3xl bg-[#130C24]/85 backdrop-blur-2xl border border-white/10 hover:border-purple-400/50 hover:bg-[#1A1033] shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform ${partner.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white/5 text-sky-300 border border-white/10">
                        {partner.tag}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-sky-400 mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-sky-400" />
                        {partner.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                      {language === 'en' ? partner.categoryEn : partner.categoryBn}
                    </span>
                    <h4 className="text-base font-extrabold text-white mt-1 group-hover:text-sky-300 transition-colors">
                      {language === 'en' ? partner.nameEn : partner.nameBn}
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {language === 'en' ? partner.descriptionEn : partner.descriptionBn}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Standardized Dispatch</span>
                  <span className="text-sky-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Protocol Live</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-400" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Website Glaze Banner: Trust Metrics */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E081B]/95 backdrop-blur-2xl border border-white/15 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center justify-between gap-6 ring-1 ring-sky-500/15">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <Award className="w-7 h-7 text-sky-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-white">
                {language === 'en' ? 'Authentic Public Data & Non-Commercial Policy' : 'সম্পূর্ণ অ-বাণিজ্যিক ও প্রামাণিক নাগরিক প্ল্যাটফর্ম'}
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                {language === 'en' 
                  ? 'Zero commercial banner ads. Strictly dedicated to citizen welfare, community safety, and transparent urban accountability.'
                  : 'কোনো বিজ্ঞাপন বা বাণিজ্যিক প্রচারণা নেই। সম্পূর্ণরূপে নাগরিক কল্যাণ, নিরাপত্তা ও স্বচ্ছতার জন্য নিবেদিত।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono font-bold bg-white/10 px-4 py-2 rounded-full border border-white/15 text-sky-300">
              Rule 19 Compliant • 100% Ad-Free
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
