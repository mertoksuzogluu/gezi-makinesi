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
  ArrowRight,
  FileText,
  HelpCircle,
  CheckCircle2,
  Phone,
  Loader2
} from 'lucide-react';

export function VisaCountryDetailContent() {
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
    USA: 'bg-blue-600',
    UK: 'bg-blue-400',
    UAE: 'bg-sky-500',
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

  const processSteps = [
    { step: 1, title: 'Evrakları Hazırlayın', description: 'Size özel evrak listesi ile belgelerinizi eksiksiz hazırlayın' },
    { step: 2, title: 'Randevu Alın', description: `${country.name} konsolosluğu veya vize merkezi randevunuzu alın` },
    { step: 3, title: 'Başvurunuzu Yapın', description: 'Randevu günü başvurunuzu ve evraklarınızı teslim edin' },
    { step: 4, title: 'Vizenizi Alın', description: 'Onay sonrası pasaportunuzu teslim alın' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{country.flagEmoji}</span>
            <div>
              <Badge className={categoryColors[country.category] || 'bg-gray-500'}>{country.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">{country.name} Vizesi</h1>
            </div>
          </div>
          <p className="text-lg opacity-90 max-w-2xl">
            {country.description}
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">İşlem Süresi</h3>
                <p className="text-2xl font-bold text-primary">{country.processingTime}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Vize Ücreti</h3>
                <p className="text-2xl font-bold text-primary">{country.visaFee}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Hizmet Bedeli</h3>
                <p className="text-2xl font-bold text-primary">{country.serviceFee}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">{country.name} Vize Başvuru Süreci</h2>
          <Steps steps={processSteps} />
        </div>
      </section>

      {/* Documents */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Gerekli Evraklar</h2>
          <div className="space-y-4">
            {country.docGroups.map((group, index) => (
              <Accordion key={index} type="single" collapsible className="w-full">
                <AccordionItem value={`group-${index}`}>
                  <AccordionTrigger className="text-left font-semibold">
                    {group.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {group.documents.map((doc, docIndex) => (
                        <li key={docIndex} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {country.faqs && country.faqs.length > 0 && (
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Sıkça Sorulan Sorular</h2>
            <div className="max-w-3xl">
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
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="bg-blue-50">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {country.name} Vizesi İçin Başvurun
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {country.name} vize randevusu ve başvuru sürecinde yanınızdayız. 
                Uzman ekibimiz size yardımcı olmaya hazır.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href={`/vize/talep-olustur?country=${country.code}`}>
                    Vize Talebi Oluştur
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/iletisim">
                    <Phone className="mr-2 h-5 w-5" />
                    İletişime Geç
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

