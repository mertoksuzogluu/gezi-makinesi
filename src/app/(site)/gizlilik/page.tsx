import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Gezi Makinesi gizlilik politikası ve KVKK aydınlatma metni.',
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto prose prose-orange">
        <h1>Gizlilik Politikası</h1>
        <p className="lead">
          Son güncelleme: Ocak 2026
        </p>

        <h2>1. Giriş</h2>
        <p>
          Gezi Makinesi olarak kişisel verilerinizin güvenliği konusunda azami hassasiyet göstermekteyiz. 
          Bu gizlilik politikası, web sitemizi kullanırken toplanan kişisel verilerin nasıl işlendiğini açıklamaktadır.
        </p>

        <h2>2. Toplanan Veriler</h2>
        <p>Web sitemizi kullanırken aşağıdaki kişisel veriler toplanabilir:</p>
        <ul>
          <li>Ad, soyad</li>
          <li>E-posta adresi</li>
          <li>Telefon numarası</li>
          <li>Pasaport bilgileri (vize başvuruları için)</li>
          <li>Seyahat tercihleri ve planları</li>
          <li>IP adresi ve tarayıcı bilgileri</li>
        </ul>

        <h2>3. Verilerin Kullanım Amaçları</h2>
        <p>Toplanan veriler aşağıdaki amaçlarla kullanılmaktadır:</p>
        <ul>
          <li>Talep ettiğiniz hizmetlerin sunulması</li>
          <li>Rezervasyon ve başvuru işlemlerinin yürütülmesi</li>
          <li>Müşteri desteği sağlanması</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          <li>Hizmet kalitesinin iyileştirilmesi</li>
        </ul>

        <h2>4. Verilerin Paylaşımı</h2>
        <p>
          Kişisel verileriniz, hizmetlerin sunulması amacıyla aşağıdaki taraflarla paylaşılabilir:
        </p>
        <ul>
          <li>Havayolu şirketleri ve otel işletmeleri</li>
          <li>Konsolosluklar ve vize merkezleri</li>
          <li>Sigorta şirketleri</li>
          <li>Yasal yükümlülükler kapsamında yetkili kurumlar</li>
        </ul>

        <h2>5. Veri Güvenliği</h2>
        <p>
          Kişisel verilerinizin güvenliği için gerekli teknik ve idari tedbirler alınmaktadır. 
          SSL şifreleme, güvenlik duvarları ve erişim kontrolleri kullanılmaktadır.
        </p>

        <h2 id="kvkk">6. KVKK Kapsamında Haklarınız</h2>
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aşağıdaki haklara sahipsiniz:
        </p>
        <ul>
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
          <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
          <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
          <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
          <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
          <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
        </ul>

        <h2>7. Çerezler (Cookies)</h2>
        <p>
          Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. 
          Çerezler, tarayıcı ayarlarınızdan yönetilebilir.
        </p>

        <h2>8. İletişim</h2>
        <p>
          Gizlilik politikamız veya kişisel verilerinizle ilgili sorularınız için bizimle iletişime geçebilirsiniz:
        </p>
        <p>
          E-posta: info@gezimakinesi.com<br />
          Telefon: +90 212 XXX XX XX
        </p>

        <h2>9. Değişiklikler</h2>
        <p>
          Bu gizlilik politikası zaman zaman güncellenebilir. Güncellemeler web sitemizde yayınlandığı anda yürürlüğe girer.
        </p>
      </div>
    </div>
  );
}


