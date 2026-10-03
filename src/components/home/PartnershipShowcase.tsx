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
      color: 'bg-red-50 text-emergency border-red-200',
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
      color: 'bg-sky-50 text-sky-700 border-sky-200',
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
      color: 'bg-blue-50 text-civic-blue border-blue-200',
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
      color: 'bg-teal-50 text-teal-700 border-teal-200',
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
      color: 'bg-amber-50 text-amber-700 border-amber-200',
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
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      tag: 'Hotline 102',
      descriptionEn: 'Chemical leakage warnings, gas riser alerts, building structural cracks, and fire rescues.',
      descriptionBn: 'গ্যাস লিকেজ, রাসায়নিক ঝুঁকি ও বহুতল ভবনে অগ্নিকাণ্ডে সরাসরি নিয়ন্ত্রণ কক্ষ সমন্বয়।',
      status: 'Active Protocol',
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-blue-100 relative overflow-hidden">
      {/* Subtle modern glaze texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0f2fe15_1px,transparent_1px),linear-gradient(to_bottom,#e0f2fe15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200 text-xs font-bold text-civic-blue shadow-subtle">
            <ShieldCheck className="w-4 h-4 text-civic-blue" />
            <span>{language === 'en' ? 'Civic Coordination & Partnership Showcase' : 'সরকারি ও নাগরিক সেবা সমন্বয়'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-navy tracking-tight leading-tight">
            {language === 'en' 
              ? 'Working Alongside Bangladesh’s Essential Public Authorities'
              : 'বাংলাদেশের প্রধান সরকারি ও জরুরি সংস্থাসমূহের সাথে সমন্বিত'}
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
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
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-civic-blue/50 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform ${partner.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-civic-blue border border-blue-200">
                        {partner.tag}
                      </span>
                      <span className="text-[10px] font-bold text-civic-blue mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {partner.status}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {language === 'en' ? partner.categoryEn : partner.categoryBn}
                    </span>
                    <h4 className="text-base font-extrabold text-navy mt-1 group-hover:text-civic-blue transition-colors">
                      {language === 'en' ? partner.nameEn : partner.nameBn}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {language === 'en' ? partner.descriptionEn : partner.descriptionBn}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Standardized Dispatch</span>
                  <span className="text-civic-blue font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Protocol Live</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-civic-blue" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Website Glaze Banner: Trust Metrics */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy via-navy to-civic-deep text-white border border-blue-900 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
              <Award className="w-7 h-7 text-blue-300" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-white">
                {language === 'en' ? 'Authentic Public Data & Non-Commercial Policy' : 'সম্পূর্ণ অ-বাণিজ্যিক ও প্রামাণিক নাগরিক প্ল্যাটফর্ম'}
              </h4>
              <p className="text-xs text-blue-200 mt-0.5">
                {language === 'en' 
                  ? 'Zero commercial banner ads. Strictly dedicated to citizen welfare, community safety, and transparent urban accountability.'
                  : 'কোনো বিজ্ঞাপন বা বাণিজ্যিক প্রচারণা নেই। সম্পূর্ণরূপে নাগরিক কল্যাণ, নিরাপত্তা ও স্বচ্ছতার জন্য নিবেদিত।'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono font-bold bg-white/15 px-3 py-1.5 rounded-xl border border-white/20">
              Rule 19 Compliant • 100% Ad-Free
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
