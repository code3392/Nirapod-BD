import SafetyCirclesView from '@/components/safetycircle/SafetyCirclesView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Safety Circles — Nirapod BD',
  description: 'Life360-style personal family security circles with 1-tap SOS dispatch, GPS coordination, and Bangladesh emergency service provider numbers.',
};

export default function SafetyCirclesPage() {
  return <SafetyCirclesView />;
}
