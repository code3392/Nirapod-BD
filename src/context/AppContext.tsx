'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Report, 
  UserProfile, 
  NotificationItem, 
  Language, 
  ReportStatus, 
  SeverityLevel,
  ResolutionData
} from '@/types';
import { INITIAL_REPORTS, INITIAL_USER, INITIAL_NOTIFICATIONS } from '@/lib/data/mockReports';
import { translations } from '@/lib/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  reports: Report[];
  user: UserProfile;
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  isOffline: boolean;
  offlineQueueCount: number;
  addReport: (reportData: Partial<Report>) => Report;
  verifyReport: (reportId: string, voteType: 'confirm' | 'not_sure' | 'incorrect') => void;
  updateReportStatus: (reportId: string, status: ReportStatus, note?: string) => void;
  submitResolution: (reportId: string, resolution: Omit<ResolutionData, 'id' | 'reportId' | 'verifiedByCommunityCount'>) => void;
  confirmResolution: (reportId: string) => void;
  flagDuplicate: (reportId: string, originalId: string) => void;
  addComment: (reportId: string, content: string, isOfficial?: boolean) => void;
  updatePrivacySettings: (settings: Partial<UserProfile['privacySettings']>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  getReportById: (id: string) => Report | undefined;
  checkDuplicateReport: (lat: number, lng: number, categoryId: string) => { isDuplicate: boolean; matchedReport?: Report; distanceMeters?: number };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [offlineQueue, setOfflineQueue] = useState<Partial<Report>[]>([]);

  // Load state from localStorage on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('nirapod_lang') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'bn')) {
          setLanguageState(savedLang);
        }

        const savedReports = localStorage.getItem('nirapod_reports');
        if (savedReports) {
          const parsed = JSON.parse(savedReports);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setReports(parsed);
          }
        }

        const savedUser = localStorage.getItem('nirapod_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }

        const savedNotifs = localStorage.getItem('nirapod_notifications');
        if (savedNotifs) {
          setNotifications(JSON.parse(savedNotifs));
        }

        const savedOfflineQueue = localStorage.getItem('nirapod_offline_queue');
        if (savedOfflineQueue) {
          setOfflineQueue(JSON.parse(savedOfflineQueue));
        }
      } catch (e) {
        console.error('Error loading localStorage state', e);
      }

      // Online/Offline listeners
      const handleOnline = () => {
        setIsOffline(false);
        syncOfflineReports();
      };
      const handleOffline = () => setIsOffline(true);

      setIsOffline(!navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirapod_lang', lang);
    }
  };

  const persistReports = (newReports: Report[]) => {
    setReports(newReports);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirapod_reports', JSON.stringify(newReports));
    }
  };

  const persistUser = (updatedUser: UserProfile) => {
    setUser(updatedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirapod_user', JSON.stringify(updatedUser));
    }
  };

  const persistNotifications = (newNotifs: NotificationItem[]) => {
    setNotifications(newNotifs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirapod_notifications', JSON.stringify(newNotifs));
    }
  };

  // Distance helper (Haversine formula in meters)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth radius in metres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
  };

  const checkDuplicateReport = (lat: number, lng: number, categoryId: string) => {
    for (const report of reports) {
      if (report.status === 'RESOLVED' || report.status === 'REJECTED') continue;
      const distance = calculateDistance(lat, lng, report.latitude, report.longitude);
      // If within 120 meters and matching category
      if (distance < 120 && report.categoryId === categoryId) {
        return { isDuplicate: true, matchedReport: report, distanceMeters: distance };
      }
    }
    return { isDuplicate: false };
  };

  const addReport = (reportData: Partial<Report>): Report => {
    const now = new Date().toISOString();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const publicId = `NRP-${randomNum}`;
    const reportId = `rep-${Date.now()}`;

    // If currently offline, queue it
    if (typeof window !== 'undefined' && !navigator.onLine) {
      const queuedItem = { ...reportData, id: reportId, publicId, createdAt: now };
      const newQueue = [...offlineQueue, queuedItem];
      setOfflineQueue(newQueue);
      localStorage.setItem('nirapod_offline_queue', JSON.stringify(newQueue));
    }

    const newReport: Report = {
      id: reportId,
      publicId,
      userId: user.id,
      userName: user.privacySettings.hideIdentityPublicly ? 'Anonymous Citizen' : user.name,
      userAvatar: user.avatar,
      categoryId: reportData.categoryId || 'road_traffic',
      title: reportData.title || 'Reported Civic Issue',
      description: reportData.description || '',
      latitude: reportData.latitude || 23.8103,
      longitude: reportData.longitude || 90.4125,
      locationName: reportData.locationName || 'Dhaka Metropolitan Area',
      district: 'Dhaka',
      area: reportData.area || 'Mirpur',
      severity: reportData.severity || 'medium',
      status: 'SUBMITTED',
      imageUrl: reportData.imageUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
      timeNoticed: reportData.timeNoticed || 'today',
      aiCategory: reportData.aiCategory,
      aiCategoryName: reportData.aiCategoryName,
      aiConfidence: reportData.aiConfidence || 92,
      aiRisks: reportData.aiRisks || ['Public safety hazard', 'Disruption risk'],
      aiSuggestedSeverity: reportData.aiSuggestedSeverity || reportData.severity || 'medium',
      confirmationsCount: 1, // Author confirms
      notSureCount: 0,
      incorrectCount: 0,
      timeline: [
        {
          id: `t-${Date.now()}-1`,
          status: 'SUBMITTED',
          titleEn: `Report submitted by ${user.name}`,
          titleBn: `${user.name} কর্তৃক রিপোর্ট দাখিল`,
          timestamp: now,
          actor: 'Citizen',
        },
        {
          id: `t-${Date.now()}-2`,
          status: 'AI_ANALYZED',
          titleEn: `AI hazard classification complete (${reportData.aiConfidence || 92}% confidence)`,
          titleBn: `এআই দ্বারা সমস্যা শনাক্তকরণ সম্পন্ন (${reportData.aiConfidence || 92}% নির্ভুলতা)`,
          timestamp: now,
          actor: 'Nirapod Vision AI',
        }
      ],
      comments: [],
      createdAt: now,
      updatedAt: now,
    };

    const updatedReports = [newReport, ...reports];
    persistReports(updatedReports);

    // Update user stats and points (+25 points)
    const updatedUser: UserProfile = {
      ...user,
      points: user.points + 25,
      reputationScore: user.reputationScore + 25,
      reportsSubmitted: user.reportsSubmitted + 1,
    };
    persistUser(updatedUser);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      titleEn: 'Report Broadcasted',
      titleBn: 'রিপোর্ট সফলভাবে সম্প্রচারিত',
      messageEn: `Your report ${publicId} is now live and waiting for nearby guardians to verify.`,
      messageBn: `আপনার রিপোর্ট ${publicId} মানচিত্রে প্রকাশিত হয়েছে এবং নাগরিক যাচাইয়ের জন্য উন্মুক্ত।`,
      timestamp: 'Just now',
      isRead: false,
      type: 'points',
      link: `/report/${newReport.id}`,
    };
    persistNotifications([newNotif, ...notifications]);

    return newReport;
  };

  const syncOfflineReports = () => {
    if (offlineQueue.length === 0) return;
    const queued = [...offlineQueue];
    setOfflineQueue([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nirapod_offline_queue');
    }
    // Convert each to live report
    queued.forEach((item) => {
      addReport(item);
    });
  };

  const verifyReport = (reportId: string, voteType: 'confirm' | 'not_sure' | 'incorrect') => {
    const reportIndex = reports.findIndex((r) => r.id === reportId);
    if (reportIndex === -1) return;

    const report = { ...reports[reportIndex] };
    const now = new Date().toISOString();

    if (voteType === 'confirm') {
      report.confirmationsCount += 1;
      // Upgrade to VERIFIED if reaches threshold
      if (report.confirmationsCount >= 3 && report.status === 'SUBMITTED') {
        report.status = 'VERIFIED';
        report.timeline.push({
          id: `t-${Date.now()}`,
          status: 'VERIFIED',
          titleEn: `Community verification threshold reached (${report.confirmationsCount} confirmations)`,
          titleBn: `নাগরিক যাচাই কোরাম পূরণ (${report.confirmationsCount} জন নিশ্চিত করেছেন)`,
          timestamp: now,
          actor: 'Community Guardians',
        });
      }
    } else if (voteType === 'not_sure') {
      report.notSureCount += 1;
    } else if (voteType === 'incorrect') {
      report.incorrectCount += 1;
      if (report.incorrectCount >= 5 && report.confirmationsCount < 3) {
        report.status = 'FALSE_REPORT';
      }
    }

    report.updatedAt = now;
    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);

    // Reward user with 5 points for verification action
    const updatedUser: UserProfile = {
      ...user,
      points: user.points + 5,
      reputationScore: user.reputationScore + 5,
      helpfulConfirmations: user.helpfulConfirmations + 1,
    };
    persistUser(updatedUser);
  };

  const updateReportStatus = (reportId: string, status: ReportStatus, note?: string) => {
    const reportIndex = reports.findIndex((r) => r.id === reportId);
    if (reportIndex === -1) return;

    const report = { ...reports[reportIndex] };
    const now = new Date().toISOString();
    report.status = status;
    report.updatedAt = now;

    report.timeline.push({
      id: `t-${Date.now()}`,
      status,
      titleEn: `Status updated to ${status}${note ? `: ${note}` : ''}`,
      titleBn: `অবস্থা পরিবর্তিত হয়েছে: ${status}${note ? ` (${note})` : ''}`,
      timestamp: now,
      actor: 'Authorized Authority',
    });

    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);
  };

  const submitResolution = (
    reportId: string,
    resolutionData: Omit<ResolutionData, 'id' | 'reportId' | 'verifiedByCommunityCount'>
  ) => {
    const reportIndex = reports.findIndex((r) => r.id === reportId);
    if (reportIndex === -1) return;

    const report = { ...reports[reportIndex] };
    const now = new Date().toISOString();

    const fullResolution: ResolutionData = {
      id: `res-${Date.now()}`,
      reportId,
      organizationId: resolutionData.organizationId,
      organizationName: resolutionData.organizationName,
      description: resolutionData.description,
      beforeImage: resolutionData.beforeImage || report.imageUrl,
      afterImage: resolutionData.afterImage,
      resolvedAt: now,
      verifiedByCommunityCount: 1,
    };

    report.status = 'RESOLVED';
    report.resolution = fullResolution;
    report.resolvedAt = now;
    report.updatedAt = now;

    report.timeline.push({
      id: `t-${Date.now()}`,
      status: 'RESOLVED',
      titleEn: `Resolved by ${resolutionData.organizationName} with Before/After proof`,
      titleBn: `${resolutionData.organizationName} কর্তৃক মেরামত পূর্ব ও পরবর্তী প্রমাণসহ সমাধান সম্পন্ন`,
      timestamp: now,
      actor: resolutionData.organizationName,
    });

    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);

    // Notify author
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      titleEn: 'Your Report Was Resolved!',
      titleBn: 'আপনার রিপোর্টটি সমাধান হয়েছে!',
      messageEn: `Problem ${report.publicId} (${report.title.slice(0, 30)}...) has been officially repaired.`,
      messageBn: `আপনার দাখিলকৃত সমস্যা ${report.publicId} আনুষ্ঠানিকভাবে সংস্কার করা হয়েছে।`,
      timestamp: 'Just now',
      isRead: false,
      type: 'resolved',
      link: `/report/${report.id}`,
    };
    persistNotifications([newNotif, ...notifications]);
  };

  const confirmResolution = (reportId: string) => {
    const reportIndex = reports.findIndex((r) => r.id === reportId);
    if (reportIndex === -1 || !reports[reportIndex].resolution) return;

    const report = { ...reports[reportIndex] };
    const now = new Date().toISOString();

    report.resolution = {
      ...report.resolution!,
      verifiedByCommunityCount: report.resolution!.verifiedByCommunityCount + 1,
    };

    if (report.resolution.verifiedByCommunityCount >= 3) {
      report.status = 'COMMUNITY_CONFIRMED';
    }

    report.timeline.push({
      id: `t-${Date.now()}`,
      status: 'COMMUNITY_CONFIRMED',
      titleEn: `Community member verified repair quality on site`,
      titleBn: `নাগরিকরা সশরীরে কাজের মান পরীক্ষা করে সমাধান নিশ্চিত করেছেন`,
      timestamp: now,
      actor: user.name,
    });

    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);

    // Award 10 points
    persistUser({
      ...user,
      points: user.points + 10,
      reputationScore: user.reputationScore + 10,
    });
  };

  const flagDuplicate = (reportId: string, originalId: string) => {
    const reportIndex = reports.findIndex((r) => r.id === reportId);
    if (reportIndex === -1) return;

    const report = { ...reports[reportIndex] };
    report.status = 'DUPLICATE';
    const now = new Date().toISOString();

    report.timeline.push({
      id: `t-${Date.now()}`,
      status: 'DUPLICATE',
      titleEn: `Flagged as duplicate of report ${originalId}`,
      titleBn: `রিপোর্ট ${originalId}-এর অনুরূপ বা ডুপ্লিকেট হিসেবে চিহ্নিত`,
      timestamp: now,
      actor: 'Community Consensus',
    });

    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);
  };

  const addComment = (reportId: string, content: string, isOfficial = false) => {
    const reportIndex = reports.findIndex((r) => r.id === reportId);
    if (reportIndex === -1) return;

    const report = { ...reports[reportIndex] };
    const newComment = {
      id: `c-${Date.now()}`,
      userName: isOfficial ? 'Official Municipal Officer' : user.name,
      userAvatar: user.avatar,
      isOfficial,
      content,
      createdAt: new Date().toISOString(),
    };

    report.comments = [...report.comments, newComment];
    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);
  };

  const updatePrivacySettings = (settings: Partial<UserProfile['privacySettings']>) => {
    const updated = {
      ...user,
      privacySettings: {
        ...user.privacySettings,
        ...settings,
      },
    };
    persistUser(updated);
  };

  const markNotificationAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    persistNotifications(updated);
  };

  const markAllNotificationsAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    persistNotifications(updated);
  };

  const getReportById = (id: string) => {
    return reports.find((r) => r.id === id || r.publicId.toLowerCase() === id.toLowerCase());
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        reports,
        user,
        notifications,
        unreadNotificationsCount,
        isOffline,
        offlineQueueCount: offlineQueue.length,
        addReport,
        verifyReport,
        updateReportStatus,
        submitResolution,
        confirmResolution,
        flagDuplicate,
        addComment,
        updatePrivacySettings,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        getReportById,
        checkDuplicateReport,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
