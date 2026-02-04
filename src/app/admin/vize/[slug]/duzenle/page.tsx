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
import { getVisaCountryBySlug, saveVisaCountry } from '@/lib/admin-data';
import { VisaCountry } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Plus, Trash2, Loader2 } from 'lucide-react';

function EditVisaCountryContent() {
  const router = useRouter();
  const params = useParams();
  const countrySlug = params.slug as string;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState<VisaCountry | null>(null);
  
  const [formData, setFormData] = useState({
    processingTime: '',
    visaFee: '',
    serviceFee: '',
    description: '',
    isPopular: false,
    docGroups: [{ title: '', documents: [''] }],
    process: [{ step: 1, title: '', description: '' }],
    faqs: [{ question: '', answer: '' }],
  });

  useEffect(() => {
    if (countrySlug) {
      const data = getVisaCountryBySlug(countrySlug);
      if (data) {
        setCountry(data);
        setFormData({
          processingTime: data.processingTime,
          visaFee: data.visaFee,
          serviceFee: data.serviceFee,
          description: data.description,
          isPopular: data.isPopular,
          docGroups: data.docGroups.length > 0 ? data.docGroups.map(g => ({
            title: g.title,
            documents: g.documents.length > 0 ? g.documents : ['']
          })) : [{ title: '', documents: [''] }],
          process: data.process.length > 0 ? data.process : [{ step: 1, title: '', description: '' }],
          faqs: data.faqs.length > 0 ? data.faqs : [{ question: '', answer: '' }],
        });
      }
      setIsLoading(false);
    }
  }, [countrySlug]);

  // Document groups handlers
  const handleAddDocGroup = () => {
    setFormData(prev => ({
      ...prev,
      docGroups: [...prev.docGroups, { title: '', documents: [''] }]
    }));
  };

  const handleRemoveDocGroup = (index: number) => {
    setFormData(prev => ({
      ...prev,
      docGroups: prev.docGroups.filter((_, i) => i !== index)
    }));
  };

  const handleDocGroupTitleChange = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      docGroups: prev.docGroups.map((g, i) => i === index ? { ...g, title: value } : g)
    }));
  };

  const handleAddDocument = (groupIndex: number) => {
    setFormData(prev => ({
      ...prev,
      docGroups: prev.docGroups.map((g, i) => 
        i === groupIndex ? { ...g, documents: [...g.documents, ''] } : g
      )
    }));
  };

  const handleRemoveDocument = (groupIndex: number, docIndex: number) => {
    setFormData(prev => ({
      ...prev,
      docGroups: prev.docGroups.map((g, i) => 
        i === groupIndex ? { ...g, documents: g.documents.filter((_, di) => di !== docIndex) } : g
      )
    }));
  };

  const handleDocumentChange = (groupIndex: number, docIndex: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      docGroups: prev.docGroups.map((g, i) => 
        i === groupIndex ? { 
          ...g, 
          documents: g.documents.map((d, di) => di === docIndex ? value : d) 
        } : g
      )
    }));
  };

  // Process handlers
  const handleAddProcess = () => {
    setFormData(prev => ({
      ...prev,
      process: [...prev.process, { step: prev.process.length + 1, title: '', description: '' }]
    }));
  };

  const handleRemoveProcess = (index: number) => {
    setFormData(prev => ({
      ...prev,
      process: prev.process.filter((_, i) => i !== index).map((p, i) => ({ ...p, step: i + 1 }))
    }));
  };

  const handleProcessChange = (index: number, field: 'title' | 'description', value: string) => {
    setFormData(prev => ({
      ...prev,
      process: prev.process.map((p, i) => i === index ? { ...p, [field]: value } : p)
    }));
  };

  // FAQ handlers
  const handleAddFaq = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const handleRemoveFaq = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((f, i) => i === index ? { ...f, [field]: value } : f)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!country) return;
    
    setIsSubmitting(true);

    try {
      const updatedCountry: VisaCountry = {
        ...country,
        processingTime: formData.processingTime,
        visaFee: formData.visaFee,
        serviceFee: formData.serviceFee,
        description: formData.description,
        isPopular: formData.isPopular,
        docGroups: formData.docGroups
          .filter(g => g.title.trim())
          .map(g => ({
            title: g.title,
            documents: g.documents.filter(d => d.trim())
          })),
        process: formData.process.filter(p => p.title.trim()),
        faqs: formData.faqs.filter(f => f.question.trim() && f.answer.trim()),
      };

      saveVisaCountry(updatedCountry);

      toast({
        title: 'Ülke Güncellendi',
        description: `${country.name} vize bilgileri başarıyla güncellendi.`,
      });

      router.push('/admin/vize');
    } catch {
      toast({
        title: 'Hata',
        description: 'Güncellenirken bir hata oluştu.',
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

  if (!country) {
    return (
      <div className="flex min-h-screen bg-slate-100">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <p>Ülke bulunamadı.</p>
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
            <Link href="/admin/vize">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{country.flagEmoji}</span>
            <div>
              <h1 className="text-3xl font-bold">{country.name}</h1>
              <p className="text-muted-foreground">Vize bilgilerini düzenle</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          {/* Temel Bilgiler */}
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Açıklama</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>İşlem Süresi</Label>
                  <Input
                    value={formData.processingTime}
                    onChange={(e) => setFormData(prev => ({ ...prev, processingTime: e.target.value }))}
                    placeholder="10-15 iş günü"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Vize Ücreti</Label>
                  <Input
                    value={formData.visaFee}
                    onChange={(e) => setFormData(prev => ({ ...prev, visaFee: e.target.value }))}
                    placeholder="90 EUR"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Hizmet Bedeli</Label>
                  <Input
                    value={formData.serviceFee}
                    onChange={(e) => setFormData(prev => ({ ...prev, serviceFee: e.target.value }))}
                    placeholder="1.500 TL"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="isPopular"
                  checked={formData.isPopular}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: checked as boolean }))}
                />
                <Label htmlFor="isPopular" className="cursor-pointer">Popüler Ülke</Label>
              </div>
            </CardContent>
          </Card>

          {/* Gerekli Evraklar */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Gerekli Evraklar</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={handleAddDocGroup}>
                <Plus className="h-4 w-4 mr-1" /> Grup Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.docGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      value={group.title}
                      onChange={(e) => handleDocGroupTitleChange(groupIndex, e.target.value)}
                      placeholder="Grup adı (örn: Kişisel Evraklar)"
                      className="flex-1"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveDocGroup(groupIndex)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2 pl-4">
                    {group.documents.map((doc, docIndex) => (
                      <div key={docIndex} className="flex gap-2">
                        <Input
                          value={doc}
                          onChange={(e) => handleDocumentChange(groupIndex, docIndex, e.target.value)}
                          placeholder="Belge adı"
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveDocument(groupIndex, docIndex)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleAddDocument(groupIndex)}>
                      <Plus className="h-4 w-4 mr-1" /> Belge Ekle
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Başvuru Süreci */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Başvuru Süreci</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={handleAddProcess}>
                <Plus className="h-4 w-4 mr-1" /> Adım Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.process.map((step, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Adım {step.step}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveProcess(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <Input
                    value={step.title}
                    onChange={(e) => handleProcessChange(index, 'title', e.target.value)}
                    placeholder="Adım başlığı"
                  />
                  <Input
                    value={step.description}
                    onChange={(e) => handleProcessChange(index, 'description', e.target.value)}
                    placeholder="Adım açıklaması"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* SSS */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sık Sorulan Sorular</CardTitle>
              <Button type="button" variant="outline" size="sm" onClick={handleAddFaq}>
                <Plus className="h-4 w-4 mr-1" /> Soru Ekle
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.faqs.map((faq, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Soru {index + 1}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveFaq(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <Input
                    value={faq.question}
                    onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    placeholder="Soru"
                  />
                  <Textarea
                    value={faq.answer}
                    onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                    placeholder="Cevap"
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

export default function EditVisaCountryPage() {
  return (
    <AdminGuard>
      <EditVisaCountryContent />
    </AdminGuard>
  );
}
