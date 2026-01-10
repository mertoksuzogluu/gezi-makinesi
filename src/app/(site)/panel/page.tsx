'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getRequestsByUserId } from '@/data/requests';
import { Request } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

export default function PanelPage() {
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
  const activeRequests = requests.filter(r => r.status !== 'Tamamlandı');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Hoş Geldiniz, {user?.fullName}</h1>
        <p className="text-muted-foreground">Taleplerinizi buradan takip edebilirsiniz.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{requests.length}</p>
                <p className="text-sm text-muted-foreground">Toplam Talep</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Plane className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{tourRequests.length}</p>
                <p className="text-sm text-muted-foreground">Tur Talebi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <Stamp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{visaRequests.length}</p>
                <p className="text-sm text-muted-foreground">Vize Talebi</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeRequests.length}</p>
                <p className="text-sm text-muted-foreground">Aktif Talep</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Requests */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Aktif Taleplerim</CardTitle>
          <Button variant="outline" size="sm" asChild>
            <Link href="/panel/talepler">
              Tümünü Gör
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {activeRequests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Aktif talebiniz bulunmuyor.</p>
              <div className="flex gap-3 justify-center">
                <Button asChild>
                  <Link href="/turlar/kendi-turunu-olustur">
                    <Plane className="mr-2 h-4 w-4" />
                    Tur Talebi
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/vize/talep-olustur">
                    <Stamp className="mr-2 h-4 w-4" />
                    Vize Talebi
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {activeRequests.slice(0, 3).map((request) => {
                const StatusIcon = statusConfig[request.status]?.icon || Clock;
                return (
                  <Link 
                    key={request.id} 
                    href={`/panel/talepler/${request.id}`}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
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
                        <p className="font-medium">
                          {request.type === 'tour' ? 'Tur Talebi' : 'Vize Talebi'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.createdAt).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <Badge className={statusConfig[request.status]?.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {request.status}
                    </Badge>
                  </Link>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Plane className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Yeni Tur Talebi</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Özel tur organizasyonu için talep oluşturun.
                </p>
                <Button size="sm" asChild>
                  <Link href="/turlar/kendi-turunu-olustur">
                    Talep Oluştur
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Stamp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Yeni Vize Talebi</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Vize danışmanlığı için talep oluşturun.
                </p>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/vize/talep-olustur">
                    Talep Oluştur
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


