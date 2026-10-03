'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  Users, 
  MapPin, 
  Send, 
  Paperclip, 
  ShieldAlert, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Ban, 
  Search,
  Sparkles,
  Lock,
  Download,
  X
} from 'lucide-react';

export default function CommunityHub() {
  const { 
    language, 
    user, 
    communityMessages, 
    sendCommunityMessage,
    allUsers 
  } = useApp();

  const [activeArea, setActiveArea] = useState<string>('Mirpur');
  const [inputText, setInputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; type: string; url: string } | null>(null);
  const [statusNotice, setStatusNotice] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  const areas = [
    { id: 'Mirpur', name: 'Mirpur Ward Community', count: 842, icon: '🏙️' },
    { id: 'Dhanmondi', name: 'Dhanmondi Lake Community', count: 620, icon: '🌳' },
    { id: 'Uttara', name: 'Uttara Sector Community', count: 715, icon: '✈️' },
    { id: 'Gulshan', name: 'Gulshan / Banani Community', count: 530, icon: '🛡️' },
    { id: 'Mohammadpur', name: 'Mohammadpur Community', count: 480, icon: '🏘️' },
    { id: 'Motijheel', name: 'Motijheel Commercial Ward', count: 390, icon: '🏢' },
    { id: 'Old Dhaka', name: 'Old Dhaka Heritage Ward', count: 410, icon: '🏛️' },
  ];

  const currentMessages = communityMessages.filter(
    (m) => m.area.toLowerCase() === activeArea.toLowerCase()
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedFile) return;

    const res = sendCommunityMessage(activeArea, inputText, selectedFile || undefined);

    if (!res.success) {
      setStatusNotice({ type: 'error', message: res.violationReason || 'Message flagged by AI Moderation.' });
      setTimeout(() => setStatusNotice(null), 5000);
      return;
    }

    setInputText('');
    setSelectedFile(null);
    setStatusNotice({ type: 'success', message: 'Message broadcasted to your area hub.' });
    setTimeout(() => setStatusNotice(null), 2500);
  };

  const handleAttachDummyFile = (fileName: string, type: string) => {
    setSelectedFile({
      name: fileName,
      size: '1.4 MB',
      type,
      url: '#',
    });
  };

  return (
    <div className="min-h-screen bg-[#060D1A] text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/15 text-xs font-mono font-bold text-sky-300 border border-sky-400/30 uppercase tracking-wider">
              <Users className="w-3.5 h-3.5 text-sky-400" />
              <span>Area-Wise Community Hubs</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'en' ? 'Civic Neighborhood Communities' : 'এলাকাভিত্তিক নাগরিক আলোচনা কেন্দ্র'}
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Connect with verified neighbors, volunteer coordinators, and discuss local public safety without commercial ads.
            </p>
          </div>

          {/* Direct Messages Quick Link */}
          <Link
            href="/messages"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition shadow-glass"
          >
            <MessageSquare className="w-4 h-4 text-sky-400" />
            <span>Direct Messages</span>
          </Link>
        </div>

        {/* Strict Non-Commercial Policy Banner (Rule 19) */}
        <div className="p-4 sm:p-5 rounded-3xl bg-sky-500/10 border border-sky-400/25 text-xs text-sky-200 flex items-center justify-between gap-4 shadow-glass">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-sky-400 shrink-0" />
            <div>
              <span className="font-extrabold text-white block">
                Public Safety Policy Notice:
              </span>
              <p className="text-slate-300">
                Community rooms are strictly for public safety, local hazard coordination, and civic help. Commercial promotions or ads are automatically flagged and prohibited.
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-black uppercase bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full border border-sky-400/30 shrink-0">
            Rule 19 • Non-Commercial
          </span>
        </div>

        {/* Main Hub Split Layout: Area Sidebar + Chat Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#0A182B]/85 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden min-h-[600px]">
          
          {/* Left Area Navigation */}
          <div className="lg:col-span-4 bg-white/[0.02] border-r border-white/10 p-5 space-y-2">
            <span className="text-xs font-mono font-extrabold text-slate-400 uppercase tracking-wider block px-2 mb-2">
              Select Your Neighborhood
            </span>

            <div className="space-y-1.5">
              {areas.map((area) => (
                <button
                  key={area.id}
                  onClick={() => setActiveArea(area.id)}
                  className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center justify-between group ${
                    activeArea === area.id
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg'
                      : 'hover:bg-white/5 text-slate-300 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {area.icon}
                    </span>
                    <div>
                      <h4 className="text-xs font-extrabold leading-tight">
                        {area.name}
                      </h4>
                      <p className={`text-[10px] font-mono ${activeArea === area.id ? 'text-sky-100' : 'text-slate-400'}`}>
                        {area.count} active guardians
                      </p>
                    </div>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${activeArea === area.id ? 'bg-white' : 'bg-white/20'}`} />
                </button>
              ))}
            </div>

            {/* User Identity Box */}
            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">Your Identity</span>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white">{user?.name || 'Guest Citizen'}</span>
                <span className="text-[9px] font-mono bg-sky-500/20 text-sky-300 font-black px-2 py-0.5 rounded-full border border-sky-400/30">
                  {user?.verificationBadge || 'Guest'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Posting in {user?.area || 'Dhaka'} Zone</p>
            </div>
          </div>

          {/* Right Chat Conversation Stage */}
          <div className="lg:col-span-8 flex flex-col justify-between h-[650px] bg-[#071320]/60">
            {/* Room Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center font-bold text-xs">
                  {activeArea.slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white">{activeArea} Civic Discussion</h3>
                  <p className="text-[11px] text-slate-400">Live neighborhood safety & disaster watch room</p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-sky-300 bg-sky-500/15 border border-sky-400/30 px-3 py-1 rounded-full">
                ● Live Hub
              </span>
            </div>

            {/* Status / Moderation Alert Notice */}
            {statusNotice && (
              <div className={`mx-4 mt-3 p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                statusNotice.type === 'error' ? 'bg-red-500/20 text-red-200 border border-red-500/40' : 'bg-sky-500/20 text-sky-200 border border-sky-400/40'
              }`}>
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{statusNotice.message}</span>
              </div>
            )}

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar">
              {currentMessages.length === 0 ? (
                <div className="p-12 text-center text-xs text-slate-400">
                  No messages yet in {activeArea} hub. Be the first neighbor to post a community notice.
                </div>
              ) : (
                currentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3 group">
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-9 h-9 rounded-xl object-cover shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-white">{msg.senderName}</span>
                          <span className="text-[9px] font-mono bg-white/10 text-sky-300 font-bold px-2 py-0.5 rounded-full border border-white/10">
                            {msg.senderBadge}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{msg.timestamp}</span>
                      </div>

                      <p className="text-xs text-slate-200 bg-white/5 rounded-2xl p-3.5 border border-white/10 leading-relaxed">
                        {msg.content}
                      </p>

                      {/* File Attachment Support (Rule 18) */}
                      {msg.fileAttachment && (
                        <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-400/25 inline-flex items-center gap-2 text-xs font-bold text-white max-w-sm">
                          <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                          <span className="truncate">{msg.fileAttachment.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">({msg.fileAttachment.size})</span>
                          <a href={msg.fileAttachment.url} download className="text-sky-400 hover:underline ml-1">
                            <Download className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input Box with File Attachment & AI Moderation (Rules 16, 17, 18, 19) */}
            <div className="p-4 border-t border-white/10 bg-white/[0.02]">
              {/* Attached file chip */}
              {selectedFile && (
                <div className="mb-2 p-2 rounded-xl bg-white/10 border border-white/15 inline-flex items-center gap-2 text-xs">
                  <FileText className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-white">{selectedFile.name}</span>
                  <button onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-white">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Write a public safety update to ${activeArea} community...`}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 text-xs sm:text-sm bg-white/5 text-white placeholder:text-slate-500 focus:border-sky-400 focus:bg-white/10 focus:outline-none transition"
                  />

                  {/* File Attachment Quick Sample Buttons */}
                  <button
                    type="button"
                    onClick={() => handleAttachDummyFile('Traffic_Safety_Advisory.pdf', 'pdf')}
                    className="p-2.5 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition"
                    title="Attach Safety File or Document"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-[#071320] text-xs font-black shadow-md transition flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Post</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                  <span>AI Anti-Profanity & Zero-Racism Filter Active</span>
                  <span>Community Public Safety Only</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
