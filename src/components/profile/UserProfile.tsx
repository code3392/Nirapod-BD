'use client';

import React, { useState } from 'react';
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
  ExternalLink,
  Phone,
  Mail,
  Home,
  User as UserIcon,
  Briefcase,
  Droplet,
  AlertTriangle,
  BadgeCheck,
  Edit3,
  Save,
  FileCheck,
  Upload,
  Radio,
  ShieldAlert
} from 'lucide-react';

export default function UserProfile() {
  const { language, t, user, reports, updateUserProfile, submitCitizenProofOfWork } = useApp();

  const userReports = reports.filter(r => r.userId === user.id || r.userName === user.name);

  // Edit Mode for profile details (Requirement 20)
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user.phone || '01711-234567');
  const [livingPlace, setLivingPlace] = useState(user.livingPlace || 'Mirpur-10, Dhaka 1216');
  const [age, setAge] = useState(user.age || 29);
  const [occupation, setOccupation] = useState(user.occupation || 'Software Engineer & Civic Activist');
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup || 'B+');
  const [name, setName] = useState(user.name);

  // Rule 25 modal for quick proof submission
  const [showWorkProofModal, setShowWorkProofModal] = useState(false);
  const [workProofUrl, setWorkProofUrl] = useState('https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=800&q=80');
  const [workProofType, setWorkProofType] = useState<'image' | 'video'>('image');
  const [workProofComment, setWorkProofComment] = useState('Pothole completely filled and road restored safely.');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      phone,
      livingPlace,
      age: Number(age),
      occupation,
      bloodGroup
    });
    setIsEditing(false);
  };

  const handleWorkProofSubmit = () => {
    if (user.unresolvedReportIdForWorkProof) {
      submitCitizenProofOfWork(
        user.unresolvedReportIdForWorkProof,
        workProofUrl,
        workProofType,
        workProofComment
      );
      setShowWorkProofModal(false);
    }
  };

  const currentTierScore = user.reputationScore;
  const nextTierGoal = 600;
  const progressPercent = Math.min(100, Math.round((currentTierScore / nextTierGoal) * 100));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Rule 25 Warning Banner if user has pending work proof */}
      {user.unresolvedReportIdForWorkProof && (
        <div className="p-6 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                Rule 25 Requirement
              </span>
              <h4 className="text-sm font-black text-navy mt-0.5">
                Work Completion Evidence Pending for Ticket {user.unresolvedReportIdForWorkProof}
              </h4>
              <p className="text-xs text-slate-600">
                Submit photo or video confirmation of the resolved issue to unlock new reporting.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowWorkProofModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition shrink-0"
          >
            Upload Work Proof
          </button>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-card border border-surface-border">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Greatly Verified Ring */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-safety shadow-lg"
            />
            {user.isSuperAdmin ? (
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow">
                SUPER ADMIN
              </div>
            ) : (
              <div className="absolute -bottom-2 -right-2 bg-safety text-white text-[10px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow">
                GUARDIAN
              </div>
            )}
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-navy">
                    {user.name}
                  </h1>
                  {user.verificationStatus === 'GREATLY_VERIFIED' && (
                    <span 
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold border border-emerald-300 shadow-2xs"
                      title="Identity fully verified by Bangladesh National ID & Mobile OTP"
                    >
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Greatly Verified Guardian</span>
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-safety flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-safety" />
                  <span>{user.role} • {user.livingPlace}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 self-center sm:self-start">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs font-bold transition shadow-2xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
                </button>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 bg-slate-50 hover:bg-slate-100 text-xs font-bold transition shadow-2xs"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Privacy</span>
                </Link>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-xl">
              Active civic guardian since August 2026. Verified contributor to community safety, drain clearance, and infrastructure reporting in Dhaka.
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

        {/* REQUIREMENT 20: AUTHENTIC CITIZEN VERIFICATION DETAILS CARD */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in">
            <h4 className="text-xs uppercase font-extrabold text-navy tracking-wider">
              Edit Verified Citizen Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Living Place / Ward</label>
                <input
                  type="text"
                  value={livingPlace}
                  onChange={(e) => setLivingPlace(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-600 block mb-1">Blood Group</label>
                <input
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full text-xs p-2 border border-slate-300 rounded-lg bg-white"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 text-xs text-slate-600 font-bold hover:bg-slate-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-safety text-white text-xs font-bold rounded-lg shadow-sm hover:bg-safety-hover flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 p-5 rounded-2xl bg-slate-50/70 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Phone Number</span>
              <p className="font-bold text-navy flex items-center gap-1">
                <Phone className="w-3 h-3 text-safety" />
                <span>{user.phone || '01711-234567'}</span>
              </p>
              <span className="text-[9px] text-safety font-bold">✓ OTP Verified</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Email</span>
              <p className="font-bold text-navy flex items-center gap-1 truncate">
                <Mail className="w-3 h-3 text-sky-500" />
                <span className="truncate">{user.email}</span>
              </p>
              <span className="text-[9px] text-safety font-bold">✓ Verified</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Living Place</span>
              <p className="font-bold text-navy flex items-center gap-1 truncate">
                <Home className="w-3 h-3 text-amber-500" />
                <span className="truncate">{user.livingPlace || 'Mirpur-10, Dhaka'}</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Age</span>
              <p className="font-bold text-navy flex items-center gap-1">
                <UserIcon className="w-3 h-3 text-indigo-500" />
                <span>{user.age || 29} Years</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Blood Group</span>
              <p className="font-bold text-emergency flex items-center gap-1">
                <Droplet className="w-3 h-3 text-emergency fill-emergency" />
                <span>{user.bloodGroup || 'B+'}</span>
              </p>
              <span className="text-[9px] text-slate-400">Emergency Ready</span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">National ID</span>
              <p className="font-mono font-bold text-navy">
                {user.nidNumber || '5928 4910 23'}
              </p>
              <span className="text-[9px] text-safety font-bold">✓ NID Verified</span>
            </div>
          </div>
        )}

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

        {/* Account Integrity & Warning Strikes (Rules 12, 16, 17) */}
        <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-navy text-white flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-safety" />
            </div>
            <div>
              <p className="text-xs font-bold text-navy">Account Integrity Record</p>
              <p className="text-[11px] text-slate-500">Zero-tolerance policy for fake reports, profanity & hate speech</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-bold text-slate-700">
              Fake Reports: <strong className="text-navy">{user.warningStrikes?.fakePostCount || 0} / 3 strikes</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-bold text-slate-700">
              Profanity: <strong className="text-navy">{user.warningStrikes?.badWordsCount || 0} / 3 strikes</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-bold text-slate-700">
              Hate Speech: <strong className="text-navy">{user.warningStrikes?.racismCount || 0} / 3 strikes</strong>
            </span>
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
                    src={report.mediaUrl || report.imageUrl}
                    alt={report.title}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-muted">
                        {report.publicId}
                      </span>
                      <StatusBadge status={report.status} size="sm" />
                      {report.requiresCitizenProofOfWork && (
                        <span className="text-[10px] bg-amber-500 text-white font-extrabold px-1.5 py-0.2 rounded">
                          Proof Required
                        </span>
                      )}
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

      {/* Rule 25 Proof Submission Modal */}
      {showWorkProofModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-surface-border space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-navy text-base">Submit Work Completion Proof</h3>
              <button onClick={() => setShowWorkProofModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            <p className="text-xs text-slate-600">
              Upload photo or video verifying that ticket <strong>{user.unresolvedReportIdForWorkProof}</strong> was indeed resolved.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setWorkProofType('image')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${workProofType === 'image' ? 'bg-navy text-white' : 'bg-slate-50'}`}
                >
                  📷 Photo
                </button>
                <button
                  type="button"
                  onClick={() => setWorkProofType('video')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border ${workProofType === 'video' ? 'bg-navy text-white' : 'bg-slate-50'}`}
                >
                  🎥 Video
                </button>
              </div>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setWorkProofUrl(URL.createObjectURL(file));
                    setWorkProofType(file.type.startsWith('video') ? 'video' : 'image');
                  }
                }}
                className="text-xs text-slate-500"
              />
              <textarea
                rows={2}
                value={workProofComment}
                onChange={(e) => setWorkProofComment(e.target.value)}
                placeholder="Describe resolution..."
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl"
              />
              <button
                type="button"
                onClick={handleWorkProofSubmit}
                className="w-full py-2.5 bg-safety hover:bg-safety-hover text-white text-xs font-bold rounded-xl shadow transition"
              >
                Submit & Verify Resolution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
