import Link from 'next/link';
import { VisaCountry } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight } from 'lucide-react';

interface CountryCardProps {
  country: VisaCountry;
}

export function CountryCard({ country }: CountryCardProps) {
  const categoryColors: Record<string, string> = {
    Schengen: 'bg-blue-500',
    USA: 'bg-red-500',
    UK: 'bg-purple-500',
    UAE: 'bg-amber-500',
  };

  const categoryLabels: Record<string, string> = {
    Schengen: 'Schengen',
    USA: 'ABD',
    UK: 'İngiltere',
    UAE: 'Dubai (BAE)',
  };

  return (
    <Link href={`/vize/ulkeler/${country.slug}`}>
      <Card className="group transition-all hover:shadow-lg hover:border-primary cursor-pointer h-full">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <span className="text-4xl">{country.flagEmoji}</span>
            <Badge className={categoryColors[country.category] || 'bg-gray-500'}>
              {categoryLabels[country.category] || country.category}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2">{country.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Clock className="h-4 w-4" />
            <span>{country.processingTime}</span>
          </div>
          <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Detaylı Bilgi
            <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

