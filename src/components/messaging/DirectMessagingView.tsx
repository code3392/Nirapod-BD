'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { UserProfile, DirectMessage } from '@/types';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  ShieldCheck, 
  Search, 
  User, 
  FileText, 
  X,
  PhoneCall,
  Mail,
  UserPlus,
  Bot,
  ShieldAlert,
  Phone,
  Check,
  CheckCheck,
  ArrowRight,
  UserCheck
} from 'lucide-react';

// Pre-seeded verified emergency & civic contacts for instant communication
const DEFAULT_SYSTEM_CONTACTS: UserProfile[] = [
  {
    id: 'contact-safety-desk',
    name: 'Nirapod Safety Desk',
    email: 'support@nirapod.bd',
    phone: '+8801700999999',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=NirapodDesk&backgroundColor=7C3AED',
    role: 'Admin',
    isSuperAdmin: false,
    livingPlace: 'Dhaka Central HQ',
    area: 'Dhaka',
    age: 30,
    bloodGroup: 'O+',
    occupation: 'Emergency Coordination Desk',
    isEmailVerified: true,
    isPhoneVerified: true,
    isIdVerified: true,
    verificationBadge: 'Greatly Verified Guardian',
    reputationScore: 500,
    verificationLevel: 'Official 24/7 Desk',
    reportsSubmitted: 0,
    reportsVerified: 120,
    helpfulConfirmations: 250,
    points: 1000,
    badges: [],
    warningStrikes: { fakePostCount: 0, badWordsCount: 0, racismCount: 0 },
    suspendedUntil: null,
    suspensionReason: null,
    bannedFromCommunities: false,
    unresolvedReportIdForWorkProof: null,
    privacySettings: {
      showApproximateLocation: false,
      hideIdentityPublicly: false,
      allowCommunityNotifications: true,
    },
  },
  {
    id: 'contact-volunteer-dispatch',
    name: 'Dhaka Volunteer Dispatch',
    email: 'volunteers@nirapod.bd',
    phone: '+8801811223344',
    avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=VolunteerDispatch&backgroundColor=2563EB&textColor=ffffff',
    role: 'Community Guardian',
    isSuperAdmin: false,
    livingPlace: 'Mirpur, Dhaka',
    area: 'Mirpur',
    age: 28,
    bloodGroup: 'B+',
    occupation: 'Volunteer Coordinator',
    isEmailVerified: true,
    isPhoneVerified: true,
    isIdVerified: true,
    verificationBadge: 'Greatly Verified Guardian',
    reputationScore: 420,
    verificationLevel: 'Rapid Responder',
    reportsSubmitted: 15,
    reportsVerified: 85,
    helpfulConfirmations: 190,
    points: 850,
    badges: [],
    warningStrikes: { fakePostCount: 0, badWordsCount: 0, racismCount: 0 },
    suspendedUntil: null,
    suspensionReason: null,
    bannedFromCommunities: false,
    unresolvedReportIdForWorkProof: null,
    privacySettings: {
      showApproximateLocation: false,
      hideIdentityPublicly: false,
      allowCommunityNotifications: true,
    },
  },
];

export default function DirectMessagingView() {
  const { user, allUsers, directMessages, sendDirectMessage, language } = useApp();

  // Custom added contacts by phone or email
  const [customContacts, setCustomContacts] = useState<UserProfile[]>([]);
  const [activePartner, setActivePartner] = useState<UserProfile | null>(null);
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; type: string; url: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // DM By Phone or Email input state
  const [contactInput, setContactInput] = useState('');
  const [searchFilter, setSearchFilter] = useState('');

  // Hydrate custom contacts from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nirapod_custom_dm_contacts');
        if (saved) {
          setCustomContacts(JSON.parse(saved));
        }
      } catch (err) {
        console.error('Error loading custom contacts:', err);
      }
    }
  }, []);

  // Compute unified contact list: customContacts + allUsers (excluding self) + DEFAULT_SYSTEM_CONTACTS
  const allAvailablePartners: UserProfile[] = React.useMemo(() => {
    const existing = new Map<string, UserProfile>();

    // 1. Custom contacts first
    customContacts.forEach((c) => {
      if (user && c.id === user.id) return;
      existing.set(c.id, c);
    });

    // 2. All registered users from AppContext
    allUsers.forEach((u) => {
      if (user && u.id === user.id) return;
      if (!existing.has(u.id)) {
        existing.set(u.id, u);
      }
    });

    // 3. System support contacts
    DEFAULT_SYSTEM_CONTACTS.forEach((sc) => {
      if (user && sc.id === user.id) return;
      if (!existing.has(sc.id)) {
        existing.set(sc.id, sc);
      }
    });

    return Array.from(existing.values());
  }, [customContacts, allUsers, user]);

  // Set initial active partner
  useEffect(() => {
    if (!activePartner && allAvailablePartners.length > 0) {
      setActivePartner(allAvailablePartners[0]);
    }
  }, [allAvailablePartners, activePartner]);

  // Handle DM anyone by Phone or Email
  const handleConnectCitizen = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = contactInput.trim();
    if (!query) return;

    const lowerQuery = query.toLowerCase();
    const digitsOnly = query.replace(/[^0-9]/g, '');

    // 1. Look for existing match in allAvailablePartners
    const match = allAvailablePartners.find((p) => {
      if (p.email.toLowerCase() === lowerQuery) return true;
      if (digitsOnly.length >= 6 && p.phone.replace(/[^0-9]/g, '').includes(digitsOnly)) return true;
      if (p.name.toLowerCase() === lowerQuery) return true;
      return false;
    });

    if (match) {
      setActivePartner(match);
      setContactInput('');
      setSuccessNotice(
        language === 'en'
          ? `Connected to ${match.name}!`
          : `${match.name}-এর সাথে সংযুক্ত হয়েছে!`
      );
      setTimeout(() => setSuccessNotice(null), 3000);
      return;
    }

    // 2. Not found, create dynamic citizen contact
    const isEmail = query.includes('@');
    const cleanName = isEmail 
      ? query.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
      : `Citizen (${query})`;

    const newContact: UserProfile = {
      id: `citizen-custom-${Date.now()}`,
      name: cleanName,
      email: isEmail ? query : `${digitsOnly || 'user'}@citizen.nirapod.bd`,
      phone: isEmail ? '+8801700000000' : query,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=7C3AED&textColor=ffffff`,
      role: 'Citizen',
      isSuperAdmin: false,
      livingPlace: 'Dhaka, Bangladesh',
      area: 'Dhaka',
      age: 26,
      bloodGroup: 'B+',
      occupation: 'Citizen Guardian',
      isEmailVerified: isEmail,
      isPhoneVerified: !isEmail,
      isIdVerified: false,
      verificationBadge: 'Phone Verified',
      reputationScore: 100,
      verificationLevel: 'Direct Contact',
      reportsSubmitted: 0,
      reportsVerified: 0,
      helpfulConfirmations: 0,
      points: 50,
      badges: [],
      warningStrikes: { fakePostCount: 0, badWordsCount: 0, racismCount: 0 },
      suspendedUntil: null,
      suspensionReason: null,
      bannedFromCommunities: false,
      unresolvedReportIdForWorkProof: null,
      privacySettings: {
        showApproximateLocation: false,
        hideIdentityPublicly: false,
        allowCommunityNotifications: true,
      },
    };

    const updatedCustom = [newContact, ...customContacts];
    setCustomContacts(updatedCustom);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirapod_custom_dm_contacts', JSON.stringify(updatedCustom));
    }

    setActivePartner(newContact);
    setContactInput('');
    setSuccessNotice(
      language === 'en'
        ? `Created direct channel for ${cleanName}!`
        : `${cleanName}-এর জন্য প্রত্যক্ষ চ্যানেল চালু হয়েছে!`
    );
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  // Filter contacts by search input
  const filteredContacts = allAvailablePartners.filter((p) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.phone.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q)
    );
  });

  // Filter messages between current user and activePartner
  const conversationMessages = directMessages.filter((m) => {
    if (!activePartner || !user) return false;
    return (
      (m.senderId === user.id && m.recipientId === activePartner.id) ||
      (m.senderId === activePartner.id && m.recipientId === user.id)
    );
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePartner || (!inputText.trim() && !attachedFile)) return;

    const res = sendDirectMessage(activePartner.id, activePartner.name, inputText, attachedFile || undefined);

    if (!res.success) {
      setErrorMessage(res.violationReason || 'Message flagged by safety system.');
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    setInputText('');
    setAttachedFile(null);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-purple-950/60 border border-purple-500/30 text-purple-300 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.25)]">
          <MessageSquare className="w-10 h-10 text-purple-400" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {language === 'en' ? 'Direct Citizen Messaging' : 'নাগরিক প্রত্যক্ষ বার্তালাপ'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {language === 'en'
              ? 'Sign in with your verified guardian account to securely communicate with neighbors and coordinate civic problem solving.'
              : 'প্রতিবেশীদের সাথে নিরাপদে যোগাযোগ করতে এবং সমস্যা সমাধানে সমন্বয় করতে আপনার একাউন্টে প্রবেশ করুন।'}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] transition transform hover:-translate-y-0.5"
          >
            {language === 'en' ? 'Please Sign In via Top Navigation Bar' : 'উপরের মেনু থেকে সাইন ইন করুন'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-white">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 text-xs font-bold text-purple-300 uppercase tracking-wider border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>{language === 'en' ? 'End-to-End Civic Messages' : 'সুরক্ষিত নাগরিক বার্তালাপ'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {language === 'en' ? 'Direct Citizen Messages' : 'নাগরিক প্রত্যক্ষ বার্তালাপ'}
          </h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            {language === 'en'
              ? 'Directly message any citizen by their phone number or email. Coordinate emergency relief, clarify report evidence, and communicate securely.'
              : 'যেকোনো নাগরিকের ফোন নম্বর বা ইমেইল দিয়ে সরাসরি বার্তা পাঠান। জরুরি সাহায্য ও রিপোর্ট সংক্রান্ত যোগাযোগ নিশ্চিত করুন।'}
          </p>
        </div>

        {/* Quick Hub Shortcut */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/community"
            className="px-4 py-2.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/25 text-purple-200 hover:text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>{language === 'en' ? 'Community Hub' : 'কমিউনিটি হাব'}</span>
          </Link>
        </div>
      </div>

      {/* Main Glass Card Container */}
      <div className="bg-[#120B24]/90 backdrop-blur-2xl rounded-3xl border border-purple-500/25 shadow-[0_15px_50px_rgba(0,0,0,0.7),0_0_35px_rgba(168,85,247,0.15)] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[660px]">
        
        {/* Left Column: Contacts & Direct Connect Section */}
        <div className="md:col-span-5 lg:col-span-4 bg-[#0C061A]/95 border-r border-purple-500/20 p-4 space-y-4 flex flex-col justify-between">
          
          <div className="space-y-4">
            {/* Direct Connect by Phone or Email Form */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/70 via-[#190F33]/90 to-indigo-950/60 border border-purple-500/35 shadow-[0_4px_20px_rgba(168,85,247,0.2)] space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/40">
                  <UserPlus className="w-3.5 h-3.5 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-white">
                    {language === 'en' ? 'DM by Phone or Email' : 'ফোন বা ইমেইল দিয়ে মেসেজ করুন'}
                  </h3>
                  <p className="text-[10px] text-purple-200/70">
                    {language === 'en' ? 'Start a private chat with anyone' : 'যেকোনো ব্যক্তির সাথে চ্যাট শুরু করুন'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleConnectCitizen} className="space-y-2">
                <div className="relative">
                  <input
                    type="text"
                    value={contactInput}
                    onChange={(e) => setContactInput(e.target.value)}
                    placeholder={language === 'en' ? 'e.g. 01712345678 or user@mail.com' : 'যেমনঃ 01712345678 অথবা email'}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#090415] border border-purple-500/30 text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
                  />
                  <Mail className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-3 pointer-events-none" />
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-400">
                    {language === 'en' ? 'BD Mobile or Any Email' : 'মোবাইল বা ইমেইল ঠিকানা'}
                  </span>
                  <button
                    type="submit"
                    disabled={!contactInput.trim()}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 disabled:opacity-40 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{language === 'en' ? 'Start Chat' : 'চ্যাট শুরু করুন'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Filter Contacts Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={language === 'en' ? 'Search conversations...' : 'কথোপকথন খুঁজুন...'}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/25 text-white placeholder-slate-400 text-xs focus:ring-1 focus:ring-purple-400 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-3 pointer-events-none" />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Contacts List Header */}
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-purple-300/80">
                {language === 'en' ? 'Active Channels' : 'সক্রিয় চ্যানেলসমূহ'} ({filteredContacts.length})
              </span>
            </div>

            {/* Contacts Scrollable List */}
            <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
              {filteredContacts.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 space-y-1 rounded-2xl bg-white/[0.02] border border-white/5">
                  <p>{language === 'en' ? 'No contacts found.' : 'কোন কন্টাক্ট পাওয়া যায়নি।'}</p>
                  <p className="text-[10px] text-purple-300">
                    {language === 'en' ? 'Use the form above to add a phone or email.' : 'উপরে ফোন বা ইমেইল দিয়ে চ্যাট শুরু করুন।'}
                  </p>
                </div>
              ) : (
                filteredContacts.map((partner) => {
                  const isSelected = activePartner?.id === partner.id;
                  return (
                    <button
                      key={partner.id}
                      onClick={() => setActivePartner(partner)}
                      className={`w-full p-2.5 sm:p-3 rounded-2xl text-left transition flex items-center gap-3 border ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-900/80 via-[#2B1254] to-indigo-950/80 border-purple-400/60 text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]'
                          : 'bg-white/[0.03] hover:bg-white/[0.08] border-white/5 hover:border-purple-500/30 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="relative shrink-0">
                        <img
                          src={partner.avatar}
                          alt={partner.name}
                          className="w-10 h-10 rounded-xl object-cover border border-purple-500/40 bg-[#160B30]"
                        />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 ring-2 ring-[#0C061A]" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="text-xs font-black truncate text-white">{partner.name}</h4>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 shrink-0">
                            {partner.role}
                          </span>
                        </div>
                        <p className={`text-[10px] truncate ${isSelected ? 'text-purple-200' : 'text-slate-400'}`}>
                          {partner.phone} • {partner.email}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Privacy Note at Bottom */}
          <div className="p-3 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-[10px] text-purple-200/80 flex items-center gap-2 mt-2">
            <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              {language === 'en'
                ? 'Direct messages are encrypted and monitored for emergency coordination safety.'
                : 'সকল বার্তা নাগরিক সুরক্ষা ও সমন্বয়ের জন্য নিরাপদ ও এনক্রিপ্টেড।'}
            </span>
          </div>
        </div>

        {/* Right Column: Chat Stage */}
        <div className="md:col-span-7 lg:col-span-8 bg-[#090416]/95 flex flex-col justify-between h-[660px]">
          
          {/* Active Partner Header */}
          {activePartner ? (
            <div className="p-4 sm:p-5 border-b border-purple-500/20 flex items-center justify-between bg-[#130C26]/80 backdrop-blur-md">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  <img
                    src={activePartner.avatar}
                    alt={activePartner.name}
                    className="w-11 h-11 rounded-2xl object-cover border border-purple-400/40 bg-[#1A0E38]"
                  />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 absolute -bottom-0.5 -right-0.5 ring-2 ring-[#130C26]" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm sm:text-base text-white truncate">
                      {activePartner.name}
                    </h3>
                    <span className="text-[9px] bg-purple-500/20 text-purple-300 font-bold px-2 py-0.5 rounded-full border border-purple-400/30 shrink-0">
                      {activePartner.verificationBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate">
                    <span className="text-purple-300 font-mono">{activePartner.phone}</span>
                    <span className="mx-1.5 opacity-40">•</span>
                    <span className="text-slate-400">{activePartner.email}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${activePartner.phone}`}
                  className="p-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 hover:text-white border border-purple-500/30 transition shadow-sm"
                  title="Call Phone"
                >
                  <Phone className="w-4 h-4 text-purple-300" />
                </a>
                <a
                  href={`mailto:${activePartner.email}`}
                  className="p-2.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 hover:text-white border border-purple-500/30 transition shadow-sm"
                  title="Send Email"
                >
                  <Mail className="w-4 h-4 text-purple-300" />
                </a>
              </div>
            </div>
          ) : (
            <div className="p-5 text-center text-xs text-slate-400 border-b border-purple-500/20">
              {language === 'en' ? 'Select or add a contact to begin messaging' : 'মেসেজ শুরু করতে একটি কন্টাক্ট নির্বাচন করুন বা যোগ করুন'}
            </div>
          )}

          {/* Feedback Notices */}
          {successNotice && (
            <div className="mx-4 mt-2 p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          {errorMessage && (
            <div className="mx-4 mt-2 p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 custom-scrollbar">
            {conversationMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-purple-950/50 border border-purple-500/25 flex items-center justify-center text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <Bot className="w-7 h-7 text-purple-400" />
                </div>
                <div className="space-y-1 max-w-sm">
                  <h4 className="text-sm font-bold text-white">
                    {language === 'en' ? 'No messages in this channel yet' : 'এই চ্যানেলে এখনও কোন বার্তা নেই'}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {language === 'en'
                      ? 'Say hello, exchange emergency updates, or ask about civic reports.'
                      : 'সালাম বা অভিবাদন জানিয়ে জরুরি যোগাযোগ বা তথ্য বিনিময় শুরু করুন।'}
                  </p>
                </div>
              </div>
            ) : (
              conversationMessages.map((msg) => {
                const isMe = msg.senderId === user.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[80%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-2 ${
                        isMe
                          ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white rounded-tr-xs shadow-[0_4px_20px_rgba(147,51,234,0.35)] border border-purple-400/30'
                          : 'bg-[#180E30]/90 text-slate-100 rounded-tl-xs border border-purple-500/25 shadow-md backdrop-blur-md'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>

                      {msg.fileAttachment && (
                        <div
                          className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs font-bold ${
                            isMe
                              ? 'bg-black/20 border-white/20 text-white'
                              : 'bg-purple-950/50 border-purple-500/30 text-purple-200'
                          }`}
                        >
                          <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <span className="truncate block">{msg.fileAttachment.name}</span>
                            <span className="text-[10px] opacity-70 block font-mono">{msg.fileAttachment.size}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-end gap-1 pt-0.5">
                        <span className={`text-[9px] font-mono ${isMe ? 'text-purple-200/90' : 'text-slate-400'}`}>
                          {msg.timestamp}
                        </span>
                        {isMe && <CheckCheck className="w-3 h-3 text-purple-200" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Footer */}
          <div className="p-4 border-t border-purple-500/20 bg-[#120B24]/90 backdrop-blur-md">
            {attachedFile && (
              <div className="mb-2 p-2 rounded-xl bg-purple-950/60 border border-purple-500/30 inline-flex items-center gap-2 text-xs text-purple-200">
                <FileText className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white truncate max-w-xs">{attachedFile.name}</span>
                <span className="text-[10px] opacity-70">({attachedFile.size})</span>
                <button onClick={() => setAttachedFile(null)} className="text-slate-400 hover:text-white ml-1">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={
                  activePartner
                    ? language === 'en'
                      ? `Message ${activePartner.name}...`
                      : `${activePartner.name}-কে বার্তা লিখুন...`
                    : language === 'en'
                    ? 'Type a message...'
                    : 'বার্তা লিখুন...'
                }
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={!activePartner}
                className="flex-1 px-4 py-3 rounded-xl border border-purple-500/30 text-xs sm:text-sm bg-[#090415] text-white placeholder-slate-400 focus:ring-2 focus:ring-purple-400 focus:outline-none transition disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() =>
                  setAttachedFile({
                    name: 'Civic_Verification_Doc.pdf',
                    size: '1.4 MB',
                    type: 'pdf',
                    url: '#',
                  })
                }
                className="p-3 rounded-xl border border-purple-500/30 bg-purple-950/40 hover:bg-purple-900/60 text-purple-300 hover:text-white transition shadow-sm"
                title="Attach Verification Document"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={!activePartner || (!inputText.trim() && !attachedFile)}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 hover:from-purple-500 hover:to-sky-500 text-white text-xs font-black shadow-[0_0_20px_rgba(168,85,247,0.4)] transition disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
              >
                <span>{language === 'en' ? 'Send' : 'পাঠান'}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
