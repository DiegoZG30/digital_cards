import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RotateCcw, Palette } from "lucide-react";
import { useCardData, DEFAULT_STYLES } from "@/hooks/useCardData";
import { getSectorDefaults } from "@/config/templateDefaults";

export function ColorsSection() {
  const { customStyles, updateStyles, selectedSector } = useCardData();
  const defaults = getSectorDefaults(selectedSector);

  const handleReset = () => {
    updateStyles({
      ...customStyles,
      primaryColor: defaults.accentColor,
      secondaryColor: defaults.accentColorHover,
    });
  };

  return (
    <div className="space-y-4">
      {/* Info */}
      <div className="p-3 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-start gap-2">
          <Palette className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <p className="text-sm text-foreground font-medium">Colores de la plantilla</p>
            <p className="text-xs text-muted-foreground mt-1">
              Estos colores se aplicarán a botones, acentos y elementos interactivos de tu tarjeta.
            </p>
          </div>
        </div>
      </div>

      {/* Color Pickers */}
      <div className="space-y-4">
        {/* Primary/Accent Color */}
        <div className="space-y-2">
          <Label className="text-sm text-foreground">Color principal (accent)</Label>
          <div className="flex gap-2">
            <div
              className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer overflow-hidden relative"
              style={{ backgroundColor: customStyles.primaryColor }}
            >
              <input
                type="color"
                value={customStyles.primaryColor}
                onChange={(e) => updateStyles({ ...customStyles, primaryColor: e.target.value })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <Input
              value={customStyles.primaryColor}
              onChange={(e) => updateStyles({ ...customStyles, primaryColor: e.target.value })}
              className="flex-1 font-mono text-sm bg-background border-border"
              placeholder="#D4AF37"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Usado en botones, iconos activos y elementos destacados
          </p>
        </div>

        {/* Secondary/Hover Color */}
        <div className="space-y-2">
          <Label className="text-sm text-foreground">Color hover (secundario)</Label>
          <div className="flex gap-2">
            <div
              className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer overflow-hidden relative"
              style={{ backgroundColor: customStyles.secondaryColor }}
            >
              <input
                type="color"
                value={customStyles.secondaryColor}
                onChange={(e) => updateStyles({ ...customStyles, secondaryColor: e.target.value })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <Input
              value={customStyles.secondaryColor}
              onChange={(e) => updateStyles({ ...customStyles, secondaryColor: e.target.value })}
              className="flex-1 font-mono text-sm bg-background border-border"
              placeholder="#1E1E1E"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Usado al pasar el cursor sobre elementos
          </p>
        </div>
      </div>

      {/* Sector Default Preview */}
      <div className="p-3 rounded-lg bg-muted/20 border border-border">
        <p className="text-xs text-muted-foreground mb-2">Color por defecto del sector:</p>
        <div className="flex items-center gap-2">
          <div 
            className="w-6 h-6 rounded border border-border" 
            style={{ backgroundColor: defaults.accentColor }}
          />
          <span className="text-sm font-mono text-foreground">{defaults.accentColor}</span>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        size="sm"
        className="w-full"
        onClick={handleReset}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Restaurar colores del sector
      </Button>
    </div>
  );
}
