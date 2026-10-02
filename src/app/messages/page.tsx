import React from 'react';
import DirectMessagingView from '@/components/messaging/DirectMessagingView';

export const metadata = {
  title: 'Citizen Direct Messaging | Nirapod BD',
  description: 'Secure, verified citizen-to-citizen messaging for emergency coordination, lost items retrieval, and civic safety cooperation.',
};

export default function MessagesPage() {
  return (
    <div className="py-8">
      <DirectMessagingView />
    </div>
  );
}
