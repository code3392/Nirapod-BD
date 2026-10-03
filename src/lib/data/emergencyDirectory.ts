import { PoliceStationInfo, HospitalAmbulanceInfo } from '@/types';

export interface LocalHelper {
  id: string;
  name: string;
  phone: string;
  email: string;
  area: string;
  role: string;
  isAvailable: boolean;
}

export const DHAKA_POLICE_STATIONS: Record<string, PoliceStationInfo> = {
  Mirpur: {
    thanaName: 'Mirpur Model Police Station (DMP)',
    zone: 'Mirpur Division',
    dutyOfficerMobile: '01320-041444',
    landline: '02-9001001',
    distanceKm: 0.8,
    address: 'Plot 1, Section 2, Mirpur, Dhaka 1216',
  },
  Dhanmondi: {
    thanaName: 'Dhanmondi Model Police Station (DMP)',
    zone: 'Ramna Division',
    dutyOfficerMobile: '01320-042222',
    landline: '02-9663333',
    distanceKm: 1.1,
    address: 'Road 7, Dhanmondi R/A, Dhaka 1205',
  },
  Uttara: {
    thanaName: 'Uttara West Police Station (DMP)',
    zone: 'Uttara Division',
    dutyOfficerMobile: '01320-041888',
    landline: '02-8951111',
    distanceKm: 0.9,
    address: 'Sector 3, Jashimuddin Road, Uttara, Dhaka 1230',
  },
  Mohammadpur: {
    thanaName: 'Mohammadpur Police Station (DMP)',
    zone: 'Tejgaon Division',
    dutyOfficerMobile: '01320-042000',
    landline: '02-9119999',
    distanceKm: 1.2,
    address: 'Gaznavi Road, Mohammadpur, Dhaka 1207',
  },
  Gulshan: {
    thanaName: 'Gulshan Police Station (DMP)',
    zone: 'Gulshan Division',
    dutyOfficerMobile: '01320-041777',
    landline: '02-9882222',
    distanceKm: 1.0,
    address: 'Road 118, Gulshan-2, Dhaka 1212',
  },
  Motijheel: {
    thanaName: 'Motijheel Police Station (DMP)',
    zone: 'Motijheel Division',
    dutyOfficerMobile: '01320-040888',
    landline: '02-9563333',
    distanceKm: 0.7,
    address: 'Arambagh, Motijheel C/A, Dhaka 1000',
  },
  Banani: {
    thanaName: 'Banani Police Station (DMP)',
    zone: 'Gulshan Division',
    dutyOfficerMobile: '01320-041800',
    landline: '02-9880200',
    distanceKm: 1.3,
    address: 'Road 11, Block E, Banani, Dhaka 1213',
  },
  Badda: {
    thanaName: 'Badda Police Station (DMP)',
    zone: 'Gulshan Division',
    dutyOfficerMobile: '01320-041744',
    landline: '02-9884500',
    distanceKm: 1.4,
    address: 'Pragati Sarani, Middle Badda, Dhaka 1212',
  },
  'Old Dhaka': {
    thanaName: 'Lalbagh Police Station (DMP)',
    zone: 'Lalbagh Division',
    dutyOfficerMobile: '01320-040222',
    landline: '02-7313333',
    distanceKm: 1.0,
    address: 'Lalbagh Road, Old Dhaka 1211',
  },
  Farmgate: {
    thanaName: 'Tejgaon Police Station (DMP)',
    zone: 'Tejgaon Division',
    dutyOfficerMobile: '01320-041944',
    landline: '02-9118888',
    distanceKm: 0.9,
    address: 'Kazi Nazrul Islam Avenue, Farmgate, Dhaka 1215',
  },
};

export const DHAKA_HOSPITALS_AMBULANCES: Record<string, HospitalAmbulanceInfo> = {
  Mirpur: {
    hospitalName: 'Shaheed Suhrawardy Medical College & Hospital',
    ambulanceHotline: '16263',
    emergencyPhone: '02-9130800',
    distanceKm: 2.1,
    address: 'Sher-e-Bangla Nagar, Mirpur Road, Dhaka',
  },
  Dhanmondi: {
    hospitalName: 'Dhaka Medical College Hospital (DMCH Emergency)',
    ambulanceHotline: '16263',
    emergencyPhone: '02-55165088',
    distanceKm: 2.4,
    address: 'Secretariat Road, Dhaka 1000',
  },
  Uttara: {
    hospitalName: 'Kurmitola General Hospital Emergency',
    ambulanceHotline: '02-55062333',
    emergencyPhone: '01769-010200',
    distanceKm: 1.8,
    address: 'Airport Road, Cantonment, Dhaka',
  },
  Mohammadpur: {
    hospitalName: 'National Institute of Traumatology (Pangu Hospital)',
    ambulanceHotline: '16263',
    emergencyPhone: '02-9144190',
    distanceKm: 1.5,
    address: 'Sher-e-Bangla Nagar, Dhaka',
  },
  Gulshan: {
    hospitalName: 'United Hospital / Evercare Emergency Ambulance',
    ambulanceHotline: '10666',
    emergencyPhone: '02-8836000',
    distanceKm: 1.2,
    address: 'Plot 15, Road 71, Gulshan-2, Dhaka',
  },
  Motijheel: {
    hospitalName: 'Islami Bank Central Hospital & Trauma Centre',
    ambulanceHotline: '02-9355801',
    emergencyPhone: '01711-235480',
    distanceKm: 0.9,
    address: 'Kakrail VIP Road, Motijheel Zone, Dhaka',
  },
  Banani: {
    hospitalName: 'Kurmitola General Hospital Emergency',
    ambulanceHotline: '02-55062333',
    emergencyPhone: '01769-010200',
    distanceKm: 2.2,
    address: 'Dhaka Cantonment, Airport Highway',
  },
  Badda: {
    hospitalName: 'Badda General Hospital & Rapid Trauma Unit',
    ambulanceHotline: '16263',
    emergencyPhone: '01819-214433',
    distanceKm: 1.1,
    address: 'Middle Badda, Pragati Sarani, Dhaka',
  },
  'Old Dhaka': {
    hospitalName: 'Sir Salimullah Medical College (Mitford Hospital)',
    ambulanceHotline: '16263',
    emergencyPhone: '02-7319002',
    distanceKm: 1.3,
    address: 'Mitford Road, Old Dhaka',
  },
  Farmgate: {
    hospitalName: 'Holy Family Red Crescent Medical College Hospital',
    ambulanceHotline: '02-8311721',
    emergencyPhone: '01819-211111',
    distanceKm: 1.6,
    address: 'Eskaton Garden Road, Dhaka',
  },
};

export const VERIFIED_LOCAL_HELPERS: LocalHelper[] = [
  {
    id: 'help-1',
    name: 'Kazi Zubair Hossain',
    phone: '+880 1914-567890',
    email: 'kazi.zubair@redcrescent.org.bd',
    area: 'Mirpur',
    role: 'Civil Defense & Disaster Volunteer Lead',
    isAvailable: true,
  },
  {
    id: 'help-2',
    name: 'Sabrina Rahman',
    phone: '+880 1819-345678',
    email: 'sabrina.rahman@nirapodbd.community',
    area: 'Dhanmondi',
    role: 'Red Crescent First Aid Responder',
    isAvailable: true,
  },
  {
    id: 'help-3',
    name: 'Tanvir Ahmed',
    phone: '+880 1711-234567',
    email: 'tanvir.ahmed@uttaraguardians.org',
    area: 'Uttara',
    role: 'Sector 7 Community Watch Coordinator',
    isAvailable: true,
  },
  {
    id: 'help-4',
    name: 'Mahbubur Rahman',
    phone: '+880 1612-456789',
    email: 'mahbub.rahman@gmail.com',
    area: 'Mohammadpur',
    role: 'Ward 31 Community Volunteer',
    isAvailable: true,
  },
  {
    id: 'help-5',
    name: 'Nusrat Jahan',
    phone: '+880 1715-678901',
    email: 'nusrat.jahan@gulshanwatch.org',
    area: 'Gulshan',
    role: 'First Aid Volunteer & Blood Liaison',
    isAvailable: true,
  },
  {
    id: 'help-6',
    name: 'Asif Mahmud',
    phone: '+880 1511-789012',
    email: 'asif.mahmud@motijheel.gov.bd',
    area: 'Motijheel',
    role: 'Commercial Zone Safety Warden',
    isAvailable: true,
  },
];

export function getNearestPolice(areaName: string): PoliceStationInfo {
  return DHAKA_POLICE_STATIONS[areaName] || DHAKA_POLICE_STATIONS['Mirpur'];
}

export function getNearestAmbulance(areaName: string): HospitalAmbulanceInfo {
  return DHAKA_HOSPITALS_AMBULANCES[areaName] || DHAKA_HOSPITALS_AMBULANCES['Mirpur'];
}

export function getNearbyHelpers(areaName: string): LocalHelper[] {
  const match = VERIFIED_LOCAL_HELPERS.filter((h) => h.area.toLowerCase() === areaName.toLowerCase());
  return match.length > 0 ? match : VERIFIED_LOCAL_HELPERS.slice(0, 2);
}

export interface ServiceProviderItem {
  id: string;
  nameEn: string;
  nameBn: string;
  number: string;
  category: 'emergency' | 'utility' | 'health' | 'civic' | 'children_women';
  badgeEn: string;
  badgeBn: string;
  descriptionEn: string;
  descriptionBn: string;
  available: string;
  isTollFree?: boolean;
}

export const BANGLADESH_EMERGENCY_PROVIDERS: ServiceProviderItem[] = [
  {
    id: 'sp-999',
    nameEn: 'National Emergency Service (999)',
    nameBn: 'জাতীয় জরুরি সেবা (৯৯৯)',
    number: '999',
    category: 'emergency',
    badgeEn: 'Toll-Free 24/7',
    badgeBn: 'টোল-ফ্রি ২৪/৭',
    descriptionEn: 'Immediate Police, Fire Brigade, and Government Ambulance dispatch across Bangladesh.',
    descriptionBn: 'বাংলাদেশ পুলিশ, ফায়ার সার্ভিস এবং সরকারি অ্যাম্বুলেন্স জরুরি সহায়তা।',
    available: '24/7/365',
    isTollFree: true,
  },
  {
    id: 'sp-16263',
    nameEn: 'DGHS Health Window (Shastho Batayan)',
    nameBn: 'স্বাস্থ্য বাতায়ন (১৬২৬৩)',
    number: '16263',
    category: 'health',
    badgeEn: 'Govt Health Hotline',
    badgeBn: 'সরকারি স্বাস্থ্য সেবা',
    descriptionEn: 'Directorate General of Health Services 24/7 doctor consultations and ambulance coordination.',
    descriptionBn: 'স্বাস্থ্য অধিদপ্তর কর্তৃক ২৪ ঘণ্টা বিনামূল্যে সরকারি চিকিৎসকের পরামর্শ ও অ্যাম্বুলেন্স সহায়তা।',
    available: '24 Hours',
    isTollFree: true,
  },
  {
    id: 'sp-109',
    nameEn: 'National Helpline for Violence Against Women & Children',
    nameBn: 'নারী ও শিশু নির্যাতন প্রতিরোধ হেল্পলাইন (১০৯)',
    number: '109',
    category: 'children_women',
    badgeEn: 'Toll-Free Support',
    badgeBn: 'টোল-ফ্রি সহায়তা',
    descriptionEn: 'Ministry of Women and Children Affairs rapid legal, medical, and security intervention.',
    descriptionBn: 'মহিলা ও শিশু বিষয়ক মন্ত্রণালয় কর্তৃক জরুরি আইনি, চিকিৎসা ও নিরাপত্তা সহায়তা।',
    available: '24/7',
    isTollFree: true,
  },
  {
    id: 'sp-333',
    nameEn: 'Citizen Services & Govt Info (333)',
    nameBn: 'জাতীয় তথ্য বাতায়ন ও নাগরিক সেবা (৩৩৩)',
    number: '333',
    category: 'civic',
    badgeEn: 'Citizen Portal',
    badgeBn: 'নাগরিক তথ্য',
    descriptionEn: 'Government administrative procedures, social safety net inquiries, and district administration aid.',
    descriptionBn: 'সরকারি সেবা, সামাজিক নিরাপত্তা ও জেলা প্রশাসনের যেকোনো তথ্য সেবা।',
    available: '24 Hours',
  },
  {
    id: 'sp-1098',
    nameEn: 'Child Helpline Bangladesh',
    nameBn: 'চাইল্ড হেল্পলাইন বাংলাদেশ (১০৯৮)',
    number: '1098',
    category: 'children_women',
    badgeEn: 'Child Protection',
    badgeBn: 'শিশু সুরক্ষা',
    descriptionEn: 'Dedicated child rescue, emergency relief, and protection from abuse.',
    descriptionBn: 'বিপদাপন্ন শিশুদের উদ্ধার ও তাৎক্ষণিক সহায়তা প্রদান।',
    available: '24/7',
    isTollFree: true,
  },
  {
    id: 'sp-wasa',
    nameEn: 'Dhaka WASA Hotline',
    nameBn: 'ঢাকা ওয়াসা জরুরি হটলাইন (১৬১৬২)',
    number: '16162',
    category: 'utility',
    badgeEn: 'Water & Drainage',
    badgeBn: 'পানি ও পয়ঃনিষ্কাশন',
    descriptionEn: 'Emergency water supply breakdown, sewer overflow, and urban drainage clearance.',
    descriptionBn: 'পাইপলাইন লিকেজ, পয়ঃনিষ্কাশন সমস্যা ও জরুরি পানির গাড়ি সরবরাহ।',
    available: '24 Hours',
  },
  {
    id: 'sp-desco',
    nameEn: 'DESCO Electricity Emergency',
    nameBn: 'ডেসকো বিদ্যুৎ জরুরি কন্ট্রোল রুম (১৬১২০)',
    number: '16120',
    category: 'utility',
    badgeEn: 'Power Grid North',
    badgeBn: 'বিদ্যুৎ বিতরণ উত্তর',
    descriptionEn: 'Dhaka North electrical faults, sparking transformers, dangling live wires, and outages.',
    descriptionBn: 'মিরপুর, উত্তরা, গুলশান এলাকার জরুরি বিদ্যুৎ বিভ্রাট ও বিপদজনক তার মেরামত।',
    available: '24/7',
  },
  {
    id: 'sp-dpdc',
    nameEn: 'DPDC Electricity Emergency',
    nameBn: 'ডিপিডিসি বিদ্যুৎ জরুরি কন্ট্রোল রুম (১৬১১৬)',
    number: '16116',
    category: 'utility',
    badgeEn: 'Power Grid South',
    badgeBn: 'বিদ্যুৎ বিতরণ দক্ষিণ',
    descriptionEn: 'Dhaka South and Central power faults, electrical safety hazards, and rapid line repair.',
    descriptionBn: 'ধানমন্ডি, মতিঝিল, পুরান ঢাকা এলাকার বিদ্যুৎ বিপর্যয় ও জরুরি মেরামত।',
    available: '24/7',
  },
  {
    id: 'sp-titas',
    nameEn: 'Titas Gas Emergency Control Room',
    nameBn: 'তিতাস গ্যাস জরুরি গ্যাস লিকেজ হটলাইন (১৬৪৯৬)',
    number: '16496',
    category: 'utility',
    badgeEn: 'Gas Leakage Hotline',
    badgeBn: 'গ্যাস লিকেজ জরুরি',
    descriptionEn: 'Emergency response for gas pipeline leaks, underground fire hazards, and riser bursts.',
    descriptionBn: 'গ্যাস লিকেজ, গ্যাস অগ্নিকাণ্ড ও পাইপলাইন দুর্ঘটনা রোধে জরুরি তল্লাশি ও কাট-অফ।',
    available: '24 Hours',
  },
  {
    id: 'sp-fire',
    nameEn: 'Fire Service & Civil Defence Central Control',
    nameBn: 'ফায়ার সার্ভিস ও সিভিল ডিফেন্স কেন্দ্রীয় নিয়ন্ত্রণ কক্ষ',
    number: '02-223355555',
    category: 'emergency',
    badgeEn: 'Central HQ Hotline',
    badgeBn: 'সদর দপ্তর কন্ট্রোল রুম',
    descriptionEn: 'Direct command hotline for multi-station building fire, chemical hazard, and structural collapse.',
    descriptionBn: 'বহুতল ভবনে অগ্নিকাণ্ড, রাসায়নিক ঝুঁকি ও ভবন ধসে কেন্দ্রীয় ফায়ার রেসকিউ তল্লাশি।',
    available: '24/7',
  },
];

