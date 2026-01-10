'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AdminGuard } from '@/contexts/AdminContext';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getAllTours, deleteTour } from '@/lib/admin-data';
import { Tour } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  MapPin, 
  Calendar,
  Eye
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function TourListContent() {
  const [tours, setTours] = useState<Tour[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setTours(getAllTours());
  }, []);

  const handleDelete = (id: string) => {
    deleteTour(id);
    setTours(getAllTours());
    toast({
      title: 'Tur Silindi',
      description: 'Tur başarıyla silindi.',
    });
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Turlar</h1>
            <p className="text-muted-foreground">{tours.length} tur bulundu</p>
          </div>
          <Button asChild>
            <Link href="/admin/turlar/ekle">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Tur Ekle
            </Link>
          </Button>
        </div>

        <div className="grid gap-4">
          {tours.map((tour) => (
            <Card key={tour.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={tour.heroImage}
                      alt={tour.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{tour.title}</h3>
                      {tour.isPopular && (
                        <Badge className="bg-amber-500">Popüler</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {tour.location}, {tour.country}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {tour.durationDays} Gün
                      </span>
                      <span className="font-medium text-primary">€{tour.priceFrom}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/turlar/${tour.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/turlar/${tour.id}/duzenle`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Turu Sil</AlertDialogTitle>
                          <AlertDialogDescription>
                            &quot;{tour.title}&quot; turunu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>İptal</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(tour.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Sil
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {tours.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-4">Henüz tur eklenmemiş.</p>
                <Button asChild>
                  <Link href="/admin/turlar/ekle">
                    <Plus className="h-4 w-4 mr-2" />
                    İlk Turu Ekle
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TourListPage() {
  return (
    <AdminGuard>
      <TourListContent />
    </AdminGuard>
  );
}

