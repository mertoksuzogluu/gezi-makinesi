import { Metadata } from 'next';
import { VisaPageContent } from './VisaPageContent';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Schengen Vizesi & Hızlı Vize Danışmanlığı | Vizelyio',
  description: 'Schengen vizesi ve hızlı vize başvurusu için profesyonel danışmanlık. Vize nasıl alınır rehberi, uzun süreli vize desteği ve Almanya vizesi dahil tüm Avrupa ülkeleri için başvuru hizmeti.',
  keywords: [
    'schengen vizesi', 'hızlı vize', 'vize nasıl alınır', 'uzun süreli vize', 'uzun vize alma',
    'Almanya vizesi', 'vize danışmanlığı', 'schengen vize başvurusu', 'vize evrakları',
    'turist vizesi', 'iş vizesi', 'vize randevusu', 'vize randevu', 'vize süreci', 'vize danışmanı',
    'Fransa vizesi', 'İtalya vizesi', 'İspanya vizesi', 'Hollanda vizesi', 'Belçika vizesi',
    'Avusturya vizesi', 'İsviçre vizesi', 'vize başvuru', 'vize hizmetleri', 'vize desteği',
    'vize başvurusu', 'vize hazırlık', 'vize onay', 'vize red', 'vize itiraz',
    'Almanya vize randevusu', 'Fransa vize randevusu', 'İtalya vize randevusu', 'İspanya vize randevusu',
    'Hollanda vize randevusu', 'Belçika vize randevusu', 'Avusturya vize randevusu', 'İsviçre vize randevusu',
    'Yunanistan vize randevusu', 'Portekiz vize randevusu', 'İsveç vize randevusu', 'Norveç vize randevusu'
  ],
  openGraph: {
    title: 'Schengen Vizesi & Hızlı Vize Danışmanlığı | Vizelyio',
    description: 'Schengen vizesi ve hızlı vize başvurusu için profesyonel danışmanlık. Vize nasıl alınır rehberi, uzun süreli vize desteği ve Almanya vizesi dahil tüm Avrupa ülkeleri için başvuru hizmeti.',
    url: 'https://vizelyio.com/vize',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vizelyio.com/vize',
  },
};

export default function VisaPage() {
  return (
    <>
      <StructuredData type="organization" />
      <VisaPageContent />
    </>
  );
}
