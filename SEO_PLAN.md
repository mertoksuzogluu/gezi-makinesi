# Vizelyio SEO Planı

## 📋 Genel Bakış

Bu dokümantasyon, Vizelyio web sitesi için kapsamlı SEO stratejisini içermektedir.

## ✅ Tamamlanan SEO İyileştirmeleri (Güncel)

### 1. Teknik SEO

#### ✅ Sitemap.xml
- **Dosya**: `src/app/sitemap.ts`
- **Durum**: Dinamik sitemap oluşturuldu
- **İçerik**: Tüm statik sayfalar, turlar ve vize ülkeleri otomatik ekleniyor
- **URL**: `https://vizelyio.com/sitemap.xml`

#### ✅ Robots.txt
- **Dosya**: `public/robots.txt`
- **Durum**: Oluşturuldu
- **İçerik**: 
  - Admin ve panel sayfaları engellendi
  - API route'ları engellendi
  - Sitemap referansı eklendi

#### ✅ Meta Tags (Root Layout)
- **Dosya**: `src/app/layout.tsx`
- **İyileştirmeler**:
  - `metadataBase` eklendi
  - Gelişmiş `title` ve `description`
  - Genişletilmiş `keywords` listesi
  - `robots` meta tag'leri
  - Open Graph tags (Facebook, LinkedIn)
  - Twitter Card tags
  - Canonical URL'ler
  - Verification alanları (Google Search Console için hazır)

### 2. Structured Data (Schema.org)

#### ✅ StructuredData Component
- **Dosya**: `src/components/StructuredData.tsx`
- **Desteklenen Tipler**:
  - `Organization` (TravelAgency) - ✅ İyileştirildi (rating, contactPoint, address)
  - `TouristTrip` (Tur detayları) - ✅ İyileştirildi (priceSpecification, location details)
  - `BreadcrumbList` (Breadcrumb navigation) - ✅ Hazır
- **Kullanım**: Ana sayfa, vize sayfası, iletişim sayfası, tur detay sayfaları

### 3. İçerik Optimizasyonu

#### ✅ Alt Text'ler
- **TourCard**: ✅ Açıklayıcı alt text'ler eklendi
- **Tur Detay Sayfası**: ✅ Açıklayıcı alt text'ler eklendi
- **Logo**: ✅ "Vizelyio" alt text'i eklendi

#### ✅ Heading Yapısı
- **Ana Sayfa**: ✅ H1, H2, H3 yapısı doğru
- **Semantic HTML**: ✅ Kullanılıyor

### 3. Sayfa Bazlı SEO

#### ✅ Ana Sayfa
- **Dosya**: `src/app/(site)/page.tsx`
- **Metadata**: ✅ Eklendi
- **Structured Data**: ✅ Organization schema eklendi
- **Canonical URL**: ✅ Eklendi

#### ✅ Turlar Sayfası
- **Dosya**: `src/app/(site)/turlar/page.tsx`
- **Metadata**: ✅ Eklendi
- **Canonical URL**: ✅ Eklendi

#### ✅ Vize Sayfası
- **Dosya**: `src/app/(site)/vize/page.tsx`
- **Metadata**: ✅ Eklendi
- **Structured Data**: ✅ Organization schema eklendi
- **Canonical URL**: ✅ Eklendi

#### ✅ Vize Ülkeleri Sayfası
- **Dosya**: `src/app/(site)/vize/ulkeler/page.tsx`
- **Metadata**: ✅ Eklendi
- **Canonical URL**: ✅ Eklendi

#### ✅ Hakkımızda Sayfası
- **Dosya**: `src/app/(site)/hakkimizda/page.tsx`
- **Metadata**: ✅ Eklendi
- **Canonical URL**: ✅ Eklendi

#### ✅ İletişim Sayfası
- **Dosya**: `src/app/(site)/iletisim/page.tsx`
- **Metadata**: ✅ Eklendi
- **Structured Data**: ✅ Organization schema eklendi
- **Canonical URL**: ✅ Eklendi

#### ✅ SSS Sayfası
- **Dosya**: `src/app/(site)/sss/page.tsx`
- **Metadata**: ✅ Eklendi
- **Canonical URL**: ✅ Eklendi

#### ✅ Tur Detay Sayfaları
- **Dosya**: `src/app/(site)/turlar/[slug]/page.tsx`
- **Structured Data**: ✅ TouristTrip schema eklendi
- **Alt Text**: ✅ İyileştirildi

#### ✅ Vize Ülke Detay Sayfaları
- **Dosya**: `src/app/(site)/vize/ulkeler/[ulke]/page.tsx`
- **Structured Data**: ✅ Organization schema eklendi

## 🎯 Yapılacaklar

### 1. Sayfa Metadata'ları

#### ✅ Tamamlandı:
- [x] Ana Sayfa (`page.tsx`) - ✅ Metadata eklendi
- [x] Vize Sayfası (`vize/page.tsx`) - ✅ Metadata eklendi
- [x] Vize Ülkeleri (`vize/ulkeler/page.tsx`) - ✅ Metadata eklendi
- [x] Hakkımızda (`hakkimizda/page.tsx`) - ✅ Metadata eklendi
- [x] İletişim (`iletisim/page.tsx`) - ✅ Metadata eklendi
- [x] SSS (`sss/page.tsx`) - ✅ Metadata eklendi
- [x] Turlar Sayfası (`turlar/page.tsx`) - ✅ Metadata eklendi

#### Kalan:
- [ ] Tur Detay Sayfaları (`turlar/[slug]/page.tsx`) - Client component, metadata eklenemiyor (structured data var ✅)
- [ ] Vize Ülke Detay (`vize/ulkeler/[ulke]/page.tsx`) - Client component, metadata eklenemiyor (structured data var ✅)

### 2. Structured Data Ekleme

- [x] Ana sayfaya Organization schema ekle ✅
- [x] Tur detay sayfalarına TouristTrip schema ekle ✅
- [x] Vize sayfasına Organization schema ekle ✅
- [x] İletişim sayfasına Organization schema ekle ✅
- [x] Vize ülke sayfalarına Organization schema ekle ✅
- [ ] Breadcrumb schema'ları ekle (ihtiyaç halinde)

### 3. İçerik Optimizasyonu

#### ✅ Heading Yapısı (H1-H6)
- [x] Tüm sayfalarda doğru heading hiyerarşisi kontrol edildi ✅
- [x] Her sayfada tek H1 tag'i var ✅
- [x] H2, H3 tag'leri mantıklı sırada ✅

#### ✅ Alt Text'ler
- [x] Tüm görseller için açıklayıcı alt text'ler eklendi ✅
- [x] Logo için alt text: "Vizelyio" ✅
- [x] Tur görselleri için açıklayıcı alt text'ler ✅

#### Internal Linking
- [ ] İlgili sayfalar arasında internal linkler eklenecek
- [ ] Footer'da önemli sayfalara linkler var ✅
- [ ] İçerik içinde doğal internal linkler eklenecek

### 4. Performans Optimizasyonu

- [ ] Image optimization (Next.js Image component kullanılıyor ✅)
- [ ] Lazy loading (Next.js otomatik yapıyor ✅)
- [ ] Code splitting (Next.js otomatik yapıyor ✅)
- [ ] Font optimization (Inter font optimize edildi ✅)

### 5. URL Yapısı

- [x] SEO-friendly URL'ler (slug'lar kullanılıyor) ✅
- [x] Türkçe karakterler slug'larda düzgün handle ediliyor ✅
- [x] Canonical URL'ler tüm sayfalarda eklendi ✅

### 6. Mobile Optimization

- [x] Responsive design (Tailwind CSS ile ✅)
- [x] Mobile-first approach
- [ ] Mobile page speed test edilecek

### 7. Local SEO

- [ ] Google Business Profile oluşturulacak
- [ ] İletişim sayfasında LocalBusiness schema eklenecek
- [ ] Adres bilgileri structured data'ya eklenecek

### 8. Content Strategy

#### Blog/İçerik Sayfaları (Gelecek)
- [ ] Blog sayfası oluşturulacak
- [ ] SEO-friendly blog yazıları:
  - "Schengen Vizesi Nasıl Alınır?"
  - "Avrupa'da En İyi Tur Rotaları"
  - "Vize Başvuru Rehberi"
  - "Seyahat İpuçları"

### 9. Analytics & Monitoring

- [ ] Google Analytics 4 entegrasyonu
- [ ] Google Search Console kurulumu
- [ ] Bing Webmaster Tools
- [ ] Performance monitoring

### 10. Backlink Strategy

- [ ] Partner web sitelerine linkler
- [ ] Sosyal medya profilleri
- [ ] Dizinlere kayıt (Yandex, Google My Business)

## 📊 SEO Checklist

### Teknik SEO
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Meta tags (title, description, keywords)
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URL'ler (root layout'ta)
- [ ] Canonical URL'ler (tüm sayfalarda)
- [ ] Structured Data (Schema.org)
- [x] Mobile-friendly
- [x] Fast loading
- [ ] HTTPS (production'da)

### İçerik SEO
- [ ] Her sayfa için unique title
- [ ] Her sayfa için unique description
- [ ] Keyword optimization
- [ ] Heading yapısı (H1-H6)
- [ ] Alt text'ler
- [ ] Internal linking
- [ ] External linking (güvenilir kaynaklara)

### Kullanıcı Deneyimi
- [x] Responsive design
- [x] Fast loading
- [x] Easy navigation
- [ ] Clear CTAs
- [ ] User-friendly forms

## 🔍 Keyword Strategy

### Primary Keywords
- tur danışmanlığı
- vize danışmanlığı
- avrupa turları
- schengen vizesi
- yurtdışı turları

### Secondary Keywords
- paris turu
- roma turu
- londra turu
- dubai turu
- new york turu
- prag turu
- bansko kayak turu
- abd vizesi
- ingiltere vizesi
- dubai vizesi

### Long-tail Keywords
- schengen vizesi nasıl alınır
- avrupa turu fiyatları
- özel tur organizasyonu
- grup turu paketleri
- vize başvuru danışmanlığı

## 📈 Hedefler

### 3 Ay
- Google Search Console'da indexlenme
- İlk 10 sayfa için organik trafik
- Core Web Vitals skorları iyileştirme

### 6 Ay
- İlk 50 sayfa için organik trafik
- Anahtar kelimelerde ilk 3 sayfada görünürlük
- 1000+ aylık organik ziyaretçi

### 12 Ay
- İlk 100 sayfa için organik trafik
- Anahtar kelimelerde ilk sayfada görünürlük
- 5000+ aylık organik ziyaretçi

## 🛠️ Araçlar

### Kullanılacak SEO Araçları
- Google Search Console
- Google Analytics 4
- Google PageSpeed Insights
- Ahrefs / SEMrush (opsiyonel)
- Screaming Frog (teknik SEO audit)

## 📝 Notlar

- Tüm metadata'lar Türkçe olmalı
- URL'ler SEO-friendly olmalı (slug'lar kullanılıyor ✅)
- İçerikler orijinal ve kaliteli olmalı
- Düzenli olarak içerik güncellemeleri yapılmalı
- Backlink stratejisi geliştirilmeli

