import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OfflineBanner from '@/components/pwa/OfflineBanner';
import BackgroundCyberCanvas from '@/components/common/BackgroundCyberCanvas';
import NirapodAiAssistant from '@/components/common/NirapodAiAssistant';

export const viewport: Viewport = {
  themeColor: '#0B1F33',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://nirapod-bd-seven.vercel.app'),
  title: 'Nirapod BD — Community Safety & Emergency Reporting Platform for Bangladesh',
  description: 'See a problem. Report it. Help your community solve it. Bangladesh community-powered civic safety, road hazard alerts, and emergency response network.',
  manifest: '/manifest.json',
  keywords: [
    'Nirapod BD',
    'Bangladesh safety map',
    'Dhaka civic reporting',
    'Emergency 999',
    'community problem reporting',
    'road hazard reporting',
    'waterlogging Dhaka',
    'lost and found Dhaka',
  ],
  authors: [{ name: 'Nirapod BD Community' }],
  openGraph: {
    title: 'Nirapod BD — Bangladesh Community Safety & Emergency Network',
    description: 'See a problem. Report it. Help your community solve it. Real-time civic hazard reports, emergency 999 integration, and neighborhood safety circles.',
    url: 'https://nirapod-bd-seven.vercel.app',
    siteName: 'Nirapod BD',
    locale: 'en_BD',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Nirapod BD — Bangladesh Community Safety & Emergency Reporting Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nirapod BD — Bangladesh Community Safety & Emergency Network',
    description: 'See a problem. Report it. Help your community solve it.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#060D1A] text-slate-100 antialiased relative overflow-x-hidden selection:bg-sky-500/30 selection:text-white">
        <AppProvider>
          <BackgroundCyberCanvas />
          <OfflineBanner />
          <Navbar />
          <main className="flex-1 w-full relative z-10">{children}</main>
          <Footer />
          <NirapodAiAssistant />
        </AppProvider>
      </body>
    </html>
  );
}
