'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PersonalGroup } from '@/types';
import { 
  Users, 
  UserPlus, 
  Plus, 
  ShieldAlert, 
  ShieldCheck, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Download, 
  X, 
  Copy, 
  Check, 
  Globe, 
  Home, 
  Briefcase, 
  Heart, 
  Sparkles, 
  Send, 
  Paperclip,
  Share2,
  KeyRound,
  UserCheck
} from 'lucide-react';

const MAIN_COMMUNITY_ID = 'main-community';

const CATEGORY_META: Record<PersonalGroup['category'], { labelEn: string; labelBn: string; icon: string; color: string }> = {
  family: { labelEn: 'Family & Relatives', labelBn: 'পরিবার ও স্বজন', icon: '👨‍👩‍👧', color: 'from-blue-600 to-indigo-600' },
  neighborhood: { labelEn: 'Neighborhood Watch', labelBn: 'পাড়া ও মহল্লা', icon: '🏘️', color: 'from-sky-500 to-blue-600' },
  office: { labelEn: 'Workplace & Office', labelBn: 'কর্মক্ষেত্র ও অফিস', icon: '🏢', color: 'from-slate-700 to-slate-900' },
  friends: { labelEn: 'Friends & Commute', labelBn: 'বন্ধু ও যাতায়াত', icon: '🚴', color: 'from-blue-500 to-cyan-600' },
  volunteer: { labelEn: 'Emergency Volunteers', labelBn: 'জরুরি স্বেচ্ছাসেবক', icon: '🤝', color: 'from-red-600 to-rose-700' },
  other: { labelEn: 'Custom Circle', labelBn: 'অন্যান্য সার্কেল', icon: '🛡️', color: 'from-blue-600 to-sky-700' },
};

export default function CommunityHub() {
  const { 
    language, 
    user, 
    personalGroups, 
    createPersonalGroup, 
    joinPersonalGroup, 
    communityMessages, 
    sendCommunityMessage 
  } = useApp();

  const [activeTab, setActiveTab] = useState<string>(MAIN_COMMUNITY_ID);
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; type: string; url: string } | null>(null);
  const [statusNotice, setStatusNotice] = useState<{ type: 'error' | 'success'; message: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modals state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [membersModalOpen, setMembersModalOpen] = useState(false);

  // Create group form state
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupCategory, setNewGroupCategory] = useState<PersonalGroup['category']>('family');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupPrivate, setNewGroupPrivate] = useState(true);

  // Join group form state
  const [joinCodeInput, setJoinCodeInput] = useState('');

  // Active group resolution
  const isMainCommunity = activeTab === MAIN_COMMUNITY_ID;
  const currentPersonalGroup = !isMainCommunity 
    ? personalGroups.find((g) => g.id === activeTab) 
    : undefined;

  // Filter messages for active view
  const currentMessages = communityMessages.filter((m) => {
    if (isMainCommunity) {
      // Main community messages (groupId = 'main-community' or legacy messages)
      return !m.groupId || m.groupId === MAIN_COMMUNITY_ID || m.area === 'Bangladesh';
    }
    // Specific personal group
    return m.groupId === activeTab;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedFile) return;

    const res = sendCommunityMessage(activeTab, inputText, selectedFile || undefined);

    if (!res.success) {
      setStatusNotice({ type: 'error', message: res.violationReason || 'Message flagged by AI Moderation.' });
      setTimeout(() => setStatusNotice(null), 5000);
      return;
    }

    setInputText('');
    setSelectedFile(null);
    setStatusNotice({ 
      type: 'success', 
      message: isMainCommunity ? 'Posted to Nirapod Community.' : `Sent to ${currentPersonalGroup?.name || 'group'}.` 
    });
    setTimeout(() => setStatusNotice(null), 2500);
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;

    const res = createPersonalGroup(
      newGroupName, 
      newGroupDescription, 
      newGroupCategory, 
      newGroupPrivate
    );

    if (res.success && res.group) {
      setActiveTab(res.group.id);
      setCreateModalOpen(false);
      setNewGroupName('');
      setNewGroupDescription('');
      setStatusNotice({ type: 'success', message: `Personal group "${res.group.name}" created successfully!` });
      setTimeout(() => setStatusNotice(null), 3000);
    } else {
      setStatusNotice({ type: 'error', message: res.error || 'Failed to create group.' });
      setTimeout(() => setStatusNotice(null), 4000);
    }
  };

  const handleJoinGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinCodeInput.trim()) return;

    const res = joinPersonalGroup(joinCodeInput);

    if (res.success && res.group) {
      setActiveTab(res.group.id);
      setJoinModalOpen(false);
      setJoinCodeInput('');
      setStatusNotice({ type: 'success', message: `Joined group "${res.group.name}" successfully!` });
      setTimeout(() => setStatusNotice(null), 3000);
    } else {
      setStatusNotice({ type: 'error', message: res.error || 'Invalid invite code.' });
      setTimeout(() => setStatusNotice(null), 4000);
    }
  };

  const copyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleAttachDummyFile = (fileName: string, type: string) => {
    setSelectedFile({
      name: fileName,
      size: '1.4 MB',
      type,
      url: '#',
    });
  };

  return (
    <div className="min-h-screen bg-[#060D1A] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/15 text-xs font-mono font-bold text-sky-300 border border-sky-400/30 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-sky-400" />
              <span>Unified Community & Personal Groups</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'en' ? 'Civic Community & Personal Groups' : 'নাগরিক কমিউনিটি ও ব্যক্তিগত গ্রুপ'}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              {language === 'en'
                ? 'One unified nationwide community for all citizens, plus private personal safety groups for your family, workplace, and neighborhood circles.'
                : 'সকল নাগরিকের জন্য ১টি মূল জাতীয় কমিউনিটি এবং পরিবার, অফিস ও এলাকার জন্য সম্পূর্ণ ব্যক্তিগত সেফটি গ্রুপ।'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-xs shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'en' ? 'Create Personal Group' : 'ব্যক্তিগত গ্রুপ তৈরি করুন'}</span>
            </button>

            <button
              onClick={() => setJoinModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-bold text-xs transition"
            >
              <KeyRound className="w-4 h-4 text-sky-400" />
              <span>{language === 'en' ? 'Join with Code' : 'কোড দিয়ে যোগ দিন'}</span>
            </button>

            <Link
              href="/messages"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition shadow-glass"
            >
              <MessageSquare className="w-4 h-4 text-sky-400" />
              <span>Direct DMs</span>
            </Link>
          </div>
        </div>

        {/* Public Safety Policy Banner */}
        <div className="p-4 sm:p-5 rounded-3xl bg-sky-500/10 border border-sky-400/25 text-xs text-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-glass">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <span className="font-extrabold text-white block">
                {language === 'en' ? 'Official Public Safety & Non-Commercial Policy:' : 'পাবলিক সেফটি ও অবাণিজ্যিক নীতি:'}
              </span>
              <p className="text-slate-300">
                {language === 'en'
                  ? 'All civic communications are strictly reserved for public safety, local hazard coordination, and mutual assistance. Commercial ads and unverified promotions are automatically flagged and prohibited.'
                  : 'সকল যোগাযোগ নাগরিক নিরাপত্তা ও সহযোগিতার জন্য সংরক্ষিত। কোনো প্রকার বিজ্ঞাপন বা অবাস্তব তথ্য প্রচার সম্পূর্ণ নিষিদ্ধ।'}
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-black uppercase bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full border border-sky-400/30 shrink-0">
            Rule 19 • Non-Commercial
          </span>
        </div>

        {/* Main Hub Split Layout: Left Navigation + Right Conversation Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#0A182B]/85 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden min-h-[640px]">
          
          {/* Left Navigation: 1 Main Community + Personal Groups */}
          <div className="lg:col-span-4 bg-white/[0.02] border-r border-white/10 p-5 space-y-6">
            
            {/* SECTION 1: THE 1 UNIFIED MAIN COMMUNITY */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-extrabold text-sky-400 uppercase tracking-wider block px-1">
                Official Main Community
              </span>

              <button
                onClick={() => setActiveTab(MAIN_COMMUNITY_ID)}
                className={`w-full p-4 rounded-2xl text-left transition-all flex items-center justify-between group ${
                  isMainCommunity
                    ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 text-white shadow-lg ring-1 ring-sky-400/40'
                    : 'bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    isMainCommunity ? 'bg-white/20 text-white' : 'bg-sky-500/15 text-sky-400 border border-sky-400/30'
                  }`}>
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-extrabold leading-tight text-white">
                        {language === 'en' ? 'Nirapod Main Community' : 'মূল নিরাপদ কমিউনিটি'}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-300" />
                    </div>
                    <p className={`text-[11px] mt-0.5 ${isMainCommunity ? 'text-sky-100' : 'text-slate-400'}`}>
                      {language === 'en' ? '1 Nationwide Public Discussion' : '১টি উন্মুক্ত জাতীয় নাগরিক ফোরাম'}
                    </p>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full ${isMainCommunity ? 'bg-white animate-pulse' : 'bg-sky-400/40'}`} />
              </button>
            </div>

            {/* SECTION 2: PERSONAL GROUPS */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-mono font-extrabold text-slate-400 uppercase tracking-wider">
                  {language === 'en' ? 'Personal Groups' : 'ব্যক্তিগত গ্রুপসমূহ'} ({personalGroups.length})
                </span>
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition"
                >
                  <Plus className="w-3 h-3" />
                  <span>{language === 'en' ? 'New Group' : 'নতুন গ্রুপ'}</span>
                </button>
              </div>

              {personalGroups.length === 0 ? (
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-dashed border-white/15 text-center space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 text-slate-400 mx-auto flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-200">
                      {language === 'en' ? 'No personal groups created yet' : 'এখনও কোনো পার্সোনাল গ্রুপ তৈরি হয়নি'}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {language === 'en'
                        ? 'Create a private circle for family, roommates, or office colleagues.'
                        : 'পরিবার, বন্ধু বা অফিসের সহকর্মীদের নিয়ে নিজস্ব সেফটি সার্কেল তৈরি করুন।'}
                    </p>
                  </div>
                  <button
                    onClick={() => setCreateModalOpen(true)}
                    className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white border border-white/10 transition"
                  >
                    + {language === 'en' ? 'Create Group' : 'গ্রুপ তৈরি করুন'}
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                  {personalGroups.map((group) => {
                    const isSelected = activeTab === group.id;
                    const meta = CATEGORY_META[group.category] || CATEGORY_META.other;

                    return (
                      <button
                        key={group.id}
                        onClick={() => setActiveTab(group.id)}
                        className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center justify-between group ${
                          isSelected
                            ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-md'
                            : 'bg-white/[0.03] hover:bg-white/[0.07] text-slate-300 hover:text-white border border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-xl group-hover:scale-110 transition-transform shrink-0">
                            {meta.icon}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-xs font-extrabold truncate text-white">
                                {group.name}
                              </h4>
                              {group.isPrivate && <Lock className="w-3 h-3 text-slate-400 shrink-0" />}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className={`text-[10px] font-mono ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                                {group.membersCount} {group.membersCount === 1 ? 'member' : 'members'}
                              </span>
                              <span className="text-[10px] font-mono text-sky-300 px-1.5 py-0.2 rounded bg-black/30 border border-white/10">
                                {group.inviteCode}
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className={`w-2 h-2 rounded-full shrink-0 ${isSelected ? 'bg-white' : 'bg-white/20'}`} />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* SECTION 3: USER IDENTITY CARD */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Your Identity</span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white">{user?.name || 'Guest Citizen'}</span>
                  <span className="text-[9px] font-mono bg-sky-500/20 text-sky-300 font-black px-2 py-0.5 rounded-full border border-sky-400/30">
                    {user?.verificationBadge || 'Citizen'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  {user?.livingPlace ? user.livingPlace.split(',')[0] : 'Bangladesh'}
                </span>
              </div>
            </div>

          </div>

          {/* Right Chat Conversation Stage */}
          <div className="lg:col-span-8 flex flex-col justify-between h-[640px] bg-[#071320]/60">
            
            {/* Conversation Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center font-bold text-sm">
                  {isMainCommunity ? <Globe className="w-5 h-5 text-sky-400" /> : (
                    <span>{CATEGORY_META[currentPersonalGroup?.category || 'other'].icon}</span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm sm:text-base text-white">
                      {isMainCommunity 
                        ? (language === 'en' ? 'Nirapod Main Community' : 'মূল নিরাপদ কমিউনিটি')
                        : currentPersonalGroup?.name}
                    </h3>
                    {!isMainCommunity && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-slate-300 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5 text-sky-400" />
                        <span>Private Group</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {isMainCommunity
                      ? 'All-Bangladesh public civic safety & disaster coordination stream'
                      : currentPersonalGroup?.description || 'Private safety coordination for group members'}
                  </p>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-2">
                {isMainCommunity ? (
                  <span className="text-xs font-mono font-bold text-sky-300 bg-sky-500/15 border border-sky-400/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
                    <span>Live Hub</span>
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => currentPersonalGroup && copyInviteCode(currentPersonalGroup.inviteCode)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-200 transition"
                      title="Copy Group Invite Code"
                    >
                      {copiedCode === currentPersonalGroup?.inviteCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-sky-400" />
                          <span className="text-sky-300 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Code: {currentPersonalGroup?.inviteCode}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setMembersModalOpen(true)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition"
                      title="View Group Members"
                    >
                      <Users className="w-4 h-4 text-sky-400" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Status / Moderation Alert Notice */}
            {statusNotice && (
              <div className={`mx-4 mt-3 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                statusNotice.type === 'error' ? 'bg-red-500/20 text-red-200 border border-red-500/40' : 'bg-sky-500/20 text-sky-200 border border-sky-400/40'
              }`}>
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{statusNotice.message}</span>
              </div>
            )}

            {/* Message History Feed */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
              {currentMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="max-w-sm space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      {isMainCommunity 
                        ? (language === 'en' ? 'Welcome to Nirapod Community' : 'নিরাপদ কমিউনিটিতে স্বাগতম') 
                        : `Welcome to ${currentPersonalGroup?.name}!`}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {isMainCommunity 
                        ? (language === 'en' 
                            ? 'No messages yet in the main community. Be the first citizen to post a civic safety question or neighborhood update.'
                            : 'এখনও কোনো বার্তা দেওয়া হয়নি। প্রথম নাগরিক হিসেবে যেকোনো জননিরাপত্তা নোটিশ বা তথ্য পোস্ট করুন।')
                        : (language === 'en'
                            ? `This is your private group. Share code "${currentPersonalGroup?.inviteCode}" with family or colleagues to coordinate safely.`
                            : `এটি আপনার ব্যক্তিগত গ্রুপ। সদস্যদের যুক্ত করতে ইনভাইট কোড "${currentPersonalGroup?.inviteCode}" শেয়ার করুন।`)}
                    </p>
                  </div>
                </div>
              ) : (
                currentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 group">
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-9 h-9 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-white">{msg.senderName}</span>
                          <span className="text-[9px] font-mono bg-white/10 text-sky-300 font-bold px-2 py-0.5 rounded-full border border-white/10">
                            {msg.senderBadge}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                      </div>

                      <p className="text-xs text-slate-200 bg-white/5 rounded-2xl p-3.5 border border-white/10 leading-relaxed">
                        {msg.content}
                      </p>

                      {/* File Attachment Support */}
                      {msg.fileAttachment && (
                        <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/25 inline-flex items-center gap-2 text-xs font-bold text-white max-w-sm">
                          <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                          <span className="truncate">{msg.fileAttachment.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({msg.fileAttachment.size})</span>
                          <a href={msg.fileAttachment.url} download className="text-sky-400 hover:underline ml-1">
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Box with Attachment & Moderation */}
            <div className="p-4 border-t border-white/10 bg-white/[0.02]">
              {selectedFile && (
                <div className="mb-2 p-2 rounded-xl bg-white/10 border border-white/15 inline-flex items-center gap-2 text-xs">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-white">{selectedFile.name}</span>
                  <button onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={
                      isMainCommunity 
                        ? (language === 'en' ? 'Broadcast a public safety update to Nirapod Community...' : 'কমিউনিটিতে বার্তা লিখুন...')
                        : `Write a private message to ${currentPersonalGroup?.name || 'group'}...`
                    }
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 text-xs sm:text-sm bg-white/5 text-white placeholder:text-slate-500 focus:border-sky-400 focus:bg-white/10 focus:outline-none transition"
                  />

                  <button
                    type="button"
                    onClick={() => handleAttachDummyFile('Safety_Document.pdf', 'pdf')}
                    className="p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                    title="Attach Safety File or Document"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#071320] text-xs font-black shadow-md transition flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                  <span>AI Anti-Profanity & Verification Guard Active</span>
                  <span>{isMainCommunity ? 'Public Stream' : 'Encrypted Group Circle'}</span>
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>

      {/* MODAL 1: CREATE PERSONAL GROUP */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0A182B] border border-white/20 p-6 sm:p-7 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {language === 'en' ? 'Create Personal Group' : 'ব্যক্তিগত গ্রুপ তৈরি করুন'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {language === 'en' ? 'Private safety circle for family, office, or neighbors' : 'পরিবার, অফিস বা সহকর্মীদের জন্য ব্যক্তিগত গ্রুপ'}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setCreateModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGroup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {language === 'en' ? 'Group Name *' : 'গ্রুপের নাম *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'en' ? 'e.g. Family Safety Circle, Green Road Neighbors' : 'যেমন: আমাদের পরিবার, উত্তরা সহকর্মী'}
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {language === 'en' ? 'Group Purpose / Category' : 'গ্রুপের উদ্দেশ্য ও ধরণ'}
                </label>
                <select
                  value={newGroupCategory}
                  onChange={(e) => setNewGroupCategory(e.target.value as PersonalGroup['category'])}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#071320] text-white text-xs focus:border-sky-400 focus:outline-none"
                >
                  <option value="family">👨‍👩‍👧 Family & Relatives</option>
                  <option value="neighborhood">🏘️ Neighborhood Watch</option>
                  <option value="office">🏢 Workplace & Office</option>
                  <option value="friends">🚴 Friends & Commute</option>
                  <option value="volunteer">🤝 Emergency Volunteers</option>
                  <option value="other">🛡️ Custom Circle</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {language === 'en' ? 'Description (Optional)' : 'বিবরণ (ঐচ্ছিক)'}
                </label>
                <textarea
                  rows={2}
                  placeholder={language === 'en' ? 'Brief safety purpose for members...' : 'সদস্যদের জন্য সংক্ষিপ্ত বিবরণ...'}
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white text-xs placeholder:text-slate-500 focus:border-sky-400 focus:outline-none resize-none"
                />
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white block">Invite-Code Privacy</span>
                  <span className="text-[11px] text-slate-400">Only invited members with code can join</span>
                </div>
                <input
                  type="checkbox"
                  checked={newGroupPrivate}
                  onChange={(e) => setNewGroupPrivate(e.target.checked)}
                  className="w-4 h-4 accent-sky-400 rounded"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#071320] text-xs font-black shadow-md transition"
                >
                  {language === 'en' ? 'Create Group' : 'গ্রুপ নিশ্চিত করুন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: JOIN GROUP BY INVITE CODE */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#0A182B] border border-white/20 p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {language === 'en' ? 'Join Personal Group' : 'গ্রুপে যোগ দিন'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {language === 'en' ? 'Enter the 6-digit group invite code' : '৬ অক্ষরের ইনভাইট কোড লিখুন'}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setJoinModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleJoinGroup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">
                  {language === 'en' ? 'Group Invite Code *' : 'ইনভাইট কোড *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NBD-8K2Q"
                  value={joinCodeInput}
                  onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white font-mono text-center text-base tracking-widest placeholder:text-slate-500 focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setJoinModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#071320] text-xs font-black shadow-md transition"
                >
                  {language === 'en' ? 'Join Group' : 'যোগ দিন'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW GROUP MEMBERS */}
      {membersModalOpen && currentPersonalGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#0A182B] border border-white/20 p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">
                    {currentPersonalGroup.name}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {currentPersonalGroup.membersCount} Members • Invite Code: {currentPersonalGroup.inviteCode}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setMembersModalOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Invite Banner */}
            <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white block">Share Group Invite Code:</span>
                <span className="text-[11px] font-mono text-sky-300 font-bold">{currentPersonalGroup.inviteCode}</span>
              </div>
              <button
                onClick={() => copyInviteCode(currentPersonalGroup.inviteCode)}
                className="px-3 py-1.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#071320] text-xs font-bold transition flex items-center gap-1"
              >
                {copiedCode === currentPersonalGroup.inviteCode ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Members List */}
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {currentPersonalGroup.members.map((member) => (
                <div
                  key={member.id}
                  className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center font-bold text-slate-200">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-extrabold text-white block">{member.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Joined {member.joinedAt}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded-full ${
                    member.role === 'admin' ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30' : 'bg-white/5 text-slate-400'
                  }`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setMembersModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
