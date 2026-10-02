'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Report, ReportStatus, SeverityLevel } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import SeverityBadge from '@/components/common/SeverityBadge';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  Sliders, 
  ChevronRight,
  ExternalLink,
  Trash2,
  Check,
  X,
  UserCheck,
  Building
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip as RechartsTooltip, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid 
} from 'recharts';

export default function AdminDashboard() {
  const { language, t, reports, updateReportStatus } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // KPI Metrics
  const totalReportsCount = 1284;
  const resolvedReportsCount = 923;
  const verifiedReportsCount = 973;
  const activeReportsCount = 361;
  const totalUsersCount = 4521;

  // Chart Data: Categories
  const categoryData = [
    { name: 'Road Hazard', value: 34, color: '#F59E0B' },
    { name: 'Waste / Sanitation', value: 26, color: '#10B981' },
    { name: 'Flood / Drainage', value: 18, color: '#0284C7' },
    { name: 'Electrical', value: 12, color: '#EF4444' },
    { name: 'Other Infrastructure', value: 10, color: '#8B5CF6' },
  ];

  // Chart Data: Hotspots
  const hotspotData = [
    { name: 'Mirpur', count: 342, fill: '#0B1F33' },
    { name: 'Mohammadpur', count: 268, fill: '#142C44' },
    { name: 'Uttara', count: 245, fill: '#18A558' },
    { name: 'Dhanmondi', count: 189, fill: '#F59E0B' },
    { name: 'Motijheel', count: 142, fill: '#0284C7' },
    { name: 'Gulshan', count: 98, fill: '#8B5CF6' },
  ];

  // Filtered reports for table
  const filteredReports = reports.filter((r) => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.publicId.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.locationName.toLowerCase().includes(q) ||
        r.userName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 text-xs font-bold text-navy uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4 text-safety" />
            <span>Civic Control Centre</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
            {t.admin.title}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {t.admin.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/organization"
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-navy hover:bg-slate-100 transition shadow-2xs"
          >
            Agency Portal →
          </Link>
          <Link
            href="/map"
            className="px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold shadow-md hover:bg-navy-dark transition"
          >
            Live Map Monitor
          </Link>
        </div>
      </div>

      {/* 5 KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-1">
          <span className="text-xs text-muted font-bold block">{t.admin.totalUsers}</span>
          <p className="text-3xl font-black text-navy">{totalUsersCount.toLocaleString()}</p>
          <span className="text-[11px] text-safety font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +142 this week
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-1">
          <span className="text-xs text-muted font-bold block">{t.admin.totalReports}</span>
          <p className="text-3xl font-black text-navy">{totalReportsCount.toLocaleString()}</p>
          <span className="text-[11px] text-muted">All-time submissions</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-1">
          <span className="text-xs text-muted font-bold block">{t.admin.verifiedReports}</span>
          <p className="text-3xl font-black text-indigo-600">{verifiedReportsCount.toLocaleString()}</p>
          <span className="text-[11px] text-indigo-600 font-bold">75.7% accuracy</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-1">
          <span className="text-xs text-muted font-bold block">{t.admin.resolvedReports}</span>
          <p className="text-3xl font-black text-safety">{resolvedReportsCount.toLocaleString()}</p>
          <span className="text-[11px] text-safety font-bold">71.8% resolution</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-1 col-span-2 lg:col-span-1">
          <span className="text-xs text-muted font-bold block">{t.admin.activeReports}</span>
          <p className="text-3xl font-black text-amber-500">{activeReportsCount.toLocaleString()}</p>
          <span className="text-[11px] text-amber-600 font-bold">Under civic action</span>
        </div>
      </div>

      {/* Analytics Charts (Recharts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown Donut */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-navy">
              {t.admin.categoriesBreakdown}
            </h3>
            <p className="text-xs text-slate-500">Distribution across 1,284 logged incidents</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold pt-2 border-t border-slate-100">
            {categoryData.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="text-slate-700 truncate">{c.name}:</span>
                <span className="font-bold text-navy">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hotspots Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-navy">
              {t.admin.hotspotsTitle}
            </h3>
            <p className="text-xs text-slate-500">High-frequency incident wards requiring municipal triage</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hotspotData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#627D98' }} />
                <YAxis tick={{ fontSize: 11, fill: '#627D98' }} />
                <RechartsTooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#0B1F33" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-slate-100">
            <span>Primary Focus: Mirpur (DNCC Zone 4) & Mohammadpur (Zone 5)</span>
            <span className="text-safety font-bold">Real-time Telemetry</span>
          </div>
        </div>
      </div>

      {/* Report Management Table */}
      <div className="bg-white rounded-3xl border border-surface-border shadow-subtle overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-black text-navy">
              {t.admin.recentReports}
            </h3>
            <p className="text-xs text-slate-500">Triage, verify, or dispatch maintenance crews to open issues</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t.admin.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-safety focus:outline-none w-48 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-navy bg-white focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="VERIFIED">Verified</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-y border-surface-border text-navy uppercase font-extrabold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Reporter</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.slice(0, 15).map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-6 font-mono font-bold text-navy whitespace-nowrap">
                    {report.publicId}
                  </td>
                  <td className="py-3 px-4 capitalize font-semibold text-slate-700 whitespace-nowrap">
                    {report.categoryId.replace('_', ' ')}
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate text-slate-800">
                    {report.locationName}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <SeverityBadge severity={report.severity} size="sm" showIcon={false} />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <StatusBadge status={report.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {report.userName}
                  </td>
                  <td className="py-3 px-4 text-muted text-[11px] whitespace-nowrap">
                    {new Date(report.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="py-3 px-6 whitespace-nowrap text-right space-x-1.5">
                    <Link
                      href={`/report/${report.id}`}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] transition inline-block"
                      title="View Report"
                    >
                      View
                    </Link>

                    {report.status !== 'VERIFIED' && (
                      <button
                        onClick={() => updateReportStatus(report.id, 'VERIFIED', 'Admin manual verification')}
                        className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition"
                        title="Verify Report"
                      >
                        Verify
                      </button>
                    )}

                    {report.status !== 'IN_PROGRESS' && report.status !== 'RESOLVED' && (
                      <button
                        onClick={() => updateReportStatus(report.id, 'IN_PROGRESS', 'Admin assigned to field crew')}
                        className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-[11px] border border-blue-200 transition"
                        title="Assign to Crew"
                      >
                        Assign
                      </button>
                    )}

                    {report.status !== 'RESOLVED' && (
                      <button
                        onClick={() => updateReportStatus(report.id, 'RESOLVED', 'Admin marked resolved')}
                        className="px-2 py-1 rounded-lg bg-safety/10 hover:bg-safety/20 text-safety font-bold text-[11px] border border-safety/30 transition"
                        title="Mark Resolved"
                      >
                        Resolve
                      </button>
                    )}

                    {report.status !== 'REJECTED' && (
                      <button
                        onClick={() => updateReportStatus(report.id, 'REJECTED', 'Marked non-civic / spam')}
                        className="px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] border border-rose-200 transition"
                        title="Reject Report"
                      >
                        Reject
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
