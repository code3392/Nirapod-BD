'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/lib/data/categories';
import { CategoryId, SeverityLevel, Report } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import SeverityBadge from '@/components/common/SeverityBadge';
import EmergencyAlertModal from '@/components/common/EmergencyAlertModal';
import { getNearestPolice, getNearestAmbulance } from '@/lib/data/emergencyDirectory';
import { 
  Camera, 
  Video, 
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
  Eye,
  Share2,
  MessageCircle,
  Building,
  Hospital,
  ShieldCheck,
  FileCheck,
  Radio,
  ExternalLink,
  Flame,
  AlertOctagon
} from 'lucide-react';

export default function ReportForm() {
  const router = useRouter();
  const { 
    language, 
    t, 
    user, 
    addReport, 
    verifyReport, 
    checkDuplicateReport, 
    submitCitizenProofOfWork 
  } = useApp();

  // Current Step: 1 to 5, or 6 (Success)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('road_traffic');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaUrl, setMediaUrl] = useState<string>('');
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
  const [locationPill, setLocationPill] = useState<string>('Mirpur');

  // Details State
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [timeNoticed, setTimeNoticed] = useState<'just_now' | 'today' | 'yesterday' | 'week_ago'>('today');
  const [severity, setSeverity] = useState<SeverityLevel>('high');

  // Modal / Warnings
  const [showEmergencyModal, setShowEmergencyModal] = useState<boolean>(false);
  const [duplicateMatch, setDuplicateMatch] = useState<{ isDuplicate: boolean; matchedReport?: Report; distanceMeters?: number } | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Submission Result
  const [submittedReport, setSubmittedReport] = useState<Report | null>(null);

  // Rule 25: Proof of work submission modal state
  const [showWorkProofModal, setShowWorkProofModal] = useState<boolean>(false);
  const [workProofUrl, setWorkProofUrl] = useState<string>('');
  const [workProofType, setWorkProofType] = useState<'image' | 'video'>('image');
  const [workProofComment, setWorkProofComment] = useState<string>('Repaired and verified clear by neighborhood team.');
  const [workProofSuccess, setWorkProofSuccess] = useState<boolean>(false);

  // Sample media presets for testing
  const sampleMediaItems = [
    {
      type: 'image' as const,
      category: 'road_traffic' as CategoryId,
      url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      label: '📷 Pothole (Photo)',
      detected: 'Road / Traffic Hazard',
      risks: ['Vehicle wheel damage', 'Motorcycle crash hazard', 'Traffic bottleneck'],
      suggestedSev: 'high' as SeverityLevel,
      suggestedTitle: 'Dangerous Road Cave-in on Mirpur 10 Crossing',
    },
    {
      type: 'video' as const,
      category: 'waterlogging' as CategoryId,
      url: 'https://assets.mixkit.co/videos/preview/mixkit-rain-falling-on-the-water-of-a-lake-17482-large.mp4',
      label: '🎥 Water Flow (Video)',
      detected: 'Urban Waterlogging / Blocked Drain',
      risks: ['Submerged manhole danger', 'Traffic standstill', 'Contaminated water'],
      suggestedSev: 'high' as SeverityLevel,
      suggestedTitle: 'Submerged Roadway & Clogged Stormwater Drain',
    },
    {
      type: 'video' as const,
      category: 'electrical' as CategoryId,
      url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-an-electrician-fixing-cables-42171-large.mp4',
      label: '🎥 Cable Hazard (Video)',
      detected: 'Overhead High-Voltage Risk',
      risks: ['Electrocution danger', 'Short circuit spark', 'Transformer blowout'],
      suggestedSev: 'emergency' as SeverityLevel,
      suggestedTitle: 'Snapped Hanging Live Electric Cable Near Footpath',
    },
    {
      type: 'image' as const,
      category: 'waste' as CategoryId,
      url: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
      label: '📷 Waste Spill (Photo)',
      detected: 'Unsanitary Waste Spill',
      risks: ['Disease vector breeding', 'Drain obstruction', 'Public foul odor'],
      suggestedSev: 'medium' as SeverityLevel,
      suggestedTitle: 'Overflowing Municipal Garbage Pile on Walkway',
    },
  ];

  // AI analysis simulation
  const triggerAiAnalysis = () => {
    setIsAiAnalyzing(true);
    setAiAnalysisComplete(false);

    const match = sampleMediaItems.find(p => p.category === selectedCategory) || sampleMediaItems[0];

    setTimeout(() => {
      setAiConfidence(Math.floor(91 + Math.random() * 7));
      setAiRisks(match.risks);
      setAiSuggestedSeverity(match.suggestedSev);
      setAiSuggestedCategory(match.category);
      if (!title) setTitle(match.suggestedTitle);
      setIsAiAnalyzing(false);
      setAiAnalysisComplete(true);
    }, 1400);
  };

  const handleCategorySelect = (catId: CategoryId) => {
    setSelectedCategory(catId);
    if (catId === 'fire' || catId === 'medical') {
      setShowEmergencyModal(true);
    }
  };

  // GPS Auto-Locate Button with Radar Simulation
  const handleUseMyLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = Number(position.coords.latitude.toFixed(4));
          const lng = Number(position.coords.longitude.toFixed(4));
          setLatitude(lat);
          setLongitude(lng);
          setLocationName(`Auto-Located GPS (${lat}, ${lng}), Mirpur Sector 10, Dhaka`);
          setArea('Mirpur');
          setLocationPill('Mirpur');
          setIsLocating(false);
        },
        () => {
          // Fallback to Dhaka central
          setLatitude(23.8041);
          setLongitude(90.3667);
          setLocationName('Mirpur Road, Near Mirpur-10 Roundabout, Dhaka');
          setArea('Mirpur');
          setLocationPill('Mirpur');
          setIsLocating(false);
        },
        { timeout: 7000 }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handleNextStep = () => {
    if (currentStep === 2) {
      setCurrentStep(3);
      triggerAiAnalysis();
      return;
    }

    if (currentStep === 4) {
      const dup = checkDuplicateReport(latitude, longitude, selectedCategory);
      if (dup.isDuplicate) {
        setDuplicateMatch(dup);
      }
      setCurrentStep(5);
      return;
    }

    setCurrentStep(prev => Math.min(prev + 1, 5));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    // Rule 25 check: if user has unresolvedReportIdForWorkProof, block immediately
    if (user?.unresolvedReportIdForWorkProof) {
      setShowWorkProofModal(true);
      return;
    }

    if (severity === 'emergency' && !showEmergencyModal) {
      setShowEmergencyModal(true);
    }

    const result = addReport({
      categoryId: selectedCategory,
      mediaType,
      mediaUrl,
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

    if (!result.success) {
      setSubmissionError(result.errorReason || 'Report could not be submitted. Please check community guidelines.');
      return;
    }

    if (result.report) {
      setSubmittedReport(result.report);
      setCurrentStep(6);
    }
  };

  // Rule 25 Proof-of-work submit handler
  const handleResolveWorkProof = () => {
    if (user?.unresolvedReportIdForWorkProof) {
      submitCitizenProofOfWork(
        user.unresolvedReportIdForWorkProof,
        workProofUrl,
        workProofType,
        workProofComment
      );
      setWorkProofSuccess(true);
      setTimeout(() => {
        setShowWorkProofModal(false);
        setWorkProofSuccess(false);
      }, 1500);
    }
  };

  // Nearest Thana & Ambulance lookup for active area
  const nearestPolice = getNearestPolice(area);
  const nearestAmbulance = getNearestAmbulance(area);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Emergency Alert Modal */}
      <EmergencyAlertModal
        isOpen={showEmergencyModal}
        onClose={() => setShowEmergencyModal(false)}
        onContinue={() => setShowEmergencyModal(false)}
      />

      {/* RULE 25 BLOCKING BANNER / MODAL */}
      {user?.unresolvedReportIdForWorkProof && (
        <div className="mb-8 p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/40 backdrop-blur-md shadow-card space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-lg">
              <FileCheck className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white tracking-wider">
                  Mandatory Civic Rule 25
                </span>
                <span className="text-xs font-bold text-amber-700">Verification Pending</span>
              </div>
              <h3 className="text-lg font-black text-navy mt-1">
                Upload Photo/Video Proof of Completed Work to Unlock New Reports
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                You previously reported ticket <strong className="font-mono text-navy">{user.unresolvedReportIdForWorkProof}</strong> which was marked repaired/resolved. Under Nirapod BD civic integrity guidelines, citizens must submit photographic or video verification of the done work before creating any further civic hazard requests.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setShowWorkProofModal(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Submit Work Proof Now</span>
            </button>
            <Link
              href={`/report/${user.unresolvedReportIdForWorkProof}`}
              className="px-4 py-2.5 rounded-xl bg-white text-navy font-bold text-xs border border-slate-200 hover:bg-slate-50 transition"
            >
              View Ticket Details
            </Link>
          </div>
        </div>
      )}

      {/* RULE 25 PROOF UPLOAD MODAL */}
      {showWorkProofModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#150D28] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-white/15 space-y-5 animate-in zoom-in-95 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-white text-base">Civic Work Verification (Rule 25)</h3>
                  <p className="text-[11px] text-slate-400">Ticket: {user?.unresolvedReportIdForWorkProof}</p>
                </div>
              </div>
              <button
                onClick={() => setShowWorkProofModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white transition"
              >
                ✕
              </button>
            </div>

            {workProofSuccess ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <h4 className="text-lg font-black text-white">Work Proof Accepted!</h4>
                <p className="text-xs text-slate-400">+20 Reputation Points Awarded. Reporting unlocked.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white">Media Type</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setWorkProofType('image')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        workProofType === 'image' ? 'bg-purple-600 text-white border-purple-500' : 'bg-white/5 border-white/10 text-slate-300'
                      }`}
                    >
                      📷 Photo Evidence
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkProofType('video')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition ${
                        workProofType === 'video' ? 'bg-purple-600 text-white border-purple-500' : 'bg-white/5 border-white/10 text-slate-300'
                      }`}
                    >
                      🎥 Video Evidence
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white">Upload Photo / Video or Use URL</label>
                  <input
                    type="text"
                    value={workProofUrl}
                    onChange={(e) => setWorkProofUrl(e.target.value)}
                    placeholder="https://... or choose file below"
                    className="w-full px-3 py-2 text-xs border border-white/15 bg-white/5 text-white placeholder-slate-400 rounded-xl focus:outline-none focus:border-purple-400"
                  />
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setWorkProofUrl(URL.createObjectURL(file));
                        setWorkProofType(file.type.startsWith('video') ? 'video' : 'image');
                      }
                    }}
                    className="text-xs text-slate-300 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-white/10 file:text-white cursor-pointer"
                  />
                </div>

                {/* Media Preview */}
                <div className="h-40 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
                  {workProofType === 'video' ? (
                    <video src={workProofUrl} controls className="w-full h-full object-cover" />
                  ) : (
                    <img src={workProofUrl} alt="Proof" className="w-full h-full object-cover" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-white">Citizen Verification Comments</label>
                  <textarea
                    rows={2}
                    value={workProofComment}
                    onChange={(e) => setWorkProofComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-white/15 bg-white/5 text-white placeholder-slate-400 rounded-xl focus:outline-none focus:border-purple-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleResolveWorkProof}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md transition"
                >
                  Verify Work & Unlock Reporting
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ERROR BANNER */}
      {submissionError && (
        <div className="mb-6 p-4 rounded-2xl bg-emergency/10 border border-emergency/30 text-emergency text-xs font-bold flex items-center gap-3">
          <AlertOctagon className="w-5 h-5 shrink-0" />
          <span>{submissionError}</span>
        </div>
      )}

      {/* SUCCESS SCREEN (Step 6) */}
      {currentStep === 6 && submittedReport && (
        <div className="bg-[#130C24]/85 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 text-center space-y-6 animate-in zoom-in-95 duration-200 text-white">
          <div className="w-20 h-20 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 mx-auto flex items-center justify-center shadow-lg animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-sky-400" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Broadcast Active
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">
              {t.report.successTitle}
            </h2>
            <p className="text-slate-300 max-w-md mx-auto text-sm">
              {t.report.successSubtitle}
            </p>
          </div>

          {/* Ticket ID Box */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#150D28] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold">{t.report.reportId}</span>
              <span className="text-base font-black font-mono text-white bg-white/5 px-3 py-1 rounded-lg border border-white/10 shadow-sm">
                {submittedReport.publicId}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold">{t.report.currentStatus}</span>
              <StatusBadge status={submittedReport.status} size="sm" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold">Media Uploaded</span>
              <span className="text-xs font-bold text-white uppercase bg-white/10 px-2 py-0.5 rounded border border-white/10">
                {submittedReport.mediaType}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-bold">Reputation Award</span>
              <span className="text-xs font-black text-sky-400 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-500/30">
                +25 Points
              </span>
            </div>
          </div>

          {/* REQUIREMENT 11: NEAREST POLICE & AMBULANCE DISPATCH CARD */}
          <div className="max-w-xl mx-auto p-5 rounded-2xl bg-gradient-to-r from-navy to-navy-dark text-white text-left space-y-4 shadow-lg border border-navy-subtle">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-emergency" />
                <h4 className="text-sm font-black tracking-wide">Emergency Services For {submittedReport.area}</h4>
              </div>
              <span className="text-[10px] bg-emergency text-white font-extrabold px-2 py-0.5 rounded-full uppercase">
                Auto-Detected
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Nearest Police Thana */}
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                  <Building className="w-4 h-4" />
                  <span className="truncate">{submittedReport.nearestPolice?.thanaName || nearestPolice.thanaName}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Duty Officer: <strong className="text-white">{submittedReport.nearestPolice?.dutyOfficerName || nearestPolice.dutyOfficerName || 'Duty Officer'}</strong>
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-white font-bold">
                    {submittedReport.nearestPolice?.hotlineMobile || nearestPolice.hotlineMobile || nearestPolice.dutyOfficerMobile}
                  </span>
                  <a
                    href={`tel:${submittedReport.nearestPolice?.hotlineMobile || nearestPolice.hotlineMobile || nearestPolice.dutyOfficerMobile}`}
                    className="px-2 py-1 bg-emergency hover:bg-emergency-hover text-white text-[10px] font-bold rounded-lg transition"
                  >
                    Call Thana
                  </a>
                </div>
              </div>

              {/* Nearest Ambulance / Hospital */}
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                  <Hospital className="w-4 h-4" />
                  <span className="truncate">{submittedReport.nearestAmbulance?.hospitalName || nearestAmbulance.hospitalName}</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  ICU Units: <strong className="text-white">{(submittedReport.nearestAmbulance?.icuAvailable || nearestAmbulance.icuAvailable) ? 'Available' : 'Limited'}</strong>
                </p>
                <div className="pt-1 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-white font-bold">
                    {submittedReport.nearestAmbulance?.emergencyHotline || nearestAmbulance.emergencyHotline || nearestAmbulance.emergencyPhone}
                  </span>
                  <a
                    href={`tel:${submittedReport.nearestAmbulance?.emergencyHotline || nearestAmbulance.emergencyHotline || nearestAmbulance.emergencyPhone}`}
                    className="px-2 py-1 bg-civic-blue hover:bg-blue-700 text-white text-[10px] font-bold rounded-lg transition"
                  >
                    Call 16263
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* REQUIREMENT 5 & 6: VOLUNTEER EMAIL DISPATCH & WHATSAPP SHARING */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-blue-50 border border-blue-200 text-left space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-civic-blue animate-pulse" />
                <span className="text-xs font-black text-navy uppercase">
                  Community Volunteer Dispatch
                </span>
              </div>
              <span className="text-[10px] bg-civic-blue text-white font-bold px-2 py-0.5 rounded-full">
                Auto-Sent
              </span>
            </div>

            <p className="text-xs text-slate-600">
              Email alert automatically dispatched to verified local helpers in <strong>{submittedReport.area}</strong>.
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {/* WhatsApp Share Button */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`[Nirapod BD Hazard Alert] ${submittedReport.title} at ${submittedReport.locationName}. Public ID: ${submittedReport.publicId}. View report: https://nirapodbd.gov.bd/report/${submittedReport.id}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy hover:bg-navy-dark text-white font-bold text-xs shadow-sm transition"
              >
                <MessageCircle className="w-4 h-4 text-sky-400" />
                <span>Share Alert on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://nirapodbd.gov.bd/report/${submittedReport.id}`);
                  alert('Report URL copied to clipboard!');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Link</span>
              </button>
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
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-civic-blue hover:bg-blue-700 text-white font-bold text-sm shadow-md transition"
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
        <div className="bg-[#130C24]/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden text-white">
          {/* Form Header & Step Progress Bar */}
          <div className="p-6 sm:p-8 bg-[#150D28] text-white border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400">
                  Civic Hazard Dispatch
                </span>
                <h2 className="text-2xl font-black tracking-tight mt-0.5">
                  {t.report.newReportTitle}
                </h2>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Step</span>
                <span className="text-lg font-black text-sky-400 font-mono">
                  {currentStep} / 5
                </span>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            <div className="grid grid-cols-5 gap-2 pt-2">
              {['Category', 'Media', 'AI Scan', 'Pin Location', 'Submit'].map((stepName, idx) => {
                const stepNum = idx + 1;
                const isCompleted = stepNum < currentStep;
                const isCurrent = stepNum === currentStep;

                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="h-1.5 rounded-full overflow-hidden bg-white/20">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isCompleted || isCurrent ? 'bg-civic-blue' : ''
                        }`}
                      />
                    </div>
                    <span
                      className={`text-[10px] font-bold block truncate ${
                        isCurrent
                          ? 'text-white'
                          : isCompleted
                          ? 'text-sky-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {stepName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form Steps Body */}
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
                            ? 'border-civic-blue bg-blue-50 shadow-md ring-2 ring-civic-blue'
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
                            <div className="w-5 h-5 rounded-full bg-civic-blue text-white flex items-center justify-center">
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

            {/* STEP 2: PHOTO OR VIDEO UPLOAD (Requirement 1) */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-navy">
                      Upload Photo or Video Evidence
                    </h3>
                    <p className="text-sm text-slate-500">
                      Snap or upload visual evidence of the civic problem.
                    </p>
                  </div>
                  
                  {/* Media Type Switcher */}
                  <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setMediaType('image')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                        mediaType === 'image' ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:text-navy'
                      }`}
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaType('video')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                        mediaType === 'video' ? 'bg-navy text-white shadow-sm' : 'text-slate-600 hover:text-navy'
                      }`}
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Video</span>
                    </button>
                  </div>
                </div>

                {/* Upload & Drag Drop Area */}
                <div className="border-2 border-dashed border-slate-300 rounded-3xl p-6 sm:p-8 text-center bg-slate-50/50 hover:bg-slate-50 transition space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-200 mx-auto flex items-center justify-center text-navy">
                    {mediaType === 'video' ? <Video className="w-8 h-8 text-navy" /> : <Camera className="w-8 h-8 text-navy" />}
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-bold text-navy">
                      {mediaType === 'video' ? 'Drag & drop hazard video clip' : t.report.dragDropText}
                    </p>
                    <p className="text-xs text-muted">
                      Supports MP4, MOV, WEBM, JPG, PNG up to 25MB.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy hover:bg-navy-dark text-white text-xs font-bold shadow-sm transition">
                      {mediaType === 'video' ? <Video className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                      <span>{mediaType === 'video' ? 'Upload Video Clip' : t.report.takePhoto}</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const isVid = file.type.startsWith('video');
                            setMediaType(isVid ? 'video' : 'image');
                            setMediaUrl(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>

                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition">
                      <Upload className="w-4 h-4" />
                      <span>{t.report.uploadImage}</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const isVid = file.type.startsWith('video');
                            setMediaType(isVid ? 'video' : 'image');
                            setMediaUrl(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </div>

                  {/* Instant Test Presets */}
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-[11px] font-bold text-slate-400 block mb-2">
                      Or select sample test evidence:
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {sampleMediaItems.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setMediaType(item.type);
                            setMediaUrl(item.url);
                            setSelectedCategory(item.category);
                          }}
                          className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition ${
                            mediaUrl === item.url
                              ? 'bg-navy text-white border-navy shadow-sm'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Evidence Preview Box */}
                {mediaUrl && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-navy">
                      <span>Evidence Preview ({mediaType.toUpperCase()})</span>
                      <span className="text-civic-blue flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Media Ready
                      </span>
                    </div>
                    <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-black border border-slate-200 shadow-md">
                      {mediaType === 'video' ? (
                        <video
                          src={mediaUrl}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={mediaUrl}
                          alt="Hazard preview"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: AI ANALYSIS & VISION */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-extrabold text-navy">
                    {t.report.aiAnalysisTitle}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Neural vision scanning for civic risk categorization and severity rating.
                  </p>
                </div>

                {/* Loading / Scanning Simulation */}
                {isAiAnalyzing && (
                  <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-civic-blue/20 animate-ping" />
                      <div className="w-16 h-16 rounded-full border-4 border-civic-blue border-t-transparent animate-spin flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-civic-blue" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-navy">
                        {t.report.aiAnalyzing}
                      </h4>
                      <p className="text-xs text-muted mt-1">
                        Scanning Dhaka urban taxonomy, hazard boundaries, and depth...
                      </p>
                    </div>
                  </div>
                )}

                {/* Completed AI Analysis Card */}
                {aiAnalysisComplete && !isAiAnalyzing && (
                  <div className="bg-slate-50/70 border border-slate-200 rounded-3xl overflow-hidden space-y-0">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      {/* Left: Media Thumbnail */}
                      <div className="md:col-span-5 relative h-48 rounded-2xl overflow-hidden bg-black border border-slate-200">
                        {mediaType === 'video' ? (
                          <video src={mediaUrl} className="w-full h-full object-cover" />
                        ) : (
                          <img src={mediaUrl} alt="Analyzed" className="w-full h-full object-cover" />
                        )}
                        <div className="absolute top-2 left-2 bg-navy/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          AI SCANNED
                        </div>
                        <div className="absolute bottom-2 right-2">
                          <span className="bg-civic-blue text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                            {aiConfidence}% CONFIDENCE
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
                            <p className="text-lg font-black text-civic-blue font-mono">
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
                            className="flex-1 py-2.5 px-4 rounded-xl bg-civic-blue hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition flex items-center justify-center gap-1.5"
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

            {/* STEP 4: LOCATION PINNING (Requirement 2: Auto locate location button) */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-extrabold text-navy">
                      {t.report.locationTitle}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Auto-detect GPS or select your neighborhood ward.
                    </p>
                  </div>

                  {/* REQUIREMENT 2: AUTO LOCATE LOCATION BUTTON */}
                  <button
                    type="button"
                    onClick={handleUseMyLocation}
                    disabled={isLocating}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-civic-blue hover:bg-blue-700 text-white text-xs font-black shadow-md transition disabled:opacity-50 relative overflow-hidden group"
                  >
                    <Radio className={`w-4 h-4 ${isLocating ? 'animate-spin' : 'animate-pulse'}`} />
                    <span>{isLocating ? 'Scanning GPS Radar...' : 'Auto-Locate GPS Position'}</span>
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
                      { name: 'Mohammadpur Townhall', lat: 23.7658, lng: 90.3582, area: 'Mohammadpur' },
                      { name: 'Motijheel C/A', lat: 23.7289, lng: 90.4172, area: 'Motijheel' },
                      { name: 'Old Dhaka Sadarghat', lat: 23.7099, lng: 90.4071, area: 'Old Dhaka' },
                    ].map((loc, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setLocationName(`${loc.name}, Dhaka`);
                          setLatitude(loc.lat);
                          setLongitude(loc.lng);
                          setArea(loc.area);
                          setLocationPill(loc.area);
                        }}
                        className={`text-[11px] font-bold px-3 py-1 rounded-full transition shadow-sm ${
                          area === loc.area
                            ? 'bg-civic-blue text-white ring-2 ring-white/40'
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
                      className="w-full text-sm font-bold text-navy bg-white border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-civic-blue focus:outline-none"
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
                      Dhaka Zone ({area})
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
                    Provide accurate details to help community and authorities take quick action.
                  </p>
                </div>

                {/* DUPLICATE WARNING CALLOUT */}
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
                        onClick={() => setDuplicateMatch(null)}
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-civic-blue focus:outline-none"
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
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-civic-blue focus:outline-none"
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
