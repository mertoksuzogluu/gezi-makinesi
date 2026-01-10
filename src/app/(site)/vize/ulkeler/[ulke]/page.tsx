'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { getVisaCountryBySlug } from '@/lib/admin-data';
import { VisaCountry } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Steps } from '@/components/Steps';
import { 
  Clock, 
  CreditCard, 
  ArrowRight,
  FileText,
  HelpCircle,
  CheckCircle2,
  Phone,
  Loader2
} from 'lucide-react';

export default function VisaCountryPage() {
  const params = useParams();
  const slug = params.ulke as string;
  const [country, setCountry] = useState<VisaCountry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const data = getVisaCountryBySlug(slug);
      setCountry(data || null);
      setIsLoading(false);
    }
  }, [slug]);

  const categoryColors: Record<string, string> = {
    Schengen: 'bg-blue-500',
    USA: 'bg-red-500',
    UK: 'bg-purple-500',
    UAE: 'bg-amber-500',
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!country) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{country.flagEmoji}</span>
            <div>
              <Badge className={categoryColors[country.category]}>{country.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">{country.name} Vizesi</h1>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-2xl">{country.description}</p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">İşlem Süresi</p>
                <p className="font-semibold">{country.processingTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Vize Ücreti</p>
                <p className="font-semibold">{country.visaFee}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Hizmet Bedeli</p>
                <p className="font-semibold">{country.serviceFee}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Destek Hattı</p>
                <p className="font-semibold">+90 212 XXX XX XX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              {/* Documents */}
              {country.docGroups.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-primary" />
                    Gerekli Evraklar
                  </h2>
                  <Accordion type="multiple" className="w-full">
                    {country.docGroups.map((group, index) => (
                      <AccordionItem key={index} value={`doc-${index}`}>
                        <AccordionTrigger className="text-left">
                          {group.title}
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2">
                            {group.documents.map((doc, docIndex) => (
                              <li key={docIndex} className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                <span className="text-sm">{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Process */}
              {country.process.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Başvuru Süreci</h2>
                  <Steps steps={country.process} variant="vertical" />
                </div>
              )}

              {/* FAQ */}
              {country.faqs.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <HelpCircle className="h-6 w-6 text-primary" />
                    Sık Sorulan Sorular
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {country.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Vize Başvurusu Yapın</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {country.name} vizesi için hemen başvuru talebi oluşturun. 
                    Uzman ekibimiz sizinle iletişime geçecektir.
                  </p>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Ücretsiz ön değerlendirme
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Detaylı evrak rehberliği
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Randevu desteği
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Süreç takibi
                    </li>
                  </ul>
                  <Button className="w-full" size="lg" asChild>
                    <Link href={`/vize/talep-olustur?ulke=${country.slug}`}>
                      Vize Talebi Oluştur
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-orange-50">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <strong>Not:</strong> Vize ücretleri ve işlem süreleri konsolosluk 
                    politikalarına göre değişiklik gösterebilir. Güncel bilgi için 
                    bizimle iletişime geçin.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
