import { CheckCircle, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function RealtorFeaturesSection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  const features = [
    { key: "feature1Text", placeholder: "Personalized approach for every client" },
    { key: "feature2Text", placeholder: "Deep knowledge of the local market" },
    { key: "feature3Text", placeholder: "Expert negotiation skills" },
    { key: "feature4Text", placeholder: "Seamless closing process" },
  ];

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          Características destacadas
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          4 puntos que te diferencian de la competencia
        </p>
      </div>

      <div className="space-y-2">
        {features.map((feature, index) => (
          <Input
            key={feature.key}
            placeholder={feature.placeholder}
            value={getValue(feature.key)}
            onChange={(e) => updateField(feature.key, e.target.value)}
            className="bg-background border-border"
          />
        ))}
      </div>

      {/* CTA Button */}
      <div className="space-y-2 pt-3 border-t border-border">
        <Label className="text-foreground">Botón de llamada a la acción</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Let's Find Your Home"
            value={getValue("ctaBtnLabel")}
            onChange={(e) => updateField("ctaBtnLabel", e.target.value)}
            className="bg-background border-border"
          />
          <div className="relative">
            <ExternalLink className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="https://..."
              value={getValue("ctaBtnUrl")}
              onChange={(e) => updateField("ctaBtnUrl", e.target.value)}
              className="bg-background border-border pl-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
