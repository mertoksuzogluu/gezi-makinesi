import { Tour } from '@/types';

interface StructuredDataProps {
  type: 'tour' | 'organization' | 'breadcrumb' | 'faq';
  data?: Tour | any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'Vizelyio',
          alternateName: 'Vizelyio Seyahat Acentesi',
          description: 'Turlar ve vize danışmanlığı hizmetleri sunan seyahat acentesi. Avrupa turları, ABD turları, Dubai turları ve Schengen, ABD, İngiltere, Dubai vize danışmanlığı.',
          url: 'https://vizelyio.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://vizelyio.com/logo.svg',
            width: 200,
            height: 50
          },
          image: 'https://vizelyio.com/logo.svg',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+90-212-XXX-XX-XX',
            contactType: 'customer service',
            areaServed: ['TR', 'World'],
            availableLanguage: ['Turkish', 'English']
          },
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'İstanbul',
            addressCountry: 'TR'
          },
          priceRange: '$$',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '5000'
          },
          sameAs: [
            // Sosyal medya linkleri buraya eklenecek
          ]
        };

      case 'tour':
        if (!data) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'TouristTrip',
          name: data.title,
          description: data.description,
          image: data.heroImage.startsWith('/') 
            ? `https://vizelyio.com${data.heroImage}` 
            : data.heroImage,
          url: `https://vizelyio.com/turlar/${data.slug}`,
          itinerary: {
            '@type': 'ItemList',
            itemListElement: data.itinerary.map((day: any, index: number) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: day.title,
              description: day.description
            }))
          },
          offers: {
            '@type': 'Offer',
            price: data.priceFrom,
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: `https://vizelyio.com/turlar/${data.slug}`,
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: data.priceFrom,
              priceCurrency: 'EUR',
              unitText: 'per person'
            }
          },
          location: {
            '@type': 'Place',
            name: `${data.location}, ${data.country}`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: data.location,
              addressCountry: data.country
            }
          },
          duration: `P${data.durationDays}D`,
          tourBookingPage: `https://vizelyio.com/turlar/kendi-turunu-olustur?destination=${encodeURIComponent(`${data.location}, ${data.country}`)}`
        };

      case 'breadcrumb':
        if (!data) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.map((item: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `https://vizelyio.com${item.url}`
          }))
        };

      case 'faq':
        if (!data || !data.faqs || data.faqs.length === 0) return null;
        return {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: data.faqs.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        };

      default:
        return null;
    }
  };

  const structuredData = getStructuredData();
  
  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

