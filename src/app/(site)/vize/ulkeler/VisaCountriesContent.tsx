'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CountryCard } from '@/components/CountryCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllVisaCountries } from '@/lib/admin-data';
import { VisaCountry } from '@/types';
import { ArrowRight, Loader2 } from 'lucide-react';

export function VisaCountriesContent() {
  const [visaCountries, setVisaCountries] = useState<VisaCountry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setVisaCountries(getAllVisaCountries());
    setIsLoading(false);
  }, []);

  const schengenCountries = visaCountries.filter(c => c.category === 'Schengen');
  const usaCountries = visaCountries.filter(c => c.category === 'USA');
  const ukCountries = visaCountries.filter(c => c.category === 'UK');
  const uaeCountries = visaCountries.filter(c => c.category === 'UAE');

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Schengen Vize Ülkeleri & Vize Randevusu</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Schengen vizesi veren tüm ülkeler ve vize nasıl alınır rehberi. 
            Her ülke için <strong>vize randevusu</strong>, gerekli evraklar, süreç ve ücret bilgilerine ulaşın. 
            <strong> Almanya vizesi</strong>, <strong>Fransa vizesi</strong>, <strong>İtalya vizesi</strong> dahil hızlı vize desteği.
          </p>
        </div>
      </section>

      {/* Countries List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="all">Tümü</TabsTrigger>
              <TabsTrigger value="schengen" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Schengen ({schengenCountries.length})
              </TabsTrigger>
              <TabsTrigger value="usa" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                ABD ({usaCountries.length})
              </TabsTrigger>
              <TabsTrigger value="uk" className="data-[state=active]:bg-blue-400 data-[state=active]:text-white">
                İngiltere ({ukCountries.length})
              </TabsTrigger>
              <TabsTrigger value="uae" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                Dubai ({uaeCountries.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {visaCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="schengen" className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {schengenCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="usa" className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {usaCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="uk" className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {ukCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="uae" className="mt-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {uaeCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Vize İşlemlerinize Başlayın
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Gitmek istediğiniz ülkeyi seçin ve vize başvuru sürecinize başlayın. 
            Uzman ekibimiz size yardımcı olmaya hazır.
          </p>
          <Button size="lg" asChild>
            <Link href="/vize/talep-olustur">
              Vize Talebi Oluştur
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

