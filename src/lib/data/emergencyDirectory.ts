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
