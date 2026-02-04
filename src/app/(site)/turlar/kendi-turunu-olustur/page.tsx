'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tourRequestSchema, TourRequestFormData } from '@/lib/validations';
import { useAuth } from '@/contexts/AuthContext';
import { saveRequest, generateRequestId } from '@/data/requests';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { SectionTitle } from '@/components/SectionTitle';
import { Steps } from '@/components/Steps';
import { Plane, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

const processSteps = [
  { step: 1, title: 'Formu Doldurun', description: 'İsteklerinizi detaylı belirtin' },
  { step: 2, title: 'Teklif Alın', description: 'Size özel tur programı hazırlanır' },
  { step: 3, title: 'Onaylayın', description: 'Uygun teklifi seçin ve onaylayın' },
  { step: 4, title: 'Yola Çıkın', description: 'Hazırlıklar tamamlanınca başlayın!' },
];

export default function CreateTourPage() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TourRequestFormData>({
    resolver: zodResolver(tourRequestSchema),
    defaultValues: {
      kvkkConsent: false,
    },
  });

  const onSubmit = async (data: TourRequestFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const request = {
        id: generateRequestId(),
        type: 'tour' as const,
        userId: user?.id || 'guest',
        status: 'Alındı' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        payload: data,
        statusHistory: [
          { status: 'Alındı' as const, date: new Date().toISOString() }
        ]
      };

      saveRequest(request);

      setIsSuccess(true);
      toast({
        title: 'Talebiniz Alındı!',
        description: 'En kısa sürede sizinle iletişime geçeceğiz.',
      });

    } catch {
      toast({
        title: 'Hata',
        description: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Talebiniz Alındı!</h2>
            <p className="text-muted-foreground mb-6">
              Tur talebiniz başarıyla oluşturuldu. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
            </p>
            <div className="space-y-3">
              {isAuthenticated ? (
                <Button asChild className="w-full">
                  <Link href="/panel/talepler">
                    Taleplerime Git
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <Button asChild className="w-full">
                  <Link href="/giris">
                    Giriş Yap ve Takip Et
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild className="w-full">
                <Link href="/turlar">Turlara Dön</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Plane className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Kendi Turunu Oluştur</h1>
            <p className="text-lg opacity-90">
              Grup arkadaşlarınızla, istediğiniz tarih ve destinasyona özel tur programı hazırlayalım.
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-10 bg-blue-50 border-b">
        <div className="container mx-auto px-4">
          <Steps steps={processSteps} />
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <SectionTitle 
              title="Tur Talep Formu" 
              subtitle="Lütfen tüm alanları eksiksiz doldurun. Detaylı bilgi, size daha uygun teklif hazırlamamızı sağlar."
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Kişisel Bilgiler */}
              <Card>
                <CardHeader>
                  <CardTitle>Kişisel Bilgiler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        placeholder="05XXXXXXXXX"
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
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
                </CardContent>
              </Card>

              {/* Tur Detayları */}
              <Card>
                <CardHeader>
                  <CardTitle>Tur Detayları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="groupSize">Grup Kişi Sayısı *</Label>
                      <Input
                        id="groupSize"
                        type="number"
                        min="1"
                        placeholder="8"
                        {...register('groupSize', { valueAsNumber: true })}
                      />
                      {errors.groupSize && (
                        <p className="text-sm text-red-500">{errors.groupSize.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="departureCity">Kalkış Şehri *</Label>
                      <Input
                        id="departureCity"
                        placeholder="İstanbul"
                        {...register('departureCity')}
                      />
                      {errors.departureCity && (
                        <p className="text-sm text-red-500">{errors.departureCity.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destinasyon (Ülke/Şehir) *</Label>
                    <Input
                      id="destination"
                      placeholder="İtalya - Roma, Floransa, Venedik"
                      {...register('destination')}
                    />
                    {errors.destination && (
                      <p className="text-sm text-red-500">{errors.destination.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Başlangıç Tarihi *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        {...register('startDate')}
                      />
                      {errors.startDate && (
                        <p className="text-sm text-red-500">{errors.startDate.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Bitiş Tarihi *</Label>
                      <Input
                        id="endDate"
                        type="date"
                        {...register('endDate')}
                      />
                      {errors.endDate && (
                        <p className="text-sm text-red-500">{errors.endDate.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Ulaşım Şekli *</Label>
                    <Controller
                      name="transportType"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seçiniz" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ucak">Uçak</SelectItem>
                            <SelectItem value="otobus">Otobüs</SelectItem>
                            <SelectItem value="ozel-arac">Özel Araç</SelectItem>
                            <SelectItem value="kararsiz">Kararsızım</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.transportType && (
                      <p className="text-sm text-red-500">{errors.transportType.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Konaklama */}
              <Card>
                <CardHeader>
                  <CardTitle>Konaklama Tercihleri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="roomCount">Oda Sayısı *</Label>
                      <Input
                        id="roomCount"
                        type="number"
                        min="1"
                        placeholder="4"
                        {...register('roomCount', { valueAsNumber: true })}
                      />
                      {errors.roomCount && (
                        <p className="text-sm text-red-500">{errors.roomCount.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Oda Tipi *</Label>
                      <Controller
                        name="roomType"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seçiniz" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="tek">Tek Kişilik</SelectItem>
                              <SelectItem value="cift">Çift Kişilik</SelectItem>
                              <SelectItem value="uclu">Üç Kişilik</SelectItem>
                              <SelectItem value="karisik">Karışık</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.roomType && (
                        <p className="text-sm text-red-500">{errors.roomType.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Otel Standardı *</Label>
                    <Controller
                      name="hotelStandard"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Seçiniz" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3-yildiz">3 Yıldız</SelectItem>
                            <SelectItem value="4-yildiz">4 Yıldız</SelectItem>
                            <SelectItem value="5-yildiz">5 Yıldız</SelectItem>
                            <SelectItem value="butik">Butik Otel</SelectItem>
                            <SelectItem value="farketmez">Farketmez</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.hotelStandard && (
                      <p className="text-sm text-red-500">{errors.hotelStandard.message}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Bütçe */}
              <Card>
                <CardHeader>
                  <CardTitle>Bütçe Bilgisi</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bütçe Tipi *</Label>
                      <Controller
                        name="budgetType"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Seçiniz" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kisi-basi">Kişi Başı</SelectItem>
                              <SelectItem value="toplam">Toplam</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.budgetType && (
                        <p className="text-sm text-red-500">{errors.budgetType.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budgetAmount">Tahmini Bütçe (EUR) *</Label>
                      <Input
                        id="budgetAmount"
                        type="number"
                        min="100"
                        placeholder="1500"
                        {...register('budgetAmount', { valueAsNumber: true })}
                      />
                      {errors.budgetAmount && (
                        <p className="text-sm text-red-500">{errors.budgetAmount.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ek Notlar */}
              <Card>
                <CardHeader>
                  <CardTitle>Ek Bilgiler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Ek Notlar</Label>
                    <Textarea
                      id="notes"
                      placeholder="Özel istekleriniz, tercihleriniz veya eklemek istediğiniz bilgiler..."
                      rows={4}
                      {...register('notes')}
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <Controller
                      name="kvkkConsent"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="kvkkConsent"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <div className="space-y-1 leading-none">
                      <Label htmlFor="kvkkConsent" className="text-sm font-normal cursor-pointer">
                        <Link href="/gizlilik" className="text-primary hover:underline">KVKK Aydınlatma Metni</Link>&apos;ni 
                        okudum ve kişisel verilerimin işlenmesine onay veriyorum. *
                      </Label>
                      {errors.kvkkConsent && (
                        <p className="text-sm text-red-500">{errors.kvkkConsent.message}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gönderiliyor...
                  </>
                ) : (
                  <>
                    Talep Oluştur
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}


