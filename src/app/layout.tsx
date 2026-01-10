import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Gezi Makinesi - Turlar & Vize Danışmanlığı',
    template: '%s | Gezi Makinesi'
  },
  description: 'Gezi Makinesi ile hayalinizdeki tatili planlayın. Turlar, vize danışmanlığı ve özel tur organizasyonları ile seyahatlerinizi kolaylaştırıyoruz.',
  keywords: ['tur', 'vize', 'seyahat', 'tatil', 'schengen', 'vize danışmanlığı', 'gezi'],
  authors: [{ name: 'Gezi Makinesi' }],
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    siteName: 'Gezi Makinesi',
    title: 'Gezi Makinesi - Turlar & Vize Danışmanlığı',
    description: 'Turlar ve vize danışmanlığı tek yerde. Hayalinizdeki seyahati planlayın.',
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
