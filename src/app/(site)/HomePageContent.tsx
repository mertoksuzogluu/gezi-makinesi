'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TourCard } from '@/components/TourCard';
import { CountryCard } from '@/components/CountryCard';
import { SectionTitle } from '@/components/SectionTitle';
import { Steps } from '@/components/Steps';
import { TestimonialCard } from '@/components/TestimonialCard';
import { StructuredData } from '@/components/StructuredData';
import { getAllTours, getAllVisaCountries } from '@/lib/admin-data';
import { Tour, VisaCountry } from '@/types';
import { 
  Plane, 
  Stamp, 
  Users, 
  ShieldCheck, 
  Clock, 
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  Loader2
} from 'lucide-react';

const processSteps = [
  { step: 1, title: 'Talep Oluşturun', description: 'Online formu doldurun, size en uygun turu veya vize hizmetini seçin.' },
  { step: 2, title: 'Uzmanlarla Görüşün', description: 'Ekibimiz sizinle iletişime geçer, detayları netleştirir.' },
  { step: 3, title: 'Planı Onaylayın', description: 'Size özel hazırlanan teklifi inceleyin ve onaylayın.' },
  { step: 4, title: 'Yola Çıkın', description: 'Tüm hazırlıklar tamamlandığında hayalinizdeki seyahate başlayın!' },
];

const whyUsFeatures = [
  { icon: ShieldCheck, title: 'Güvenilir Hizmet', description: 'TÜRSAB belgeli, 10+ yıl deneyim' },
  { icon: Users, title: 'Uzman Kadro', description: 'Alanında uzman danışmanlar' },
  { icon: Clock, title: 'Hızlı Süreç', description: 'Minimum bekleme, maksimum verimlilik' },
  { icon: HeadphonesIcon, title: '7/24 Destek', description: 'Her zaman yanınızdayız' },
];

const testimonials = [
  { name: 'Mehmet Öz', location: 'İstanbul', content: 'Paris turumuz muhteşemdi. Her şey kusursuz organize edilmişti. Danışmanlarımız çok bilgiliydi ve tüm sorularımıza sabırla yanıt verdi.', rating: 5, tourType: 'Paris Turu' },
  { name: 'Ayşe Demir', location: 'Ankara', content: 'Schengen vizemi çok hızlı bir şekilde aldım. Tüm süreç boyunca bilgilendirildim. Kesinlikle tavsiye ediyorum!', rating: 5, tourType: 'Vize Danışmanlığı' },
  { name: 'Ali Yıldız', location: 'İzmir', content: 'Kendi turumuzu oluşturduk ve beklentilerimizin çok üzerinde bir deneyim yaşadık. Çok teşekkürler!', rating: 5, tourType: 'Özel Tur' },
];

export function HomePageContent() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [visaCountries, setVisaCountries] = useState<VisaCountry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTours(getAllTours());
    setVisaCountries(getAllVisaCountries());
    setIsLoading(false);
  }, []);

  const popularTours = tours.filter(t => t.isPopular);
  const popularCountries = visaCountries.filter(c => c.isPopular);

  return (
    <>
      <StructuredData type="organization" />
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="relative hero-gradient text-white py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
                Turlar & Vize Danışmanlığı
                <span className="block text-2xl md:text-3xl font-normal mt-2 opacity-90">
                  Tek Yerde
                </span>
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in stagger-1">
                Hayalinizdeki seyahati planlamak artık çok kolay. 
                Turlarımızı keşfedin veya vize işlemlerinizi bizimle halledin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-2">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/turlar/kendi-turunu-olustur">
                    <Plane className="mr-2 h-5 w-5" />
                    Kendi Turunu Oluştur
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                  <Link href="/vize/talep-olustur">
                    <Stamp className="mr-2 h-5 w-5" />
                    Vize Talebi Oluştur
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 100H1440V0C1440 0 1140 80 720 80C300 80 0 0 0 0V100Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Services */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/turlar">
                <Card className="group cursor-pointer transition-all hover:shadow-xl hover:border-primary">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Plane className="h-7 w-7 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Turlar</h2>
                    <p className="text-muted-foreground mb-4">
                      Avrupa&apos;dan Dubai&apos;ye, hazır turlar veya size özel organizasyonlar. 
                      Tur danışmanlığı hizmetimizle unutulmaz deneyimler.
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      Turları Keşfet
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/vize">
                <Card className="group cursor-pointer transition-all hover:shadow-xl hover:border-primary">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Stamp className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold">Vize Danışmanlığı</h2>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Schengen, ABD, İngiltere, Dubai vizesi... 
                      Deneyimli ekibimizle vize sürecinizi kolaylaştırın.
                    </p>
                    <div className="flex items-center text-primary font-medium">
                      Vize Bilgileri
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Tours */}
        {popularTours.length > 0 && (
          <section className="py-16 bg-blue-50">
            <div className="container mx-auto px-4">
              <SectionTitle 
                title="Popüler Turlarımız" 
                subtitle="En çok tercih edilen seyahat önerileri"
                centered
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {popularTours.slice(0, 6).map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <Link href="/turlar">
                    Tüm Turları Görüntüle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Popular Visa Countries */}
        {popularCountries.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <SectionTitle 
                title="Popüler Vize Ülkeleri" 
                subtitle="En çok başvuru yapılan destinasyonlar"
                centered
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {popularCountries.slice(0, 8).map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline" asChild>
                  <Link href="/vize/ulkeler">
                    Tüm Ülkeleri Görüntüle
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Why Us */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Neden Vizelyio?" 
              subtitle="Size özel hizmet anlayışımız"
              centered
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
              {whyUsFeatures.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors mx-auto">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm opacity-90">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Nasıl Çalışırız?" 
              subtitle="4 kolay adımda hayalinizdeki seyahate"
              centered
            />
            <Steps steps={processSteps} />
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <SectionTitle 
              title="Müşteri Yorumları" 
              subtitle="Bizi tercih edenler ne diyor?"
              centered
            />
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hayalinizdeki Seyahate Başlayın
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              İster hazır turlarımızdan seçin, ister özel tur oluşturun, 
              ister vize işlemlerinizi bize bırakın. Siz hayal edin, biz gerçekleştirelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/turlar">
                  Turları Keşfet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/vize">
                  Vize Bilgileri
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

