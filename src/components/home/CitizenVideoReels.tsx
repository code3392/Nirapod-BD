'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Video, 
  CheckCircle2, 
  MapPin, 
  Clock, 
  Eye, 
  ThumbsUp, 
  Share2, 
  AlertTriangle,
  ChevronRight,
  ShieldCheck,
  X,
  Volume2,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import Link from 'next/link';

interface IncidentReel {
  id: string;
  titleEn: string;
  titleBn: string;
  category: 'roads' | 'water' | 'electrical' | 'waste';
  categoryLabelEn: string;
  categoryLabelBn: string;
  area: string;
  specificLocation: string;
  duration: string;
  timestamp: string;
  views: number;
  confirmations: number;
  videoPoster: string;
  videoUrl: string;
  descriptionEn: string;
  descriptionBn: string;
  isVerified: boolean;
  reporterName: string;
}

export default function CitizenVideoReels() {
  const { language } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedReel, setSelectedReel] = useState<IncidentReel | null>(null);
  const [confirmedReels, setConfirmedReels] = useState<Record<string, boolean>>({});

  const reels: IncidentReel[] = [
    {
      id: 'reel-1',
      titleEn: 'Severe Rainwater Inundation on Mirpur-10 Main Road',
      titleBn: 'মিরপুর-১০ গোলচত্বরে বৃষ্টিতে হাঁটু সমান জলাবদ্ধতা',
      category: 'water',
      categoryLabelEn: '💧 Waterlogging',
      categoryLabelBn: '💧 জলাবদ্ধতা',
      area: 'Mirpur',
      specificLocation: 'Mirpur 10 Metro Station Exit A',
      duration: '0:42',
      timestamp: '25m ago',
      views: 1420,
      confirmations: 64,
      videoPoster: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Driving_under_rain_-_Doha%2C_Qatar.webm',
      descriptionEn: 'Live citizen video showing stagnant rainwater blocking the north bus bay and passenger metro stairs. Rickshaws struggling to cross.',
      descriptionBn: 'মিরপুর ১০ মেট্রো স্টেশনের উত্তর বাস বে-তে হাঁটু সমান পানি। ড্রেনেজ ব্লক থাকায় যানবাহন চলাচলে তীব্র বিঘ্ন।',
      isVerified: true,
      reporterName: 'Citizen Guardian',
    },
    {
      id: 'reel-2',
      titleEn: 'Snapped 11kV Overhead Wire Sparking on Walkway',
      titleBn: 'উত্তরা ৭ নম্বর সেক্টরে ছিঁড়ে পড়া বিদ্যুতের তারে ফুলকি',
      category: 'electrical',
      categoryLabelEn: '⚡ Electrical Hazard',
      categoryLabelBn: '⚡ বিদ্যুৎ বিপর্যয়',
      area: 'Uttara',
      specificLocation: 'Sector 7, Road 12 Walkway',
      duration: '0:28',
      timestamp: '45m ago',
      views: 2890,
      confirmations: 92,
      videoPoster: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      videoUrl: '/videos/hero-traffic.webm',
      descriptionEn: 'Pedestrians alarmed as storm wind severed high voltage line. DESCO emergency line notified, police barrier requested.',
      descriptionBn: 'ঝড়ে ছিঁড়ে ফুটপাতে ঝুলছে উচ্চক্ষমতার তার। পথচারীদের ওই রাস্তা এড়িয়ে চলার অনুরোধ।',
      isVerified: true,
      reporterName: 'Community Sentinel',
    },
    {
      id: 'reel-3',
      titleEn: 'Dangerous Road Cave-in Near Farmgate Footbridge',
      titleBn: 'ফার্মগেট ফুটওভার ব্রিজের নিচে বিপজ্জনক গর্ত ও ধস',
      category: 'roads',
      categoryLabelEn: '🚗 Road Hazard',
      categoryLabelBn: '🚗 সড়ক ঝুঁকি',
      area: 'Farmgate',
      specificLocation: 'Near Tejgaon Govt High School',
      duration: '0:35',
      timestamp: '1h ago',
      views: 1840,
      confirmations: 43,
      videoPoster: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Cars_Passing_by_at_Night.webm',
      descriptionEn: 'Underground conduit rupture caused sudden sinkhole in the middle lane. Temporary warning red cloth placed by volunteers.',
      descriptionBn: 'মাঝের লেনে হঠাৎ মাটি ধসে বড় গর্ত তৈরি হয়েছে। রিকশা ও বাইক চালকদের সাবধানে চলার আহ্বান।',
      isVerified: true,
      reporterName: 'Local Commuter',
    },
    {
      id: 'reel-4',
      titleEn: 'Solid Waste Overflow Blocking Storm Sewer',
      titleBn: 'মোহাম্মদপুর টাউন হল সংলগ্ন ড্রেনে পলিথিনের স্তূপ',
      category: 'waste',
      categoryLabelEn: '🗑️ Waste & Drainage',
      categoryLabelBn: '🗑️ বর্জ্য ও ড্রেন',
      area: 'Mohammadpur',
      specificLocation: 'Town Hall Market Outer Lane',
      duration: '0:39',
      timestamp: '2h ago',
      views: 980,
      confirmations: 31,
      videoPoster: 'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Driving_under_rain_-_Doha%2C_Qatar.webm',
      descriptionEn: 'Plastic sack blockages preventing rainwater discharge. Community waste committee cleaning in progress.',
      descriptionBn: 'ড্রেনের মুখে ভারী পলিথিনের বাধা। স্বেচ্ছাসেবকরা প্রাথমিক পরিষ্কারের কাজ শুরু করেছেন।',
      isVerified: true,
      reporterName: 'Civic Monitor',
    },
  ];

  const filteredReels = activeCategory === 'all' 
    ? reels 
    : reels.filter(r => r.category === activeCategory);

  const handleConfirm = (reelId: string) => {
    setConfirmedReels(prev => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  return (
    <section className="py-20 bg-white border-t border-blue-100 relative overflow-hidden">
      {/* Background Soft Blue Ambient Glaze */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-sky-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header (Citizen.com style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-civic-blue">
              <Video className="w-3.5 h-3.5 text-civic-blue" />
              <span>{language === 'en' ? 'Citizen Verified Video Incident Reels' : 'নাগরিক যাচাইকৃত ভিডিও রিল'}</span>
              <span className="w-2 h-2 rounded-full bg-emergency animate-ping" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-navy tracking-tight leading-tight">
              {language === 'en' 
                ? 'Real-Time Civic Video Footage from Across Dhaka'
                : 'ঢাকার বিভিন্ন এলাকা থেকে সরাসরি নাগরিক ভিডিও প্রমাণ'}
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              {language === 'en'
                ? 'Watch authenticated video evidence uploaded directly by community guardians. Verify incidents before traveling or dispatching help.'
                : 'নাগরিকদের দ্বারা সরাসরি ধারণকৃত ভিডিও প্রমাণ দেখুন। রাস্তায় বের হওয়ার আগে বা স্বেচ্ছাসেবক পাঠানোর পূর্বে ভিডিও যাচাই করুন।'}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
            {[
              { id: 'all', labelEn: 'All Reels', labelBn: 'সকল ভিডিও' },
              { id: 'roads', labelEn: '🚗 Roads', labelBn: '🚗 সড়ক' },
              { id: 'water', labelEn: '💧 Water', labelBn: '💧 পানি' },
              { id: 'electrical', labelEn: '⚡ Power', labelBn: '⚡ বিদ্যুৎ' },
              { id: 'waste', labelEn: '🗑️ Waste', labelBn: '🗑️ বর্জ্য' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-civic-blue text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {language === 'en' ? tab.labelEn : tab.labelBn}
              </button>
            ))}
          </div>
        </div>

        {/* Video Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReels.map((reel) => {
            const isConfirmed = confirmedReels[reel.id];
            return (
              <div
                key={reel.id}
                className="group bg-white rounded-3xl border border-slate-200 hover:border-civic-blue/60 shadow-subtle hover:shadow-card transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col overflow-hidden"
              >
                {/* Video Card Thumbnail */}
                <div 
                  onClick={() => setSelectedReel(reel)}
                  className="relative h-56 bg-slate-900 cursor-pointer overflow-hidden group/thumb"
                >
                  <img
                    src={reel.videoPoster}
                    alt={reel.titleEn}
                    className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-700 opacity-90 group-hover/thumb:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emergency animate-pulse" />
                      LIVE REEL
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-slate-200">
                      {reel.duration}
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md text-civic-blue shadow-xl flex items-center justify-center group-hover/thumb:scale-115 group-hover/thumb:bg-civic-blue group-hover/thumb:text-white transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Meta on Thumbnail */}
                  <div className="absolute bottom-3 left-3 right-3 pointer-events-none">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-white mb-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                      <span className="truncate">{reel.area} • {reel.specificLocation}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-300">
                      <span>{reel.timestamp}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {reel.views.toLocaleString()} views
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-civic-blue uppercase tracking-wide">
                        {language === 'en' ? reel.categoryLabelEn : reel.categoryLabelBn}
                      </span>
                      {reel.isVerified && (
                        <span className="text-[10px] font-bold text-civic-blue flex items-center gap-1 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3 text-civic-blue" />
                          Verified
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-extrabold text-navy line-clamp-2 leading-snug group-hover:text-civic-blue transition-colors">
                      {language === 'en' ? reel.titleEn : reel.titleBn}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {language === 'en' ? reel.descriptionEn : reel.descriptionBn}
                    </p>
                  </div>

                  {/* Actions & Confirm Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => handleConfirm(reel.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isConfirmed
                          ? 'bg-blue-50 text-civic-blue border border-blue-200 shadow-2xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${isConfirmed ? 'fill-civic-blue text-civic-blue' : ''}`} />
                      <span>{reel.confirmations + (isConfirmed ? 1 : 0)}</span>
                    </button>

                    <button
                      onClick={() => setSelectedReel(reel)}
                      className="text-xs font-bold text-civic-blue hover:text-civic-royal inline-flex items-center gap-1 group/btn"
                    >
                      <span>{language === 'en' ? 'Watch Full Reel' : 'ভিডিও দেখুন'}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Video Modal Player (Real Playable Video Player) */}
        {selectedReel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#06121E]/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-blue-100 space-y-0 animate-in zoom-in-95 duration-200">
              
              {/* Modal Video Header */}
              <div className="p-4 bg-navy text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emergency animate-ping" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-200">
                    {selectedReel.area} Live Incident Reel • {selectedReel.timestamp}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedReel(null)}
                  className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Working HTML5 Video Player Container */}
              <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                <video
                  key={selectedReel.videoUrl}
                  src={selectedReel.videoUrl}
                  poster={selectedReel.videoPoster}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={selectedReel.videoUrl} type="video/webm" />
                  <source src="/videos/hero-traffic.webm" type="video/webm" />
                  Your browser does not support the video tag.
                </video>

                {/* Camera HUD Overlays */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-white font-mono flex items-center gap-1.5 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-emergency animate-pulse" />
                  <span>REC 1080p 60FPS</span>
                </div>

                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl text-xs text-white font-mono flex items-center gap-2 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>GPS Coordinate Verified • {selectedReel.area}, Dhaka</span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-civic-blue border border-blue-200">
                      {selectedReel.categoryLabelEn}
                    </span>
                    <span className="text-xs text-slate-400">
                      Uploaded by {selectedReel.reporterName}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-navy leading-snug">
                    {language === 'en' ? selectedReel.titleEn : selectedReel.titleBn}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {language === 'en' ? selectedReel.descriptionEn : selectedReel.descriptionBn}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-civic-blue shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-navy">{selectedReel.specificLocation}</p>
                      <p className="text-[11px] text-slate-500">{selectedReel.area}, Dhaka, Bangladesh</p>
                    </div>
                  </div>
                  <Link
                    href="/map"
                    onClick={() => setSelectedReel(null)}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-blue-200 text-civic-blue text-xs font-bold hover:bg-blue-50 transition shadow-2xs"
                  >
                    View on Map
                  </Link>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => handleConfirm(selectedReel.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                      confirmedReels[selectedReel.id]
                        ? 'bg-civic-blue text-white shadow-md shadow-blue-500/20'
                        : 'bg-navy hover:bg-navy-light text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{confirmedReels[selectedReel.id] ? 'Confirmed by You' : 'I Can Confirm This Report'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: selectedReel.titleEn,
                          text: selectedReel.descriptionEn,
                          url: window.location.href,
                        }).catch(() => {});
                      }
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share Reel</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
