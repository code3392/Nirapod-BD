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

export interface Report {
  id: string;
  publicId: string; // e.g. NRP-10482
  userId: string;
  userName: string;
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
  imageUrl: string;
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
  
  // Organizations & Resolution
  assignedOrganization?: {
    id: string;
    name: string;
    type: string;
    assignedAt: string;
  };
  resolution?: ResolutionData;
  
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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  reputationScore: number;
  verificationLevel: string;
  reportsSubmitted: number;
  reportsVerified: number;
  helpfulConfirmations: number;
  points: number;
  badges: Badge[];
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
  type: 'verified' | 'confirmation' | 'resolved' | 'points' | 'emergency';
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
