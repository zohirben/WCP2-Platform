import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/constants';
import { inter, amiri } from '@/lib/fonts';
import Header from '@/components/navigation/header';
import Footer from '@/components/navigation/footer';

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${amiri.variable}`}>
      <body className="min-h-screen font-inter antialiased flex flex-col">
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}