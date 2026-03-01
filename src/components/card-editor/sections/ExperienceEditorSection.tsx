import { BookOpen, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCardData } from "@/hooks/useCardData";
import { getSectorDefaults } from "@/config/templateDefaults";

export function ExperienceEditorSection() {
  const { cardData, updateField, selectedSector } = useCardData();
  const defaults = getSectorDefaults(selectedSector);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Cuenta tu historia o la de tu negocio. Esta sección aparece destacada en la tarjeta.
      </p>

      {/* Section Title */}
      <div className="space-y-2">
        <Label className="text-foreground">Título de la sección</Label>
        <Input
          placeholder={defaults.experienceSectionTitle}
          value={(cardData.experienceSectionTitle as string) || ""}
          onChange={(e) => updateField("experienceSectionTitle", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Experience Text */}
      <div className="space-y-2">
        <Label className="text-foreground">Texto de experiencia</Label>
        <Textarea
          placeholder={defaults.experienceText}
          value={(cardData.experienceText as string) || ""}
          onChange={(e) => updateField("experienceText", e.target.value)}
          className="bg-background border-border min-h-[100px] resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Describe brevemente tu trayectoria, valores o lo que te hace único.
        </p>
      </div>

      {/* CTA Button in Experience Section */}
      <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <LinkIcon className="w-4 h-4 text-primary" />
          <span>Botón de acción (en la sección)</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Texto del botón</Label>
            <Input
              placeholder={defaults.experienceCtaBtnLabel}
              value={(cardData.experienceCtaBtnLabel as string) || ""}
              onChange={(e) => updateField("experienceCtaBtnLabel", e.target.value)}
              className="bg-background border-border h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Icono</Label>
            <Input
              placeholder={defaults.experienceCtaBtnIcon}
              value={(cardData.experienceCtaBtnIcon as string) || ""}
              onChange={(e) => updateField("experienceCtaBtnIcon", e.target.value)}
              className="bg-background border-border h-8 text-sm"
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">URL del botón</Label>
          <Input
            type="url"
            placeholder={defaults.experienceCtaBtnUrl}
            value={(cardData.experienceCtaBtnUrl as string) || ""}
            onChange={(e) => updateField("experienceCtaBtnUrl", e.target.value)}
            className="bg-background border-border h-8 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
