import { Calendar, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function GeneralCTASection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Botón principal
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Configura el botón de acción principal
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="bookBtnLabel" className="text-foreground">
            Texto del botón
          </Label>
          <Input
            id="bookBtnLabel"
            placeholder="Book Now"
            value={getValue("bookBtnLabel")}
            onChange={(e) => updateField("bookBtnLabel", e.target.value)}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bookBtnUrl" className="text-foreground flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            URL de destino
          </Label>
          <Input
            id="bookBtnUrl"
            placeholder="https://calendly.com/tu-calendario"
            value={getValue("bookBtnUrl")}
            onChange={(e) => updateField("bookBtnUrl", e.target.value)}
            className="bg-background border-border"
          />
        </div>
      </div>
    </div>
  );
}
