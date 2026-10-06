'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Report } from '@/types';
import StatusBadge from '@/components/common/StatusBadge';
import SeverityBadge from '@/components/common/SeverityBadge';
import BeforeAfterSlider from '@/components/common/BeforeAfterSlider';
import { getNearestPolice, getNearestAmbulance } from '@/lib/data/emergencyDirectory';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  User, 
  Share2, 
  Bot, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  XCircle, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Building2,
  Copy,
  MessageCircle,
  PhoneCall,
  Hospital,
  Building,
  Video,
  FileCheck,
  Trash2
} from 'lucide-react';

interface ReportDetailProps {
  report: Report;
}

export default function ReportDetail({ report }: ReportDetailProps) {
  const router = useRouter();
  const { language, t, verifyReport, addComment, confirmResolution, user, deleteReport } = useApp();
  const [commentText, setCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [userVoted, setUserVoted] = useState<string | null>(null);

  const isSuperAdmin = user ? (user.email.toLowerCase() === 'smdsami59@gmail.com' || user.isSuperAdmin) : false;
  const isAuthor = user ? user.id === report.userId : false;
  const canDelete = isSuperAdmin || isAuthor;

  const handleDelete = () => {
    if (confirm(language === 'en' ? `Are you sure you want to permanently delete report ${report.publicId}?` : `আপনি কি নিশ্চিত যে রিপোর্ট ${report.publicId} মুছে ফেলতে চান?`)) {
      const res = deleteReport(report.id);
      if (res.success) {
        router.push('/reports');
      }
    }
  };

  const handleVote = (voteType: 'confirm' | 'not_sure' | 'incorrect') => {
    verifyReport(report.id, voteType);
    setUserVoted(voteType);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(report.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const isVideoMedia = report.mediaType === 'video' || (report.mediaUrl && (report.mediaUrl.endsWith('.mp4') || report.mediaUrl.includes('video')));

  // Lookup nearest Police & Ambulance for this area
  const police = report.nearestPolice || getNearestPolice(report.area);
  const ambulance = report.nearestAmbulance || getNearestAmbulance(report.area);

  // Community verification consensus percentage
  const totalVotes = report.confirmationsCount + report.notSureCount + report.incorrectCount;
  const confidencePercent = totalVotes > 0 ? Math.round((report.confirmationsCount / totalVotes) * 100) : 100;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Back Link & Top Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/reports"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'en' ? 'Back to All Reports' : 'সকল রিপোর্টে ফিরে যান'}</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp Share Button */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`[Nirapod BD Hazard Alert] ${report.title} at ${report.locationName}. Public ID: ${report.publicId}. View report: https://nirapodbd.gov.bd/report/${report.id}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
            <span>Share WhatsApp</span>
          </a>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 text-white bg-white/5 hover:bg-white/10 text-xs font-bold shadow transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? (language === 'en' ? 'Link Copied!' : 'লিঙ্ক কপি হয়েছে!') : t.detail.share}</span>
          </button>
          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold shadow-sm transition"
          >
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>{language === 'en' ? 'Locate on Map' : 'মানচিত্রে দেখুন'}</span>
          </Link>

          {canDelete && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600/20 hover:bg-red-600/40 border border-red-500/40 text-red-300 hover:text-white text-xs font-bold shadow-sm transition"
              title="Delete Report"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
              <span>{language === 'en' ? 'Delete Report' : 'রিপোর্ট মুছুন'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Report Header Card */}
      <div className="bg-[#130C24]/85 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/10 space-y-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-black px-2.5 py-1 rounded-lg bg-white/10 text-white font-mono">
              {report.publicId}
            </span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {report.categoryId.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <SeverityBadge severity={report.severity} size="md" />
            <StatusBadge status={report.status} size="md" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
          {report.title}
        </h1>

        {/* Location & Metadata Bar */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 border-y border-white/10 py-3.5">
          <span className="flex items-center gap-1.5 font-semibold">
            <MapPin className="w-4 h-4 text-emergency shrink-0" />
            {report.locationName}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            {new Date(report.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-400" />
            {report.userName}
          </span>
        </div>

        {/* Evidence Media: Photo OR Video OR Before/After Slider if Resolved */}
        {report.status === 'RESOLVED' || report.status === 'COMMUNITY_CONFIRMED' ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-navy uppercase tracking-wider">
                {t.detail.officialResolutionTitle}
              </h3>
              <span className="text-xs font-bold text-civic-blue bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Repaired by {report.assignedOrganization?.name || 'Municipal Agency'}</span>
              </span>
            </div>
            <BeforeAfterSlider
              beforeImage={report.resolution?.beforeImage || report.mediaUrl || report.imageUrl || ''}
              afterImage={report.resolution?.afterImage || report.mediaUrl || report.imageUrl || ''}
              communityConfirmed={report.status === 'COMMUNITY_CONFIRMED' || (report.resolution?.verifiedByCommunityCount || 0) > 0}
              confirmedCount={report.resolution?.verifiedByCommunityCount || 24}
            />
            {report.resolution?.description && (
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-950 space-y-1">
                <span className="font-extrabold uppercase text-[10px] tracking-wider text-blue-800">
                  Maintenance Report Summary:
                </span>
                <p className="text-slate-800">{report.resolution.description}</p>
              </div>
            )}

            {/* Rule 25: Citizen completion proof display */}
            {report.resolution?.citizenCompletionProof && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-civic-blue" />
                  <span className="text-xs font-black text-navy uppercase">
                    Citizen Work Verification (Rule 25 Evidence)
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                  <div className="sm:col-span-4 h-32 rounded-xl overflow-hidden bg-black">
                    {report.resolution.citizenCompletionProof.mediaType === 'video' ? (
                      <video src={report.resolution.citizenCompletionProof.mediaUrl} controls className="w-full h-full object-cover" />
                    ) : (
                      <img src={report.resolution.citizenCompletionProof.mediaUrl} alt="Citizen proof" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="sm:col-span-8 space-y-1 text-xs text-slate-700">
                    <p className="italic font-medium">"{report.resolution.citizenCompletionProof.comments}"</p>
                    <p className="text-[10px] text-muted">
                      Uploaded on {new Date(report.resolution.citizenCompletionProof.uploadedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm max-h-[460px] flex items-center justify-center">
            {isVideoMedia ? (
              <video
                src={report.mediaUrl || report.imageUrl}
                controls
                className="w-full h-full max-h-[460px] object-cover"
              />
            ) : (
              <img
                src={report.mediaUrl || report.imageUrl}
                alt={report.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="text-xs uppercase font-extrabold px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20">
                {isVideoMedia ? 'Video Evidence' : t.detail.evidencePhoto}
              </span>
            </div>
          </div>
        )}

        {/* Description Section */}
        <div className="space-y-2">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-muted">
            {t.detail.description}
          </h3>
          <p className="text-sm sm:text-base text-darktext leading-relaxed">
            {report.description}
          </p>
        </div>

        {/* REQUIREMENT 11: NEAREST POLICE & AMBULANCE CARD */}
        <div className="p-5 rounded-2xl bg-navy text-white space-y-3 shadow-md border border-navy-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emergency animate-pulse" />
              <h4 className="text-xs font-black uppercase tracking-wider">
                Emergency & First Responder Dispatch For {report.area}
              </h4>
            </div>
            <a
              href="tel:999"
              className="px-2.5 py-0.5 rounded-full bg-emergency text-white text-[10px] font-black uppercase hover:bg-emergency-hover"
            >
              National 999
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {/* Police */}
            <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-civic-blue font-bold">
                <Building className="w-3.5 h-3.5" />
                <span>{police.thanaName}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Officer: <strong className="text-white">{police.dutyOfficerName || 'Duty Officer'}</strong>
              </p>
              <div className="pt-1 flex items-center justify-between">
                <span className="font-mono text-white font-bold text-[11px]">{police.hotlineMobile || police.dutyOfficerMobile}</span>
                <a
                  href={`tel:${police.hotlineMobile || police.dutyOfficerMobile}`}
                  className="px-2 py-0.5 bg-emergency text-white text-[10px] font-bold rounded"
                >
                  Call
                </a>
              </div>
            </div>

            {/* Ambulance */}
            <div className="p-3 rounded-xl bg-white/10 border border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                <Hospital className="w-3.5 h-3.5" />
                <span>{ambulance.hospitalName}</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Ambulance Hotline: <strong className="text-white">{ambulance.emergencyHotline || ambulance.emergencyPhone}</strong>
              </p>
              <div className="pt-1 flex items-center justify-between">
                <span className="font-mono text-white font-bold text-[11px]">{ambulance.ambulanceHotline || '16263'}</span>
                <a
                  href={`tel:${ambulance.emergencyHotline || ambulance.emergencyPhone}`}
                  className="px-2 py-0.5 bg-civic-blue text-white text-[10px] font-bold rounded"
                >
                  Call
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Card */}
        <div className="p-5 rounded-2xl bg-[#150D28] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  {t.detail.aiAnalysis}
                </h4>
                <p className="text-[11px] text-slate-400">
                  Computer vision hazard confirmation
                </p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-sky-400">
              {report.aiConfidence || 94}% Confidence
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {(report.aiRisks || ['Public safety hazard', 'Vehicle disturbance']).map((risk, idx) => (
              <span
                key={idx}
                className="text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-medium flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                <span>{risk}</span>
              </span>
            ))}
          </div>
        </div>

        {/* COMMUNITY VERIFICATION VOTING BAR */}
        <div className="p-6 rounded-3xl bg-[#150D28] border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-white">
                {t.detail.communityVerification}
              </h3>
              <p className="text-xs text-slate-400">
                {report.confirmationsCount} {t.detail.confirmedCount} ({confidencePercent}% Consensus)
              </p>
            </div>

            {/* Voting Consensus Progress Bar */}
            <div className="w-full sm:w-48 space-y-1">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden flex">
                <div
                  className="bg-sky-400 transition-all duration-500"
                  style={{ width: `${confidencePercent}%` }}
                />
                <div
                  className="bg-rose-400 transition-all duration-500"
                  style={{ width: `${100 - confidencePercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>{report.confirmationsCount} Verified</span>
                <span>{report.incorrectCount} Challenged</span>
              </div>
            </div>
          </div>

          {/* Verification Buttons */}
          <div className="pt-2">
            <span className="text-xs font-bold text-white block mb-2">
              {t.detail.confirmPrompt}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleVote('confirm')}
                className={`py-3 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                  userVoted === 'confirm'
                    ? 'bg-purple-600 text-white shadow ring-2 ring-purple-400'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>{t.detail.confirmYes} (+5 pts)</span>
              </button>

              <button
                type="button"
                onClick={() => handleVote('not_sure')}
                className={`py-3 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                  userVoted === 'not_sure'
                    ? 'bg-purple-800 text-white ring-2 ring-purple-400'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>{t.detail.confirmNotSure}</span>
              </button>

              <button
                type="button"
                onClick={() => handleVote('incorrect')}
                className={`py-3 px-4 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                  userVoted === 'incorrect'
                    ? 'bg-rose-600 text-white ring-2 ring-rose-400'
                    : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                }`}
              >
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>{t.detail.confirmIncorrect}</span>
              </button>
            </div>
          </div>

          {/* Confirm Resolution Button if Resolved */}
          {report.status === 'RESOLVED' && (
            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Did the authority fix this problem satisfactorily?
              </span>
              <button
                onClick={() => confirmResolution(report.id)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow transition"
              >
                {t.detail.confirmResolutionBtn}
              </button>
            </div>
          )}
        </div>

        {/* TIMELINE SECTION */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <h3 className="text-base font-extrabold text-white">
            {t.detail.timelineTitle}
          </h3>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
            {report.timeline.map((event, idx) => (
              <div key={event.id} className="relative group">
                <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-[#0E081B] border-2 border-purple-500 group-last:border-sky-400 group-last:bg-sky-400" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {language === 'en' ? event.titleEn : event.titleBn}
                    </span>
                    {event.actor && (
                      <span className="text-[10px] text-purple-300 font-medium bg-purple-500/20 px-1.5 py-0.2 rounded border border-purple-500/30">
                        {event.actor}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •{' '}
                    {new Date(event.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMMENTS & COMMUNITY UPDATES SECTION */}
        <div className="space-y-4 pt-6 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-400" />
              <span>{t.detail.commentsTitle} ({report.comments.length})</span>
            </h3>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder={t.detail.addCommentPlaceholder}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 bg-white/5 text-white placeholder-slate-400 text-xs sm:text-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow transition flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.detail.postComment}</span>
            </button>
          </form>

          {/* Comment list */}
          <div className="space-y-3 pt-2">
            {report.comments.length === 0 ? (
              <p className="text-xs text-slate-400 italic">
                {language === 'en' ? 'No comments posted yet. Be the first to share an update.' : 'এখনও কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনি করুন।'}
              </p>
            ) : (
              report.comments.map((comment) => (
                <div
                  key={comment.id}
                  className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                    comment.isOfficial
                      ? 'bg-purple-950/40 border-purple-500/30'
                      : 'bg-[#150D28] border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      {comment.userName}
                      {comment.isOfficial && (
                        <span className="text-[10px] bg-purple-600 text-white px-1.5 py-0.2 rounded font-extrabold">
                          Official
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
