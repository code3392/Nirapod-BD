'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  ShieldAlert, 
  MapPin, 
  Bell, 
  Menu, 
  X, 
  Globe, 
  AlertTriangle, 
  CheckCircle2, 
  Award,
  ChevronRight,
  PhoneCall,
  User,
  Building2,
  Sliders,
  ExternalLink,
  MessageSquare,
  Users,
  Search,
  LogIn,
  LogOut,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  UserPlus,
  Sparkles,
  Layers,
  HeartHandshake
} from 'lucide-react';
import EmergencyDirectoryModal from '@/components/common/EmergencyDirectoryModal';

const DHAKA_AREAS = [
  'Mirpur', 'Uttara', 'Dhanmondi', 'Gulshan', 'Banani', 'Mohammadpur',
  'Motijheel', 'Old Dhaka', 'Badda', 'Bashundhara', 'Khilgaon', 'Rampura'
];

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

export default function Navbar() {
  const { 
    language, 
    setLanguage, 
    t, 
    notifications, 
    unreadNotificationsCount, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    user,
    login,
    register,
    logout
  } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [optionsDropdownOpen, setOptionsDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [hotlinesModalOpen, setHotlinesModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regLivingPlace, setRegLivingPlace] = useState('');
  const [regArea, setRegArea] = useState('Mirpur');
  const [regAge, setRegAge] = useState(27);
  const [regBlood, setRegBlood] = useState('B+');
  const [authFeedback, setAuthFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const notifRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setOptionsDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLoginSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loginEmail.trim()) {
      setAuthFeedback({ message: 'Please enter a valid email address.', type: 'error' });
      return;
    }
    const res = login(loginEmail.trim());
    if (res.success) {
      setAuthFeedback({ message: res.message, type: 'success' });
      setTimeout(() => {
        setAuthModalOpen(false);
        setAuthFeedback(null);
        setLoginEmail('');
      }, 600);
    } else {
      setAuthFeedback({ message: res.message, type: 'error' });
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim()) {
      setAuthFeedback({ message: 'Please enter your full name and email.', type: 'error' });
      return;
    }
    const res = register({
      name: regName,
      email: regEmail,
      phone: regPhone || '+880 1700-000000',
      livingPlace: regLivingPlace || `${regArea}, Dhaka`,
      area: regArea,
      age: regAge,
      bloodGroup: regBlood,
      occupation: 'Citizen Volunteer',
    });
    if (res.success) {
      setAuthFeedback({ message: res.message, type: 'success' });
      setTimeout(() => {
        setAuthModalOpen(false);
        setAuthFeedback(null);
        setRegName('');
        setRegEmail('');
        setRegPhone('');
        setRegLivingPlace('');
      }, 600);
    } else {
      setAuthFeedback({ message: res.message, type: 'error' });
    }
  };

  const primaryLinks = [
    { href: '/', label: t.nav.home },
    { href: '/map', label: t.nav.safetyMap, badge: 'Live' },
    { href: '/reports', label: t.nav.reports },
  ];

  const optionLinks = [
    {
      href: '/community',
      label: language === 'en' ? 'Civic Community & Groups' : 'কমিউনিটি ও পার্সোনাল গ্রুপ',
      desc: language === 'en' ? '1 Main community & personal safety circles' : 'মূল নিরাপদ কমিউনিটি ও ব্যক্তিগত সেফটি গ্রুপ',
      icon: Users,
      badge: '1 Hub',
    },
    {
      href: '/lost-and-found',
      label: language === 'en' ? 'Lost & Found Directory' : 'হারানো ও প্রাপ্তি তালিকা',
      desc: language === 'en' ? 'Search and report lost items across Dhaka' : 'ঢাকা শহরের হারানো ও পাওয়া জিনিসপত্র খুঁজুন',
      icon: Search,
      badge: 'Civic',
    },
    {
      href: '/safety-circles',
      label: language === 'en' ? 'Personal Security Circles' : 'ব্যক্তিগত নিরাপত্তা সার্কেল',
      desc: language === 'en' ? 'Emergency contacts and family circle alerts' : 'পরিবার ও নিকটজনদের সাথে জরুরি সুরক্ষা নেটওয়ার্ক',
      icon: ShieldCheck,
      badge: 'Circle',
    },
    {
      href: '/organization',
      label: language === 'en' ? 'Municipal Dashboard' : 'পৌর কর্তৃপক্ষ ড্যাশবোর্ড',
      desc: language === 'en' ? 'DNCC, DSCC & WASA work order verification' : 'ডিএনসিসি, ডিএসসিসি ও ওয়াসা কাজের ট্র্যাকিং',
      icon: Building2,
    },
    {
      href: '#emergency-hotlines',
      label: language === 'en' ? 'Bangladesh Emergency Hotlines' : 'জরুরি সেবা হটলাইন ডিরেক্টরি',
      desc: language === 'en' ? 'Police, Ambulance, Fire, WASA, DESCO 24/7' : 'পুলিশ, অ্যাম্বুলেন্স, ফায়ার সার্ভিস, ওয়াসা ও ডেসকো',
      icon: PhoneCall,
      isAction: true,
      onClick: () => {
        setOptionsDropdownOpen(false);
        setHotlinesModalOpen(true);
      },
    },
    {
      href: '/safety-circles#guidelines',
      label: language === 'en' ? 'Safety Guidelines & Laws' : 'নাগরিক সুরক্ষা নীতিমালা',
      desc: language === 'en' ? 'DMP road rules, fire precautions, legal rights' : 'ডিএমপি ট্রাফিক আইন, অগ্নিনির্বাপণ নিয়মাবলি',
      icon: ShieldAlert,
    },
    {
      href: '/#about-us',
      label: language === 'en' ? 'About Nirapod BD' : 'আমাদের সম্পর্কে',
      desc: language === 'en' ? 'Civic mission, verified team, and principles' : 'নাগরিক উদ্দেশ্য, টিম ও নিরাপত্তা নীতিমালা',
      icon: ShieldAlert,
    },
  ];

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'verified':
        return <CheckCircle2 className="w-4 h-4 text-sky-400" />;
      case 'emergency':
        return <AlertTriangle className="w-4 h-4 text-emergency" />;
      case 'points':
        return <Award className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-sky-300" />;
    }
  };

  return (
    <header className="sticky top-2 sm:top-4 z-50 w-full px-3 sm:px-6 pointer-events-none mb-4">
      {/* Floating Dynamic Island Container */}
      <div className="max-w-7xl mx-auto pointer-events-auto bg-[#071320]/85 backdrop-blur-2xl border border-white/10 rounded-full h-16 px-3.5 sm:px-6 flex items-center justify-between shadow-[0_12px_40px_rgba(0,0,0,0.65)] ring-1 ring-sky-500/15 transition-all">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-sky-500 to-blue-700 flex items-center justify-center shadow-[0_0_18px_rgba(56,189,248,0.4)] text-white group-hover:scale-105 transition-transform duration-200 border border-sky-400/30">
            <div className="relative">
              <ShieldAlert className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
              <span className="w-2 h-2 rounded-full bg-emergency absolute -bottom-0.5 -right-0.5 ring-2 ring-[#071320] animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-sky-300 transition-colors">
                Nirapod<span className="text-sky-400">BD</span>
              </span>
              <span className="text-[9px] uppercase font-mono font-extrabold tracking-wider px-1.5 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30">
                Civic
              </span>
            </div>
            <p className="text-[9px] text-slate-400 font-medium font-bengali leading-none -mt-0.5 hidden sm:block">
              নিরাপদ বাংলাদেশ প্ল্যাটফর্ম
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links (Pill Style) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
          {primaryLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-sky-500/20 border border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded-full bg-emergency text-white animate-pulse shadow-sm">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Clean "Options" Dropdown Menu */}
          <div className="relative" ref={optionsRef}>
            <button
              onClick={() => setOptionsDropdownOpen(!optionsDropdownOpen)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 border ${
                optionsDropdownOpen 
                  ? 'bg-sky-500/20 text-sky-300 border-sky-400/40 shadow-sm' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border-transparent'
              }`}
              aria-label="Toggle options menu"
            >
              <span>{language === 'en' ? 'Options' : 'অপশন'}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${optionsDropdownOpen ? 'rotate-180 text-sky-400' : 'text-slate-400'}`} />
            </button>

            {optionsDropdownOpen && (
              <div className="absolute left-0 mt-3 w-80 sm:w-96 bg-[#0A1628]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/15 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-sky-500/20">
                <div className="px-3.5 py-2.5 border-b border-white/10 mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-black uppercase tracking-wider text-slate-400">
                    {language === 'en' ? 'Civic Tools & Portals' : 'নাগরিক সেবা ও অপশন'}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-sky-300 bg-sky-500/15 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                    {optionLinks.length} Services
                  </span>
                </div>

                <div className="max-h-[380px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                  {optionLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    if (item.isAction) {
                      return (
                        <button
                          key={item.label}
                          onClick={item.onClick}
                          className="w-full text-left p-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all flex items-center gap-3 group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform border border-red-500/30">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-red-300 group-hover:text-white transition-colors">
                                {item.label}
                              </h5>
                              <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded-full bg-emergency text-white">
                                24/7
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.desc}</p>
                          </div>
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOptionsDropdownOpen(false)}
                        className={`p-2.5 rounded-2xl transition-all flex items-center gap-3 border ${
                          isActive
                            ? 'bg-sky-500/15 border-sky-400/40 text-white'
                            : 'hover:bg-white/5 border-transparent text-slate-300 hover:text-white'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                          isActive 
                            ? 'bg-sky-500/25 border-sky-400/50 text-sky-300' 
                            : 'bg-white/5 border-white/10 text-slate-400 group-hover:text-sky-300'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold truncate text-white">{item.label}</h5>
                            {item.badge && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-blue-500/20 text-sky-300 border border-sky-400/30">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Island (999 Hotline, Lang, Notifs, Profile, Report CTA) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          
          {/* Integrated 999 Hotline Pill */}
          <a 
            href="tel:999" 
            className="hidden sm:inline-flex items-center gap-1.5 bg-emergency/15 hover:bg-emergency/25 text-red-300 hover:text-red-200 border border-emergency/40 text-xs font-extrabold px-3 py-1.5 rounded-full transition shadow-[0_0_15px_rgba(239,68,68,0.25)]"
            title="Direct call to Bangladesh Emergency Hotline 999"
          >
            <PhoneCall className="w-3.5 h-3.5 text-emergency animate-pulse" />
            <span>999</span>
          </a>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-full border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Switch Language / ভাষা পরিবর্তন"
          >
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-mono">{language === 'en' ? 'বাং' : 'EN'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emergency text-white text-[9px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#0A1628]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/15 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-sky-500/20">
                <div className="p-3.5 bg-white/5 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{t.nav.notifications}</span>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-[10px] font-mono bg-emergency/20 text-red-300 border border-emergency/40 font-bold px-2 py-0.5 rounded-full">
                        {unreadNotificationsCount} new
                      </span>
                    )}
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] text-sky-400 hover:underline font-semibold"
                    >
                      {t.nav.markAllRead}
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      {t.nav.noNotifications}
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <Link
                        key={notif.id}
                        href={notif.link || '#'}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          setNotifDropdownOpen(false);
                        }}
                        className={`block p-3.5 hover:bg-white/5 transition-colors ${
                          !notif.isRead ? 'bg-sky-500/10' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-xl bg-white/5 border border-white/10 mt-0.5 shrink-0">
                            {getNotifIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <h4 className="text-xs font-bold text-white truncate">
                                {language === 'en' ? notif.titleEn : notif.titleBn}
                              </h4>
                              <span className="text-[9px] font-mono text-slate-400 ml-2 shrink-0">
                                {notif.timestamp}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-300 line-clamp-2">
                              {language === 'en' ? notif.messageEn : notif.messageBn}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>

                <div className="p-2.5 bg-white/5 border-t border-white/10 text-center">
                  <Link
                    href="/profile"
                    onClick={() => setNotifDropdownOpen(false)}
                    className="text-xs text-sky-400 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>{language === 'en' ? 'Manage Alert Preferences' : 'বিজ্ঞপ্তি সেটিংস'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile or Guest Auth Buttons */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border border-sky-400/30 bg-white/5 hover:bg-white/10 transition-all"
                title="Account Menu"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-sky-400"
                />
                <span className="text-xs font-bold text-white max-w-[85px] truncate hidden sm:inline">
                  {user.name.split(' ')[0]}
                </span>
                {user.isSuperAdmin || user.email === 'smdsami59@gmail.com' ? (
                  <span className="text-[9px] font-mono font-black px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    SUPER
                  </span>
                ) : (
                  <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                    {user.points}p
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#0A1628]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/15 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-sky-500/20">
                  <div className="p-3 border-b border-white/10 mb-1">
                    <p className="text-xs font-black text-white truncate">{user.name}</p>
                    <p className="text-[11px] font-mono text-slate-400 truncate">{user.email}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30">
                        {user.role}
                      </span>
                      <span className="text-[9px] font-medium text-slate-400">
                        {user.livingPlace.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-200 hover:text-white hover:bg-white/5 rounded-2xl transition"
                  >
                    <User className="w-4 h-4 text-sky-400" />
                    <span>{language === 'en' ? 'My Profile & Badges' : 'আমার প্রোফাইল ও ব্যাজ'}</span>
                  </Link>

                  {(user.isSuperAdmin || user.email === 'smdsami59@gmail.com') && (
                    <Link
                      href="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 rounded-2xl transition mt-0.5 border border-amber-500/30"
                    >
                      <Sliders className="w-4 h-4 text-amber-400" />
                      <span>{language === 'en' ? 'Super Admin Console' : 'সুপার অ্যাডমিন ড্যাশবোর্ড'}</span>
                    </Link>
                  )}

                  <Link
                    href="/safety-circles"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-200 hover:text-white hover:bg-white/5 rounded-2xl transition"
                  >
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>{language === 'en' ? 'Family Safety Circles' : 'ব্যক্তিগত নিরাপত্তা সার্কেল'}</span>
                  </Link>

                  <div className="my-1 border-t border-white/10" />

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-red-400 hover:bg-red-500/10 rounded-2xl transition text-left"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>{language === 'en' ? 'Sign Out' : 'লগআউট'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-3 py-1.5 text-xs font-bold text-slate-200 hover:text-white hover:bg-white/10 rounded-full transition"
              >
                {language === 'en' ? 'Sign In' : 'লগইন'}
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-black bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-[#071320] rounded-full shadow-[0_0_15px_rgba(56,189,248,0.35)] transition"
              >
                {language === 'en' ? 'Register' : 'নিবন্ধন'}
              </button>
            </div>
          )}

          {/* Primary Report CTA Button */}
          <Link
            href="/report/new"
            className="inline-flex items-center gap-1.5 bg-emergency hover:bg-emergency-hover text-white text-xs sm:text-sm font-extrabold px-3.5 sm:px-4 py-2 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all transform hover:scale-105 active:scale-95 border border-emergency/50"
          >
            <AlertTriangle className="w-3.5 h-3.5 fill-white text-emergency" />
            <span className="hidden sm:inline">{t.nav.reportProblem}</span>
            <span className="sm:hidden">Report</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Futuristic Dark Glass) */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 pointer-events-auto bg-[#0A1628]/95 backdrop-blur-2xl rounded-3xl border border-white/15 p-4 space-y-3 shadow-2xl animate-in slide-in-from-top-4 duration-200 ring-1 ring-sky-500/20">
          {user ? (
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-sky-400"
                />
                <div>
                  <p className="font-bold text-sm text-white">{user.name}</p>
                  <p className="text-xs text-slate-400">{user.role} • {user.points} Points</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="text-xs font-bold text-red-400 hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-white">Browsing as Guest</p>
                <p className="text-[11px] text-slate-400">Sign in to report and track issues</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-white/10 text-white rounded-full border border-white/10"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('register');
                    setAuthModalOpen(true);
                  }}
                  className="px-3 py-1.5 text-xs font-black bg-sky-400 text-[#071320] rounded-full"
                >
                  Register
                </button>
              </div>
            </div>
          )}

          <div className="space-y-1">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition ${
                  pathname === link.href
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/40'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-emergency text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Mobile Options & Services Section */}
            <div className="pt-2 border-t border-white/10 space-y-1">
              <span className="px-3 text-[10px] font-mono font-black uppercase text-slate-400 tracking-wider block mb-1">
                {language === 'en' ? 'Options & Services' : 'অপশন ও নাগরিক সেবা'}
              </span>
              {optionLinks.map((item) => {
                const Icon = item.icon;
                if (item.isAction) {
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        item.onClick();
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-red-300 hover:bg-red-500/10 transition"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-emergency" />
                        <span>{item.label}</span>
                      </span>
                      <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded-full bg-emergency text-white">
                        24/7
                      </span>
                    </button>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-white/5 transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-sky-400" />
                      <span>{item.label}</span>
                    </span>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-300 hover:bg-white/5"
            >
              <span>{t.nav.profile}</span>
              <User className="w-4 h-4 text-sky-400" />
            </Link>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono">
              {language === 'en' ? 'Language' : 'ভাষা'}:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  language === 'en' ? 'bg-sky-400 text-[#071320]' : 'bg-white/5 text-slate-300'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  language === 'bn' ? 'bg-sky-400 text-[#071320]' : 'bg-white/5 text-slate-300'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUTHENTIC AUTHENTICATION MODAL (Dark Obsidian Glass Theme) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150 pointer-events-auto">
          <div className="bg-[#0A1628]/95 backdrop-blur-2xl rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/15 space-y-5 animate-in zoom-in-95 duration-150 ring-1 ring-sky-500/20 text-white">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-white text-base">
                    {authMode === 'login' ? 'Citizen & Admin Sign In' : 'Register Citizen Account'}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {authMode === 'login' ? 'Access your verified civic dashboard' : 'Join verified community safety network'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setAuthModalOpen(false);
                  setAuthFeedback(null);
                }}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-white/10 text-xs font-bold">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthFeedback(null);
                }}
                className={`flex-1 py-2.5 text-center border-b-2 transition ${
                  authMode === 'login'
                    ? 'border-sky-400 text-sky-300 font-black'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setAuthFeedback(null);
                }}
                className={`flex-1 py-2.5 text-center border-b-2 transition ${
                  authMode === 'register'
                    ? 'border-sky-400 text-sky-300 font-black'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Register (Requirement 20)
              </button>
            </div>

            {/* Feedback Message */}
            {authFeedback && (
              <div className={`p-3 rounded-2xl text-xs font-bold ${
                authFeedback.type === 'success'
                  ? 'bg-sky-500/20 text-sky-200 border border-sky-400/40'
                  : 'bg-red-500/20 text-red-200 border border-red-500/40'
              }`}>
                {authFeedback.message}
              </div>
            )}

            {/* TAB 1: SIGN IN */}
            {authMode === 'login' && (
              <div className="space-y-4">
                {/* 1-Tap Super Admin Access Button */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-600/10 to-transparent border border-amber-500/30 text-white shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase tracking-wider text-amber-400">
                      Rule 13 Root Authority
                    </span>
                    <span className="text-[10px] font-mono bg-amber-500 text-[#071320] font-black px-1.5 py-0.2 rounded">
                      SUPER ADMIN
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Direct access for platform founder & root administrator.
                  </p>
                  <button
                    onClick={() => {
                      login('smdsami59@gmail.com');
                      setAuthFeedback({ message: 'Welcome back, Super Admin!', type: 'success' });
                      setTimeout(() => {
                        setAuthModalOpen(false);
                        setAuthFeedback(null);
                      }, 500);
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#071320] text-xs font-black shadow transition flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Sign In as Super Admin (smdsami59@gmail.com)</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="font-mono text-[10px]">OR SIGN IN WITH CITIZEN EMAIL</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Email Sign In */}
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. your.email@domain.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-white/5 border border-white/10 rounded-xl focus:border-sky-400 focus:bg-white/10 text-white placeholder:text-slate-500 focus:outline-none transition"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white rounded-xl text-xs font-bold shadow-lg transition"
                  >
                    Sign In
                  </button>
                </form>

                <p className="text-center text-xs text-slate-400 pt-1">
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setAuthFeedback(null);
                    }}
                    className="text-sky-400 font-bold hover:underline"
                  >
                    Create one here
                  </button>
                </p>
              </div>
            )}

            {/* TAB 2: REGISTER (REQUIREMENT 20) */}
            {authMode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohammad Samiul"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl focus:border-sky-400 focus:bg-white/10 text-white placeholder:text-slate-500 focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="smdsami59@gmail.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl focus:border-sky-400 focus:bg-white/10 text-white placeholder:text-slate-500 focus:outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1712-345678"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl focus:border-sky-400 focus:bg-white/10 text-white placeholder:text-slate-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-300 block mb-1">Living Place / Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Road 4, Block D, Mirpur-10"
                    value={regLivingPlace}
                    onChange={(e) => setRegLivingPlace(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl focus:border-sky-400 focus:bg-white/10 text-white placeholder:text-slate-500 focus:outline-none transition"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Area *</label>
                    <select
                      value={regArea}
                      onChange={(e) => setRegArea(e.target.value)}
                      className="w-full px-2 py-2 text-xs bg-[#0A1628] border border-white/15 rounded-xl text-white focus:outline-none"
                    >
                      {DHAKA_AREAS.map((a) => (
                        <option key={a} value={a} className="bg-[#0A1628] text-white">{a}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Age *</label>
                    <input
                      type="number"
                      min={16}
                      max={95}
                      required
                      value={regAge}
                      onChange={(e) => setRegAge(Number(e.target.value))}
                      className="w-full px-2 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Blood *</label>
                    <select
                      value={regBlood}
                      onChange={(e) => setRegBlood(e.target.value)}
                      className="w-full px-2 py-2 text-xs bg-[#0A1628] border border-white/15 rounded-xl text-white focus:outline-none"
                    >
                      {BLOOD_GROUPS.map((b) => (
                        <option key={b} value={b} className="bg-[#0A1628] text-white">{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-sky-500/10 rounded-2xl text-[11px] text-slate-300 border border-sky-400/20 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    Your identity will be awarded the <strong>Greatly Verified Guardian</strong> badge with 100 reputation points upon registration.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-[#071320] rounded-xl text-xs font-black shadow-lg transition flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register & Verify Account</span>
                </button>

                <p className="text-center text-xs text-slate-400 pt-1">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setAuthFeedback(null);
                    }}
                    className="text-sky-400 font-bold hover:underline"
                  >
                    Sign in here
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bangladesh Emergency & Hotlines Modal */}
      <EmergencyDirectoryModal
        isOpen={hotlinesModalOpen}
        onClose={() => setHotlinesModalOpen(false)}
      />
    </header>
  );
}
