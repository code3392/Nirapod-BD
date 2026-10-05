'use client';

import React from 'react';
import Hero from '@/components/home/Hero';
import LiveStatistics from '@/components/home/LiveStatistics';
import HowItWorks from '@/components/home/HowItWorks';
import MapPreviewSection from '@/components/home/MapPreviewSection';
import PartnershipShowcase from '@/components/home/PartnershipShowcase';
import AboutUsSection from '@/components/home/AboutUsSection';
import MovingTickerSection from '@/components/home/MovingTickerSection';
export default function HomePage() {

  return (
    <div className="space-y-0">
      {/* 1. Impressive Hero Section with Dhaka Sentinel Radar */}
      <Hero />

      {/* 2. Live Safety Statistics (Authentic Community Mesh Counts) */}
      <LiveStatistics />

      {/* 3. Live Safety Map Preview Section */}
      <MapPreviewSection />

      {/* 4. 5-Step Civic Reporting Workflow */}
      <HowItWorks />

      {/* 5. Public Safety Partnership Showcase (Official 999, DNCC, DSCC, WASA, DESCO) */}
      <PartnershipShowcase />

      {/* 6. Authentic About Us Section */}
      <AboutUsSection />

      {/* 7. Moving Text Blocks (Continuous Sentinel Stream) */}
      <MovingTickerSection />
    </div>
  );
}
