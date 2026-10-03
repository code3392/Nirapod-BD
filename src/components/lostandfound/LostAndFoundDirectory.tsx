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
  const [newMediaUrl, setNewMediaUrl] = useState('https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80');
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Community Lost & Found Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
            {language === 'en' ? 'Dhaka Lost & Found Registry' : 'ঢাকা হারানো ও প্রাপ্তি তালিকা'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Search items by name, report recovered documents/keys, or help neighbors reunite with lost belongings.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-civic-blue hover:bg-blue-700 text-white font-extrabold text-sm shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Lost or Found Item</span>
        </button>
      </div>

      {/* Search & Filter Bar (Rule 22) */}
      <div className="p-5 rounded-3xl bg-white border border-surface-border shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Item Name Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'en' ? 'Search by item name (e.g. National ID, Wallet, Keys, Pet, Phone)...' : 'জিনিসের নাম লিখে খুঁজুন (যেমন: এনআইডি, ওয়ালেট, চাবি, কুকুর)...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-navy focus:ring-2 focus:ring-civic-blue focus:outline-none"
            />
          </div>

          {/* Type Toggle: All / Lost / Found */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedType === 'all' ? 'bg-white text-navy shadow-2xs' : 'text-slate-500 hover:text-navy'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setSelectedType('lost')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedType === 'lost' ? 'bg-emergency text-white shadow-2xs' : 'text-slate-500 hover:text-navy'
              }`}
            >
              Lost
            </button>
            <button
              onClick={() => setSelectedType('found')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedType === 'found' ? 'bg-civic-blue text-white shadow-2xs' : 'text-slate-500 hover:text-navy'
              }`}
            >
              Found
            </button>
          </div>
        </div>

        {/* Area Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-bold">
          <button
            onClick={() => setSelectedArea('all')}
            className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
              selectedArea === 'all' ? 'bg-navy text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Areas
          </button>
          {areas.map((a) => (
            <button
              key={a}
              onClick={() => setSelectedArea(a)}
              className={`px-3 py-1.5 rounded-xl transition whitespace-nowrap ${
                selectedArea === a ? 'bg-navy text-white' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
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
          <div className="col-span-full p-12 text-center rounded-3xl bg-white border border-surface-border text-xs text-muted">
            No lost or found items matched your search query. Try typing another keyword or change your area.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-surface-border shadow-subtle hover:shadow-card transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Media Image / Video */}
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <img
                    src={item.mediaUrl}
                    alt={item.itemName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badges */}
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-white shadow-md ${
                      item.type === 'lost' ? 'bg-emergency' : 'bg-civic-blue'
                    }`}>
                      {item.type === 'lost' ? 'LOST' : 'FOUND'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md">
                      {item.area}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-muted capitalize">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-navy text-base leading-snug line-clamp-2">
                    {item.itemName}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                    <span className="truncate">{item.specificLocation}</span>
                  </p>

                  {item.reward && (
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-xs font-black text-amber-800 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>{item.reward}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Bar */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted block">Contact Person</span>
                    <span className="text-xs font-bold text-navy">{item.contactPerson}</span>
                  </div>

                  <a
                    href={`tel:${item.contactPhone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-bold shadow-sm transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-surface-border overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="p-5 bg-navy text-white flex items-center justify-between">
              <h3 className="font-extrabold text-base">Post a Lost or Recovered Item</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="p-6 overflow-y-auto space-y-4">
              {/* Type Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNewItemType('lost')}
                  className={`p-3 rounded-2xl border text-center font-bold text-xs transition ${
                    newItemType === 'lost' ? 'bg-emergency text-white border-emergency shadow' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  🔴 I Lost Something
                </button>
                <button
                  type="button"
                  onClick={() => setNewItemType('found')}
                  className={`p-3 rounded-2xl border text-center font-bold text-xs transition ${
                    newItemType === 'found' ? 'bg-civic-blue text-white border-civic-blue shadow' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  🔵 I Found Something
                </button>
              </div>

              {/* Item Name */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Item Name / Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Black Leather Wallet with Driving License"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-civic-blue focus:outline-none"
                />
              </div>

              {/* Area & Specific Location */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy">Dhaka Area</label>
                  <select
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white"
                  >
                    {areas.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy">Specific Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Near Mirpur-10 bus stop"
                    value={newSpecificLocation}
                    onChange={(e) => setNewSpecificLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-navy">Description & Key Identifiers *</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe color, marks, contents, or circumstances..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-civic-blue focus:outline-none"
                />
              </div>

              {/* Contact Phone & Reward */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy">Contact Phone *</label>
                  <input
                    type="text"
                    required
                    value={newContactPhone}
                    onChange={(e) => setNewContactPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy">Reward (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. BDT 2,000 Reward"
                    value={newReward}
                    onChange={(e) => setNewReward(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-civic-blue hover:bg-blue-700 text-white text-xs font-black shadow-md"
                >
                  Publish Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
