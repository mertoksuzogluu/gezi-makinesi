'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CountryCard } from '@/components/CountryCard';
import { SectionTitle } from '@/components/SectionTitle';
import { Steps } from '@/components/Steps';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllVisaCountries } from '@/lib/admin-data';
import { VisaCountry } from '@/types';
import { 
  Stamp, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck,
  Clock,
  FileText,
  HeadphonesIcon,
  Loader2,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const processSteps = [
  { step: 1, title: 'Talep Oluşturun', description: 'Online formu doldurun, gitmek istediğiniz ülkeyi seçin' },
  { step: 2, title: 'Evrakları Hazırlayın', description: 'Size özel evrak listesi ile belgelerinizi hazırlayın' },
  { step: 3, title: 'Başvuru Yapın', description: 'Randevu ve başvuru sürecinde yanınızdayız' },
  { step: 4, title: 'Vizenizi Alın', description: 'Onay sonrası pasaportunuzu teslim alın' },
];

const features = [
  { icon: ShieldCheck, title: 'Uzman Danışmanlık', description: '10+ yıllık vize deneyimi' },
  { icon: FileText, title: 'Evrak Desteği', description: 'Eksiksiz evrak hazırlığı' },
  { icon: Clock, title: 'Hızlı Süreç', description: 'Minimum bekleme süresi' },
  { icon: HeadphonesIcon, title: 'Takip Desteği', description: 'Başvuru sonuna kadar yanınızda' },
];

export default function VisaPage() {
  const [visaCountries, setVisaCountries] = useState<VisaCountry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setVisaCountries(getAllVisaCountries());
    setIsLoading(false);
  }, []);

  const popularCountries = visaCountries.filter(c => c.isPopular);
  const filteredPopularCountries = popularCountries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const schengenCount = visaCountries.filter(c => c.category === 'Schengen').length;

  const categories = [
    { name: 'Schengen', count: schengenCount, color: 'bg-blue-500', showCount: true },
    { name: 'ABD', color: 'bg-red-500', showCount: false },
    { name: 'İngiltere', color: 'bg-purple-500', showCount: false },
    { name: 'Dubai (BAE)', color: 'bg-amber-500', showCount: false },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Vize Danışmanlığı</h1>
            <p className="text-lg opacity-90 mb-6">
              Schengen, ABD, İngiltere ve Dubai vizesi için profesyonel danışmanlık hizmeti. 
              Evrak hazırlama, randevu ve başvuru sürecinde yanınızdayız.
            </p>
            <Button size="lg" asChild>
              <Link href="/vize/talep-olustur">
                <Stamp className="mr-2 h-5 w-5" />
                Vize Talebi Oluştur
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Card key={cat.name} className="text-center">
                <CardContent className="p-4">
                  <div className={`w-3 h-3 rounded-full ${cat.color} mx-auto mb-2`} />
                  <h3 className="font-semibold">{cat.name}</h3>
                  {cat.showCount && (
                    <p className="text-sm text-muted-foreground">{cat.count} ülke</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Countries */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Popüler Vize Ülkeleri" 
            subtitle="En çok talep edilen ülkeler için vize danışmanlığı"
          />
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ülke ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPopularCountries.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPopularCountries.slice(0, 8).map((country) => (
                <CountryCard key={country.code} country={country} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Aradığınız kriterlere uygun ülke bulunamadı.</p>
              <Button variant="outline" onClick={() => setSearchQuery('')}>
                Aramayı Temizle
              </Button>
            </div>
          )}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/vize/ulkeler">
                Tüm Ülkeleri Gör
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Vize Süreci Nasıl İşler?" 
            subtitle="4 kolay adımda vizenizi alın"
            centered
          />
          <Steps steps={processSteps} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vize Başvurunuza Başlayın
            </h2>
            <p className="text-lg opacity-90 mb-6">
              Gitmek istediğiniz ülkeyi belirtin, gerekli evrakları ve süreci sizinle paylaşalım. 
              Profesyonel ekibimiz başvuru sürecinin her aşamasında yanınızda.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Ücretsiz Ön Değerlendirme', 'Detaylı Evrak Listesi', 'Randevu Desteği', 'Takip Hizmeti'].map((item) => (
                <div key={item} className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  {item}
                </div>
              ))}
            </div>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/vize/talep-olustur">
                Vize Talebi Oluştur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
