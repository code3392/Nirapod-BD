'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function NavigationBackButton() {
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useApp();

  // Do not show back button on the landing homepage
  if (!pathname || pathname === '/') {
    return null;
  }

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="w-full relative z-30 bg-transparent pointer-events-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1 flex items-center">
        <button
          onClick={handleBack}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-950/60 hover:bg-purple-900/80 border border-purple-500/30 hover:border-purple-400/60 text-purple-200 hover:text-white text-xs font-bold transition-all duration-200 shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.35)] group cursor-pointer"
          aria-label={language === 'en' ? 'Go back to previous page' : 'পূর্ববর্তী পৃষ্ঠায় ফিরে যান'}
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 text-purple-300 group-hover:text-white" />
          <span>{language === 'en' ? 'Back' : 'পেছনে'}</span>
        </button>
      </div>
    </div>
  );
}
