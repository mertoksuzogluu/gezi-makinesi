import { Tour } from '@/types';

export const tours: Tour[] = [
  {
    id: '1',
    slug: 'paris-romantik-kacamak',
    title: 'Paris Romantik Kaçamak',
    description: 'Işıklar şehrinde unutulmaz bir hafta sonu. Eyfel Kulesi\'nden Seine Nehri\'ne, Louvre\'dan Montmartre\'a Paris\'in tüm büyüsünü keşfedin.',
    durationDays: 4,
    location: 'Paris',
    country: 'Fransa',
    priceFrom: 1299,
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    highlights: [
      'Eyfel Kulesi ziyareti ve panoramik manzara',
      'Seine Nehri\'nde akşam yemeği crusie\'u',
      'Louvre Müzesi rehberli tur',
      'Montmartre sokak turu',
      'Versailles Sarayı günübirlik gezi'
    ],
    included: [
      'Gidiş-dönüş uçak bileti',
      '3 gece 4 yıldızlı otelde konaklama',
      'Günlük kahvaltı',
      'Havalimanı transferleri',
      'Türkçe rehberlik hizmeti',
      'Müze giriş ücretleri'
    ],
    notIncluded: [
      'Vize ücreti',
      'Seyahat sigortası',
      'Kişisel harcamalar',
      'Öğle ve akşam yemekleri'
    ],
    itinerary: [
      { day: 1, title: 'İstanbul - Paris', description: 'Sabah uçuşu ile Paris\'e varış. Havalimanı transferi ve otele yerleşme. Akşam şehir merkezi keşif yürüyüşü.' },
      { day: 2, title: 'Paris Şehir Turu', description: 'Louvre Müzesi ziyareti, Champs-Élysées bulvarı yürüyüşü, Arc de Triomphe. Akşam Eyfel Kulesi ziyareti.' },
      { day: 3, title: 'Versailles & Montmartre', description: 'Sabah Versailles Sarayı turu. Öğleden sonra Montmartre tepesi ve Sacré-Cœur Bazilikası.' },
      { day: 4, title: 'Paris - İstanbul', description: 'Serbest zaman ve alışveriş. Öğleden sonra havalimanına transfer ve İstanbul\'a dönüş.' }
    ],
    gallery: ['https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop'],
    isPopular: true
  },
  {
    id: '2',
    slug: 'roma-tarihi-yolculuk',
    title: 'Roma Tarihi Yolculuk',
    description: 'Antik Roma\'nın izinde bin yıllık tarihe yolculuk. Kolezyum\'dan Vatikan\'a, her köşede tarih kokan eşsiz bir deneyim.',
    durationDays: 5,
    location: 'Roma',
    country: 'İtalya',
    priceFrom: 1449,
    heroImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',
    highlights: [
      'Kolezyum ve Roma Forumu turu',
      'Vatikan Müzeleri ve Sistine Şapeli',
      'Trevi Çeşmesi ve İspanyol Merdivenleri',
      'Tivoli Villa d\'Este bahçeleri',
      'Otantik İtalyan mutfağı deneyimi'
    ],
    included: [
      'Gidiş-dönüş uçak bileti',
      '4 gece 4 yıldızlı otelde konaklama',
      'Günlük kahvaltı',
      'Havalimanı transferleri',
      'Türkçe rehberlik hizmeti',
      'Müze ve ören yeri giriş ücretleri'
    ],
    notIncluded: [
      'Vize ücreti',
      'Seyahat sigortası',
      'Kişisel harcamalar'
    ],
    itinerary: [
      { day: 1, title: 'İstanbul - Roma', description: 'Roma\'ya varış ve otele transfer. Akşam Roma sokaklarında yürüyüş.' },
      { day: 2, title: 'Antik Roma', description: 'Kolezyum, Palatine Tepesi ve Roma Forumu rehberli tur.' },
      { day: 3, title: 'Vatikan', description: 'Vatikan Müzeleri, Sistine Şapeli ve St. Peter Bazilikası ziyareti.' },
      { day: 4, title: 'Tivoli', description: 'Tivoli\'ye günübirlik gezi. Villa d\'Este ve Hadrian\'ın Villası.' },
      { day: 5, title: 'Roma - İstanbul', description: 'Serbest zaman ve İstanbul\'a dönüş.' }
    ],
    gallery: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop'],
    isPopular: true
  },
  {
    id: '3',
    slug: 'londra-kulturel-kesif',
    title: 'Londra Kültürel Keşif',
    description: 'İngiliz kültürünün başkentinde unutulmaz bir hafta. Buckingham Sarayı\'ndan British Museum\'a, Thames\'ten Camden\'a.',
    durationDays: 5,
    location: 'Londra',
    country: 'İngiltere',
    priceFrom: 1599,
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop',
    highlights: [
      'Buckingham Sarayı nöbet değişimi',
      'British Museum rehberli tur',
      'Thames Nehri cruise turu',
      'Tower of London ziyareti',
      'West End müzikal gösterisi'
    ],
    included: [
      'Gidiş-dönüş uçak bileti',
      '4 gece 4 yıldızlı otelde konaklama',
      'Günlük kahvaltı',
      'Havalimanı transferleri',
      'Türkçe rehberlik hizmeti'
    ],
    notIncluded: [
      'Vize ücreti',
      'Seyahat sigortası',
      'Müzikal bileti (opsiyonel)',
      'Kişisel harcamalar'
    ],
    itinerary: [
      { day: 1, title: 'İstanbul - Londra', description: 'Londra\'ya varış ve Heathrow\'dan otel transferi.' },
      { day: 2, title: 'Klasik Londra', description: 'Big Ben, Westminster Abbey, Buckingham Sarayı turu.' },
      { day: 3, title: 'Müzeler', description: 'British Museum ve National Gallery ziyareti.' },
      { day: 4, title: 'Thames & Tower', description: 'Tower of London, Tower Bridge ve Thames cruise.' },
      { day: 5, title: 'Londra - İstanbul', description: 'Serbest zaman ve dönüş.' }
    ],
    gallery: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop'],
    isPopular: true
  },
  {
    id: '4',
    slug: 'barcelona-akdeniz-esintisi',
    title: 'Barcelona Akdeniz Esintisi',
    description: 'Gaudi\'nin şehri Barcelona\'da sanat, mimari ve Akdeniz lezzetleri bir arada. La Rambla\'dan Sagrada Familia\'ya.',
    durationDays: 4,
    location: 'Barcelona',
    country: 'İspanya',
    priceFrom: 1199,
    heroImage: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop',
    highlights: [
      'Sagrada Familia rehberli tur',
      'Park Güell ziyareti',
      'La Rambla ve Gotik Mahalle yürüyüşü',
      'Tapas workshop deneyimi',
      'Montjuïc Tepesi panoramik manzara'
    ],
    included: [
      'Gidiş-dönüş uçak bileti',
      '3 gece 4 yıldızlı otelde konaklama',
      'Günlük kahvaltı',
      'Havalimanı transferleri',
      'Türkçe rehberlik hizmeti'
    ],
    notIncluded: [
      'Vize ücreti',
      'Seyahat sigortası',
      'Kişisel harcamalar'
    ],
    itinerary: [
      { day: 1, title: 'İstanbul - Barcelona', description: 'Barcelona\'ya varış ve otele yerleşme. Akşam La Rambla keşfi.' },
      { day: 2, title: 'Gaudi Turu', description: 'Sagrada Familia, Casa Batlló ve Park Güell.' },
      { day: 3, title: 'Şehir Keşfi', description: 'Gotik Mahalle, Barceloneta Plajı ve Montjuïc.' },
      { day: 4, title: 'Barcelona - İstanbul', description: 'Serbest zaman ve dönüş uçuşu.' }
    ],
    gallery: ['https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop'],
    isPopular: false
  },
  {
    id: '5',
    slug: 'dubai-modern-luks',
    title: 'Dubai Modern Lüks',
    description: 'Çölün ortasında yükselen modern mucize Dubai\'de lüks ve macera dolu bir tatil. Burj Khalifa\'dan çöl safarisine.',
    durationDays: 5,
    location: 'Dubai',
    country: 'BAE',
    priceFrom: 1899,
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    highlights: [
      'Burj Khalifa gözlem katı ziyareti',
      'Çöl safarisi ve BBQ akşam yemeği',
      'Dubai Mall ve Dubai Aquarium',
      'Eski Dubai ve Altın Çarşı turu',
      'Palm Jumeirah ve Atlantis ziyareti'
    ],
    included: [
      'Gidiş-dönüş uçak bileti',
      '4 gece 5 yıldızlı otelde konaklama',
      'Günlük kahvaltı',
      'Havalimanı transferleri',
      'Türkçe rehberlik hizmeti',
      'Çöl safarisi dahil'
    ],
    notIncluded: [
      'Seyahat sigortası',
      'Kişisel harcamalar',
      'Opsiyonel turlar'
    ],
    itinerary: [
      { day: 1, title: 'İstanbul - Dubai', description: 'Dubai\'ye varış ve otele transfer.' },
      { day: 2, title: 'Modern Dubai', description: 'Burj Khalifa, Dubai Mall ve çeşme gösterisi.' },
      { day: 3, title: 'Çöl Macerası', description: 'Çöl safarisi, deve binme ve BBQ akşam yemeği.' },
      { day: 4, title: 'Eski Dubai', description: 'Dubai Creek, Altın ve Baharat Çarşısı, Jumeirah Camii.' },
      { day: 5, title: 'Dubai - İstanbul', description: 'Palm Jumeirah turu ve dönüş.' }
    ],
    gallery: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop'],
    isPopular: true
  },
  {
    id: '6',
    slug: 'amsterdam-kanal-sehri',
    title: 'Amsterdam Kanal Şehri',
    description: 'Kanallar, bisikletler ve lalelerle ünlü Amsterdam\'da sanat ve kültür dolu bir kaçamak.',
    durationDays: 4,
    location: 'Amsterdam',
    country: 'Hollanda',
    priceFrom: 1249,
    heroImage: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop',
    highlights: [
      'Anne Frank Evi ziyareti',
      'Van Gogh Müzesi',
      'Kanal cruise turu',
      'Keukenhof Lale Bahçeleri (sezon)',
      'Zaanse Schans yel değirmenleri'
    ],
    included: [
      'Gidiş-dönüş uçak bileti',
      '3 gece 4 yıldızlı otelde konaklama',
      'Günlük kahvaltı',
      'Havalimanı transferleri',
      'Türkçe rehberlik hizmeti'
    ],
    notIncluded: [
      'Vize ücreti',
      'Seyahat sigortası',
      'Kişisel harcamalar'
    ],
    itinerary: [
      { day: 1, title: 'İstanbul - Amsterdam', description: 'Amsterdam\'a varış ve şehir merkezinde yürüyüş.' },
      { day: 2, title: 'Müzeler', description: 'Rijksmuseum, Van Gogh Müzesi ve Anne Frank Evi.' },
      { day: 3, title: 'Çevre Gezisi', description: 'Zaanse Schans yel değirmenleri ve kanal turu.' },
      { day: 4, title: 'Amsterdam - İstanbul', description: 'Serbest zaman ve dönüş.' }
    ],
    gallery: ['https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop'],
    isPopular: false
  }
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find(tour => tour.slug === slug);
}

export function getPopularTours(): Tour[] {
  return tours.filter(tour => tour.isPopular);
}

export function getToursByCountry(country: string): Tour[] {
  return tours.filter(tour => tour.country.toLowerCase() === country.toLowerCase());
}

