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

export function ContactPageContent() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simüle edilmiş form gönderimi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: 'Mesajınız Gönderildi',
      description: 'En kısa sürede size dönüş yapacağız.',
    });
    
    setIsSuccess(true);
    reset();
    setIsSubmitting(false);
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-500 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">İletişim</h1>
            <p className="text-lg opacity-90 text-center">
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
                  <h3 className="font-semibold mb-1">{item.title}</h3>
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
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Bize Mesaj Gönderin</CardTitle>
              </CardHeader>
              <CardContent>
                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Mesajınız başarıyla gönderildi!</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Ad Soyad *</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder="Adınız Soyadınız"
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      {...register('phone')}
                      placeholder="0532 XXX XX XX"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Konu *</Label>
                    <Input
                      id="subject"
                      {...register('subject')}
                      placeholder="Mesaj konusu"
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-500">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mesaj *</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      rows={6}
                      placeholder="Mesajınızı buraya yazın..."
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <div className="flex items-start gap-2">
                    <Checkbox
                      id="kvkk"
                      {...register('kvkkConsent')}
                    />
                    <Label htmlFor="kvkk" className="text-sm cursor-pointer">
                      Kişisel verilerimin işlenmesine izin veriyorum. *
                    </Label>
                  </div>
                  {errors.kvkkConsent && (
                    <p className="text-sm text-red-500">{errors.kvkkConsent.message}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        Mesaj Gönder
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

