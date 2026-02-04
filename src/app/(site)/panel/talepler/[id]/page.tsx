'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getRequestById } from '@/data/requests';
import { Request, TourRequestPayload, VisaRequestPayload } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { StatusTimeline } from '@/components/Steps';
import { 
  Plane, 
  Stamp, 
  ArrowLeft, 
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2,
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Users,
  Building,
  CreditCard
} from 'lucide-react';

const statusConfig: Record<string, { color: string; icon: typeof Clock }> = {
  'Alındı': { color: 'bg-blue-500', icon: Clock },
  'İncelemede': { color: 'bg-yellow-500', icon: FileText },
  'Eksik Evrak': { color: 'bg-orange-500', icon: AlertCircle },
  'Tamamlandı': { color: 'bg-green-500', icon: CheckCircle2 },
};

export default function RequestDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [request, setRequest] = useState<Request | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/giris');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user && params.id) {
      const foundRequest = getRequestById(params.id as string);
      if (foundRequest && foundRequest.userId === user.id) {
        setRequest(foundRequest);
      }
      setIsLoadingData(false);
    }
  }, [user, params.id]);

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated || !request) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-muted-foreground mb-4">Talep bulunamadı.</p>
        <Button asChild>
          <Link href="/panel/talepler">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Taleplerime Dön
          </Link>
        </Button>
      </div>
    );
  }

  const StatusIcon = statusConfig[request.status]?.icon || Clock;
  const isTour = request.type === 'tour';
  const payload = request.payload as TourRequestPayload | VisaRequestPayload;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link href="/panel/talepler">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Taleplerime Dön
          </Link>
        </Button>
        
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              isTour ? 'bg-blue-100' : 'bg-purple-100'
            }`}>
              {isTour ? (
                <Plane className="h-7 w-7 text-blue-600" />
              ) : (
                <Stamp className="h-7 w-7 text-purple-600" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {isTour ? 'Tur Talebi' : 'Vize Talebi'}
              </h1>
              <p className="text-muted-foreground">Talep No: #{request.id.slice(-8)}</p>
            </div>
          </div>
          <Badge className={`${statusConfig[request.status]?.color} text-sm py-1 px-3`}>
            <StatusIcon className="h-4 w-4 mr-1" />
            {request.status}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                İletişim Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Ad Soyad</p>
                  <p className="font-medium">{payload.fullName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Telefon</p>
                  <p className="font-medium">{payload.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 md:col-span-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">E-posta</p>
                  <p className="font-medium">{payload.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Request Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {isTour ? <MapPin className="h-5 w-5" /> : <Stamp className="h-5 w-5" />}
                Talep Detayları
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isTour ? (
                <TourDetails payload={payload as TourRequestPayload} />
              ) : (
                <VisaDetails payload={payload as VisaRequestPayload} />
              )}
            </CardContent>
          </Card>

          {/* Notes */}
          {payload.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Ek Notlar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{payload.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar - Status Timeline */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Talep Durumu</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusTimeline 
                items={request.statusHistory.map((item, index) => ({
                  ...item,
                  isActive: index === request.statusHistory.length - 1
                }))}
              />
              
              <Separator className="my-6" />
              
              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex justify-between">
                  <span>Oluşturulma:</span>
                  <span>{new Date(request.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Son Güncelleme:</span>
                  <span>{new Date(request.updatedAt).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">Sorularınız mı var?</p>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/iletisim">Bize Ulaşın</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function TourDetails({ payload }: { payload: TourRequestPayload }) {
  const transportLabels: Record<string, string> = {
    'ucak': 'Uçak',
    'otobus': 'Otobüs',
    'ozel-arac': 'Özel Araç',
    'kararsiz': 'Kararsız'
  };

  const roomLabels: Record<string, string> = {
    'tek': 'Tek Kişilik',
    'cift': 'Çift Kişilik',
    'uclu': 'Üç Kişilik',
    'karisik': 'Karışık'
  };

  const hotelLabels: Record<string, string> = {
    '3-yildiz': '3 Yıldız',
    '4-yildiz': '4 Yıldız',
    '5-yildiz': '5 Yıldız',
    'butik': 'Butik Otel',
    'farketmez': 'Farketmez'
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <InfoItem icon={MapPin} label="Destinasyon" value={payload.destination} />
      <InfoItem icon={MapPin} label="Kalkış Şehri" value={payload.departureCity} />
      <InfoItem icon={Calendar} label="Başlangıç" value={new Date(payload.startDate).toLocaleDateString('tr-TR')} />
      <InfoItem icon={Calendar} label="Bitiş" value={new Date(payload.endDate).toLocaleDateString('tr-TR')} />
      <InfoItem icon={Users} label="Grup Sayısı" value={`${payload.groupSize} kişi`} />
      <InfoItem icon={Plane} label="Ulaşım" value={transportLabels[payload.transportType]} />
      <InfoItem icon={Building} label="Oda Sayısı" value={`${payload.roomCount} oda`} />
      <InfoItem icon={Building} label="Oda Tipi" value={roomLabels[payload.roomType]} />
      <InfoItem icon={Building} label="Otel Standardı" value={hotelLabels[payload.hotelStandard]} />
      <InfoItem 
        icon={CreditCard} 
        label="Bütçe" 
        value={`€${payload.budgetAmount} (${payload.budgetType === 'kisi-basi' ? 'Kişi başı' : 'Toplam'})`} 
      />
    </div>
  );
}

function VisaDetails({ payload }: { payload: VisaRequestPayload }) {
  const purposeLabels: Record<string, string> = {
    'turistik': 'Turistik',
    'ticari': 'Ticari / İş',
    'aile': 'Aile Ziyareti',
    'diger': 'Diğer'
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <InfoItem icon={MapPin} label="Ülke" value={payload.country} />
      <InfoItem icon={FileText} label="Seyahat Amacı" value={purposeLabels[payload.travelPurpose]} />
      <InfoItem icon={Calendar} label="Planlanan Tarih" value={new Date(payload.travelDate).toLocaleDateString('tr-TR')} />
      <InfoItem icon={Calendar} label="Pasaport Geçerlilik" value={new Date(payload.passportExpiry).toLocaleDateString('tr-TR')} />
      <InfoItem 
        icon={CheckCircle2} 
        label="Önceki Vize" 
        value={payload.previousVisa ? 'Evet' : 'Hayır'} 
      />
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-muted-foreground mt-0.5" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

