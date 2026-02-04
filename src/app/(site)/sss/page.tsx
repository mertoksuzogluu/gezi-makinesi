import { Metadata } from 'next';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, HelpCircle, Plane, Stamp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular',
  description: 'Vizelyio hakkında sıkça sorulan sorular ve cevapları.',
};

const generalFaqs = [
  {
    question: 'Vizelyio nedir?',
    answer: 'Vizelyio, tur organizasyonları ve vize danışmanlığı hizmetleri sunan bir seyahat acentesidir. 10 yılı aşkın deneyimimizle müşterilerimize kaliteli hizmet sunuyoruz.'
  },
  {
    question: 'Nasıl rezervasyon yapabilirim?',
    answer: 'Web sitemiz üzerinden online talep oluşturabilir veya telefon ile bize ulaşabilirsiniz. Talebiniz alındıktan sonra uzman ekibimiz sizinle iletişime geçecektir.'
  },
  {
    question: 'Ödeme seçenekleri nelerdir?',
    answer: 'Kredi kartı, banka havalesi ve nakit ödeme seçeneklerimiz mevcuttur. Taksit imkanı için bizimle iletişime geçebilirsiniz.'
  },
  {
    question: 'İptal ve iade koşulları nelerdir?',
    answer: 'İptal ve iade koşulları hizmet türüne göre değişmektedir. Detaylı bilgi için kullanım şartları sayfamızı inceleyebilir veya bizimle iletişime geçebilirsiniz.'
  },
];

const tourFaqs = [
  {
    question: 'Turlarınız neleri kapsamaktadır?',
    answer: 'Turlarımız genellikle uçak bileti, otel konaklaması, transferler, rehberlik hizmeti ve belirtilen aktiviteleri kapsamaktadır. Her turun detay sayfasında "Dahil" ve "Dahil Değil" bölümlerini inceleyebilirsiniz.'
  },
  {
    question: 'Grup turu düzenleyebilir misiniz?',
    answer: 'Evet! "Kendi Turunu Oluştur" hizmetimiz ile özel grup turları düzenliyoruz. Kişi sayısı, tarih, destinasyon ve bütçenizi belirterek talep oluşturabilirsiniz.'
  },
  {
    question: 'Minimum kaç kişi ile tur düzenliyorsunuz?',
    answer: 'Grup turları için minimum kişi sayımız genellikle 4-6 kişidir. Ancak bu, destinasyona göre değişebilir. Özel talepler için bizimle iletişime geçebilirsiniz.'
  },
  {
    question: 'Çocuklar için indirim var mı?',
    answer: 'Evet, 0-2 yaş bebek indirimi ve 2-12 yaş çocuk indirimi uygulanmaktadır. Detaylı bilgi için tur detay sayfalarını inceleyebilirsiniz.'
  },
  {
    question: 'Seyahat sigortası dahil mi?',
    answer: 'Seyahat sigortası genellikle tur fiyatına dahil değildir ancak talep edilmesi halinde ekleyebiliriz. Schengen turları için seyahat sigortası zorunludur.'
  },
];

const visaFaqs = [
  {
    question: 'Schengen vizesi nedir?',
    answer: 'Schengen vizesi, 27 Avrupa ülkesine (Almanya, Fransa, İtalya, İspanya vb.) tek bir vize ile seyahat imkanı sağlayan vizedir. Genellikle 90 güne kadar kalış hakkı verir.'
  },
  {
    question: 'Vize başvurusu için ne kadar önceden başvurmalıyım?',
    answer: 'Schengen vizesi için seyahat tarihinizden en az 4-6 hafta önce başvurmanızı öneririz. ABD ve İngiltere vizeleri için bu süre daha uzun olabilir.'
  },
  {
    question: 'Vize ret alırsam ne olur?',
    answer: 'Vize reddine neden olan eksiklikleri belirleyip düzeltildikten sonra yeniden başvuru yapabilirsiniz. Danışmanlarımız ret nedenlerini analiz edip size yol gösterecektir.'
  },
  {
    question: 'Hangi ülkelere vize danışmanlığı veriyorsunuz?',
    answer: 'Tüm Schengen ülkeleri, Amerika Birleşik Devletleri, İngiltere ve Dubai (BAE) için vize danışmanlığı hizmeti sunuyoruz.'
  },
  {
    question: 'Vize garantisi veriyor musunuz?',
    answer: 'Vize kararı tamamen konsolosluğa aittir, bu nedenle garanti vermemiz mümkün değildir. Ancak eksiksiz ve doğru hazırlanmış başvurularla başarı oranını artırıyoruz.'
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sıkça Sorulan Sorular</h1>
            <p className="text-lg opacity-90">
              Merak ettiklerinize burada cevap bulabilirsiniz. Bulamadıysanız bize ulaşmaktan çekinmeyin.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="general">
                <HelpCircle className="h-4 w-4 mr-2" />
                Genel
              </TabsTrigger>
              <TabsTrigger value="tour">
                <Plane className="h-4 w-4 mr-2" />
                Turlar
              </TabsTrigger>
              <TabsTrigger value="visa">
                <Stamp className="h-4 w-4 mr-2" />
                Vize
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  {generalFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`general-${index}`}>
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
            </TabsContent>

            <TabsContent value="tour">
              <div className="max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  {tourFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`tour-${index}`}>
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
            </TabsContent>

            <TabsContent value="visa">
              <div className="max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  {visaFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`visa-${index}`}>
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
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Sorunuza cevap bulamadınız mı?</h2>
              <p className="text-muted-foreground mb-6">
                Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız.
              </p>
              <Button asChild>
                <Link href="/iletisim">
                  İletişim
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}


