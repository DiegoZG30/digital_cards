import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useCardData, DEFAULT_STYLES } from "@/hooks/useCardData";

const FONT_OPTIONS = [
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Poppins, sans-serif", label: "Poppins" },
  { value: "Roboto, sans-serif", label: "Roboto" },
  { value: "Montserrat, sans-serif", label: "Montserrat" },
  { value: "Open Sans, sans-serif", label: "Open Sans" },
  { value: "Playfair Display, serif", label: "Playfair Display" },
  { value: "Lato, sans-serif", label: "Lato" },
  { value: "Nunito, sans-serif", label: "Nunito" },
];

export function StyleEditorSection() {
  const { customStyles, updateStyles } = useCardData();

  const handleReset = () => {
    updateStyles(DEFAULT_STYLES);
  };

  const borderRadiusValue = parseInt(customStyles.borderRadius) || 8;

  return (
    <div className="space-y-6">
      {/* Colors */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Colores</h4>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Primary Color */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Color primario</Label>
            <div className="flex gap-2">
              <div
                className="w-10 h-10 rounded-md border border-border cursor-pointer"
                style={{ backgroundColor: customStyles.primaryColor }}
              >
                <input
                  type="color"
                  value={customStyles.primaryColor}
                  onChange={(e) => updateStyles({ ...customStyles, primaryColor: e.target.value })}
                  className="opacity-0 w-full h-full cursor-pointer"
                />
              </div>
              <Input
                value={customStyles.primaryColor}
                onChange={(e) => updateStyles({ ...customStyles, primaryColor: e.target.value })}
                className="flex-1 text-xs font-mono"
                placeholder="#D4AF37"
              />
            </div>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Color secundario</Label>
            <div className="flex gap-2">
              <div
                className="w-10 h-10 rounded-md border border-border cursor-pointer"
                style={{ backgroundColor: customStyles.secondaryColor }}
              >
                <input
                  type="color"
                  value={customStyles.secondaryColor}
                  onChange={(e) => updateStyles({ ...customStyles, secondaryColor: e.target.value })}
                  className="opacity-0 w-full h-full cursor-pointer"
                />
              </div>
              <Input
                value={customStyles.secondaryColor}
                onChange={(e) => updateStyles({ ...customStyles, secondaryColor: e.target.value })}
                className="flex-1 text-xs font-mono"
                placeholder="#1E1E1E"
              />
            </div>
          </div>

          {/* Background Color */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Color de fondo</Label>
            <div className="flex gap-2">
              <div
                className="w-10 h-10 rounded-md border border-border cursor-pointer"
                style={{ backgroundColor: customStyles.backgroundColor }}
              >
                <input
                  type="color"
                  value={customStyles.backgroundColor}
                  onChange={(e) => updateStyles({ ...customStyles, backgroundColor: e.target.value })}
                  className="opacity-0 w-full h-full cursor-pointer"
                />
              </div>
              <Input
                value={customStyles.backgroundColor}
                onChange={(e) => updateStyles({ ...customStyles, backgroundColor: e.target.value })}
                className="flex-1 text-xs font-mono"
                placeholder="#FFFFFF"
              />
            </div>
          </div>

          {/* Text Color */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Color de texto</Label>
            <div className="flex gap-2">
              <div
                className="w-10 h-10 rounded-md border border-border cursor-pointer"
                style={{ backgroundColor: customStyles.textColor }}
              >
                <input
                  type="color"
                  value={customStyles.textColor}
                  onChange={(e) => updateStyles({ ...customStyles, textColor: e.target.value })}
                  className="opacity-0 w-full h-full cursor-pointer"
                />
              </div>
              <Input
                value={customStyles.textColor}
                onChange={(e) => updateStyles({ ...customStyles, textColor: e.target.value })}
                className="flex-1 text-xs font-mono"
                placeholder="#121212"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Tipografía</h4>
        
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Fuente principal</Label>
          <Select
            value={customStyles.fontFamily}
            onValueChange={(value) => updateStyles({ ...customStyles, fontFamily: value })}
          >
            <SelectTrigger className="bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_OPTIONS.map((font) => (
                <SelectItem key={font.value} value={font.value}>
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Border Radius */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Bordes</h4>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs text-muted-foreground">Radio de borde</Label>
            <span className="text-xs text-muted-foreground">{borderRadiusValue}px</span>
          </div>
          <Slider
            value={[borderRadiusValue]}
            onValueChange={([value]) => updateStyles({ ...customStyles, borderRadius: `${value}px` })}
            max={24}
            min={0}
            step={2}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Cuadrado</span>
            <span>Redondeado</span>
          </div>
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
        Restaurar valores predeterminados
      </Button>
    </div>
  );
}
