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
  ChevronDown
} from 'lucide-react';
import EmergencyDirectoryModal from '@/components/common/EmergencyDirectoryModal';

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
    allUsers,
    switchUser
  } = useApp();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [optionsDropdownOpen, setOptionsDropdownOpen] = useState(false);
  const [hotlinesModalOpen, setHotlinesModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authEmailInput, setAuthEmailInput] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  // Close notifications and options on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setOptionsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
        return <CheckCircle2 className="w-4 h-4 text-safety" />;
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy to-navy-light flex items-center justify-center shadow-md text-white group-hover:scale-105 transition-transform duration-200">
            <div className="relative">
              <ShieldAlert className="w-6 h-6 text-safety" />
              <MapPin className="w-3.5 h-3.5 text-emergency absolute -bottom-1 -right-1 fill-emergency" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-navy group-hover:text-safety transition-colors">
                Nirapod BD
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-safety-light text-safety border border-safety/20">
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
                      className="text-xs text-safety hover:underline font-semibold"
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
                          !notif.isRead ? 'bg-emerald-50/40' : ''
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
                    className="text-xs text-navy font-bold hover:text-safety transition-colors inline-flex items-center gap-1"
                  >
                    <span>{language === 'en' ? 'Manage Alert Preferences' : 'বিজ্ঞপ্তি সেটিংস'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Account Switcher */}
          <div className="flex items-center gap-1.5">
            <Link
              href="/profile"
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-surface-border bg-slate-50 hover:bg-slate-100 transition-colors"
              title="User Profile & Reputation"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full object-cover border border-white shadow-sm"
              />
              <span className="text-xs font-bold text-navy max-w-[90px] truncate">
                {user.name.split(' ')[0]}
              </span>
              {user.isSuperAdmin ? (
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-amber-500 text-white shadow-2xs">
                  SUPER
                </span>
              ) : (
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-safety text-white">
                  {user.points}p
                </span>
              )}
            </Link>

            {/* Quick Switch / Sign In Modal Trigger */}
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-2.5 py-1 text-xs font-extrabold rounded-lg bg-slate-100 hover:bg-slate-200 text-navy border border-slate-200 transition flex items-center gap-1"
              title="Sign In / Register / Switch Account"
            >
              <UserCheck className="w-3.5 h-3.5 text-navy" />
              <span className="hidden md:inline">Account</span>
            </button>
          </div>

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
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-safety"
              />
              <div>
                <p className="font-bold text-sm text-navy">{user.name}</p>
                <p className="text-xs text-muted">{user.role} • {user.points} Reputation Points</p>
              </div>
            </div>
            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-bold text-safety hover:underline"
            >
              View
            </Link>
          </div>

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

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setAuthModalOpen(true);
            }}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 text-navy font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Switch Account / Sign In</span>
          </button>
        </div>
      )}

      {/* Auth & Account Switcher Modal (Rule 13 & Rule 21) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-surface-border space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-navy text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 text-safety" />
                </div>
                <div>
                  <h3 className="font-extrabold text-navy text-base">Account Authentication</h3>
                  <p className="text-[11px] text-slate-500">Bangladeshi Citizen & Guardian Verification</p>
                </div>
              </div>
              <button
                onClick={() => setAuthModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Active User Profile Banner */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-safety shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs font-black text-navy truncate flex items-center gap-1">
                    <span>{user.name}</span>
                    {user.isSuperAdmin && (
                      <span className="text-[9px] bg-amber-500 text-white font-black px-1.5 py-0.2 rounded">
                        ROOT
                      </span>
                    )}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                  <p className="text-[10px] text-safety font-bold">{user.role} • {user.livingPlace}</p>
                </div>
              </div>
              <span className="text-xs font-black text-safety font-mono shrink-0">
                {user.points} pts
              </span>
            </div>

            {/* Fast Switcher Options */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-extrabold text-slate-400 tracking-wider block">
                Quick Test Switcher
              </span>
              <div className="space-y-2">
                {allUsers.map((u) => {
                  const isCurrent = u.id === user.id;
                  return (
                    <button
                      key={u.id}
                      onClick={() => {
                        switchUser(u.email);
                        setAuthModalOpen(false);
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition ${
                        isCurrent
                          ? 'border-safety bg-safety/5 ring-1 ring-safety'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0 text-left">
                          <p className="text-xs font-bold text-navy truncate">
                            {u.name}
                            {u.isSuperAdmin && (
                              <span className="ml-1 text-[9px] bg-amber-500 text-white font-extrabold px-1 rounded">
                                Super Admin
                              </span>
                            )}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate">{u.email}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCurrent ? 'bg-safety text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {isCurrent ? 'Active' : 'Switch'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Sign In / Registration Form */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[11px] uppercase font-extrabold text-slate-400 tracking-wider block">
                Sign In with Custom Email
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="e.g. smdsami59@gmail.com"
                  value={authEmailInput}
                  onChange={(e) => setAuthEmailInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-safety focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (authEmailInput.trim()) {
                      switchUser(authEmailInput.trim());
                      setAuthModalOpen(false);
                      setAuthEmailInput('');
                    }
                  }}
                  className="px-4 py-2 bg-navy hover:bg-navy-dark text-white rounded-xl text-xs font-bold shadow-sm transition"
                >
                  Sign In
                </button>
              </div>
              <p className="text-[10px] text-slate-400">
                Tip: Enter <span className="font-mono text-navy font-bold">smdsami59@gmail.com</span> for root Super Admin control.
              </p>
            </div>
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
