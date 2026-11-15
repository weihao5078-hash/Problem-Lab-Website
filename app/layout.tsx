import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Problem Lab — Issue · Idea · Innovation',
  description: 'Problem Lab is a student-led research collective based in SUTD. We validate real-world problems and connect them with the builders who can solve them.',
  openGraph: {
    title: 'Problem Lab — Issue · Idea · Innovation',
    description: 'Problem Lab is a student-led research collective based in SUTD. We validate real-world problems and connect them with the builders who can solve them.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Problem Lab — Issue · Idea · Innovation',
    description: 'Problem Lab is a student-led research collective based in SUTD. We validate real-world problems and connect them with the builders who can solve them.',
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
        {/* Self-hosted font: no request to Google Fonts at build time or in the browser. */}
        <link rel="preload" href="/fonts/lato-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/lato-latin-700-normal.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="stylesheet" href="/fonts/lato.css" />
      </head>
      <body className="antialiased bg-white text-[#223d71] selection:bg-[#7f9af4] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
