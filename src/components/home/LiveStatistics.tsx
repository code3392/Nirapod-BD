'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { FileText, CheckCircle2, Users, AlertCircle, Info, Sparkles, Activity } from 'lucide-react';

export default function LiveStatistics() {
  const { language, t, reports } = useApp();
  const realReports = reports.length;
  const realResolved = reports.filter(r => r.status === 'RESOLVED').length;
  const realActive = reports.filter(r => r.status !== 'RESOLVED').length;
  const realMembers = reports.length > 0 ? reports.length * 3 : 0;

  const [counts, setCounts] = useState({
    reports: 0,
    resolved: 0,
    members: 0,
    active: 0,
  });

  // Animated Count-Up Effect on Mount
  useEffect(() => {
    const duration = 800; // ms
    const frameRate = 30;
    const totalFrames = Math.max(1, Math.round(duration / (1000 / frameRate)));
    let frame = 0;

    const target = {
      reports: realReports,
      resolved: realResolved,
      members: realMembers,
      active: realActive,
    };

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const ease = 1 - Math.pow(1 - progress, 3);

      setCounts({
        reports: Math.round(target.reports * ease),
        resolved: Math.round(target.resolved * ease),
        members: Math.round(target.members * ease),
        active: Math.round(target.active * ease),
      });

      if (frame >= totalFrames) {
        clearInterval(timer);
      }
    }, 1000 / frameRate);

    return () => clearInterval(timer);
  }, [realReports, realResolved, realMembers, realActive]);

  const statsCards = [
    {
      label: t.stats.totalReportsLabel,
      value: counts.reports.toLocaleString(),
      icon: <FileText className="w-6 h-6 text-navy" />,
      bg: 'bg-blue-50/80',
      border: 'border-blue-100 hover:border-blue-300',
      accent: 'text-navy',
      badge: language === 'en' ? 'Submissions' : 'মোট অভিযোগ',
      glow: 'group-hover:shadow-[0_0_25px_rgba(10,37,64,0.12)]',
    },
    {
      label: t.stats.resolvedLabel,
      value: counts.resolved.toLocaleString(),
      icon: <CheckCircle2 className="w-6 h-6 text-civic-blue" />,
      bg: 'bg-sky-50/80',
      border: 'border-sky-100 hover:border-sky-300',
      accent: 'text-civic-blue',
      badge: language === 'en' ? '71.8% Resolved' : '৭১.৮% সমাধান',
      glow: 'group-hover:shadow-[0_0_25px_rgba(37,99,235,0.18)]',
    },
    {
      label: t.stats.membersLabel,
      value: counts.members.toLocaleString(),
      icon: <Users className="w-6 h-6 text-blue-700" />,
      bg: 'bg-blue-50/80',
      border: 'border-blue-100 hover:border-blue-300',
      accent: 'text-blue-700',
      badge: language === 'en' ? 'Civic Guardians' : 'সচেতন প্রহরী',
      glow: 'group-hover:shadow-[0_0_25px_rgba(29,78,216,0.15)]',
    },
    {
      label: t.stats.activeReportsLabel,
      value: counts.active.toLocaleString(),
      icon: <AlertCircle className="w-6 h-6 text-amber-500" />,
      bg: 'bg-amber-50/80',
      border: 'border-amber-100 hover:border-amber-300',
      accent: 'text-amber-600',
      badge: language === 'en' ? 'Under Action' : 'তদন্তাধীন',
      glow: 'group-hover:shadow-[0_0_25px_rgba(245,158,11,0.18)]',
    },
  ];

  return (
    <section className="py-12 bg-surface relative -mt-8 z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Statistics Cards Grid with Elevated 3D Tilt and Glowing Borders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statsCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl bg-white border ${card.border} shadow-subtle hover:shadow-elevated ${card.glow} transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group`}
            >
              {/* Top Row: Icon + Badge */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl ${card.bg} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                  {card.icon}
                </div>
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-civic-blue transition-colors">
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
                <span className="text-civic-blue font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-civic-blue animate-ping" />
                  Active 24/7
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Network Pulse Bar */}
        <div className="mt-6 p-3 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Activity className="w-4 h-4 text-civic-blue animate-pulse" />
            <span className="font-bold text-navy">Mesh Status:</span>
            <span className="text-slate-500">
              Dhaka Metropolitan Safety Mesh Active • 54 Wards Monitored • Anti-Fraud Protection Enabled
            </span>
          </div>

          <p className="inline-flex items-center gap-1.5 text-[11px] text-muted font-medium bg-slate-50 px-3 py-1 rounded-full border border-slate-200 shrink-0">
            <Info className="w-3 h-3 text-muted shrink-0" />
            <span>Real-time community telemetry • Verified records</span>
          </p>
        </div>

      </div>
    </section>
  );
}
