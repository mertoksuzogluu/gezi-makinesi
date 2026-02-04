import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  location: string;
  content: string;
  rating: number;
  tourType?: string;
}

export function TestimonialCard({ name, location, content, rating, tourType }: TestimonialCardProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? 'fill-blue-400 text-blue-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-4">&quot;{content}&quot;</p>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">
              {location} {tourType && `• ${tourType}`}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

