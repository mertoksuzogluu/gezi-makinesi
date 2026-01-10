'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AdminGuard } from '@/contexts/AdminContext';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getRequestById, saveRequest } from '@/data/requests';
import { Request, RequestStatus } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  Plane, 
  Stamp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin
} from 'lucide-react';

// Tur talepleri için durumlar
const tourStatuses: RequestStatus[] = [
  'Alındı',
  'İncelemede',
  'Teklif Hazırlandı',
  'Onay Bekleniyor',
  'Tamamlandı',
  'İptal Edildi'
];

// Vize talepleri için durumlar
const visaStatuses: RequestStatus[] = [
  'Alındı',
  'İncelemede',
  'Belgeler Bekleniyor',
  'Randevu Tarihi Belirlendi',
  'Konsolosluk Sürecinde',
  'Pasaport Teslim Alındı',
  'Tamamlandı',
  'İptal Edildi'
];

const statusConfig: Record<string, { color: string; icon: typeof Clock }> = {
  'Alındı': { color: 'bg-blue-500', icon: Clock },
  'İncelemede': { color: 'bg-yellow-500', icon: FileText },
  'Belgeler Bekleniyor': { color: 'bg-orange-500', icon: AlertCircle },
  'Randevu Tarihi Belirlendi': { color: 'bg-purple-500', icon: Clock },
  'Konsolosluk Sürecinde': { color: 'bg-indigo-500', icon: FileText },
  'Teklif Hazırlandı': { color: 'bg-cyan-500', icon: FileText },
  'Onay Bekleniyor': { color: 'bg-amber-500', icon: Clock },
  'Pasaport Teslim Alındı': { color: 'bg-green-500', icon: CheckCircle2 },
  'Tamamlandı': { color: 'bg-green-600', icon: CheckCircle2 },
  'İptal Edildi': { color: 'bg-red-500', icon: AlertCircle },
};

function RequestDetailContent() {
  const params = useParams();
  const requestId = params.id as string;
  const { toast } = useToast();
  const [request, setRequest] = useState<Request | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState<RequestStatus | ''>('');
  const [statusNote, setStatusNote] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  useEffect(() => {
    if (requestId) {
      const data = getRequestById(requestId);
      if (data) {
        setRequest(data);
        setNewStatus(data.status);
      }
      setIsLoading(false);
    }
  }, [requestId]);

  const handleStatusUpdate = async () => {
    if (!request || !newStatus) return;
    
    setIsUpdating(true);

    try {
      let finalNote = statusNote;
      if (newStatus === 'Randevu Tarihi Belirlendi' && appointmentDate) {
        finalNote = `Randevu: ${appointmentDate}${statusNote ? ` - ${statusNote}` : ''}`;
      }

      const updatedRequest: Request = {
        ...request,
        status: newStatus,
        updatedAt: new Date().toISOString(),
        statusHistory: [
          ...request.statusHistory,
          {
            status: newStatus,
            date: new Date().toISOString(),
            note: finalNote || undefined
          }
        ]
      };

      saveRequest(updatedRequest);
      setRequest(updatedRequest);
      setStatusNote('');
      setAppointmentDate('');

      toast({
        title: 'Durum Güncellendi',
        description: `Talep durumu "${newStatus}" olarak güncellendi.`,
      });
    } catch {
      toast({
        title: 'Hata',
        description: 'Durum güncellenirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <AdminSidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <p>Talep bulunamadı.</p>
          <Button variant="outline" asChild className="mt-4">
            <Link href="/admin/talepler">Geri Dön</Link>
          </Button>
        </div>
      </div>
    );
  }

  const statuses = request.type === 'tour' ? tourStatuses : visaStatuses;
  const StatusIcon = statusConfig[request.status]?.icon || Clock;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/talepler">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Link>
          </Button>
          
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
              request.type === 'tour' ? 'bg-blue-100' : 'bg-purple-100'
            }`}>
              {request.type === 'tour' ? (
                <Plane className="h-7 w-7 text-blue-600" />
              ) : (
                <Stamp className="h-7 w-7 text-purple-600" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">
                  {request.type === 'tour' ? 'Tur Talebi' : 'Vize Talebi'}
                </h1>
                <Badge variant="outline">{request.id}</Badge>
              </div>
              <p className="text-muted-foreground">{request.payload.fullName}</p>
            </div>
            <Badge className={`${statusConfig[request.status]?.color} ml-auto flex items-center gap-1`}>
              <StatusIcon className="h-3 w-3" />
              {request.status}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl">
          {/* Sol: Talep Detayları */}
          <div className="lg:col-span-2 space-y-6">
            {/* İletişim Bilgileri */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  İletişim Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Ad Soyad</p>
                    <p className="font-medium">{request.payload.fullName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">E-posta</p>
                    <p className="font-medium">{request.payload.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefon</p>
                    <p className="font-medium">{request.payload.phone}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Talep Detayları */}
            <Card>
              <CardHeader>
                <CardTitle>Talep Detayları</CardTitle>
              </CardHeader>
              <CardContent>
                {request.type === 'tour' ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Destinasyon</p>
                      <p className="font-medium flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {(request.payload as { destination: string }).destination}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Kalkış Şehri</p>
                      <p className="font-medium">{(request.payload as { departureCity: string }).departureCity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Tarih Aralığı</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {(request.payload as { startDate: string }).startDate} - {(request.payload as { endDate: string }).endDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Grup Kişi Sayısı</p>
                      <p className="font-medium">{(request.payload as { groupSize: number }).groupSize} kişi</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ulaşım</p>
                      <p className="font-medium">{(request.payload as { transportType: string }).transportType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Otel Standardı</p>
                      <p className="font-medium">{(request.payload as { hotelStandard: string }).hotelStandard}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Oda</p>
                      <p className="font-medium">
                        {(request.payload as { roomCount: number }).roomCount} oda, {(request.payload as { roomType: string }).roomType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bütçe</p>
                      <p className="font-medium">
                        €{(request.payload as { budgetAmount: number }).budgetAmount} ({(request.payload as { budgetType: string }).budgetType})
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Ülke</p>
                      <p className="font-medium">{(request.payload as { country: string }).country}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Seyahat Amacı</p>
                      <p className="font-medium">{(request.payload as { travelPurpose: string }).travelPurpose}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Planlanan Tarih</p>
                      <p className="font-medium flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {(request.payload as { travelDate: string }).travelDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pasaport Geçerliliği</p>
                      <p className="font-medium">{(request.payload as { passportExpiry: string }).passportExpiry}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Daha Önce Vize Aldı mı?</p>
                      <p className="font-medium">{(request.payload as { previousVisa: boolean }).previousVisa ? 'Evet' : 'Hayır'}</p>
                    </div>
                  </div>
                )}

                {request.payload.notes && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-muted-foreground">Notlar</p>
                    <p className="mt-1">{request.payload.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Durum Geçmişi */}
            <Card>
              <CardHeader>
                <CardTitle>Durum Geçmişi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {request.statusHistory.map((history, index) => {
                    const HistoryIcon = statusConfig[history.status]?.icon || Clock;
                    return (
                      <div key={index} className="flex gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${statusConfig[history.status]?.color || 'bg-gray-500'}`}>
                          <HistoryIcon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{history.status}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(history.date).toLocaleString('tr-TR')}
                          </p>
                          {history.note && (
                            <p className="text-sm mt-1 text-muted-foreground italic">{history.note}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sağ: Durum Güncelleme */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Durum Güncelle</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Yeni Durum</Label>
                  <Select value={newStatus} onValueChange={(v) => setNewStatus(v as RequestStatus)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {newStatus === 'Randevu Tarihi Belirlendi' && (
                  <div className="space-y-2">
                    <Label>Randevu Tarihi</Label>
                    <Input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Not (Opsiyonel)</Label>
                  <Textarea
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="Durum değişikliği hakkında not..."
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleStatusUpdate} 
                  disabled={isUpdating || !newStatus || newStatus === request.status}
                  className="w-full"
                >
                  {isUpdating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Güncelleniyor...
                    </>
                  ) : (
                    'Durumu Güncelle'
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Tarih Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Oluşturulma:</span>
                  <span>{new Date(request.createdAt).toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Son Güncelleme:</span>
                  <span>{new Date(request.updatedAt).toLocaleString('tr-TR')}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminRequestDetailPage() {
  return (
    <AdminGuard>
      <RequestDetailContent />
    </AdminGuard>
  );
}

