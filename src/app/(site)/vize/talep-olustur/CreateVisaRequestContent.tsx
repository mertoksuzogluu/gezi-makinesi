'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { visaRequestSchema, VisaRequestFormData } from '@/lib/validations';
import { useAuth } from '@/contexts/AuthContext';
import { saveRequest, generateRequestId } from '@/data/requests';
import { visaCountries } from '@/data/visa-countries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { Stamp, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

const processSteps = [
  { step: 1, title: 'Formu Doldurun', description: 'Kişisel bilgilerinizi ve vize detaylarınızı girin' },
  { step: 2, title: 'Evrakları Hazırlayın', description: 'Size özel evrak listesi ile belgelerinizi hazırlayın' },
  { step: 3, title: 'Randevu Alın', description: 'Konsolosluk randevunuzu birlikte planlayalım' },
  { step: 4, title: 'Başvurunuzu Yapın', description: 'Randevu günü başvurunuzu tamamlayın' },
];

function CreateVisaRequestForm() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const prefilledCountry = searchParams.get('country');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<VisaRequestFormData>({
    resolver: zodResolver(visaRequestSchema),
    defaultValues: {
      kvkkConsent: false,
      fullName: user?.fullName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      country: prefilledCountry || '',
    },
  });

  useEffect(() => {
    if (prefilledCountry) {
      setValue('country', prefilledCountry);
    }
  }, [prefilledCountry, setValue]);

  const selectedCountry = watch('country');
  const selectedCountryData = visaCountries.find(c => c.code === selectedCountry);

  const onSubmit = async (data: VisaRequestFormData) => {
    setIsSubmitting(true);
    
    const requestId = generateRequestId();
    const newRequest = {
      id: requestId,
      type: 'visa' as const,
      userId: user?.id || 'guest',
      status: 'Alındı',
      createdAt: new Date().toISOString(),
      visaRequest: {
        country: data.country,
        visaType: data.visaType,
        purpose: data.purpose,
        travelDate: data.travelDate,
        duration: data.duration,
        previousVisa: data.previousVisa,
        notes: data.notes,
      },
      userInfo: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
      },
    };

    saveRequest(newRequest);
    
    toast({
      title: 'Vize Talebi Oluşturuldu',
      description: 'Talebiniz alındı. En kısa sürede size dönüş yapacağız.',
    });
    
    setIsSuccess(true);
    reset();
    setIsSubmitting(false);
    
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-gradient-to-r from-sky-500 to-blue-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Vize Talebi Oluştur</h1>
            <p className="text-lg opacity-90">
              Schengen vizesi, hızlı vize ve uzun süreli vize başvurusu için formu doldurun. 
              Uzman ekibimiz size yardımcı olacak.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-10 bg-blue-50 border-b">
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Vize Başvuru Süreci" 
            subtitle="4 kolay adımda vize başvurunuzu tamamlayın"
            centered
          />
          <Steps steps={processSteps} />
        </div>
      </section>

      {/* Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Vize Başvuru Formu</CardTitle>
              </CardHeader>
              <CardContent>
                {isSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Vize talebiniz başarıyla oluşturuldu!</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Kişisel Bilgiler</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Ad Soyad *</Label>
                        <Input
                          id="fullName"
                          {...register('fullName')}
                          placeholder="Adınız Soyadınız"
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
                          {...register('email')}
                          placeholder="email@example.com"
                        />
                        {errors.email && (
                          <p className="text-sm text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon *</Label>
                      <Input
                        id="phone"
                        {...register('phone')}
                        placeholder="0532 XXX XX XX"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Visa Info */}
                  <div className="space-y-4 border-t pt-6">
                    <h3 className="font-semibold text-lg">Vize Bilgileri</h3>
                    <div className="space-y-2">
                      <Label htmlFor="country">Ülke *</Label>
                      <Select
                        value={selectedCountry}
                        onValueChange={(value) => setValue('country', value)}
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Ülke seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {visaCountries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.flagEmoji} {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.country && (
                        <p className="text-sm text-red-500">{errors.country.message}</p>
                      )}
                      {selectedCountryData && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>{selectedCountryData.name}</strong> için işlem süresi: {selectedCountryData.processingTime}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="visaType">Vize Tipi *</Label>
                      <Select
                        onValueChange={(value) => setValue('visaType', value as any)}
                      >
                        <SelectTrigger id="visaType">
                          <SelectValue placeholder="Vize tipi seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tourist">Turist Vizesi</SelectItem>
                          <SelectItem value="business">İş Vizesi</SelectItem>
                          <SelectItem value="transit">Transit Vizesi</SelectItem>
                          <SelectItem value="family">Aile Ziyareti</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.visaType && (
                        <p className="text-sm text-red-500">{errors.visaType.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="purpose">Seyahat Amacı *</Label>
                      <Textarea
                        id="purpose"
                        {...register('purpose')}
                        rows={3}
                        placeholder="Seyahat amacınızı kısaca açıklayın..."
                      />
                      {errors.purpose && (
                        <p className="text-sm text-red-500">{errors.purpose.message}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="travelDate">Seyahat Tarihi *</Label>
                        <Input
                          id="travelDate"
                          type="date"
                          {...register('travelDate')}
                        />
                        {errors.travelDate && (
                          <p className="text-sm text-red-500">{errors.travelDate.message}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration">Kalış Süresi (Gün) *</Label>
                        <Input
                          id="duration"
                          type="number"
                          min="1"
                          {...register('duration', { valueAsNumber: true })}
                          placeholder="Örn: 7"
                        />
                        {errors.duration && (
                          <p className="text-sm text-red-500">{errors.duration.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="previousVisa">Daha Önce Schengen Vizesi Aldınız mı?</Label>
                      <Select
                        onValueChange={(value) => setValue('previousVisa', value === 'yes')}
                      >
                        <SelectTrigger id="previousVisa">
                          <SelectValue placeholder="Seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Evet</SelectItem>
                          <SelectItem value="no">Hayır</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Ek Notlar</Label>
                      <Textarea
                        id="notes"
                        {...register('notes')}
                        rows={3}
                        placeholder="Eklemek istediğiniz bilgiler..."
                      />
                    </div>
                  </div>

                  {/* KVKK */}
                  <div className="flex items-start gap-2 border-t pt-6">
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

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        Vize Talebi Oluştur
                        <ArrowRight className="ml-2 h-5 w-5" />
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

export function CreateVisaRequestContent() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <CreateVisaRequestForm />
    </Suspense>
  );
}

