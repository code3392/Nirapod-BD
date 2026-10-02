// Nirapod BD Automated AI Moderation Engine
// Rules:
// 1. Bad words / Profanity -> Strike system: >3 times => 5-day suspension
// 2. Racism / Hate speech -> Strike system: 3 times => 5-day suspension
// 3. Commercial Ads -> Strictly prohibited in community hubs (Public safety only)

const PROFANITY_LIST = [
  'bastard', 'bitch', 'asshole', 'fuck', 'shit', 'crap', 'idiot', 'stupid',
  'harami', 'kutta', 'shala', 'khankir', 'magir', 'madarchod', 'gandu', 'chudir'
];

const RACISM_LIST = [
  'nigger', 'chink', 'paki', 'malu', 'kalo manush', 'tribal subhuman',
  'hate all hindus', 'hate all muslims', 'hate all chakma', 'rohingya vermin',
  'racial slurs', 'racial cleansing', 'inferior race'
];

const COMMERCIAL_AD_PATTERNS = [
  /buy now/i,
  /discount offer/i,
  /flat 50% off/i,
  /call for loan/i,
  /crypto investment/i,
  /telegram: @/i,
  /whatsapp for business/i,
  /casino/i,
  /betting site/i,
  /earn money fast/i,
  /dm for price/i,
];

export interface ModerationResult {
  flagged: boolean;
  category?: 'bad_words' | 'racism' | 'commercial_ad';
  matchedTerm?: string;
  reasonEn?: string;
  reasonBn?: string;
}

export function scanTextForViolations(text: string): ModerationResult {
  const lower = text.toLowerCase();

  // 1. Check Racism / Hate Speech
  for (const term of RACISM_LIST) {
    if (lower.includes(term)) {
      return {
        flagged: true,
        category: 'racism',
        matchedTerm: term,
        reasonEn: 'Zero-tolerance violation: Discriminatory or hate-speech content detected.',
        reasonBn: 'জাতিগত বা বিদ্বেষমূলক বক্তব্য শনাক্ত করা হয়েছে যা সম্পূর্ণ নিষিদ্ধ।',
      };
    }
  }

  // 2. Check Profanity / Bad Words
  for (const word of PROFANITY_LIST) {
    // Word boundary check
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(lower) || lower.includes(` ${word} `)) {
      return {
        flagged: true,
        category: 'bad_words',
        matchedTerm: word,
        reasonEn: 'Inappropriate language or abusive words detected.',
        reasonBn: 'অপমানজনক বা গালিগালাজপূর্ণ ভাষা ব্যবহারের জন্য সতর্কবার্তা।',
      };
    }
  }

  // 3. Check Commercial Advertising
  for (const pattern of COMMERCIAL_AD_PATTERNS) {
    if (pattern.test(lower)) {
      return {
        flagged: true,
        category: 'commercial_ad',
        reasonEn: 'Commercial advertising is prohibited. Nirapod BD is exclusively for public safety.',
        reasonBn: 'কমিউনিটিতে কোনো বাণিজ্যিক বিজ্ঞাপন দেওয়া সম্পূর্ণ নিষিদ্ধ। এটি শুধুমাত্র জননিরাপত্তার জন্য।',
      };
    }
  }

  return { flagged: false };
}
