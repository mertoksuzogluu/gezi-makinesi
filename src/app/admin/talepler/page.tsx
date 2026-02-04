'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminGuard } from '@/contexts/AdminContext';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getStoredRequests } from '@/data/requests';
import { Request } from '@/types';
import { 
  Search, 
  Plane, 
  Stamp, 
  Eye,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';

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

function RequestsListContent() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'tour' | 'visa'>('all');

  useEffect(() => {
    setRequests(getStoredRequests());
  }, []);

  const filteredRequests = requests
    .filter(r => filter === 'all' || r.type === filter)
    .filter(r => {
      const payload = r.payload;
      const searchLower = search.toLowerCase();
      return (
        payload.fullName.toLowerCase().includes(searchLower) ||
        payload.email.toLowerCase().includes(searchLower) ||
        payload.phone.includes(search) ||
        r.id.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const tourCount = requests.filter(r => r.type === 'tour').length;
  const visaCount = requests.filter(r => r.type === 'visa').length;

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Talepler</h1>
          <p className="text-muted-foreground">
            Toplam {requests.length} talep ({tourCount} tur, {visaCount} vize)
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="İsim, e-posta veya telefon ara..."
              className="pl-10"
            />
          </div>
          
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <TabsList>
              <TabsTrigger value="all">Tümü ({requests.length})</TabsTrigger>
              <TabsTrigger value="tour">Tur ({tourCount})</TabsTrigger>
              <TabsTrigger value="visa">Vize ({visaCount})</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Requests List */}
        <div className="grid gap-4">
          {filteredRequests.map((request) => {
            const StatusIcon = statusConfig[request.status]?.icon || Clock;
            const statusColor = statusConfig[request.status]?.color || 'bg-gray-500';
            
            return (
              <Card key={request.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      request.type === 'tour' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {request.type === 'tour' ? (
                        <Plane className="h-6 w-6 text-blue-600" />
                      ) : (
                        <Stamp className="h-6 w-6 text-purple-600" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{request.payload.fullName}</h3>
                        <Badge variant="outline" className="text-xs">
                          {request.id}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <span>{request.payload.email}</span>
                        <span>{request.payload.phone}</span>
                        <span>
                          {new Date(request.createdAt).toLocaleDateString('tr-TR', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        {request.type === 'visa' && 'country' in request.payload && (
                          <span className="font-medium">
                            Ülke: {(request.payload as { country: string }).country}
                          </span>
                        )}
                        {request.type === 'tour' && 'destination' in request.payload && (
                          <span className="font-medium">
                            Destinasyon: {(request.payload as { destination: string }).destination}
                          </span>
                        )}
                      </div>
                    </div>

                    <Badge className={`${statusColor} flex items-center gap-1`}>
                      <StatusIcon className="h-3 w-3" />
                      {request.status}
                    </Badge>

                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/talepler/${request.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Detay
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {filteredRequests.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  {search ? 'Aramanızla eşleşen talep bulunamadı.' : 'Henüz talep bulunmuyor.'}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminRequestsPage() {
  return (
    <AdminGuard>
      <RequestsListContent />
    </AdminGuard>
  );
}

