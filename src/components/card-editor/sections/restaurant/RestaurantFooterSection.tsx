import { MapPin, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function RestaurantFooterSection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-primary" />
          Pie de página
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Frase y dirección que aparecen al final de la tarjeta
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="footerTagline" className="text-foreground">
          Frase del footer
        </Label>
        <Input
          id="footerTagline"
          placeholder="Where every meal tells a story"
          value={getValue("footerTagline")}
          onChange={(e) => updateField("footerTagline", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="footerAddress" className="text-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Dirección
        </Label>
        <Input
          id="footerAddress"
          placeholder="123 Gourmet Ave, Miami FL 33101"
          value={getValue("footerAddress")}
          onChange={(e) => updateField("footerAddress", e.target.value)}
          className="bg-background border-border"
        />
      </div>
    </div>
  );
}
