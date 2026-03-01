import { HardHat, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function ConstructionCTASection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <HardHat className="w-4 h-4 text-primary" />
          Botón de cotización
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Configura el botón principal para solicitar cotización
        </p>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="quoteBtnLabel" className="text-foreground">
            Texto del botón
          </Label>
          <Input
            id="quoteBtnLabel"
            placeholder="Get a Quote"
            value={getValue("quoteBtnLabel")}
            onChange={(e) => updateField("quoteBtnLabel", e.target.value)}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quoteBtnUrl" className="text-foreground flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            URL de cotización
          </Label>
          <Input
            id="quoteBtnUrl"
            placeholder="https://formulario-cotizacion.com"
            value={getValue("quoteBtnUrl")}
            onChange={(e) => updateField("quoteBtnUrl", e.target.value)}
            className="bg-background border-border"
          />
        </div>
      </div>
    </div>
  );
}
