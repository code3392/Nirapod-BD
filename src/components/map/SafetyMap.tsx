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
  Filter
} from 'lucide-react';

export default function SafetyMap() {
  const { language, t, reports, verifyReport } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeReport, setActiveReport] = useState<Report | null>(reports[0] || null);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [userLocating, setUserLocating] = useState<boolean>(false);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: 23.8103, lng: 90.4125 });

  // Map DOM container ref for Leaflet
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

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
      });

      // Add Zoom control to top-right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      leafletMapRef.current = map;
      updateMarkers(L, map);
    }

    initLeaflet();

    return () => {
      isMounted = false;
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
      if (report.status === 'RESOLVED') return '#18A558'; // Green
      if (report.severity === 'emergency') return '#E53935'; // Red
      if (report.severity === 'high') return '#F59E0B'; // Orange
      if (report.severity === 'medium') return '#EAB308'; // Yellow
      return '#3B82F6'; // Blue
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
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            cursor: pointer;
            transition: transform 0.2s;
          " class="${isEmergency ? 'animate-pulse' : ''}">
            <span>${
              report.status === 'RESOLVED' ? '✓' :
              report.categoryId === 'road_traffic' ? '🚗' :
              report.categoryId === 'waste' ? '🗑️' :
              report.categoryId === 'waterlogging' ? '💧' :
              report.categoryId === 'electrical' ? '⚡' :
              report.categoryId === 'fire' ? '🔥' : '⚠️'
            }</span>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([report.latitude, report.longitude], { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        setActiveReport(report);
        map.panTo([report.latitude, report.longitude], { animate: true });
      });

      markersRef.current.push(marker);
    });
  };

  // Near Me GPS Handler
  const handleNearMe = () => {
    setUserLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setMapCenter({ lat, lng });
          if (leafletMapRef.current) {
            leafletMapRef.current.setView([lat, lng], 14, { animate: true });
          }
          setUserLocating(false);
        },
        () => {
          // Fallback to Mirpur Road
          setMapCenter({ lat: 23.8041, lng: 90.3667 });
          if (leafletMapRef.current) {
            leafletMapRef.current.setView([23.8041, 90.3667], 14, { animate: true });
          }
          setUserLocating(false);
        }
      );
    }
  };

  return (
    <div className="relative h-[calc(100vh-64px)] w-full flex flex-col overflow-hidden bg-slate-900">
      {/* Top Floating Filter & Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-30 flex flex-col gap-2 max-w-7xl mx-auto pointer-events-none">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 pointer-events-auto">
          {/* Search Box + Near Me */}
          <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-2xl shadow-elevated border border-surface-border p-1.5 flex-1 max-w-xl">
            <div className="flex items-center gap-2 pl-3 flex-1">
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search area, hazard, or ID (e.g. Mirpur, NRP-10482)...' : 'এলাকা বা আইডি খুঁজুন (যেমন: মিরপুর, NRP-10482)...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-navy bg-transparent border-none focus:outline-none placeholder:text-slate-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={handleNearMe}
              disabled={userLocating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-bold shadow-sm transition shrink-0"
              title="Locate my position in Dhaka"
            >
              <Navigation className={`w-3.5 h-3.5 text-safety ${userLocating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Near Me</span>
            </button>

            <button
              onClick={() => setIsListView(!isListView)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition lg:hidden"
              title="Toggle List View"
            >
              {isListView ? <MapIcon className="w-4 h-4 text-navy" /> : <List className="w-4 h-4 text-navy" />}
            </button>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden sm:flex items-center gap-2 bg-navy-dark/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-xs text-white">
            <span className="w-2 h-2 rounded-full bg-safety animate-pulse" />
            <span>
              <strong>{filteredReports.length}</strong> Hazards Displayed
            </span>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pointer-events-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Hazards', icon: '🌐' },
            { id: 'road_traffic', label: 'Road / Traffic', icon: '🚗' },
            { id: 'waterlogging', label: 'Waterlogging', icon: '💧' },
            { id: 'waste', label: 'Waste', icon: '🗑️' },
            { id: 'electrical', label: 'Electrical', icon: '⚡' },
            { id: 'streetlight', label: 'Streetlight', icon: '💡' },
            { id: 'infrastructure', label: 'Infrastructure', icon: '🏗️' },
            { id: 'fire', label: 'Fire', icon: '🔥' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-sm whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-safety text-white ring-2 ring-white/30'
                  : 'bg-white/95 text-navy hover:bg-white border border-slate-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
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
          <div className="absolute bottom-6 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 bg-white rounded-3xl shadow-elevated border border-surface-border p-5 z-20 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-muted font-mono">
                {activeReport.publicId} • {activeReport.area}
              </span>
              <button
                onClick={() => setActiveReport(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative h-36 rounded-2xl overflow-hidden mb-3 bg-slate-100 border border-slate-200">
              <img
                src={activeReport.imageUrl}
                alt={activeReport.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5">
                <StatusBadge status={activeReport.status} size="sm" />
              </div>
              <div className="absolute top-2.5 right-2.5">
                <SeverityBadge severity={activeReport.severity} size="sm" showIcon={false} />
              </div>
            </div>

            <h3 className="font-extrabold text-navy text-sm leading-tight line-clamp-2">
              {activeReport.title}
            </h3>

            <p className="text-xs text-slate-500 flex items-center gap-1 mt-1.5">
              <MapPin className="w-3.5 h-3.5 text-emergency shrink-0" />
              <span className="truncate">{activeReport.locationName}</span>
            </p>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-bold text-navy">
                <Users className="w-3.5 h-3.5 text-safety" />
                <span>{activeReport.confirmationsCount} confirmations</span>
              </div>
              <span className="text-[11px] text-muted">
                {activeReport.timeNoticed}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Link
                href={`/report/${activeReport.id}`}
                className="flex-1 py-2.5 px-4 rounded-xl bg-navy hover:bg-navy-dark text-white font-extrabold text-xs text-center shadow-md transition"
              >
                View Full Details →
              </Link>
              <button
                onClick={() => verifyReport(activeReport.id, 'confirm')}
                className="py-2.5 px-3 rounded-xl bg-safety/10 hover:bg-safety/20 text-safety font-bold text-xs transition border border-safety/30"
                title="Confirm this hazard report"
              >
                ✓ Confirm
              </button>
            </div>
          </div>
        )}

        {/* Side Panel or Mobile Fullscreen List View */}
        {(isListView || false) && (
          <div className="absolute inset-0 z-20 bg-surface overflow-y-auto p-4 sm:p-6 lg:hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-navy">
                Nearby Civic Hazards ({filteredReports.length})
              </h3>
              <button
                onClick={() => setIsListView(false)}
                className="px-3 py-1.5 rounded-xl bg-navy text-white text-xs font-bold"
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
                  className="p-4 rounded-2xl bg-white border border-surface-border shadow-subtle flex gap-4 cursor-pointer hover:border-slate-300"
                >
                  <img
                    src={report.imageUrl}
                    alt={report.title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-muted">
                        {report.publicId}
                      </span>
                      <StatusBadge status={report.status} size="sm" />
                    </div>
                    <h4 className="text-xs font-extrabold text-navy truncate">
                      {report.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {report.locationName}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 text-[11px]">
                      <span className="text-safety font-bold">
                        👥 {report.confirmationsCount} votes
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
