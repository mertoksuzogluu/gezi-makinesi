'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Loader2,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

const contactInfo = [
  { icon: Phone, title: 'Telefon', value: '+90 212 XXX XX XX', href: 'tel:+902121234567' },
  { icon: Mail, title: 'E-posta', value: 'info@vizelyio.com', href: 'mailto:info@vizelyio.com' },
  { icon: MapPin, title: 'Adres', value: 'İstanbul, Türkiye', href: '#' },
  { icon: Clock, title: 'Çalışma Saatleri', value: 'Pzt-Cmt: 09:00-18:00', href: '#' },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      kvkkConsent: false,
    },
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSuccess(true);
    toast({
      title: 'Mesajınız Gönderildi',
      description: 'En kısa sürede size dönüş yapacağız.',
    });
    
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Teşekkürler!</h2>
            <p className="text-muted-foreground mb-6">
              Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <Button onClick={() => { setIsSuccess(false); reset(); }}>
              Yeni Mesaj Gönder
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-sky-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">İletişim</h1>
            <p className="text-lg opacity-90">
              Sorularınız için bize ulaşın. Uzman ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item) => (
              <a 
                key={item.title} 
                href={item.href}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Bize Mesaj Gönderin</h2>
              <p className="text-muted-foreground mb-8">
                Formu doldurarak bize mesaj gönderebilirsiniz. En kısa sürede size dönüş yapacağız.
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Ad Soyad *</Label>
                    <Input
                      id="fullName"
                      placeholder="Adınız Soyadınız"
                      {...register('fullName')}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">E-posta *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ornek@email.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      placeholder="05XXXXXXXXX"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu *</Label>
                    <Input
                      id="subject"
                      placeholder="Mesajınızın konusu"
                      {...register('subject')}
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Mesajınız *</Label>
                  <Textarea
                    id="message"
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="kvkkConsent"
                    checked={watch('kvkkConsent')}
                    onCheckedChange={(checked) => setValue('kvkkConsent', checked as boolean)}
                  />
                  <Label htmlFor="kvkkConsent" className="text-sm font-normal cursor-pointer">
                    <Link href="/gizlilik" className="text-primary hover:underline">KVKK Aydınlatma Metni</Link>&apos;ni 
                    okudum ve kişisel verilerimin işlenmesine onay veriyorum. *
                  </Label>
                </div>
                {errors.kvkkConsent && (
                  <p className="text-sm text-red-500">{errors.kvkkConsent.message}</p>
                )}

                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      Gönder
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Hızlı Talep</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Tur veya vize talebi oluşturmak için aşağıdaki bağlantıları kullanabilirsiniz.
                  </p>
                  <div className="space-y-3">
                    <Button className="w-full" asChild>
                      <Link href="/turlar/kendi-turunu-olustur">
                        Tur Talebi Oluştur
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/vize/talep-olustur">
                        Vize Talebi Oluştur
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


