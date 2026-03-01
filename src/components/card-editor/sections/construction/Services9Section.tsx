import { Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function Services9Section() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  const services = [
    { key: "service1Name", placeholder: "Service 1" },
    { key: "service2Name", placeholder: "Service 2" },
    { key: "service3Name", placeholder: "Service 3" },
    { key: "service4Name", placeholder: "Service 4" },
    { key: "service5Name", placeholder: "Service 5" },
    { key: "service6Name", placeholder: "Service 6" },
    { key: "service7Name", placeholder: "Service 7" },
    { key: "service8Name", placeholder: "Service 8" },
    { key: "service9Name", placeholder: "Service 9" },
  ];

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <Wrench className="w-4 h-4 text-primary" />
          Servicios
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Define hasta 9 servicios que ofreces
        </p>
      </div>

      {/* Section Title */}
      <div className="space-y-2">
        <Label htmlFor="servicesSectionTitle" className="text-foreground">
          Título de la sección
        </Label>
        <Input
          id="servicesSectionTitle"
          placeholder="Our Services"
          value={getValue("servicesSectionTitle")}
          onChange={(e) => updateField("servicesSectionTitle", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-3 gap-2">
        {services.map((service) => (
          <Input
            key={service.key}
            placeholder={service.placeholder}
            value={getValue(service.key)}
            onChange={(e) => updateField(service.key, e.target.value)}
            className="bg-background border-border h-9 text-sm"
          />
        ))}
      </div>
    </div>
  );
}
