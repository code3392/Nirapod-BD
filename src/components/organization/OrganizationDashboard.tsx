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
  const [afterImage, setAfterImage] = useState<string>('https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80');

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
    setResolutionDesc(`Pavement reinforced with C-25 concrete and asphalt compaction completed by DNCC Rapid Maintenance Team. Flow verified unobstructed.`);
    setAfterImage('https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=800&q=80');
  };

  const handleConfirmResolution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolvingReport) return;

    submitResolution(resolvingReport.id, {
      organizationId: 'org-1',
      organizationName: 'Dhaka North City Corporation (Zone-4)',
      description: resolutionDesc,
      beforeImage: resolvingReport.imageUrl,
      afterImage: afterImage,
      resolvedAt: new Date().toISOString(),
    });

    setResolvingReport(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Organization Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-navy text-white shadow-elevated">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-safety shrink-0">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">
                Dhaka North City Corporation (DNCC)
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-safety text-white">
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
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition border border-white/20"
          >
            Zone Map
          </Link>
          <Link
            href="/reports"
            className="px-4 py-2 rounded-xl bg-safety hover:bg-safety-hover text-white text-xs font-bold transition shadow-sm"
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
              ? 'bg-blue-50/80 border-navy shadow-md ring-2 ring-navy'
              : 'bg-white border-surface-border hover:border-slate-300 shadow-subtle'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted">{t.organization.openReports}</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-3xl font-black text-navy">{openReports.length + 16}</p>
          <p className="text-[11px] text-slate-500 mt-1">Requires inspection</p>
        </button>

        <button
          onClick={() => setActiveTab('high_priority')}
          className={`p-6 rounded-3xl text-left border transition-all duration-200 ${
            activeTab === 'high_priority'
              ? 'bg-orange-50/80 border-orange-500 shadow-md ring-2 ring-orange-500'
              : 'bg-white border-surface-border hover:border-slate-300 shadow-subtle'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted">{t.organization.highPriority}</span>
            <AlertTriangle className="w-4 h-4 text-orange-500" />
          </div>
          <p className="text-3xl font-black text-orange-600">{highPriorityReports.length}</p>
          <p className="text-[11px] text-slate-500 mt-1">Immediate danger</p>
        </button>

        <button
          onClick={() => setActiveTab('in_progress')}
          className={`p-6 rounded-3xl text-left border transition-all duration-200 ${
            activeTab === 'in_progress'
              ? 'bg-indigo-50/80 border-indigo-600 shadow-md ring-2 ring-indigo-600'
              : 'bg-white border-surface-border hover:border-slate-300 shadow-subtle'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted">{t.organization.inProgress}</span>
            <Hammer className="w-4 h-4 text-indigo-600 animate-spin-slow" />
          </div>
          <p className="text-3xl font-black text-indigo-600">{inProgressReports.length + 8}</p>
          <p className="text-[11px] text-slate-500 mt-1">Crew dispatched on-site</p>
        </button>

        <button
          onClick={() => setActiveTab('resolved')}
          className={`p-6 rounded-3xl text-left border transition-all duration-200 ${
            activeTab === 'resolved'
              ? 'bg-emerald-50/80 border-safety shadow-md ring-2 ring-safety'
              : 'bg-white border-surface-border hover:border-slate-300 shadow-subtle'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-muted">{t.organization.resolved}</span>
            <CheckCircle2 className="w-4 h-4 text-safety" />
          </div>
          <p className="text-3xl font-black text-safety">{resolvedReports.length + 65}</p>
          <p className="text-[11px] text-slate-500 mt-1">Citizen verified fixes</p>
        </button>
      </div>

      {/* Active Tab Reports Table */}
      <div className="bg-white rounded-3xl border border-surface-border shadow-subtle overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-navy capitalize">
              {activeTab.replace('_', ' ')} Reports Management
            </h3>
            <p className="text-xs text-slate-500">
              Assigned municipal incidents for verification, maintenance assignment, and resolution submission.
            </p>
          </div>
          <span className="text-xs font-bold text-muted bg-slate-100 px-3 py-1 rounded-full">
            {currentTabReports.length} incidents
          </span>
        </div>

        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-y border-surface-border text-navy uppercase font-extrabold text-[10px] tracking-wider">
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
            <tbody className="divide-y divide-slate-100">
              {currentTabReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-6 font-mono font-bold text-navy whitespace-nowrap">
                    {report.publicId}
                  </td>
                  <td className="py-3 px-4 capitalize font-semibold text-slate-700 whitespace-nowrap">
                    {report.categoryId.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-800">
                    <p className="font-bold truncate">{report.title}</p>
                    <p className="text-[11px] text-slate-500 truncate">{report.locationName}</p>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <SeverityBadge severity={report.severity} size="sm" showIcon={false} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusBadge status={report.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-bold text-navy">
                    👥 {report.confirmationsCount}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap text-right space-x-1.5">
                    {report.status !== 'IN_PROGRESS' && report.status !== 'RESOLVED' && (
                      <button
                        onClick={() => updateReportStatus(report.id, 'IN_PROGRESS', 'Assigned crew on route')}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] border border-blue-200 transition"
                      >
                        {t.organization.btnMarkInProgress}
                      </button>
                    )}

                    {report.status !== 'RESOLVED' ? (
                      <button
                        onClick={() => handleOpenResolveModal(report)}
                        className="px-3 py-1 rounded-lg bg-safety hover:bg-safety-hover text-white font-extrabold text-[11px] shadow-sm transition"
                      >
                        {t.organization.btnResolve}
                      </button>
                    ) : (
                      <Link
                        href={`/report/${report.id}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition inline-block"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-surface-border overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-navy p-5 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-safety/20 text-safety flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-300">
                    Official Maintenance Proof
                  </span>
                  <h3 className="text-base font-extrabold text-white">
                    {t.organization.resolveModalTitle} ({resolvingReport.publicId})
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setResolvingReport(null)}
                className="p-1 rounded-full text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleConfirmResolution} className="p-6 space-y-5">
              {/* Problem Title & Location info */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <p className="font-extrabold text-navy">{resolvingReport.title}</p>
                <p className="text-slate-500 mt-0.5">{resolvingReport.locationName}</p>
              </div>

              {/* Before & After Photo Comparison Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Before Photo (Existing) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy">
                    {t.organization.beforePhoto}
                  </label>
                  <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                    <img
                      src={resolvingReport.imageUrl}
                      alt="Original Hazard"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-extrabold bg-emergency text-white">
                      Original Hazard
                    </span>
                  </div>
                </div>

                {/* After Photo (Resolution) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-navy">
                    {t.organization.afterPhoto}
                  </label>
                  <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
                    <img
                      src={afterImage}
                      alt="Repaired Resolution"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-extrabold bg-safety text-white">
                      Repaired & Cleared
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick sample After-Photos for test selection */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-muted font-bold block">
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
                          ? 'bg-safety text-white border-safety shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* What was done description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-navy">
                  {t.organization.resolveDescriptionLabel} <span className="text-emergency">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={resolutionDesc}
                  onChange={(e) => setResolutionDesc(e.target.value)}
                  placeholder={t.organization.resolvePlaceholder}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-safety focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setResolvingReport(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-safety hover:bg-safety-hover text-white text-xs font-black shadow-md transition"
                >
                  {t.organization.submitResolutionBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
