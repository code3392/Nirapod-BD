'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Report, CategoryId, SeverityLevel, ReportStatus } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import SeverityBadge from '@/components/common/SeverityBadge';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Users, 
  ArrowUpDown, 
  Grid, 
  List, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  X
} from 'lucide-react';

export default function ReportsDirectory() {
  const { language, t, reports } = useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'votes' | 'severity'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Filter logic
  const filtered = reports.filter((r) => {
    if (selectedCategory !== 'all' && r.categoryId !== selectedCategory) return false;
    if (selectedStatus !== 'all' && r.status !== selectedStatus) return false;
    if (selectedSeverity !== 'all' && r.severity !== selectedSeverity) return false;
    if (selectedArea !== 'all' && r.area !== selectedArea) return false;

    if (search.trim()) {
      const q = search.toLowerCase();
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchArea = r.area.toLowerCase().includes(q);
      const matchLocation = r.locationName.toLowerCase().includes(q);
      const matchId = r.publicId.toLowerCase().includes(q);
      if (!matchTitle && !matchArea && !matchLocation && !matchId) return false;
    }
    return true;
  });

  // Sort logic
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.confirmationsCount - a.confirmationsCount;
    }
    if (sortBy === 'severity') {
      const rank: Record<SeverityLevel, number> = { emergency: 4, high: 3, medium: 2, low: 1 };
      return rank[b.severity] - rank[a.severity];
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Dhaka areas list
  const dhakaAreas = ['Mirpur', 'Uttara', 'Dhanmondi', 'Mohammadpur', 'Motijheel', 'Gulshan', 'Banani', 'Badda', 'Old Dhaka', 'Farmgate'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold text-safety tracking-wider">
            Public Registry
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight mt-1">
            {language === 'en' ? 'Civic Hazards & Community Reports' : 'নাগরিক সমস্যা ও প্রতিবেদনের তালিকা'}
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            {language === 'en' 
              ? 'Browse, verify, and monitor public safety alerts filed across Bangladesh.'
              : 'ঢাকা শহরের সকল নাগরিক রিপোর্ট পর্যালোচনা করুন এবং সত্যতা নিশ্চিত করতে সহায়তা করুন।'}
          </p>
        </div>

        <Link
          href="/report/new"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emergency hover:bg-emergency-hover text-white font-extrabold text-sm shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 shrink-0 self-start md:self-auto"
        >
          <span>🚨 {t.nav.reportProblem}</span>
        </Link>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-5 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-4">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search by title, location, neighborhood, or ID...' : 'শিরোনাম, এলাকা বা আইডি দিয়ে খুঁজুন...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-navy focus:ring-2 focus:ring-safety focus:outline-none placeholder:text-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-navy">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent border-none focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="votes">Most Verified</option>
                <option value="severity">Highest Severity</option>
              </select>
            </div>

            {/* View Mode Toggle (Grid / Table) */}
            <div className="hidden sm:flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'grid' ? 'bg-white text-navy shadow-2xs' : 'text-slate-500 hover:text-navy'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'table' ? 'bg-white text-navy shadow-2xs' : 'text-slate-500 hover:text-navy'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-navy font-semibold focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="road_traffic">Road / Traffic</option>
            <option value="waste">Waste & Sanitation</option>
            <option value="waterlogging">Waterlogging</option>
            <option value="electrical">Electrical Hazard</option>
            <option value="streetlight">Streetlight</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="fire">Fire Incident</option>
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-navy font-semibold focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="SUBMITTED">Reported</option>
            <option value="VERIFIED">Verified</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="COMMUNITY_CONFIRMED">Citizen Confirmed</option>
          </select>

          {/* Severity Filter */}
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-navy font-semibold focus:outline-none"
          >
            <option value="all">All Severities</option>
            <option value="emergency">🚨 Emergency</option>
            <option value="high">High Risk</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          {/* Area Filter */}
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-navy font-semibold focus:outline-none"
          >
            <option value="all">All Dhaka Areas</option>
            {dhakaAreas.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs text-muted font-bold">
        <span>Showing {sorted.length} reports</span>
        {(selectedCategory !== 'all' || selectedStatus !== 'all' || selectedSeverity !== 'all' || selectedArea !== 'all' || search) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedStatus('all');
              setSelectedSeverity('all');
              setSelectedArea('all');
              setSearch('');
            }}
            className="text-safety hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((report) => (
            <Link
              key={report.id}
              href={`/report/${report.id}`}
              className="group bg-white rounded-3xl overflow-hidden border border-surface-border shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                {/* Image + Overlays */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={report.imageUrl}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <StatusBadge status={report.status} size="sm" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <SeverityBadge severity={report.severity} size="sm" showIcon={false} />
                  </div>
                  <div className="absolute bottom-2 left-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                      {report.publicId}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-muted tracking-wider">
                    {report.categoryId.replace('_', ' ')} • {report.area}
                  </span>

                  <h3 className="text-base font-extrabold text-navy leading-snug group-hover:text-safety transition-colors line-clamp-2">
                    {report.title}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                    <span className="truncate">{report.locationName}</span>
                  </p>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1.5 font-bold text-navy">
                    <Users className="w-3.5 h-3.5 text-safety" />
                    {report.confirmationsCount} verified
                  </span>
                  <span className="text-[11px] text-muted">
                    {new Date(report.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* TABLE VIEW (Desktop / Tablet) */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-surface-border shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-surface-border text-navy uppercase font-extrabold text-[10px] tracking-wider">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Title & Location</th>
                  <th className="p-4">Severity</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Confirmations</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sorted.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 font-mono font-bold text-navy whitespace-nowrap">
                      {report.publicId}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="font-semibold text-slate-700 capitalize">
                        {report.categoryId.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="font-bold text-navy truncate">{report.title}</p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {report.locationName}
                      </p>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <SeverityBadge severity={report.severity} size="sm" showIcon={false} />
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <StatusBadge status={report.status} size="sm" />
                    </td>
                    <td className="p-4 whitespace-nowrap font-bold text-navy">
                      👥 {report.confirmationsCount}
                    </td>
                    <td className="p-4 whitespace-nowrap text-muted text-[11px]">
                      {new Date(report.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4 whitespace-nowrap text-right">
                      <Link
                        href={`/report/${report.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-navy hover:bg-navy-dark text-white font-bold text-xs shadow-2xs transition"
                      >
                        <span>View</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
