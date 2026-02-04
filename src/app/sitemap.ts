import { MetadataRoute } from 'next';
import { getAllTours } from '@/lib/admin-data';
import { getAllVisaCountries } from '@/lib/admin-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vizelyio.com';
  
  // Statik sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/turlar`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vize`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vize/ulkeler`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sss`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/turlar/kendi-turunu-olustur`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vize/talep-olustur`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // Dinamik tur sayfaları
  let tours: any[] = [];
  try {
    tours = getAllTours();
  } catch (e) {
    // Server-side'da çalışmazsa boş array
  }

  const tourPages = tours.map((tour) => ({
    url: `${baseUrl}/turlar/${tour.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dinamik vize ülke sayfaları
  let visaCountries: any[] = [];
  try {
    visaCountries = getAllVisaCountries();
  } catch (e) {
    // Server-side'da çalışmazsa boş array
  }

  const visaPages = visaCountries.map((country) => ({
    url: `${baseUrl}/vize/ulkeler/${country.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...tourPages, ...visaPages];
}

