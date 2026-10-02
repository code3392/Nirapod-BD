'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import SafetyMap with ssr: false for Leaflet browser compatibility
const SafetyMap = dynamic(() => import('@/components/map/SafetyMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[calc(100vh-64px)] w-full bg-slate-900 flex items-center justify-center text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-4 border-safety border-t-transparent animate-spin" />
        <p className="text-xs font-bold text-slate-300">Loading Dhaka Interactive Safety Map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  return <SafetyMap />;
}
