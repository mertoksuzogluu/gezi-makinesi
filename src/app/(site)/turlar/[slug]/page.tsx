'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getTourBySlug } from '@/lib/admin-data';
import { Tour } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Calendar, 
  Check, 
  X, 
  ArrowRight,
  Clock,
  Users,
  Loader2,
  CalendarDays
} from 'lucide-react';
import { StructuredData } from '@/components/StructuredData';

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function TourDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const data = getTourBySlug(slug);
      setTour(data || null);
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!tour) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-[400px] md:h-[500px]">
        {tour.heroImage.startsWith('/') ? (
          <img
            src={tour.heroImage}
            alt={`${tour.title} - ${tour.location}, ${tour.country} seyahat önerisi görseli`}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={tour.heroImage}
            alt={`${tour.title} - ${tour.location}, ${tour.country} seyahat önerisi görseli`}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-white/80 mb-3">
              <MapPin className="h-4 w-4" />
              <span>{tour.location}, {tour.country}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{tour.title}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {tour.durationDays} Gün
              </Badge>
              {tour.startDate && tour.endDate && (
                <Badge variant="secondary" className="text-sm bg-blue-500 text-white">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
                </Badge>
              )}
              {tour.isPopular && (
                <Badge className="bg-primary">Popüler</Badge>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">Seyahat Önerisi Hakkında</h2>
                <p className="text-muted-foreground mb-4">{tour.description}</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Not:</strong> Bu bir seyahat önerisidir. Program esnek olup, istediğiniz gibi özelleştirilebilir. 
                    Herkes serbest takılabilir, rehberli bir tur değildir.
                  </p>
                </div>
              </div>

              <Tabs defaultValue="highlights" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="highlights">Öne Çıkanlar</TabsTrigger>
                  <TabsTrigger value="itinerary">Önerilen Program</TabsTrigger>
                  <TabsTrigger value="included">Hizmet Önerileri</TabsTrigger>
                </TabsList>
                
                <TabsContent value="highlights" className="mt-6">
                  <ul className="space-y-3">
                    {tour.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="itinerary" className="mt-6">
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Aşağıdaki program bir öneridir. İstediğiniz gibi değiştirebilir, eklemeler veya çıkarmalar yapabilirsiniz.
                    </p>
                  </div>
                  <div className="space-y-6">
                    {tour.itinerary.map((day) => (
                      <div key={day.day} className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                          {day.day}
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">{day.title}</h4>
                          <p className="text-sm text-muted-foreground">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="included" className="mt-6">
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Aşağıdaki hizmetler önerilir. İstediğiniz hizmetleri seçebilir, programı kendinize göre özelleştirebilirsiniz.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Check className="h-5 w-5 text-green-600" />
                        Sunulan Hizmetler
                      </h4>
                      <ul className="space-y-2">
                        {tour.included.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <X className="h-5 w-5 text-red-500" />
                        Opsiyonel / Ekstra
                      </h4>
                      <ul className="space-y-2">
                        {tour.notIncluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tahmini Fiyat</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <span className="text-sm text-muted-foreground">Başlangıç fiyatı (tahmini)</span>
                    <p className="text-4xl font-bold text-primary">€{tour.priceFrom}</p>
                    <span className="text-sm text-muted-foreground">kişi başı</span>
                  </div>
                  <div className="space-y-2 mb-6 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{tour.durationDays} Gün / {tour.durationDays - 1} Gece</span>
                    </div>
                    {tour.startDate && tour.endDate && (
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-green-600" />
                        <span className="text-green-600 font-medium">
                          {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{tour.location}, {tour.country}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/turlar/kendi-turunu-olustur?destination=${encodeURIComponent(`${tour.location}, ${tour.country}`)}&tourId=${tour.id}`}>
                      Bu Öneriyi Talep Et
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Özel Tur mu İstiyorsunuz?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Bu turun tarihlerini veya detaylarını değiştirmek mi istiyorsunuz? 
                    Size özel tur programı hazırlayalım.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/turlar/kendi-turunu-olustur">
                      <Users className="mr-2 h-4 w-4" />
                      Özel Tur Oluştur
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <div className="text-sm">
                      <p className="font-medium">Sorularınız mı var?</p>
                      <p className="text-muted-foreground">+90 212 XXX XX XX</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
