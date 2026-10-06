'use client';

import React from 'react';
import { PhoneCall, ShieldAlert, AlertTriangle, X, ExternalLink } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface EmergencyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  hazardType?: string;
}

export default function EmergencyAlertModal({
  isOpen,
  onClose,
  onContinue,
  hazardType = 'Critical Hazard',
}: EmergencyAlertModalProps) {
  const { language, t } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-emergency overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Top Emergency Red Banner */}
        <div className="bg-emergency p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
              <ShieldAlert className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest bg-black/30 px-2 py-0.5 rounded-full">
                {t.emergencyWarning.badge}
              </span>
              <h3 className="text-base font-extrabold text-white mt-0.5">
                {t.emergencyWarning.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-darktext font-medium leading-relaxed">
            {t.emergencyWarning.body}
          </p>

          {/* Hotline Call Card */}
          <div className="p-4 rounded-2xl bg-emergency-light border border-emergency/30 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emergency flex items-center justify-center text-white shadow-md">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-emergency uppercase tracking-wider">
                  Toll-Free National Hotline
                </span>
                <p className="text-2xl font-black text-navy leading-none">999</p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Police • Fire Service • Ambulance
                </p>
              </div>
            </div>

            <a
              href="tel:999"
              className="inline-flex items-center gap-2 bg-emergency hover:bg-emergency-hover text-white text-sm font-black px-4 py-3 rounded-xl shadow-lg transition transform hover:scale-105"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.emergencyWarning.call999}</span>
            </a>
          </div>

          {/* Important Regulatory Disclaimer */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-navy flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
              <span>{language === 'en' ? 'Important Regulatory Notice' : 'জরুরি সংবিধিবদ্ধ সতর্কবার্তা'}</span>
            </p>
            <p>{t.emergencyWarning.reminder}</p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="tel:999"
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-emergency text-white font-extrabold text-sm text-center shadow-md hover:bg-emergency-hover transition flex items-center justify-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.emergencyWarning.call999}</span>
            </a>
            <button
              onClick={onContinue}
              className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-darktext font-bold text-sm text-center transition border border-slate-300"
            >
              {t.emergencyWarning.continueReport}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
