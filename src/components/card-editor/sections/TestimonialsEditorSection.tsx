import { MessageSquareQuote, Star, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCardData } from "@/hooks/useCardData";

interface TestimonialsEditorSectionProps {
  showSource?: boolean;
}

export function TestimonialsEditorSection({ showSource = false }: TestimonialsEditorSectionProps) {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  const testimonials = [
    { 
      textKey: "testimonial1Text", 
      authorKey: "testimonial1Author", 
      sourceKey: "testimonial1Source",
      textPlaceholder: "Great service, highly recommend!",
      authorPlaceholder: "John D.",
      sourcePlaceholder: "Google"
    },
    { 
      textKey: "testimonial2Text", 
      authorKey: "testimonial2Author", 
      sourceKey: "testimonial2Source",
      textPlaceholder: "Exceeded all expectations!",
      authorPlaceholder: "Maria S.",
      sourcePlaceholder: "Yelp"
    },
    { 
      textKey: "testimonial3Text", 
      authorKey: "testimonial3Author", 
      sourceKey: "testimonial3Source",
      textPlaceholder: "Professional and reliable.",
      authorPlaceholder: "Carlos R.",
      sourcePlaceholder: "Facebook"
    },
    { 
      textKey: "testimonial4Text", 
      authorKey: "testimonial4Author", 
      sourceKey: "testimonial4Source",
      textPlaceholder: "Will definitely use again!",
      authorPlaceholder: "Ana L.",
      sourcePlaceholder: "Google"
    },
  ];

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <MessageSquareQuote className="w-4 h-4 text-primary" />
          Testimonios de clientes
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Hasta 4 testimonios con autor{showSource ? " y fuente" : ""}
        </p>
      </div>

      {/* Section Title */}
      <div className="space-y-2">
        <Label htmlFor="testimonialsSectionTitle" className="text-foreground">
          Título de la sección
        </Label>
        <Input
          id="testimonialsSectionTitle"
          placeholder="What Clients Say"
          value={getValue("testimonialsSectionTitle")}
          onChange={(e) => updateField("testimonialsSectionTitle", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Testimonials */}
      {testimonials.map((t, index) => (
        <div key={index} className="p-3 rounded-lg border border-border space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Testimonio {index + 1}</p>
          <Textarea
            placeholder={t.textPlaceholder}
            value={getValue(t.textKey)}
            onChange={(e) => updateField(t.textKey, e.target.value)}
            className="bg-background border-border text-sm min-h-[60px]"
          />
          <div className={`grid gap-2 ${showSource ? "grid-cols-2" : ""}`}>
            <Input
              placeholder={t.authorPlaceholder}
              value={getValue(t.authorKey)}
              onChange={(e) => updateField(t.authorKey, e.target.value)}
              className="bg-background border-border h-8 text-sm"
            />
            {showSource && (
              <Input
                placeholder={t.sourcePlaceholder}
                value={getValue(t.sourceKey)}
                onChange={(e) => updateField(t.sourceKey, e.target.value)}
                className="bg-background border-border h-8 text-sm"
              />
            )}
          </div>
        </div>
      ))}

      {/* Leave Review Button */}
      <div className="space-y-2 pt-3 border-t border-border">
        <Label className="text-foreground flex items-center gap-2">
          <Star className="w-4 h-4" />
          Botón de dejar reseña
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Leave a Review"
            value={getValue("leaveReviewBtnLabel")}
            onChange={(e) => updateField("leaveReviewBtnLabel", e.target.value)}
            className="bg-background border-border"
          />
          <div className="relative">
            <ExternalLink className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="https://google.com/review/..."
              value={getValue("leaveReviewUrl")}
              onChange={(e) => updateField("leaveReviewUrl", e.target.value)}
              className="bg-background border-border pl-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
