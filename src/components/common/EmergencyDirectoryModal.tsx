'use client';

import React, { useState } from 'react';
import { 
  PhoneCall, 
  X, 
  Search, 
  ShieldAlert, 
  Building2, 
  Zap, 
  Droplet, 
  HeartPulse, 
  Baby, 
  ExternalLink,
  Flame,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { 
  BANGLADESH_EMERGENCY_PROVIDERS, 
  DHAKA_POLICE_STATIONS, 
  DHAKA_HOSPITALS_AMBULANCES,
  ServiceProviderItem 
} from '@/lib/data/emergencyDirectory';
import { useApp } from '@/context/AppContext';

interface EmergencyDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyDirectoryModal({ isOpen, onClose }: EmergencyDirectoryModalProps) {
  const { language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('Mirpur');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', labelEn: 'All Hotlines', labelBn: 'সকল হটলাইন' },
    { id: 'emergency', labelEn: '🚨 Life Safety & 999', labelBn: '🚨 জরুরি ৯৯৯' },
    { id: 'utility', labelEn: '⚡ Utilities (WASA/Power/Gas)', labelBn: '⚡ ওয়াসা/বিদ্যুৎ/গ্যাস' },
    { id: 'health', labelEn: '🏥 Healthcare 16263', labelBn: '🏥 স্বাস্থ্য বাতায়ন' },
    { id: 'children_women', labelEn: '🛡️ Women & Child', labelBn: '🛡️ নারী ও শিশু' },
  ];

  const filteredProviders = BANGLADESH_EMERGENCY_PROVIDERS.filter((provider) => {
    const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      provider.nameEn.toLowerCase().includes(q) ||
      provider.nameBn.includes(q) ||
      provider.number.includes(q) ||
      provider.descriptionEn.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const activePolice = DHAKA_POLICE_STATIONS[selectedArea] || DHAKA_POLICE_STATIONS.Mirpur;
  const activeHospital = DHAKA_HOSPITALS_AMBULANCES[selectedArea] || DHAKA_HOSPITALS_AMBULANCES.Mirpur;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-navy-dark/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-blue-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-navy via-navy to-civic-deep text-white flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emergency/20 border border-emergency/40 flex items-center justify-center text-white shadow-sm">
              <PhoneCall className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                  {language === 'en' ? 'Bangladesh Emergency & Service Hotlines' : 'বাংলাদেশ জরুরি ও সেবা হটলাইন ডিরেক্টরি'}
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emergency text-white">
                  24/7 Live
                </span>
              </div>
              <p className="text-xs text-blue-200 font-medium">
                {language === 'en' 
                  ? 'Official government hotlines, utility services & DMP Police Thanas'
                  : 'সরকারি হটলাইন, পানি/বিদ্যুৎ/গ্যাস জরুরি সেবা এবং ঢাকা মেট্রোপলিটন পুলিশ থানা'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close hotline directory"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search by hotline (e.g. 999, WASA, DESCO, Fire)...' : 'হটলাইন খুঁজুন (যেমন ৯৯৯, ওয়াসা, বিদ্যুৎ, ফায়ার সার্ভিস)...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-civic-blue bg-white"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-civic-blue text-white shadow-sm font-bold'
                    : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {language === 'en' ? cat.labelEn : cat.labelBn}
              </button>
            ))}
          </div>
        </div>

        {/* Body Content - Scrollable */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 bg-surface-DEFAULT">
          
          {/* Nearest Police & Hospital Quick Box by Area */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-civic-blue" />
                <span className="text-xs font-extrabold text-navy uppercase tracking-wider">
                  {language === 'en' ? 'Select Your Dhaka Area for Instant Local Duty Officer:' : 'আপনার এলাকার ডিউটি অফিসার ও নিকটবর্তী হাসপাতাল:'}
                </span>
              </div>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-blue-200 text-navy focus:outline-none focus:ring-2 focus:ring-civic-blue"
              >
                {Object.keys(DHAKA_POLICE_STATIONS).map((area) => (
                  <option key={area} value={area}>
                    {area} Zone
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Thana Box */}
              <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-sm flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400">DMP Police Thana</span>
                  <h4 className="text-xs font-bold text-navy truncate">{activePolice.thanaName}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{activePolice.address}</p>
                  <p className="text-xs font-mono font-bold text-slate-700 mt-1">Duty Officer: {activePolice.dutyOfficerMobile}</p>
                </div>
                <a
                  href={`tel:${activePolice.dutyOfficerMobile}`}
                  className="px-3 py-2 rounded-xl bg-navy hover:bg-navy-light text-white text-xs font-bold flex items-center gap-1 shrink-0 transition"
                  title="Call Thana Duty Officer"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Call</span>
                </a>
              </div>

              {/* Hospital Box */}
              <div className="p-3 bg-white rounded-xl border border-blue-100 shadow-sm flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Emergency Hospital</span>
                  <h4 className="text-xs font-bold text-navy truncate">{activeHospital.hospitalName}</h4>
                  <p className="text-[11px] text-slate-500 truncate">{activeHospital.address}</p>
                  <p className="text-xs font-mono font-bold text-slate-700 mt-1">Ambulance: {activeHospital.ambulanceHotline}</p>
                </div>
                <a
                  href={`tel:${activeHospital.ambulanceHotline}`}
                  className="px-3 py-2 rounded-xl bg-emergency hover:bg-emergency-hover text-white text-xs font-bold flex items-center gap-1 shrink-0 transition"
                  title="Call Hospital Ambulance"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-white" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>

          {/* Provider Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
              {language === 'en' ? 'Direct Official Emergency Numbers' : 'সরাসরি সরকারি জরুরি নম্বরসমূহ'} ({filteredProviders.length})
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredProviders.map((provider) => (
                <div
                  key={provider.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-civic-blue transition-all shadow-subtle hover:shadow-card flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-civic-blue border border-blue-200">
                        {language === 'en' ? provider.badgeEn : provider.badgeBn}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {provider.available}
                      </span>
                    </div>

                    <h5 className="font-extrabold text-sm text-navy group-hover:text-civic-blue transition-colors">
                      {language === 'en' ? provider.nameEn : provider.nameBn}
                    </h5>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {language === 'en' ? provider.descriptionEn : provider.descriptionBn}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold">DIAL NUMBER</span>
                      <span className="text-lg font-mono font-black text-navy">{provider.number}</span>
                    </div>

                    <a
                      href={`tel:${provider.number}`}
                      className="px-4 py-2 rounded-xl bg-civic-blue hover:bg-civic-royal text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition transform hover:scale-105"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Direct Call' : 'কল করুন'}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-slate-500">
            {language === 'en'
              ? 'Nirapod BD coordinates with authorities. In immediate physical danger, always call 999.'
              : 'নিরাপদ বিডি কর্তৃপক্ষ ও নাগরিকদের সমন্বয়ক। জীবনের জরুরি ঝুঁকিতে সর্বদা ৯৯৯ ডায়াল করুন।'}
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition"
          >
            {language === 'en' ? 'Close Directory' : 'বন্ধ করুন'}
          </button>
        </div>

      </div>
    </div>
  );
}
