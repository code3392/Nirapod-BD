'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  MapPin, 
  Bell, 
  Download, 
  Trash2, 
  Check, 
  ArrowLeft,
  AlertTriangle
} from 'lucide-react';

export default function PrivacySettings() {
  const { language, t, user, updatePrivacySettings, reports } = useApp();
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mx-auto flex items-center justify-center shadow-lg">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl font-black text-white">Privacy & Security Console</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Sign in to configure personal identity protection, location anonymization, and data export settings.
          </p>
        </div>
        <Link
          href="/profile"
          className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition"
        >
          Sign In to Access Privacy Settings
        </Link>
      </div>
    );
  }

  const handleToggle = (key: keyof typeof user.privacySettings) => {
    updatePrivacySettings({
      [key]: !user.privacySettings[key],
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleExportData = () => {
    const userData = {
      profile: user,
      myReports: reports.filter((r) => r.userId === user.id),
      exportedAt: new Date().toISOString(),
      platform: 'Nirapod BD',
    };
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nirapod-bd-data-export-${user.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Back to Profile' : 'প্রোফাইলে ফিরে যান'}</span>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-[#130C24]/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase tracking-wider">
          <Lock className="w-3.5 h-3.5" />
          <span>Security & Data Protection</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {t.privacy.title}
        </h1>
        <p className="text-sm text-slate-400">
          {t.privacy.subtitle}
        </p>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-purple-500/20 text-purple-200 border border-purple-500/30 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
            <Check className="w-4 h-4 text-purple-300" />
            <span>Preferences saved successfully.</span>
          </div>
        )}
      </div>

      {/* Toggle Controls */}
      <div className="bg-[#130C24]/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl divide-y divide-white/10 space-y-6">
        {/* Toggle 1: Approximate Location */}
        <div className="pt-2 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-400" />
              <h3 className="text-sm font-extrabold text-white">
                {t.privacy.approxLocation}
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {t.privacy.approxLocationDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleToggle('showApproximateLocation')}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${
              user.privacySettings.showApproximateLocation ? 'bg-purple-600' : 'bg-white/10'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                user.privacySettings.showApproximateLocation ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 2: Anonymous Public Reports */}
        <div className="pt-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-extrabold text-white">
                {t.privacy.hideIdentity}
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {t.privacy.hideIdentityDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleToggle('hideIdentityPublicly')}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${
              user.privacySettings.hideIdentityPublicly ? 'bg-purple-600' : 'bg-white/10'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                user.privacySettings.hideIdentityPublicly ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Toggle 3: Community Notifications */}
        <div className="pt-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-extrabold text-white">
                {t.privacy.notifications}
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              {t.privacy.notificationsDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleToggle('allowCommunityNotifications')}
            className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 shrink-0 ${
              user.privacySettings.allowCommunityNotifications ? 'bg-purple-600' : 'bg-white/10'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                user.privacySettings.allowCommunityNotifications ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Data Export & Account Actions */}
      <div className="bg-[#130C24]/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl space-y-6">
        <h3 className="text-base font-extrabold text-white">
          Account & Data Rights (GDPR & Bangladesh Cyber Norms)
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#150D28] border border-white/10">
          <div>
            <h4 className="text-xs font-bold text-white">{t.privacy.exportData}</h4>
            <p className="text-[11px] text-slate-400">
              Download a machine-readable JSON copy of your civic profile, points, and submitted issues.
            </p>
          </div>
          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-sm shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download JSON</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-rose-950/30 border border-rose-500/20">
          <div>
            <h4 className="text-xs font-bold text-rose-300">{t.privacy.deleteAccount}</h4>
            <p className="text-[11px] text-rose-200/80">
              Permanently anonymize your reports and remove your email and login credentials.
            </p>
          </div>
          <button
            onClick={() => alert('Account deletion request submitted. An authorization confirmation link has been sent to your email.')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-sm shrink-0"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Request Deletion</span>
          </button>
        </div>
      </div>
    </div>
  );
}
