'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/lib/data/categories';
import { CategoryId, SeverityLevel, Report } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import SeverityBadge from '@/components/common/SeverityBadge';
import EmergencyAlertModal from '@/components/common/EmergencyAlertModal';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  MapPin, 
  Check, 
  AlertTriangle, 
  PhoneCall, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight,
  ShieldAlert,
  Info,
  CheckCircle2,
  RefreshCw,
  Copy,
  Eye
} from 'lucide-react';

export default function ReportForm() {
  const router = useRouter();
  const { language, t, addReport, verifyReport, checkDuplicateReport } = useApp();

  // Current Step: 1 to 5, or 6 (Success)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('road_traffic');
  const [imageUrl, setImageUrl] = useState<string>('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [aiAnalysisComplete, setAiAnalysisComplete] = useState<boolean>(false);
  const [aiConfidence, setAiConfidence] = useState<number>(93);
  const [aiRisks, setAiRisks] = useState<string[]>(['Vehicle axle breakdown', 'Pedestrian tripping injury', 'Traffic gridlock']);
  const [aiSuggestedSeverity, setAiSuggestedSeverity] = useState<SeverityLevel>('high');
  const [aiSuggestedCategory, setAiSuggestedCategory] = useState<CategoryId>('road_traffic');

  // Location State
  const [locationName, setLocationName] = useState<string>('Mirpur Road, Near Mirpur-10 Roundabout, Dhaka');
  const [area, setArea] = useState<string>('Mirpur');
  const [latitude, setLatitude] = useState<number>(23.8041);
  const [longitude, setLongitude] = useState<number>(90.3667);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Details State
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [timeNoticed, setTimeNoticed] = useState<'just_now' | 'today' | 'yesterday' | 'week_ago'>('today');
  const [severity, setSeverity] = useState<SeverityLevel>('high');

  // Modal / Warnings
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [duplicateMatch, setDuplicateMatch] = useState<{ isDuplicate: boolean; matchedReport?: Report; distanceMeters?: number } | null>(null);
  const [showDuplicateModal, setShowDuplicateModal] = useState<boolean>(false);

  // Submission Result
  const [submittedReport, setSubmittedReport] = useState<Report | null>(null);

  // Sample photos for instant user testing
  const samplePhotos = [
    {
      category: 'road_traffic' as CategoryId,
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      label: 'Road Pothole',
      detected: 'Road / Traffic Hazard',
      risks: ['Vehicle wheel damage', 'Motorcycle collision', 'Commuter delay'],
      suggestedSev: 'high' as SeverityLevel,
      suggestedTitle: 'Dangerous Road Cave-in on Mirpur 10 Crossing',
    },
    {
      category: 'waterlogging' as CategoryId,
      url: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=800&q=80',
      label: 'Waterlogging',
      detected: 'Urban Waterlogging / Blocked Drain',
      risks: ['Submerged manhole danger', 'Traffic standstill', 'Contaminated water'],
      suggestedSev: 'high' as SeverityLevel,
      suggestedTitle: 'Submerged Roadway & Clogged Stormwater Drain',
    },
    {
      category: 'electrical' as CategoryId,
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      label: 'Electrical Cable',
      detected: 'Overhead High-Voltage Risk',
      risks: ['Electrocution danger', 'Short circuit spark', 'Transformer blowout'],
      suggestedSev: 'emergency' as SeverityLevel,
      suggestedTitle: 'Snapped Hanging Live Electric Cable Near Footpath',
    },
    {
      category: 'waste' as CategoryId,
      url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
      label: 'Waste Dump',
      detected: 'Unsanitary Waste Spill',
      risks: ['Disease vector breeding', 'Drain obstruction', 'Public foul odor'],
      suggestedSev: 'medium' as SeverityLevel,
      suggestedTitle: 'Overflowing Municipal Garbage Pile on Walkway',
    },
  ];

  // Trigger AI Analysis Simulation when moving to Step 3
  const triggerAiAnalysis = () => {
    setIsAiAnalyzing(true);
    setAiAnalysisComplete(false);

    // Find sample matching selectedCategory
    const match = samplePhotos.find(p => p.category === selectedCategory) || samplePhotos[0];

    setTimeout(() => {
      setAiConfidence(Math.floor(90 + Math.random() * 8));
      setAiRisks(match.risks);
      setAiSuggestedSeverity(match.suggestedSev);
      setAiSuggestedCategory(match.category);
      if (!title) setTitle(match.suggestedTitle);
      setIsAiAnalyzing(false);
      setAiAnalysisComplete(true);
    }, 1400);
  };

  // Check emergency when category changes
  const handleCategorySelect = (catId: CategoryId) => {
    setSelectedCategory(catId);
    if (catId === 'fire' || catId === 'medical') {
      setShowEmergencyModal(true);
    }
  };

  // GPS Geolocation Handler
  const handleUseMyLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(Number(position.coords.latitude.toFixed(4)));
          setLongitude(Number(position.coords.longitude.toFixed(4)));
          setLocationName('Mirpur Road, Sector 10, Dhaka 1216');
          setArea('Mirpur');
          setIsLocating(false);
        },
        () => {
          // Fallback to Dhaka central
          setLatitude(23.8041);
          setLongitude(90.3667);
          setLocationName('Mirpur Road, Near Mirpur-10 Roundabout, Dhaka');
          setArea('Mirpur');
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  // Step navigation with checks
  const handleNextStep = () => {
    if (currentStep === 2) {
      setCurrentStep(3);
      triggerAiAnalysis();
      return;
    }

    if (currentStep === 4) {
      // Run duplicate check against existing reports
      const dup = checkDuplicateReport(latitude, longitude, selectedCategory);
      if (dup.isDuplicate) {
        setDuplicateMatch(dup);
        setShowDuplicateModal(true);
      }
      setCurrentStep(5);
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  // Submission Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check emergency warning if severity is emergency
    if (severity === 'emergency' && !showEmergencyModal) {
      setShowEmergencyModal(true);
    }

    const created = addReport({
      categoryId: selectedCategory,
      imageUrl,
      title: title || `${selectedCategory.replace('_', ' ')} incident near ${area}`,
      description: description || 'Citizen reported civic hazard requiring prompt municipal inspection.',
      latitude,
      longitude,
      locationName,
      area,
      severity,
      timeNoticed,
      aiCategory: aiSuggestedCategory,
      aiConfidence,
      aiRisks,
      aiSuggestedSeverity,
    });

    setSubmittedReport(created);
    setCurrentStep(6); // Success view
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Emergency Alert Modal */}
      <EmergencyAlertModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        onContinue={() => setShowEmergencyModal(false)}
      />

      {/* SUCCESS SCREEN (Step 6) */}
      {currentStep === 6 && submittedReport && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-elevated border border-surface-border text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-full bg-safety/10 text-safety mx-auto flex items-center justify-center shadow-glow animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-safety/10 text-safety border border-safety/20">
              Broadcast Active
            </span>
            <h2 className="text-3xl font-black text-navy tracking-tight">
              {t.report.successTitle}
            </h2>
            <p className="text-slate-600 max-w-md mx-auto text-sm">
              {t.report.successSubtitle}
            </p>
          </div>

          {/* Ticket ID Box */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted font-bold">{t.report.reportId}</span>
              <span className="text-base font-black font-mono text-navy bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                {submittedReport.publicId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted font-bold">{t.report.currentStatus}</span>
              <StatusBadge status={submittedReport.status} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted font-bold">Points Earned</span>
              <span className="text-xs font-black text-safety bg-safety/10 px-2 py-0.5 rounded-full">
                +25 Reputation Points
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href={`/report/${submittedReport.id}`}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy hover:bg-navy-dark text-white font-bold text-sm shadow-md transition"
            >
              {t.report.viewReportBtn}
            </Link>
            <Link
              href="/map"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-safety hover:bg-safety-hover text-white font-bold text-sm shadow-md transition"
            >
              {t.report.backToMapBtn}
            </Link>
            <button
              onClick={() => {
                setCurrentStep(1);
                setTitle('');
                setDescription('');
                setSubmittedReport(null);
              }}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition"
            >
              {t.report.submitAnotherBtn}
            </button>
          </div>
        </div>
      )}

      {/* STEPPED REPORT FORM (Steps 1 to 5) */}
      {currentStep <= 5 && (
        <div className="bg-white rounded-3xl shadow-card border border-surface-border overflow-hidden">
          {/* Form Header & Step Progress Bar */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-navy to-navy-light text-white border-b border-navy-subtle">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-safety">
                  Civic Hazard Dispatch
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {t.report.newReportTitle}
                </h1>
              </div>
              <span className="text-xs font-mono font-bold bg-white/10 px-3 py-1 rounded-full border border-white/20">
                Step {currentStep} of 5
              </span>
            </div>

            {/* Stepper Dots */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {[
                t.report.step1,
                t.report.step2,
                t.report.step3,
                t.report.step4,
                t.report.step5,
              ].map((name, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;

                return (
                  <div key={idx} className="space-y-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-safety'
                          : isCurrent
                          ? 'bg-amber-400'
                          : 'bg-white/20'
                      }`}
                    />
                    <p
                      className={`text-[11px] truncate font-bold hidden sm:block ${
                        isCurrent ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* STEP 1: CATEGORY SELECTION */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-navy">
                    {t.report.selectCategory}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {t.report.selectCategorySub}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id;
                    const isEmergencyCategory = cat.id === 'fire' || cat.id === 'medical';

                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                          isSelected
                            ? 'border-safety bg-safety-light/70 shadow-md ring-2 ring-safety'
                            : 'border-surface-border bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform">
                            {cat.icon}
                          </span>
                          {isEmergencyCategory && (
                            <span className="text-[9px] uppercase font-black px-1.5 py-0.5 rounded bg-emergency text-white">
                              999
                            </span>
                          )}
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-safety text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className="font-extrabold text-xs sm:text-sm text-navy">
                            {language === 'en' ? cat.nameEn : cat.nameBn}
                          </p>
                          <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                            {language === 'en' ? cat.descriptionEn : cat.descriptionBn}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2: PHOTO UPLOAD */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-navy">
                    {t.report.uploadTitle}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {t.report.uploadSub}
                  </p>
                </div>

                {/* Upload & Drag Drop Area */}
                <div className="border-2 border-dashed border-slate-300 rounded-3xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 mx-auto flex items-center justify-center text-navy">
                    <Camera className="w-8 h-8 text-navy" />
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-bold text-navy">
                      {t.report.dragDropText}
                    </p>
                    <p className="text-xs text-muted">
                      Supports JPG, PNG, WEBP up to 12MB. Geotag metadata extracted automatically.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-bold shadow-sm transition">
                      <Camera className="w-4 h-4" />
                      <span>{t.report.takePhoto}</span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const tempUrl = URL.createObjectURL(file);
                            setImageUrl(tempUrl);
                          }
                        }}
                      />
                    </label>

                    <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 shadow-2xs transition">
                      <Upload className="w-4 h-4" />
                      <span>{t.report.uploadImage}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const tempUrl = URL.createObjectURL(file);
                            setImageUrl(tempUrl);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Image Preview & Quick Sample Test Selector */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-600">
                    {t.report.useSamplePhoto}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {samplePhotos.map((sample, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setImageUrl(sample.url);
                          setSelectedCategory(sample.category);
                        }}
                        className={`relative rounded-2xl overflow-hidden border-2 text-left group transition-all ${
                          imageUrl === sample.url
                            ? 'border-safety ring-2 ring-safety shadow-md'
                            : 'border-surface-border hover:border-slate-400'
                        }`}
                      >
                        <img
                          src={sample.url}
                          alt={sample.label}
                          className="h-24 w-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                          <span className="text-[11px] font-bold text-white">
                            {sample.label}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: AI ANALYSIS */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-navy">
                    {t.report.aiAnalysisTitle}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Automated computer vision hazard triage
                  </p>
                </div>

                {/* Processing State Animation */}
                {isAiAnalyzing ? (
                  <div className="p-12 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-safety/30 border-t-safety animate-spin" />
                      <Sparkles className="w-8 h-8 text-safety absolute inset-0 m-auto animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-navy">
                        {t.report.aiAnalyzing}
                      </h4>
                      <p className="text-xs text-muted mt-1">
                        Extracting pavement fissures, water boundaries, and obstacle vectors...
                      </p>
                    </div>
                  </div>
                ) : (
                  /* AI Results Card */
                  <div className="rounded-3xl bg-slate-50 border border-slate-200 overflow-hidden shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                      {/* Left: Analyzed Image with AI Bounding Overlay */}
                      <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 h-56 md:h-auto">
                        <img
                          src={imageUrl}
                          alt="Analyzed Evidence"
                          className="w-full h-full object-cover"
                        />
                        {/* Simulated AI Detection Box Overlay */}
                        <div className="absolute inset-6 border-2 border-emerald-400 rounded-xl bg-emerald-500/10 pointer-events-none flex items-start justify-between p-2">
                          <span className="bg-emerald-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                            {aiConfidence}% MATCH
                          </span>
                        </div>
                      </div>

                      {/* Right: Detected Attributes */}
                      <div className="md:col-span-7 space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-muted">
                              Identified Hazard
                            </span>
                            <h4 className="text-lg font-black text-navy">
                              {selectedCategory.replace('_', ' ').toUpperCase()} HAZARD
                            </h4>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] uppercase font-bold text-muted">
                              Confidence
                            </span>
                            <p className="text-lg font-black text-safety font-mono">
                              {aiConfidence}%
                            </p>
                          </div>
                        </div>

                        {/* Identified Risks */}
                        <div>
                          <span className="text-xs font-bold text-navy block mb-1.5">
                            {t.report.aiRisks}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {aiRisks.map((risk, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-slate-700 font-medium shadow-2xs"
                              >
                                ⚠️ {risk}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Suggested Severity & Category */}
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div className="p-3 rounded-xl bg-white border border-slate-200">
                            <span className="text-[10px] text-muted font-bold block">
                              {t.report.aiSuggestedSeverity}
                            </span>
                            <div className="mt-1">
                              <SeverityBadge severity={aiSuggestedSeverity} size="sm" />
                            </div>
                          </div>
                          <div className="p-3 rounded-xl bg-white border border-slate-200">
                            <span className="text-[10px] text-muted font-bold block">
                              {t.report.aiSuggestedCategory}
                            </span>
                            <p className="text-xs font-bold text-navy mt-1 truncate">
                              {selectedCategory.replace('_', ' ')}
                            </p>
                          </div>
                        </div>

                        {/* AI Confirmation Controls */}
                        <div className="pt-2 flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setCurrentStep(4)}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-safety hover:bg-safety-hover text-white text-xs font-extrabold shadow-sm transition flex items-center justify-center gap-1.5"
                          >
                            <Check className="w-4 h-4" />
                            <span>{t.report.aiLooksCorrect}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setCurrentStep(1)}
                            className="py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-300 transition"
                          >
                            {t.report.aiChangeCategory}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Disclaimer Banner */}
                    <div className="p-3 bg-amber-50/70 border-t border-amber-200/80 text-[11px] text-amber-900 flex items-center gap-2">
                      <Info className="w-4 h-4 text-amber-700 shrink-0" />
                      <span>{t.report.aiAssistantNotice}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: LOCATION PINNING */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-navy">
                      {t.report.locationTitle}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {t.report.dragPinNotice}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleUseMyLocation}
                    disabled={isLocating}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-bold shadow-sm transition disabled:opacity-50"
                  >
                    <MapPin className="w-3.5 h-3.5 text-safety" />
                    <span>{isLocating ? 'Detecting GPS...' : t.report.useMyLocation}</span>
                  </button>
                </div>

                {/* Interactive Map Visual Pin Canvas */}
                <div className="relative h-72 sm:h-80 w-full rounded-3xl bg-slate-900 overflow-hidden border border-slate-700 shadow-md">
                  {/* Subtle Grid Simulation */}
                  <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="loc-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#38BDF8" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#loc-grid)" />
                  </svg>

                  {/* Centered Draggable-style Pin */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
                    <div className="px-3 py-1 rounded-full bg-navy text-white text-[11px] font-black shadow-lg border border-white/20 whitespace-nowrap mb-1">
                      📍 {locationName.split(',')[0]}
                    </div>
                    <div className="relative">
                      <span className="absolute -inset-2 rounded-full bg-emergency/40 animate-ping" />
                      <div className="w-8 h-8 rounded-full bg-emergency text-white flex items-center justify-center shadow-emergency border-2 border-white">
                        <MapPin className="w-5 h-5 fill-white text-emergency" />
                      </div>
                    </div>
                    <div className="w-3 h-1.5 rounded-full bg-black/50 blur-[2px] mt-0.5" />
                  </div>

                  {/* Dhaka Neighborhood Selector Pills */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap gap-2">
                    {[
                      { name: 'Mirpur Road', lat: 23.8041, lng: 90.3667, area: 'Mirpur' },
                      { name: 'Dhanmondi 27', lat: 23.7538, lng: 90.3752, area: 'Dhanmondi' },
                      { name: 'Uttara Sector 7', lat: 23.8759, lng: 90.3795, area: 'Uttara' },
                      { name: 'Gulshan Avenue', lat: 23.7897, lng: 90.4158, area: 'Gulshan' },
                      { name: 'Motijheel C/A', lat: 23.7289, lng: 90.4172, area: 'Motijheel' },
                    ].map((loc, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setLocationName(`${loc.name}, Dhaka`);
                          setLatitude(loc.lat);
                          setLongitude(loc.lng);
                          setArea(loc.area);
                        }}
                        className={`text-[11px] font-bold px-3 py-1 rounded-full transition shadow-sm ${
                          area === loc.area
                            ? 'bg-safety text-white'
                            : 'bg-navy-dark/80 text-slate-200 hover:bg-navy-dark border border-white/10'
                        }`}
                      >
                        {loc.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location Display & Privacy Protection Note */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs text-muted font-bold block mb-1">
                      {t.report.addressDetected}
                    </span>
                    <input
                      type="text"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      className="w-full text-sm font-bold text-navy bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-safety focus:outline-none"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-muted font-bold block mb-1">
                        {t.report.coordinates}
                      </span>
                      <p className="text-sm font-mono font-bold text-navy">
                        {latitude}° N, {longitude}° E
                      </p>
                    </div>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-1 rounded-md">
                      Dhaka Zone
                    </span>
                  </div>
                </div>

                {/* Privacy Safeguard Message */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
                  <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                  <p>{t.report.privacyMessage}</p>
                </div>
              </div>
            )}

            {/* STEP 5: DESCRIPTION & DETAILS */}
            {currentStep === 5 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-navy">
                    {t.report.detailsTitle}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Provide accurate details to help responders take quick action.
                  </p>
                </div>

                {/* DUPLICATE WARNING CALLOUT (If detected) */}
                {duplicateMatch?.isDuplicate && duplicateMatch.matchedReport && (
                  <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>{t.duplicate.title}</span>
                    </div>
                    <p className="text-xs text-amber-900">
                      {t.duplicate.subtitle} (<strong>{duplicateMatch.matchedReport.title}</strong>, approx {duplicateMatch.distanceMeters}m away).
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-2 text-center text-xs font-bold text-amber-900">
                      <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                        <span className="text-[10px] text-muted block">{t.duplicate.distance}</span>
                        {duplicateMatch.distanceMeters}m
                      </div>
                      <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                        <span className="text-[10px] text-muted block">{t.duplicate.similarity}</span>
                        94%
                      </div>
                      <div className="bg-white/80 p-2 rounded-lg border border-amber-200">
                        <span className="text-[10px] text-muted block">{t.duplicate.existingConfirmations}</span>
                        {duplicateMatch.matchedReport.confirmationsCount} people
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          verifyReport(duplicateMatch.matchedReport!.id, 'confirm');
                          router.push(`/report/${duplicateMatch.matchedReport!.id}`);
                        }}
                        className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition"
                      >
                        {t.duplicate.confirmExisting}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDuplicateMatch({ isDuplicate: false })}
                        className="py-2 px-3 rounded-xl bg-white text-slate-700 border border-slate-300 text-xs font-semibold hover:bg-slate-50 transition"
                      >
                        {t.duplicate.createSeparate}
                      </button>
                    </div>
                  </div>
                )}

                {/* Title Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-navy uppercase tracking-wider">
                    {t.report.titleInputLabel} <span className="text-emergency">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t.report.titlePlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-safety focus:outline-none"
                  />
                </div>

                {/* Description Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-navy uppercase tracking-wider">
                    {t.report.descriptionLabel} <span className="text-emergency">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.report.descriptionPlaceholder}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-safety focus:outline-none"
                  />
                </div>

                {/* When noticed */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-navy uppercase tracking-wider">
                    {t.report.whenNoticed}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'just_now', label: t.report.justNow },
                      { id: 'today', label: t.report.today },
                      { id: 'yesterday', label: t.report.yesterday },
                      { id: 'week_ago', label: t.report.weekAgo },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setTimeNoticed(item.id as any)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                          timeNoticed === item.id
                            ? 'bg-navy text-white border-navy'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Severity Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-navy uppercase tracking-wider">
                    {t.report.severityLabel}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { id: 'low' as SeverityLevel, label: t.report.severityLow, color: 'border-slate-300' },
                      { id: 'medium' as SeverityLevel, label: t.report.severityMedium, color: 'border-amber-300' },
                      { id: 'high' as SeverityLevel, label: t.report.severityHigh, color: 'border-orange-400' },
                      { id: 'emergency' as SeverityLevel, label: t.report.severityEmergency, color: 'border-emergency bg-emergency/5' },
                    ].map((sev) => (
                      <button
                        type="button"
                        key={sev.id}
                        onClick={() => {
                          setSeverity(sev.id);
                          if (sev.id === 'emergency') {
                            setShowEmergencyModal(true);
                          }
                        }}
                        className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition ${
                          severity === sev.id
                            ? 'ring-2 ring-navy border-navy shadow-sm bg-slate-50'
                            : `${sev.color} hover:bg-slate-50`
                        }`}
                      >
                        <span className="text-xs font-bold text-navy">{sev.label}</span>
                        <SeverityBadge severity={sev.id} size="sm" showIcon={false} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Emergency Warning Card if Emergency is active */}
                {(severity === 'emergency' || selectedCategory === 'fire' || selectedCategory === 'medical') && (
                  <div className="p-4 rounded-2xl bg-emergency-light border border-emergency/40 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emergency text-white flex items-center justify-center shrink-0">
                        <PhoneCall className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-emergency uppercase">
                          Immediate Danger?
                        </h4>
                        <p className="text-xs text-darktext">
                          Nirapod BD is for community problem solving. For life rescue, call 999 immediately.
                        </p>
                      </div>
                    </div>
                    <a
                      href="tel:999"
                      className="shrink-0 px-4 py-2 rounded-xl bg-emergency text-white text-xs font-extrabold shadow hover:bg-emergency-hover transition"
                    >
                      Call 999
                    </a>
                  </div>
                )}

                {/* Final Submit Button */}
                <div className="pt-4 border-t border-slate-200">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-emergency hover:bg-emergency-hover text-white text-base font-black shadow-emergency transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                  >
                    <span>{t.report.submitBtn}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            )}

            {/* Stepper Navigation Buttons (Steps 1 to 4) */}
            {currentStep < 5 && (
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                  disabled={currentStep === 1}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-black shadow-md transition flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
