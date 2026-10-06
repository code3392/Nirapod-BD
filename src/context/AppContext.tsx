'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Report, 
  UserProfile, 
  NotificationItem, 
  Language, 
  ReportStatus, 
  SeverityLevel,
  ResolutionData,
  UserRole,
  CommunityMessage,
  PersonalGroup,
  DirectMessage,
  LostAndFoundItem,
  SuspensionAuditLog
} from '@/types';
import { 
  INITIAL_REPORTS, 
  INITIAL_USER, 
  SUPER_ADMIN_USER,
  INITIAL_USER_REGISTRY,
  INITIAL_NOTIFICATIONS,
  INITIAL_COMMUNITY_MESSAGES,
  INITIAL_DIRECT_MESSAGES,
  INITIAL_LOST_AND_FOUND
} from '@/lib/data/mockReports';
import { getNearestPolice, getNearestAmbulance, getNearbyHelpers } from '@/lib/data/emergencyDirectory';
import { scanTextForViolations } from '@/lib/moderation';
import { translations } from '@/lib/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.en;
  reports: Report[];
  user: UserProfile | null;
  allUsers: UserProfile[];
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  isOffline: boolean;
  offlineQueueCount: number;
  
  // Auth & Roles
  login: (email: string, password?: string) => { success: boolean; message: string };
  register: (data: {
    name: string;
    email: string;
    password?: string;
    phone: string;
    livingPlace: string;
    area: string;
    age: number;
    bloodGroup: string;
    occupation?: string;
  }) => { success: boolean; message: string };
  logout: () => void;
  switchUser: (email: string) => void;
  updateUserRole: (targetUserId: string, newRole: UserRole) => { success: boolean; message: string };
  updateUserProfile: (data: Partial<UserProfile>) => void;
  
  // Moderation & Suspensions
  suspendUser: (targetUserId: string, reason: string, durationDays: number) => { success: boolean; message: string };
  revokeSuspension: (targetUserId: string) => { success: boolean; message: string };
  banUserFromCommunity: (targetUserId: string, ban: boolean) => void;
  suspensionLogs: SuspensionAuditLog[];
  
  // Reports
  addReport: (reportData: Partial<Report>) => { success: boolean; report?: Report; errorReason?: string };
  verifyReport: (reportId: string, voteType: 'confirm' | 'not_sure' | 'incorrect') => void;
  updateReportStatus: (reportId: string, status: ReportStatus, note?: string) => void;
  submitResolution: (reportId: string, resolution: Omit<ResolutionData, 'id' | 'reportId' | 'verifiedByCommunityCount'>) => void;
  confirmResolution: (reportId: string) => void;
  submitCitizenProofOfWork: (reportId: string, mediaUrl: string, mediaType: 'image' | 'video', comments: string) => void;
  flagDuplicate: (reportId: string, originalId: string) => void;
  addComment: (reportId: string, content: string, isOfficial?: boolean) => { success: boolean; message?: string };
  deleteReport: (reportId: string) => { success: boolean; message: string };
  getReportById: (id: string) => Report | undefined;
  checkDuplicateReport: (lat: number, lng: number, categoryId: string) => { isDuplicate: boolean; matchedReport?: Report; distanceMeters?: number };
  
  // 1 Main Community & Personal Groups
  personalGroups: PersonalGroup[];
  communityMessages: CommunityMessage[];
  directMessages: DirectMessage[];
  createPersonalGroup: (name: string, description: string, category: PersonalGroup['category'], isPrivate?: boolean) => { success: boolean; group?: PersonalGroup; error?: string };
  joinPersonalGroup: (inviteCode: string) => { success: boolean; group?: PersonalGroup; error?: string };
  sendCommunityMessage: (groupIdOrArea: string, content: string, fileAttachment?: CommunityMessage['fileAttachment']) => { success: boolean; violationReason?: string };
  sendDirectMessage: (recipientId: string, recipientName: string, content: string, fileAttachment?: DirectMessage['fileAttachment']) => { success: boolean; violationReason?: string };
  
  // Lost & Found
  lostAndFoundItems: LostAndFoundItem[];
  addLostAndFoundItem: (item: Omit<LostAndFoundItem, 'id' | 'createdAt'>) => void;
  searchLostAndFound: (query: string, area?: string, category?: string) => LostAndFoundItem[];
  
  // Notifications & Privacy
  updatePrivacySettings: (settings: Partial<UserProfile['privacySettings']>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

export const DEFAULT_PERSONAL_GROUPS: PersonalGroup[] = [];

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [reports, setReports] = useState<Report[]>(INITIAL_REPORTS);
  const [allUsers, setAllUsers] = useState<UserProfile[]>(INITIAL_USER_REGISTRY);
  // Default to Guest visitor - NO fake accounts preloaded
  const [user, setUser] = useState<UserProfile | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [offlineQueue, setOfflineQueue] = useState<Partial<Report>[]>([]);
  const [personalGroups, setPersonalGroups] = useState<PersonalGroup[]>([]);
  const [communityMessages, setCommunityMessages] = useState<CommunityMessage[]>(INITIAL_COMMUNITY_MESSAGES);
  const [directMessages, setDirectMessages] = useState<DirectMessage[]>(INITIAL_DIRECT_MESSAGES);
  const [lostAndFoundItems, setLostAndFoundItems] = useState<LostAndFoundItem[]>(INITIAL_LOST_AND_FOUND);
  const [suspensionLogs, setSuspensionLogs] = useState<SuspensionAuditLog[]>([]);

  // Load state from localStorage on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedLang = localStorage.getItem('nirapod_lang') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'bn')) setLanguageState(savedLang);

        const savedReports = localStorage.getItem('nirapod_reports');
        if (savedReports) {
          try {
            const parsed: Report[] = JSON.parse(savedReports);
            const realReports = parsed.filter(r => 
              !['rep-1', 'rep-2', 'rep-3', 'rep-4', 'rep-5', 'rep-6'].includes(r.id) &&
              !r.title?.toLowerCase().includes('overflowiedefefeng') &&
              !r.title?.toLowerCase().includes('munfwfwe')
            );
            setReports(realReports);
            localStorage.setItem('nirapod_reports', JSON.stringify(realReports));
          } catch {
            setReports([]);
          }
        }

        const savedUsers = localStorage.getItem('nirapod_users');
        if (savedUsers) setAllUsers(JSON.parse(savedUsers));

        const savedUser = localStorage.getItem('nirapod_user');
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            // Require root password ggbrowser3392 for Super Admin (smdsami59@gmail.com)
            if (parsed.email?.toLowerCase() === 'smdsami59@gmail.com' && parsed.password !== 'ggbrowser3392') {
              localStorage.removeItem('nirapod_user');
              setUser(null);
            } else if (parsed.id === 'usr-1' || parsed.email === 'rahim.ahmed@nirapodbd.gov.bd') {
              localStorage.removeItem('nirapod_user');
              setUser(null);
            } else {
              setUser(parsed);
            }
          } catch {
            localStorage.removeItem('nirapod_user');
            setUser(null);
          }
        }

        const savedNotifs = localStorage.getItem('nirapod_notifications');
        if (savedNotifs) {
          try {
            const parsed: NotificationItem[] = JSON.parse(savedNotifs);
            if (Array.isArray(parsed)) setNotifications(parsed);
          } catch {
            setNotifications([]);
          }
        }

        const savedMsgs = localStorage.getItem('nirapod_community_msgs');
        if (savedMsgs) {
          try {
            const parsed: CommunityMessage[] = JSON.parse(savedMsgs);
            if (Array.isArray(parsed)) setCommunityMessages(parsed);
          } catch {
            setCommunityMessages([]);
          }
        }

        const savedGroups = localStorage.getItem('nirapod_personal_groups');
        if (savedGroups) {
          try {
            const parsed: PersonalGroup[] = JSON.parse(savedGroups);
            const dummyIds = new Set(['grp-dhaka-sentinel', 'grp-mirpur-patrol', 'grp-emergency-volunteers']);
            const dummyCodes = new Set(['NBD-DHAKA', 'NBD-SAFE', 'NBD-HELP']);
            const realGroups = Array.isArray(parsed)
              ? parsed.filter(g => !dummyIds.has(g.id) && !dummyCodes.has((g.inviteCode || '').toUpperCase()))
              : [];
            setPersonalGroups(realGroups);
            localStorage.setItem('nirapod_personal_groups', JSON.stringify(realGroups));
          } catch {
            setPersonalGroups([]);
          }
        } else {
          setPersonalGroups([]);
        }

        const savedDms = localStorage.getItem('nirapod_direct_msgs');
        if (savedDms) {
          try {
            const parsed: DirectMessage[] = JSON.parse(savedDms);
            if (Array.isArray(parsed)) setDirectMessages(parsed);
          } catch {
            setDirectMessages([]);
          }
        }

        const savedLaf = localStorage.getItem('nirapod_lost_and_found');
        if (savedLaf) {
          try {
            const parsed: LostAndFoundItem[] = JSON.parse(savedLaf);
            if (Array.isArray(parsed)) setLostAndFoundItems(parsed);
          } catch {
            setLostAndFoundItems([]);
          }
        }

        const savedLogs = localStorage.getItem('nirapod_suspension_logs');
        if (savedLogs) setSuspensionLogs(JSON.parse(savedLogs));
      } catch (e) {
        console.error('Error loading localStorage state', e);
      }

      // Real-time cross-tab synchronization via storage event
      const handleStorageChange = (e: StorageEvent) => {
        if (!e.newValue) return;
        try {
          if (e.key === 'nirapod_community_msgs') {
            const msgs = JSON.parse(e.newValue);
            if (Array.isArray(msgs)) setCommunityMessages(msgs);
          } else if (e.key === 'nirapod_direct_msgs') {
            const dms = JSON.parse(e.newValue);
            if (Array.isArray(dms)) setDirectMessages(dms);
          } else if (e.key === 'nirapod_personal_groups') {
            const grps = JSON.parse(e.newValue);
            if (Array.isArray(grps)) setPersonalGroups(grps);
          } else if (e.key === 'nirapod_reports') {
            const reps = JSON.parse(e.newValue);
            if (Array.isArray(reps)) setReports(reps);
          }
        } catch {}
      };
      window.addEventListener('storage', handleStorageChange);

      // Real-time server sync across devices & users
      const syncServerMessages = async () => {
        try {
          const res = await fetch('/api/community');
          if (res.ok) {
            const data = await res.json();
            if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
              setCommunityMessages((prev) => {
                const map = new Map<string, CommunityMessage>();
                prev.forEach(m => map.set(m.id, m));
                data.messages.forEach((m: CommunityMessage) => map.set(m.id, m));
                const merged = Array.from(map.values()).sort((a, b) => (a.id > b.id ? 1 : -1));
                localStorage.setItem('nirapod_community_msgs', JSON.stringify(merged));
                return merged;
              });
            }
          }

          const dmRes = await fetch('/api/direct-messages');
          if (dmRes.ok) {
            const dmData = await dmRes.json();
            if (dmData.messages && Array.isArray(dmData.messages) && dmData.messages.length > 0) {
              setDirectMessages((prev) => {
                const map = new Map<string, DirectMessage>();
                prev.forEach(m => map.set(m.id, m));
                dmData.messages.forEach((m: DirectMessage) => map.set(m.id, m));
                const merged = Array.from(map.values()).sort((a, b) => (a.id > b.id ? 1 : -1));
                localStorage.setItem('nirapod_direct_msgs', JSON.stringify(merged));
                return merged;
              });
            }
          }
        } catch {}
      };

      syncServerMessages();
      const syncInterval = setInterval(syncServerMessages, 3500);

      const handleOnline = () => { setIsOffline(false); syncOfflineReports(); syncServerMessages(); };
      const handleOffline = () => setIsOffline(true);

      setIsOffline(!navigator.onLine);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(syncInterval);
      };
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') localStorage.setItem('nirapod_lang', lang);
  };

  const persistReports = (newReports: Report[]) => {
    setReports(newReports);
    if (typeof window !== 'undefined') localStorage.setItem('nirapod_reports', JSON.stringify(newReports));
  };

  const persistUsers = (newUsers: UserProfile[], activeUser?: UserProfile | null) => {
    setAllUsers(newUsers);
    if (typeof window !== 'undefined') localStorage.setItem('nirapod_users', JSON.stringify(newUsers));
    if (activeUser !== undefined) {
      setUser(activeUser);
      if (typeof window !== 'undefined') {
        if (activeUser) {
          localStorage.setItem('nirapod_user', JSON.stringify(activeUser));
        } else {
          localStorage.removeItem('nirapod_user');
        }
      }
    }
  };

  const persistNotifications = (newNotifs: NotificationItem[]) => {
    setNotifications(newNotifs);
    if (typeof window !== 'undefined') localStorage.setItem('nirapod_notifications', JSON.stringify(newNotifs));
  };

  // Authentic Login Method
  const login = (email: string, password?: string): { success: boolean; message: string } => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return { success: false, message: 'Please enter a valid email address.' };

    if (cleanEmail === 'smdsami59@gmail.com') {
      if (password !== 'ggbrowser3392') {
        return { 
          success: false, 
          message: 'Access Denied: Invalid Super Admin password.' 
        };
      }
      const superUser: UserProfile = { ...SUPER_ADMIN_USER, password: 'ggbrowser3392' };
      setUser(superUser);
      if (typeof window !== 'undefined') localStorage.setItem('nirapod_user', JSON.stringify(superUser));
      if (!allUsers.some(u => u.email.toLowerCase() === 'smdsami59@gmail.com')) {
        const updated = [superUser, ...allUsers];
        setAllUsers(updated);
        if (typeof window !== 'undefined') localStorage.setItem('nirapod_users', JSON.stringify(updated));
      }
      return { success: true, message: 'Authenticated successfully as Super Admin (smdsami59@gmail.com).' };
    }

    const existing = allUsers.find(u => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      if (existing.password && password && existing.password !== password) {
        return { success: false, message: 'Incorrect password. Please check your credentials.' };
      }
      if (!existing.password && password) {
        existing.password = password;
        const updated = allUsers.map(u => u.id === existing.id ? existing : u);
        setAllUsers(updated);
        if (typeof window !== 'undefined') localStorage.setItem('nirapod_users', JSON.stringify(updated));
      }
      setUser(existing);
      if (typeof window !== 'undefined') localStorage.setItem('nirapod_user', JSON.stringify(existing));
      return { success: true, message: `Welcome back, ${existing.name}!` };
    }

    // Auto-create verified citizen profile for this new email
    const namePart = cleanEmail.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    const newCitizen: UserProfile = {
      id: `usr-${Date.now()}`,
      name: formattedName,
      email: cleanEmail,
      password: password || undefined,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formattedName)}&backgroundColor=0A2540&textColor=ffffff`,
      role: 'Citizen',
      isSuperAdmin: false,
      phone: '+880 1700-000000',
      livingPlace: 'Dhaka, Bangladesh',
      area: 'Dhaka',
      age: 26,
      bloodGroup: 'B+',
      occupation: 'Citizen Volunteer',
      isEmailVerified: true,
      isPhoneVerified: true,
      isIdVerified: true,
      verificationBadge: 'Greatly Verified Guardian',
      verificationStatus: 'GREATLY_VERIFIED',
      reputationScore: 100,
      verificationLevel: 'Verified Citizen (Tier 1)',
      reportsSubmitted: 0,
      reportsVerified: 0,
      helpfulConfirmations: 0,
      points: 100,
      warningStrikes: { fakePostCount: 0, badWordsCount: 0, racismCount: 0 },
      suspendedUntil: null,
      suspensionReason: null,
      bannedFromCommunities: false,
      unresolvedReportIdForWorkProof: null,
      badges: [],
      privacySettings: {
        showApproximateLocation: true,
        hideIdentityPublicly: false,
        allowCommunityNotifications: true,
      },
    };

    const updatedUsers = [newCitizen, ...allUsers];
    persistUsers(updatedUsers, newCitizen);
    return { success: true, message: `Signed in as ${cleanEmail}!` };
  };

  // Authentic Registration Method (Requirement 20)
  const register = (data: {
    name: string;
    email: string;
    password?: string;
    phone: string;
    livingPlace: string;
    area: string;
    age: number;
    bloodGroup: string;
    occupation?: string;
  }): { success: boolean; message: string } => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanName = data.name.trim();

    if (!cleanName || !cleanEmail) {
      return { success: false, message: 'Name and email are required.' };
    }

    const isSuper = cleanEmail === 'smdsami59@gmail.com';
    if (isSuper && data.password !== 'ggbrowser3392') {
      return { 
        success: false, 
        message: 'Registration Denied: Super Admin account creation requires the master root key.' 
      };
    }
    const newAccount: UserProfile = {
      id: isSuper ? 'usr-super-admin' : `usr-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: data.password || undefined,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=0A2540&textColor=ffffff`,
      role: isSuper ? 'Super Admin' : 'Community Guardian',
      isSuperAdmin: isSuper,
      phone: data.phone.trim() || '+880 1700-000000',
      livingPlace: data.livingPlace.trim() || `${data.area}, Dhaka`,
      area: data.area.trim() || 'Mirpur',
      age: Number(data.age) || 28,
      bloodGroup: data.bloodGroup.trim() || 'B+',
      occupation: data.occupation?.trim() || 'Civic Volunteer',
      isEmailVerified: true,
      isPhoneVerified: true,
      isIdVerified: true,
      verificationBadge: 'Greatly Verified Guardian',
      verificationStatus: 'GREATLY_VERIFIED',
      reputationScore: isSuper ? 2450 : 150,
      verificationLevel: isSuper ? 'Supreme Civic Moderator' : 'Verified Guardian (Tier 1)',
      reportsSubmitted: 0,
      reportsVerified: 0,
      helpfulConfirmations: 0,
      points: isSuper ? 2450 : 150,
      warningStrikes: { fakePostCount: 0, badWordsCount: 0, racismCount: 0 },
      suspendedUntil: null,
      suspensionReason: null,
      bannedFromCommunities: false,
      unresolvedReportIdForWorkProof: null,
      badges: [],
      privacySettings: {
        showApproximateLocation: true,
        hideIdentityPublicly: false,
        allowCommunityNotifications: true,
      },
    };

    const filtered = allUsers.filter(u => u.email.toLowerCase() !== cleanEmail);
    const updatedUsers = [newAccount, ...filtered];
    persistUsers(updatedUsers, newAccount);
    return { success: true, message: `Account created successfully! Welcome, ${cleanName}.` };
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') localStorage.removeItem('nirapod_user');
  };

  const switchUser = (email: string) => {
    if (!email || email === 'guest') {
      logout();
    } else if (email.toLowerCase() === 'smdsami59@gmail.com') {
      // Super Admin requires password authentication; cannot bypass via switchUser
      return;
    } else {
      login(email);
    }
  };

  // Rule 13: Super admin can make someone Admin or Super Admin. Admin CANNOT make an Admin.
  const updateUserRole = (targetUserId: string, newRole: UserRole): { success: boolean; message: string } => {
    if (!user || (!user.isSuperAdmin && user.email !== 'smdsami59@gmail.com')) {
      return {
        success: false,
        message: 'Permission Denied: Only Super Admin (smdsami59@gmail.com) is authorized to appoint Admins or Super Admins.',
      };
    }

    const updated = allUsers.map(u => {
      if (u.id === targetUserId) {
        return {
          ...u,
          role: newRole,
          isSuperAdmin: newRole === 'Super Admin' || u.email === 'smdsami59@gmail.com',
        };
      }
      return u;
    });

    const activeUser = user ? (updated.find(u => u.id === user.id) || user) : null;
    persistUsers(updated, activeUser || undefined);

    return { success: true, message: `User role updated successfully to ${newRole}.` };
  };

  // Rule 14 & 15: Suspend User with Email Log and Revocation
  const suspendUser = (targetUserId: string, reason: string, durationDays: number): { success: boolean; message: string } => {
    if (!user || (user.role !== 'Admin' && user.role !== 'Super Admin')) {
      return { success: false, message: 'Only authorized Admins or Super Admin can suspend accounts.' };
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + durationDays);
    const expiryIso = expiryDate.toISOString();

    const targetUser = allUsers.find(u => u.id === targetUserId);
    if (!targetUser) return { success: false, message: 'User not found.' };

    const emailBody = `Dear ${targetUser.name},\n\nYour account has been suspended for ${durationDays} days until ${expiryDate.toLocaleDateString()}.\nReason: ${reason}\n\nUnder Nirapod BD Civic Community Standards, violations result in temporary access restriction.\nIf you believe this is in error, contact support@nirapodbd.gov.bd.`;

    const updated = allUsers.map(u => {
      if (u.id === targetUserId) {
        return {
          ...u,
          suspendedUntil: expiryIso,
          suspensionReason: reason,
        };
      }
      return u;
    });

    const newLog: SuspensionAuditLog = {
      id: `log-${Date.now()}`,
      targetUserId: targetUser.id,
      targetUserName: targetUser.name,
      targetUserEmail: targetUser.email,
      action: 'SUSPENDED',
      reason,
      durationDays,
      issuedByEmail: user.email,
      emailSentContent: emailBody,
      timestamp: new Date().toISOString(),
    };

    const newLogs = [newLog, ...suspensionLogs];
    setSuspensionLogs(newLogs);
    if (typeof window !== 'undefined') localStorage.setItem('nirapod_suspension_logs', JSON.stringify(newLogs));

    persistUsers(updated, updated.find(u => u.id === user.id));
    return { success: true, message: `Suspension notice email sent to ${targetUser.email}. Account locked for ${durationDays} days.` };
  };

  const revokeSuspension = (targetUserId: string): { success: boolean; message: string } => {
    if (!user || (user.role !== 'Admin' && user.role !== 'Super Admin')) {
      return { success: false, message: 'Unauthorized action.' };
    }

    const updated = allUsers.map(u => {
      if (u.id === targetUserId) {
        return {
          ...u,
          suspendedUntil: null,
          suspensionReason: null,
        };
      }
      return u;
    });

    persistUsers(updated, updated.find(u => u.id === user.id));
    return { success: true, message: 'User suspension cancelled and account restored.' };
  };

  const banUserFromCommunity = (targetUserId: string, ban: boolean) => {
    if (!user || (user.role !== 'Admin' && user.role !== 'Super Admin')) return;
    const updated = allUsers.map(u => u.id === targetUserId ? { ...u, bannedFromCommunities: ban } : u);
    persistUsers(updated, updated.find(u => u.id === user.id));
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    const all = allUsers.map(u => u.id === user.id ? updated : u);
    persistUsers(all, updated);
  };

  // Proximity Distance helper (Haversine formula in meters)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3;
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
      if (distance < 120 && report.categoryId === categoryId) {
        return { isDuplicate: true, matchedReport: report, distanceMeters: distance };
      }
    }
    return { isDuplicate: false };
  };

  // Rule 25: Mandatory Resolution Work Proof & Automated Helper Dispatch
  const addReport = (reportData: Partial<Report>): { success: boolean; report?: Report; errorReason?: string } => {
    // Check if user is suspended
    if (user?.suspendedUntil && new Date(user.suspendedUntil) > new Date()) {
      return {
        success: false,
        errorReason: `Your account is currently suspended until ${new Date(user.suspendedUntil).toLocaleDateString()}. Reason: ${user.suspensionReason}`,
      };
    }

    // Check Rule 25: Must provide photo/video proof for previous done work before making another request
    if (user?.unresolvedReportIdForWorkProof) {
      return {
        success: false,
        errorReason: `Work Completion Proof Required: You have a previously resolved request (${user.unresolvedReportIdForWorkProof}) awaiting your photo/video verification. You must submit completion evidence before submitting a new issue.`,
      };
    }

    // Check content moderation
    const modTitle = scanTextForViolations(reportData.title || '');
    const modDesc = scanTextForViolations(reportData.description || '');
    const violation = modTitle.flagged ? modTitle : modDesc.flagged ? modDesc : null;

    if (violation) {
      // Strike system
      handleModerationViolation(violation.category || 'bad_words');
      return {
        success: false,
        errorReason: `Report rejected: ${violation.reasonEn}`,
      };
    }

    const now = new Date().toISOString();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const publicId = `NRP-${randomNum}`;
    const reportId = `rep-${Date.now()}`;
    const areaName = reportData.area || 'Mirpur';

    // Auto lookup nearest Police & Ambulance
    const nearestPolice = getNearestPolice(areaName);
    const nearestAmbulance = getNearestAmbulance(areaName);

    // Auto dispatch email & WhatsApp to nearby volunteers
    const localHelpers = getNearbyHelpers(areaName);
    const dispatchedVolunteers = localHelpers.map((h, idx) => ({
      id: `disp-${Date.now()}-${idx}`,
      volunteerName: h.name,
      volunteerPhone: h.phone,
      volunteerEmail: h.email,
      area: h.area,
      distanceMeters: Math.floor(300 + Math.random() * 500),
      emailSent: true,
      whatsappUrl: `https://wa.me/${h.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`[Nirapod BD Alert] ${reportData.title || 'Civic Hazard'} reported at ${reportData.locationName || areaName}. Public ID: ${publicId}. Details: https://nirapodbd.gov.bd/report/${reportId}`)}`,
      dispatchedAt: now,
    }));

    const newReport: Report = {
      id: reportId,
      publicId,
      userId: user ? user.id : 'usr-guest',
      userName: user ? (user.privacySettings.hideIdentityPublicly ? 'Anonymous Citizen' : user.name) : (reportData.userName || 'Anonymous Citizen'),
      userEmail: user?.email || reportData.userEmail,
      userPhone: user?.phone || reportData.userPhone,
      userAvatar: user?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=Citizen&backgroundColor=0A2540&textColor=ffffff',
      categoryId: reportData.categoryId || 'road_traffic',
      title: reportData.title || 'Reported Civic Issue',
      description: reportData.description || '',
      latitude: reportData.latitude || 23.8041,
      longitude: reportData.longitude || 90.3667,
      locationName: reportData.locationName || `${areaName}, Dhaka`,
      district: 'Dhaka',
      area: areaName,
      severity: reportData.severity || 'medium',
      status: 'SUBMITTED',
      mediaType: reportData.mediaType || 'image',
      mediaUrl: reportData.mediaUrl || '',
      timeNoticed: reportData.timeNoticed || 'today',
      aiCategory: reportData.aiCategory,
      aiCategoryName: reportData.aiCategoryName,
      aiConfidence: reportData.aiConfidence || 94,
      aiRisks: reportData.aiRisks || ['Public safety hazard', 'Disruption risk'],
      aiSuggestedSeverity: reportData.aiSuggestedSeverity || reportData.severity || 'medium',
      confirmationsCount: 1,
      notSureCount: 0,
      incorrectCount: 0,
      nearestPolice,
      nearestAmbulance,
      dispatchedVolunteers,
      timeline: [
        {
          id: `t-${Date.now()}-1`,
          status: 'SUBMITTED',
          titleEn: user ? `Report created by ${user.name}` : 'Report created by Citizen',
          titleBn: user ? `${user.name} কর্তৃক রিপোর্ট দাখিল` : 'নাগরিক কর্তৃক রিপোর্ট দাখিল',
          timestamp: now,
          actor: 'Citizen',
        },
        {
          id: `t-${Date.now()}-2`,
          status: 'AI_ANALYZED',
          titleEn: `AI hazard classification complete (${reportData.aiConfidence || 94}% confidence)`,
          titleBn: `এআই দ্বারা সমস্যা শনাক্তকরণ সম্পন্ন (${reportData.aiConfidence || 94}% নির্ভুলতা)`,
          timestamp: now,
          actor: 'Nirapod Vision AI',
        },
      ],
      comments: [],
      createdAt: now,
      updatedAt: now,
    };

    const updatedReports = [newReport, ...reports];
    persistReports(updatedReports);

    // Update user stats
    if (user) {
      const updatedUser: UserProfile = {
        ...user,
        points: user.points + 25,
        reputationScore: user.reputationScore + 25,
        reportsSubmitted: user.reportsSubmitted + 1,
      };
      persistUsers(allUsers.map(u => u.id === user.id ? updatedUser : u), updatedUser);
    }

    // Add Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      titleEn: 'Report Broadcasted & Helpers Alerted',
      titleBn: 'রিপোর্ট সম্প্রচারিত ও স্বেচ্ছাসেবকদের সতর্কবার্তা পাঠানো হয়েছে',
      messageEn: `Ticket ${publicId} is live. Auto-sent email alert to ${localHelpers.length} nearest volunteers in ${areaName}.`,
      messageBn: `টিকেট ${publicId} সক্রিয় হয়েছে। ${areaName}-এর নিকটবর্তী ${localHelpers.length} জন স্বেচ্ছাসেবককে ইমেইল পাঠানো হয়েছে।`,
      timestamp: 'Just now',
      isRead: false,
      type: 'email_sent',
      link: `/report/${newReport.id}`,
    };
    persistNotifications([newNotif, ...notifications]);

    return { success: true, report: newReport };
  };

  const handleModerationViolation = (category: 'bad_words' | 'racism' | 'commercial_ad') => {
    if (!user) return;
    const strikes = { ...user.warningStrikes };
    let newSuspendedUntil: string | null = null;
    let reason: string | null = null;

    if (category === 'bad_words') {
      strikes.badWordsCount += 1;
      if (strikes.badWordsCount >= 3) {
        const d = new Date();
        d.setDate(d.getDate() + 5);
        newSuspendedUntil = d.toISOString();
        reason = 'Suspended for 5 days: Repeated profanity / bad words in violation of community rules.';
      }
    } else if (category === 'racism') {
      strikes.racismCount += 1;
      if (strikes.racismCount >= 3) {
        const d = new Date();
        d.setDate(d.getDate() + 5);
        newSuspendedUntil = d.toISOString();
        reason = 'Suspended for 5 days: Zero-tolerance violation of anti-racism / hate speech policy.';
      }
    }

    const updatedUser = {
      ...user,
      warningStrikes: strikes,
      suspendedUntil: newSuspendedUntil || user.suspendedUntil,
      suspensionReason: reason || user.suspensionReason,
    };

    persistUsers(allUsers.map(u => u.id === user.id ? updatedUser : u), updatedUser);
  };

  const syncOfflineReports = () => {
    if (offlineQueue.length === 0) return;
    const queued = [...offlineQueue];
    setOfflineQueue([]);
    if (typeof window !== 'undefined') localStorage.removeItem('nirapod_offline_queue');
    queued.forEach(item => addReport(item));
  };

  // Rule 12: Fake Report Strike System
  const verifyReport = (reportId: string, voteType: 'confirm' | 'not_sure' | 'incorrect') => {
    const reportIndex = reports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) return;

    const report = { ...reports[reportIndex] };
    const now = new Date().toISOString();

    if (voteType === 'confirm') {
      report.confirmationsCount += 1;
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
      if (report.incorrectCount >= 4) {
        report.status = 'FALSE_REPORT';
        // Give author a fake post warning strike!
        const author = allUsers.find(u => u.id === report.userId);
        if (author) {
          const fakeCount = (author.warningStrikes.fakePostCount || 0) + 1;
          let suspUntil = author.suspendedUntil;
          let suspReason = author.suspensionReason;

          if (fakeCount >= 3) {
            const exp = new Date();
            exp.setDate(exp.getDate() + 3);
            suspUntil = exp.toISOString();
            suspReason = 'Suspended for 3 days: 3 verified strikes for posting fabricated/fake reports.';
          }

          const updatedAuthor = {
            ...author,
            warningStrikes: { ...author.warningStrikes, fakePostCount: fakeCount },
            suspendedUntil: suspUntil,
            suspensionReason: suspReason,
          };
          persistUsers(allUsers.map(u => u.id === author.id ? updatedAuthor : u));
        }
      }
    }

    report.updatedAt = now;
    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);
  };

  const updateReportStatus = (reportId: string, status: ReportStatus, note?: string) => {
    const reportIndex = reports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) return;

    const report = { ...reports[reportIndex] };
    report.status = status;
    report.updatedAt = new Date().toISOString();
    report.timeline.push({
      id: `t-${Date.now()}`,
      status,
      titleEn: `Status updated to ${status}${note ? `: ${note}` : ''}`,
      titleBn: `অবস্থা পরিবর্তিত হয়েছে: ${status}${note ? ` (${note})` : ''}`,
      timestamp: new Date().toISOString(),
      actor: user ? user.name : 'Authorized Officer',
    });

    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);
  };

  const submitResolution = (
    reportId: string,
    resolutionData: Omit<ResolutionData, 'id' | 'reportId' | 'verifiedByCommunityCount'>
  ) => {
    const reportIndex = reports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) return;

    const report = { ...reports[reportIndex] };
    const now = new Date().toISOString();

    const fullResolution: ResolutionData = {
      id: `res-${Date.now()}`,
      reportId,
      organizationId: resolutionData.organizationId,
      organizationName: resolutionData.organizationName,
      description: resolutionData.description,
      beforeImage: resolutionData.beforeImage || report.mediaUrl,
      afterImage: resolutionData.afterImage,
      resolvedAt: now,
      verifiedByCommunityCount: 1,
    };

    report.status = 'RESOLVED';
    report.resolution = fullResolution;
    report.resolvedAt = now;
    report.updatedAt = now;
    report.requiresCitizenProofOfWork = true;

    // Rule 25: Tag author user as requiring proof of work completion
    if (user && report.userId === user.id) {
      updateUserProfile({ unresolvedReportIdForWorkProof: report.publicId });
    }

    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);
  };

  // Rule 25: Citizen uploads photos or videos of the done work to unlock future requests
  const submitCitizenProofOfWork = (reportId: string, mediaUrl: string, mediaType: 'image' | 'video', comments: string) => {
    const reportIndex = reports.findIndex(r => r.id === reportId || r.publicId === reportId);
    if (reportIndex === -1 || !reports[reportIndex].resolution) return;

    const report = { ...reports[reportIndex] };
    report.resolution = {
      ...report.resolution!,
      citizenCompletionProof: {
        mediaUrl,
        mediaType,
        uploadedAt: new Date().toISOString(),
        comments,
      },
      verifiedByCommunityCount: report.resolution!.verifiedByCommunityCount + 1,
    };
    report.status = 'COMMUNITY_CONFIRMED';
    report.requiresCitizenProofOfWork = false;

    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);

    // Clear user restriction & award points
    if (user) {
      updateUserProfile({
        unresolvedReportIdForWorkProof: null,
        points: user.points + 20,
        reputationScore: user.reputationScore + 20,
      });
    }
  };

  const confirmResolution = (reportId: string) => {
    const reportIndex = reports.findIndex(r => r.id === reportId);
    if (reportIndex === -1 || !reports[reportIndex].resolution) return;

    const report = { ...reports[reportIndex] };
    report.resolution = {
      ...report.resolution!,
      verifiedByCommunityCount: report.resolution!.verifiedByCommunityCount + 1,
    };
    if (report.resolution.verifiedByCommunityCount >= 3) {
      report.status = 'COMMUNITY_CONFIRMED';
    }

    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);
  };

  const flagDuplicate = (reportId: string, originalId: string) => {
    const reportIndex = reports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) return;
    const report = { ...reports[reportIndex], status: 'DUPLICATE' as ReportStatus };
    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);
  };

  const addComment = (reportId: string, content: string, isOfficial = false): { success: boolean; message?: string } => {
    // Moderation scan
    const scan = scanTextForViolations(content);
    if (scan.flagged) {
      handleModerationViolation(scan.category || 'bad_words');
      return { success: false, message: scan.reasonEn };
    }

    const reportIndex = reports.findIndex(r => r.id === reportId);
    if (reportIndex === -1) return { success: false, message: 'Report not found' };

    const report = { ...reports[reportIndex] };
    const newComment = {
      id: `c-${Date.now()}`,
      userName: isOfficial ? 'Official Municipal Officer' : (user ? user.name : 'Verified Citizen'),
      userAvatar: user?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=Citizen&backgroundColor=0A2540&textColor=ffffff',
      isOfficial,
      content,
      createdAt: new Date().toISOString(),
    };
    report.comments = [...report.comments, newComment];
    const updatedReports = [...reports];
    updatedReports[reportIndex] = report;
    persistReports(updatedReports);
    return { success: true };
  };

  const deleteReport = (reportId: string): { success: boolean; message: string } => {
    const target = reports.find(r => r.id === reportId);
    if (!target) {
      return { success: false, message: 'Report not found' };
    }
    const isSuper = user && (user.email.toLowerCase() === 'smdsami59@gmail.com' || user.isSuperAdmin);
    const isAuthor = user && user.id === target.userId;
    if (!isSuper && !isAuthor) {
      return { success: false, message: 'Permission Denied: Only Super Admin or the report author can delete this report.' };
    }
    const updated = reports.filter(r => r.id !== reportId);
    persistReports(updated);
    return { success: true, message: `Report ${target.publicId} has been successfully deleted.` };
  };

  // 1 Main Community & Personal Groups Messaging with File Support & Moderation
  const sendCommunityMessage = (groupIdOrArea: string, content: string, fileAttachment?: CommunityMessage['fileAttachment']): { success: boolean; violationReason?: string } => {
    if (user?.bannedFromCommunities) {
      return { success: false, violationReason: 'You have been restricted from participating in community discussion rooms by administration.' };
    }

    const scan = scanTextForViolations(content);
    if (scan.flagged) {
      handleModerationViolation(scan.category || 'bad_words');
      return { success: false, violationReason: scan.reasonEn };
    }

    const targetGroupId = groupIdOrArea || 'main-community';

    const newMsg: CommunityMessage = {
      id: `msg-${Date.now()}`,
      groupId: targetGroupId,
      area: targetGroupId === 'main-community' ? 'Bangladesh' : targetGroupId,
      senderId: user ? user.id : 'usr-guest',
      senderName: user ? user.name : 'Community Citizen',
      senderAvatar: user ? user.avatar : 'https://api.dicebear.com/7.x/initials/svg?seed=Citizen&backgroundColor=0A2540&textColor=ffffff',
      senderBadge: user ? user.verificationBadge : 'Citizen',
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileAttachment,
    };

    const updated = [...communityMessages, newMsg];
    setCommunityMessages(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirapod_community_msgs', JSON.stringify(updated));
      fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMsg),
      }).catch(() => {});
    }
    return { success: true };
  };

  const createPersonalGroup = (
    name: string,
    description: string,
    category: PersonalGroup['category'],
    isPrivate: boolean = true
  ): { success: boolean; group?: PersonalGroup; error?: string } => {
    if (!name.trim()) return { success: false, error: 'Group name is required' };

    const newGroup: PersonalGroup = {
      id: `grp-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'Private personal safety circle',
      category,
      creatorId: user ? user.id : 'usr-guest',
      creatorName: user ? user.name : 'Group Founder',
      inviteCode: `NBD-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      membersCount: 1,
      members: [
        {
          id: user ? user.id : 'usr-guest',
          name: user ? `${user.name} (You)` : 'You (Founder)',
          role: 'admin',
          phone: user?.phone,
          joinedAt: 'Just now',
        },
      ],
      createdAt: new Date().toISOString(),
      isPrivate,
      avatarSeed: name.trim(),
    };

    const updated = [newGroup, ...personalGroups];
    setPersonalGroups(updated);
    if (typeof window !== 'undefined') localStorage.setItem('nirapod_personal_groups', JSON.stringify(updated));
    return { success: true, group: newGroup };
  };

  const joinPersonalGroup = (
    inviteCode: string
  ): { success: boolean; group?: PersonalGroup; error?: string } => {
    const rawInput = inviteCode.trim();
    if (!rawInput) return { success: false, error: 'Invite code is required' };

    const cleanCode = rawInput.toUpperCase();
    const alphaNumericInput = cleanCode.replace(/[^A-Z0-9]/g, '');

    // Get latest pool from state AND localStorage
    let pool = [...personalGroups];
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('nirapod_personal_groups');
        if (stored) {
          const parsed: PersonalGroup[] = JSON.parse(stored);
          const map = new Map<string, PersonalGroup>();
          pool.forEach(g => map.set(g.id, g));
          if (Array.isArray(parsed)) {
            parsed.forEach(g => map.set(g.id, g));
          }
          pool = Array.from(map.values());
        }
      } catch {}
    }

    // Flexible matching:
    const group = pool.find((g) => {
      const gCode = (g.inviteCode || '').toUpperCase();
      const gAlpha = gCode.replace(/[^A-Z0-9]/g, '');

      // 1. Exact match (e.g. "NBD-ABCD" === "NBD-ABCD")
      if (gCode === cleanCode) return true;
      // 2. Alphanumeric match (e.g. "NBDABCD" === "NBDABCD")
      if (gAlpha === alphaNumericInput) return true;
      // 3. Suffix match (e.g. user typed "ABCD" and group is "NBD-ABCD")
      if (cleanCode.length >= 3 && (gCode.endsWith(cleanCode) || gAlpha.endsWith(alphaNumericInput))) return true;
      // 4. Prefix match
      if (gAlpha.length >= 3 && (cleanCode.endsWith(gCode) || alphaNumericInput.endsWith(gAlpha))) return true;
      // 5. Match by group ID
      if (g.id.toLowerCase() === rawInput.toLowerCase()) return true;
      // 6. Match by group name
      if (g.name.toLowerCase() === rawInput.toLowerCase()) return true;

      return false;
    });

    if (!group) {
      return { 
        success: false, 
        error: `Group code "${rawInput}" not found. Please verify the invite code provided by the group creator.` 
      };
    }

    const currentUserId = user ? user.id : 'usr-guest';
    const currentUserName = user ? user.name : 'Joined Member';

    const isAlreadyMember = group.members.some((m) => m.id === currentUserId);

    let updatedGroup: PersonalGroup = group;
    if (!isAlreadyMember) {
      updatedGroup = {
        ...group,
        membersCount: (group.membersCount || group.members.length) + 1,
        members: [
          ...group.members,
          {
            id: currentUserId,
            name: currentUserName,
            role: 'member',
            phone: user?.phone,
            joinedAt: 'Just now',
          },
        ],
      };
    }

    const updatedPool = pool.some(g => g.id === updatedGroup.id)
      ? pool.map(g => g.id === updatedGroup.id ? updatedGroup : g)
      : [updatedGroup, ...pool];

    setPersonalGroups(updatedPool);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirapod_personal_groups', JSON.stringify(updatedPool));
    }

    return { success: true, group: updatedGroup };
  };

  // Direct P2P Messaging
  const sendDirectMessage = (recipientId: string, recipientName: string, content: string, fileAttachment?: DirectMessage['fileAttachment']): { success: boolean; violationReason?: string } => {
    if (!user) {
      return { success: false, violationReason: 'Please sign in or create an account to start direct messaging.' };
    }

    if (user.bannedFromCommunities) {
      return { success: false, violationReason: 'Your account is restricted from direct messaging.' };
    }

    const scan = scanTextForViolations(content);
    if (scan.flagged) {
      handleModerationViolation(scan.category || 'bad_words');
      return { success: false, violationReason: scan.reasonEn };
    }

    const convId = [user.id, recipientId].sort().join('-');
    const newDm: DirectMessage = {
      id: `dm-${Date.now()}`,
      conversationId: convId,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      recipientId,
      recipientName,
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fileAttachment,
    };

    const updated = [...directMessages, newDm];
    setDirectMessages(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nirapod_direct_msgs', JSON.stringify(updated));
      fetch('/api/direct-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDm),
      }).catch(() => {});
    }
    return { success: true };
  };

  // Lost & Found
  const addLostAndFoundItem = (item: Omit<LostAndFoundItem, 'id' | 'createdAt'>) => {
    const newItem: LostAndFoundItem = {
      ...item,
      id: `laf-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newItem, ...lostAndFoundItems];
    setLostAndFoundItems(updated);
    if (typeof window !== 'undefined') localStorage.setItem('nirapod_lost_and_found', JSON.stringify(updated));
  };

  const searchLostAndFound = (query: string, locationOrArea?: string, category?: string) => {
    return lostAndFoundItems.filter(item => {
      if (category && category !== 'all' && item.category !== category) return false;
      if (locationOrArea && locationOrArea.trim() && locationOrArea !== 'all') {
        const loc = locationOrArea.toLowerCase();
        const matchArea = item.area.toLowerCase().includes(loc);
        const matchLocation = item.specificLocation.toLowerCase().includes(loc);
        if (!matchArea && !matchLocation) return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          item.itemName.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.specificLocation.toLowerCase().includes(q)
        );
      }
      return true;
    });
  };

  const updatePrivacySettings = (settings: Partial<UserProfile['privacySettings']>) => {
    if (!user) return;
    const updated = { ...user, privacySettings: { ...user.privacySettings, ...settings } };
    persistUsers(allUsers.map(u => u.id === user.id ? updated : u), updated);
  };

  const markNotificationAsRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, isRead: true } : n);
    persistNotifications(updated);
  };

  const markAllNotificationsAsRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    persistNotifications(updated);
  };

  const getReportById = (id: string) => {
    return reports.find(r => r.id === id || r.publicId.toLowerCase() === id.toLowerCase());
  };

  const unreadNotificationsCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        reports,
        user,
        allUsers,
        notifications,
        unreadNotificationsCount,
        isOffline,
        offlineQueueCount: offlineQueue.length,
        login,
        register,
        logout,
        switchUser,
        updateUserRole,
        updateUserProfile,
        suspendUser,
        revokeSuspension,
        banUserFromCommunity,
        suspensionLogs,
        addReport,
        verifyReport,
        updateReportStatus,
        submitResolution,
        confirmResolution,
        submitCitizenProofOfWork,
        flagDuplicate,
        addComment,
        deleteReport,
        getReportById,
        checkDuplicateReport,
        personalGroups,
        createPersonalGroup,
        joinPersonalGroup,
        communityMessages,
        directMessages,
        sendCommunityMessage,
        sendDirectMessage,
        lostAndFoundItems,
        addLostAndFoundItem,
        searchLostAndFound,
        updatePrivacySettings,
        markNotificationAsRead,
        markAllNotificationsAsRead,
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
