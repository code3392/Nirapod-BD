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
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function MapPreviewSection() {
  const { language, t, reports } = useApp();
  
  // Select 6 prime demo reports from different Dhaka regions
  const demoReports = reports.slice(0, 8);
  const [selectedReport, setSelectedReport] = useState<Report>(demoReports[0]);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');

  const filteredReports = filterSeverity === 'all' 
    ? demoReports 
    : demoReports.filter(r => r.severity === filterSeverity || (filterSeverity === 'resolved' && r.status === 'RESOLVED'));

  const getMarkerColor = (report: Report) => {
    if (report.status === 'RESOLVED') return 'bg-civic-blue border-white text-white shadow-glow';
    if (report.severity === 'emergency') return 'bg-emergency border-white text-white shadow-emergency animate-pulse';
    if (report.severity === 'high') return 'bg-orange-500 border-white text-white';
    if (report.severity === 'medium') return 'bg-amber-400 border-navy text-navy';
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
      top: `${Math.max(10, Math.min(88, y))}%`,
      left: `${Math.max(10, Math.min(88, x))}%`,
    };
  };

  return (
    <section className="py-20 bg-surface border-t border-surface-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emergency/10 border border-emergency/20 text-xs font-bold text-emergency">
              <span className="w-2 h-2 rounded-full bg-emergency animate-ping" />
              <span>{t.mapPreview.title}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
              {language === 'en' ? 'Active Hazards Across Dhaka City' : 'ঢাকা শহরের চলমান নাগরিক ঝুঁকি ও সমাধান'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {t.mapPreview.subtitle}
            </p>
          </div>

          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-navy hover:bg-navy-dark text-white font-bold text-sm shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <span>{t.mapPreview.viewFullMap}</span>
            <ArrowRight className="w-4 h-4 text-civic-blue" />
          </Link>
        </div>

        {/* Map Canvas with Interactive Popover */}
        <div className="relative rounded-3xl bg-slate-900 border border-slate-800 shadow-elevated overflow-hidden">
          {/* Top Filter Bar inside Map */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 bg-navy-dark/90 backdrop-blur-md p-3 rounded-2xl border border-white/10">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
              <button
                onClick={() => setFilterSeverity('all')}
                className={`px-3 py-1 rounded-xl transition ${
                  filterSeverity === 'all'
                    ? 'bg-civic-blue text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                All Hazards
              </button>
              <button
                onClick={() => setFilterSeverity('emergency')}
                className={`px-3 py-1 rounded-xl flex items-center gap-1.5 transition ${
                  filterSeverity === 'emergency'
                    ? 'bg-emergency text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emergency" />
                Emergency
              </button>
              <button
                onClick={() => setFilterSeverity('high')}
                className={`px-3 py-1 rounded-xl flex items-center gap-1.5 transition ${
                  filterSeverity === 'high'
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                High Risk
              </button>
              <button
                onClick={() => setFilterSeverity('resolved')}
                className={`px-3 py-1 rounded-xl flex items-center gap-1.5 transition ${
                  filterSeverity === 'resolved'
                    ? 'bg-civic-blue text-white'
                    : 'bg-white/10 text-slate-300 hover:bg-white/15'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-civic-blue" />
                Resolved
              </button>
            </div>

            {/* Legend Indicators */}
            <div className="hidden lg:flex items-center gap-4 text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emergency" />
                🔴 Emergency
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                🟠 High
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                🟡 Normal
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-civic-blue" />
                🔵 Resolved
              </span>
            </div>
          </div>

          {/* Interactive Map Visual Stage */}
          <div className="relative h-[480px] sm:h-[540px] w-full bg-[#0c1a29] overflow-hidden select-none">
            {/* Map Roads & Geographic Grid Simulation */}
            <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="street-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#2563EB" strokeWidth="0.8" opacity="0.4" />
                  <path d="M 0 40 L 80 40" fill="none" stroke="#38BDF8" strokeWidth="0.4" opacity="0.25" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#street-grid)" />
              {/* Buriganga & Turag River Path Curves */}
              <path
                d="M 50 480 Q 200 420 350 490 T 700 460 T 1100 490"
                fill="none"
                stroke="#0284C7"
                strokeWidth="28"
                opacity="0.35"
              />
              {/* Major Highway Arteries (Mirpur Rd, Airport Rd, Pragati Sarani) */}
              <line x1="380" y1="20" x2="380" y2="520" stroke="#64748B" strokeWidth="6" opacity="0.6" strokeDasharray="8 4" />
              <line x1="120" y1="260" x2="900" y2="260" stroke="#64748B" strokeWidth="5" opacity="0.5" />
            </svg>

            {/* Neighborhood Labels */}
            <div className="absolute top-[22%] left-[45%] text-[11px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Uttara
            </div>
            <div className="absolute top-[38%] left-[28%] text-[11px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Mirpur
            </div>
            <div className="absolute top-[48%] left-[58%] text-[11px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Gulshan
            </div>
            <div className="absolute top-[60%] left-[36%] text-[11px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
              Dhanmondi
            </div>
            <div className="absolute top-[75%] left-[52%] text-[11px] font-bold text-slate-500 uppercase tracking-widest pointer-events-none">
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
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full border-2 transition-all transform duration-200 z-10 ${markerColor} ${
                    isSelected ? 'scale-125 ring-4 ring-white/50 z-30' : 'hover:scale-115'
                  }`}
                  title={`${report.title} (${report.area})`}
                >
                  <MapPin className="w-4 h-4" />
                </button>
              );
            })}

            {/* Floating Report Preview Card */}
            {selectedReport && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 bg-white rounded-3xl p-5 shadow-2xl border border-surface-border z-30 animate-in fade-in slide-in-from-bottom-3 duration-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-navy uppercase tracking-wider">
                      {selectedReport.categoryId.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-muted font-mono font-bold">
                      {selectedReport.publicId}
                    </span>
                  </div>
                  <StatusBadge status={selectedReport.status} size="sm" />
                </div>

                <h3 className="font-extrabold text-navy text-sm leading-snug line-clamp-2">
                  {selectedReport.title}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                  <span className="truncate">{selectedReport.locationName}</span>
                </p>

                <div className="flex items-center justify-between text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 font-bold text-navy">
                    <Users className="w-3.5 h-3.5 text-civic-blue" />
                    <span>{selectedReport.confirmationsCount} people confirmed this</span>
                  </div>
                  <SeverityBadge severity={selectedReport.severity} size="sm" showIcon={false} />
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <Link
                    href={`/report/${selectedReport.id}`}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-navy hover:bg-navy-dark text-white font-extrabold text-xs text-center shadow-md transition"
                  >
                    View Full Report →
                  </Link>
                  <Link
                    href="/map"
                    className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
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
