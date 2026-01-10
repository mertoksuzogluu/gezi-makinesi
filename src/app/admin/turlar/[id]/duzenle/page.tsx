'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { AdminGuard } from '@/contexts/AdminContext';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { getTourById, saveTour, generateSlug } from '@/lib/admin-data';
import { Tour } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react';

function EditTourContent() {
  const router = useRouter();
  const params = useParams();
  const tourId = params.id as string;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    durationDays: 4,
    startDate: '',
    endDate: '',
    location: '',
    country: '',
    priceFrom: 1000,
    heroImage: '',
    isPopular: false,
    highlights: [''],
    included: [''],
    notIncluded: [''],
    itinerary: [{ day: 1, title: '', description: '' }],
  });

  useEffect(() => {
    if (tourId) {
      const tour = getTourById(tourId);
      if (tour) {
        setFormData({
          id: tour.id,
          title: tour.title,
          description: tour.description,
          durationDays: tour.durationDays,
          startDate: tour.startDate || '',
          endDate: tour.endDate || '',
          location: tour.location,
          country: tour.country,
          priceFrom: tour.priceFrom,
          heroImage: tour.heroImage,
          isPopular: tour.isPopular,
          highlights: tour.highlights.length > 0 ? tour.highlights : [''],
          included: tour.included.length > 0 ? tour.included : [''],
          notIncluded: tour.notIncluded.length > 0 ? tour.notIncluded : [''],
          itinerary: tour.itinerary.length > 0 ? tour.itinerary : [{ day: 1, title: '', description: '' }],
        });
      }
      setIsLoading(false);
    }
  }, [tourId]);

  const handleArrayAdd = (field: 'highlights' | 'included' | 'notIncluded') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const handleArrayRemove = (field: 'highlights' | 'included' | 'notIncluded', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleArrayChange = (field: 'highlights' | 'included' | 'notIncluded', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const handleItineraryAdd = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { day: prev.itinerary.length + 1, title: '', description: '' }]
    }));
  };

  const handleItineraryRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index).map((item, i) => ({ ...item, day: i + 1 }))
    }));
  };

  const handleItineraryChange = (index: number, field: 'title' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => i === index ? { ...item, [field]: value } : item)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tour: Tour = {
        id: formData.id,
        slug: generateSlug(formData.title),
        title: formData.title,
        description: formData.description,
        durationDays: formData.durationDays,
        startDate: formData.startDate || undefined,
        endDate: formData.endDate || undefined,
        location: formData.location,
        country: formData.country,
        priceFrom: formData.priceFrom,
        heroImage: formData.heroImage,
        isPopular: formData.isPopular,
        highlights: formData.highlights.filter(h => h.trim()),
        included: formData.included.filter(i => i.trim()),
        notIncluded: formData.notIncluded.filter(n => n.trim()),
        itinerary: formData.itinerary.filter(i => i.title.trim()),
        gallery: [formData.heroImage],
      };

      saveTour(tour);

      toast({
        title: 'Tur Güncellendi',
        description: 'Tur başarıyla güncellendi.',
      });

      router.push('/admin/turlar');
    } catch {
      toast({
        title: 'Hata',
        description: 'Tur güncellenirken bir hata oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
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

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/admin/turlar">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Tur Düzenle</h1>
          <p className="text-muted-foreground">{formData.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          {/* Temel Bilgiler */}
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Tur Adı *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Görsel URL *</Label>
                  <Input
                    value={formData.heroImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, heroImage: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Açıklama *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  required
                />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Şehir *</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Ülke *</Label>
                  <Input
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Süre (Gün) *</Label>
                  <Input
                    type="number"
                    min="1"
                    value={formData.durationDays}
                    onChange={(e) => setFormData(prev => ({ ...prev, durationDays: parseInt(e.target.value) }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fiyat (EUR) *</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.priceFrom}
                    onChange={(e) => setFormData(prev => ({ ...prev, priceFrom: parseInt(e.target.value) }))}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Başlangıç Tarihi</Label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">Turun başlangıç tarihi (opsiyonel)</p>
                </div>
                <div className="space-y-2">
                  <Label>Bitiş Tarihi</Label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  />
                  <p className="text-xs text-muted-foreground">Turun bitiş tarihi (opsiyonel)</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="isPopular"
                  checked={formData.isPopular}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: checked as boolean }))}
                />
                <Label htmlFor="isPopular" className="cursor-pointer">Popüler Tur</Label>
              </div>
            </CardContent>
          </Card>

          {/* Öne Çıkanlar */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Öne Çıkanlar</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => handleArrayAdd('highlights')}>
                <Plus className="h-4 w-4 mr-1" /> Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.highlights.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleArrayRemove('highlights', index)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Dahil Olanlar */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Fiyata Dahil</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => handleArrayAdd('included')}>
                <Plus className="h-4 w-4 mr-1" /> Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.included.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleArrayChange('included', index, e.target.value)}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleArrayRemove('included', index)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Dahil Olmayanlar */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Fiyata Dahil Değil</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={() => handleArrayAdd('notIncluded')}>
                <Plus className="h-4 w-4 mr-1" /> Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.notIncluded.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={item}
                    onChange={(e) => handleArrayChange('notIncluded', index, e.target.value)}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleArrayRemove('notIncluded', index)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Program */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Günlük Program</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={handleItineraryAdd}>
                <Plus className="h-4 w-4 mr-1" /> Gün Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.itinerary.map((day, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Gün {day.day}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleItineraryRemove(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <Input
                    value={day.title}
                    onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                    placeholder="Gün başlığı"
                  />
                  <Textarea
                    value={day.description}
                    onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                    placeholder="Gün açıklaması"
                    rows={2}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                'Değişiklikleri Kaydet'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              İptal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditTourPage() {
  return (
    <AdminGuard>
      <EditTourContent />
    </AdminGuard>
  );
}
