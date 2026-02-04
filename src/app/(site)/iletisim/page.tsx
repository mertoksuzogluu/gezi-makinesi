import { Metadata } from 'next';
import { ContactPageContent } from './ContactPageContent';
import { StructuredData } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Schengen Vizesi İletişim | Vize Danışmanlığı Destek',
  description: 'Schengen vizesi ve hızlı vize başvurusu için iletişime geçin. Almanya vizesi dahil tüm vize sorularınız için uzman ekibimizle iletişim kurun.',
  keywords: [
    'schengen vizesi', 'hızlı vize', 'vize danışmanlığı iletişim', 'Almanya vizesi',
    'vize nasıl alınır', 'uzun süreli vize', 'vize başvuru desteği', 'vize danışmanı',
    'vize müşteri hizmetleri', 'vize destek hattı', 'vize iletişim'
  ],
  openGraph: {
    title: 'Schengen Vizesi İletişim | Vize Danışmanlığı Destek',
    description: 'Schengen vizesi ve hızlı vize başvurusu için iletişime geçin. Almanya vizesi dahil tüm vize sorularınız için uzman ekibimizle iletişim kurabilirsiniz.',
    url: 'https://vizelyio.com/iletisim',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vizelyio.com/iletisim',
  },
};

export default function ContactPage() {
  return (
    <>
      <StructuredData type="organization" />
      <ContactPageContent />
    </>
  );
}
