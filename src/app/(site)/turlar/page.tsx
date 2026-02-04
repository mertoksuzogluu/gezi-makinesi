'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TourCard } from '@/components/TourCard';
import { SectionTitle } from '@/components/SectionTitle';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getAllTours } from '@/lib/admin-data';
import { Tour } from '@/types';
import { Plane, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTours(getAllTours());
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Turlarımız</h1>
            <p className="text-lg opacity-90">
              Avrupa&apos;nın en güzel şehirlerinden Dubai&apos;nin modern lüksüne, 
              profesyonel rehberlik eşliğinde unutulmaz deneyimler sizi bekliyor.
            </p>
          </div>
        </div>
      </section>

      {/* Custom Tour CTA - Fold üstü */}
      <section className="py-10 bg-primary/5 border-b">
        <div className="container mx-auto px-4">
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shrink-0">
                    <Plane className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold mb-2">Kendi Turunu Oluştur</h2>
                    <p className="text-muted-foreground">
                      Hazır turlar size göre değil mi? Grup arkadaşlarınızla, istediğiniz tarih ve destinasyona 
                      özel tur planı oluşturalım.
                    </p>
                    <div className="flex flex-wrap gap-3 mt-3">
                      {['Esnek Tarih', 'İstediğiniz Otel', 'Özel Rehber'].map((item) => (
                        <span key={item} className="flex items-center gap-1 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button size="lg" asChild className="shrink-0">
                  <Link href="/turlar/kendi-turunu-olustur">
                    Talep Oluştur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tours List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Tüm Turlar" 
            subtitle={isLoading ? 'Yükleniyor...' : `${tours.length} tur bulundu`}
          />
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Aradığınızı Bulamadınız mı?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Size özel tur programı hazırlayalım. Grup sayınızı, tarih aralığınızı ve 
            istediğiniz destinasyonu belirtin, gerisini bize bırakın.
          </p>
          <Button size="lg" asChild>
            <Link href="/turlar/kendi-turunu-olustur">
              Özel Tur Talebi Oluştur
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
