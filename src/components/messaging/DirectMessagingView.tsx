'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  MessageSquare, 
  Send, 
  Paperclip, 
  ShieldCheck, 
  Search, 
  User, 
  FileText, 
  Download, 
  Check, 
  X,
  PhoneCall
} from 'lucide-react';

export default function DirectMessagingView() {
  const { user, allUsers, directMessages, sendDirectMessage, language, login } = useApp();
  
  // Available conversation partners (excluding self)
  const conversationPartners = allUsers.filter((u) => u.id !== user?.id);
  const [activePartner, setActivePartner] = useState(conversationPartners[0] || null);
  const [inputText, setInputText] = useState('');
  const [attachedFile, setAttachedFile] = useState<{ name: string; size: string; type: string; url: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 border border-blue-200 text-civic-blue mx-auto flex items-center justify-center shadow-subtle">
          <MessageSquare className="w-8 h-8" />
        </div>
        <div className="space-y-2 max-w-md mx-auto">
          <h2 className="text-2xl font-black text-navy">Direct Citizen Messaging</h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Sign in with your verified guardian account to securely communicate with neighbors and coordinate civic problem solving.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => login('smdsami59@gmail.com')}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-civic-blue hover:bg-blue-700 text-white font-bold text-xs shadow-md transition"
          >
            Sign In with Super Admin (smdsami59@gmail.com)
          </button>
        </div>
      </div>
    );
  }

  // Filter messages between current user and activePartner
  const conversationMessages = directMessages.filter((m) => {
    if (!activePartner) return false;
    return (
      (m.senderId === user.id && m.recipientId === activePartner.id) ||
      (m.senderId === activePartner.id && m.recipientId === user.id)
    );
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePartner || (!inputText.trim() && !attachedFile)) return;

    const res = sendDirectMessage(activePartner.id, activePartner.name, inputText, attachedFile || undefined);

    if (!res.success) {
      setErrorMessage(res.violationReason || 'Message flagged by safety system.');
      setTimeout(() => setErrorMessage(null), 4000);
      return;
    }

    setInputText('');
    setAttachedFile(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-xs font-bold text-civic-blue uppercase tracking-wider mb-2 border border-blue-100">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Encrypted Direct Messaging</span>
        </div>
        <h1 className="text-3xl font-black text-navy tracking-tight">
          {language === 'en' ? 'Direct Citizen Messages' : 'নাগরিক প্রত্যক্ষ বার্তালাপ'}
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Coordinate emergency relief, clarify report evidence, and communicate securely with nearby verified guardians.
        </p>
      </div>

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-surface-border shadow-card overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px]">
        {/* Contacts Sidebar */}
        <div className="md:col-span-4 bg-slate-50 border-r border-slate-200 p-4 space-y-2">
          <span className="text-xs font-extrabold text-muted uppercase tracking-wider block px-2 mb-2">
            Verified Contacts
          </span>

          <div className="space-y-1.5">
            {conversationPartners.map((partner) => {
              const isSelected = activePartner?.id === partner.id;
              return (
                <button
                  key={partner.id}
                  onClick={() => setActivePartner(partner)}
                  className={`w-full p-3 rounded-2xl text-left transition flex items-center gap-3 ${
                    isSelected
                      ? 'bg-navy text-white shadow-md'
                      : 'hover:bg-white text-darktext border border-transparent hover:border-slate-200'
                  }`}
                >
                  <img
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-10 h-10 rounded-xl object-cover border border-white/20"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black truncate">{partner.name}</h4>
                    </div>
                    <p className={`text-[10px] truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {partner.role} • {partner.area}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat Stage */}
        <div className="md:col-span-8 flex flex-col justify-between h-[620px]">
          {/* Active Partner Header */}
          {activePartner ? (
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activePartner.avatar}
                  alt={activePartner.name}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-sm text-navy">{activePartner.name}</h3>
                    <span className="text-[9px] bg-blue-50 text-civic-blue font-bold px-1.5 py-0.2 rounded border border-blue-100">
                      {activePartner.verificationBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {activePartner.livingPlace} • Phone: {activePartner.phone}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${activePartner.phone}`}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy transition"
                title="Call Contact"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="p-5 text-center text-xs text-muted">Select a contact to begin messaging</div>
          )}

          {/* Error / Moderation Notice */}
          {errorMessage && (
            <div className="mx-4 mt-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold">
              {errorMessage}
            </div>
          )}

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            {conversationMessages.length === 0 ? (
              <div className="p-12 text-center text-xs text-muted">
                No direct messages yet. Say hello or coordinate civic verification.
              </div>
            ) : (
              conversationMessages.map((msg) => {
                const isMe = msg.senderId === user.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[75%] rounded-2xl p-3.5 text-xs leading-relaxed space-y-1.5 ${
                        isMe
                          ? 'bg-navy text-white rounded-tr-sm shadow-sm'
                          : 'bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200'
                      }`}
                    >
                      <p>{msg.content}</p>

                      {msg.fileAttachment && (
                        <div className={`p-2 rounded-xl border flex items-center gap-2 text-xs font-bold ${
                          isMe ? 'bg-white/10 border-white/20 text-white' : 'bg-white border-slate-200 text-navy'
                        }`}>
                          <FileText className="w-4 h-4 text-sky-400" />
                          <span className="truncate">{msg.fileAttachment.name}</span>
                          <span className="text-[10px] opacity-70">({msg.fileAttachment.size})</span>
                        </div>
                      )}

                      <span className={`text-[9px] block text-right ${isMe ? 'text-slate-300' : 'text-slate-500'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50/60">
            {attachedFile && (
              <div className="mb-2 p-2 rounded-xl bg-white border border-slate-200 inline-flex items-center gap-2 text-xs">
                <FileText className="w-4 h-4 text-civic-blue" />
                <span className="font-bold text-navy">{attachedFile.name}</span>
                <button onClick={() => setAttachedFile(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={activePartner ? `Message ${activePartner.name}...` : 'Type a message...'}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={!activePartner}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white focus:ring-2 focus:ring-civic-blue focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setAttachedFile({ name: 'Verification_Document.pdf', size: '1.2 MB', type: 'pdf', url: '#' })}
                className="p-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 transition"
                title="Attach Document or Image"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={!activePartner || (!inputText.trim() && !attachedFile)}
                className="px-5 py-2.5 rounded-xl bg-civic-blue hover:bg-blue-700 text-white text-xs font-bold shadow-md transition disabled:opacity-40"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
