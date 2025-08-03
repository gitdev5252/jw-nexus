// Corrected Version

import '../styles/globals.css';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import { Urbanist } from 'next/font/google';

// ✅ Define font outside component
const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: {
    default: 'JW Nexus | Conference app build with JWNexus open source',
    template: '%s',
  },
  description:
    'JWNexus is an open source WebRTC project that gives you everything needed to build scalable and real-time audio and/or video experiences in your applications.',

  openGraph: {
    url: 'https://jw-nexus.netlify.app/',
    images: [
      {
        url: '/images/call.png',
        width: 2000,
        height: 1000,
        type: 'image/png',
      },
    ],
    siteName: 'JW Nexus',
  },
  icons: {
    icon: {
      rel: 'icon',
      url: '/favicon.ico',
    },
    apple: [
      {
        rel: 'apple-touch-icon',
        url: '/favicon.ico',
        sizes: '180x180',
      },
      { rel: 'mask-icon', url: '/images/logo.svg', color: '#070707' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#070707',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-lk-theme="default" className={urbanist.className}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
