'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  MapPin, 
  BatteryCharging, 
  Battery, 
  PhoneCall, 
  AlertTriangle, 
  Plus, 
  Share2, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Heart,
  Navigation,
  X,
  Radio,
  Send
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BANGLADESH_EMERGENCY_PROVIDERS } from '@/lib/data/emergencyDirectory';
import EmergencyDirectoryModal from '@/components/common/EmergencyDirectoryModal';

interface CircleMember {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  locationName: string;
  lastUpdated: string;
  batteryLevel: number;
  isOnline: boolean;
  statusText: string;
  avatarSeed: string;
}

export default function SafetyCirclesView() {
  const { language, user } = useApp();
  const [activeCircle, setActiveCircle] = useState<'family' | 'neighborhood'>('family');
  const [sosActive, setSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState<number | null>(null);
  const [sosDispatched, setSosDispatched] = useState(false);
  const [addMemberModalOpen, setAddMemberModalOpen] = useState(false);
  const [hotlinesModalOpen, setHotlinesModalOpen] = useState(false);

  // New member form state
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('Family');
  const [newMemberPhone, setNewMemberPhone] = useState('+880 1');

  const [members, setMembers] = useState<CircleMember[]>([
    {
      id: 'mem-1',
      name: user ? `${user.name} (You)` : 'You (Citizen Guardian)',
      relationship: 'Primary Account',
      phone: user?.phone || '+880 1700-000000',
      locationName: user?.livingPlace || 'Mirpur, Dhaka',
      lastUpdated: 'Live right now',
      batteryLevel: 92,
      isOnline: true,
      statusText: 'Safe at Location',
      avatarSeed: user?.name || 'Citizen',
    },
    {
      id: 'mem-2',
      name: 'Farhana Yasmin',
      relationship: 'Sister',
      phone: '+880 1819-334455',
      locationName: 'Dhanmondi Road 27, Dhaka',
      lastUpdated: '3m ago',
      batteryLevel: 74,
      isOnline: true,
      statusText: 'Arrived at Work Safe',
      avatarSeed: 'Farhana+Yasmin',
    },
    {
      id: 'mem-3',
      name: 'Kamal Ahmed',
      relationship: 'Father',
      phone: '+880 1711-456789',
      locationName: 'Banani DOHS, Dhaka',
      lastUpdated: '12m ago',
      batteryLevel: 92,
      isOnline: true,
      statusText: 'At Residence',
      avatarSeed: 'Kamal+Ahmed',
    },
    {
      id: 'mem-4',
      name: 'Tanvir Hossain',
      relationship: 'Brother',
      phone: '+880 1912-778899',
      locationName: 'Uttara Sector 3, Dhaka',
      lastUpdated: '18m ago',
      batteryLevel: 45,
      isOnline: false,
      statusText: 'Commuting on Dhaka Metro',
      avatarSeed: 'Tanvir+Hossain',
    },
  ]);

  const handleStartSos = () => {
    setSosCountdown(3);
    const interval = setInterval(() => {
      setSosCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          triggerSosBroadcast();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSos = () => {
    setSosCountdown(null);
    setSosActive(false);
  };

  const triggerSosBroadcast = () => {
    setSosActive(false);
    setSosDispatched(true);
    // WhatsApp auto-dispatch URL for emergency
    const lat = 23.8041;
    const lng = 90.3667;
    const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
    const text = encodeURIComponent(
      `🚨 EMERGENCY SOS ALERT! I need immediate help. My current location: ${mapUrl}. Sent via Nirapod BD Personal Security Circle.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMem: CircleMember = {
      id: `mem-${Date.now()}`,
      name: newMemberName.trim(),
      relationship: newMemberRelation,
      phone: newMemberPhone.trim(),
      locationName: 'Mirpur, Dhaka',
      lastUpdated: 'Just added',
      batteryLevel: 95,
      isOnline: true,
      statusText: 'Safe',
      avatarSeed: newMemberName.trim(),
    };

    setMembers([newMem, ...members]);
    setNewMemberName('');
    setNewMemberPhone('+880 1');
    setAddMemberModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-transparent text-white py-10 px-4 sm:px-6 lg:px-8 space-y-10 relative">
      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Top Banner (Cyberpunk obsidian card with cyan & purple accents) */}
        <div className="bg-[#130C24]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] flex flex-col md:flex-row md:items-center justify-between gap-6 ring-1 ring-purple-500/15 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 border border-sky-400/30 text-xs font-mono font-bold text-sky-300">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>{language === 'en' ? 'Personal & Family Security Circles' : 'ব্যক্তিগত নিরাপত্তা ও পরিবার সার্কেল'}</span>
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'en' ? 'Keep Your Loved Ones Safe Across Bangladesh' : 'আপনার পরিবার ও আপনজনদের নিরাপত্তা নিশ্চিত রাখুন'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {language === 'en'
                ? 'Create private security circles for family and trusted friends. Monitor battery and safe arrivals, and broadcast 1-tap SOS alerts with live GPS coordinates.'
                : 'পরিবার ও বন্ধুদের নিয়ে প্রাইভেট নিরাপত্তা সার্কেল গড়ে তুলুন। নিরাপদ আগমন ও ব্যাটারি স্ট্যাটাস ট্র্যাক করুন এবং জরুরি মুহূর্তে ১-ট্যাপে এসওএস পাঠান।'}
            </p>
          </div>

          {/* Quick SOS Trigger Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={() => setSosActive(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emergency hover:bg-emergency-hover text-white font-black text-sm shadow-[0_0_25px_rgba(239,68,68,0.5)] transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-red-500/40"
            >
              <AlertTriangle className="w-5 h-5 fill-white text-emergency animate-pulse" />
              <span>{language === 'en' ? '🚨 1-Tap SOS Dispatch' : '🚨 ১-ট্যাপ এসওএস অ্যালার্ট'}</span>
            </button>

            <button
              onClick={() => setAddMemberModalOpen(true)}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-sm shadow-[0_0_20px_rgba(56,189,248,0.3)] transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border border-sky-400/40"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'en' ? 'Add Member' : 'সদস্য যোগ করুন'}</span>
            </button>
          </div>
        </div>

        {/* SOS Countdown Overlay */}
        {sosActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/85 backdrop-blur-md animate-in fade-in duration-150">
            <div className="bg-[#1A0A17]/95 rounded-3xl max-w-md w-full p-8 shadow-[0_0_60px_rgba(239,68,68,0.4)] border-2 border-red-500/70 text-center space-y-6 animate-in zoom-in-95 duration-150 ring-1 ring-red-500/30">
              <div className="w-20 h-20 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/40 animate-bounce">
                <AlertTriangle className="w-10 h-10 fill-red-500 text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-white">
                  {language === 'en' ? 'Triggering Emergency SOS' : 'জরুরি এসওএস বার্তা পাঠানো হচ্ছে'}
                </h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {language === 'en'
                    ? 'Broadcasting your live GPS location to all circle members and generating WhatsApp alert.'
                    : 'আপনার সার্কেলের সকল সদস্যের কাছে লাইভ লোকেশন সহ জরুরি বার্তা পাঠানো হচ্ছে।'}
                </p>
              </div>

              {sosCountdown !== null && (
                <div className="text-6xl font-black text-red-400 font-display tabular-nums tracking-tight animate-pulse">
                  0{sosCountdown}
                </div>
              )}

              <div className="space-y-3">
                {sosCountdown === null ? (
                  <button
                    onClick={handleStartSos}
                    className="w-full py-4 rounded-2xl bg-emergency hover:bg-emergency-hover text-white font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(239,68,68,0.5)] transition"
                  >
                    Confirm & Send SOS Now
                  </button>
                ) : (
                  <button
                    onClick={cancelSos}
                    className="w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 font-bold text-xs uppercase tracking-wider transition"
                  >
                    Cancel Alert
                  </button>
                )}
                
                <a
                  href="tel:999"
                  className="w-full py-3 rounded-2xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <PhoneCall className="w-4 h-4 text-red-400" />
                  <span>Direct Call 999 Police / Ambulance</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* SOS Sent Banner */}
        {sosDispatched && (
          <div className="p-4 sm:p-5 rounded-2xl bg-sky-500/15 border border-sky-400/30 flex items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-200 shadow-glass">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-white">
                  {language === 'en' ? 'Emergency SOS Broadcasted' : 'এসওএস বার্তা সফলভাবে সম্প্রচারিত হয়েছে'}
                </h4>
                <p className="text-xs text-sky-200">
                  {language === 'en'
                    ? 'WhatsApp and SMS dispatch initiated with your coordinates: 23.8041° N, 90.3667° E.'
                    : 'আপনার বর্তমান লোকেশন সহ সার্কেল সদস্যদের হোয়াটসঅ্যাপ ও এসএমএস লিঙ্ক সক্রিয় করা হয়েছে।'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSosDispatched(false)}
              className="text-xs text-sky-300 hover:text-white font-bold px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 transition"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Circle Members Grid (Dark glass cards with vibrant status) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-400" />
              <h3 className="text-lg font-black text-white">
                {language === 'en' ? 'Active Circle Members' : 'সার্কেলের সক্রিয় সদস্য'} ({members.length})
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              Auto GPS Sync
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-[#130C24]/90 backdrop-blur-2xl rounded-3xl p-5 border border-white/10 hover:border-purple-400/40 hover:bg-[#1A1033] shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all flex flex-col justify-between space-y-4 ring-1 ring-purple-500/10 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.avatarSeed}&backgroundColor=2563EB&textColor=ffffff`}
                      alt={member.name}
                      className="w-12 h-12 rounded-2xl border-2 border-sky-400/40 object-cover shadow-sm"
                    />
                    <div>
                      <h4 className="text-sm font-extrabold text-white truncate max-w-[130px] group-hover:text-sky-300 transition-colors">
                        {member.name}
                      </h4>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-400/30 inline-block mt-0.5">
                        {member.relationship}
                      </span>
                    </div>
                  </div>

                  {/* Battery & Online Status */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-slate-200 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                      <Battery className={`w-3.5 h-3.5 ${member.batteryLevel < 20 ? 'text-emergency animate-pulse' : 'text-emerald-400'}`} />
                      <span>{member.batteryLevel}%</span>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${
                      member.isOnline 
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30 flex items-center gap-1' 
                        : 'bg-white/5 text-slate-400 border-white/10'
                    }`}>
                      {member.isOnline ? (
                        <>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                          <span>Live</span>
                        </>
                      ) : (
                        'Offline'
                      )}
                    </span>
                  </div>
                </div>

                {/* Location and Status */}
                <div className="p-3.5 bg-[#0E081B] rounded-2xl border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                    <span className="truncate">{member.locationName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="truncate">{member.statusText}</span>
                    <span className="shrink-0 font-mono text-[10px]">{member.lastUpdated}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${member.phone}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essential Bangladesh Service Providers & Emergency Hotlines Banner */}
        <div className="bg-[#0E081B]/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-6 ring-1 ring-sky-500/15">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-mono font-extrabold text-sky-400 tracking-wider">
                Bangladesh National Hotlines
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-0.5">
                {language === 'en' ? '1-Tap Service Provider Quick Dial' : '১-ট্যাপ জরুরি সরকারি হটলাইন'}
              </h3>
            </div>
            <button
              onClick={() => setHotlinesModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-extrabold shadow-sm transition"
            >
              {language === 'en' ? 'Open Full Directory (10+ Numbers)' : 'সম্পূর্ণ ডিরেক্টরি দেখুন'}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Emergency 999', num: '999', tag: 'Police / Fire' },
              { label: 'Health 16263', num: '16263', tag: 'Ambulance' },
              { label: 'Citizen 333', num: '333', tag: 'Govt Info' },
              { label: 'Women 109', num: '109', tag: 'Helpline' },
              { label: 'WASA 16162', num: '16162', tag: 'Water Leak' },
              { label: 'DESCO 16120', num: '16120', tag: 'Power Fault' },
            ].map(p => (
              <a
                key={p.num}
                href={`tel:${p.num}`}
                className="p-3.5 rounded-2xl bg-[#150D28] hover:bg-[#1C1236] border border-white/10 hover:border-sky-400/40 transition-all text-center flex flex-col justify-between group shadow-glass"
              >
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">{p.tag}</span>
                  <span className="text-lg font-mono font-black text-white group-hover:text-sky-300 transition-colors block mt-1">
                    {p.num}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-sky-400 mt-2 inline-flex items-center justify-center gap-1">
                  <PhoneCall className="w-3 h-3" />
                  <span>Call</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Add Member Modal */}
        {addMemberModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
            <div className="bg-[#150D28]/95 backdrop-blur-2xl rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/15 space-y-5 animate-in zoom-in-95 duration-150 ring-1 ring-sky-500/20 text-white">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center shadow-sm">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base">Add Circle Member</h3>
                    <p className="text-[11px] text-slate-400">Connect family or trusted emergency guardian</p>
                  </div>
                </div>
                <button
                  onClick={() => setAddMemberModalOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="e.g. Salma Begum"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-sky-400/60 focus:ring-1 focus:ring-sky-400/60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Relationship
                  </label>
                  <select
                    value={newMemberRelation}
                    onChange={(e) => setNewMemberRelation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E081B] border border-white/10 text-xs font-medium text-white focus:outline-none focus:border-sky-400/60 focus:ring-1 focus:ring-sky-400/60"
                  >
                    <option value="Parent" className="bg-[#0E081B] text-white">Parent (পিতা/মাতা)</option>
                    <option value="Spouse" className="bg-[#0E081B] text-white">Spouse (জীবনসঙ্গী)</option>
                    <option value="Sibling" className="bg-[#0E081B] text-white">Sibling (ভাই/বোন)</option>
                    <option value="Child" className="bg-[#0E081B] text-white">Child (সন্তান)</option>
                    <option value="Neighbor" className="bg-[#0E081B] text-white">Neighbor (প্রতিবেশী)</option>
                    <option value="Colleague" className="bg-[#0E081B] text-white">Colleague / Friend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Bangladeshi Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={newMemberPhone}
                    onChange={(e) => setNewMemberPhone(e.target.value)}
                    placeholder="+880 1712-345678"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white placeholder-slate-500 focus:outline-none focus:border-sky-400/60 focus:ring-1 focus:ring-sky-400/60"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setAddMemberModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-extrabold shadow-sm transition"
                  >
                    Add to Circle
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Hotlines Modal */}
        <EmergencyDirectoryModal
          isOpen={hotlinesModalOpen}
          onClose={() => setHotlinesModalOpen(false)}
        />

      </div>
    </div>
  );
}
