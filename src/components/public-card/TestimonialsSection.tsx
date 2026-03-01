import { Star } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  rating: number;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-primary text-primary"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="py-4">
      <h3 className="px-6 text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Testimonios
      </h3>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex gap-4 px-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="flex-shrink-0 w-72 bg-card border-border"
            >
              <CardContent className="p-4">
                <StarRating rating={testimonial.rating} />
                <blockquote className="mt-3 text-sm text-foreground whitespace-normal line-clamp-4">
                  "{testimonial.quote}"
                </blockquote>
                <p className="mt-3 text-sm font-medium text-primary">
                  — {testimonial.author}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export type { Testimonial };
