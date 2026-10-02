import React from 'react';
import LostAndFoundDirectory from '@/components/lostandfound/LostAndFoundDirectory';

export const metadata = {
  title: 'Lost & Found Registry | Nirapod BD',
  description: 'Searchable area-wise lost and found items directory for Dhaka neighborhoods. Report missing valuables, NID cards, wallets, or document recoveries.',
};

export default function LostAndFoundPage() {
  return (
    <div className="py-8">
      <LostAndFoundDirectory />
    </div>
  );
}
