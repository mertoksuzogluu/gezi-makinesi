import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Şartları',
  description: 'Vizelyio kullanım şartları ve koşulları.',
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto prose">
        <h1>Kullanım Şartları</h1>
        <p className="lead">
          Son güncelleme: Ocak 2026
        </p>

        <h2>1. Genel Hükümler</h2>
        <p>
          Bu web sitesini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız. 
          Vizelyio, bu şartları önceden haber vermeksizin değiştirme hakkını saklı tutar.
        </p>

        <h2>2. Hizmet Tanımı</h2>
        <p>
          Vizelyio, tur danışmanlığı ve vize danışmanlığı hizmetleri sunan bir danışmanlık firmasıdır. 
          Sunulan hizmetler:
        </p>
        <ul>
          <li>Seyahat önerileri ve tur danışmanlığı</li>
          <li>Özel grup tur danışmanlığı</li>
          <li>Vize danışmanlığı hizmetleri</li>
          <li>Seyahat planlama desteği</li>
        </ul>

        <h2>3. Rezervasyon ve Ödeme</h2>
        <h3>3.1 Rezervasyon</h3>
        <p>
          Rezervasyonlar, talep formu doldurulup onay alındıktan sonra geçerlilik kazanır. 
          Rezervasyon onayı için gerekli ödemenin yapılması gerekmektedir.
        </p>

        <h3>3.2 Ödeme Koşulları</h3>
        <p>
          Ödeme koşulları hizmet türüne göre değişiklik gösterebilir:
        </p>
        <ul>
          <li>Tur rezervasyonları: Kaparo + kalan tutar (tur başlamadan önce)</li>
        </ul>

        <h2>4. İptal ve İade Politikası</h2>
        <h3>4.1 Tur İptalleri</h3>
        <ul>
          <li>Tur başlangıcına 30+ gün kala: %100 iade</li>
          <li>Tur başlangıcına 15-30 gün kala: %50 iade</li>
          <li>Tur başlangıcına 15 günden az kala: İade yapılmaz</li>
        </ul>

        <h3>4.2 Vize Danışmanlığı İptalleri</h3>
        <p>
          Vize danışmanlığı hizmeti başladıktan sonra iade edilmez. 
          Vize ret durumlarında konsolosluk ücretleri iade edilmez.
        </p>

        <h2>5. Sorumluluk Sınırları</h2>
        <p>Vizelyio aşağıdaki durumlarda sorumluluk kabul etmez:</p>
        <ul>
          <li>Havayolu kaynaklı gecikmeler ve iptaller</li>
          <li>Doğal afetler ve mücbir sebepler</li>
          <li>Konsolosluk kararları (vize ret/onay)</li>
          <li>Kullanıcının kendi ihmalinden kaynaklanan sorunlar</li>
          <li>Pasaport geçerlilik sorunları</li>
        </ul>

        <h2>6. Kullanıcı Yükümlülükleri</h2>
        <p>Kullanıcılar aşağıdaki hususlara uymakla yükümlüdür:</p>
        <ul>
          <li>Doğru ve eksiksiz bilgi vermek</li>
          <li>Pasaport geçerliliğini kontrol etmek</li>
          <li>Vize başvurusu için gerekli evrakları zamanında teslim etmek</li>
          <li>Ödeme yükümlülüklerini yerine getirmek</li>
        </ul>

        <h2>7. Fikri Mülkiyet</h2>
        <p>
          Web sitesindeki tüm içerik (metin, görsel, logo vb.) Vizelyio&apos;ya aittir. 
          İzinsiz kullanımı yasaktır.
        </p>

        <h2>8. Uyuşmazlık Çözümü</h2>
        <p>
          Bu şartlardan doğan uyuşmazlıklarda İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.
        </p>

        <h2>9. İletişim</h2>
        <p>
          Kullanım şartlarıyla ilgili sorularınız için:
        </p>
        <p>
          E-posta: info@vizelyio.com<br />
          Telefon: +90 212 XXX XX XX
        </p>
      </div>
    </div>
  );
}


