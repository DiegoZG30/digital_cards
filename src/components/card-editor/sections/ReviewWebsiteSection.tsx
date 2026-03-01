import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Star } from "lucide-react";
import { useCardData } from "@/hooks/useCardData";

export function ReviewWebsiteSection() {
  const { cardData, updateWebsiteUrl, updateReviewUrl } = useCardData();
  const { websiteUrl = "", reviewUrl = "" } = cardData;

  return (
    <div className="space-y-4">
      {/* Website URL */}
      <div className="space-y-2">
        <Label htmlFor="websiteUrl" className="text-foreground flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          Sitio web
        </Label>
        <Input
          id="websiteUrl"
          placeholder="https://tu-sitio-web.com"
          value={websiteUrl}
          onChange={(e) => updateWebsiteUrl(e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          El botón "Website" junto a "Share" abrirá este enlace
        </p>
      </div>

      {/* Review URL */}
      <div className="space-y-2">
        <Label htmlFor="reviewUrl" className="text-foreground flex items-center gap-2">
          <Star className="w-4 h-4 text-primary" />
          Link de reseñas
        </Label>
        <Input
          id="reviewUrl"
          placeholder="https://g.page/review/tu-negocio"
          value={reviewUrl}
          onChange={(e) => updateReviewUrl(e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Pega el enlace de Google Reviews, Yelp, Facebook Reviews, etc.
        </p>
      </div>

      {/* Preview */}
      <div className="pt-2">
        <Label className="text-muted-foreground text-xs mb-2 block">Vista previa de botones:</Label>
        <div className="flex justify-center gap-3">
          {websiteUrl && (
            <div className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Website
            </div>
          )}
          {reviewUrl && (
            <div className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm flex items-center gap-2">
              <Star className="w-4 h-4" />
              Review Us
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
