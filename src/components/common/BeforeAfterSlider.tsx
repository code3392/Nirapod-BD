'use client';

import React, { useState, useRef } from 'react';
import { CheckCircle2, MoveHorizontal } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  communityConfirmed?: boolean;
  confirmedCount?: number;
  heightClass?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  communityConfirmed = true,
  confirmedCount = 24,
  heightClass = 'h-80 sm:h-96',
}: BeforeAfterSliderProps) {
  const { language, t } = useApp();
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const defaultBefore = beforeLabel || (language === 'en' ? 'BEFORE (HAZARD)' : 'পূর্বে (সমস্যা)');
  const defaultAfter = afterLabel || (language === 'en' ? 'AFTER (RESOLVED)' : 'পরে (সমাধান)');

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-surface-border bg-slate-900 select-none">
      {/* Container */}
      <div
        ref={containerRef}
        className={`relative w-full ${heightClass} overflow-hidden cursor-ew-resize`}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER IMAGE (Background) */}
        <img
          src={afterImage}
          alt="Resolution after repair"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* BEFORE IMAGE (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt="Original hazard before repair"
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: '100%',
            }}
          />
        </div>

        {/* SLIDER DIVIDER LINE */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Circular Drag Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-navy flex items-center justify-center shadow-lg border-2 border-civic-blue pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
            <MoveHorizontal className="w-5 h-5 text-navy" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emergency/90 text-white backdrop-blur-md shadow-md border border-white/20">
            {defaultBefore}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-civic-blue/90 text-white backdrop-blur-md shadow-md border border-white/20">
            {defaultAfter}
          </span>
        </div>

        {/* Drag Instruction Cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <div className="px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-white/90 border border-white/10 flex items-center gap-1.5">
            <MoveHorizontal className="w-3.5 h-3.5 text-slate-300" />
            <span>{language === 'en' ? 'Drag slider left/right to compare' : 'তুলনা করতে স্লাইডার ডানে/বামে টানুন'}</span>
          </div>
        </div>
      </div>

      {/* Community Confirmation Bar */}
      {communityConfirmed && (
        <div className="p-4 bg-navy-dark text-white border-t border-navy-subtle flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <CheckCircle2 className="w-5 h-5 text-civic-blue shrink-0" />
            <span>{t.detail.confirmedResolution}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-civic-blue" />
            <span>
              {language === 'en'
                ? `Verified by ${confirmedCount} citizens on-site`
                : `${confirmedCount} জন নাগরিক কর্তৃক সরেজমিনে নিশ্চিত`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
