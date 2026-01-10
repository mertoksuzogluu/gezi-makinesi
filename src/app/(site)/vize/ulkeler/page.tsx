'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CountryCard } from '@/components/CountryCard';
import { SectionTitle } from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllVisaCountries } from '@/lib/admin-data';
import { VisaCountry } from '@/types';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function VisaCountriesPage() {
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
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Vize Ülkeleri</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Vize danışmanlığı hizmeti verdiğimiz tüm ülkeleri inceleyin. 
            Her ülke için gerekli evraklar, süreç ve ücret bilgilerine ulaşın.
          </p>
        </div>
      </section>

      {/* Countries List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="schengen" className="w-full">
            <TabsList className="w-full justify-start mb-8 flex-wrap h-auto gap-2">
              <TabsTrigger value="schengen" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Schengen ({schengenCountries.length})
              </TabsTrigger>
              <TabsTrigger value="usa" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">
                ABD ({usaCountries.length})
              </TabsTrigger>
              <TabsTrigger value="uk" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                İngiltere ({ukCountries.length})
              </TabsTrigger>
              <TabsTrigger value="uae" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                Dubai/BAE ({uaeCountries.length})
              </TabsTrigger>
              <TabsTrigger value="all">
                Tümü ({visaCountries.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="schengen">
              <SectionTitle 
                title="Schengen Ülkeleri" 
                subtitle="Schengen vizesi ile 27 Avrupa ülkesine seyahat edebilirsiniz"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {schengenCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="usa">
              <SectionTitle 
                title="Amerika Birleşik Devletleri" 
                subtitle="ABD vizesi (B1/B2) başvuru danışmanlığı"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {usaCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="uk">
              <SectionTitle 
                title="İngiltere" 
                subtitle="Birleşik Krallık vizesi başvuru danışmanlığı"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {ukCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="uae">
              <SectionTitle 
                title="Dubai / Birleşik Arap Emirlikleri" 
                subtitle="Dubai e-vize başvuru danışmanlığı"
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {uaeCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all">
              <SectionTitle 
                title="Tüm Ülkeler" 
                subtitle={`Toplam ${visaCountries.length} ülke`}
              />
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visaCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-orange-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Hangi Ülkeye Gitmek İstiyorsunuz?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Gitmek istediğiniz ülkeyi belirtin, size özel evrak listesi ve süreç hakkında bilgi verelim.
          </p>
          <Button size="lg" asChild>
            <Link href="/vize/talep-olustur">
              Vize Talebi Oluştur
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
