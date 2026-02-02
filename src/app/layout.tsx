import type { Metadata } from 'next';
import { Inter, Playfair_Display, Great_Vibes } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-body' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'], variable: '--font-romantic' });

export const metadata: Metadata = {
  title: 'Our Story - For Kalye',
  description: 'A journey through our 6 years together.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <div className="sparkle-bg" />
        <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
