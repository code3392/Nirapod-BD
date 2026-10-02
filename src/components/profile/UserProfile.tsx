'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import StatusBadge from '@/components/common/StatusBadge';
import SeverityBadge from '@/components/common/SeverityBadge';
import { 
  Award, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  Calendar, 
  FileText, 
  ThumbsUp, 
  Lock, 
  Settings,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function UserProfile() {
  const { language, t, user, reports } = useApp();

  const userReports = reports.filter(r => r.userId === user.id || r.userName === user.name);

  // Reputation tier calculation
  const currentTierScore = user.reputationScore;
  const nextTierGoal = 600;
  const progressPercent = Math.min(100, Math.round((currentTierScore / nextTierGoal) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-surface-border">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Guardian Ring */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-safety shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-navy text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow">
              Tier 3
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-navy">
                  {user.name}
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-safety flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-safety" />
                  <span>{user.role} • Dhaka North Zone</span>
                </p>
              </div>

              <Link
                href="/privacy"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs font-bold transition shadow-2xs self-center sm:self-start"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Privacy Settings</span>
              </Link>
            </div>

            <p className="text-xs text-slate-500 max-w-xl">
              Active neighbourhood observer since August 2026. Verified contributor to community safety, drain clearance, and infrastructure reporting in Mirpur & Dhaka city.
            </p>

            {/* Reputation Progress Bar */}
            <div className="pt-3 space-y-1.5 max-w-md mx-auto sm:mx-0">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-navy flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-warning" />
                  {currentTierScore} Reputation Points
                </span>
                <span className="text-muted">{progressPercent}% to Senior Guardian</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-safety to-emerald-400 transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-muted">{t.profile.nextTier}</p>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-2xl sm:text-3xl font-black text-navy">{user.reportsSubmitted}</span>
            <p className="text-xs text-muted font-bold mt-0.5">{t.profile.reportsSubmitted}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-2xl sm:text-3xl font-black text-safety">{user.reportsVerified}</span>
            <p className="text-xs text-muted font-bold mt-0.5">{t.profile.reportsVerified}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-2xl sm:text-3xl font-black text-indigo-600">{user.helpfulConfirmations}</span>
            <p className="text-xs text-muted font-bold mt-0.5">{t.profile.helpfulVotes}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-2xl sm:text-3xl font-black text-warning">{user.points}</span>
            <p className="text-xs text-muted font-bold mt-0.5">{t.profile.points}</p>
          </div>
        </div>
      </div>

      {/* Badges & Gamification Showcase */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-navy">
            {t.profile.badgesEarned} ({user.badges.filter(b => b.isUnlocked).length}/{user.badges.length})
          </h2>
          <p className="text-xs text-slate-500">
            Earned through high-accuracy verification, civic collaboration, and genuine community hazard resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border transition-all duration-200 flex items-start gap-4 ${
                badge.isUnlocked
                  ? 'bg-white border-surface-border shadow-subtle'
                  : 'bg-slate-50/60 border-slate-200 opacity-70'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                badge.isUnlocked ? 'bg-amber-50 border border-amber-200 shadow-sm' : 'bg-slate-200/80 grayscale'
              }`}>
                {badge.icon}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-navy truncate">
                    {language === 'en' ? badge.titleEn : badge.titleBn}
                  </h4>
                  {badge.isUnlocked ? (
                    <span className="text-[10px] font-bold text-safety bg-safety/10 px-2 py-0.2 rounded-full">
                      Earned ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-muted bg-slate-200 px-1.5 py-0.2 rounded">
                      Locked
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2">
                  {language === 'en' ? badge.descriptionEn : badge.descriptionBn}
                </p>

                {!badge.isUnlocked && badge.progress && badge.maxProgress && (
                  <div className="pt-2 space-y-1">
                    <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className="h-full bg-navy rounded-full"
                        style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted font-bold block text-right">
                      {badge.progress} / {badge.maxProgress}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User Activity / Submitted Reports History */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-navy">
              {t.profile.activityHistory}
            </h2>
            <p className="text-xs text-slate-500">Track and manage reports filed under your identity</p>
          </div>
          <Link
            href="/report/new"
            className="text-xs font-bold text-safety hover:underline"
          >
            + Submit New Issue
          </Link>
        </div>

        <div className="space-y-3">
          {userReports.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-white border border-surface-border text-xs text-muted">
              {t.profile.noReportsYet}
            </div>
          ) : (
            userReports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-3xl bg-white border border-surface-border shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-300 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={report.imageUrl}
                    alt={report.title}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-muted">
                        {report.publicId}
                      </span>
                      <StatusBadge status={report.status} size="sm" />
                    </div>
                    <h4 className="text-sm font-extrabold text-navy line-clamp-1">
                      {report.title}
                    </h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emergency" />
                      <span>{report.locationName}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <span className="text-xs font-bold text-safety">
                    👥 {report.confirmationsCount} votes
                  </span>
                  <Link
                    href={`/report/${report.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-navy hover:bg-navy-dark text-white font-bold text-xs shadow-2xs transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
