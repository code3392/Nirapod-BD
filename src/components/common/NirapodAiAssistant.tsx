'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  ShieldAlert, 
  ChevronRight, 
  ExternalLink,
  PhoneCall,
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickLinks?: { label: string; url: string }[];
}

export default function NirapodAiAssistant() {
  const { language, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: language === 'en'
        ? "Hello! I am Nirapod AI, your 24/7 civic safety assistant. How can I help you today? You can ask me how to report problems, emergency contacts, community rules, or lost & found."
        : "আসসালামু আলাইকুম! আমি নিরাপদ এআই সহকারী। নাগরিক সমস্যা রিপোর্ট, জরুরি নম্বর, কমিউনিটি নিয়ম বা হারানো বিজ্ঞপ্তি সম্পর্কে যেকোনো প্রশ্ন আমাকে করতে পারেন।",
      timestamp: 'Just now',
      quickLinks: [
        { label: 'Report Problem', url: '/report/new' },
        { label: 'Safety Map', url: '/map' },
        { label: 'Lost & Found', url: '/lost-and-found' },
        { label: 'Community Hub', url: '/community' },
      ],
    },
  ]);

  const quickQuestions = [
    language === 'en' ? 'How do I report a problem with photo/video?' : 'ছবি বা ভিডিও দিয়ে কীভাবে রিপোর্ট করব?',
    language === 'en' ? 'What are Dhaka emergency hotline numbers?' : 'ঢাকার জরুরি পুলিশ ও অ্যাম্বুলেন্স নম্বর কী?',
    language === 'en' ? 'What happens if someone posts a fake report?' : 'ভুয়া রিপোর্ট দিলে কী শাস্তি হবে?',
    language === 'en' ? 'How does the Lost & Found section work?' : 'হারানো ও প্রাপ্তি বিভাগ কীভাবে কাজ করে?',
    language === 'en' ? 'Why am I asked for proof of completed work?' : 'কাজের সমাপ্তির প্রমাণ কেন চাওয়া হয়?',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsThinking(true);

    setTimeout(() => {
      const response = generateAiAnswer(text, language);
      setMessages((prev) => [...prev, response]);
      setIsThinking(false);
    }, 700);
  };

  const generateAiAnswer = (query: string, lang: 'en' | 'bn'): ChatMessage => {
    const q = query.toLowerCase();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (q.includes('report') || q.includes('video') || q.includes('photo') || q.includes('ছবি') || q.includes('রিপোর্ট')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: lang === 'en'
          ? "To submit a report, go to the 'Report a Problem' page. You can upload either a photo or video evidence, choose your category (Road, Waste, Waterlogging, Electrical, etc.), and use the 'Auto Locate' button to detect your exact GPS coordinates with neighborhood privacy protection. Our Computer Vision AI will automatically analyze the hazard severity!"
          : "রিপোর্ট করতে 'সমস্যা রিপোর্ট করুন' পেজে যান। আপনি ছবি বা ভিডিও প্রমাণ হিসেবে আপলোড করতে পারেন। ক্যাটেগরি নির্বাচন করে 'Auto Locate' চাপলে জিপিএস স্বয়ংক্রিয়ভাবে এলাকা শনাক্ত করবে। এআই তাৎক্ষণিক তীব্রতা বিশ্লেষণ করবে!",
        timestamp: time,
        quickLinks: [{ label: 'Go to Report Form', url: '/report/new' }],
      };
    }

    if (q.includes('emergency') || q.includes('police') || q.includes('ambulance') || q.includes('পুলিশ') || q.includes('অ্যাম্বুলেন্স') || q.includes('জরুরি') || q.includes('999')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: lang === 'en'
          ? "For immediate life-threatening emergencies, dial 999 directly. Nirapod BD automatically detects your nearest DMP Police Station (e.g. Mirpur Model Thana 01320-041444, Dhanmondi Thana 01320-042222, Uttara West 01320-041888) and nearest Ambulance (National Health Helpline 16263, DMCH 02-55165088)."
          : "যেকোনো তাৎক্ষণিক বিপদে সরাসরি ৯৯৯ নম্বরে কল করুন। আমাদের প্ল্যাটফর্মে যেকোনো রিপোর্ট করার সাথে সাথে নিকটবর্তী থানার ডিউটি অফিসার এবং সরকারি অ্যাম্বুলেন্সের হটলাইন নম্বর স্ক্রিনে ভেসে ওঠে।",
        timestamp: time,
        quickLinks: [{ label: 'Emergency Safety Map', url: '/map' }],
      };
    }

    if (q.includes('fake') || q.includes('strike') || q.includes('suspend') || q.includes('ভুয়া') || q.includes('শাস্তি') || q.includes('স্থগিত')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: lang === 'en'
          ? "Nirapod BD enforces strict civic honesty rules: 1) Fake Reports: 3 verified strikes result in a 3-day account suspension. 2) Profanity/Bad words: Prohibited language used >3 times results in a 5-day suspension. 3) Racism/Hate Speech: Zero-tolerance, 3 strikes results in a 5-day suspension with email notice."
          : "নিরাপদ বিডিতে কঠোর নীতিমালা রয়েছে: ১) ভুয়া রিপোর্ট: ৩ বার সতর্কবার্তার পর ৩ দিনের জন্য অ্যাকাউন্ট সাময়িক স্থগিত হয়। ২) গালিগালাজ: এআই দ্বারা শনাক্ত হলে ৩ বারের পর ৫ দিন স্থগিত। ৩) জাতিগত বিদ্বেষ বা বর্ণবাদ: সম্পূর্ণ নিষিদ্ধ এবং ৩ বারের পর ৫ দিনের জন্য স্থগিত করা হয়।",
        timestamp: time,
      };
    }

    if (q.includes('lost') || q.includes('found') || q.includes('হারানো') || q.includes('প্রাপ্তি') || q.includes('খুঁজে')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: lang === 'en'
          ? "Our Lost & Found section allows citizens to post items lost or recovered in Dhaka neighborhoods. You can search by item name (e.g., 'National ID', 'Wallet', 'Keys', 'Pet dog') and filter by area to safely connect with finders or owners."
          : "আমাদের 'হারানো ও প্রাপ্তি' সেকশনে হারিয়ে যাওয়া বা কুড়িয়ে পাওয়া যেকোনো জিনিস (যেমন: এনআইডি কার্ড, ওয়ালেট, চাবি, পোষা প্রাণী) ছবিসহ পোস্ট করতে পারেন এবং সরাসরি নাম লিখে সার্চ করে খুঁজে নিতে পারেন।",
        timestamp: time,
        quickLinks: [{ label: 'Open Lost & Found', url: '/lost-and-found' }],
      };
    }

    if (q.includes('proof') || q.includes('work') || q.includes('প্রমাণ') || q.includes('কাজ')) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: lang === 'en'
          ? "Rule 25 Policy: Once an agency or organization resolves a reported civic issue, the citizen must upload photo or video proof of the completed work before they can submit another request. This ensures all repairs are genuine and verified by citizens."
          : "২৫ নম্বর নিয়ম: কোনো সংস্থা কাজ সম্পন্ন করার পর নাগরিককে সমাপ্ত কাজের ছবি বা ভিডিও আপলোড করে নিশ্চিত করতে হয়। এটি সম্পন্ন না করা পর্যন্ত পরবর্তী নতুন রিপোর্ট করার সুযোগ সাময়িক বন্ধ থাকে যাতে স্বচ্ছতা বজায় থাকে।",
        timestamp: time,
      };
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: lang === 'en'
        ? "Thank you for asking! Nirapod BD is Bangladesh's civic safety platform empowering citizens to report local hazards, verify information with community members, and hold authorities accountable with before/after evidence."
        : "ধন্যবাদ! নিরাপদ বিডি বাংলাদেশের একটি আধুনিক নাগরিক নিরাপত্তা প্ল্যাটফর্ম যা নাগরিকদের সমস্যা চিহ্নিতকরণ, সত্যতা যাচাই ও কর্তৃপক্ষের জবাবদিহিতা নিশ্চিত করতে কাজ করে।",
      timestamp: time,
      quickLinks: [
        { label: 'Explore Safety Map', url: '/map' },
        { label: 'Community Hub', url: '/community' },
      ],
    };
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-navy via-navy-light to-civic-blue text-white font-extrabold text-xs shadow-glow hover:scale-105 active:scale-95 transition-all border border-civic-blue/40 group"
          title="Ask Nirapod AI Assistant"
        >
          <div className="relative">
            <span className="absolute -inset-1 rounded-full bg-civic-blue/50 animate-ping" />
            <div className="w-7 h-7 rounded-full bg-civic-blue flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="text-left hidden sm:block">
            <p className="font-black text-xs leading-none">Nirapod AI</p>
            <p className="text-[10px] text-slate-300 font-medium leading-none mt-0.5">24/7 Safety Assistant</p>
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[95vw] sm:w-[420px] h-[580px] max-h-[90vh] bg-navy-dark/95 backdrop-blur-2xl rounded-3xl border border-white/15 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-navy to-navy-light border-b border-white/10 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-civic-blue/20 text-blue-300 flex items-center justify-center border border-civic-blue/30 shadow-inner">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white">Nirapod AI</h3>
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-blue-300 font-bold">Online</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  {language === 'en' ? 'Community Safety Assistant' : 'নাগরিক সেবা এআই'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick FAQ Chips */}
          <div className="p-2.5 bg-navy border-b border-white/5 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-[11px] font-semibold text-slate-300 bg-white/5 hover:bg-white/15 hover:text-white px-2.5 py-1 rounded-full whitespace-nowrap transition border border-white/10 shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-xl bg-civic-blue/20 text-blue-300 border border-civic-blue/30 flex items-center justify-center shrink-0 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-civic-blue text-white font-medium rounded-tr-sm'
                      : 'bg-white/10 text-slate-200 border border-white/10 rounded-tl-sm'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Quick Action Links */}
                  {msg.quickLinks && msg.quickLinks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-white/10">
                      {msg.quickLinks.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-300 bg-black/30 hover:bg-black/50 px-2 py-0.5 rounded-lg border border-civic-blue/30 transition"
                        >
                          <span>{link.label}</span>
                          <ChevronRight className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}

                  <span className="text-[9px] text-slate-400 block mt-1 text-right">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-2.5 items-center text-xs text-slate-400">
                <div className="w-7 h-7 rounded-xl bg-civic-blue/20 text-blue-300 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span>Nirapod AI is generating answer...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-navy border-t border-white/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={language === 'en' ? 'Ask a question about Nirapod BD...' : 'নিরাপদ বিডি সম্পর্কে প্রশ্ন লিখুন...'}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-white/10 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-civic-blue"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isThinking}
                className="p-2 rounded-xl bg-civic-blue hover:bg-civic-royal text-white disabled:opacity-40 transition shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
