# Gezi Makinesi - Turlar & Vize Danışmanlığı

Modern, responsive ve kullanıcı dostu bir tur ve vize danışmanlığı web sitesi. Next.js 14, TypeScript ve TailwindCSS ile geliştirilmiştir.

## 🚀 Özellikler

### Turlar (Gezi Makinesi)
- Hazır tur listesi ve detay sayfaları
- "Kendi Turunu Oluştur" özelliği ile grup tur talep formu
- Popüler turlar ve filtreleme

### Vize Danışmanlığı (Vize Makinesi)
- Tüm Schengen ülkeleri + Dubai + ABD + İngiltere için vize bilgileri
- Her ülke için detaylı evrak listesi
- Vize talep formu
- Süreç takibi

### Kullanıcı Paneli
- Mock auth sistemi (email + password)
- Talep listesi ve detay görüntüleme
- Durum takibi (timeline)

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── turlar/            # Tur sayfaları
│   ├── vize/              # Vize sayfaları
│   ├── panel/             # Kullanıcı paneli
│   ├── giris/             # Giriş sayfası
│   ├── kayit/             # Kayıt sayfası
│   └── ...                # Diğer statik sayfalar
├── components/            # React componentleri
│   ├── ui/               # shadcn/ui componentleri
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ...
├── contexts/              # React Context'ler
│   └── AuthContext.tsx
├── data/                  # Mock data
│   ├── tours.ts
│   ├── visa-countries.ts
│   └── requests.ts
├── hooks/                 # Custom hooks
├── lib/                   # Utility fonksiyonları
│   ├── utils.ts
│   └── validations.ts
└── types/                 # TypeScript type'ları
    └── index.ts
```

## 🛠️ Teknolojiler

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Forms:** react-hook-form + zod
- **Icons:** Lucide React
- **Date:** date-fns

## 🏁 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

1. Projeyi klonlayın veya indirin
```bash
cd gezi-makinesi
```

2. Bağımlılıkları yükleyin
```bash
npm install
```

3. Geliştirme sunucusunu başlatın
```bash
npm run dev
```

4. Tarayıcıda açın
```
http://localhost:3000
```

## 🎨 Logo Değiştirme

Logo dosyalarını `public/` klasöründe bulabilirsiniz:
- `logo.svg` - Header için (koyu tema)
- `logo-white.svg` - Footer için (açık tema)

Kendi logonuzu eklemek için bu dosyaları değiştirin. SVG formatı önerilir.

## 📝 İçerik Güncelleme

### Tur Verilerini Güncelleme
`src/data/tours.ts` dosyasını düzenleyin:

```typescript
export const tours: Tour[] = [
  {
    id: '1',
    slug: 'paris-turu',
    title: 'Paris Romantik Kaçamak',
    // ... diğer alanlar
  },
];
```

### Vize Ülkelerini Güncelleme
`src/data/visa-countries.ts` dosyasını düzenleyin:

```typescript
const schengenCountries: VisaCountry[] = [
  {
    code: 'DE',
    slug: 'almanya',
    name: 'Almanya',
    // ... diğer alanlar
  },
];
```

## 🔐 Auth Sistemi

Şu an mock auth kullanılmaktadır. Veriler localStorage'da saklanır.

### Demo Hesabı
- E-posta: `demo@example.com`
- Şifre: `123456`

### Gerçek Auth'a Geçiş
`src/contexts/AuthContext.tsx` dosyasındaki `login`, `register` ve `logout` fonksiyonlarını gerçek API çağrılarıyla değiştirin.

## 📱 Responsive Tasarım

Site tüm ekran boyutlarına uyumludur:
- Mobil (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🌐 SEO

Her sayfa için dinamik metadata tanımlanmıştır:
- Title ve description
- Open Graph tags
- Türkçe dil ayarı

## 📦 Build

Production build için:

```bash
npm run build
npm start
```

## 🔧 Ortam Değişkenleri

Şu an ortam değişkeni gerekmemektedir. Gerçek API entegrasyonu için `.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

## 📄 Lisans

Bu proje özel kullanım içindir.

---

Gezi Makinesi © 2026
