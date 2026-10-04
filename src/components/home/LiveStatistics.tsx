'use client';

import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  FileText, 
  CheckCircle2, 
  Users, 
  AlertCircle, 
  Info, 
  Sparkles, 
  Activity,
  ShieldCheck,
  Zap,
  Radio,
  Clock
} from 'lucide-react';

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

  const resolutionRate = counts.reports > 0 ? Math.round((counts.resolved / counts.reports) * 100) : 100;

  return (
    <section className="py-14 bg-transparent relative z-20 overflow-hidden">
      {/* Subtle ambient backlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Modern Bento Grid Hierarchy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Total Verified Submissions */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#130C24]/85 backdrop-blur-2xl border border-white/10 hover:border-purple-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-28 h-28 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
            
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-sans font-bold uppercase px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-200 border border-purple-400/25">
                {language === 'en' ? 'Submissions' : 'মোট অভিযোগ'}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-display tabular-nums">
                {counts.reports.toLocaleString()}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-300">
                {t.stats.totalReportsLabel}
              </p>
            </div>
          </div>

          {/* Card 2: Resolution Velocity & Percentage */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#130C24]/85 backdrop-blur-2xl border border-white/10 hover:border-purple-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-28 h-28 bg-violet-500/10 rounded-full blur-xl group-hover:bg-violet-500/20 transition-all pointer-events-none" />

            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-400/30 flex items-center justify-center text-violet-300 shadow-[0_0_15px_rgba(168,85,247,0.2)] group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-display font-bold uppercase px-2.5 py-1 rounded-full bg-violet-500/10 text-violet-200 border border-violet-400/25">
                {resolutionRate}% {language === 'en' ? 'Resolved' : 'সমাধান'}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-violet-100 to-white font-display tabular-nums">
                {counts.resolved.toLocaleString()}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-300">
                {t.stats.resolvedLabel}
              </p>
            </div>
          </div>

          {/* Card 3: Civic Guardians & Patrols */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#130C24]/85 backdrop-blur-2xl border border-white/10 hover:border-purple-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-28 h-28 bg-indigo-600/10 rounded-full blur-xl group-hover:bg-indigo-600/20 transition-all pointer-events-none" />

            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-sans font-bold uppercase px-2.5 py-1 rounded-full bg-indigo-600/10 text-indigo-200 border border-indigo-500/25">
                {language === 'en' ? 'Guardians' : 'সচেতন প্রহরী'}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-display tabular-nums">
                {counts.members.toLocaleString()}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-300">
                {t.stats.membersLabel}
              </p>
            </div>
          </div>

          {/* Card 4: Under Active Action */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#130C24]/85 backdrop-blur-2xl border border-white/10 hover:border-amber-400/40 shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-28 h-28 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform">
                <AlertCircle className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-sans font-bold uppercase px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-400/25">
                {language === 'en' ? 'Active Action' : 'তদন্তাধীন'}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-amber-300 font-display tabular-nums">
                {counts.active.toLocaleString()}
              </h3>
              <p className="text-xs sm:text-sm font-bold text-slate-300">
                {t.stats.activeReportsLabel}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
