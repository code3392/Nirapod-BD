import React from 'react';
import CommunityHub from '@/components/community/CommunityHub';

export const metadata = {
  title: 'Civic Community & Personal Groups | Nirapod BD',
  description: '1 unified Bangladesh public safety community and private personal groups for family, workplace, and neighborhood safety coordination.',
};

export default function CommunityPage() {
  return (
    <div className="py-8">
      <CommunityHub />
    </div>
  );
}
