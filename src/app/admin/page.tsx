'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminGuard, useAdmin } from '@/contexts/AdminContext';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllTours, getAllVisaCountries } from '@/lib/admin-data';
import { getStoredRequests } from '@/data/requests';
import { Plane, Stamp, FileText, Plus, ArrowRight } from 'lucide-react';

function AdminDashboardContent() {
  const { admin } = useAdmin();
  const [stats, setStats] = useState({
    tours: 0,
    visaCountries: 0,
    requests: 0
  });

  useEffect(() => {
    setStats({
      tours: getAllTours().length,
      visaCountries: getAllVisaCountries().length,
      requests: getStoredRequests().length
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Hoş Geldiniz, {admin?.name}</h1>
          <p className="text-muted-foreground">Yönetim paneli özeti</p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Tur</p>
                  <p className="text-3xl font-bold">{stats.tours}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Plane className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Vize Ülkeleri</p>
                  <p className="text-3xl font-bold">{stats.visaCountries}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Stamp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Toplam Talep</p>
                  <p className="text-3xl font-bold">{stats.requests}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Tur Yönetimi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Turları ekleyin, düzenleyin veya silin. Tüm tur detaylarını yönetin.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/admin/turlar/ekle">
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Tur Ekle
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/admin/turlar">
                    Tüm Turlar
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stamp className="h-5 w-5" />
                Vize Ülkeleri Yönetimi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Vize ülkelerinin belgelerini, ücretlerini ve süreçlerini güncelleyin.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" asChild>
                  <Link href="/admin/vize">
                    Ülkeleri Yönet
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}

