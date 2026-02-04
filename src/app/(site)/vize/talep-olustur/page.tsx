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
  { step: 1, title: 'Formu Doldurun', description: 'Başvuru bilgilerinizi girin' },
  { step: 2, title: 'Değerlendirme', description: 'Uzmanlarımız inceleyecek' },
  { step: 3, title: 'Evrak Hazırlığı', description: 'Size özel evrak listesi' },
  { step: 4, title: 'Başvuru', description: 'Randevu ve başvuru desteği' },
];

function VisaRequestFormContent() {
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const preselectedCountry = searchParams.get('ulke') || '';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VisaRequestFormData>({
    resolver: zodResolver(visaRequestSchema),
    defaultValues: {
      country: preselectedCountry,
      previousVisa: false,
      kvkkConsent: false,
    },
  });

  useEffect(() => {
    if (preselectedCountry) {
      setValue('country', preselectedCountry);
    }
  }, [preselectedCountry, setValue]);

  const onSubmit = async (data: VisaRequestFormData) => {
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const request = {
        id: generateRequestId(),
        type: 'visa' as const,
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
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Talebiniz Alındı!</h2>
            <p className="text-muted-foreground mb-6">
              Vize talebiniz başarıyla oluşturuldu. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.
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
                <Link href="/vize/ulkeler">Ülkelere Dön</Link>
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <Stamp className="h-8 w-8" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Vize Talebi Oluştur</h1>
            <p className="text-lg opacity-90">
              Gitmek istediğiniz ülkeyi belirtin, size özel evrak listesi ve süreç hakkında bilgi verelim.
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
          <div className="max-w-2xl mx-auto">
            <SectionTitle 
              title="Vize Talep Formu" 
              subtitle="Lütfen başvuru bilgilerinizi eksiksiz doldurun."
            />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

              {/* Vize Bilgileri */}
              <Card>
                <CardHeader>
                  <CardTitle>Vize Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Başvurulacak Ülke *</Label>
                    <Select 
                      value={watch('country')} 
                      onValueChange={(value) => setValue('country', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Ülke seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        {visaCountries.map((country) => (
                          <SelectItem key={country.slug} value={country.slug}>
                            {country.flagEmoji} {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-sm text-red-500">{errors.country.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Seyahat Amacı *</Label>
                    <Select onValueChange={(value) => setValue('travelPurpose', value as VisaRequestFormData['travelPurpose'])}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="turistik">Turistik</SelectItem>
                        <SelectItem value="ticari">Ticari / İş</SelectItem>
                        <SelectItem value="aile">Aile Ziyareti</SelectItem>
                        <SelectItem value="diger">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.travelPurpose && (
                      <p className="text-sm text-red-500">{errors.travelPurpose.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="travelDate">Planlanan Seyahat Tarihi *</Label>
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
                      <Label htmlFor="passportExpiry">Pasaport Geçerlilik Tarihi *</Label>
                      <Input
                        id="passportExpiry"
                        type="date"
                        {...register('passportExpiry')}
                      />
                      {errors.passportExpiry && (
                        <p className="text-sm text-red-500">{errors.passportExpiry.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="previousVisa"
                      checked={watch('previousVisa')}
                      onCheckedChange={(checked) => setValue('previousVisa', checked as boolean)}
                    />
                    <Label htmlFor="previousVisa" className="text-sm font-normal cursor-pointer">
                      Daha önce bu ülkeye veya Schengen bölgesine vize aldım
                    </Label>
                  </div>
                </CardContent>
              </Card>

              {/* Ek Bilgiler */}
              <Card>
                <CardHeader>
                  <CardTitle>Ek Bilgiler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Ek Notlar</Label>
                    <Textarea
                      id="notes"
                      placeholder="Eklemek istediğiniz bilgiler, özel durumlar..."
                      rows={3}
                      {...register('notes')}
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="kvkkConsent"
                      checked={watch('kvkkConsent')}
                      onCheckedChange={(checked) => setValue('kvkkConsent', checked as boolean)}
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
                    Vize Talebi Oluştur
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

export default function VisaRequestPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <VisaRequestFormContent />
    </Suspense>
  );
}


