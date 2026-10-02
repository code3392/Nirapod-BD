'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { 
  ShieldCheck, 
  HeartHandshake, 
  MapPin, 
  Eye, 
  CheckCircle2, 
  Building2, 
  Award,
  Globe2,
  Users2
} from 'lucide-react';

export default function AboutUsSection() {
  const { language } = useApp();

  const teamMembers = [
    {
      name: 'Samiul Haque',
      role: 'Platform Founder & Lead Civic Architect',
      email: 'smdsami59@gmail.com',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      badge: 'Super Admin',
    },
    {
      name: 'Rahim Ahmed',
      role: 'Community Guardian & Field Dispatch Lead',
      email: 'rahim.ahmed@nirapodbd.gov.bd',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      badge: 'Tier 3 Guardian',
    },
    {
      name: 'Farhana Yasmin',
      role: 'Civil Society Liaison & Environmental Safety',
      email: 'farhana.yasmin@dhanmondi.org',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
      badge: 'Ward Admin',
    },
    {
      name: 'Kazi Zubair Hossain',
      role: 'Red Crescent Volunteer Lead & Rapid Response',
      email: 'kazi.zubair@redcrescent.org.bd',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
      badge: 'First Aid Volunteer',
    },
  ];

  return (
    <section id="about-us" className="py-24 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background Subtle Tech Matrix & Glowing Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-safety/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emergency/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-safety uppercase tracking-wider backdrop-blur-md">
            <ShieldCheck className="w-4 h-4" />
            <span>About Nirapod BD</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {language === 'en' ? 'Building a Safer, Cleaner Bangladesh Together' : 'একটি নিরাপদ ও আধুনিক বাংলাদেশের প্রত্যয়ে'}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Nirapod BD is Bangladesh’s flagship community-powered safety and civic reporting ecosystem. We unite proactive citizens, local volunteers, and municipal authorities through computer vision AI and verifiable real-time action.'
              : 'নিরাপদ বিডি বাংলাদেশের একটি অগ্রগামী নাগরিক নিরাপত্তা ও সমস্যা সমাধান প্ল্যাটফর্ম। এটি সচেতন নাগরিক, স্বেচ্ছাসেবক এবং সিটি কর্পোরেশন ও সেবা সংস্থাসমূহকে এআই ও স্বচ্ছ প্রমাণের মাধ্যমে সংযুক্ত করে।'}
          </p>
        </div>

        {/* 3 Core Ethical Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-safety/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-safety/20 text-safety flex items-center justify-center font-bold">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Community-Powered</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every civic issue is backed by peer verification from neighbors living in the same ward, eliminating fake reporting and elevating critical priorities.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-safety/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">AI-Assisted Triage</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Automated computer vision detects pavement potholes, live electrical sparks, and toxic waste, generating objective hazard severity recommendations in seconds.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-safety/40 transition-all space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-white">Strict Accountability</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Under Rule 25, once authorities mark work complete, citizens verify resolution with before & after photographic evidence to guarantee genuine outcomes.
            </p>
          </div>
        </div>

        {/* Leadership & Civic Volunteers */}
        <div className="space-y-6 pt-6">
          <div className="text-center space-y-1">
            <h3 className="text-2xl font-black text-white">Leadership & Civic Volunteers</h3>
            <p className="text-xs text-slate-400">Authentic citizens and coordinators driving local change</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md text-center space-y-3 hover:border-white/20 transition group"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 border-safety group-hover:scale-105 transition-transform"
                />
                <div>
                  <h4 className="font-extrabold text-sm text-white">{member.name}</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">{member.role}</p>
                  <span className="inline-block mt-2 text-[10px] font-mono font-bold text-safety bg-safety/10 px-2 py-0.5 rounded-full border border-safety/20">
                    {member.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
