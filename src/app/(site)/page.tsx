import { Metadata } from 'next';
import { HomePageContent } from './HomePageContent';

export const metadata: Metadata = {
  title: 'Schengen Vizesi & Hızlı Vize Danışmanlığı | Vizelyio',
  description: 'Schengen vizesi, hızlı vize ve uzun süreli vize başvurusu için profesyonel danışmanlık. Almanya vizesi dahil tüm Avrupa ülkeleri için vize nasıl alınır rehberi ve başvuru desteği.',
  keywords: [
    'schengen vizesi', 'hızlı vize', 'vize nasıl alınır', 'uzun süreli vize', 'uzun vize alma',
    'Almanya vizesi', 'vize danışmanlığı', 'schengen vize başvurusu', 'vize evrakları',
    'turist vizesi', 'iş vizesi', 'vize randevusu', 'vize randevu', 'vize süreci', 'vize danışmanı',
    'Almanya vize randevusu', 'Fransa vize randevusu', 'İtalya vize randevusu', 'İspanya vize randevusu',
    'Fransa vizesi', 'İtalya vizesi', 'İspanya vizesi', 'Hollanda vizesi', 'Belçika vizesi',
    'Avusturya vizesi', 'İsviçre vizesi', 'vize başvuru', 'vize hizmetleri', 'vize desteği'
  ],
  openGraph: {
    title: 'Schengen Vizesi & Hızlı Vize Danışmanlığı | Vizelyio',
    description: 'Schengen vizesi, hızlı vize ve uzun süreli vize başvurusu için profesyonel danışmanlık. Almanya vizesi dahil tüm Avrupa ülkeleri için vize nasıl alınır rehberi ve başvuru desteği.',
    url: 'https://vizelyio.com',
    type: 'website',
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
};

export default function HomePage() {
  return <HomePageContent />;
}
