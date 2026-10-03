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
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Banner (Life360 style clean typography) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-civic-blue">
              <ShieldCheck className="w-4 h-4 text-civic-blue" />
              <span>{language === 'en' ? 'Personal Security Circles' : 'ব্যক্তিগত নিরাপত্তা সার্কেল'}</span>
              <span className="w-2 h-2 rounded-full bg-civic-blue animate-pulse" />
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-navy tracking-tight">
              {language === 'en' ? 'Keep Your Loved Ones Safe Across Bangladesh' : 'আপনার পরিবার ও আপনজনদের নিরাপত্তা নিশ্চিত রাখুন'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              {language === 'en'
                ? 'Create private security circles for family and trusted friends. Monitor battery and safe arrivals, and broadcast 1-tap SOS alerts with live GPS coordinates.'
                : 'পরিবার ও বন্ধুদের নিয়ে প্রাইভেট নিরাপত্তা সার্কেল গড়ে তুলুন। নিরাপদ আগমন ও ব্যাটারি স্ট্যাটাস ট্র্যাক করুন এবং জরুরি মুহূর্তে ১-ট্যাপে এসওএস পাঠান।'}
            </p>
          </div>

          {/* Quick SOS Trigger Button */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setSosActive(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emergency hover:bg-emergency-hover text-white font-extrabold text-sm shadow-emergency transition transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-5 h-5 fill-white text-emergency" />
              <span>{language === 'en' ? '🚨 1-Tap SOS Dispatch' : '🚨 ১-ট্যাপ এসওএস অ্যালার্ট'}</span>
            </button>

            <button
              onClick={() => setAddMemberModalOpen(true)}
              className="w-full sm:w-auto px-5 py-4 rounded-2xl bg-civic-blue hover:bg-civic-royal text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'en' ? 'Add Member' : 'সদস্য যোগ করুন'}</span>
            </button>
          </div>
        </div>

        {/* SOS Countdown Overlay */}
        {sosActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/85 backdrop-blur-md animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border-2 border-emergency text-center space-y-6 animate-in zoom-in-95 duration-150">
              <div className="w-20 h-20 rounded-full bg-red-100 text-emergency flex items-center justify-center mx-auto animate-bounce">
                <AlertTriangle className="w-10 h-10 fill-emergency text-white" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-navy">
                  {language === 'en' ? 'Triggering Emergency SOS' : 'জরুরি এসওএস বার্তা পাঠানো হচ্ছে'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'en'
                    ? 'Broadcasting your live GPS location to all 4 circle members and generating WhatsApp alert.'
                    : 'আপনার সার্কেলের সকল সদস্যের কাছে লাইভ লোকেশন সহ জরুরি বার্তা পাঠানো হচ্ছে।'}
                </p>
              </div>

              {sosCountdown !== null && (
                <div className="text-6xl font-black text-emergency font-mono animate-pulse">
                  0{sosCountdown}
                </div>
              )}

              <div className="space-y-3">
                {sosCountdown === null ? (
                  <button
                    onClick={handleStartSos}
                    className="w-full py-4 rounded-2xl bg-emergency hover:bg-emergency-hover text-white font-black text-sm uppercase tracking-wider shadow-lg transition"
                  >
                    Confirm & Send SOS Now
                  </button>
                ) : (
                  <button
                    onClick={cancelSos}
                    className="w-full py-3.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider transition"
                  >
                    Cancel Alert
                  </button>
                )}
                
                <a
                  href="tel:999"
                  className="w-full py-3 rounded-2xl bg-navy hover:bg-navy-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <PhoneCall className="w-4 h-4 text-blue-300" />
                  <span>Direct Call 999 Police / Ambulance</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* SOS Sent Banner */}
        {sosDispatched && (
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50 border border-blue-300 flex items-center justify-between gap-4 animate-in slide-in-from-top-4 duration-200">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-civic-blue shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-blue-900">
                  {language === 'en' ? 'Emergency SOS Broadcasted' : 'এসওএস বার্তা সফলভাবে সম্প্রচারিত হয়েছে'}
                </h4>
                <p className="text-xs text-blue-700">
                  {language === 'en'
                    ? 'WhatsApp and SMS dispatch initiated with your coordinates: 23.8041° N, 90.3667° E.'
                    : 'আপনার বর্তমান লোকেশন সহ সার্কেল সদস্যদের হোয়াটসঅ্যাপ ও এসএমএস লিঙ্ক সক্রিয় করা হয়েছে।'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSosDispatched(false)}
              className="text-xs text-blue-700 hover:text-blue-900 font-bold px-3 py-1.5 rounded-lg bg-blue-100/60"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Circle Members Grid (Life360 style cards) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-civic-blue" />
              <h3 className="text-lg font-black text-navy">
                {language === 'en' ? 'Active Circle Members' : 'সার্কেলের সক্রিয় সদস্য'} ({members.length})
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Auto-refreshed via GPS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-civic-blue/50 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.avatarSeed}&backgroundColor=0A2540&textColor=ffffff`}
                      alt={member.name}
                      className="w-12 h-12 rounded-2xl border-2 border-blue-100 object-cover shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-extrabold text-navy truncate max-w-[130px]">
                        {member.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-civic-blue border border-blue-200 inline-block mt-0.5">
                        {member.relationship}
                      </span>
                    </div>
                  </div>

                  {/* Battery & Online Status */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                      <Battery className={`w-3.5 h-3.5 ${member.batteryLevel < 20 ? 'text-emergency' : 'text-civic-blue'}`} />
                      <span>{member.batteryLevel}%</span>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                      member.isOnline ? 'bg-blue-50 text-civic-blue' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {member.isOnline ? '● Live' : 'Offline'}
                    </span>
                  </div>
                </div>

                {/* Location and Status */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-navy">
                    <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                    <span className="truncate">{member.locationName}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="truncate">{member.statusText}</span>
                    <span className="shrink-0">{member.lastUpdated}</span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={`tel:${member.phone}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-1 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-civic-blue" />
                    <span>Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${member.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center gap-1 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Essential Bangladesh Service Providers & Emergency Hotlines Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                Bangladesh National Hotlines
              </span>
              <h3 className="text-lg sm:text-xl font-black text-navy mt-0.5">
                {language === 'en' ? '1-Tap Service Provider Quick Dial' : '১-ট্যাপ জরুরি সরকারি হটলাইন'}
              </h3>
            </div>
            <button
              onClick={() => setHotlinesModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-light transition"
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
                className="p-3.5 rounded-2xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-100 transition-all text-center flex flex-col justify-between group"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">{p.tag}</span>
                  <span className="text-lg font-mono font-black text-navy group-hover:text-civic-blue transition-colors block mt-1">
                    {p.num}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-civic-blue mt-2 inline-flex items-center justify-center gap-1">
                  <PhoneCall className="w-3 h-3" />
                  <span>Call</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Add Member Modal */}
        {addMemberModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-blue-100 space-y-5 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-civic-blue text-white flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy text-base">Add Circle Member</h3>
                    <p className="text-[11px] text-slate-500">Connect family or trusted emergency guardian</p>
                  </div>
                </div>
                <button
                  onClick={() => setAddMemberModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddMember} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="e.g. Salma Begum"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-civic-blue focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Relationship
                  </label>
                  <select
                    value={newMemberRelation}
                    onChange={(e) => setNewMemberRelation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-civic-blue focus:outline-none bg-white"
                  >
                    <option value="Parent">Parent (পিতা/মাতা)</option>
                    <option value="Spouse">Spouse (জীবনসঙ্গী)</option>
                    <option value="Sibling">Sibling (ভাই/বোন)</option>
                    <option value="Child">Child (সন্তান)</option>
                    <option value="Neighbor">Neighbor (প্রতিবেশী)</option>
                    <option value="Colleague">Colleague / Friend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Bangladeshi Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={newMemberPhone}
                    onChange={(e) => setNewMemberPhone(e.target.value)}
                    placeholder="+880 1712-345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-civic-blue focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setAddMemberModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-civic-blue hover:bg-civic-royal text-white text-xs font-bold shadow-sm transition"
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
