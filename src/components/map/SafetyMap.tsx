'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Report, CategoryId, SeverityLevel, ReportStatus } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import SeverityBadge from '@/components/common/SeverityBadge';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Navigation, 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Users, 
  ExternalLink,
  X,
  List,
  Map as MapIcon,
  ChevronRight,
  Filter,
  Radio,
  Crosshair,
  Moon
} from 'lucide-react';
import { 
  getAccuratePosition, 
  reverseGeocodeLocation, 
  createPinpointIcon,
  DHAKA_QUICK_CHIPS,
  DhakaQuickArea
} from '@/lib/location';

export default function SafetyMap() {
  const { language, t, reports, verifyReport } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReport, setActiveReport] = useState<Report | null>(reports[0] || null);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [userLocating, setUserLocating] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; accuracy?: number } | null>(null);
  const [locatedMessage, setLocatedMessage] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 23.8103, lng: 90.4125 });
  const [mapStyle, setMapStyle] = useState<'dark' | 'streets' | 'satellite'>('dark');
  const [showCategoryFilter, setShowCategoryFilter] = useState<boolean>(false);

  // Map DOM container ref for Leaflet
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const tileLayerRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);
  const userCircleRef = useRef<any>(null);

  // Filter reports
  const filteredReports = reports.filter((report) => {
    if (selectedCategory !== 'all' && report.categoryId !== selectedCategory) return false;
    if (selectedSeverity !== 'all' && report.severity !== selectedSeverity) return false;
    if (selectedStatus !== 'all' && report.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = report.title.toLowerCase().includes(q);
      const matchArea = report.area.toLowerCase().includes(q);
      const matchLocation = report.locationName.toLowerCase().includes(q);
      const matchId = report.publicId.toLowerCase().includes(q);
      if (!matchTitle && !matchArea && !matchLocation && !matchId) return false;
    }
    return true;
  });

  // Switcher for tile layers
  const applyTileLayer = (L: any, map: any, style: 'dark' | 'streets' | 'satellite') => {
    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
      tileLayerRef.current = null;
    }

    let url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let options: any = {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
      subdomains: ['a', 'b', 'c'],
    };

    if (style === 'dark') {
      options.className = 'map-tiles-dark';
    } else if (style === 'streets') {
      options.className = 'map-tiles-streets';
    } else if (style === 'satellite') {
      url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      options.className = 'map-tiles-satellite';
      options.subdomains = [];
      options.attribution = 'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics';
    }

    const layer = L.tileLayer(url, options).addTo(map);
    tileLayerRef.current = layer;
  };

  const handleStyleChange = async (style: 'dark' | 'streets' | 'satellite') => {
    setMapStyle(style);
    if (!leafletMapRef.current) return;
    const L = (await import('leaflet')).default;
    applyTileLayer(L, leafletMapRef.current, style);
    if (userLocation) {
      pinUserOnMap(L, leafletMapRef.current, userLocation.lat, userLocation.lng, userLocation.accuracy || 80);
    }
  };

  // Client-side Leaflet Initialization
  useEffect(() => {
    let isMounted = true;

    async function initLeaflet() {
      if (typeof window === 'undefined' || !mapContainerRef.current) return;

      const L = (await import('leaflet')).default;

      // Clean up previous instance if exists
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
      }

      // Initialize Map over Dhaka center
      const map = L.map(mapContainerRef.current, {
        center: [mapCenter.lat, mapCenter.lng],
        zoom: 12,
        zoomControl: false,
        scrollWheelZoom: true,
      });

      // Add Zoom control to top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Dark Matter Map Tile Layer via Free OSM + Obsidian GPU filter
      applyTileLayer(L, map, 'dark');

      leafletMapRef.current = map;
      updateMarkers(L, map);
      if (userLocation) {
        pinUserOnMap(L, map, userLocation.lat, userLocation.lng, userLocation.accuracy || 80);
      }

      // Allow clicking anywhere on map to pinpoint!
      map.on('click', async (e: any) => {
        const { lat, lng } = e.latlng;
        const cLat = Number(lat.toFixed(6));
        const cLng = Number(lng.toFixed(6));
        setUserLocation({ lat: cLat, lng: cLng, accuracy: 10 });
        await pinUserOnMap(L, map, cLat, cLng, 10, true);
        const place = await reverseGeocodeLocation(cLat, cLng, language);
        setLocatedMessage(
          language === 'en'
            ? `Pinpoint locked at ${place || `${cLat.toFixed(4)}°N, ${cLng.toFixed(4)}°E`}`
            : `পিনপয়েন্ট চিহ্নিত করা হয়েছে: ${place || `${cLat.toFixed(4)}°N, ${cLng.toFixed(4)}°E`}`
        );
        setTimeout(() => setLocatedMessage(null), 4500);
      });
    }

    initLeaflet();

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
  }, []);

  // Update markers when filteredReports changes
  useEffect(() => {
    async function refreshMarkers() {
      if (!leafletMapRef.current) return;
      const L = (await import('leaflet')).default;
      updateMarkers(L, leafletMapRef.current);
    }
    refreshMarkers();
  }, [filteredReports]);

  const updateMarkers = (L: any, map: any) => {
    // Clear old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Helper to generate marker pin color
    const getPinBg = (report: Report) => {
      if (report.status === 'RESOLVED') return '#38BDF8'; // Sky Blue
      if (report.severity === 'emergency') return '#EF4444'; // Red
      if (report.severity === 'high') return '#F97316'; // Orange
      if (report.severity === 'medium') return '#EAB308'; // Amber
      return '#2563EB'; // Royal Blue
    };

    filteredReports.forEach((report) => {
      const pinColor = getPinBg(report);
      const isEmergency = report.severity === 'emergency';

      // Custom HTML DivIcon
      const customIcon = L.divIcon({
        className: 'custom-map-marker',
        html: `
          <div style="
            position: relative;
            background-color: ${pinColor};
            width: 34px;
            height: 34px;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            box-shadow: 0 0 15px ${pinColor}88;
            border: 2px solid white;
            cursor: pointer;
            transition: transform 0.2s;
          ">
            ${isEmergency ? `<span style="position: absolute; inset: -4px; border-radius: 9999px; background-color: ${pinColor}; opacity: 0.5; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>` : ''}
            <svg style="width: 16px; height: 16px; position: relative; z-index: 10;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });

      const marker = L.marker([report.latitude, report.longitude], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          setActiveReport(report);
          map.setView([report.latitude, report.longitude], 15, { animate: true });
        });

      markersRef.current.push(marker);
    });
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

    // Remove previous user marker and circle if already present
    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }
    if (userCircleRef.current) {
      userCircleRef.current.remove();
      userCircleRef.current = null;
    }

    // 1. Draw glowing accuracy radius circle - clamped to max 35m so it never obscures the map
    const circle = L.circle([lat, lng], {
      radius: Math.min(Math.max(accuracy, 12), 35),
      color: '#38BDF8',
      fillColor: '#0EA5E9',
      fillOpacity: 0.14,
      weight: 1.5,
      dashArray: '3, 5',
    }).addTo(map);
    userCircleRef.current = circle;

    // 2. Create custom high-visibility pinpoint needle marker
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
      setUserLocation({ lat: nLat, lng: nLng, accuracy: 10 });
      if (userCircleRef.current) {
        userCircleRef.current.setLatLng([nLat, nLng]);
      }
      const place = await reverseGeocodeLocation(nLat, nLng, language);
      marker.bindPopup(buildPopupHtml(nLat, nLng, 10, place, true, false)).openPopup();
      setLocatedMessage(
        language === 'en'
          ? `Pinpoint moved: ${place || `${nLat.toFixed(4)}°N, ${nLng.toFixed(4)}°E`}`
          : `পিনপয়েন্ট সরানো হয়েছে: ${place || `${nLat.toFixed(4)}°N, ${nLng.toFixed(4)}°E`}`
      );
      setTimeout(() => setLocatedMessage(null), 4000);
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
    setUserLocation({ lat: area.lat, lng: area.lng, accuracy: 10 });
    setMapCenter({ lat: area.lat, lng: area.lng });
    await pinUserOnMap(L, leafletMapRef.current, area.lat, area.lng, 10, true, false);
    leafletMapRef.current.flyTo([area.lat, area.lng], 17, { animate: true, duration: 1.2 });
    const areaLabel = language === 'bn' ? area.nameBn : area.name;
    setLocatedMessage(
      language === 'en'
        ? `Pinpoint locked to ${areaLabel} (±10m). Drag pin or click map to adjust.`
        : `${areaLabel}-এ পিন লক করা হয়েছে (±১০ মি)। প্রয়োজনে পিন সরান বা ম্যাপে ক্লিক করুন।`
    );
    setTimeout(() => setLocatedMessage(null), 5000);
  };

  const handleLocateMe = async () => {
    if (typeof window === 'undefined') return;

    setUserLocating(true);
    setLocatedMessage(null);
    const L = (await import('leaflet')).default;

    try {
      const pos = await getAccuratePosition();
      setUserLocating(false);

      setUserLocation({ lat: pos.lat, lng: pos.lng, accuracy: pos.accuracy });
      setMapCenter({ lat: pos.lat, lng: pos.lng });

      if (leafletMapRef.current) {
        await pinUserOnMap(L, leafletMapRef.current, pos.lat, pos.lng, pos.accuracy, false, pos.isVpnDetected);
        // Fly directly to zoom 17 so street/house level pinpoint is displayed!
        leafletMapRef.current.flyTo([pos.lat, pos.lng], 17, { animate: true, duration: 1.2 });
      }

      const place = await reverseGeocodeLocation(pos.lat, pos.lng, language);
      if (pos.isVpnDetected) {
        setLocatedMessage(
          language === 'en'
            ? `Foreign VPN/IP detected outside BD. Centered in Dhaka (±15m). Tap quick areas or drag pin!`
            : `ভিপিএন বা বিদেশি নেটওয়ার্ক সনাক্ত হয়েছে। ম্যাপ ঢাকায় লক করা হয়েছে (±১৫ মি)। নিচের এলাকা চাপুন বা পিন সরান!`
        );
      } else {
        setLocatedMessage(
          language === 'en'
            ? `Pinpoint locked: ${place} (±${pos.accuracy}m). Drag pin to adjust.`
            : `পিনপয়েন্ট লক করা হয়েছে: ${place} (±${pos.accuracy} মি)। প্রয়োজনে পিন সরান।`
        );
      }
      setTimeout(() => setLocatedMessage(null), 5000);
    } catch (err: any) {
      setUserLocating(false);
      console.warn('Geolocation error:', err);

      const isPermissionDenied = err?.message === 'PERMISSION_DENIED';
      setLocatedMessage(
        isPermissionDenied
          ? (language === 'en'
              ? 'Browser location permission blocked. Click anywhere on the map to pinpoint your location!'
              : 'ব্রাউজারে লোকেশন অনুমতি বন্ধ রয়েছে। পিন বসাতে ম্যাপে ক্লিক করুন!')
          : (language === 'en'
              ? 'GPS sensor unavailable on this device. Click anywhere on the map to pinpoint your location!'
              : 'জিপিএস সেন্সর পাওয়া যায়নি। পিন বসাতে ম্যাপে যে কোনো জায়গায় ক্লিক করুন!')
      );
      setTimeout(() => setLocatedMessage(null), 6000);
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] flex flex-col overflow-hidden bg-[#090514] text-white">
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 pointer-events-none flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Search Box & Category Filter Button */}
          <div className="flex items-center gap-2 flex-1 max-w-lg">
            <div className="relative flex-1 bg-[#150D28]/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/15">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search Dhaka hazards (e.g. Mirpur, potholes)...' : 'ঝুঁকি বা এলাকা খুঁজুন...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold bg-transparent text-white placeholder:text-slate-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              className={`inline-flex items-center gap-1.5 px-3 py-2.5 rounded-2xl backdrop-blur-2xl border text-xs font-bold transition shadow-lg shrink-0 ${
                showCategoryFilter || selectedCategory !== 'all'
                  ? 'bg-purple-600/30 text-sky-300 border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'bg-[#150D28]/95 text-slate-300 border-white/15 hover:text-white hover:bg-white/10'
              }`}
              title="Filter hazards by category"
            >
              <Filter className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">
                {selectedCategory === 'all' ? 'Categories' : selectedCategory.replace('_', ' ')}
              </span>
            </button>
          </div>

          {/* Map Controls */}
          <div className="flex items-center gap-2">
            {/* Map Theme / Style Switcher */}
            <div className="flex items-center bg-[#150D28]/95 backdrop-blur-2xl rounded-2xl border border-white/15 p-1 shadow-lg">
              <button
                type="button"
                onClick={() => handleStyleChange('dark')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  mapStyle === 'dark'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Obsidian Dark Map"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dark</span>
              </button>
              <button
                type="button"
                onClick={() => handleStyleChange('streets')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  mapStyle === 'streets'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Streets Map"
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Streets</span>
              </button>
              <button
                type="button"
                onClick={() => handleStyleChange('satellite')}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  mapStyle === 'satellite'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="High-Res Satellite Imagery"
              >
                <Layers className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Satellite</span>
              </button>
            </div>

            {/* Auto Locate Button */}
            <button
              onClick={handleLocateMe}
              disabled={userLocating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-[#150D28]/95 backdrop-blur-2xl border border-white/15 text-xs font-bold text-white hover:bg-white/10 transition shadow-lg disabled:opacity-50"
              title="Locate my position in Dhaka"
            >
              <Navigation className={`w-3.5 h-3.5 text-sky-400 ${userLocating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {userLocating ? 'Locating...' : 'Locate Me'}
              </span>
            </button>

            {/* List / Map Toggle (Mobile) */}
            <button
              onClick={() => setIsListView(!isListView)}
              className="lg:hidden p-2.5 rounded-2xl bg-[#150D28]/95 backdrop-blur-2xl border border-white/15 text-white transition shadow-lg"
              title="Toggle list view"
            >
              {isListView ? <MapIcon className="w-4 h-4 text-sky-400" /> : <List className="w-4 h-4 text-sky-400" />}
            </button>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-[#150D28]/95 backdrop-blur-2xl px-4 py-2 rounded-2xl border border-white/15 text-xs text-white font-mono shadow-lg">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>
              <strong>{filteredReports.length}</strong> Active Hazards
            </span>
          </div>
        </div>

        {/* Collapsible Category Filter Pills */}
        {showCategoryFilter && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pointer-events-auto no-scrollbar bg-[#150D28]/95 backdrop-blur-2xl p-2 rounded-2xl border border-white/15 animate-in fade-in slide-in-from-top-2 duration-200">
            {[
              { id: 'all', label: 'All Hazards' },
              { id: 'road_traffic', label: 'Road / Traffic' },
              { id: 'waterlogging', label: 'Waterlogging' },
              { id: 'waste', label: 'Waste' },
              { id: 'electrical', label: 'Electrical' },
              { id: 'streetlight', label: 'Streetlight' },
              { id: 'infrastructure', label: 'Infrastructure' },
              { id: 'fire', label: 'Fire' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-sky-400 text-[#0E081B] font-black shadow-[0_0_12px_rgba(56,189,248,0.4)]'
                    : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Quick Dhaka Area 1-Click Pinpoint Toolbar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pointer-events-auto no-scrollbar bg-[#150D28]/95 backdrop-blur-2xl px-3 py-1.5 rounded-2xl border border-white/15 shadow-lg">
          <span className="text-[10px] uppercase font-mono font-black text-sky-400 shrink-0 flex items-center gap-1.5 mr-1">
            <MapPin className="w-3 h-3 text-sky-400" />
            <span>{language === 'en' ? 'Quick Area:' : 'দ্রুত এলাকা:'}</span>
          </span>
          {DHAKA_QUICK_CHIPS.map((area) => (
            <button
              key={area.id}
              type="button"
              onClick={() => handleSelectQuickArea(area)}
              className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-white border border-white/10 hover:border-sky-400/40 text-xs font-bold whitespace-nowrap transition shrink-0 active:scale-95"
              title={`Pinpoint ${area.name} at street level`}
            >
              {language === 'bn' ? area.nameBn : area.name}
            </button>
          ))}
        </div>

        {/* Floating User Location Confirmation Toast */}
        {locatedMessage && (
          <div className="pointer-events-auto self-center px-4 py-2 rounded-2xl bg-[#150D28]/95 backdrop-blur-2xl border border-sky-400/50 shadow-[0_10px_35px_rgba(56,189,248,0.4)] text-white text-xs font-bold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 ring-1 ring-sky-400/30">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping shrink-0" />
            <span>{locatedMessage}</span>
            <button
              onClick={() => setLocatedMessage(null)}
              className="ml-1 p-0.5 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Map View & Side Drawer */}
      <div className="relative flex-1 w-full h-full flex">
        {/* Leaflet Map Stage */}
        <div
          ref={mapContainerRef}
          className={`w-full h-full z-10 transition-opacity ${isListView ? 'opacity-0 lg:opacity-100' : 'opacity-100'}`}
        />

        {/* Floating Active Report Preview Card */}
        {activeReport && !isListView && (
          <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 bg-[#150D28]/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/15 p-5 z-20 animate-in fade-in slide-in-from-bottom-4 duration-200 ring-1 ring-purple-500/20 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-mono font-black tracking-wider text-sky-300">
                {activeReport.publicId} • {activeReport.area}
              </span>
              <button
                onClick={() => setActiveReport(null)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-36 rounded-2xl overflow-hidden mb-3 bg-slate-900 border border-white/10">
              {activeReport.mediaType === 'video' ? (
                <video
                  src={activeReport.mediaUrl || activeReport.imageUrl}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                />
              ) : (
                <img
                  src={activeReport.mediaUrl || activeReport.imageUrl}
                  alt={activeReport.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-2.5 left-2.5">
                <StatusBadge status={activeReport.status} size="sm" />
              </div>
              <div className="absolute top-2.5 right-2.5">
                <SeverityBadge severity={activeReport.severity} size="sm" showIcon={false} />
              </div>
            </div>

            <h3 className="font-extrabold text-white text-sm leading-tight line-clamp-2">
              {activeReport.title}
            </h3>

            <p className="text-xs text-slate-300 flex items-center gap-1 mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
              <span className="truncate">{activeReport.locationName}</span>
            </p>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-mono">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <Users className="w-3.5 h-3.5 text-sky-400" />
                <span>{activeReport.confirmationsCount} confirmations</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {activeReport.timeNoticed}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/report/${activeReport.id}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-extrabold text-xs text-center shadow-md transition"
              >
                View Full Details →
              </Link>
              <button
                onClick={() => verifyReport(activeReport.id, 'confirm')}
                className="py-2.5 px-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold text-xs transition border border-sky-400/30 flex items-center gap-1.5"
                title="Confirm this hazard report"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirm</span>
              </button>
            </div>
          </div>
        )}

        {/* Side Panel or Mobile Fullscreen List View */}
        {isListView && (
          <div className="absolute inset-0 z-20 bg-[#090514] overflow-y-auto p-4 sm:p-6 lg:hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-white">
                Nearby Safety Hazards ({filteredReports.length})
              </h3>
              <button
                onClick={() => setIsListView(false)}
                className="px-3.5 py-1.5 rounded-full bg-sky-400 text-[#0E081B] text-xs font-black"
              >
                Back to Map
              </button>
            </div>

            <div className="space-y-3">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => {
                    setActiveReport(report);
                    setIsListView(false);
                    if (leafletMapRef.current) {
                      leafletMapRef.current.setView([report.latitude, report.longitude], 15, { animate: true });
                    }
                  }}
                  className="p-4 rounded-2xl bg-[#130C24] border border-white/10 shadow-lg flex gap-4 cursor-pointer hover:border-purple-400/40"
                >
                  <img
                    src={report.mediaUrl || report.imageUrl}
                    alt={report.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-sky-300">
                        {report.publicId}
                      </span>
                      <StatusBadge status={report.status} size="sm" />
                    </div>
                    <h4 className="text-xs font-extrabold text-white truncate">
                      {report.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {report.locationName}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[11px]">
                      <span className="text-sky-400 font-bold flex items-center gap-1">
                        <Users className="w-3 h-3 text-sky-400" />
                        <span>{report.confirmationsCount} votes</span>
                      </span>
                      <SeverityBadge severity={report.severity} size="sm" showIcon={false} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
