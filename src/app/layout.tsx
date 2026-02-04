import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://vizelyio.com'),
  title: {
    default: 'Schengen Vizesi & Hızlı Vize Danışmanlığı | Vizelyio',
    template: '%s | Vizelyio'
  },
  description: 'Schengen vizesi, hızlı vize ve uzun süreli vize başvurusu için profesyonel danışmanlık. Almanya vizesi dahil tüm Avrupa ülkeleri için vize nasıl alınır rehberi.',
  keywords: [
    'schengen vizesi', 'hızlı vize', 'vize nasıl alınır', 'uzun süreli vize', 'uzun vize alma',
    'Almanya vizesi', 'vize danışmanlığı', 'schengen vize başvurusu', 'vize evrakları',
    'turist vizesi', 'iş vizesi', 'vize randevusu', 'vize randevu', 'vize süreci', 'vize danışmanı',
    'Almanya vize randevusu', 'Fransa vize randevusu', 'İtalya vize randevusu', 'İspanya vize randevusu',
    'Fransa vizesi', 'İtalya vizesi', 'İspanya vizesi', 'Hollanda vizesi', 'Belçika vizesi',
    'Avusturya vizesi', 'İsviçre vizesi', 'vize başvuru', 'vize hizmetleri', 'vize desteği'
  ],
  authors: [{ name: 'Vizelyio' }],
  creator: 'Vizelyio',
  publisher: 'Vizelyio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://vizelyio.com',
    siteName: 'Vizelyio',
    title: 'Schengen Vizesi & Hızlı Vize Danışmanlığı | Vizelyio',
    description: 'Schengen vizesi, hızlı vize ve uzun süreli vize başvurusu için profesyonel danışmanlık. Almanya vizesi dahil tüm Avrupa ülkeleri için vize nasıl alınır rehberi ve başvuru desteği.',
    images: [
      {
        url: '/logo.svg',
        width: 1200,
        height: 630,
        alt: 'Schengen Vizesi & Hızlı Vize Danışmanlığı',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schengen Vizesi & Hızlı Vize Danışmanlığı | Vizelyio',
    description: 'Schengen vizesi, hızlı vize ve uzun süreli vize başvurusu için profesyonel danışmanlık.',
    images: ['/logo.svg'],
  },
  alternates: {
    canonical: 'https://vizelyio.com',
  },
  verification: {
    // Google Search Console verification code buraya eklenecek
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
