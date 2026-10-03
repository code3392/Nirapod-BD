'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Camera
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

interface CivicWorkItem {
  id: string;
  titleEn: string;
  titleBn: string;
  area: string;
  specificLocation: string;
  organization: string;
  resolvedDate: string;
  confirmations: number;
  beforeImage: string;
  afterImage: string;
  summaryEn: string;
  summaryBn: string;
  impactEn: string;
  impactBn: string;
}

export default function CivicWorksGallery() {
  const { language } = useApp();
  const [activeTab, setActiveTab] = useState<Record<string, 'after' | 'before'>>({});

  const works: CivicWorkItem[] = [
    {
      id: 'work-1',
      titleEn: 'Mirpur-10 Roundabout Crater Re-surfacing & Concrete Rolling',
      titleBn: 'মিরপুর-১০ গোলচত্বর সড়ক সংস্কার ও পিচ ঢালাই',
      area: 'Mirpur',
      specificLocation: 'Mirpur 10 Metro Junction East Lane',
      organization: 'Dhaka North City Corporation (Zone-4)',
      resolvedDate: '1 October 2026',
      confirmations: 64,
      beforeImage: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80',
      summaryEn: 'Deep 8-inch cave-in causing rickshaw flips was cold-milled, leveled with bitumen asphalt, and compacted for smooth vehicular transit.',
      summaryBn: '৮ ইঞ্চি গভীর বিপজ্জনক গর্তটিতে ভিটুমিন ও অ্যাসফল্ট ঢালাইয়ের মাধ্যমে স্থায়ী সংস্কার সম্পন্ন হয়েছে।',
      impactEn: 'Eliminated overturn risk for 15,000+ daily vehicles.',
      impactBn: '১৫,০০০+ দৈনিক যানবাহনের দুর্ঘটনা ঝুঁকি নির্মূল।',
    },
    {
      id: 'work-2',
      titleEn: 'Dhanmondi Road 27 Storm Sewer Unblocking & Drain Clearance',
      titleBn: 'ধানমন্ডি ২৭ নম্বর ড্রেনের বর্জ্য অপসারণ ও জল নিষ্কাশন',
      area: 'Dhanmondi',
      specificLocation: 'Near Rapa Plaza & Girls School Zone',
      organization: 'DSCC Drainage Rapid Division',
      resolvedDate: '28 September 2026',
      confirmations: 42,
      beforeImage: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
      summaryEn: 'Heavy suction dredging units cleared 2 tons of single-use plastic sacks blocking the underground outflow culvert to the lake.',
      summaryBn: 'সাকশন মেশিনের মাধ্যমে ড্রেনের ভেতরের ২ টন পলিথিন ও বর্জ্য পরিষ্কার করে পানির স্বাভাবিক প্রবাহ নিশ্চিত করা হয়েছে।',
      impactEn: 'Road dried within 45 minutes of heavy downpour.',
      impactBn: 'ভারী বৃষ্টির ৪৫ মিনিটের মধ্যে সড়ক সম্পূর্ণ শুষ্ক।',
    },
    {
      id: 'work-3',
      titleEn: 'Uttara Sector 7 Dangling Overhead Power Wire Secured',
      titleBn: 'উত্তরা ৭ নম্বর সেক্টরে ঝুলন্ত বৈদ্যুতিক তার প্রতিস্থাপন',
      area: 'Uttara',
      specificLocation: 'Sector 7, Road 12 Pedestrian Walkway',
      organization: 'DESCO Emergency Fault Management',
      resolvedDate: '25 September 2026',
      confirmations: 38,
      beforeImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      afterImage: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      summaryEn: 'Snapped 11kV overhead wire was re-routed through insulated conduit pipe and transformer fuse bank replaced.',
      summaryBn: 'ছিঁড়ে পড়া তার ইনসুলেটেড পাইপের ভেতর দিয়ে নতুন পোল স্থাপন করে নিরাপদ করা হয়েছে।',
      impactEn: 'Restored pedestrian walkway safety for school children.',
      impactBn: 'স্কুলগামী শিশু ও পথচারীদের হাঁটার শতভাগ নিরাপত্তা নিশ্চিত।',
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-blue-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-civic-blue shadow-subtle">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{language === 'en' ? 'Verified Community Works & Resolutions' : 'বাস্তবায়িত নাগরিক কাজ ও সমাধান গ্যালারি'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-navy tracking-tight leading-tight">
            {language === 'en' 
              ? 'Real Problems. Real Actions. Real Resolutions.'
              : 'নাগরিক সমস্যার দৃশ্যমান প্রমাণ ও টেকসই সমাধান'}
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            {language === 'en'
              ? 'Every problem reported on Nirapod BD requires mandatory photographic resolution proof before closure. Explore before and after transformations verified by local citizens.'
              : 'নিরাপদ বিডিতে যেকোনো সমস্যা সমাধানের পর বাধ্যতামূলক ছবি ও ভিডিও প্রমাণ আপলোড করতে হয়। প্রতিবেশীদের যাচাইকৃত কাজের বাস্তব ফলাফল দেখুন।'}
          </p>
        </div>

        {/* Works Grid with Interactive Before / After Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work) => {
            const currentView = activeTab[work.id] || 'after';
            const displayImage = currentView === 'after' ? work.afterImage : work.beforeImage;

            return (
              <div
                key={work.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-civic-blue/50 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Image Section with Before/After Toggle Tabs */}
                <div className="relative h-64 bg-slate-900 overflow-hidden">
                  <img
                    src={displayImage}
                    alt={work.titleEn}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Before / After Floating Pills */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md p-1 rounded-xl flex items-center gap-1 border border-white/20">
                    <button
                      onClick={() => setActiveTab(prev => ({ ...prev, [work.id]: 'before' }))}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        currentView === 'before'
                          ? 'bg-emergency text-white shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {language === 'en' ? 'Before' : 'আগের অবস্থা'}
                    </button>
                    <button
                      onClick={() => setActiveTab(prev => ({ ...prev, [work.id]: 'after' }))}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        currentView === 'after'
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {language === 'en' ? 'Resolved ✓' : 'সমাধানের পর ✓'}
                    </button>
                  </div>

                  {/* Status Tag */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/90 backdrop-blur-md text-white border border-white/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      100% Resolved
                    </span>
                  </div>

                  {/* Bottom Meta */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex items-center gap-1.5 text-white text-xs font-bold mb-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                      <span className="truncate">{work.area} • {work.specificLocation}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-300">
                      <span>{work.resolvedDate}</span>
                      <span className="font-semibold text-emerald-400">
                        {work.confirmations} neighbors verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Building2 className="w-3.5 h-3.5 text-civic-blue" />
                      <span className="truncate font-semibold">{work.organization}</span>
                    </div>

                    <h4 className="text-base font-extrabold text-navy group-hover:text-civic-blue transition-colors leading-snug">
                      {language === 'en' ? work.titleEn : work.titleBn}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {language === 'en' ? work.summaryEn : work.summaryBn}
                    </p>
                  </div>

                  {/* Civic Impact Badge */}
                  <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-xs">
                    <Sparkles className="w-4 h-4 text-civic-blue shrink-0 mt-0.5" />
                    <div>
                      <span className="font-extrabold text-navy block text-[11px] uppercase tracking-wider">
                        {language === 'en' ? 'Community Impact' : 'নাগরিক সুবিধা'}
                      </span>
                      <p className="text-slate-600 font-medium">
                        {language === 'en' ? work.impactEn : work.impactBn}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-navy hover:bg-navy-light text-white font-bold text-xs sm:text-sm shadow-md transition transform hover:scale-105"
          >
            <span>{language === 'en' ? 'Explore All Resolved Reports & Work Proofs' : 'সকল সমাধানের প্রমাণ ও রিপোর্ট দেখুন'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
