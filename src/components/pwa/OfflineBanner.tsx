'use client';

import React from 'react';
import { useApp } from '@/context/AppContext';
import { WifiOff, RefreshCw } from 'lucide-react';

export default function OfflineBanner() {
  const { isOffline, offlineQueueCount, language } = useApp();

  if (!isOffline && offlineQueueCount === 0) return null;

  return (
    <aside aria-label="Offline status" className="bg-amber-500 text-navy font-bold text-xs py-2 px-4 border-b border-amber-600/30 flex items-center justify-between z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-navy shrink-0 animate-pulse" />
          <span>
            {isOffline
              ? (language === 'en'
                  ? 'You are currently working offline. Reports will be saved locally.'
                  : 'আপনি বর্তমানে অফলাইনে আছেন। আপনার রিপোর্টগুলো ডিভাইসে সংরক্ষিত হচ্ছে।')
              : (language === 'en'
                  ? `${offlineQueueCount} offline reports queued. Syncing to network...`
                  : `${offlineQueueCount}টি অফলাইন রিপোর্ট সার্ভারে পাঠানো হচ্ছে...`)}
          </span>
        </div>

        {offlineQueueCount > 0 && (
          <span className="flex items-center gap-1.5 text-[11px] bg-navy text-white px-2.5 py-0.5 rounded-full">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>Syncing ({offlineQueueCount})</span>
          </span>
        )}
      </div>
    </aside>
  );
}
