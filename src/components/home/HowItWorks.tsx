'use client';

import React, { useState } from 'react';
import { 
  Camera, 
  Sparkles, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Navigation,
  Users,
  Wrench
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function HowItWorks() {
  const { language, t } = useApp();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    {
      number: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: <Camera className="w-6 h-6 text-white" />,
      tag: language === 'en' ? 'Evidence Photo' : 'ছবির প্রমাণ',
      accent: 'border-blue-200 hover:border-blue-400 bg-white',
      badge: 'Step 1 • Capture',
      detail: 'Citizen photos or videos with timestamp validation',
      gradient: 'from-blue-600 to-indigo-700'
    },
    {
      number: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: <Sparkles className="w-6 h-6 text-white" />,
      tag: language === 'en' ? 'Computer Vision' : 'কম্পিউটার ভিশন',
      accent: 'border-blue-200 hover:border-blue-400 bg-white',
      badge: 'Step 2 • AI Triage',
      detail: 'Instant hazard detection & 94% severity tagging',
      gradient: 'from-civic-blue to-blue-600'
    },
    {
      number: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: <MapPin className="w-6 h-6 text-white" />,
      tag: language === 'en' ? 'Protected GPS' : 'সুরক্ষিত জিপিএস',
      accent: 'border-sky-200 hover:border-sky-400 bg-white',
      badge: 'Step 3 • Pin Location',
      detail: 'Precise coordinates with privacy obfuscation options',
      gradient: 'from-sky-600 to-blue-700'
    },
    {
      number: '04',
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      icon: <UserCheck className="w-6 h-6 text-white" />,
      tag: language === 'en' ? 'Peer Verification' : 'নাগরিক ঐক্যমত',
      accent: 'border-blue-200 hover:border-blue-400 bg-white',
      badge: 'Step 4 • Community Vote',
      detail: '3+ ward confirmations escalate to authority triage',
      gradient: 'from-indigo-600 to-navy'
    },
    {
      number: '05',
      title: t.howItWorks.step5Title,
      desc: t.howItWorks.step5Desc,
      icon: <CheckCircle2 className="w-6 h-6 text-white" />,
      tag: language === 'en' ? 'Before & After' : 'আগে ও পরে প্রমাণ',
      accent: 'border-blue-200 hover:border-blue-400 bg-white',
      badge: 'Step 5 • Resolution',
      detail: 'Municipal repair logged with before & after photographic seal',
      gradient: 'from-civic-blue to-teal-700'
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-surface border-t border-surface-border relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-civic-blue shadow-subtle">
            <ShieldCheck className="w-4 h-4 text-civic-blue" />
            <span>5-Step Verified Protocol</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-navy tracking-tight leading-tight">
            {t.howItWorks.title}
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed">
            {t.howItWorks.subtitle}
          </p>

          {/* Connected Flow Badge */}
          <div className="pt-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-700">
              <span className="text-navy flex items-center gap-1 font-bold">
                <Camera className="w-3.5 h-3.5 text-navy" /> 01 Report
              </span>
              <span className="text-slate-300">→</span>
              <span className="text-civic-blue flex items-center gap-1 font-extrabold">
                <Cpu className="w-3.5 h-3.5 text-civic-blue" /> 02 AI Triage
              </span>
              <span className="text-slate-300">→</span>
              <span className="text-sky-600 flex items-center gap-1 font-extrabold">
                <Navigation className="w-3.5 h-3.5 text-sky-600" /> 03 Pinpoint
              </span>
              <span className="text-slate-300">→</span>
              <span className="text-blue-600 flex items-center gap-1 font-extrabold">
                <Users className="w-3.5 h-3.5 text-blue-600" /> 04 Verify
              </span>
              <span className="text-slate-300">→</span>
              <span className="text-civic-blue font-black flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-civic-blue" /> 05 Resolve
              </span>
            </div>
          </div>
        </div>

        {/* 5-Step Cards Grid with High-Tech Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveStepIndex(idx)}
              className={`p-6 rounded-3xl border ${step.accent} shadow-subtle hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden`}
            >
              <div className="space-y-5">
                {/* Header with Step Number & Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black px-2.5 py-1 rounded-xl bg-slate-100 text-navy border border-slate-200 group-hover:bg-civic-blue group-hover:text-white transition-colors">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-civic-blue border border-blue-200">
                    {step.tag}
                  </span>
                </div>

                {/* High-Tech Icon Visual */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-navy tracking-tight group-hover:text-civic-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Step Detail Footer */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-600 transition-colors block">
                  {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center pt-4">
          <Link
            href="/report/new"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-emergency hover:bg-emergency-hover text-white font-extrabold text-sm shadow-emergency transition transform hover:scale-105 active:scale-95"
          >
            <span>🚨 {t.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
