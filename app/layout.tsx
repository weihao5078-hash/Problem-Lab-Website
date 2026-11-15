import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Problem Lab — Issue · Idea · Innovation',
  description: 'Problem Lab bridges the gap between critical issues and high-impact innovation ideas. Explore our innovation methodology, strategic partners, and venture ecosystem.',
  openGraph: {
    title: 'Problem Lab — Issue · Idea · Innovation',
    description: 'Problem Lab bridges the gap between critical issues and high-impact innovation ideas. Explore our innovation methodology, strategic partners, and venture ecosystem.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Problem Lab — Issue · Idea · Innovation',
    description: 'Problem Lab bridges the gap between critical issues and high-impact innovation ideas. Explore our innovation methodology, strategic partners, and venture ecosystem.',
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
