import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Avrupa Turları & Schengen Vizesi Desteği | Vizelyio',
  description: 'Avrupa turları ve schengen vizesi danışmanlığı. Paris, Roma, Londra, Barcelona turları için hızlı vize desteği. Uzun süreli vize ve vize nasıl alınır rehberi.',
  keywords: [
    'avrupa turları', 'schengen vizesi', 'hızlı vize', 'vize nasıl alınır',
    'paris turu', 'roma turu', 'londra turu', 'barcelona turu', 'amsterdam turu',
    'Almanya vizesi', 'uzun süreli vize', 'uzun vize alma', 'turist vizesi',
    'yurtdışı turları', 'tatil paketleri', 'seyahat turları', 'vize danışmanlığı'
  ],
  openGraph: {
    title: 'Avrupa Turları & Schengen Vizesi Desteği | Vizelyio',
    description: 'Avrupa turları ve schengen vizesi danışmanlığı. Paris, Roma, Londra, Barcelona turları için hızlı vize desteği.',
    url: 'https://vizelyio.com/turlar',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vizelyio.com/turlar',
  },
};

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

