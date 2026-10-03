import { 
  Report, 
  UserProfile, 
  NotificationItem, 
  CommunityMessage, 
  DirectMessage, 
  LostAndFoundItem, 
  SuspensionAuditLog 
} from '@/types';
import { getNearestPolice, getNearestAmbulance, getNearbyHelpers } from './emergencyDirectory';

// SUPER ADMIN ACCOUNT (smdsami59@gmail.com)
export const SUPER_ADMIN_USER: UserProfile = {
  id: 'usr-super-admin',
  name: 'Samiul Haque (Super Admin)',
  email: 'smdsami59@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  role: 'Super Admin',
  isSuperAdmin: true,
  phone: '+880 1700-112233',
  livingPlace: 'Banani DOHS, Dhaka',
  area: 'Banani',
  age: 32,
  bloodGroup: 'O+',
  occupation: 'Platform Founder & Lead Civic Architect',
  isEmailVerified: true,
  isPhoneVerified: true,
  isIdVerified: true,
  verificationBadge: 'Greatly Verified Guardian',
  reputationScore: 2450,
  verificationLevel: 'Supreme Civic Moderator',
  reportsSubmitted: 0,
  reportsVerified: 0,
  helpfulConfirmations: 0,
  points: 2450,
  warningStrikes: {
    fakePostCount: 0,
    badWordsCount: 0,
    racismCount: 0,
  },
  suspendedUntil: null,
  suspensionReason: null,
  bannedFromCommunities: false,
  unresolvedReportIdForWorkProof: null,
  badges: [],
  privacySettings: {
    showApproximateLocation: false,
    hideIdentityPublicly: false,
    allowCommunityNotifications: true,
  },
};

export const INITIAL_USER: UserProfile = SUPER_ADMIN_USER;

// Authorized Administrative Registry
export const INITIAL_USER_REGISTRY: UserProfile[] = [
  SUPER_ADMIN_USER,
];

// ZERO FAKE POSTS: The platform starts clean. Real citizen reports only.
export const INITIAL_REPORTS: Report[] = [];

// Area-wise Community Hub Messages (Starts clean)
export const INITIAL_COMMUNITY_MESSAGES: CommunityMessage[] = [];

// Initial Direct Messages between Users (Starts clean)
export const INITIAL_DIRECT_MESSAGES: DirectMessage[] = [];

// Initial Lost & Found Items across Dhaka (Starts clean)
export const INITIAL_LOST_AND_FOUND: LostAndFoundItem[] = [];

// Initial System Notifications (Starts clean)
export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];
