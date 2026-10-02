'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FileText, CheckCircle2, Users, AlertCircle, Info } from 'lucide-react';

export default function LiveStatistics() {
  const { language, t } = useApp();
  const [counts, setCounts] = useState({
    reports: 0,
    resolved: 0,
    members: 0,
    active: 0,
  });

  // Animated Count-Up Effect on Mount
  useEffect(() => {
    const duration = 1200; // ms
    const frameRate = 30;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const target = {
      reports: 1284,
      resolved: 923,
      members: 4521,
      active: 327,
    };

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        reports: Math.round(target.reports * ease),
        resolved: Math.round(target.resolved * ease),
        members: Math.round(target.members * ease),
        active: Math.round(target.active * ease),
      });

      if (frame === totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, []);

  const statsCards = [
    {
      label: t.stats.totalReportsLabel,
      value: counts.reports.toLocaleString(),
      icon: <FileText className="w-6 h-6 text-navy" />,
      bg: 'bg-blue-50/80',
      border: 'border-blue-100',
      accent: 'text-navy',
      badge: language === 'en' ? 'Submissions' : 'মোট অভিযোগ',
    },
    {
      label: t.stats.resolvedLabel,
      value: counts.resolved.toLocaleString(),
      icon: <CheckCircle2 className="w-6 h-6 text-safety" />,
      bg: 'bg-emerald-50/80',
      border: 'border-emerald-100',
      accent: 'text-safety',
      badge: language === 'en' ? '71.8% Resolved' : '৭১.৮% সমাধান',
    },
    {
      label: t.stats.membersLabel,
      value: counts.members.toLocaleString(),
      icon: <Users className="w-6 h-6 text-indigo-600" />,
      bg: 'bg-indigo-50/80',
      border: 'border-indigo-100',
      accent: 'text-indigo-600',
      badge: language === 'en' ? 'Civic Guardians' : 'সচেতন প্রহরী',
    },
    {
      label: t.stats.activeReportsLabel,
      value: counts.active.toLocaleString(),
      icon: <AlertCircle className="w-6 h-6 text-amber-500" />,
      bg: 'bg-amber-50/80',
      border: 'border-amber-100',
      accent: 'text-amber-600',
      badge: language === 'en' ? 'Under Action' : 'তদন্তাধীন',
    },
  ];

  return (
    <section className="py-12 bg-surface relative -mt-8 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statistics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statsCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl bg-white border ${card.border} shadow-subtle hover:shadow-card transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group`}
            >
              {/* Top Row: Icon + Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform`}>
                  {card.icon}
                </div>
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  {card.badge}
                </span>
              </div>

              {/* Number Value */}
              <div className="space-y-1">
                <h3 className={`text-3xl sm:text-4xl font-black tracking-tight ${card.accent}`}>
                  {card.value}
                </h3>
                <p className="text-sm font-semibold text-slate-600">
                  {card.label}
                </p>
              </div>

              {/* Decorative Subtle Accent Line */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-muted font-medium">
                <span>Verified in Dhaka</span>
                <span className="text-safety font-bold">● Active 24/7</span>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Disclaimer notice */}
        <div className="mt-4 text-center">
          <p className="inline-flex items-center gap-1.5 text-xs text-muted font-medium bg-slate-100/80 px-3.5 py-1 rounded-full border border-slate-200">
            <Info className="w-3.5 h-3.5 text-muted shrink-0" />
            <span>{t.stats.sampleNotice}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
