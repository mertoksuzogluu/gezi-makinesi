import { VisaCountry } from '@/types';

// Schengen ülkeleri
const schengenCountries: VisaCountry[] = [
  {
    code: 'DE',
    slug: 'almanya',
    name: 'Almanya',
    flagEmoji: '🇩🇪',
    category: 'Schengen',
    processingTime: '10-15 iş günü',
    visaFee: '90 EUR',
    serviceFee: '1.500 TL',
    description: 'Almanya Schengen vizesi ile Schengen bölgesindeki 27 ülkeye seyahat edebilirsiniz. Almanya, Avrupa\'nın en güçlü ekonomisi ve zengin kültürel mirası ile popüler bir destinasyondur.',
    docGroups: [
      {
        title: 'Kişisel Evraklar',
        documents: [
          'Pasaport (son 10 yıl içinde alınmış, en az 6 ay geçerli, en az 2 boş sayfa)',
          'Pasaport fotokopisi (tüm sayfalar)',
          'Eski pasaport (varsa)',
          '2 adet biyometrik fotoğraf (son 6 ay içinde çekilmiş)',
          'Nüfus cüzdanı fotokopisi',
          'Vize başvuru formu (eksiksiz doldurulmuş ve imzalı)'
        ]
      },
      {
        title: 'Finansal Evraklar',
        documents: [
          'Son 3 aylık banka hesap dökümü (kaşeli ve imzalı)',
          'Güncel bakiye yazısı',
          'Varsa tapu, araç ruhsatı fotokopileri',
          'Seyahat için yeterli maddi güce sahip olduğunuzu gösteren belgeler'
        ]
      },
      {
        title: 'Çalışanlar İçin',
        documents: [
          'İşe giriş bildirgesi (SGK)',
          'Son 3 aylık SGK dökümü',
          'Maaş bordrosu (son 3 ay)',
          'İşveren tarafından düzenlenen izin yazısı (İngilizce veya Almanca)'
        ]
      },
      {
        title: 'Öğrenciler İçin',
        documents: [
          'Öğrenci belgesi',
          'Veli muvafakatnamesi (18 yaş altı)',
          'Sponsorluk taahhütnamesi ve sponsor mali belgeleri'
        ]
      },
      {
        title: 'Emekliler İçin',
        documents: [
          'Emekli maaş belgesi',
          'Emekli cüzdanı fotokopisi'
        ]
      },
      {
        title: 'Şirket Sahipleri İçin',
        documents: [
          'Ticaret sicil gazetesi',
          'İmza sirküleri',
          'Vergi levhası',
          'Son yıl mali tabloları'
        ]
      },
      {
        title: 'Seyahat Evrakları',
        documents: [
          'Uçak rezervasyonu',
          'Otel rezervasyonu',
          'Seyahat sağlık sigortası (30.000 EUR minimum teminat)',
          'Detaylı seyahat planı'
        ]
      }
    ],
    process: [
      { step: 1, title: 'Başvuru', description: 'Online form doldurma ve randevu alma' },
      { step: 2, title: 'Evrak Teslimi', description: 'Evrak teslimi ve biyometrik veri alımı' },
      { step: 3, title: 'İnceleme', description: 'Konsolosluk tarafından başvuru değerlendirmesi' },
      { step: 4, title: 'Sonuç', description: 'Pasaport teslimi ve vize alımı' }
    ],
    faqs: [
      { question: 'Schengen vizesi ile hangi ülkelere gidebilirim?', answer: 'Schengen vizesi ile 27 Avrupa ülkesine (Almanya, Fransa, İtalya, İspanya, Hollanda, Belçika, Avusturya, Yunanistan, Portekiz, İsveç, Norveç, Danimarka, Finlandiya, Çekya, Polonya, Macaristan, Slovenya, Slovakya, Estonya, Letonya, Litvanya, Lüksemburg, Malta, İzlanda, İsviçre, Liechtenstein, Hırvatistan) seyahat edebilirsiniz.' },
      { question: 'Başvuru ne kadar sürer?', answer: 'Ortalama 10-15 iş günü sürmektedir. Yoğun dönemlerde bu süre uzayabilir.' },
      { question: 'Ret alırsam ne yapmalıyım?', answer: 'Ret sebebini analiz ederek eksikleri giderdikten sonra yeniden başvuru yapabilirsiniz.' }
    ],
    isPopular: true
  },
  {
    code: 'FR',
    slug: 'fransa',
    name: 'Fransa',
    flagEmoji: '🇫🇷',
    category: 'Schengen',
    processingTime: '10-15 iş günü',
    visaFee: '90 EUR',
    serviceFee: '1.500 TL',
    description: 'Fransa vizesi ile Paris\'in romantik sokaklarından Provence\'ın lavanta tarlalarına kadar bu eşsiz ülkeyi keşfedebilirsiniz.',
    docGroups: [
      {
        title: 'Kişisel Evraklar',
        documents: [
          'Pasaport (son 10 yıl içinde alınmış, en az 6 ay geçerli)',
          '2 adet biyometrik fotoğraf',
          'Nüfus cüzdanı fotokopisi',
          'Vize başvuru formu'
        ]
      },
      {
        title: 'Finansal Evraklar',
        documents: [
          'Son 3 aylık banka hesap dökümü',
          'Güncel bakiye yazısı'
        ]
      },
      {
        title: 'Çalışanlar İçin',
        documents: [
          'SGK dökümü',
          'Maaş bordrosu',
          'İşveren izin yazısı'
        ]
      },
      {
        title: 'Seyahat Evrakları',
        documents: [
          'Uçak ve otel rezervasyonu',
          'Seyahat sigortası'
        ]
      }
    ],
    process: [
      { step: 1, title: 'Başvuru', description: 'Online randevu ve form doldurma' },
      { step: 2, title: 'Evrak Teslimi', description: 'Evrak teslimi ve biyometrik veri' },
      { step: 3, title: 'İnceleme', description: 'Konsolosluk değerlendirmesi' },
      { step: 4, title: 'Sonuç', description: 'Pasaport teslimi' }
    ],
    faqs: [
      { question: 'Fransa vizesi ne kadar süre geçerli?', answer: 'Genellikle 3 ay ila 1 yıl arası geçerli çoklu giriş vizesi verilmektedir.' }
    ],
    isPopular: true
  },
  {
    code: 'IT',
    slug: 'italya',
    name: 'İtalya',
    flagEmoji: '🇮🇹',
    category: 'Schengen',
    processingTime: '10-15 iş günü',
    visaFee: '90 EUR',
    serviceFee: '1.500 TL',
    description: 'İtalya vizesi ile Roma\'nın antik kalıntılarından Venedik\'in kanallarına, Toskana\'nın şarap bağlarına kadar bu muhteşem ülkeyi ziyaret edebilirsiniz.',
    docGroups: [
      {
        title: 'Kişisel Evraklar',
        documents: [
          'Pasaport (en az 6 ay geçerli)',
          '2 adet biyometrik fotoğraf',
          'Nüfus cüzdanı fotokopisi',
          'Vize başvuru formu'
        ]
      },
      {
        title: 'Finansal Evraklar',
        documents: [
          'Banka hesap dökümü',
          'Bakiye yazısı'
        ]
      },
      {
        title: 'Seyahat Evrakları',
        documents: [
          'Uçak ve otel rezervasyonu',
          'Seyahat sigortası'
        ]
      }
    ],
    process: [
      { step: 1, title: 'Başvuru', description: 'Online randevu alma' },
      { step: 2, title: 'Evrak Teslimi', description: 'Evrak teslimi ve biyometrik veri' },
      { step: 3, title: 'İnceleme', description: 'Konsolosluk incelemesi' },
      { step: 4, title: 'Sonuç', description: 'Pasaport teslimi' }
    ],
    faqs: [],
    isPopular: true
  },
  {
    code: 'ES',
    slug: 'ispanya',
    name: 'İspanya',
    flagEmoji: '🇪🇸',
    category: 'Schengen',
    processingTime: '10-15 iş günü',
    visaFee: '90 EUR',
    serviceFee: '1.500 TL',
    description: 'İspanya vizesi ile Barcelona\'nın Gaudi mimarisi, Madrid\'in sanat müzeleri ve Endülüs\'ün tarihi güzellikleri sizi bekliyor.',
    docGroups: [
      {
        title: 'Kişisel Evraklar',
        documents: ['Pasaport', 'Fotoğraf', 'Başvuru formu']
      },
      {
        title: 'Finansal Evraklar',
        documents: ['Banka dökümü', 'Bakiye yazısı']
      },
      {
        title: 'Seyahat Evrakları',
        documents: ['Rezervasyonlar', 'Sigorta']
      }
    ],
    process: [
      { step: 1, title: 'Başvuru', description: 'Online randevu alma' },
      { step: 2, title: 'Evrak Teslimi', description: 'Evrak teslimi ve biyometrik veri' },
      { step: 3, title: 'İnceleme', description: 'Değerlendirme' },
      { step: 4, title: 'Sonuç', description: 'Pasaport teslimi' }
    ],
    faqs: [],
    isPopular: true
  },
  {
    code: 'NL',
    slug: 'hollanda',
    name: 'Hollanda',
    flagEmoji: '🇳🇱',
    category: 'Schengen',
    processingTime: '10-15 iş günü',
    visaFee: '90 EUR',
    serviceFee: '1.500 TL',
    description: 'Hollanda vizesi ile Amsterdam\'ın kanalları, Van Gogh müzesi ve lalelerle ünlü Keukenhof bahçelerini ziyaret edebilirsiniz.',
    docGroups: [
      { title: 'Kişisel Evraklar', documents: ['Pasaport', 'Fotoğraf', 'Form'] },
      { title: 'Finansal Evraklar', documents: ['Banka dökümü'] },
      { title: 'Seyahat Evrakları', documents: ['Rezervasyonlar'] }
    ],
    process: [
      { step: 1, title: 'Başvuru', description: 'Randevu' },
      { step: 2, title: 'Teslim', description: 'Evrak teslimi' },
      { step: 3, title: 'İnceleme', description: 'Değerlendirme' },
      { step: 4, title: 'Sonuç', description: 'Teslim' }
    ],
    faqs: [],
    isPopular: false
  },
  {
    code: 'BE',
    slug: 'belcika',
    name: 'Belçika',
    flagEmoji: '🇧🇪',
    category: 'Schengen',
    processingTime: '10-15 iş günü',
    visaFee: '90 EUR',
    serviceFee: '1.500 TL',
    description: 'Belçika vizesi ile Brüksel\'in Grand Place meydanı, Brugge\'ün ortaçağ sokakları ve dünyaca ünlü çikolataları keşfedin.',
    docGroups: [
      { title: 'Kişisel Evraklar', documents: ['Pasaport', 'Fotoğraf'] },
      { title: 'Finansal Evraklar', documents: ['Banka dökümü'] },
      { title: 'Seyahat Evrakları', documents: ['Rezervasyonlar'] }
    ],
    process: [
      { step: 1, title: 'Başvuru', description: 'Randevu' },
      { step: 2, title: 'Teslim', description: 'Evrak teslimi' },
      { step: 3, title: 'İnceleme', description: 'Değerlendirme' },
      { step: 4, title: 'Sonuç', description: 'Teslim' }
    ],
    faqs: [],
    isPopular: false
  },
  {
    code: 'AT',
    slug: 'avusturya',
    name: 'Avusturya',
    flagEmoji: '🇦🇹',
    category: 'Schengen',
    processingTime: '10-15 iş günü',
    visaFee: '90 EUR',
    serviceFee: '1.500 TL',
    description: 'Avusturya vizesi ile Viyana\'nın imparatorluk sarayları, Salzburg\'un Mozart mirası ve Alp dağlarının muhteşem manzaralarını deneyimleyin.',
    docGroups: [
      { title: 'Kişisel Evraklar', documents: ['Pasaport', 'Fotoğraf'] },
      { title: 'Finansal Evraklar', documents: ['Banka dökümü'] },
      { title: 'Seyahat Evrakları', documents: ['Rezervasyonlar'] }
    ],
    process: [
      { step: 1, title: 'Başvuru', description: 'Randevu' },
      { step: 2, title: 'Teslim', description: 'Evrak teslimi' },
      { step: 3, title: 'İnceleme', description: 'Değerlendirme' },
      { step: 4, title: 'Sonuç', description: 'Teslim' }
    ],
    faqs: [],
    isPopular: false
  },
  {
    code: 'GR',
    slug: 'yunanistan',
    name: 'Yunanistan',
    flagEmoji: '🇬🇷',
    category: 'Schengen',
    processingTime: '10-15 iş günü',
    visaFee: '90 EUR',
    serviceFee: '1.500 TL',
    description: 'Yunanistan vizesi ile antik Atina, Santorini\'nin beyaz evleri ve Ege\'nin masmavi sularını keşfedin.',
    docGroups: [
      { title: 'Kişisel Evraklar', documents: ['Pasaport', 'Fotoğraf'] },
      { title: 'Finansal Evraklar', documents: ['Banka dökümü'] },
      { title: 'Seyahat Evrakları', documents: ['Rezervasyonlar'] }
    ],
    process: [
      { step: 1, title: 'Başvuru', description: 'Randevu' },
      { step: 2, title: 'Teslim', description: 'Evrak teslimi' },
      { step: 3, title: 'İnceleme', description: 'Değerlendirme' },
      { step: 4, title: 'Sonuç', description: 'Teslim' }
    ],
    faqs: [],
    isPopular: true
  },
  {
    code: 'PT',
    slug: 'portekiz',
    name: 'Portekiz',
    flagEmoji: '🇵🇹',
    category: 'Schengen',
    processingTime: '10-15 iş günü',
    visaFee: '90 EUR',
    serviceFee: '1.500 TL',
    description: 'Portekiz vizesi ile Lizbon\'un tarihi tramvayları, Porto\'nun şarap mahzenleri ve Algarve sahillerini ziyaret edin.',
    docGroups: [
      { title: 'Kişisel Evraklar', documents: ['Pasaport', 'Fotoğraf'] },
      { title: 'Finansal Evraklar', documents: ['Banka dökümü'] },
      { title: 'Seyahat Evrakları', documents: ['Rezervasyonlar'] }
    ],
    process: [
      { step: 1, title: 'Başvuru', description: 'Randevu' },
      { step: 2, title: 'Teslim', description: 'Evrak teslimi' },
      { step: 3, title: 'İnceleme', description: 'Değerlendirme' },
      { step: 4, title: 'Sonuç', description: 'Teslim' }
    ],
    faqs: [],
    isPopular: false
  },
  {
    code: 'CH',
    slug: 'isvicre',
    name: 'İsviçre',
    flagEmoji: '🇨🇭',
    category: 'Schengen',
    processingTime: '10-15 iş günü',
    visaFee: '90 EUR',
    serviceFee: '1.500 TL',
    description: 'İsviçre vizesi ile Alp dağları, Zürih\'in finans merkezi ve İsviçre çikolata fabrikalarını keşfedin.',
    docGroups: [
      { title: 'Kişisel Evraklar', documents: ['Pasaport', 'Fotoğraf'] },
      { title: 'Finansal Evraklar', documents: ['Banka dökümü'] },
      { title: 'Seyahat Evrakları', documents: ['Rezervasyonlar'] }
    ],
    process: [
      { step: 1, title: 'Başvuru', description: 'Randevu' },
      { step: 2, title: 'Teslim', description: 'Evrak teslimi' },
      { step: 3, title: 'İnceleme', description: 'Değerlendirme' },
      { step: 4, title: 'Sonuç', description: 'Teslim' }
    ],
    faqs: [],
    isPopular: false
  },
  // Diğer Schengen ülkeleri
  { code: 'SE', slug: 'isvec', name: 'İsveç', flagEmoji: '🇸🇪', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'İsveç vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'NO', slug: 'norvec', name: 'Norveç', flagEmoji: '🇳🇴', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Norveç vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'DK', slug: 'danimarka', name: 'Danimarka', flagEmoji: '🇩🇰', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Danimarka vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'FI', slug: 'finlandiya', name: 'Finlandiya', flagEmoji: '🇫🇮', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Finlandiya vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'CZ', slug: 'cekya', name: 'Çekya', flagEmoji: '🇨🇿', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Çekya vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'PL', slug: 'polonya', name: 'Polonya', flagEmoji: '🇵🇱', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Polonya vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'HU', slug: 'macaristan', name: 'Macaristan', flagEmoji: '🇭🇺', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Macaristan vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'SI', slug: 'slovenya', name: 'Slovenya', flagEmoji: '🇸🇮', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Slovenya vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'SK', slug: 'slovakya', name: 'Slovakya', flagEmoji: '🇸🇰', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Slovakya vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'EE', slug: 'estonya', name: 'Estonya', flagEmoji: '🇪🇪', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Estonya vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'LV', slug: 'letonya', name: 'Letonya', flagEmoji: '🇱🇻', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Letonya vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'LT', slug: 'litvanya', name: 'Litvanya', flagEmoji: '🇱🇹', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Litvanya vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'LU', slug: 'luksemburg', name: 'Lüksemburg', flagEmoji: '🇱🇺', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Lüksemburg vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'MT', slug: 'malta', name: 'Malta', flagEmoji: '🇲🇹', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Malta vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'IS', slug: 'izlanda', name: 'İzlanda', flagEmoji: '🇮🇸', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'İzlanda vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'LI', slug: 'lihtenstayn', name: 'Lihtenştayn', flagEmoji: '🇱🇮', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Lihtenştayn vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
  { code: 'HR', slug: 'hirvatistan', name: 'Hırvatistan', flagEmoji: '🇭🇷', category: 'Schengen', processingTime: '10-15 iş günü', visaFee: '90 EUR', serviceFee: '1.500 TL', description: 'Hırvatistan vizesi için başvurun.', docGroups: [], process: [], faqs: [], isPopular: false },
];

// Diğer ülkeler
const otherCountries: VisaCountry[] = [
  {
    code: 'AE',
    slug: 'dubai',
    name: 'Dubai (BAE)',
    flagEmoji: '🇦🇪',
    category: 'UAE',
    processingTime: '3-5 iş günü',
    visaFee: '100 USD',
    serviceFee: '1.000 TL',
    description: 'Dubai vizesi ile Birleşik Arap Emirlikleri\'ni ziyaret edebilirsiniz. Hızlı süreç ve kolay başvuru ile Dubai\'nin lüks alışveriş merkezleri, çöl safarileri ve modern mimarisi sizi bekliyor.',
    docGroups: [
      {
        title: 'Kişisel Evraklar',
        documents: [
          'Pasaport (en az 6 ay geçerli)',
          'Pasaport fotoğraf sayfası taraması',
          '1 adet biyometrik fotoğraf (beyaz fon)',
          'Vize başvuru formu'
        ]
      },
      {
        title: 'Ek Evraklar',
        documents: [
          'Uçak rezervasyonu',
          'Otel rezervasyonu',
          'Banka hesap dökümü (son 3 ay)'
        ]
      }
    ],
    process: [
      { step: 1, title: 'Evrak Gönderimi', description: 'Online evrak yükleme' },
      { step: 2, title: 'Başvuru', description: 'Vize başvurusu yapılır' },
      { step: 3, title: 'Onay', description: 'E-vize onayı e-posta ile gönderilir' },
      { step: 4, title: 'Seyahat', description: 'E-vizenizi yazdırarak seyahat edin' }
    ],
    faqs: [
      { question: 'Dubai vizesi ne kadar süre geçerli?', answer: 'Turistik Dubai vizesi genellikle 30 veya 90 gün geçerlidir.' },
      { question: 'E-vize mi alacağım?', answer: 'Evet, Dubai vizesi elektronik olarak düzenlenir ve e-posta ile gönderilir.' }
    ],
    isPopular: true
  },
  {
    code: 'US',
    slug: 'abd',
    name: 'Amerika Birleşik Devletleri',
    flagEmoji: '🇺🇸',
    category: 'USA',
    processingTime: '2-4 hafta (mülakat dahil)',
    visaFee: '185 USD',
    serviceFee: '2.500 TL',
    description: 'ABD vizesi (B1/B2) ile Amerika\'yı turistik veya ticari amaçla ziyaret edebilirsiniz. Konsolosluk mülakatı gerektiren bu vize için profesyonel danışmanlık hizmeti sunuyoruz.',
    docGroups: [
      {
        title: 'Kişisel Evraklar',
        documents: [
          'Pasaport (en az 6 ay geçerli)',
          'DS-160 başvuru formu onay sayfası',
          '1 adet biyometrik fotoğraf (5x5 cm, beyaz fon)',
          'Eski pasaportlar'
        ]
      },
      {
        title: 'Finansal Evraklar',
        documents: [
          'Son 6 aylık banka hesap dökümü',
          'Maaş bordrosu veya gelir belgesi',
          'Tapu, araç ruhsatı vb. varlık belgeleri'
        ]
      },
      {
        title: 'Çalışma Durumu',
        documents: [
          'İşveren yazısı (İngilizce)',
          'SGK dökümü',
          'Şirket sahipleri için ticaret sicil belgesi'
        ]
      },
      {
        title: 'Seyahat Planı',
        documents: [
          'Seyahat programı',
          'Daha önce ABD\'ye gittiyseniz eski vize kopyaları'
        ]
      }
    ],
    process: [
      { step: 1, title: 'DS-160', description: 'Online DS-160 formunu doldurun' },
      { step: 2, title: 'Ücret', description: 'Vize ücretini yatırın' },
      { step: 3, title: 'Mülakat', description: 'Konsoloslukta mülakat randevusu' },
      { step: 4, title: 'Sonuç', description: 'Pasaport kargo ile teslim' }
    ],
    faqs: [
      { question: 'ABD vizesi için mülakat zorunlu mu?', answer: 'Evet, ilk kez başvuranlar için konsolosluk mülakatı zorunludur.' },
      { question: 'Mülakatta ne sorulur?', answer: 'Seyahat amacınız, mali durumunuz, Türkiye\'ye bağlarınız gibi konular sorulabilir.' },
      { question: 'Vize reddedilirse ne olur?', answer: 'Ret sebebini değerlendirip koşullar değiştiğinde yeniden başvurabilirsiniz.' }
    ],
    isPopular: true
  },
  {
    code: 'GB',
    slug: 'ingiltere',
    name: 'İngiltere',
    flagEmoji: '🇬🇧',
    category: 'UK',
    processingTime: '15-20 iş günü',
    visaFee: '115 GBP',
    serviceFee: '2.000 TL',
    description: 'İngiltere vizesi ile Birleşik Krallık\'ı ziyaret edebilirsiniz. Londra\'nın tarihi yapıları, Edinburgh\'un kültürel zenginlikleri ve İngiliz kırsalı sizi bekliyor.',
    docGroups: [
      {
        title: 'Kişisel Evraklar',
        documents: [
          'Pasaport (en az 6 ay geçerli)',
          'Eski pasaportlar',
          '2 adet biyometrik fotoğraf',
          'Online başvuru formu çıktısı'
        ]
      },
      {
        title: 'Finansal Evraklar',
        documents: [
          'Son 6 aylık banka hesap dökümü (kaşeli, imzalı)',
          'Maaş bordrosu veya gelir belgesi',
          'Sponsorluk varsa sponsor mali belgeleri'
        ]
      },
      {
        title: 'Konaklama ve Seyahat',
        documents: [
          'Uçak rezervasyonu',
          'Otel rezervasyonu veya davetiye',
          'Detaylı seyahat planı'
        ]
      },
      {
        title: 'Çalışma Belgesi',
        documents: [
          'İşveren yazısı (İngilizce)',
          'SGK dökümü',
          'İmza sirküleri (şirket sahipleri)'
        ]
      }
    ],
    process: [
      { step: 1, title: 'Online Başvuru', description: 'Online form doldurma' },
      { step: 2, title: 'Randevu', description: 'Biyometrik veri randevusu' },
      { step: 3, title: 'İnceleme', description: 'Başvuru değerlendirmesi' },
      { step: 4, title: 'Sonuç', description: 'Pasaport teslimi' }
    ],
    faqs: [
      { question: 'İngiltere vizesi Schengen\'e dahil mi?', answer: 'Hayır, İngiltere Schengen bölgesinde değildir. Ayrı vize başvurusu gerekir.' },
      { question: 'Ne kadar süreliğine kalabilirim?', answer: 'Standart ziyaretçi vizesi ile 6 aya kadar kalabilirsiniz.' }
    ],
    isPopular: true
  }
];

export const visaCountries: VisaCountry[] = [...schengenCountries, ...otherCountries];

export function getVisaCountryBySlug(slug: string): VisaCountry | undefined {
  return visaCountries.find(country => country.slug === slug);
}

export function getPopularVisaCountries(): VisaCountry[] {
  return visaCountries.filter(country => country.isPopular);
}

export function getVisaCountriesByCategory(category: string): VisaCountry[] {
  return visaCountries.filter(country => country.category === category);
}

export function getAllVisaCountries(): VisaCountry[] {
  return visaCountries;
}

