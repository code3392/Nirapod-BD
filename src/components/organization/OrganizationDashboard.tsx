'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Report, ReportStatus, SeverityLevel } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import SeverityBadge from '@/components/common/SeverityBadge';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Hammer, 
  Upload, 
  Camera, 
  FileText, 
  Check, 
  X,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send
} from 'lucide-react';

export default function OrganizationDashboard() {
  const { language, t, reports, updateReportStatus, submitResolution } = useApp();
  const [activeTab, setActiveTab] = useState<'open' | 'high_priority' | 'in_progress' | 'resolved'>('open');

  // Resolve Modal State
  const [resolvingReport, setResolvingReport] = useState<Report | null>(null);
  const [resolutionDesc, setResolutionDesc] = useState<string>('');
  const [afterImage, setAfterImage] = useState<string>('');

  // Tab Filtering
  const openReports = reports.filter(r => r.status === 'SUBMITTED' || r.status === 'VERIFIED' || r.status === 'ASSIGNED');
  const highPriorityReports = reports.filter(r => (r.severity === 'high' || r.severity === 'emergency') && r.status !== 'RESOLVED');
  const inProgressReports = reports.filter(r => r.status === 'IN_PROGRESS');
  const resolvedReports = reports.filter(r => r.status === 'RESOLVED' || r.status === 'COMMUNITY_CONFIRMED');

  const currentTabReports = {
    open: openReports,
    high_priority: highPriorityReports,
    in_progress: inProgressReports,
    resolved: resolvedReports,
  }[activeTab];

  const handleOpenResolveModal = (report: Report) => {
    setResolvingReport(report);
    setResolutionDesc('');
    setAfterImage('');
  };

  const handleConfirmResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingReport) return;

    submitResolution(resolvingReport.id, {
      organizationId: 'org-1',
      organizationName: 'Dhaka North City Corporation (Zone-4)',
      description: resolutionDesc,
      beforeImage: resolvingReport.mediaUrl || resolvingReport.imageUrl || '',
      afterImage: afterImage,
      resolvedAt: new Date().toISOString(),
    });

    setResolvingReport(null);
  };

  return (
    <div className="min-h-screen bg-transparent text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Organization Header (Cyber Glass Banner) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#130C24]/85 backdrop-blur-2xl border border-white/10 text-white shadow-2xl ring-1 ring-purple-500/15">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.25)]">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">
                  Dhaka North City Corporation (DNCC)
                </h1>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                  Verified Civic Agency
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Zone-4 Engineering, Waste Management & Drainage Rapid Response Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/map"
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition border border-white/10"
            >
              Zone Map
            </Link>
            <Link
              href="/reports"
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-black transition shadow-[0_0_15px_rgba(56,189,248,0.3)]"
            >
              Public Feed
            </Link>
          </div>
        </div>

        {/* 4 Metric Counter Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('open')}
            className={`p-6 rounded-3xl text-left border transition-all duration-200 ${
              activeTab === 'open'
                ? 'bg-sky-500/15 border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-sky-400'
                : 'bg-[#130C24]/85 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans font-bold text-slate-400">{t.organization.openReports}</span>
              <Clock className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-3xl font-black text-white font-display tabular-nums">{openReports.length + 16}</p>
            <p className="text-[11px] text-slate-400 mt-1">Requires inspection</p>
          </button>

          <button
            onClick={() => setActiveTab('high_priority')}
            className={`p-6 rounded-3xl text-left border transition-all duration-200 ${
              activeTab === 'high_priority'
                ? 'bg-orange-500/15 border-orange-400/50 shadow-[0_0_20px_rgba(249,115,22,0.25)] ring-1 ring-orange-400'
                : 'bg-[#130C24]/85 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans font-bold text-slate-400">{t.organization.highPriority}</span>
              <AlertTriangle className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-3xl font-black text-orange-400 font-display tabular-nums">{highPriorityReports.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Immediate danger</p>
          </button>

          <button
            onClick={() => setActiveTab('in_progress')}
            className={`p-6 rounded-3xl text-left border transition-all duration-200 ${
              activeTab === 'in_progress'
                ? 'bg-blue-600/15 border-blue-400/50 shadow-[0_0_20px_rgba(37,99,235,0.25)] ring-1 ring-blue-400'
                : 'bg-[#130C24]/85 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans font-bold text-slate-400">{t.organization.inProgress}</span>
              <Hammer className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-3xl font-black text-blue-300 font-display tabular-nums">{inProgressReports.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Crew on site</p>
          </button>

          <button
            onClick={() => setActiveTab('resolved')}
            className={`p-6 rounded-3xl text-left border transition-all duration-200 ${
              activeTab === 'resolved'
                ? 'bg-sky-400/15 border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-sky-400'
                : 'bg-[#130C24]/85 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-sans font-bold text-slate-400">{t.organization.resolved}</span>
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-3xl font-black text-sky-300 font-display tabular-nums">{resolvedReports.length}</p>
            <p className="text-[11px] text-slate-400 mt-1">Completed & proofed</p>
          </button>
        </div>

        {/* Action Table Panel */}
        <div className="bg-[#130C24]/85 rounded-3xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-white">
                Assigned Hazard Dispatch Queue
              </span>
              <span className="text-xs font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-slate-300">
                {currentTabReports.length} Active Records
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-slate-300 uppercase font-mono font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-6">{t.organization.tableId}</th>
                  <th className="py-3 px-4">{t.organization.tableCategory}</th>
                  <th className="py-3 px-4">{t.organization.tableLocation}</th>
                  <th className="py-3 px-4">{t.organization.tableSeverity}</th>
                  <th className="py-3 px-4">{t.organization.tableStatus}</th>
                  <th className="py-3 px-4">{t.organization.tableConfirmations}</th>
                  <th className="py-3 px-6 text-right">{t.organization.tableActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {currentTabReports.map((report) => (
                  <tr key={report.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-6 font-mono font-bold text-sky-300 whitespace-nowrap">
                      {report.publicId}
                    </td>
                    <td className="py-3 px-4 capitalize font-semibold text-slate-200 whitespace-nowrap">
                      {report.categoryId.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-white">
                      <p className="font-bold truncate">{report.title}</p>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{report.locationName}</p>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <SeverityBadge severity={report.severity} size="sm" showIcon={false} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <StatusBadge status={report.status} size="sm" />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-bold text-white">
                      👥 {report.confirmationsCount}
                    </td>
                    <td className="py-3 px-6 whitespace-nowrap text-right space-x-1.5">
                      {report.status !== 'IN_PROGRESS' && report.status !== 'RESOLVED' && (
                        <button
                          onClick={() => updateReportStatus(report.id, 'IN_PROGRESS', 'Assigned crew on route')}
                          className="px-2.5 py-1 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-sky-300 font-bold text-[11px] border border-blue-400/30 transition"
                        >
                          {t.organization.btnMarkInProgress}
                        </button>
                      )}

                      {report.status !== 'RESOLVED' ? (
                        <button
                          onClick={() => handleOpenResolveModal(report)}
                          className="px-3 py-1 rounded-lg bg-sky-400 hover:bg-sky-300 text-[#0E081B] font-black text-[11px] shadow-sm transition"
                        >
                          {t.organization.btnResolve}
                        </button>
                      ) : (
                        <Link
                          href={`/report/${report.id}`}
                          className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-[11px] transition inline-block"
                        >
                          View Proof ✓
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RESOLUTION SUBMISSION MODAL */}
        {resolvingReport && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl bg-[#150D28]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/15 overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-purple-500/20 text-white">
              {/* Modal Header */}
              <div className="bg-white/5 p-5 text-white flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-purple-300">
                      Official Maintenance Proof
                    </span>
                    <h3 className="text-base font-extrabold text-white">
                      {t.organization.resolveModalTitle} ({resolvingReport.publicId})
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setResolvingReport(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleConfirmResolution} className="p-6 space-y-5">
                {/* Problem Title & Location info */}
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs">
                  <p className="font-extrabold text-white">{resolvingReport.title}</p>
                  <p className="text-slate-400 mt-0.5">{resolvingReport.locationName}</p>
                </div>

                {/* Before & After Photo Comparison Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Before Photo */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      {t.organization.beforePhoto}
                    </label>
                    <div className="relative h-36 rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
                      <img
                        src={resolvingReport.mediaUrl || resolvingReport.imageUrl}
                        alt="Original Hazard"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-emergency text-white">
                        Original Hazard
                      </span>
                    </div>
                  </div>

                  {/* After Photo */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-300">
                      {t.organization.afterPhoto}
                    </label>
                    <div className="relative h-36 rounded-2xl overflow-hidden border border-white/10 bg-slate-900">
                      <img
                        src={afterImage}
                        alt="Repaired Resolution"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-extrabold bg-sky-500 text-white">
                        Repaired & Cleared
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick sample After-Photos */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 font-mono font-bold block">
                    Select resolution photo proof:
                  </span>
                  <div className="flex gap-2">
                    {[
                      { label: 'Fresh Asphalt', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80' },
                      { label: 'Cleaned Road', url: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80' },
                      { label: 'Repaired Lights', url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80' },
                    ].map((item, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setAfterImage(item.url)}
                        className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border transition ${
                          afterImage === item.url
                            ? 'bg-sky-400 text-[#0E081B] font-black border-sky-400 shadow-sm'
                            : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* What was done description */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    {t.organization.resolveDescriptionLabel} <span className="text-emergency">*</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={resolutionDesc}
                    onChange={(e) => setResolutionDesc(e.target.value)}
                    placeholder={t.organization.resolvePlaceholder}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:border-sky-400 focus:bg-white/10 focus:outline-none transition"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setResolvingReport(null)}
                    className="px-4 py-2.5 rounded-full border border-white/10 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-black shadow-md transition"
                  >
                    {t.organization.submitResolutionBtn}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
