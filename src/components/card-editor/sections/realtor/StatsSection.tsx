import { BarChart3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function StatsSection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  const stats = [
    { valueKey: "stat1Value", labelKey: "stat1Label", valuePlaceholder: "$45M+", labelPlaceholder: "In Sales" },
    { valueKey: "stat2Value", labelKey: "stat2Label", valuePlaceholder: "120+", labelPlaceholder: "Homes Sold" },
    { valueKey: "stat3Value", labelKey: "stat3Label", valuePlaceholder: "12", labelPlaceholder: "Years Exp." },
  ];

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-primary" />
          Estadísticas de éxito
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Muestra tus logros en números
        </p>
      </div>

      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Valor {index + 1}</Label>
              <Input
                placeholder={stat.valuePlaceholder}
                value={getValue(stat.valueKey)}
                onChange={(e) => updateField(stat.valueKey, e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Etiqueta {index + 1}</Label>
              <Input
                placeholder={stat.labelPlaceholder}
                value={getValue(stat.labelKey)}
                onChange={(e) => updateField(stat.labelKey, e.target.value)}
                className="bg-background border-border"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
