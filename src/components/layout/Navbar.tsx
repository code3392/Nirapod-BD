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
  UserPlus
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
      label: language === 'en' ? 'Area Communities' : 'এলাকাভিত্তিক কমিউনিটি',
      desc: language === 'en' ? 'Mirpur, Dhanmondi, Uttara neighborhood feeds' : 'মিরপুর, ধানমন্ডি, উত্তরা আলোচনা ও তথ্য',
      icon: Users,
      badge: 'Hubs',
    },
    {
      href: '/lost-and-found',
      label: language === 'en' ? 'Lost & Found' : 'হারানো ও প্রাপ্তি ডেস্ক',
      desc: language === 'en' ? 'Search & trace lost Smart NID, documents, wallet' : 'স্মার্ট এনআইডি, কাগজপত্র ও হারানো জিনিস খুঁজুন',
      icon: Search,
    },
    {
      href: '/messages',
      label: language === 'en' ? 'Citizen Messages' : 'নাগরিক বার্তা',
      desc: language === 'en' ? 'Direct messages between verified neighbors' : 'বিশ্বস্ত প্রতিবেশীদের মধ্যে প্রত্যক্ষ বার্তা',
      icon: MessageSquare,
    },
    {
      href: '/safety-circles',
      label: language === 'en' ? 'Personal Safety Circles' : 'ব্যক্তিগত নিরাপত্তা সার্কেল',
      desc: language === 'en' ? 'Family emergency network with 1-tap SOS SMS/WhatsApp' : 'পরিবার ও বিশ্বস্তদের জরুরি এসওএস নেটওয়ার্ক',
      icon: ShieldCheck,
      badge: 'Life360',
    },
    {
      href: '#hotlines',
      label: language === 'en' ? 'Emergency Hotlines' : 'জরুরি হটলাইন ডিরেক্টরি',
      desc: language === 'en' ? '999, 16263, 109, 333 & Thana Police numbers' : '৯৯৯, ১৬২৬৩, ১০৯, ৩৩৩ ও থানা পুলিশ নম্বর',
      icon: PhoneCall,
      isAction: true,
      onClick: () => {
        setOptionsDropdownOpen(false);
        setHotlinesModalOpen(true);
      },
    },
    {
      href: '/organization',
      label: language === 'en' ? 'Agency Portal' : 'সরকারি ও সেবা সংস্থা',
      desc: language === 'en' ? 'DNCC, DSCC, WASA, DESCO resolution triage' : 'সিটি কর্পোরেশন, ওয়াসা ও ডেসকো ট্রায়াজ ডেস্ক',
      icon: Building2,
    },
    {
      href: '/admin',
      label: t.nav.admin,
      desc: language === 'en' ? 'Super Admin moderation & security logs' : 'সুপার অ্যাডমিন ও কনটেন্ট মডারেশন লগ',
      icon: Sliders,
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
        return <CheckCircle2 className="w-4 h-4 text-civic-blue" />;
      case 'emergency':
        return <AlertTriangle className="w-4 h-4 text-emergency" />;
      case 'points':
        return <Award className="w-4 h-4 text-warning" />;
      default:
        return <Bell className="w-4 h-4 text-navy" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-surface-border shadow-subtle transition-all">
      {/* Top Emergency Triage Bar */}
      <div className="bg-navy-dark text-white text-xs py-1.5 px-4 sm:px-8 border-b border-navy-subtle">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 rounded-full bg-emergency animate-ping-slow" />
            <span className="font-medium text-slate-200">
              {language === 'en' ? 'Critical Emergency?' : 'জরুরি জীবন বিপদ?'}
            </span>
            <span className="hidden md:inline text-slate-400">
              {language === 'en' 
                ? 'For immediate police, fire or medical danger, dial 999.' 
                : 'তাত্ক্ষণিক পুলিশ, ফায়ার সার্ভিস বা অ্যাম্বুলেন্সের জন্য ৯৯৯ ডায়াল করুন।'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="tel:999" 
              className="inline-flex items-center gap-1.5 bg-emergency hover:bg-emergency-hover text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full transition shadow-sm"
              title="Direct call to Bangladesh Emergency Hotline 999"
            >
              <PhoneCall className="w-3 h-3" />
              <span>{language === 'en' ? 'Call 999 Now' : '৯৯৯ কল করুন'}</span>
            </a>
            <div className="h-3 w-px bg-navy-subtle hidden sm:block" />
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              {t.brand.badge}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy to-civic-deep flex items-center justify-center shadow-md text-white group-hover:scale-105 transition-transform duration-200">
            <div className="relative">
              <ShieldAlert className="w-6 h-6 text-civic-blue" />
              <MapPin className="w-3.5 h-3.5 text-emergency absolute -bottom-1 -right-1 fill-emergency" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-navy group-hover:text-civic-blue transition-colors">
                Nirapod BD
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-civic-blue border border-blue-200">
                Civic
              </span>
            </div>
            <p className="text-[10px] text-muted font-medium font-bengali leading-none -mt-0.5">
              নিরাপদ বাংলাদেশ প্ল্যাটফর্ম
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {primaryLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive
                    ? 'text-navy bg-slate-100 font-bold'
                    : 'text-darktext/80 hover:text-navy hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.2 rounded-full bg-emergency text-white animate-pulse">
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
              className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 border ${
                optionsDropdownOpen 
                  ? 'bg-blue-50 text-civic-blue border-blue-200 shadow-sm' 
                  : 'text-darktext/80 hover:text-navy hover:bg-slate-50 border-transparent'
              }`}
              aria-label="Toggle options menu"
            >
              <span>{language === 'en' ? 'Options' : 'অপশন'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${optionsDropdownOpen ? 'rotate-180 text-civic-blue' : 'text-slate-400'}`} />
            </button>

            {optionsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-blue-100 p-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                    {language === 'en' ? 'Civic Tools & Portals' : 'নাগরিক সেবা ও অপশন'}
                  </span>
                  <span className="text-[10px] font-bold text-civic-blue bg-blue-50 px-2 py-0.5 rounded-full">
                    {optionLinks.length} Services
                  </span>
                </div>

                <div className="max-h-[380px] overflow-y-auto space-y-1">
                  {optionLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    if (item.isAction) {
                      return (
                        <button
                          key={item.label}
                          onClick={item.onClick}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-red-50/60 border border-transparent hover:border-red-100 transition-colors flex items-center gap-3 group"
                        >
                          <div className="w-9 h-9 rounded-xl bg-red-100 text-emergency flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-navy group-hover:text-emergency transition-colors">
                                {item.label}
                              </h5>
                              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-emergency text-white">
                                24/7
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                          </div>
                        </button>
                      );
                    }

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOptionsDropdownOpen(false)}
                        className={`p-2.5 rounded-xl transition-all flex items-center gap-3 border ${
                          isActive
                            ? 'bg-blue-50/80 border-blue-200 text-civic-blue'
                            : 'hover:bg-slate-50 border-transparent'
                        }`}
                      >
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-civic-blue text-white' : 'bg-slate-100 text-slate-700'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <h5 className="text-xs font-bold text-navy truncate">{item.label}</h5>
                            {item.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-civic-blue">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Actions (Language, Notifs, Profile, Report CTA) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg border border-surface-border text-darktext hover:bg-slate-100 transition-colors"
            title="Switch Language / ভাষা পরিবর্তন"
          >
            <Globe className="w-3.5 h-3.5 text-muted" />
            <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="relative p-2 rounded-lg text-darktext hover:bg-slate-100 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emergency text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Dropdown Panel */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-elevated border border-surface-border overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3.5 bg-slate-50 border-b border-surface-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-navy">{t.nav.notifications}</span>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-xs bg-emergency-light text-emergency font-bold px-2 py-0.5 rounded-full">
                        {unreadNotificationsCount} new
                      </span>
                    )}
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-xs text-civic-blue hover:underline font-semibold"
                    >
                      {t.nav.markAllRead}
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-sm text-muted">
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
                        className={`block p-3.5 hover:bg-slate-50 transition-colors ${
                          !notif.isRead ? 'bg-blue-50/60' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-1.5 rounded-lg bg-white shadow-sm border border-slate-100 mt-0.5">
                            {getNotifIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                              <h4 className="text-xs font-bold text-navy truncate">
                                {language === 'en' ? notif.titleEn : notif.titleBn}
                              </h4>
                              <span className="text-[10px] text-muted ml-2 shrink-0">
                                {notif.timestamp}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 line-clamp-2">
                              {language === 'en' ? notif.messageEn : notif.messageBn}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>

                <div className="p-2 bg-slate-50 border-t border-surface-border text-center">
                  <Link
                    href="/profile"
                    onClick={() => setNotifDropdownOpen(false)}
                    className="text-xs text-navy font-bold hover:text-civic-blue transition-colors inline-flex items-center gap-1"
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
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 transition-all shadow-2xs"
                title="Account Menu"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover border border-white shadow-xs"
                />
                <span className="text-xs font-bold text-navy max-w-[90px] truncate hidden sm:inline">
                  {user.name.split(' ')[0]}
                </span>
                {user.isSuperAdmin || user.email === 'smdsami59@gmail.com' ? (
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-amber-500 text-white shadow-2xs">
                    SUPER
                  </span>
                ) : (
                  <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-civic-blue text-white">
                    {user.points}p
                  </span>
                )}
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-elevated border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 border-b border-slate-100 mb-1">
                    <p className="text-xs font-black text-navy truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-blue-50 text-civic-blue border border-blue-200">
                        {user.role}
                      </span>
                      <span className="text-[9px] font-bold text-slate-500">
                        {user.livingPlace.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>{language === 'en' ? 'My Profile & Badges' : 'আমার প্রোফাইল ও ব্যাজ'}</span>
                  </Link>

                  {(user.isSuperAdmin || user.email === 'smdsami59@gmail.com') && (
                    <Link
                      href="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-amber-800 bg-amber-50/70 hover:bg-amber-100 rounded-xl transition mt-0.5"
                    >
                      <Sliders className="w-4 h-4 text-amber-600" />
                      <span>{language === 'en' ? 'Super Admin Console' : 'সুপার অ্যাডমিন ড্যাশবোর্ড'}</span>
                    </Link>
                  )}

                  <Link
                    href="/safety-circles"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition"
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-500" />
                    <span>{language === 'en' ? 'Family Safety Circles' : 'ব্যক্তিগত নিরাপত্তা সার্কেল'}</span>
                  </Link>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-emergency hover:bg-red-50 rounded-xl transition text-left"
                  >
                    <LogOut className="w-4 h-4 text-emergency" />
                    <span>{language === 'en' ? 'Sign Out' : 'লগআউট'}</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="px-3 py-1.5 text-xs font-bold text-navy hover:bg-slate-100 rounded-xl border border-slate-200 transition shadow-2xs"
              >
                {language === 'en' ? 'Sign In' : 'লগইন'}
              </button>
              <button
                onClick={() => {
                  setAuthMode('register');
                  setAuthModalOpen(true);
                }}
                className="hidden sm:inline-flex px-3 py-1.5 text-xs font-bold bg-civic-blue hover:bg-civic-royal text-white rounded-xl shadow-sm transition"
              >
                {language === 'en' ? 'Register' : 'নিবন্ধন'}
              </button>
            </div>
          )}

          {/* Report CTA Button */}
          <Link
            href="/report/new"
            className="inline-flex items-center gap-1.5 bg-emergency hover:bg-emergency-hover text-white text-xs sm:text-sm font-bold px-3.5 sm:px-4 py-2 rounded-xl shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <AlertTriangle className="w-4 h-4 fill-white text-emergency" />
            <span>{t.nav.reportProblem}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-darktext hover:bg-slate-100 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surface-border bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-4 duration-200">
          {user ? (
            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-100">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-civic-blue"
                />
                <div>
                  <p className="font-bold text-sm text-navy">{user.name}</p>
                  <p className="text-xs text-muted">{user.role} • {user.points} Points</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="text-xs font-bold text-emergency hover:underline"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-navy">Browsing as Guest</p>
                <p className="text-[11px] text-slate-500">Sign in to report and track issues</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('login');
                    setAuthModalOpen(true);
                  }}
                  className="px-2.5 py-1 text-xs font-bold bg-navy text-white rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('register');
                    setAuthModalOpen(true);
                  }}
                  className="px-2.5 py-1 text-xs font-bold bg-civic-blue text-white rounded-lg"
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
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  pathname === link.href
                    ? 'bg-slate-100 text-navy font-bold'
                    : 'text-darktext/80 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emergency text-white">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}

            {/* Mobile Options & Services Section */}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="px-3 text-[10px] font-black uppercase text-slate-400 tracking-wider block mb-1">
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
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-emergency hover:bg-red-50 transition"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-emergency" />
                        <span>{item.label}</span>
                      </span>
                      <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-emergency text-white">
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
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-slate-500" />
                      <span>{item.label}</span>
                    </span>
                    {item.badge && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-blue-100 text-civic-blue">
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
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold text-darktext/80 hover:bg-slate-50"
            >
              <span>{t.nav.profile}</span>
              <User className="w-4 h-4 text-muted" />
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-muted">
              {language === 'en' ? 'Language' : 'ভাষা'}:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  language === 'en' ? 'bg-navy text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1 rounded-md text-xs font-bold ${
                  language === 'bn' ? 'bg-navy text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AUTHENTIC AUTHENTICATION MODAL (Rule 13, Rule 20 & Rule 21) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-blue-100 space-y-5 animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-navy text-white flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-civic-blue" />
                </div>
                <div>
                  <h3 className="font-black text-navy text-base">
                    {authMode === 'login' ? 'Citizen & Admin Sign In' : 'Register Citizen Account'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {authMode === 'login' ? 'Access your verified civic dashboard' : 'Join verified community safety network'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setAuthModalOpen(false);
                  setAuthFeedback(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex border-b border-slate-200 text-xs font-bold">
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthFeedback(null);
                }}
                className={`flex-1 py-2.5 text-center border-b-2 transition ${
                  authMode === 'login'
                    ? 'border-civic-blue text-civic-blue font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-navy'
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
                    ? 'border-civic-blue text-civic-blue font-extrabold'
                    : 'border-transparent text-slate-500 hover:text-navy'
                }`}
              >
                Register (Requirement 20)
              </button>
            </div>

            {/* Feedback Message */}
            {authFeedback && (
              <div className={`p-3 rounded-xl text-xs font-bold ${
                authFeedback.type === 'success'
                  ? 'bg-blue-50 text-blue-800 border border-blue-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {authFeedback.message}
              </div>
            )}

            {/* TAB 1: SIGN IN */}
            {authMode === 'login' && (
              <div className="space-y-4">
                {/* 1-Tap Super Admin Access Button */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-navy via-navy to-civic-deep text-white shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                      Rule 13 Root Authority
                    </span>
                    <span className="text-[10px] bg-amber-500 text-white font-black px-1.5 py-0.2 rounded">
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
                    className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-extrabold shadow transition flex items-center justify-center gap-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Sign In as Super Admin (smdsami59@gmail.com)</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <div className="flex-1 h-px bg-slate-200" />
                  <span>OR SIGN IN WITH CITIZEN EMAIL</span>
                  <div className="flex-1 h-px bg-slate-200" />
                </div>

                {/* Email Sign In */}
                <form onSubmit={handleLoginSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-navy block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. your.email@domain.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-civic-blue focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-navy hover:bg-navy-dark text-white rounded-xl text-xs font-bold shadow transition"
                  >
                    Sign In
                  </button>
                </form>

                <p className="text-center text-xs text-slate-500 pt-1">
                  Don&apos;t have an account?{' '}
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setAuthFeedback(null);
                    }}
                    className="text-civic-blue font-bold hover:underline"
                  >
                    Create one here
                  </button>
                </p>
              </div>
            )}

            {/* TAB 2: REGISTER (REQUIREMENT 20: Name, email, phone, living place, area, age, blood group) */}
            {authMode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                <div>
                  <label className="text-[11px] font-bold text-navy block mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohammad Samiul"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-civic-blue focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-navy block mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="smdsami59@gmail.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-civic-blue focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-navy block mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1712-345678"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-civic-blue focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-navy block mb-1">Living Place / Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Road 4, Block D, Mirpur-10"
                    value={regLivingPlace}
                    onChange={(e) => setRegLivingPlace(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-civic-blue focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-navy block mb-1">Area *</label>
                    <select
                      value={regArea}
                      onChange={(e) => setRegArea(e.target.value)}
                      className="w-full px-2 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none"
                    >
                      {DHAKA_AREAS.map((a) => (
                        <option key={a} value={a}>{a}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-navy block mb-1">Age *</label>
                    <input
                      type="number"
                      min={16}
                      max={95}
                      required
                      value={regAge}
                      onChange={(e) => setRegAge(Number(e.target.value))}
                      className="w-full px-2 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-navy block mb-1">Blood *</label>
                    <select
                      value={regBlood}
                      onChange={(e) => setRegBlood(e.target.value)}
                      className="w-full px-2 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none"
                    >
                      {BLOOD_GROUPS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-blue-50/70 rounded-xl text-[11px] text-slate-600 border border-blue-100 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-civic-blue shrink-0 mt-0.5" />
                  <span>
                    Your identity will be awarded the <strong>Greatly Verified Guardian</strong> badge with 100 reputation points upon registration.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-civic-blue hover:bg-civic-royal text-white rounded-xl text-xs font-bold shadow transition flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register & Verify Account</span>
                </button>

                <p className="text-center text-xs text-slate-500 pt-1">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setAuthFeedback(null);
                    }}
                    className="text-civic-blue font-bold hover:underline"
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
