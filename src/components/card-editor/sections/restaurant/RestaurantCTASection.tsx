import { Calendar, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function RestaurantCTASection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Botón de reservaciones
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Configura el botón principal para reservar mesa
        </p>
      </div>

      {/* Reserve Button */}
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="reserveBtnLabel" className="text-foreground">
            Texto del botón
          </Label>
          <Input
            id="reserveBtnLabel"
            placeholder="Reserve a Table"
            value={getValue("reserveBtnLabel")}
            onChange={(e) => updateField("reserveBtnLabel", e.target.value)}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reserveBtnUrl" className="text-foreground flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            URL de reservaciones
          </Label>
          <Input
            id="reserveBtnUrl"
            placeholder="https://opentable.com/tu-restaurante"
            value={getValue("reserveBtnUrl")}
            onChange={(e) => updateField("reserveBtnUrl", e.target.value)}
            className="bg-background border-border"
          />
        </div>
      </div>

      {/* View Menu Button */}
      <div className="space-y-2 pt-3 border-t border-border">
        <Label className="text-foreground">Botón ver menú (inferior)</Label>
        <Input
          placeholder="https://menu.com"
          value={getValue("viewMenuBtnUrl")}
          onChange={(e) => updateField("viewMenuBtnUrl", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Cuisine Badge */}
      <div className="space-y-2 pt-3 border-t border-border">
        <Label htmlFor="cuisineBadge" className="text-foreground">
          Badge de cocina
        </Label>
        <Input
          id="cuisineBadge"
          placeholder="French Cuisine"
          value={getValue("cuisineBadge")}
          onChange={(e) => updateField("cuisineBadge", e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Tipo de cocina que aparece debajo del nombre
        </p>
      </div>
    </div>
  );
}
