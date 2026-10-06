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
  ShieldAlert,
  Users,
  Camera,
  Trash2,
  X,
  Video
} from 'lucide-react';

export default function UserProfile() {
  const { language, t, user, reports, updateUserProfile, submitCitizenProofOfWork, login } = useApp();

  // Guest State handling
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#130C24]/85 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl text-center space-y-6 text-white">
          <div className="w-20 h-20 rounded-3xl bg-purple-500/15 text-purple-400 flex items-center justify-center mx-auto border border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.25)]">
            <ShieldCheck className="w-10 h-10 text-purple-400" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full bg-purple-500/15 text-purple-300 border border-purple-400/30">
              {language === 'en' ? 'Citizen Profile Hub' : 'নাগরিক প্রোফাইল ডেস্ক'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {language === 'en' ? 'Welcome to Nirapod BD' : 'নিরাপদ বিডিতে স্বাগতম'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Sign in with your registered citizen email or create an account to submit civic reports, verify community hazards, and unlock verified guardian badges.'
                : 'সমস্যা রিপোর্ট করতে, যাচাই কার্যক্রমে অংশ নিতে এবং নাগরিক পয়েন্ট অর্জন করতে আপনার একাউন্টে লগইন বা নিবন্ধন করুন।'}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-black shadow-lg transition transform hover:scale-105"
            >
              {language === 'en' ? 'Sign In / Register' : 'লগইন বা নিবন্ধন'}
            </Link>
            <Link
              href="/map"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition"
            >
              {language === 'en' ? 'Explore Safety Map' : 'নিরাপত্তা ম্যাপ দেখুন'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const userReports = reports.filter(r => r.userId === user.id || r.userName === user.name);

  // Edit Mode for profile details (Requirement 20)
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(user.phone || '+880 1700-000000');
  const [livingPlace, setLivingPlace] = useState(user.livingPlace || 'Mirpur, Dhaka');
  const [age, setAge] = useState(user.age || 28);
  const [occupation, setOccupation] = useState(user.occupation || 'Civic Volunteer');
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup || 'B+');
  const [name, setName] = useState(user.name);

  // Rule 25 modal for quick proof submission
  const [showWorkProofModal, setShowWorkProofModal] = useState(false);
  const [workProofUrl, setWorkProofUrl] = useState('');
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
        <div className="p-6 rounded-3xl bg-amber-500/15 border border-amber-400/40 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/30 text-amber-300 border border-amber-400/30 font-mono">
                Rule 25 Requirement
              </span>
              <h4 className="text-sm font-black text-white mt-0.5">
                Work Completion Evidence Pending for Ticket {user.unresolvedReportIdForWorkProof}
              </h4>
              <p className="text-xs text-slate-300">
                Submit photo or video confirmation of the resolved issue to unlock new reporting.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowWorkProofModal(true)}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#0E081B] text-xs font-black shadow transition shrink-0"
          >
            Upload Work Proof
          </button>
        </div>
      )}

      {/* Profile Overview Card (Dark Purplish-Black) */}
      <div className="bg-[#130C24]/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 text-white ring-1 ring-purple-500/15">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Calm Purple Ring & Add/Edit Picture Button */}
          <div className="flex flex-col items-center sm:items-start gap-2.5 shrink-0">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-purple-400/80 shadow-lg bg-[#0E081B]"
              />
              {user.isSuperAdmin ? (
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-[#0E081B] text-[10px] font-black px-2.5 py-0.5 rounded-full border-2 border-[#130C24] shadow font-mono">
                  SUPER ADMIN
                </div>
              ) : (
                <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full border-2 border-[#130C24] shadow font-mono">
                  GUARDIAN
                </div>
              )}
            </div>

            {/* Profile Picture Upload/Edit Button */}
            <div className="flex items-center gap-1.5">
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white border border-purple-400/40 text-xs font-bold transition shadow-sm active:scale-95">
                <Camera className="w-3.5 h-3.5 text-purple-300" />
                <span>
                  {Boolean(user.avatar && !user.avatar.includes('api.dicebear.com') && !user.avatar.includes('ui-avatars.com'))
                    ? (language === 'en' ? 'Edit Picture' : 'ছবি পরিবর্তন')
                    : (language === 'en' ? 'Add Picture' : 'ছবি যুক্ত করুন')}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const base64 = event.target?.result as string;
                        if (base64) {
                          updateUserProfile({ avatar: base64 });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              {Boolean(user.avatar && !user.avatar.includes('api.dicebear.com') && !user.avatar.includes('ui-avatars.com')) && (
                <button
                  type="button"
                  onClick={() => {
                    const defaultAvatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=0A2540&textColor=ffffff`;
                    updateUserProfile({ avatar: defaultAvatar });
                  }}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 border border-white/10 transition"
                  title={language === 'en' ? 'Remove Picture' : 'ছবি সরান'}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-white">
                    {user.name}
                  </h1>
                  {user.verificationStatus === 'GREATLY_VERIFIED' && (
                    <span 
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[11px] font-extrabold border border-purple-400/30 shadow-sm"
                      title="Identity fully verified Guardian"
                    >
                      <BadgeCheck className="w-3.5 h-3.5 text-purple-400" />
                      <span>Greatly Verified Guardian</span>
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-semibold text-purple-300 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>{user.role} • {user.livingPlace}</span>
                </p>
              </div>

              <div className="flex items-center gap-2 self-center sm:self-start">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 text-white bg-white/5 hover:bg-white/10 text-xs font-bold transition shadow-sm"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
                </button>
                <Link
                  href="/privacy"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/10 text-white bg-white/5 hover:bg-white/10 text-xs font-bold transition shadow-sm"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Privacy</span>
                </Link>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-xl">
              Active citizen member in Bangladesh. Verified contributor to community safety, local hazard monitoring, and public infrastructure reporting.
            </p>

            {/* Reputation Progress Bar */}
            <div className="pt-3 space-y-1.5 max-w-md mx-auto sm:mx-0">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-amber-400 flex items-center gap-1 font-display tabular-nums">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  {currentTierScore} Reputation Points
                </span>
                <span className="text-slate-400 font-display tabular-nums">{progressPercent}% to Senior Guardian</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/10 overflow-hidden border border-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 via-violet-400 to-sky-400 transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400">{t.profile.nextTier}</p>
            </div>
          </div>
        </div>

        {/* REQUIREMENT 20: AUTHENTIC CITIZEN VERIFICATION DETAILS CARD */}
        {isEditing ? (
          <form onSubmit={handleSaveProfile} className="mt-6 p-5 rounded-2xl bg-[#150D28]/90 border border-white/10 space-y-4 animate-in fade-in">
            <h4 className="text-xs uppercase font-extrabold text-white tracking-wider">
              Edit Citizen Details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-2.5 border border-white/15 rounded-xl bg-white/5 text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-2.5 border border-white/15 rounded-xl bg-white/5 text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Living Place / Ward</label>
                <input
                  type="text"
                  value={livingPlace}
                  onChange={(e) => setLivingPlace(e.target.value)}
                  className="w-full text-xs p-2.5 border border-white/15 rounded-xl bg-white/5 text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full text-xs p-2.5 border border-white/15 rounded-xl bg-white/5 text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Occupation</label>
                <input
                  type="text"
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full text-xs p-2.5 border border-white/15 rounded-xl bg-white/5 text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-300 block mb-1">Blood Group</label>
                <input
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full text-xs p-2.5 border border-white/15 rounded-xl bg-white/5 text-white focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-1.5 text-xs text-slate-300 font-bold hover:bg-white/10 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5 transition"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-6 p-5 rounded-2xl bg-[#150D28]/90 border border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Phone Number</span>
              <p className="font-bold text-white flex items-center gap-1">
                <Phone className="w-3 h-3 text-sky-400" />
                <span>{user.phone || '01711-234567'}</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Email</span>
              <p className="font-bold text-white flex items-center gap-1 truncate">
                <Mail className="w-3 h-3 text-purple-400" />
                <span className="truncate">{user.email}</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Living Place</span>
              <p className="font-bold text-white flex items-center gap-1 truncate">
                <Home className="w-3 h-3 text-amber-400" />
                <span className="truncate">{user.livingPlace || 'Mirpur-10, Dhaka'}</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Age</span>
              <p className="font-bold text-white flex items-center gap-1">
                <UserIcon className="w-3 h-3 text-indigo-400" />
                <span>{user.age || 29} Years</span>
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Blood Group</span>
              <p className="font-bold text-rose-400 flex items-center gap-1">
                <Droplet className="w-3 h-3 text-rose-400 fill-rose-400" />
                <span>{user.bloodGroup || 'B+'}</span>
              </p>
              <span className="text-[9px] text-slate-400">Emergency Ready</span>
            </div>
          </div>
        )}

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-2xl sm:text-3xl font-black text-white font-display tabular-nums">{user.reportsSubmitted}</span>
            <p className="text-xs text-slate-400 font-bold mt-0.5">{t.profile.reportsSubmitted}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-2xl sm:text-3xl font-black text-sky-400 font-display tabular-nums">{user.reportsVerified}</span>
            <p className="text-xs text-slate-400 font-bold mt-0.5">{t.profile.reportsVerified}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-2xl sm:text-3xl font-black text-purple-400 font-display tabular-nums">{user.helpfulConfirmations}</span>
            <p className="text-xs text-slate-400 font-bold mt-0.5">{t.profile.helpfulVotes}</p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-display tabular-nums">{user.points}</span>
            <p className="text-xs text-slate-400 font-bold mt-0.5">{t.profile.points}</p>
          </div>
        </div>

        {/* Account Integrity & Warning Strikes (Rules 12, 16, 17) */}
        <div className="mt-6 p-4 rounded-2xl bg-[#150D28]/90 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Account Integrity Record</p>
              <p className="text-[11px] text-slate-400">Zero-tolerance policy for fake reports, profanity & hate speech</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-slate-300">
              Fake Reports: <strong className="text-white">{user.warningStrikes?.fakePostCount || 0} / 3 strikes</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-slate-300">
              Profanity: <strong className="text-white">{user.warningStrikes?.badWordsCount || 0} / 3 strikes</strong>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-bold text-slate-300">
              Hate Speech: <strong className="text-white">{user.warningStrikes?.racismCount || 0} / 3 strikes</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Badges & Gamification Showcase */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-white">
            {t.profile.badgesEarned} ({user.badges.filter(b => b.isUnlocked).length}/{user.badges.length})
          </h2>
          <p className="text-xs text-slate-400">
            Earned through high-accuracy verification, civic collaboration, and genuine community hazard resolution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border transition-all duration-200 flex items-start gap-4 ${
                badge.isUnlocked
                  ? 'bg-[#150D28]/90 border-white/10 shadow-lg text-white'
                  : 'bg-white/5 border-white/5 opacity-60 text-slate-400'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                badge.isUnlocked ? 'bg-amber-500/20 border border-amber-500/30 shadow-sm' : 'bg-white/5 border border-white/10 grayscale'
              }`}>
                {badge.icon}
              </div>

              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-white truncate">
                    {language === 'en' ? badge.titleEn : badge.titleBn}
                  </h4>
                  {badge.isUnlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-sky-400 bg-sky-500/20 border border-sky-500/30 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" /> Earned
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-400 bg-white/5 border border-white/10 px-1.5 py-0.2 rounded">
                      Locked
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-300 line-clamp-2">
                  {language === 'en' ? badge.descriptionEn : badge.descriptionBn}
                </p>

                {!badge.isUnlocked && badge.progress && badge.maxProgress && (
                  <div className="pt-2 space-y-1">
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-sky-400 rounded-full"
                        style={{ width: `${(badge.progress / badge.maxProgress) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold block text-right">
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
            <h2 className="text-xl font-extrabold text-white">
              {t.profile.activityHistory}
            </h2>
            <p className="text-xs text-slate-400">Track and manage reports filed under your identity</p>
          </div>
          <Link
            href="/report/new"
            className="text-xs font-bold text-sky-400 hover:text-sky-300 hover:underline"
          >
            + Submit New Issue
          </Link>
        </div>

        <div className="space-y-3">
          {userReports.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-[#150D28]/90 border border-white/10 text-xs text-slate-400">
              {t.profile.noReportsYet}
            </div>
          ) : (
            userReports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-3xl bg-[#150D28]/90 border border-white/10 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={report.mediaUrl || report.imageUrl}
                    alt={report.title}
                    className="w-16 h-16 rounded-2xl object-cover shrink-0 border border-white/10"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">
                        {report.publicId}
                      </span>
                      <StatusBadge status={report.status} size="sm" />
                      {report.requiresCitizenProofOfWork && (
                        <span className="text-[10px] bg-amber-500 text-[#0E081B] font-extrabold px-1.5 py-0.2 rounded">
                          Proof Required
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-extrabold text-white line-clamp-1">
                      {report.title}
                    </h4>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{report.locationName}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>{report.confirmationsCount} votes</span>
                  </span>
                  <Link
                    href={`/report/${report.id}`}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#150D28] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/15 space-y-4 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-black text-white text-base">Submit Work Completion Proof</h3>
              <button onClick={() => setShowWorkProofModal(false)} className="text-slate-400 hover:text-white transition">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-300">
              Upload photo or video verifying that ticket <strong>{user.unresolvedReportIdForWorkProof}</strong> was indeed resolved.
            </p>
            <div className="space-y-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setWorkProofType('image')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1.5 ${workProofType === 'image' ? 'bg-purple-600 text-white border-purple-500' : 'bg-white/5 border-white/10 text-slate-300'}`}
                >
                  <Camera className="w-3.5 h-3.5 text-sky-400" />
                  <span>Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setWorkProofType('video')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1.5 ${workProofType === 'video' ? 'bg-purple-600 text-white border-purple-500' : 'bg-white/5 border-white/10 text-slate-300'}`}
                >
                  <Video className="w-3.5 h-3.5 text-purple-400" />
                  <span>Video</span>
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
                className="text-xs text-slate-300 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white file:text-xs"
              />
              <textarea
                rows={2}
                value={workProofComment}
                onChange={(e) => setWorkProofComment(e.target.value)}
                placeholder="Describe resolution..."
                className="w-full text-xs p-2.5 bg-white/5 border border-white/15 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
              />
              <button
                type="button"
                onClick={handleWorkProofSubmit}
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow transition"
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
