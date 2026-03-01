import { Video, ExternalLink, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function TestimonialsVideoSection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <Video className="w-4 h-4 text-primary" />
          Video de testimonios
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          La plantilla general usa un video en lugar de tarjetas de texto
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

      {/* Video URL */}
      <div className="space-y-2">
        <Label htmlFor="testimonialsVideoUrl" className="text-foreground flex items-center gap-2">
          <Video className="w-4 h-4" />
          URL del video de testimonios
        </Label>
        <Input
          id="testimonialsVideoUrl"
          placeholder="https://youtube.com/watch?v=..."
          value={getValue("testimonialsVideoUrl")}
          onChange={(e) => updateField("testimonialsVideoUrl", e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Video de YouTube con testimonios de clientes
        </p>
      </div>

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
