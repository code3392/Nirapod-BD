'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Camera, 
  Sparkles, 
  MapPin, 
  UserCheck, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Cpu,
  Navigation,
  Users,
  Wrench
} from 'lucide-react';

export default function HowItWorks() {
  const { language, t } = useApp();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const steps = [
    {
      number: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: <Camera className="w-5 h-5 text-navy" />,
      tag: language === 'en' ? 'Evidence Photo' : 'ছবির প্রমাণ',
      accent: 'border-blue-200 hover:border-blue-400 bg-white',
      image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=500&q=80',
      badge: 'Step 1 • Capture',
      detail: 'Citizen photos or videos with timestamp validation'
    },
    {
      number: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: <Sparkles className="w-5 h-5 text-civic-blue" />,
      tag: language === 'en' ? 'Computer Vision' : 'কম্পিউটার ভিশন',
      accent: 'border-blue-200 hover:border-blue-400 bg-white',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=80',
      badge: 'Step 2 • AI Triage',
      detail: 'Instant hazard detection & 94% severity tagging'
    },
    {
      number: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: <MapPin className="w-5 h-5 text-sky-600" />,
      tag: language === 'en' ? 'Protected GPS' : 'সুরক্ষিত জিপিএস',
      accent: 'border-sky-200 hover:border-sky-400 bg-white',
      image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=500&q=80',
      badge: 'Step 3 • Pin Location',
      detail: 'Precise coordinates with privacy obfuscation options'
    },
    {
      number: '04',
      title: t.howItWorks.step4Title,
      desc: t.howItWorks.step4Desc,
      icon: <UserCheck className="w-5 h-5 text-blue-600" />,
      tag: language === 'en' ? 'Peer Verification' : 'নাগরিক ঐক্যমত',
      accent: 'border-blue-200 hover:border-blue-400 bg-white',
      image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=500&q=80',
      badge: 'Step 4 • Community Vote',
      detail: '3+ ward confirmations escalate to authority triage'
    },
    {
      number: '05',
      title: t.howItWorks.step5Title,
      desc: t.howItWorks.step5Desc,
      icon: <CheckCircle2 className="w-5 h-5 text-civic-blue" />,
      tag: language === 'en' ? 'Before & After' : 'আগে ও পরে প্রমাণ',
      accent: 'border-blue-200 hover:border-blue-400 bg-white',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=500&q=80',
      badge: 'Step 5 • Resolution',
      detail: 'Municipal repair logged with before & after photographic seal'
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-surface border-t border-surface-border relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-96 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-civic-blue uppercase tracking-wider shadow-subtle">
            <ShieldCheck className="w-4 h-4 text-civic-blue" />
            <span>{language === 'en' ? 'Transparent Civic Workflow' : 'স্বচ্ছ নাগরিক প্রক্রিয়া'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-navy tracking-tight leading-tight">
            {t.howItWorks.title}
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.howItWorks.subtitle}
          </p>

          {/* Visual Step-Flow Ribbon */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-card">
              <span className="text-navy flex items-center gap-1 font-extrabold">
                <Smartphone className="w-3.5 h-3.5 text-navy" /> 01 Report
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

        {/* 5-Step Cards Grid with Real Photography & Dynamic Transitions */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setActiveStepIndex(idx)}
              className={`p-5 rounded-3xl border ${step.accent} shadow-subtle hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-between group relative overflow-hidden`}
            >
              {/* Step Card Visual Thumbnail */}
              <div className="space-y-4">
                <div className="relative h-36 rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 shadow-inner">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />
                  
                  {/* Step Badge */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-navy/80 backdrop-blur-md text-white border border-white/20">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-navy shadow-2xs">
                      {step.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 text-white pointer-events-none">
                    <div className="w-6 h-6 rounded-lg bg-civic-blue text-white flex items-center justify-center text-xs shadow-sm">
                      {step.icon}
                    </div>
                    <span className="text-[11px] font-bold truncate">{step.badge}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-base font-black text-navy tracking-tight group-hover:text-civic-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                  <p className="text-[11px] text-civic-blue font-medium pt-1">
                    {step.detail}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Step Indicator */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-bold">
                <span>Step {idx + 1} of 5</span>
                {idx < 4 ? (
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-civic-blue group-hover:translate-x-1 transition-all" />
                ) : (
                  <span className="text-civic-blue font-black flex items-center gap-1">
                    Complete <CheckCircle2 className="w-3.5 h-3.5 text-civic-blue" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
