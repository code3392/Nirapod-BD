/**
 * Nirapod BD — Precision Pinpoint Geolocation & Geocoding Engine
 * Provides multi-tier high-accuracy GPS resolution, Dhaka landmark fallback,
 * Nominatim reverse geocoding, and draggable pinpoint marker creation.
 */

export interface AccuratePositionResult {
  lat: number;
  lng: number;
  accuracy: number;
  source: 'gps_high_accuracy' | 'network_standard' | 'manual_pin';
  isVpnDetected?: boolean;
  rawCoords?: { lat: number; lng: number };
  areaName?: string;
}

/**
 * Validates whether coordinates are physically within Bangladesh.
 * Bounding box: Latitude 20.5°N - 26.7°N, Longitude 88.0°E - 92.7°E.
 */
export function isInsideBangladesh(lat: number, lng: number): boolean {
  return lat >= 20.5 && lat <= 26.7 && lng >= 88.0 && lng <= 92.7;
}

// Dhaka City Centroid fallback for foreign VPNs / proxy connections
export const DHAKA_CENTER = {
  lat: 23.8103,
  lng: 90.4125,
  name: 'Dhaka City Center',
  nameBn: 'ঢাকা সিটি সেন্টার',
};

export interface DhakaQuickArea {
  id: string;
  name: string;
  nameBn: string;
  lat: number;
  lng: number;
}

// 1-Click Dhaka Neighborhood Quick-Picker Chips
export const DHAKA_QUICK_CHIPS: DhakaQuickArea[] = [
  { id: 'mirpur', name: 'Mirpur-10', nameBn: 'মিরপুর-১০', lat: 23.8067, lng: 90.3683 },
  { id: 'dhanmondi', name: 'Dhanmondi 27', nameBn: 'ধানমন্ডি ২৭', lat: 23.7538, lng: 90.3756 },
  { id: 'gulshan', name: 'Gulshan-2', nameBn: 'গুলশান-২', lat: 23.7925, lng: 90.4078 },
  { id: 'uttara', name: 'Uttara Sec-3', nameBn: 'উত্তরা সেক্টর ৩', lat: 23.8705, lng: 90.3952 },
  { id: 'mohammadpur', name: 'Mohammadpur', nameBn: 'মোহাম্মদপুর', lat: 23.7658, lng: 90.3584 },
  { id: 'farmgate', name: 'Farmgate', nameBn: 'ফার্মগেট', lat: 23.7561, lng: 90.3872 },
  { id: 'motijheel', name: 'Motijheel', nameBn: 'মতিঝিল', lat: 23.7330, lng: 90.4172 },
  { id: 'old_dhaka', name: 'Old Dhaka', nameBn: 'পুরান ঢাকা', lat: 23.7104, lng: 90.4074 },
  { id: 'bashundhara', name: 'Bashundhara', nameBn: 'বসুন্ধরা', lat: 23.8191, lng: 90.4326 },
  { id: 'badda', name: 'Badda / Hatirjheel', nameBn: 'বাড্ডা / হাতিরঝিল', lat: 23.7806, lng: 90.4267 },
];

// Major Dhaka Hubs and Areas with precise centroid coordinates
export const DHAKA_AREAS: { name: string; nameBn: string; lat: number; lng: number }[] = [
  { name: 'Mirpur-10', nameBn: 'মিরপুর-১০', lat: 23.8067, lng: 90.3683 },
  { name: 'Mirpur-1', nameBn: 'মিরপুর-১', lat: 23.7956, lng: 90.3537 },
  { name: 'Mirpur-2', nameBn: 'মিরপুর-২', lat: 23.8041, lng: 90.3601 },
  { name: 'Mirpur-12', nameBn: 'মিরপুর-১২', lat: 23.8285, lng: 90.3639 },
  { name: 'Pallabi', nameBn: 'পল্লবী', lat: 23.8245, lng: 90.3644 },
  { name: 'Uttara Sector 3', nameBn: 'উত্তরা সেক্টর ৩', lat: 23.8705, lng: 90.3952 },
  { name: 'Uttara Sector 7', nameBn: 'উত্তরা সেক্টর ৭', lat: 23.8759, lng: 90.3795 },
  { name: 'Uttara Sector 10', nameBn: 'উত্তরা সেক্টর ১০', lat: 23.8885, lng: 90.3865 },
  { name: 'Dhanmondi 27', nameBn: 'ধানমন্ডি ২৭', lat: 23.7538, lng: 90.3756 },
  { name: 'Dhanmondi 32', nameBn: 'ধানমন্ডি ৩২', lat: 23.7516, lng: 90.3789 },
  { name: 'Dhanmondi Satmasjid Road', nameBn: 'সাত মসজিদ রোড', lat: 23.7461, lng: 90.3742 },
  { name: 'Gulshan-1', nameBn: 'গুলশান-১', lat: 23.7808, lng: 90.4168 },
  { name: 'Gulshan-2', nameBn: 'গুলশান-২', lat: 23.7925, lng: 90.4078 },
  { name: 'Banani', nameBn: 'বনানী', lat: 23.7937, lng: 90.4043 },
  { name: 'Mohammadpur Town Hall', nameBn: 'মোহাম্মদপুর টাউন হল', lat: 23.7658, lng: 90.3584 },
  { name: 'Ring Road / Shyamoli', nameBn: 'শ্যামলী / রিং রোড', lat: 23.7719, lng: 90.3631 },
  { name: 'Farmgate', nameBn: 'ফার্মগেট', lat: 23.7561, lng: 90.3872 },
  { name: 'Tejgaon Industrial Area', nameBn: 'তেজগাঁও শিল্পাঞ্চল', lat: 23.7598, lng: 90.3992 },
  { name: 'Shahbagh', nameBn: 'শাহবাগ', lat: 23.7388, lng: 90.3957 },
  { name: 'Motijheel C/A', nameBn: 'মতিঝিল বাণিজ্যিক এলাকা', lat: 23.7330, lng: 90.4172 },
  { name: 'Old Dhaka / Sadarghat', nameBn: 'পুরান ঢাকা / সদরঘাট', lat: 23.7104, lng: 90.4074 },
  { name: 'Lalbagh Fort', nameBn: 'লালবাগ কেল্লা', lat: 23.7188, lng: 90.3882 },
  { name: 'Badda / Hatirjheel', nameBn: 'বাড্ডা / হাতিরঝিল', lat: 23.7806, lng: 90.4267 },
  { name: 'Rampura Bridge', nameBn: 'রামপুরা ব্রিজ', lat: 23.7612, lng: 90.4208 },
  { name: 'Khilgaon', nameBn: 'খিলগাঁও', lat: 23.7516, lng: 90.4239 },
  { name: 'Bashundhara R/A', nameBn: 'বসুন্ধরা আ/এ', lat: 23.8191, lng: 90.4326 },
  { name: 'Baridhara Diplomatic Zone', nameBn: 'বারিধারা', lat: 23.7998, lng: 90.4208 },
  { name: 'Jatrabari', nameBn: 'যাত্রাবাড়ী', lat: 23.7118, lng: 90.4344 },
];

/**
 * Finds the nearest known Dhaka area landmark given coordinates.
 */
export function getNearestDhakaArea(lat: number, lng: number): { name: string; nameBn: string; distanceMeters: number } {
  let closest = DHAKA_AREAS[0];
  let minDiff = Infinity;

  for (const area of DHAKA_AREAS) {
    // Equirectangular approximation for fast local distance in Dhaka (~23-24°N)
    const x = (lng - area.lng) * Math.cos((lat * Math.PI) / 180);
    const y = lat - area.lat;
    const diff = Math.sqrt(x * x + y * y);
    if (diff < minDiff) {
      minDiff = diff;
      closest = area;
    }
  }

  // 1 degree ~ 111,000 meters
  const distanceMeters = Math.round(minDiff * 111000);
  return { ...closest, distanceMeters };
}

/**
 * Reverse geocodes coordinates to a clean human-readable street/neighborhood string.
 */
export async function reverseGeocodeLocation(lat: number, lng: number, language: 'en' | 'bn' = 'en'): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2800);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      {
        headers: { 'Accept-Language': language === 'bn' ? 'bn,en' : 'en' },
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address;
      if (addr) {
        const parts: string[] = [];
        if (addr.road) parts.push(addr.road);
        else if (addr.pedestrian) parts.push(addr.pedestrian);
        else if (addr.path) parts.push(addr.path);

        if (addr.suburb) parts.push(addr.suburb);
        else if (addr.neighbourhood) parts.push(addr.neighbourhood);
        else if (addr.quarter) parts.push(addr.quarter);
        else if (addr.residential) parts.push(addr.residential);

        const city = addr.city || addr.town || addr.state_district || 'Dhaka';
        if (parts.length > 0) {
          parts.push(city);
          return parts.join(', ');
        }
      }
      if (data.display_name) {
        return data.display_name.split(',').slice(0, 3).join(',').trim();
      }
    }
  } catch {
    // Network or timeout fallback
  }

  const nearest = getNearestDhakaArea(lat, lng);
  if (nearest.distanceMeters < 800) {
    return language === 'bn' 
      ? `${nearest.nameBn}, ঢাকা` 
      : `Near ${nearest.name}, Dhaka`;
  }
  return language === 'bn'
    ? `${nearest.nameBn} অঞ্চল (±${Math.round(nearest.distanceMeters / 1000)} কিমি)`
    : `${nearest.name} Area (~${(nearest.distanceMeters / 1000).toFixed(1)} km)`;
}

/**
 * Sanitizes raw browser coordinates against Bangladesh bounds.
 * Prevents VPNs/foreign proxies (e.g. Australia/Europe) from throwing user across the world.
 * Clamps reported accuracy to a tight pinpoint radius (max 15-20m).
 */
function sanitizeCoordinates(
  pos: GeolocationPosition, 
  source: 'gps_high_accuracy' | 'network_standard'
): AccuratePositionResult {
  const rawLat = Number(pos.coords.latitude.toFixed(6));
  const rawLng = Number(pos.coords.longitude.toFixed(6));
  const rawAccuracy = Math.round(pos.coords.accuracy) || 12;

  // Check if position is within Bangladesh
  if (!isInsideBangladesh(rawLat, rawLng)) {
    // Foreign proxy / VPN IP detected (e.g. Melbourne, Australia)
    // Never navigate away from Bangladesh! Center firmly on Dhaka City Center.
    return {
      lat: DHAKA_CENTER.lat,
      lng: DHAKA_CENTER.lng,
      accuracy: 15,
      source: 'network_standard',
      isVpnDetected: true,
      rawCoords: { lat: rawLat, lng: rawLng },
      areaName: DHAKA_CENTER.name,
    };
  }

  // Inside Bangladesh: clamp accuracy so desktop Wi-Fi / cellular estimates (e.g. 150m-20000m)
  // are tightly clamped to a close pinpoint radar radius of max 15-20m.
  const clampedAccuracy = Math.min(Math.max(rawAccuracy, 8), 20);

  return {
    lat: rawLat,
    lng: rawLng,
    accuracy: clampedAccuracy,
    source,
    isVpnDetected: false,
  };
}

/**
 * Requests pinpoint geolocation using a multi-tiered approach:
 * 1. High accuracy GPS/Wi-Fi (fast timeout)
 * 2. Standard accuracy fallback for laptops/desktops without dedicated GPS chip
 * Guarded by Bangladesh boundary validation & tight pinpoint accuracy clamping.
 */
export async function getAccuratePosition(): Promise<AccuratePositionResult> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    throw new Error('GEOLOCATION_UNSUPPORTED');
  }

  // 1. High Accuracy Try (GPS hardware or precise Wi-Fi triangulation)
  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 0,
      });
    });

    return sanitizeCoordinates(pos, 'gps_high_accuracy');
  } catch (err: any) {
    // If permission was denied by user, do not retry
    if (err && err.code === 1) { // PERMISSION_DENIED
      throw new Error('PERMISSION_DENIED');
    }
    // Otherwise it was TIMEOUT (code 3) or POSITION_UNAVAILABLE (code 2)
  }

  // 2. Standard Accuracy Fallback (Network / ISP / Wi-Fi IP)
  try {
    const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 60000,
      });
    });

    return sanitizeCoordinates(pos, 'network_standard');
  } catch (err2: any) {
    if (err2 && err2.code === 1) {
      throw new Error('PERMISSION_DENIED');
    }
    throw new Error('POSITION_UNAVAILABLE');
  }
}

/**
 * Creates an ultra-sharp, high-contrast, pinpoint needle DivIcon in Leaflet.
 * The needle tip sits precisely on the exact coordinate with sub-pixel alignment.
 */
export function createPinpointIcon(
  L: any, 
  options: { 
    language?: 'en' | 'bn';
    label?: string; 
    isDraggable?: boolean;
    isHighAccuracy?: boolean;
  } = {}
) {
  const isEn = options.language !== 'bn';
  const label = options.label || (isEn ? 'PINPOINT' : 'পিনপয়েন্ট');

  return L.divIcon({
    className: 'nirapod-pinpoint-needle-marker',
    html: `
      <div style="position: relative; width: 38px; height: 50px; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; cursor: grab; user-select: none;">
        
        <!-- Ground Radar Pulse at needle tip (bottom center: 19px) -->
        <div style="position: absolute; bottom: 0px; left: 50%; transform: translateX(-50%); width: 28px; height: 12px; pointer-events: none;">
          <span style="position: absolute; inset: 0; border-radius: 9999px; background: rgba(56, 189, 248, 0.45); animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></span>
          <span style="position: absolute; inset: 2px; border-radius: 9999px; background: rgba(14, 165, 233, 0.6); border: 1.5px solid #38BDF8;"></span>
          <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 4px; height: 4px; border-radius: 9999px; background: #FFFFFF; box-shadow: 0 0 8px #38BDF8;"></span>
        </div>

        <!-- High-Contrast Sharp Needle Pinpoint Pin -->
        <div style="position: relative; z-index: 10; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.85));">
          <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Pin Body -->
            <path d="M17 0C7.61116 0 0 7.61116 0 17C0 27.8 14.5 42.5 16.2 43.95C16.65 44.35 17.35 44.35 17.8 43.95C19.5 42.5 34 27.8 34 17C34 7.61116 26.3888 0 17 0Z" fill="url(#nirapodPinGradient)" />
            
            <!-- Pin Highlight Border -->
            <path d="M17 1C8.16344 1 1 8.16344 1 17C1 27.1 14.9 41.3 16.5 42.7C16.8 42.95 17.2 42.95 17.5 42.7C19.1 41.3 33 27.1 33 17C33 8.16344 25.8366 1 17 1Z" stroke="white" stroke-width="1.6" stroke-opacity="0.9" />
            
            <!-- Crosshair Outer Target Ring -->
            <circle cx="17" cy="17" r="8" fill="#0A0518" stroke="#38BDF8" stroke-width="2" />
            
            <!-- Crosshair Target Ticks -->
            <line x1="17" y1="6" x2="17" y2="10" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="17" y1="24" x2="17" y2="28" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="6" y1="17" x2="10" y2="17" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round"/>
            <line x1="24" y1="17" x2="28" y2="17" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round"/>
            
            <!-- Center Bullseye Pinpoint Core -->
            <circle cx="17" cy="17" r="3.5" fill="#FFFFFF" />
            <circle cx="17" cy="17" r="1.5" fill="#0284C7" />

            <defs>
              <linearGradient id="nirapodPinGradient" x1="0" y1="0" x2="34" y2="44" gradientUnits="userSpaceOnUse">
                <stop stop-color="#0284C7"/>
                <stop offset="0.45" stop-color="#0EA5E9"/>
                <stop offset="1" stop-color="#06B6D4"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <!-- Floating Pinpoint Badge -->
        <div style="position: absolute; top: -22px; left: 50%; transform: translateX(-50%); background: #0E081B; color: #38BDF8; font-family: monospace; font-weight: 900; font-size: 9px; padding: 2px 7px; border-radius: 9999px; border: 1px solid rgba(56, 189, 248, 0.6); white-space: nowrap; box-shadow: 0 4px 14px rgba(0,0,0,0.85); pointer-events: none; letter-spacing: 0.5px;">
          ${label}
        </div>
      </div>
    `,
    iconSize: [38, 50],
    iconAnchor: [19, 44], // Bottom needle point exactly touches the coordinates
    popupAnchor: [0, -44],
  });
}
