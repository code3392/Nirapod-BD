'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Report, ReportStatus, SeverityLevel, UserRole } from '@/types';
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
  Building,
  ShieldAlert,
  Crown,
  Mail,
  Slash,
  UserX,
  RefreshCcw,
  MessageSquare,
  Ban,
  Send,
  Eye,
  EyeOff,
  Lock
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
  const { 
    language, 
    t, 
    user,
    allUsers,
    reports, 
    updateReportStatus,
    updateUserRole,
    suspendUser,
    revokeSuspension,
    banUserFromCommunity,
    suspensionLogs,
    login,
    deleteReport
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Suspension dialog state
  const [suspensionModalUser, setSuspensionModalUser] = useState<any | null>(null);
  const [suspensionDays, setSuspensionDays] = useState(3);
  const [suspensionReason, setSuspensionReason] = useState('Repeated violation of Nirapod BD community safety rules.');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  // Super Admin login gate state
  const [adminEmailInput, setAdminEmailInput] = useState('smdsami59@gmail.com');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const isSuperAdminUser = user ? (user.email.toLowerCase() === 'smdsami59@gmail.com' || user.isSuperAdmin) : false;
  const isAuthorizedAdmin = !!user && (isSuperAdminUser || user.role === 'Admin' || user.role === 'Moderator');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    if (!adminEmailInput.trim()) {
      setAuthError('Please enter administrator email address.');
      return;
    }
    if (!adminPasswordInput) {
      setAuthError('Please enter your Super Admin password.');
      return;
    }
    const res = login(adminEmailInput.trim(), adminPasswordInput);
    if (!res.success) {
      setAuthError(res.message);
    } else {
      setAdminPasswordInput('');
    }
  };

  if (!user || !isAuthorizedAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-[#130C24]/90 backdrop-blur-2xl rounded-3xl p-8 sm:p-10 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-center space-y-6 text-white ring-1 ring-amber-500/20">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/15 border border-amber-400/30 text-amber-400 mx-auto flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.25)]">
            <Crown className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
              Root Authority Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Restricted Administration Console</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
              Only the verified platform Super Admin (<strong className="text-amber-300">smdsami59@gmail.com</strong>) with the authorized master password can access civic moderation controls.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs text-left flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                Super Admin Email
              </label>
              <input
                type="email"
                value={adminEmailInput}
                onChange={(e) => setAdminEmailInput(e.target.value)}
                placeholder="smdsami59@gmail.com"
                className="w-full px-4 py-3 rounded-2xl bg-[#0E081B] border border-white/15 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold text-slate-300 mb-1.5">
                Master Security Password
              </label>
              <div className="relative">
                <input
                  type={showAdminPassword ? 'text' : 'password'}
                  value={adminPasswordInput}
                  onChange={(e) => setAdminPasswordInput(e.target.value)}
                  placeholder="Enter Super Admin password"
                  className="w-full px-4 py-3 pr-11 rounded-2xl bg-[#0E081B] border border-white/15 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-amber-400/60 focus:ring-1 focus:ring-amber-400/30 font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowAdminPassword(!showAdminPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                >
                  {showAdminPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#0E081B] font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.4)] transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4" />
              <span>Authenticate as Super Admin</span>
            </button>
          </form>

          <div className="pt-2">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white transition font-mono"
            >
              ← Return to Citizen Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // KPI Metrics
  const totalReportsCount = 1284;
  const resolvedReportsCount = 923;
  const verifiedReportsCount = 973;
  const activeReportsCount = 361;
  const totalUsersCount = allUsers.length || 4521;

  // Chart Data: Categories
  const categoryData = [
    { name: 'Road Hazard', value: 34, color: '#F59E0B' },
    { name: 'Waste / Sanitation', value: 26, color: '#0284C7' },
    { name: 'Flood / Drainage', value: 18, color: '#38BDF8' },
    { name: 'Electrical', value: 12, color: '#EF4444' },
    { name: 'Other Infrastructure', value: 10, color: '#8B5CF6' },
  ];

  // Chart Data: Hotspots
  const hotspotData = [
    { name: 'Mirpur', count: 342, fill: '#2E1065' },
    { name: 'Mohammadpur', count: 268, fill: '#3B1C78' },
    { name: 'Uttara', count: 245, fill: '#2563EB' },
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

  const handleRoleChange = (targetUserId: string, newRole: UserRole) => {
    const res = updateUserRole(targetUserId, newRole);
    setActionMessage(res.message);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleConfirmSuspension = () => {
    if (!suspensionModalUser) return;
    const res = suspendUser(suspensionModalUser.id, suspensionReason, suspensionDays);
    setActionMessage(res.message);
    setSuspensionModalUser(null);
    setTimeout(() => setActionMessage(null), 4000);
  };

  const handleRevoke = (targetUserId: string) => {
    const res = revokeSuspension(targetUserId);
    setActionMessage(res.message);
    setTimeout(() => setActionMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Toast Notice */}
      {actionMessage && (
        <div className="p-4 rounded-2xl bg-navy text-white text-xs font-bold shadow-lg border border-civic-blue/30 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-civic-blue" />
            <span>{actionMessage}</span>
          </div>
          <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-white" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Super Admin Privilege Card */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy/10 text-xs font-bold text-navy uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-civic-blue" />
              <span>Civic Control Centre & Root Administration</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
              {t.admin.title}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Super Admin root controls, citizen moderation, warning strikes, and agency dispatch.
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

        {/* SUPER ADMIN STATUS CALLOUT (Rule 13) */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-navy via-navy to-navy-dark text-white border border-navy-subtle shadow-elevated flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${
              isSuperAdminUser ? 'bg-amber-500 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500 text-white">
                  {isSuperAdminUser ? 'Super Admin Mode Active' : 'Restricted Admin View'}
                </span>
                <span className="text-xs font-mono text-slate-300">
                  {user?.email}
                </span>
              </div>
              <h3 className="text-base font-black text-white mt-1">
                {isSuperAdminUser
                  ? 'Root Authority: smdsami59@gmail.com'
                  : 'Ordinary Admin Mode: Limited User Promotion'}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {isSuperAdminUser
                  ? 'You possess full authority to appoint Admins/Super Admins, moderate strikes, and manage suspensions.'
                  : 'Notice: Ordinary Admins can suspend users and moderate content, but ONLY Super Admin (smdsami59@gmail.com) can appoint Admins.'}
              </p>
            </div>
          </div>

          {!isSuperAdminUser && (
            <div className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-slate-400">
              Ordinary Ward Moderator
            </div>
          )}
        </div>
      </div>

      {/* 5 KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-1">
          <span className="text-xs text-muted font-bold block">{t.admin.totalUsers}</span>
          <p className="text-3xl font-black text-navy">{totalUsersCount.toLocaleString()}</p>
          <span className="text-[11px] text-civic-blue font-bold flex items-center gap-1">
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
          <p className="text-3xl font-black text-civic-blue">{resolvedReportsCount.toLocaleString()}</p>
          <span className="text-[11px] text-civic-blue font-bold">71.8% resolution</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-1 col-span-2 lg:col-span-1">
          <span className="text-xs text-muted font-bold block">{t.admin.activeReports}</span>
          <p className="text-3xl font-black text-amber-500">{activeReportsCount.toLocaleString()}</p>
          <span className="text-[11px] text-amber-600 font-bold">Under civic action</span>
        </div>
      </div>

      {/* Analytics Charts */}
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
                <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#2E1065" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-slate-100">
            <span>Primary Focus: Mirpur (DNCC Zone 4) & Mohammadpur (Zone 5)</span>
            <span className="text-civic-blue font-bold">Real-time Telemetry</span>
          </div>
        </div>
      </div>

      {/* USER MANAGEMENT & SUPER ADMIN RBAC TABLE (Rules 12, 13, 14, 15, 16, 17) */}
      <div className="bg-white rounded-3xl border border-surface-border shadow-subtle overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-navy" />
              <h3 className="text-lg font-black text-navy">
                Citizen Registry & Super Admin Moderation Panel
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Manage roles, 3-strike violations, email suspensions, and community creation bans.
            </p>
          </div>

          <div className="text-xs font-mono bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
            Super Admin: <strong className="text-navy font-bold">smdsami59@gmail.com</strong>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto -mx-6">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-y border-surface-border text-navy uppercase font-extrabold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-6">User</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Strikes Record</th>
                <th className="py-3 px-4">Account Status</th>
                <th className="py-3 px-4">Community Perms</th>
                <th className="py-3 px-6 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {allUsers.map((u) => {
                const isSuspended = u.suspendedUntil && new Date(u.suspendedUntil) > new Date();
                const isRootTarget = u.email.toLowerCase() === 'smdsami59@gmail.com';

                return (
                  <tr key={u.id} className="hover:bg-slate-50/80 transition">
                    {/* User info */}
                    <td className="py-3 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-navy flex items-center gap-1">
                            <span>{u.name}</span>
                            {u.isSuperAdmin && (
                              <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            )}
                          </p>
                          <p className="text-[11px] text-slate-500 font-mono">{u.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role dropdown */}
                    <td className="py-3 px-4">
                      {isSuperAdminUser && !isRootTarget ? (
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                          className="text-[11px] font-bold py-1 px-2 rounded-lg border border-slate-300 bg-white"
                        >
                          <option value="Community Guardian">Community Guardian</option>
                          <option value="Ward Coordinator Admin">Ward Coordinator Admin</option>
                          <option value="Super Admin">Super Admin</option>
                        </select>
                      ) : (
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          u.isSuperAdmin ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {u.role}
                        </span>
                      )}
                    </td>

                    {/* Strikes */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono">
                        <span className={`px-1.5 py-0.5 rounded font-bold ${
                          (u.warningStrikes?.fakePostCount || 0) > 0 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'
                        }`} title="Fake Report Strikes (Max 3 = 3-Day Suspension)">
                          Fake: {u.warningStrikes?.fakePostCount || 0}/3
                        </span>
                        <span className={`px-1.5 py-0.5 rounded font-bold ${
                          (u.warningStrikes?.badWordsCount || 0) > 0 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                        }`} title="Bad Words Strikes (Max 3 = 5-Day Suspension)">
                          Words: {u.warningStrikes?.badWordsCount || 0}/3
                        </span>
                        <span className={`px-1.5 py-0.5 rounded font-bold ${
                          (u.warningStrikes?.racismCount || 0) > 0 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-500'
                        }`} title="Hate Speech Strikes (Max 3 = 5-Day Suspension)">
                          Hate: {u.warningStrikes?.racismCount || 0}/3
                        </span>
                      </div>
                    </td>

                    {/* Account status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {isSuspended ? (
                        <div>
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emergency text-white">
                            Suspended
                          </span>
                          <p className="text-[10px] text-emergency mt-0.5 font-mono">
                            Until {new Date(u.suspendedUntil!).toLocaleDateString()}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          Active & Good Standing
                        </span>
                      )}
                    </td>

                    {/* Community ban */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => banUserFromCommunity(u.id, !(u.bannedFromCommunities || u.bannedFromCreatingCommunity))}
                        className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition ${
                          (u.bannedFromCommunities || u.bannedFromCreatingCommunity)
                            ? 'bg-rose-100 text-rose-800 border-rose-300'
                            : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {(u.bannedFromCommunities || u.bannedFromCreatingCommunity) ? 'Banned from Community' : 'Normal Access'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-6 whitespace-nowrap text-right space-x-1.5">
                      {isSuspended ? (
                        <button
                          onClick={() => handleRevoke(u.id)}
                          className="px-2.5 py-1 rounded-lg bg-civic-blue hover:bg-civic-royal text-white font-bold text-[11px] shadow-sm transition"
                        >
                          Cancel Suspension
                        </button>
                      ) : (
                        <button
                          onClick={() => setSuspensionModalUser(u)}
                          disabled={isRootTarget}
                          className="px-2.5 py-1 rounded-lg bg-emergency hover:bg-emergency-hover text-white font-bold text-[11px] shadow-sm transition disabled:opacity-30 disabled:pointer-events-none"
                        >
                          Suspend User
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUSPENSION AUDIT EMAIL LOGS (Rule 14) */}
      <div className="bg-white rounded-3xl border border-surface-border shadow-subtle p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-navy" />
            <h3 className="text-base font-black text-navy">
              Automated Suspension Notice Email Dispatch Log
            </h3>
          </div>
          <span className="text-xs text-muted">
            {suspensionLogs.length} logged events
          </span>
        </div>

        {suspensionLogs.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 text-center">
            No suspensions have been executed yet in this session.
          </p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto divide-y divide-slate-100">
            {suspensionLogs.map((log) => (
              <div key={log.id} className="pt-2 flex items-start justify-between gap-4 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.2 rounded ${
                      log.action === 'SUSPENDED' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {log.action}
                    </span>
                    <span className="font-bold text-navy">{log.targetUserName || log.userName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">({log.targetUserEmail || log.userEmail})</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Reason: <em>{log.reason}</em>
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Authorized by: <strong className="text-navy">{log.issuedByEmail || log.authorizedBy}</strong> • Email Dispatch: <span className="text-civic-blue font-bold">Delivered</span>
                  </p>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
        )}
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
                        className="px-2 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-[11px] border border-sky-200 transition"
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
                        className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-civic-blue font-bold text-[11px] border border-blue-200 transition"
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

                    {isSuperAdminUser && (
                      <button
                        onClick={() => {
                          if (confirm(`Permanently delete report ${report.publicId}?`)) {
                            deleteReport(report.id);
                          }
                        }}
                        className="px-2 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[11px] border border-red-200 transition"
                        title="Permanently Delete Report"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SUSPENSION MODAL (Rule 14) */}
      {suspensionModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-surface-border space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserX className="w-5 h-5 text-emergency" />
                <h3 className="font-black text-navy text-base">Authorize Account Suspension</h3>
              </div>
              <button onClick={() => setSuspensionModalUser(null)} className="text-slate-400 hover:text-slate-600" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <p className="font-bold text-navy">Target: {suspensionModalUser.name}</p>
              <p className="text-slate-500 font-mono">Email: {suspensionModalUser.email}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-navy block mb-1">Suspension Duration</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSuspensionDays(3)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      suspensionDays === 3 ? 'bg-navy text-white border-navy' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    3 Days (Rule 12: Fake Post)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSuspensionDays(5)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                      suspensionDays === 5 ? 'bg-navy text-white border-navy' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    5 Days (Rules 16/17)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-navy block mb-1">Formal Reason (Emailed to User)</label>
                <textarea
                  rows={3}
                  value={suspensionReason}
                  onChange={(e) => setSuspensionReason(e.target.value)}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emergency focus:outline-none"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 text-[11px] text-amber-900 border border-amber-200">
                Notice: An automated suspension email will be immediately dispatched to <strong>{suspensionModalUser.email}</strong>.
              </div>

              <button
                type="button"
                onClick={handleConfirmSuspension}
                className="w-full py-2.5 bg-emergency hover:bg-emergency-hover text-white text-xs font-extrabold rounded-xl shadow transition flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm Suspension & Dispatch Email Notice</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
