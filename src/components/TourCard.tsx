import Link from 'next/link';
import Image from 'next/image';
import { Tour } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, ArrowRight, CalendarDays } from 'lucide-react';

interface TourCardProps {
  tour: Tour;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function TourCard({ tour }: TourCardProps) {
  const hasDateRange = tour.startDate && tour.endDate;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        {tour.heroImage.startsWith('/') ? (
          <img
            src={tour.heroImage}
            alt={`${tour.title} - ${tour.location}, ${tour.country} turu görseli`}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <Image
            src={tour.heroImage}
            alt={`${tour.title} - ${tour.location}, ${tour.country} turu görseli`}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            unoptimized
          />
        )}
        {tour.isPopular && (
          <Badge className="absolute top-3 left-3 bg-primary">Popüler</Badge>
        )}
        {hasDateRange && (
          <Badge className="absolute top-3 right-3 bg-blue-500">
            {formatDate(tour.startDate!)}
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" />
          <span>{tour.location}, {tour.country}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{tour.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {tour.description}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{tour.durationDays} Gün</span>
          </div>
          {hasDateRange && (
            <div className="flex items-center gap-1 text-green-600">
              <CalendarDays className="h-4 w-4" />
              <span>{formatDate(tour.startDate!)} - {formatDate(tour.endDate!)}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <span className="text-xs text-muted-foreground">Başlayan fiyatlarla</span>
          <p className="text-lg font-bold text-primary">€{tour.priceFrom}</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href={`/turlar/${tour.slug}`}>
            Detaylar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

