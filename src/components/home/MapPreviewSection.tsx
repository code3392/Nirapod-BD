'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Report } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import SeverityBadge from '@/components/common/SeverityBadge';
import { 
  MapPin, 
  Users, 
  Clock, 
  ExternalLink, 
  Layers, 
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Radio
} from 'lucide-react';

export default function MapPreviewSection() {
  const { language, t, reports } = useApp();
  
  // Select up to 8 demo reports from Dhaka
  const demoReports = reports.slice(0, 8);
  const [selectedReport, setSelectedReport] = useState<Report>(demoReports[0]);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredReports = filterSeverity === 'all' 
    ? demoReports 
    : demoReports.filter(r => r.severity === filterSeverity || (filterSeverity === 'resolved' && r.status === 'RESOLVED'));

  const getMarkerColor = (report: Report) => {
    if (report.status === 'RESOLVED') return 'bg-sky-400 border-white text-[#071320] shadow-[0_0_15px_rgba(56,189,248,0.8)]';
    if (report.severity === 'emergency') return 'bg-emergency border-white text-white shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse';
    if (report.severity === 'high') return 'bg-orange-500 border-white text-white shadow-[0_0_12px_rgba(249,115,22,0.6)]';
    if (report.severity === 'medium') return 'bg-amber-400 border-white text-[#071320]';
    return 'bg-blue-500 border-white text-white';
  };

  // Convert lat/long to approximate container percentage (Dhaka coordinates: lat 23.70 to 23.89, lng 90.34 to 90.44)
  const getCoordinatesPercent = (lat: number, lng: number) => {
    const minLat = 23.70;
    const maxLat = 23.89;
    const minLng = 90.34;
    const maxLng = 90.44;

    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;

    return {
      top: `${Math.max(12, Math.min(86, y))}%`,
      left: `${Math.max(10, Math.min(88, x))}%`,
    };
  };

  return (
    <section className="py-20 bg-[#060D1A] border-t border-white/10 relative overflow-hidden text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emergency/15 border border-emergency/30 text-xs font-mono font-bold text-red-300">
              <span className="w-2 h-2 rounded-full bg-emergency animate-ping" />
              <span>{t.mapPreview.title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {language === 'en' ? 'Active Hazards Across Dhaka City' : 'ঢাকা শহরের চলমান নাগরিক ঝুঁকি ও সমাধান'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {t.mapPreview.subtitle}
            </p>
          </div>

          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.35)] transition transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <span>{t.mapPreview.viewFullMap}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>

        {/* Map Canvas with Interactive Popover */}
        <div className="relative rounded-3xl bg-[#071320] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden ring-1 ring-sky-500/15">
          
          {/* Top Filter Bar inside Map */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-[#0A1628]/90 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold font-sans">
              <button
                onClick={() => setFilterSeverity('all')}
                className={`px-3 py-1.5 rounded-xl transition ${
                  filterSeverity === 'all'
                    ? 'bg-sky-400 text-[#071320] font-black shadow-sm'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                All Hazards
              </button>
              <button
                onClick={() => setFilterSeverity('emergency')}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                  filterSeverity === 'emergency'
                    ? 'bg-emergency text-white font-black shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                    : 'bg-white/5 text-red-300 hover:bg-white/10 border border-red-500/30'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emergency" />
                Emergency
              </button>
              <button
                onClick={() => setFilterSeverity('high')}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                  filterSeverity === 'high'
                    ? 'bg-orange-500 text-white font-black'
                    : 'bg-white/5 text-orange-300 hover:bg-white/10 border border-orange-500/30'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                High Risk
              </button>
              <button
                onClick={() => setFilterSeverity('resolved')}
                className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                  filterSeverity === 'resolved'
                    ? 'bg-sky-400 text-[#071320] font-black'
                    : 'bg-white/5 text-sky-300 hover:bg-white/10 border border-sky-400/30'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Resolved
              </button>
            </div>

            {/* Legend Indicators */}
            <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emergency" />
                Emergency
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                High
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Normal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Resolved
              </span>
            </div>
          </div>

          {/* Interactive Map Visual Stage */}
          <div className="relative h-[480px] sm:h-[560px] w-full bg-[#040A14] overflow-hidden select-none">
            {/* Map Roads & Geographic Grid Simulation */}
            <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="street-grid-preview" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2563EB" strokeWidth="0.8" opacity="0.35" />
                  <path d="M 0 40 L 80 40" fill="none" stroke="#38BDF8" strokeWidth="0.4" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#street-grid-preview)" />
              {/* Buriganga & Turag River Path Curves */}
              <path
                d="M 50 480 Q 200 420 350 490 T 700 460 T 1100 490"
                fill="none"
                stroke="#0284C7"
                strokeWidth="28"
                opacity="0.3"
              />
              {/* Major Highway Arteries */}
              <line x1="380" y1="20" x2="380" y2="520" stroke="#38BDF8" strokeWidth="4" opacity="0.4" strokeDasharray="8 6" />
              <line x1="120" y1="260" x2="900" y2="260" stroke="#38BDF8" strokeWidth="3" opacity="0.35" />
            </svg>

            {/* Neighborhood Labels */}
            <div className="absolute top-[22%] left-[45%] text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Uttara
            </div>
            <div className="absolute top-[38%] left-[28%] text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Mirpur
            </div>
            <div className="absolute top-[48%] left-[58%] text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Gulshan
            </div>
            <div className="absolute top-[60%] left-[36%] text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Dhanmondi
            </div>
            <div className="absolute top-[75%] left-[52%] text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Motijheel
            </div>

            {/* Clickable Report Pin Markers */}
            {filteredReports.map((report) => {
              const pos = getCoordinatesPercent(report.latitude, report.longitude);
              const isSelected = selectedReport?.id === report.id;
              const markerColor = getMarkerColor(report);

              return (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border-2 transition-all transform duration-200 z-10 ${markerColor} ${
                    isSelected ? 'scale-125 ring-4 ring-sky-400/50 z-30' : 'hover:scale-115'
                  }`}
                  title={`${report.title} (${report.area})`}
                >
                  <MapPin className="w-4 h-4" />
                </button>
              );
            })}

            {/* Zero Fake Reports Active State */}
            {filteredReports.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center p-6 pointer-events-none z-20">
                <div className="bg-[#0A1628]/95 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-3xl max-w-md text-center space-y-4 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center border border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                    <ShieldCheck className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[10px] font-display font-bold uppercase tracking-widest text-sky-300 bg-sky-500/15 px-2.5 py-0.5 rounded-full border border-sky-400/30 inline-block mb-1.5 tabular-nums">
                      Live Telemetry • 0 Active Threats
                    </span>
                    <h4 className="text-base font-black text-white">Dhaka Safety Mesh Active</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Zero unverified hazards currently logged. Real reports submitted by verified citizens will appear directly on this live map.
                    </p>
                  </div>
                  <Link
                    href="/report/new"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emergency hover:bg-emergency-hover text-white font-extrabold text-xs transition shadow-[0_0_20px_rgba(239,68,68,0.4)] transform hover:scale-105 active:scale-95"
                  >
                    <span>🚨 Log First Community Hazard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Floating Report Preview Card with Dark Obsidian Frosted Glass */}
            {selectedReport && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 bg-[#0A1628]/95 backdrop-blur-2xl rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-white/15 z-30 animate-in fade-in slide-in-from-bottom-3 duration-300 ring-1 ring-sky-500/20">
                {/* Photo Thumbnail */}
                {selectedReport.imageUrl && (
                  <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-3 bg-slate-900 border border-white/10 group">
                    <img 
                      src={selectedReport.imageUrl} 
                      alt={selectedReport.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-white flex items-center gap-1 border border-white/20">
                      <Clock className="w-3 h-3 text-sky-400" />
                      <span>{selectedReport.area} • Dhaka</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-black text-sky-300 uppercase tracking-wider bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-400/20">
                      {selectedReport.categoryId.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-slate-400 font-mono font-bold">
                      {selectedReport.publicId}
                    </span>
                  </div>
                  <StatusBadge status={selectedReport.status} size="sm" />
                </div>

                <h3 className="font-extrabold text-white text-sm leading-snug line-clamp-2">
                  {selectedReport.title}
                </h3>

                <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                  <span className="truncate">{selectedReport.locationName}</span>
                </p>

                <div className="flex items-center justify-between text-xs text-slate-300 mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <Users className="w-3.5 h-3.5 text-sky-400" />
                    <span>{selectedReport.confirmationsCount} verified</span>
                  </div>
                  <SeverityBadge severity={selectedReport.severity} size="sm" showIcon={false} />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/report/${selectedReport.id}`}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-xs text-center shadow-md transition"
                  >
                    View Full Report →
                  </Link>
                  <Link
                    href="/map"
                    className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/10"
                    title="Open on Interactive Map"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
