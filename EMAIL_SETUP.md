# Email Bildirim Sistemi Kurulumu

Admin panelinden yapılan durum güncellemeleri otomatik olarak müşterilere email olarak gönderilir.

## Kurulum Adımları

### 1. Resend Hesabı Oluşturma

1. [Resend.com](https://resend.com) adresine gidin
2. Ücretsiz hesap oluşturun
3. Dashboard'dan **API Keys** bölümüne gidin
4. Yeni bir API key oluşturun ve kopyalayın

### 2. Domain Doğrulama (Opsiyonel ama Önerilen)

**Önemli:** Resend'in ücretsiz planında gönderen adres olarak `onboarding@resend.dev` kullanabilirsiniz, ancak production için kendi domain'inizi doğrulamanız önerilir.

1. Resend Dashboard'da **Domains** bölümüne gidin
2. Domain'inizi ekleyin (örn: `vizelyio.com`)
3. DNS kayıtlarını ekleyin (Resend size gerekli kayıtları verecek)
4. Doğrulama tamamlandıktan sonra email gönderen adresi güncelleyin

### 3. Environment Variables Ayarlama

1. Proje root dizininde `.env.local` dosyası oluşturun (`.env.local.example` dosyasını referans alabilirsiniz)
2. Aşağıdaki değişkeni ekleyin:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

### 4. Email Gönderen Adresini Güncelleme

`src/app/api/send-status-email/route.ts` dosyasında `from` adresini güncelleyin:

```typescript
from: 'Vizelyio <noreply@vizelyio.com>', // Kendi domain'iniz
// veya test için:
from: 'Vizelyio <onboarding@resend.dev>', // Resend test domain
```

## Nasıl Çalışır?

1. Admin panelinde bir talebin detay sayfasına gidin (`/admin/talepler/[id]`)
2. Sağ taraftaki "Durum Güncelle" kartından yeni durum seçin
3. İsteğe bağlı olarak not ekleyin
4. "Durumu Güncelle" butonuna tıklayın
5. Sistem otomatik olarak:
   - Talebin durumunu günceller
   - Müşteriye durum güncellemesi hakkında email gönderir

## Email İçeriği

Email'de şunlar yer alır:
- Durum başlığı ve açıklaması
- Talep ID
- Talep türü (Tur/Vize)
- Güncel durum
- Admin'in eklediği notlar (varsa)
- Vizelyio branding

## Test Etme

1. `.env.local` dosyasını oluşturup Resend API key'inizi ekleyin
2. Development server'ı başlatın: `npm run dev`
3. Admin panelinde bir talep oluşturun veya mevcut bir talebin durumunu güncelleyin
4. Email'in gönderildiğini kontrol edin (Resend Dashboard'dan veya müşteri email'inden)

## Sorun Giderme

### Email gönderilmiyor

1. `.env.local` dosyasında `RESEND_API_KEY` doğru mu kontrol edin
2. Resend Dashboard'dan API key'in aktif olduğunu kontrol edin
3. Browser console'da hata var mı kontrol edin
4. Server console'da (terminal) hata loglarını kontrol edin

### Email spam'e düşüyor

1. Domain doğrulaması yaptığınızdan emin olun
2. SPF, DKIM ve DMARC kayıtlarını ekleyin (Resend size gerekli kayıtları verir)
3. Email içeriğini spam filtrelerinden geçirmek için test edin

## Resend Limitleri

- **Ücretsiz Plan:** Ayda 3,000 email
- **Pro Plan:** Ayda 50,000 email ($20/ay)
- **Enterprise:** Özel fiyatlandırma

Detaylar için: [Resend Pricing](https://resend.com/pricing)

## Alternatif Email Servisleri

Resend yerine şu servisleri de kullanabilirsiniz:
- **SendGrid** - Popüler, güvenilir
- **AWS SES** - Düşük maliyet, AWS entegrasyonu
- **Mailgun** - Gelişmiş özellikler
- **Nodemailer** - SMTP ile herhangi bir servis

Her servis için API route'u güncellemeniz gerekecek.

