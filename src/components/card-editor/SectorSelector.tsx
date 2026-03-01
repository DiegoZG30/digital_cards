import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllSectors, SectorSchema } from "@/config/sectorSchemas";
import { TemplateSector, SECTOR_COLORS } from "@/hooks/useTemplates";
import { 
  Briefcase, 
  UtensilsCrossed, 
  HardHat, 
  Home, 
  Sparkles,
  ChevronRight,
  Check,
} from "lucide-react";

const SECTOR_ICONS: Record<TemplateSector, React.ReactNode> = {
  general: <Briefcase className="w-8 h-8" />,
  restaurant: <UtensilsCrossed className="w-8 h-8" />,
  construction: <HardHat className="w-8 h-8" />,
  "real-estate": <Home className="w-8 h-8" />,
  cleaning: <Sparkles className="w-8 h-8" />,
};

interface SectorSelectorProps {
  selectedSector: TemplateSector | null;
  onSelectSector: (sector: TemplateSector) => void;
  onContinue: () => void;
}

export function SectorSelector({ 
  selectedSector, 
  onSelectSector, 
  onContinue 
}: SectorSelectorProps) {
  const sectors = getAllSectors();

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ¿Cuál es tu rubro?
        </h2>
        <p className="text-muted-foreground">
          Selecciona el tipo de negocio para personalizar tu tarjeta digital
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map((sector) => (
          <SectorCard
            key={sector.sector}
            schema={sector}
            isSelected={selectedSector === sector.sector}
            onSelect={() => onSelectSector(sector.sector)}
          />
        ))}
      </div>

      {selectedSector && (
        <div className="flex justify-center pt-4">
          <Button 
            size="lg" 
            onClick={onContinue}
            className="gap-2"
          >
            Continuar
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

interface SectorCardProps {
  schema: SectorSchema;
  isSelected: boolean;
  onSelect: () => void;
}

function SectorCard({ schema, isSelected, onSelect }: SectorCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all hover:scale-[1.02] ${
        isSelected
          ? "ring-2 ring-primary border-primary bg-primary/5"
          : "bg-card border-border hover:border-primary/50"
      }`}
      onClick={onSelect}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${schema.color}20` }}
          >
            <div style={{ color: schema.color }}>
              {SECTOR_ICONS[schema.sector]}
            </div>
          </div>
          {isSelected && (
            <div className="bg-primary rounded-full p-1">
              <Check className="w-4 h-4 text-primary-foreground" />
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {schema.label}
        </h3>
        <p className="text-sm text-muted-foreground">
          {schema.description}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-1">
          {schema.sections
            .filter(s => !["background", "profile", "contact", "social", "bio", "styles"].includes(s.id))
            .slice(0, 3)
            .map(section => (
              <Badge 
                key={section.id} 
                variant="secondary" 
                className="text-xs"
              >
                {section.title}
              </Badge>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
