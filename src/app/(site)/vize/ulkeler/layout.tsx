import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schengen Vize Ülkeleri & Vize Nasıl Alınır | Vizelyio',
  description: 'Schengen vizesi veren tüm ülkeler ve vize nasıl alınır rehberi. Almanya, Fransa, İtalya, İspanya ve diğer Avrupa ülkeleri için hızlı vize danışmanlığı.',
  keywords: [
    'schengen vizesi', 'schengen ülkeleri', 'vize nasıl alınır', 'Almanya vizesi',
    'Fransa vizesi', 'İtalya vizesi', 'İspanya vizesi', 'Hollanda vizesi', 'Belçika vizesi',
    'Avusturya vizesi', 'İsviçre vizesi', 'Yunanistan vizesi', 'Portekiz vizesi',
    'hızlı vize', 'uzun süreli vize', 'uzun vize alma', 'vize danışmanlığı',
    'vize başvurusu', 'vize evrakları', 'vize süreci', 'vize ülkeleri',
    'vize randevusu', 'vize randevu', 'Almanya vize randevusu', 'Fransa vize randevusu',
    'İtalya vize randevusu', 'İspanya vize randevusu', 'Hollanda vize randevusu', 'Belçika vize randevusu'
  ],
  openGraph: {
    title: 'Schengen Vize Ülkeleri & Vize Nasıl Alınır | Vizelyio',
    description: 'Schengen vizesi veren tüm ülkeler ve vize nasıl alınır rehberi. Almanya, Fransa, İtalya, İspanya ve diğer Avrupa ülkeleri için hızlı vize danışmanlığı.',
    url: 'https://vizelyio.com/vize/ulkeler',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vizelyio.com/vize/ulkeler',
  },
};

export default function VisaCountriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

