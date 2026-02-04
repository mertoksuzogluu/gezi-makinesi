import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Award, 
  Globe, 
  HeadphonesIcon,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Schengen Vizesi Uzmanı | Vize Danışmanlığı Hakkında',
  description: '10+ yıllık deneyimle schengen vizesi ve hızlı vize danışmanlığı. Almanya vizesi dahil tüm Avrupa ülkeleri için vize nasıl alınır konusunda uzman ekibimizle hizmetinizdeyiz.',
  keywords: [
    'schengen vizesi', 'hızlı vize', 'vize danışmanlığı', 'Almanya vizesi',
    'vize nasıl alınır', 'uzun süreli vize', 'uzun vize alma', 'vize uzmanı',
    'vize danışmanlığı firması', 'güvenilir vize danışmanı', 'vize başvuru desteği'
  ],
  openGraph: {
    title: 'Schengen Vizesi Uzmanı | Vize Danışmanlığı Hakkında',
    description: '10+ yıllık deneyimle schengen vizesi ve hızlı vize danışmanlığı. Almanya vizesi dahil tüm Avrupa ülkeleri için vize nasıl alınır konusunda uzman ekibimizle hizmetinizdeyiz.',
    url: 'https://vizelyio.com/hakkimizda',
    type: 'website',
  },
  alternates: {
    canonical: 'https://vizelyio.com/hakkimizda',
  },
};

const stats = [
  { value: '10+', label: 'Yıllık Deneyim' },
  { value: '5000+', label: 'Mutlu Müşteri' },
  { value: '50+', label: 'Destinasyon' },
  { value: '%98', label: 'Memnuniyet' },
];

const values = [
  { icon: Users, title: 'Müşteri Odaklılık', description: 'Her müşterimiz bizim için özeldir. İhtiyaçlarınızı dinler, size en uygun çözümü sunarız.' },
  { icon: Award, title: 'Kalite', description: 'Hizmetlerimizde kaliteden asla ödün vermeyiz. Güvenilir danışmanlık hizmeti sunuyoruz.' },
  { icon: Globe, title: 'Uzmanlık', description: 'Alanında uzman ekibimiz, vize ve tur konularında size en doğru yönlendirmeyi yapar.' },
  { icon: HeadphonesIcon, title: 'Destek', description: 'Seyahatinizin başından sonuna kadar yanınızdayız. 7/24 destek hattımız hizmetinizde.' },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-500 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hakkımızda</h1>
            <p className="text-lg opacity-90">
              Vizelyio olarak 10 yılı aşkın süredir seyahat sektöründe hizmet veriyoruz. 
              Turlar ve vize danışmanlığı alanında binlerce müşteriyle çalışma fırsatı bulduk.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Hikayemiz</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Vizelyio, 2015 yılında seyahat tutkunları tarafından kuruldu. 
                  Amacımız, insanların hayallerindeki seyahatleri gerçekleştirmelerine yardımcı olmaktı.
                </p>
                <p>
                  Yıllar içinde edindiğimiz deneyim ve müşterilerimizden aldığımız geri bildirimlerle 
                  sürekli kendimizi geliştirdik. Bugün, seyahat danışmanlığı alanında güvenilir bir 
                  hizmet sağlayıcısı olarak müşterilerimize hizmet veriyoruz.
                </p>
                <p>
                  2020 yılında vize danışmanlığı hizmetimizi başlattık. Böylece müşterilerimize 
                  kapsamlı vize danışmanlığı hizmeti de sunmaya başladık. Schengen, ABD, İngiltere 
                  ve Dubai vizesi konularında uzman ekibimizle binlerce başarılı başvuruya imza attık.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden bg-blue-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="h-32 w-32 text-blue-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Değerlerimiz</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Vizelyio - Turlar</h3>
                <ul className="space-y-3">
                  {[
                    'Seyahat önerileri',
                    'Tur danışmanlığı',
                    'Kendi turunu oluştur danışmanlığı',
                    'Destinasyon önerileri',
                    'Seyahat planlama desteği'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Vize Danışmanlığı</h3>
                <ul className="space-y-3">
                  {[
                    'Schengen vizesi',
                    'ABD vizesi (B1/B2)',
                    'İngiltere vizesi',
                    'Dubai e-vize',
                    'Evrak hazırlama ve randevu desteği'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-sky-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Seyahatinizi Planlayalım</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            İster tur danışmanlığı, ister vize danışmanlığı olsun, uzman ekibimiz yanınızda.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/turlar">
                Turları Keşfet
              </Link>
            </Button>
            <Link href="/iletisim">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 hover:text-white bg-transparent">
                Bize Ulaşın
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


