'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Camera, 
  Sparkles, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function HowItWorks() {
  const { language, t } = useApp();

  const steps = [
    {
      number: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: <Camera className="w-7 h-7 text-navy" />,
      tag: language === 'en' ? 'Evidence Photo' : 'ছবির প্রমাণ',
      accent: 'border-blue-200 bg-blue-50/50',
    },
    {
      number: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: <Sparkles className="w-7 h-7 text-indigo-600" />,
      tag: language === 'en' ? 'Computer Vision' : 'কম্পিউটার ভিশন',
      accent: 'border-indigo-200 bg-indigo-50/50',
    },
    {
      number: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: <MapPin className="w-7 h-7 text-amber-600" />,
      tag: language === 'en' ? 'Protected GPS' : 'সুরক্ষিত জিপিএস',
      accent: 'border-amber-200 bg-amber-50/50',
    },
    {
      number: '04',
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      icon: <UserCheck className="w-7 h-7 text-emerald-600" />,
      tag: language === 'en' ? 'Community Consensus' : 'নাগরিক ঐক্যমত',
      accent: 'border-emerald-200 bg-emerald-50/50',
    },
    {
      number: '05',
      title: t.howItWorks.step5Title,
      desc: t.howItWorks.step5Desc,
      icon: <CheckCircle2 className="w-7 h-7 text-safety" />,
      tag: language === 'en' ? 'Before & After' : 'আগে ও পরে প্রমাণ',
      accent: 'border-safety/30 bg-safety/5',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy/5 border border-navy/10 text-xs font-bold text-navy uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-safety" />
            <span>{language === 'en' ? 'Transparent Civic Workflow' : 'স্বচ্ছ নাগরিক প্রক্রিয়া'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
            {t.howItWorks.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600">
            {t.howItWorks.subtitle}
          </p>

          {/* Visual Step-Flow Ribbon */}
          <div className="pt-4 flex items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs">
              <span className="text-navy">Report</span>
              <span className="text-slate-400">→</span>
              <span className="text-indigo-600">AI</span>
              <span className="text-slate-400">→</span>
              <span className="text-amber-600">Location</span>
              <span className="text-slate-400">→</span>
              <span className="text-emerald-600">Verification</span>
              <span className="text-slate-400">→</span>
              <span className="text-blue-600">Action</span>
              <span className="text-slate-400">→</span>
              <span className="text-safety font-black">Resolution</span>
            </div>
          </div>
        </div>

        {/* 5-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border ${step.accent} shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative`}
            >
              {/* Step Number & Icon */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-muted tracking-widest">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 shadow-2xs">
                    {step.tag}
                  </span>
                </div>

                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>

                <h3 className="text-base font-extrabold text-navy tracking-tight">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Bottom Subtle Step Indicator */}
              <div className="mt-6 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-muted font-bold">
                <span>Step {idx + 1} of 5</span>
                {idx < 4 ? (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                ) : (
                  <span className="text-safety font-extrabold">Done ✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
