import React from 'react';
import CommunityHub from '@/components/community/CommunityHub';

export const metadata = {
  title: 'Community Neighborhood Hubs | Nirapod BD',
  description: 'Area-wise civic discussions, neighborhood safety alerts, and mutual community assistance across Dhaka wards.',
};

export default function CommunityPage() {
  return (
    <div className="py-8">
      <CommunityHub />
    </div>
  );
}
