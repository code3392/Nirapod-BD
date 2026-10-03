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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-xs font-bold text-civic-blue border border-blue-200 uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Area-Wise Community Hubs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
            {language === 'en' ? 'Civic Neighborhood Communities' : 'এলাকাভিত্তিক নাগরিক আলোচনা কেন্দ্র'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Connect with verified neighbors, volunteer coordinators, and discuss local public safety without commercial ads.
          </p>
        </div>

        {/* Direct Messages Quick Link */}
        <Link
          href="/messages"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-surface-border text-navy font-bold text-xs shadow-subtle hover:bg-slate-50 transition"
        >
          <MessageSquare className="w-4 h-4 text-civic-blue" />
          <span>Direct Messages</span>
        </Link>
      </div>

      {/* Strict Non-Commercial Policy Banner (Rule 19) */}
      <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs text-blue-950 flex items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-blue-700 shrink-0" />
          <div>
            <span className="font-extrabold text-blue-900 block">
              Public Safety Policy Notice:
            </span>
            <p className="text-blue-800">
              Community rooms are strictly for public safety, local hazard coordination, and civic help. Commercial promotions or ads are automatically flagged and prohibited.
            </p>
          </div>
        </div>
        <span className="text-[10px] font-black uppercase bg-blue-200/80 text-blue-900 px-2 py-1 rounded-md shrink-0">
          Non-Commercial
        </span>
      </div>

      {/* Main Hub Split Layout: Area Sidebar + Chat Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white rounded-3xl border border-surface-border shadow-card overflow-hidden min-h-[600px]">
        {/* Left Area Navigation */}
        <div className="lg:col-span-4 bg-slate-50/70 border-r border-slate-200 p-5 space-y-2">
          <span className="text-xs font-extrabold text-muted uppercase tracking-wider block px-2 mb-2">
            Select Your Neighborhood
          </span>

          <div className="space-y-1.5">
            {areas.map((area) => (
              <button
                key={area.id}
                onClick={() => setActiveArea(area.id)}
                className={`w-full p-3.5 rounded-2xl text-left transition-all flex items-center justify-between group ${
                  activeArea === area.id
                    ? 'bg-navy text-white shadow-md'
                    : 'hover:bg-white text-darktext border border-transparent hover:border-slate-200'
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
                    <p className={`text-[10px] ${activeArea === area.id ? 'text-slate-300' : 'text-muted'}`}>
                      {area.count} active guardians
                    </p>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full ${activeArea === area.id ? 'bg-civic-blue' : 'bg-slate-300'}`} />
              </button>
            ))}
          </div>

          {/* User Verification Info Badge */}
          <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-200 space-y-1.5 text-xs">
            <span className="text-[10px] uppercase font-bold text-muted">Your Identity</span>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-navy">{user?.name || 'Guest Citizen'}</span>
              <span className="text-[9px] bg-blue-50 text-civic-blue font-black px-1.5 py-0.5 rounded border border-blue-200">
                {user?.verificationBadge || 'Guest'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Posting in {user?.area || 'Dhaka'} Zone</p>
          </div>
        </div>

        {/* Right Chat Conversation Stage */}
        <div className="lg:col-span-8 flex flex-col justify-between h-[650px]">
          {/* Room Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-navy text-white flex items-center justify-center font-bold">
                {activeArea.slice(0, 2)}
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-navy">{activeArea} Civic Discussion</h3>
                <p className="text-[11px] text-slate-500">Live neighborhood safety & disaster watch room</p>
              </div>
            </div>

            <span className="text-xs font-mono font-bold text-civic-blue bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
              ● Active Hub
            </span>
          </div>

          {/* Status / Moderation Alert Notice */}
          {statusNotice && (
            <div className={`mx-4 mt-3 p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
              statusNotice.type === 'error' ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}>
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{statusNotice.message}</span>
            </div>
          )}

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {currentMessages.length === 0 ? (
              <div className="p-12 text-center text-xs text-muted">
                No messages yet in {activeArea} hub. Be the first neighbor to post a community notice.
              </div>
            ) : (
              currentMessages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3 group">
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    className="w-9 h-9 rounded-xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-navy">{msg.senderName}</span>
                        <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.2 rounded">
                          {msg.senderBadge}
                        </span>
                      </div>
                      <span className="text-[10px] text-muted">{msg.timestamp}</span>
                    </div>

                    <p className="text-xs text-slate-700 bg-slate-50 rounded-2xl p-3 border border-slate-100 leading-relaxed">
                      {msg.content}
                    </p>

                    {/* File Attachment Support (Rule 18) */}
                    {msg.fileAttachment && (
                      <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-200 inline-flex items-center gap-2 text-xs font-bold text-navy max-w-sm">
                        <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="truncate">{msg.fileAttachment.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">({msg.fileAttachment.size})</span>
                        <a href={msg.fileAttachment.url} download className="text-civic-blue hover:underline ml-1">
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
          <div className="p-4 border-t border-slate-200 bg-slate-50/50">
            {/* Attached file chip */}
            {selectedFile && (
              <div className="mb-2 p-2 rounded-xl bg-white border border-slate-200 inline-flex items-center gap-2 text-xs">
                <FileText className="w-4 h-4 text-civic-blue" />
                <span className="font-bold text-navy">{selectedFile.name}</span>
                <button onClick={() => setSelectedFile(null)} className="text-slate-400 hover:text-slate-600">
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
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-civic-blue focus:outline-none"
                />

                {/* File Attachment Quick Sample Buttons */}
                <div className="relative group">
                  <button
                    type="button"
                    onClick={() => handleAttachDummyFile('Traffic_Safety_Advisory.pdf', 'pdf')}
                    className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 transition"
                    title="Attach Safety File or Document"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-bold shadow-md transition flex items-center gap-1.5 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Post</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-muted font-medium px-1">
                <span>AI Anti-Profanity & Zero-Racism Filter Active</span>
                <span>Community Public Safety Only</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
