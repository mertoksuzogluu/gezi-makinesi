'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminGuard } from '@/contexts/AdminContext';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getAllVisaCountries } from '@/lib/admin-data';
import { VisaCountry } from '@/types';
import { Pencil, Search, FileText } from 'lucide-react';

function VisaCountryListContent() {
  const [countries, setCountries] = useState<VisaCountry[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setCountries(getAllVisaCountries());
  }, []);

  const filteredCountries = countries.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const categoryColors: Record<string, string> = {
    Schengen: 'bg-blue-500',
    USA: 'bg-red-500',
    UK: 'bg-purple-500',
    UAE: 'bg-amber-500',
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Vize Ülkeleri</h1>
            <p className="text-muted-foreground">{countries.length} ülke bulundu</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ülke veya kategori ara..."
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {filteredCountries.map((country) => (
            <Card key={country.code}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{country.flagEmoji}</span>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{country.name}</h3>
                      <Badge className={categoryColors[country.category]}>{country.category}</Badge>
                      {country.isPopular && (
                        <Badge variant="outline">Popüler</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>İşlem: {country.processingTime}</span>
                      <span>Ücret: {country.visaFee}</span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {country.docGroups.length} evrak grubu
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/vize/${country.slug}/duzenle`}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Düzenle
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredCountries.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Aramanızla eşleşen ülke bulunamadı.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VisaCountryListPage() {
  return (
    <AdminGuard>
      <VisaCountryListContent />
    </AdminGuard>
  );
}

