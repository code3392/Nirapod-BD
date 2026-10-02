import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import OfflineBanner from '@/components/pwa/OfflineBanner';

export const viewport: Viewport = {
  themeColor: '#0B1F33',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Nirapod BD — Community Safety & Civic Problem Reporting Platform for Bangladesh',
  description: 'See a problem. Report it. Help your community solve it. Community-powered, AI-assisted safety and civic incident resolution across Bangladesh.',
  manifest: '/manifest.json',
  keywords: [
    'Nirapod BD',
    'Bangladesh safety map',
    'Dhaka civic reporting',
    'Emergency 999',
    'community problem reporting',
    'road hazard reporting',
    'waterlogging Dhaka',
  ],
  authors: [{ name: 'Nirapod BD Community' }],
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+Bengali:wght@400;500;600;700;800&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-surface text-darktext antialiased">
        <AppProvider>
          <OfflineBanner />
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
