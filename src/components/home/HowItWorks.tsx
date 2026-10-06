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
      badge: 'Step 2 • AI Triage',
      detail: 'Instant hazard detection & 94% severity tagging',
      gradient: 'from-blue-500 to-sky-500'
    },
    {
      number: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: <MapPin className="w-6 h-6 text-white" />,
      tag: language === 'en' ? 'Protected GPS' : 'সুরক্ষিত জিপিএস',
      badge: 'Step 3 • Pin Location',
      detail: 'Precise coordinates with privacy obfuscation options',
      gradient: 'from-sky-500 to-blue-600'
    },
    {
      number: '04',
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      icon: <UserCheck className="w-6 h-6 text-white" />,
      tag: language === 'en' ? 'Peer Verification' : 'নাগরিক ঐক্যমত',
      badge: 'Step 4 • Community Vote',
      detail: '3+ ward confirmations escalate to authority triage',
      gradient: 'from-indigo-600 to-blue-800'
    },
    {
      number: '05',
      title: t.howItWorks.step5Title,
      desc: t.howItWorks.step5Desc,
      icon: <CheckCircle2 className="w-6 h-6 text-white" />,
      tag: language === 'en' ? 'Before & After' : 'আগে ও পরে প্রমাণ',
      badge: 'Step 5 • Resolution',
      detail: 'Municipal repair logged with before & after photographic seal',
      gradient: 'from-sky-600 to-blue-700'
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-transparent relative overflow-hidden text-white">
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-96 bg-purple-600/12 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.howItWorks.title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {t.howItWorks.subtitle}
          </p>

          {/* Connected Flow Ribbon */}
          <div className="pt-2">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-xs font-display font-semibold text-slate-300 shadow-glass">
              <span className="text-white flex items-center gap-1.5 font-bold">
                <Camera className="w-3.5 h-3.5 text-sky-400" /> 01 Report
              </span>
              <span className="text-slate-500">→</span>
              <span className="text-sky-300 flex items-center gap-1.5 font-bold">
                <Cpu className="w-3.5 h-3.5 text-sky-400" /> 02 AI Triage
              </span>
              <span className="text-slate-500">→</span>
              <span className="text-blue-300 flex items-center gap-1.5 font-bold">
                <Navigation className="w-3.5 h-3.5 text-blue-400" /> 03 Pinpoint
              </span>
              <span className="text-slate-500">→</span>
              <span className="text-indigo-300 flex items-center gap-1.5 font-bold">
                <Users className="w-3.5 h-3.5 text-indigo-400" /> 04 Verify
              </span>
              <span className="text-slate-500">→</span>
              <span className="text-sky-400 font-black flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-sky-400" /> 05 Resolve
              </span>
            </div>
          </div>
        </div>

        {/* 5-Step Cards Grid with Dark Glass Bento Styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveStepIndex(idx)}
              className="p-6 sm:p-7 rounded-3xl bg-[#130C24]/85 backdrop-blur-2xl border border-white/10 hover:border-purple-400/50 hover:bg-[#1A1033] shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.18)] transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden text-white"
            >
              <div className="space-y-5">
                {/* Header with Step Number & Tag */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-display font-black px-2.5 py-1 rounded-xl bg-white/5 text-sky-300 border border-white/10 group-hover:bg-sky-400 group-hover:text-[#0E081B] transition-colors tabular-nums">
                    {step.number}
                  </span>
                  <span className="text-[10px] font-sans font-bold px-2.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30">
                    {step.tag}
                  </span>
                </div>

                {/* High-Tech Icon Visual */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.25)] group-hover:scale-110 transition-transform duration-300 border border-white/20`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-extrabold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>

              {/* Step Detail Footer */}
              <div className="pt-4 mt-4 border-t border-white/10">
                <span className="text-[11px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors block leading-relaxed">
                  {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action CTA */}
        <div className="text-center pt-4">
          <Link
            href="/report/new"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-emergency hover:bg-emergency-hover text-white font-extrabold text-sm shadow-[0_0_25px_rgba(239,68,68,0.4)] transition transform hover:scale-105 active:scale-95 border border-emergency/50"
          >
            <span>🚨 {t.hero.primaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
