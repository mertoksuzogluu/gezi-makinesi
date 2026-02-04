import { Metadata } from 'next';
import { getVisaCountryBySlug } from '@/lib/admin-data';
import { VisaCountryDetailContent } from './VisaCountryDetailContent';
import { VisaCountryStructuredData } from './VisaCountryStructuredData';

export async function generateMetadata({ params }: { params: { ulke: string } }): Promise<Metadata> {
  const country = getVisaCountryBySlug(params.ulke);
  
  if (!country) {
    return {
      title: 'Vize Ülke Detayı | Vizelyio',
      description: 'Vize danışmanlığı hizmeti verdiğimiz ülke bilgileri.',
    };
  }

  const countryName = country.name;
  const countryNameLower = countryName.toLowerCase();
  
  // Ülke bazlı title ve description
  const title = `${countryName} Vizesi & ${countryName} Vize Randevusu | Vizelyio`;
  const description = `${countryName} vizesi, ${countryName} vize randevusu ve ${countryName} vize başvurusu için profesyonel danışmanlık. ${countryName} vize evrakları, ${countryName} vize süreci ve ${countryName} vize nasıl alınır rehberi.`;

  return {
    title,
    description,
    keywords: [
      `${countryName} vizesi`,
      `${countryName} vize randevusu`,
      `${countryName} vize başvurusu`,
      `${countryName} vize evrakları`,
      `${countryName} vize süreci`,
      `${countryName} vize nasıl alınır`,
      `${countryNameLower} vizesi`,
      `${countryNameLower} vize randevusu`,
      `${countryNameLower} vize başvurusu`,
      'schengen vizesi',
      'hızlı vize',
      'vize nasıl alınır',
      'uzun süreli vize',
      'uzun vize alma',
      'vize danışmanlığı',
      'vize randevusu',
      'vize başvurusu',
      'vize evrakları',
      'vize süreci',
      'vize danışmanı',
      'turist vizesi',
      'iş vizesi',
    ],
    openGraph: {
      title: `${countryName} Vizesi & ${countryName} Vize Randevusu | Vizelyio`,
      description: `${countryName} vizesi ve ${countryName} vize randevusu için profesyonel danışmanlık. ${countryName} vize başvurusu ve evrak hazırlığı desteği.`,
      url: `https://vizelyio.com/vize/ulkeler/${params.ulke}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://vizelyio.com/vize/ulkeler/${params.ulke}`,
    },
  };
}

export default function VisaCountryPage({ params }: { params: { ulke: string } }) {
  return (
    <>
      <VisaCountryStructuredData />
      <VisaCountryDetailContent />
    </>
  );
}
