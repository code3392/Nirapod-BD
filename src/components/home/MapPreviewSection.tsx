'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Report } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import SeverityBadge from '@/components/common/SeverityBadge';
import { 
  MapPin, 
  Users, 
  Clock, 
  ExternalLink, 
  ArrowRight,
  ShieldCheck,
  LocateFixed,
  Navigation,
  X,
  Crosshair,
  AlertCircle
} from 'lucide-react';
import { 
  getAccuratePosition, 
  reverseGeocodeLocation, 
  createPinpointIcon,
  DHAKA_QUICK_CHIPS,
  DhakaQuickArea
} from '@/lib/location';

export default function MapPreviewSection() {
  const { language, t, reports } = useApp();
  
  const [selectedReport, setSelectedReport] = useState<Report | null>(reports[0] || null);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locateFeedbackMessage, setLocateFeedbackMessage] = useState<string | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const userCircleRef = useRef<any>(null);

  const filteredReports = reports.filter((r) => {
    if (filterSeverity === 'all') return true;
    if (filterSeverity === 'emergency') return r.severity === 'emergency';
    if (filterSeverity === 'high') return r.severity === 'high';
    if (filterSeverity === 'resolved') return r.status === 'RESOLVED';
    return true;
  });

  // Keep selected report updated if it's no longer in filteredReports
  useEffect(() => {
    if (filteredReports.length > 0) {
      if (!selectedReport || !filteredReports.some((r) => r.id === selectedReport.id)) {
        setSelectedReport(filteredReports[0]);
      }
    } else {
      setSelectedReport(null);
    }
  }, [filterSeverity, reports]);

  // Client-side Leaflet Initialization
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;
      const L = (await import('leaflet')).default;

      if (!isMounted) return;

      // Clean up previous instance
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }

      // Default center: Dhaka
      const centerLat = selectedReport?.latitude || 23.8103;
      const centerLng = selectedReport?.longitude || 90.4125;

      const map = L.map(mapContainerRef.current, {
        center: [centerLat, centerLng],
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: true,
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      // Dark theme tiles matching the website obsidian/purple aesthetic
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        className: 'map-tiles-dark',
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      leafletMapRef.current = map;

      // Refresh size after DOM stabilization
      setTimeout(() => {
        if (leafletMapRef.current) {
          leafletMapRef.current.invalidateSize();
        }
      }, 150);

      // Render initial markers
      renderMarkers(L, map, filteredReports);

      // Enable clicking anywhere on map to pinpoint!
      map.on('click', async (e: any) => {
        const { lat, lng } = e.latlng;
        const cLat = Number(lat.toFixed(6));
        const cLng = Number(lng.toFixed(6));
        await pinUserOnMap(L, map, cLat, cLng, 10, true);
        const place = await reverseGeocodeLocation(cLat, cLng, language);
        setLocateFeedbackMessage(
          language === 'en'
            ? `Pinpoint locked at ${place || `${cLat.toFixed(4)}°N, ${cLng.toFixed(4)}°E`}`
            : `পিনপয়েন্ট চিহ্নিত করা হয়েছে: ${place || `${cLat.toFixed(4)}°N, ${cLng.toFixed(4)}°E`}`
        );
        setTimeout(() => setLocateFeedbackMessage(null), 4000);
      });
    }

    initMap();

    return () => {
      isMounted = false;
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      if (userCircleRef.current) {
        userCircleRef.current.remove();
        userCircleRef.current = null;
      }
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, []); // Run on mount

  // Update markers when filteredReports changes
  useEffect(() => {
    async function updateMarkers() {
      if (!leafletMapRef.current || typeof window === 'undefined') return;
      const L = (await import('leaflet')).default;
      renderMarkers(L, leafletMapRef.current, filteredReports);
    }
    updateMarkers();
  }, [filteredReports, selectedReport?.id]);

  const renderMarkers = (L: any, map: any, reportList: Report[]) => {
    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    reportList.forEach((report) => {
      let bgColor = '#3B82F6';
      let glowColor = 'rgba(59,130,246,0.6)';
      const isEmergency = report.severity === 'emergency';

      if (report.status === 'RESOLVED') {
        bgColor = '#38BDF8';
        glowColor = 'rgba(56,189,248,0.7)';
      } else if (report.severity === 'emergency') {
        bgColor = '#EF4444';
        glowColor = 'rgba(239,68,68,0.8)';
      } else if (report.severity === 'high') {
        bgColor = '#F97316';
        glowColor = 'rgba(249,115,22,0.7)';
      } else if (report.severity === 'medium') {
        bgColor = '#F59E0B';
        glowColor = 'rgba(245,158,11,0.6)';
      }

      const isSelected = selectedReport?.id === report.id;

      const customIcon = L.divIcon({
        className: 'custom-hazard-pin',
        html: `
          <div style="position: relative; width: ${isSelected ? '38px' : '32px'}; height: ${isSelected ? '38px' : '32px'}; background-color: ${bgColor}; border-radius: 9999px; display: flex; align-items: center; justify-content: center; color: white; box-shadow: 0 0 16px ${glowColor}; border: 2.5px solid white; cursor: pointer; transform: ${isSelected ? 'scale(1.15)' : 'scale(1)'}; transition: transform 0.2s;">
            ${isEmergency ? '<span style="position: absolute; inset: -5px; border-radius: 9999px; background-color: #EF4444; opacity: 0.6; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>' : ''}
            <svg style="width: 16px; height: 16px; position: relative; z-index: 10;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
        `,
        iconSize: [isSelected ? 38 : 32, isSelected ? 38 : 32],
        iconAnchor: [isSelected ? 19 : 16, isSelected ? 19 : 16],
      });

      const marker = L.marker([report.latitude, report.longitude], { icon: customIcon }).addTo(map);
      marker.on('click', () => {
        setSelectedReport(report);
        map.panTo([report.latitude, report.longitude], { animate: true });
      });

      markersRef.current.push(marker);
    });
  };

  const handleCenterDhaka = () => {
    if (leafletMapRef.current) {
      leafletMapRef.current.setView([23.8103, 90.4125], 12, { animate: true });
    }
  };

  const buildPopupHtml = (
    lat: number, 
    lng: number, 
    accuracy: number, 
    placeName?: string, 
    isManual: boolean = false,
    isVpn: boolean = false
  ) => {
    const clampedAcc = Math.min(Math.max(Math.round(accuracy), 5), 20);
    return `
      <div style="font-family: system-ui, -apple-system, sans-serif; text-align: center; padding: 6px 4px; min-width: 195px;">
        <div style="display: inline-flex; align-items: center; gap: 4px; font-weight: 800; font-size: 13px; color: #FFFFFF;">
          <span>${isManual ? (language === 'en' ? 'Pinpointed Location' : 'পিনপয়েন্ট অবস্থান') : (isVpn ? (language === 'en' ? 'Dhaka (VPN Detected)' : 'ঢাকা (ভিপিএন সক্রিয়)') : (language === 'en' ? 'Live GPS Pinpoint' : 'লাইভ জিপিএস পিনপয়েন্ট'))}</span>
        </div>
        ${placeName ? `<p style="margin: 4px 0 2px 0; font-size: 11px; font-weight: 700; color: #38BDF8;">${placeName}</p>` : ''}
        <p style="margin: 2px 0 6px 0; font-size: 10px; color: #94A3B8; font-family: monospace;">
          ${lat.toFixed(5)}° N, ${lng.toFixed(5)}° E
        </p>
        <div style="display: flex; align-items: center; justify-content: center; gap: 4px; margin-bottom: 4px;">
          <span style="display: inline-block; font-size: 9px; font-weight: 800; color: #38BDF8; background: rgba(56, 189, 248, 0.18); padding: 2px 8px; border-radius: 9999px; border: 1px solid rgba(56, 189, 248, 0.4);">
            ● ${isManual ? (language === 'en' ? 'Manual Pin' : 'ম্যানুয়াল পিন') : (isVpn ? (language === 'en' ? 'Dhaka Locked' : 'ঢাকা লকড') : (language === 'en' ? 'Precision GPS' : 'সঠিক জিপিএস'))}
          </span>
          <span style="display: inline-block; font-size: 9px; font-weight: 700; color: #34D399; background: rgba(52, 211, 153, 0.18); padding: 2px 8px; border-radius: 9999px; border: 1px solid rgba(52, 211, 153, 0.4);">
            ±${clampedAcc}m (Pinpoint)
          </span>
        </div>
        <p style="margin: 0; font-size: 9px; color: #64748B;">
          ${language === 'en' ? 'Drag pin or click map to adjust' : 'পিন টেনে বা ম্যাপে ক্লিক করে অবস্থান বদলান'}
        </p>
      </div>
    `;
  };

  const pinUserOnMap = async (
    L: any, 
    map: any, 
    lat: number, 
    lng: number, 
    accuracy: number = 15, 
    isManual: boolean = false,
    isVpn: boolean = false
  ) => {
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    if (userCircleRef.current) {
      userCircleRef.current.remove();
      userCircleRef.current = null;
    }

    // Accuracy Circle - tightly bounded to max 35m so it never obscures the map
    const circle = L.circle([lat, lng], {
      radius: Math.min(Math.max(accuracy, 12), 35),
      color: '#38BDF8',
      fillColor: '#0EA5E9',
      fillOpacity: 0.14,
      weight: 1.5,
      dashArray: '3, 5',
    }).addTo(map);
    userCircleRef.current = circle;

    // Pinpoint needle marker
    const userIcon = createPinpointIcon(L, {
      language,
      label: isManual ? (language === 'en' ? 'PINPOINT' : 'পিনপয়েন্ট') : (isVpn ? (language === 'en' ? 'DHAKA PIN' : 'ঢাকা পিন') : (language === 'en' ? 'YOU ARE HERE' : 'আপনার অবস্থান')),
    });

    const marker = L.marker([lat, lng], { 
      icon: userIcon, 
      zIndexOffset: 1500,
      draggable: true,
    }).addTo(map);

    marker.bindPopup(buildPopupHtml(lat, lng, accuracy, undefined, isManual, isVpn), { closeButton: true, autoClose: false }).openPopup();
    userMarkerRef.current = marker;

    marker.on('dragend', async () => {
      const pos = marker.getLatLng();
      const nLat = Number(pos.lat.toFixed(6));
      const nLng = Number(pos.lng.toFixed(6));
      if (userCircleRef.current) {
        userCircleRef.current.setLatLng([nLat, nLng]);
      }
      const place = await reverseGeocodeLocation(nLat, nLng, language);
      marker.bindPopup(buildPopupHtml(nLat, nLng, 10, place, true, false)).openPopup();
      setLocateFeedbackMessage(
        language === 'en'
          ? `Pinpoint moved: ${place || `${nLat.toFixed(4)}°N, ${nLng.toFixed(4)}°E`}`
          : `পিনপয়েন্ট সরানো হয়েছে: ${place || `${nLat.toFixed(4)}°N, ${nLng.toFixed(4)}°E`}`
      );
      setTimeout(() => setLocateFeedbackMessage(null), 4000);
    });

    reverseGeocodeLocation(lat, lng, language).then((place) => {
      if (userMarkerRef.current === marker) {
        marker.bindPopup(buildPopupHtml(lat, lng, accuracy, place, isManual, isVpn));
      }
    });
  };

  const handleSelectQuickArea = async (area: DhakaQuickArea) => {
    if (typeof window === 'undefined' || !leafletMapRef.current) return;
    const L = (await import('leaflet')).default;
    await pinUserOnMap(L, leafletMapRef.current, area.lat, area.lng, 10, true, false);
    leafletMapRef.current.flyTo([area.lat, area.lng], 17, { animate: true, duration: 1.2 });
    const areaLabel = language === 'bn' ? area.nameBn : area.name;
    setLocateFeedbackMessage(
      language === 'en'
        ? `Pinpoint locked to ${areaLabel} (±10m). Drag pin or click map to adjust.`
        : `${areaLabel}-এ পিন লক করা হয়েছে (±১০ মি)। প্রয়োজনে পিন সরান বা ম্যাপে ক্লিক করুন।`
    );
    setTimeout(() => setLocateFeedbackMessage(null), 5000);
  };

  const handleLocateMe = async () => {
    if (typeof window === 'undefined') return;
    setIsLocating(true);
    setLocateFeedbackMessage(null);

    const L = (await import('leaflet')).default;

    try {
      const pos = await getAccuratePosition();
      setIsLocating(false);

      if (leafletMapRef.current) {
        await pinUserOnMap(L, leafletMapRef.current, pos.lat, pos.lng, pos.accuracy, false, pos.isVpnDetected);
        // Fly directly to zoom 17 so street/house level pinpoint is displayed!
        leafletMapRef.current.flyTo([pos.lat, pos.lng], 17, { animate: true, duration: 1.2 });
      }

      const place = await reverseGeocodeLocation(pos.lat, pos.lng, language);
      if (pos.isVpnDetected) {
        setLocateFeedbackMessage(
          language === 'en'
            ? `Foreign VPN/IP detected outside BD. Centered in Dhaka (±15m). Tap quick areas or drag pin!`
            : `ভিপিএন বা বিদেশি নেটওয়ার্ক সনাক্ত হয়েছে। ম্যাপ ঢাকায় লক করা হয়েছে (±১৫ মি)। নিচের এলাকা চাপুন বা পিন সরান!`
        );
      } else {
        setLocateFeedbackMessage(
          language === 'en'
            ? `Pinpoint locked: ${place} (±${pos.accuracy}m). Drag pin to adjust.`
            : `পিনপয়েন্ট লক করা হয়েছে: ${place} (±${pos.accuracy} মি)। প্রয়োজনে পিন সরান।`
        );
      }
      setTimeout(() => setLocateFeedbackMessage(null), 5000);
    } catch (err: any) {
      setIsLocating(false);
      console.warn('Geolocation error:', err);

      const isPermissionDenied = err?.message === 'PERMISSION_DENIED';
      setLocateFeedbackMessage(
        isPermissionDenied
          ? (language === 'en'
              ? 'Browser location permission blocked. Click anywhere on the map to pinpoint your location!'
              : 'ব্রাউজারে লোকেশন অনুমতি বন্ধ রয়েছে। পিন বসাতে ম্যাপে ক্লিক করুন!')
          : (language === 'en'
              ? 'GPS sensor unavailable on this device. Click anywhere on the map to pinpoint your location!'
              : 'জিপিএস সেন্সর পাওয়া যায়নি। পিন বসাতে ম্যাপে যে কোনো জায়গায় ক্লিক করুন!')
      );
      setTimeout(() => setLocateFeedbackMessage(null), 6000);
    }
  };

  return (
    <section className="py-20 bg-transparent relative overflow-hidden text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-600/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {language === 'en' ? 'Active Hazards Across Dhaka City' : 'ঢাকা শহরের চলমান নাগরিক ঝুঁকি ও সমাধান'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              {t.mapPreview.subtitle}
            </p>
          </div>

          <Link
            href="/map"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.35)] transition transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
          >
            <span>{t.mapPreview.viewFullMap}</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>

        {/* Map Canvas with Real Leaflet Map */}
        <div className="relative rounded-3xl bg-[#0E081B] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden ring-1 ring-sky-500/15">
          
          {/* Top Controls & Quick Area Picker inside Map */}
          <div className="absolute top-4 left-4 right-4 z-[1001] flex flex-col gap-2 pointer-events-none">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#150D28]/92 backdrop-blur-xl p-3 rounded-2xl border border-white/10 shadow-lg pointer-events-auto">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold font-sans">
                <button
                  onClick={() => setFilterSeverity('all')}
                  className={`px-3 py-1.5 rounded-xl transition ${
                    filterSeverity === 'all'
                      ? 'bg-sky-400 text-[#0E081B] font-black shadow-sm'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  All Hazards
                </button>
                <button
                  onClick={() => setFilterSeverity('emergency')}
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                    filterSeverity === 'emergency'
                      ? 'bg-emergency text-white font-black shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                      : 'bg-white/5 text-red-300 hover:bg-white/10 border border-red-500/30'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emergency" />
                  Emergency
                </button>
                <button
                  onClick={() => setFilterSeverity('high')}
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                    filterSeverity === 'high'
                      ? 'bg-orange-500 text-white font-black'
                      : 'bg-white/5 text-orange-300 hover:bg-white/10 border border-orange-500/30'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  High Risk
                </button>
                <button
                  onClick={() => setFilterSeverity('resolved')}
                  className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition ${
                    filterSeverity === 'resolved'
                      ? 'bg-sky-400 text-[#0E081B] font-black'
                      : 'bg-white/5 text-sky-300 hover:bg-white/10 border border-sky-400/30'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  Resolved
                </button>

                {/* Locate Me Button with Pinning */}
                <button
                  onClick={handleLocateMe}
                  disabled={isLocating}
                  className="px-2.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 hover:text-white border border-sky-400/30 text-xs flex items-center gap-1.5 transition font-bold disabled:opacity-50"
                  title="Locate my position in Dhaka and pin on map"
                >
                  <Navigation className={`w-3.5 h-3.5 text-sky-400 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? 'Locating...' : 'Locate Me'}</span>
                </button>

                <button
                  onClick={handleCenterDhaka}
                  className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs flex items-center gap-1 transition"
                  title="Recenter Map on Dhaka"
                >
                  <LocateFixed className="w-3.5 h-3.5 text-sky-400" />
                  <span className="hidden sm:inline">Center Dhaka</span>
                </button>
              </div>

              {/* Legend Indicators */}
              <div className="hidden lg:flex items-center gap-4 text-[11px] font-mono text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emergency" />
                  Emergency
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  High
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Normal
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  Resolved
                </span>
              </div>
            </div>

          </div>

          {/* Real Leaflet Map DOM Container */}
          <div 
            ref={mapContainerRef} 
            className="w-full h-[500px] sm:h-[580px] bg-[#05020B] z-0" 
          />

          {/* Real-time Pinpoint Feedback Banner */}
          {locateFeedbackMessage && (
            <div className="absolute top-28 sm:top-24 left-3 right-3 sm:left-6 sm:right-auto z-[1001] bg-[#0E081B]/95 backdrop-blur-2xl border border-sky-400/50 text-sky-200 px-4 py-2.5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.85)] flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-sky-500/30 max-w-lg">
              <Crosshair className="w-4 h-4 text-sky-400 shrink-0 animate-pulse" />
              <span className="flex-1 leading-snug">{locateFeedbackMessage}</span>
              <button 
                onClick={() => setLocateFeedbackMessage(null)} 
                className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Floating Report Preview Card with Dark Obsidian Frosted Glass */}
          {selectedReport && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 bg-[#150D28]/95 backdrop-blur-2xl rounded-3xl p-5 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-white/15 z-[1001] animate-in fade-in slide-in-from-bottom-3 duration-300 ring-1 ring-sky-500/20">
              {/* Photo Thumbnail */}
              {selectedReport.imageUrl && (
                <div className="relative h-32 w-full rounded-2xl overflow-hidden mb-3 bg-slate-900 border border-white/10 group">
                  <img 
                    src={selectedReport.imageUrl} 
                    alt={selectedReport.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-white flex items-center gap-1 border border-white/20">
                    <Clock className="w-3 h-3 text-sky-400" />
                    <span>{selectedReport.area} • Dhaka</span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-black text-sky-300 uppercase tracking-wider bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-400/20">
                    {selectedReport.categoryId.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400 font-mono font-bold">
                    {selectedReport.publicId}
                  </span>
                </div>
                <StatusBadge status={selectedReport.status} size="sm" />
              </div>

              <h3 className="font-extrabold text-white text-sm leading-snug line-clamp-2">
                {selectedReport.title}
              </h3>

              <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1.5">
                <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
                <span className="truncate">{selectedReport.locationName}</span>
              </p>

              <div className="flex items-center justify-between text-xs text-slate-300 mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <Users className="w-3.5 h-3.5 text-sky-400" />
                  <span>{selectedReport.confirmationsCount} verified</span>
                </div>
                <SeverityBadge severity={selectedReport.severity} size="sm" showIcon={false} />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/report/${selectedReport.id}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-xs text-center shadow-md transition"
                >
                  View Full Report →
                </Link>
                <Link
                  href="/map"
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition border border-white/10"
                  title="Open on Interactive Map"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
