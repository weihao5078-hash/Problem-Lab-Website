import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lato',
  display: 'swap',
});

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
    <html lang="en" className={lato.variable}>
      <body className="antialiased bg-white text-[#223d71] selection:bg-[#7f9af4] selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
