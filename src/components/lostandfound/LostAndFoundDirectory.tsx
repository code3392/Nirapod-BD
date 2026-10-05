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
  const [lostLocationQuery, setLostLocationQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'lost' | 'found'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Post Form State
  const [newItemType, setNewItemType] = useState<'lost' | 'found'>('lost');
  const [newItemName, setNewItemName] = useState('');
  const [newCategory, setNewCategory] = useState<LostAndFoundItem['category']>('documents');
  const [newArea, setNewArea] = useState('');
  const [newSpecificLocation, setNewSpecificLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [newContactPhone, setNewContactPhone] = useState(user?.phone || '+880 1711-000000');
  const [newReward, setNewReward] = useState('');

  // Search using query & lost location
  const filteredItems = searchLostAndFound(searchQuery, lostLocationQuery).filter(
    (item) => selectedType === 'all' || item.type === selectedType
  );

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || !newDescription.trim() || !newSpecificLocation.trim()) return;

    const areaVal = newArea.trim() || newSpecificLocation.split(',')[0].trim() || 'Dhaka';

    addLostAndFoundItem({
      type: newItemType,
      itemName: newItemName.trim(),
      description: newDescription.trim(),
      category: newCategory,
      area: areaVal,
      specificLocation: newSpecificLocation.trim(),
      date: new Date().toISOString().split('T')[0],
      mediaUrl: newMediaUrl || (newItemType === 'found'
        ? 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80'
        : 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=600&q=80'),
      mediaType: newMediaType,
      contactPerson: user?.name || 'Citizen Guardian',
      contactPhone: newContactPhone.trim() || '+880 1711-000000',
      contactEmail: user?.email || 'citizen@nirapodbd.community',
      reward: newReward.trim() || undefined,
      status: 'active',
    });

    setIsModalOpen(false);
    setNewItemName('');
    setNewDescription('');
    setNewSpecificLocation('');
    setNewArea('');
    setNewReward('');
    setNewMediaUrl('');
  };

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
              {language === 'en'
                ? 'Search items by keyword and write the location where you lost your item. Citizens reporting found items specify exact recovery locations to reunite lost belongings.'
                : 'জিনিসের নাম এবং যেখানে হারিয়েছেন সে স্থান লিখে খুঁজুন। উদ্ধারকৃত জিনিসপত্র পোস্ট করার সময় নাগরিকরা সঠিক পাওয়ার স্থান যোগ করেন।'}
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

        {/* Search & Finding Section */}
        <div className="p-5 sm:p-6 rounded-3xl bg-[#130C24]/90 backdrop-blur-2xl border border-white/10 shadow-[0_15px_45px_rgba(0,0,0,0.6)] space-y-4 ring-1 ring-purple-500/15">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            {/* 1. Item Name Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search by item name (e.g. National ID, Wallet, Keys, Pet, Phone)...' : 'জিনিসের নাম লিখে খুঁজুন (যেমন: এনআইডি, ওয়ালেট, চাবি, মোবাইল)...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-white focus:border-sky-400 focus:bg-white/10 focus:outline-none placeholder:text-slate-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  title="Clear item query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 2. Location Where You Lost The Item */}
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 text-emergency absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Where did you lose your item? (e.g. Dhanmondi 27, Mirpur 10, Farmgate)...' : 'কোথায় হারিয়েছেন? (যেমন: ধানমন্ডি ২৭, মিরপুর ১০, ফার্মগেট)...'}
                value={lostLocationQuery}
                onChange={(e) => setLostLocationQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold text-white focus:border-red-400 focus:bg-white/10 focus:outline-none placeholder:text-slate-500 transition"
              />
              {lostLocationQuery && (
                <button
                  onClick={() => setLostLocationQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  title="Clear location filter"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* 3. Type Toggle: All / Lost / Found */}
            <div className="flex items-center gap-1 p-1 bg-white/5 rounded-2xl border border-white/10 shrink-0 font-mono">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${
                  selectedType === 'all' ? 'bg-sky-400 text-[#0E081B] font-black shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setSelectedType('lost')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  selectedType === 'lost' ? 'bg-emergency text-white font-black shadow-[0_0_12px_rgba(239,68,68,0.4)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emergency" />
                Lost
              </button>
              <button
                onClick={() => setSelectedType('found')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  selectedType === 'found' ? 'bg-sky-500 text-white font-black shadow-[0_0_12px_rgba(56,189,248,0.4)]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-sky-400" />
                Found
              </button>
            </div>
          </div>

          {/* Finding Section Location Helper & Active Filter Indicator */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-400 border-t border-white/5">
            <div className="flex items-center gap-1.5">
              <span className="text-sky-400 font-bold">💡 Finding Section:</span>
              <span>
                {language === 'en'
                  ? 'Type where you lost your item above to instantly match recovered items reported by citizens in that area.'
                  : 'আপনি জিনিসটি যে স্থানে হারিয়েছেন তা উপরের বক্সে লিখলে ওই এলাকায় পাওয়া জিনিসপত্র তাৎক্ষণিক খুঁজে পাবেন।'}
              </span>
            </div>

            {lostLocationQuery && (
              <div className="inline-flex items-center gap-1.5 bg-red-500/15 border border-red-500/30 text-red-300 px-3 py-1 rounded-full text-xs font-mono font-bold">
                <span>📍 Filtering by location: &quot;{lostLocationQuery}&quot;</span>
                <button
                  onClick={() => setLostLocationQuery('')}
                  className="hover:text-white underline ml-1"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Grid of Lost & Found Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length === 0 ? (
            <div className="col-span-full p-12 text-center rounded-3xl bg-[#130C24]/85 border border-white/10 text-xs text-slate-400 backdrop-blur-2xl space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                <Tag className="w-7 h-7" />
              </div>
              <p className="font-bold text-white text-sm">No items match your location or search query</p>
              <p className="max-w-md mx-auto text-slate-400 leading-relaxed">
                {lostLocationQuery
                  ? `No items reported yet for location "${lostLocationQuery}". You can post a lost item notice so others can look out for it.`
                  : 'No lost or found items found. Click "Post Lost or Found Item" to publish a notice.'}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-xs mt-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post an Item Now</span>
              </button>
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
                  <div className="p-5 space-y-3">
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

                    {/* Dedicated Location Highlight Box */}
                    <div className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                      item.type === 'found' 
                        ? 'bg-sky-500/10 border-sky-400/30' 
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${
                        item.type === 'found' ? 'text-sky-400' : 'text-emergency'
                      }`} />
                      <div className="min-w-0 flex-1">
                        <span className={`text-[10px] font-mono font-black uppercase block tracking-wider ${
                          item.type === 'found' ? 'text-sky-300' : 'text-red-300'
                        }`}>
                          {item.type === 'found'
                            ? (language === 'en' ? '📍 FOUND AT LOCATION:' : '📍 প্রাপ্তির স্থান:')
                            : (language === 'en' ? '📍 LOST AT LOCATION:' : '📍 হারানোর স্থান:')}
                        </span>
                        <p className="text-xs font-bold text-white break-words leading-tight mt-0.5">
                          {item.specificLocation}
                        </p>
                      </div>
                    </div>

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
                <h3 className="font-extrabold text-base text-white">
                  {newItemType === 'found' ? 'Report a Recovered / Found Item' : 'Post a Lost Item Notice'}
                </h3>
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

                {/* Category Dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Item Category *</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as LostAndFoundItem['category'])}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0E081B] border border-white/15 text-white text-xs sm:text-sm focus:border-sky-400 focus:outline-none"
                  >
                    <option value="documents">Documents, IDs & Certificates</option>
                    <option value="wallet">Wallet, Purse & Bags</option>
                    <option value="keys">Keys & Keychains</option>
                    <option value="electronics">Phones, Laptops & Electronics</option>
                    <option value="jewelry">Jewelry & Watches</option>
                    <option value="pets">Pets & Animals</option>
                    <option value="other">Other Belongings</option>
                  </select>
                </div>

                {/* Exact Location where found/lost */}
                <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between">
                    <label className={`text-xs font-extrabold flex items-center gap-1.5 ${newItemType === 'found' ? 'text-sky-300' : 'text-red-300'}`}>
                      <MapPin className="w-3.5 h-3.5" />
                      <span>
                        {newItemType === 'found'
                          ? (language === 'en' ? 'Location Where You Found The Item *' : 'জিনিসটি পাওয়ার স্থান / লোকেশন *')
                          : (language === 'en' ? 'Location Where You Lost The Item *' : 'জিনিসটি হারানোর স্থান / লোকেশন *')}
                      </span>
                    </label>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      {newItemType === 'found' ? '📍 Recovery Spot' : '📍 Incident Spot'}
                    </span>
                  </div>

                  <input
                    type="text"
                    required
                    placeholder={
                      newItemType === 'found'
                        ? (language === 'en' ? 'e.g. Beside Star Kabab, Dhanmondi Road 27, found on a pavement bench' : 'যেমন: ধানমন্ডি ২৭ রোড স্টার কাবাবের সামনে ফুটপাতের বেঞ্চে')
                        : (language === 'en' ? 'e.g. Inside a CNG between Mirpur 10 and Farmgate, or near Metro station' : 'যেমন: মিরপুর ১০ থেকে ফার্মগেটের সিএনজিতে, বা মেট্রো স্টেশনের কাছে')
                    }
                    value={newSpecificLocation}
                    onChange={(e) => setNewSpecificLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E081B] border border-white/15 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:border-sky-400 focus:outline-none transition"
                  />
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {newItemType === 'found'
                      ? 'Please write the exact spot, road, landmark, or shop where you found this item so the rightful owner can verify and claim it.'
                      : 'Please specify the exact road, landmark, or travel route where you suspect you lost the item.'}
                  </p>

                  <div className="pt-1.5">
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      Area / Neighborhood (এলাকা / থানা)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Dhanmondi, Mirpur, Uttara, Banani, Gulshan..."
                      value={newArea}
                      onChange={(e) => setNewArea(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#0E081B] border border-white/15 text-white placeholder:text-slate-500 text-xs focus:border-sky-400 focus:outline-none transition"
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
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white text-xs font-black shadow-md transition transform hover:scale-105 active:scale-95"
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

