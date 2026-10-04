export type Language = 'en' | 'bn';

export type CategoryId =
  | 'road_traffic'
  | 'waste'
  | 'waterlogging'
  | 'streetlight'
  | 'electrical'
  | 'fire'
  | 'medical'
  | 'missing_person'
  | 'infrastructure'
  | 'other';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'emergency';

export type ReportStatus =
  | 'SUBMITTED'
  | 'AI_ANALYZED'
  | 'UNDER_REVIEW'
  | 'VERIFIED'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'RESOLVED'
  | 'COMMUNITY_CONFIRMED'
  | 'REJECTED'
  | 'DUPLICATE'
  | 'FALSE_REPORT';

export type UserRole = 'Super Admin' | 'Admin' | 'Moderator' | 'Community Guardian' | 'Citizen';

export interface CategoryInfo {
  id: CategoryId;
  nameEn: string;
  nameBn: string;
  icon: string;
  color: string;
  bgColor: string;
  descriptionEn: string;
  descriptionBn: string;
}

export interface TimelineEvent {
  id: string;
  status: ReportStatus;
  titleEn: string;
  titleBn: string;
  descriptionEn?: string;
  descriptionBn?: string;
  timestamp: string;
  actor?: string;
  badgeColor?: string;
}

export interface ResolutionData {
  id: string;
  reportId: string;
  organizationId: string;
  organizationName: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  resolvedAt: string;
  verifiedByCommunityCount: number;
  citizenCompletionProof?: {
    mediaUrl: string;
    mediaType: 'image' | 'video';
    uploadedAt: string;
    comments: string;
  };
}

export interface VerificationVote {
  userId: string;
  type: 'confirm' | 'not_sure' | 'incorrect';
  timestamp: string;
}

export interface ReportComment {
  id: string;
  userName: string;
  userAvatar?: string;
  isOfficial?: boolean;
  content: string;
  createdAt: string;
}

export interface PoliceStationInfo {
  thanaName: string;
  zone: string;
  dutyOfficerMobile: string;
  dutyOfficerName?: string;
  hotlineMobile?: string;
  landline: string;
  distanceKm: number;
  address: string;
}

export interface HospitalAmbulanceInfo {
  hospitalName: string;
  ambulanceHotline: string;
  emergencyPhone: string;
  emergencyHotline?: string;
  icuAvailable?: boolean;
  distanceKm: number;
  address: string;
}

export interface VolunteerDispatchLog {
  id: string;
  volunteerName: string;
  volunteerPhone: string;
  volunteerEmail: string;
  area: string;
  distanceMeters: number;
  emailSent: boolean;
  whatsappUrl: string;
  dispatchedAt: string;
}

export interface Report {
  id: string;
  publicId: string; // e.g. NRP-10482
  userId: string;
  userName: string;
  userEmail?: string;
  userPhone?: string;
  userAvatar?: string;
  categoryId: CategoryId;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  locationName: string;
  district: string;
  area: string; // e.g. Mirpur, Uttara, Dhanmondi
  severity: SeverityLevel;
  status: ReportStatus;
  
  // Photo or Video (Supports both mediaUrl and backwards-compatible imageUrl)
  mediaType: 'image' | 'video';
  mediaUrl: string;
  imageUrl?: string;
  timeNoticed: 'just_now' | 'today' | 'yesterday' | 'week_ago';
  
  // AI analysis metadata
  aiCategory?: CategoryId;
  aiCategoryName?: string;
  aiConfidence?: number; // 0 - 100
  aiRisks?: string[];
  aiSuggestedSeverity?: SeverityLevel;
  
  // Community engagement
  confirmationsCount: number;
  notSureCount: number;
  incorrectCount: number;
  userVotes?: VerificationVote[];
  
  // Emergency Contacts Auto Computed
  nearestPolice?: PoliceStationInfo;
  nearestAmbulance?: HospitalAmbulanceInfo;
  
  // Nearby Helper & Volunteer Auto Notifications
  dispatchedVolunteers?: VolunteerDispatchLog[];
  
  // Organizations & Resolution
  assignedOrganization?: {
    id: string;
    name: string;
    type: string;
    assignedAt: string;
  };
  resolution?: ResolutionData;
  requiresCitizenProofOfWork?: boolean;
  
  // Timeline and comments
  timeline: TimelineEvent[];
  comments: ReportComment[];
  
  // Privacy
  isExactLocationHidden?: boolean;
  isAnonymous?: boolean;
  
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

export interface WarningStrikes {
  fakePostCount: number;
  badWordsCount: number;
  racismCount: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  role: UserRole;
  isSuperAdmin: boolean;
  phone: string;
  livingPlace: string;
  area: string;
  age: number;
  bloodGroup: string;
  occupation: string;
  
  // Great Verification Status
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isIdVerified: boolean;
  verificationBadge: 'Unverified' | 'Phone Verified' | 'Greatly Verified Guardian';
  verificationStatus?: 'GREATLY_VERIFIED' | 'VERIFIED' | 'UNVERIFIED';
  nidNumber?: string;
  nidVerified?: boolean;
  
  reputationScore: number;
  verificationLevel: string;
  reportsSubmitted: number;
  reportsVerified: number;
  helpfulConfirmations: number;
  points: number;
  badges: Badge[];
  
  // Moderation & Suspension
  warningStrikes: WarningStrikes;
  suspendedUntil: string | null; // ISO string if suspended
  suspensionReason: string | null;
  bannedFromCommunities: boolean;
  bannedFromCreatingCommunity?: boolean;
  
  // Rule 25: Unresolved request pending resolution proof
  unresolvedReportIdForWorkProof: string | null;
  
  privacySettings: {
    showApproximateLocation: boolean;
    hideIdentityPublicly: boolean;
    allowCommunityNotifications: boolean;
  };
}

export interface Badge {
  id: string;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  icon: string;
  earnedAt?: string;
  isUnlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export interface NotificationItem {
  id: string;
  titleEn: string;
  titleBn: string;
  messageEn: string;
  messageBn: string;
  timestamp: string;
  isRead: boolean;
  type: 'verified' | 'confirmation' | 'resolved' | 'points' | 'emergency' | 'suspension' | 'email_sent';
  link?: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'City Corporation' | 'Fire Service' | 'Police Dept' | 'WASA' | 'DPDC / DESCO' | 'NGO' | 'Roads & Highways';
  location: string;
  verified: boolean;
  activeReportsCount: number;
  resolvedReportsCount: number;
}

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  matchedReport?: Report;
  distanceMeters?: number;
  similarityPercentage?: number;
}

// 1 Unified Main Community & Personal Safety Groups
export interface PersonalGroupMember {
  id: string;
  name: string;
  role: 'admin' | 'member';
  phone?: string;
  avatar?: string;
  joinedAt: string;
}

export interface PersonalGroup {
  id: string;
  name: string;
  description: string;
  category: 'family' | 'neighborhood' | 'office' | 'friends' | 'volunteer' | 'other';
  creatorId: string;
  creatorName: string;
  inviteCode: string;
  membersCount: number;
  members: PersonalGroupMember[];
  createdAt: string;
  isPrivate: boolean;
  avatarSeed?: string;
}

export interface CommunityMessage {
  id: string;
  groupId: string; // 'main-community' or personal group id
  area?: string; // Optional fallback
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderBadge: string;
  content: string;
  timestamp: string;
  fileAttachment?: {
    name: string;
    size: string;
    type: string;
    url: string;
  };
}

// User-to-User Direct Message
export interface DirectMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  recipientName: string;
  content: string;
  timestamp: string;
  fileAttachment?: {
    name: string;
    size: string;
    type: string;
    url: string;
  };
}

// Lost & Found
export interface LostAndFoundItem {
  id: string;
  type: 'lost' | 'found';
  itemName: string;
  description: string;
  category: 'electronics' | 'documents' | 'wallet' | 'keys' | 'pets' | 'jewelry' | 'other';
  area: string; // Mirpur, Uttara, Dhanmondi, etc.
  specificLocation: string;
  date: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  contactPerson: string;
  contactPhone: string;
  contactEmail: string;
  reward?: string;
  status: 'active' | 'claimed' | 'returned';
  createdAt: string;
}

// Suspension Audit Log
export interface SuspensionAuditLog {
  id: string;
  targetUserId: string;
  targetUserName: string;
  targetUserEmail: string;
  userName?: string;
  userEmail?: string;
  authorizedBy?: string;
  action: 'SUSPENDED' | 'RESTORED' | 'WARNING_ISSUED' | 'COMMUNITY_BAN';
  reason: string;
  durationDays?: number;
  issuedByEmail: string;
  emailSentContent: string;
  timestamp: string;
}
