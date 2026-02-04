import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vize Başvurusu | Schengen Vizesi Hızlı Başvuru',
  description: 'Schengen vizesi, hızlı vize ve uzun süreli vize başvurusu için online form. Almanya vizesi dahil tüm Avrupa ülkeleri için vize başvuru formu.',
  keywords: [
    'schengen vizesi', 'hızlı vize', 'vize başvurusu', 'vize nasıl alınır',
    'uzun süreli vize', 'uzun vize alma', 'Almanya vizesi', 'vize formu',
    'vize başvuru formu', 'schengen vize başvurusu', 'vize evrakları', 'vize randevusu', 'vize randevu',
    'Almanya vize randevusu', 'Fransa vize randevusu', 'İtalya vize randevusu', 'İspanya vize randevusu',
    'Hollanda vize randevusu', 'Belçika vize randevusu', 'Avusturya vize randevusu', 'İsviçre vize randevusu'
  ],
  openGraph: {
    title: 'Vize Başvurusu | Schengen Vizesi Hızlı Başvuru',
    description: 'Schengen vizesi ve hızlı vize başvurusu için online form.',
    url: 'https://vizelyio.com/vize/talep-olustur',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vizelyio.com/vize/talep-olustur',
  },
};

export default function CreateVisaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

