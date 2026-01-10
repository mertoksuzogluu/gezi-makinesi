'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getRequestsByUserId } from '@/data/requests';
import { Request } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Plane, 
  Stamp, 
  ArrowRight, 
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Loader2
} from 'lucide-react';

const statusConfig: Record<string, { color: string; icon: typeof Clock }> = {
  'Alındı': { color: 'bg-blue-500', icon: Clock },
  'İncelemede': { color: 'bg-yellow-500', icon: FileText },
  'Eksik Evrak': { color: 'bg-orange-500', icon: AlertCircle },
  'Tamamlandı': { color: 'bg-green-500', icon: CheckCircle2 },
};

function RequestCard({ request }: { request: Request }) {
  const StatusIcon = statusConfig[request.status]?.icon || Clock;
  
  return (
    <Link href={`/panel/talepler/${request.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                request.type === 'tour' ? 'bg-blue-100' : 'bg-purple-100'
              }`}>
                {request.type === 'tour' ? (
                  <Plane className="h-5 w-5 text-blue-600" />
                ) : (
                  <Stamp className="h-5 w-5 text-purple-600" />
                )}
              </div>
              <div>
                <p className="font-semibold">
                  {request.type === 'tour' ? 'Tur Talebi' : 'Vize Talebi'}
                </p>
                <p className="text-xs text-muted-foreground">#{request.id.slice(-8)}</p>
              </div>
            </div>
            <Badge className={statusConfig[request.status]?.color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {request.status}
            </Badge>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-1">
            {request.type === 'tour' && 'destination' in request.payload && (
              <p>Destinasyon: {request.payload.destination}</p>
            )}
            {request.type === 'visa' && 'country' in request.payload && (
              <p>Ülke: {request.payload.country}</p>
            )}
            <p>Oluşturulma: {new Date(request.createdAt).toLocaleDateString('tr-TR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}</p>
          </div>
          
          <div className="flex items-center justify-end mt-3 text-primary text-sm font-medium">
            Detaylar
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function RequestsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/giris');
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      const userRequests = getRequestsByUserId(user.id);
      setRequests(userRequests);
      setIsLoadingData(false);
    }
  }, [user]);

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const tourRequests = requests.filter(r => r.type === 'tour');
  const visaRequests = requests.filter(r => r.type === 'visa');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Taleplerim</h1>
        <p className="text-muted-foreground">Tüm tur ve vize taleplerinizi görüntüleyin.</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            Tümü ({requests.length})
          </TabsTrigger>
          <TabsTrigger value="tour">
            <Plane className="h-4 w-4 mr-2" />
            Tur ({tourRequests.length})
          </TabsTrigger>
          <TabsTrigger value="visa">
            <Stamp className="h-4 w-4 mr-2" />
            Vize ({visaRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {requests.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {requests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tour">
          {tourRequests.length === 0 ? (
            <EmptyState type="tour" />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tourRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="visa">
          {visaRequests.length === 0 ? (
            <EmptyState type="visa" />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visaRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function EmptyState({ type }: { type?: 'tour' | 'visa' }) {
  return (
    <Card>
      <CardContent className="py-12 text-center">
        <p className="text-muted-foreground mb-4">
          {type === 'tour' && 'Henüz tur talebiniz bulunmuyor.'}
          {type === 'visa' && 'Henüz vize talebiniz bulunmuyor.'}
          {!type && 'Henüz talebiniz bulunmuyor.'}
        </p>
        <div className="flex gap-3 justify-center">
          {(!type || type === 'tour') && (
            <Button asChild>
              <Link href="/turlar/kendi-turunu-olustur">
                <Plane className="mr-2 h-4 w-4" />
                Tur Talebi Oluştur
              </Link>
            </Button>
          )}
          {(!type || type === 'visa') && (
            <Button variant="outline" asChild>
              <Link href="/vize/talep-olustur">
                <Stamp className="mr-2 h-4 w-4" />
                Vize Talebi Oluştur
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}


