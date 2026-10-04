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
  ShieldCheck,
  ArrowRight,
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
    <div className="min-h-screen bg-[#090514] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-xs font-mono font-bold text-sky-300">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Public Civic Registry</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'en' ? 'Civic Hazards & Community Reports' : 'নাগরিক সমস্যা ও প্রতিবেদনের তালিকা'}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {language === 'en' 
                ? 'Browse, verify, and monitor public safety alerts filed across Bangladesh.'
                : 'ঢাকা শহরের সকল নাগরিক রিপোর্ট পর্যালোচনা করুন এবং সত্যতা নিশ্চিত করতে সহায়তা করুন।'}
            </p>
          </div>

          <Link
            href="/report/new"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emergency hover:bg-emergency-hover text-white font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(239,68,68,0.4)] transition transform hover:scale-105 active:scale-95 shrink-0 self-start md:self-auto border border-emergency/50"
          >
            <span>🚨 {t.nav.reportProblem}</span>
          </Link>
        </div>

        {/* Search & Filter Toolbar (Dark Obsidian Glass) */}
        <div className="p-5 rounded-3xl bg-[#130C24]/85 backdrop-blur-2xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* Search Box */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search by title, location, neighborhood, or ID...' : 'শিরোনাম, এলাকা বা আইডি দিয়ে খুঁজুন...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-white focus:border-sky-400 focus:bg-white/10 focus:outline-none placeholder:text-slate-500 transition"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & View Mode Switcher */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono font-bold text-slate-300">
                <ArrowUpDown className="w-3.5 h-3.5 text-sky-400" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                >
                  <option value="newest" className="bg-[#130C24] text-white">Newest First</option>
                  <option value="votes" className="bg-[#130C24] text-white">Most Verified</option>
                  <option value="severity" className="bg-[#130C24] text-white">Highest Severity</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === 'grid' ? 'bg-sky-400 text-[#0E081B] shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-lg transition ${
                    viewMode === 'table' ? 'bg-sky-400 text-[#0E081B] shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                  aria-label="Table view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Dropdowns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-white/10 text-xs font-mono">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold focus:outline-none"
            >
              <option value="all" className="bg-[#130C24] text-white">All Categories</option>
              <option value="road_traffic" className="bg-[#130C24] text-white">Road & Traffic</option>
              <option value="waterlogging" className="bg-[#130C24] text-white">Waterlogging</option>
              <option value="electrical" className="bg-[#130C24] text-white">Electrical Wire</option>
              <option value="waste" className="bg-[#130C24] text-white">Waste & Sanitation</option>
              <option value="crime" className="bg-[#130C24] text-white">Public Safety</option>
              <option value="street_light" className="bg-[#130C24] text-white">Streetlight</option>
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold focus:outline-none"
            >
              <option value="all" className="bg-[#130C24] text-white">All Statuses</option>
              <option value="REPORTED" className="bg-[#130C24] text-white">Reported</option>
              <option value="VERIFIED" className="bg-[#130C24] text-white">Verified</option>
              <option value="IN_PROGRESS" className="bg-[#130C24] text-white">In Progress</option>
              <option value="RESOLVED" className="bg-[#130C24] text-white">Resolved</option>
            </select>

            {/* Severity Filter */}
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold focus:outline-none"
            >
              <option value="all" className="bg-[#130C24] text-white">All Severities</option>
              <option value="emergency" className="bg-[#130C24] text-white">Emergency (Critical)</option>
              <option value="high" className="bg-[#130C24] text-white">High Risk</option>
              <option value="medium" className="bg-[#130C24] text-white">Medium Risk</option>
              <option value="low" className="bg-[#130C24] text-white">Low Risk</option>
            </select>

            {/* Area Filter */}
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold focus:outline-none"
            >
              <option value="all" className="bg-[#130C24] text-white">All Dhaka Areas</option>
              {dhakaAreas.map((a) => (
                <option key={a} value={a} className="bg-[#130C24] text-white">{a}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Showing <strong className="text-white">{sorted.length}</strong> reports</span>
          {(selectedCategory !== 'all' || selectedStatus !== 'all' || selectedSeverity !== 'all' || selectedArea !== 'all' || search) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedStatus('all');
                setSelectedSeverity('all');
                setSelectedArea('all');
                setSearch('');
              }}
              className="text-sky-400 hover:underline font-bold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Empty State */}
        {sorted.length === 0 && (
          <div className="p-12 sm:p-16 rounded-3xl bg-[#130C24]/85 border border-white/10 text-center space-y-4 max-w-xl mx-auto shadow-2xl backdrop-blur-2xl">
            <div className="w-16 h-16 rounded-2xl bg-sky-500/15 text-sky-400 mx-auto flex items-center justify-center border border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-sky-300 bg-sky-500/15 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                Clean Neighborhood State
              </span>
              <h3 className="text-lg font-black text-white">No Community Reports Logged</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                There are currently zero active hazard reports in this area. You can submit the first real report with photos or video evidence!
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/report/new"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emergency hover:bg-emergency-hover text-white font-extrabold text-xs shadow-[0_0_20px_rgba(239,68,68,0.4)] transition transform hover:scale-105 active:scale-95"
              >
                <span>🚨 Report a Problem</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* GRID VIEW */}
        {viewMode === 'grid' && sorted.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((report) => (
              <Link
                key={report.id}
                href={`/report/${report.id}`}
                className="group bg-[#130C24]/85 rounded-3xl overflow-hidden border border-white/10 hover:border-purple-400/50 hover:bg-[#1A1033] shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  {/* Image + Overlays */}
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    {report.mediaType === 'video' ? (
                      <video
                        src={report.mediaUrl || report.imageUrl}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        muted
                        loop
                      />
                    ) : (
                      <img
                        src={report.mediaUrl || report.imageUrl}
                        alt={report.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <StatusBadge status={report.status} size="sm" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <SeverityBadge severity={report.severity} size="sm" showIcon={false} />
                    </div>
                    <div className="absolute bottom-2 left-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black/60 text-sky-300 backdrop-blur-sm border border-white/15">
                        {report.publicId}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-sky-300 tracking-wider">
                      {report.categoryId.replace('_', ' ')} • {report.area}
                    </span>

                    <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-sky-300 transition-colors line-clamp-2">
                      {report.title}
                    </h3>

                    <p className="text-xs text-slate-300 flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                      <span className="truncate">{report.locationName}</span>
                    </p>
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-300">
                    <span className="flex items-center gap-1.5 font-bold text-white">
                      <Users className="w-3.5 h-3.5 text-sky-400" />
                      {report.confirmationsCount} verified
                    </span>
                    <span className="text-[11px] text-slate-400">
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
          <div className="bg-[#130C24]/85 rounded-3xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-slate-300 uppercase font-mono font-bold text-[10px] tracking-wider">
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
                <tbody className="divide-y divide-white/5">
                  {sorted.map((report) => (
                    <tr key={report.id} className="hover:bg-white/5 transition">
                      <td className="p-4 font-mono font-bold text-sky-300 whitespace-nowrap">
                        {report.publicId}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-200 capitalize">
                          {report.categoryId.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 max-w-xs">
                        <p className="font-bold text-white truncate">{report.title}</p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {report.locationName}
                        </p>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <SeverityBadge severity={report.severity} size="sm" showIcon={false} />
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <StatusBadge status={report.status} size="sm" />
                      </td>
                      <td className="p-4 whitespace-nowrap font-bold text-white">
                        👥 {report.confirmationsCount}
                      </td>
                      <td className="p-4 whitespace-nowrap text-slate-400 font-mono text-[11px]">
                        {new Date(report.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </td>
                      <td className="p-4 whitespace-nowrap text-right">
                        <Link
                          href={`/report/${report.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-500/30 font-bold text-xs transition"
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
    </div>
  );
}
