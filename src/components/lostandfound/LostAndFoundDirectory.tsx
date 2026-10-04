'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { LostAndFoundItem } from '@/types';
import { 
  Search, 
  MapPin, 
  Calendar, 
  PhoneCall, 
  Tag, 
  PlusCircle, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  Video,
  Award,
  ExternalLink
} from 'lucide-react';

export default function LostAndFoundDirectory() {
  const { language, user, lostAndFoundItems, addLostAndFoundItem, searchLostAndFound } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [selectedType, setSelectedType] = useState<'all' | 'lost' | 'found'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Post Form State
  const [newItemType, setNewItemType] = useState<'lost' | 'found'>('lost');
  const [newItemName, setNewItemName] = useState('');
  const [newCategory, setNewCategory] = useState<LostAndFoundItem['category']>('documents');
  const [newArea, setNewArea] = useState('Mirpur');
  const [newSpecificLocation, setNewSpecificLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [newContactPhone, setNewContactPhone] = useState(user?.phone || '+880 1711-000000');
  const [newReward, setNewReward] = useState('');

  const filteredItems = searchLostAndFound(searchQuery, selectedArea).filter(
    (item) => selectedType === 'all' || item.type === selectedType
  );

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newDescription.trim()) return;

    addLostAndFoundItem({
      type: newItemType,
      itemName: newItemName,
      description: newDescription,
      category: newCategory,
      area: newArea,
      specificLocation: newSpecificLocation || `${newArea}, Dhaka`,
      date: new Date().toISOString().split('T')[0],
      mediaUrl: newMediaUrl,
      mediaType: newMediaType,
      contactPerson: user?.name || 'Citizen Guardian',
      contactPhone: newContactPhone,
      contactEmail: user?.email || 'citizen@nirapodbd.community',
      reward: newReward || undefined,
      status: 'active',
    });

    setIsModalOpen(false);
    setNewItemName('');
    setNewDescription('');
    setNewSpecificLocation('');
  };

  const areas = ['Mirpur', 'Uttara', 'Dhanmondi', 'Gulshan', 'Mohammadpur', 'Motijheel', 'Old Dhaka', 'Banani', 'Badda'];

  return (
    <div className="min-h-screen bg-transparent text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
              <Tag className="w-3.5 h-3.5 text-purple-400" />
              <span>Community Lost & Found Hub</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'en' ? 'Dhaka Lost & Found Registry' : 'ঢাকা হারানো ও প্রাপ্তি তালিকা'}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Search items by name, report recovered documents/keys, or help neighbors reunite with lost belongings.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.35)] transition transform hover:scale-105 active:scale-95 self-start md:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Lost or Found Item</span>
          </button>
        </div>

        {/* Search & Filter Bar (Rule 22) */}
        <div className="p-5 rounded-3xl bg-[#130C24]/85 backdrop-blur-2xl border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.5)] space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Item Name Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search by item name (e.g. National ID, Wallet, Keys, Pet, Phone)...' : 'জিনিসের নাম লিখে খুঁজুন (যেমন: এনআইডি, ওয়ালেট, চাবি, কুকুর)...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-white focus:border-purple-400 focus:bg-white/10 focus:outline-none placeholder:text-slate-500 transition"
              />
            </div>

            {/* Type Toggle: All / Lost / Found */}
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/10 shrink-0 font-mono">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedType === 'all' ? 'bg-sky-400 text-[#0E081B] font-black shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setSelectedType('lost')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedType === 'lost' ? 'bg-emergency text-white font-black shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Lost
              </button>
              <button
                onClick={() => setSelectedType('found')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  selectedType === 'found' ? 'bg-sky-500 text-white font-black shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Found
              </button>
            </div>
          </div>

          {/* Area Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-mono font-bold">
            <button
              onClick={() => setSelectedArea('all')}
              className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                selectedArea === 'all' ? 'bg-sky-400 text-[#0E081B] font-black' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              All Areas
            </button>
            {areas.map((a) => (
              <button
                key={a}
                onClick={() => setSelectedArea(a)}
                className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                  selectedArea === a ? 'bg-sky-400 text-[#0E081B] font-black' : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Lost & Found Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full p-12 text-center rounded-3xl bg-[#130C24]/85 border border-white/10 text-xs text-slate-400 backdrop-blur-2xl">
              No lost or found items matched your search query. Try typing another keyword or change your area.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#130C24]/85 rounded-3xl border border-white/10 hover:border-purple-400/50 hover:bg-[#1A1033] shadow-[0_10px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Media Image / Video */}
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    <img
                      src={item.mediaUrl}
                      alt={item.itemName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider text-white shadow-md ${
                        item.type === 'lost' ? 'bg-emergency' : 'bg-sky-500'
                      }`}>
                        {item.type === 'lost' ? 'LOST' : 'FOUND'}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/60 text-white backdrop-blur-md border border-white/15">
                        {item.area}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase font-bold text-sky-300 tracking-wider capitalize">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-white text-base leading-snug line-clamp-2 group-hover:text-sky-300 transition-colors">
                      {item.itemName}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                      <span className="truncate">{item.specificLocation}</span>
                    </p>

                    {item.reward && (
                      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-amber-400" />
                        <span>{item.reward}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Bar */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono block">Contact Person</span>
                      <span className="text-xs font-bold text-white">{item.contactPerson}</span>
                    </div>

                    <a
                      href={`tel:${item.contactPhone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-bold shadow-sm transition"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-white" />
                      <span>{item.contactPhone}</span>
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* CREATE MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-xl bg-[#150D28]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/15 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col ring-1 ring-purple-500/20 text-white">
              <div className="p-5 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-extrabold text-base text-white">Post a Lost or Recovered Item</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="p-6 overflow-y-auto space-y-4 custom-scrollbar">
                {/* Type Toggle */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setNewItemType('lost')}
                    className={`p-3 rounded-2xl border text-center font-bold text-xs transition ${
                      newItemType === 'lost' ? 'bg-emergency text-white border-emergency shadow-[0_0_12px_rgba(239,68,68,0.4)]' : 'bg-white/5 text-slate-300 border-white/10'
                    }`}
                  >
                    🔴 I Lost Something
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewItemType('found')}
                    className={`p-3 rounded-2xl border text-center font-bold text-xs transition ${
                      newItemType === 'found' ? 'bg-sky-500 text-white border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.4)]' : 'bg-white/5 text-slate-300 border-white/10'
                    }`}
                  >
                    🔵 I Found Something
                  </button>
                </div>

                {/* Item Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Item Name / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Black Leather Wallet with Driving License"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:border-purple-400 focus:bg-white/10 focus:outline-none transition"
                  />
                </div>

                {/* Area & Specific Location */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Dhaka Area</label>
                    <select
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#150D28] border border-white/15 text-white text-xs sm:text-sm"
                    >
                      {areas.map((a) => (
                        <option key={a} value={a} className="bg-[#150D28] text-white">{a}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Specific Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Near Mirpur-10 bus stop"
                      value={newSpecificLocation}
                      onChange={(e) => setNewSpecificLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:border-purple-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Description & Key Identifiers *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe color, marks, contents, or circumstances..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:border-sky-400 focus:bg-white/10 focus:outline-none transition"
                  />
                </div>

                {/* Contact Phone & Reward */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Contact Phone *</label>
                    <input
                      type="text"
                      required
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs sm:text-sm font-mono focus:border-sky-400 focus:outline-none transition"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Reward (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. BDT 2,000 Reward"
                      value={newReward}
                      onChange={(e) => setNewReward(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:border-sky-400 focus:outline-none transition"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 rounded-full border border-white/10 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-black shadow-md"
                  >
                    Publish Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
