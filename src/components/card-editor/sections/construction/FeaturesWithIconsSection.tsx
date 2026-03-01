import { CheckCircle, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function FeaturesWithIconsSection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  const features = [
    { iconKey: "feature1Icon", textKey: "feature1Text", iconPlaceholder: "fas fa-hard-hat", textPlaceholder: "20+ years of experience" },
    { iconKey: "feature2Icon", textKey: "feature2Text", iconPlaceholder: "fas fa-shield-halved", textPlaceholder: "Licensed and insured" },
    { iconKey: "feature3Icon", textKey: "feature3Text", iconPlaceholder: "fas fa-clock", textPlaceholder: "On-time project delivery" },
    { iconKey: "feature4Icon", textKey: "feature4Text", iconPlaceholder: "fas fa-handshake", textPlaceholder: "Satisfaction guaranteed" },
  ];

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          Características con iconos
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          4 puntos clave con iconos de FontAwesome
        </p>
      </div>

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="grid grid-cols-3 gap-2">
            <Input
              placeholder={feature.iconPlaceholder}
              value={getValue(feature.iconKey)}
              onChange={(e) => updateField(feature.iconKey, e.target.value)}
              className="bg-background border-border h-9 text-sm"
            />
            <Input
              placeholder={feature.textPlaceholder}
              value={getValue(feature.textKey)}
              onChange={(e) => updateField(feature.textKey, e.target.value)}
              className="bg-background border-border h-9 text-sm col-span-2"
            />
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="space-y-2 pt-3 border-t border-border">
        <Label className="text-foreground">Botón de llamada a la acción</Label>
        <div className="grid grid-cols-3 gap-2">
          <Input
            placeholder="fas fa-calendar-check"
            value={getValue("ctaBtnIcon")}
            onChange={(e) => updateField("ctaBtnIcon", e.target.value)}
            className="bg-background border-border h-9 text-sm"
          />
          <Input
            placeholder="Request a Free Quote"
            value={getValue("ctaBtnLabel")}
            onChange={(e) => updateField("ctaBtnLabel", e.target.value)}
            className="bg-background border-border h-9 text-sm"
          />
          <div className="relative">
            <ExternalLink className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
            <Input
              placeholder="https://..."
              value={getValue("ctaBtnUrl")}
              onChange={(e) => updateField("ctaBtnUrl", e.target.value)}
              className="bg-background border-border h-9 text-sm pl-7"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
