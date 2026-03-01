import { Gift, Star, UserCheck, Calendar, FileText, Share2, Globe, Utensils } from "lucide-react";
import { DebouncedInput } from "@/components/ui/debounced-input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";
import { getSectorDefaults } from "@/config/templateDefaults";

export function MainButtonsSection() {
  const { cardData, updateField, selectedSector } = useCardData();
  const defaults = getSectorDefaults(selectedSector);

  const isRestaurant = selectedSector === "restaurant";
  const isRealtor = selectedSector === "real-estate";
  const isConstruction = selectedSector === "construction";
  const isCleaning = selectedSector === "cleaning";
  const isGeneral = selectedSector === "general";

  return (
    <div className="space-y-6">
      {/* Sector-specific Primary Button */}
      {isRestaurant && (
        <div className="space-y-3 p-4 rounded-lg bg-primary/10 border border-primary/30">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <Utensils className="w-4 h-4 text-primary" />
            <span>Botón Principal (Reservar)</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Texto del botón</Label>
              <DebouncedInput
                placeholder={defaults.reserveBtnLabel}
                value={(cardData.reserveBtnLabel as string) || ""}
                onValueChange={(value) => updateField("reserveBtnLabel", value)}
                className="bg-background border-border h-8 text-sm"
                debounceMs={300}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">URL</Label>
              <DebouncedInput
                placeholder={defaults.reserveBtnUrl}
                value={(cardData.reserveBtnUrl as string) || ""}
                onValueChange={(value) => updateField("reserveBtnUrl", value)}
                className="bg-background border-border h-8 text-sm"
                debounceMs={300}
              />
            </div>
          </div>
        </div>
      )}

      {isConstruction && (
        <div className="space-y-3 p-4 rounded-lg bg-primary/10 border border-primary/30">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <FileText className="w-4 h-4 text-primary" />
            <span>Botón Principal (Cotizar)</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Texto del botón</Label>
              <DebouncedInput
                placeholder={defaults.quoteBtnLabel}
                value={(cardData.quoteBtnLabel as string) || ""}
                onValueChange={(value) => updateField("quoteBtnLabel", value)}
                className="bg-background border-border h-8 text-sm"
                debounceMs={300}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">URL</Label>
              <DebouncedInput
                placeholder={defaults.quoteBtnUrl}
                value={(cardData.quoteBtnUrl as string) || ""}
                onValueChange={(value) => updateField("quoteBtnUrl", value)}
                className="bg-background border-border h-8 text-sm"
                debounceMs={300}
              />
            </div>
          </div>
        </div>
      )}

      {(isRealtor || isCleaning || isGeneral) && (
        <div className="space-y-3 p-4 rounded-lg bg-primary/10 border border-primary/30">
          <div className="flex items-center gap-2 text-foreground font-medium">
            <Calendar className="w-4 h-4 text-primary" />
            <span>Botón Principal (Agendar)</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Texto del botón</Label>
              <DebouncedInput
                placeholder={defaults.bookBtnLabel}
                value={(cardData.bookBtnLabel as string) || ""}
                onValueChange={(value) => updateField("bookBtnLabel", value)}
                className="bg-background border-border h-8 text-sm"
                debounceMs={300}
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">URL</Label>
              <DebouncedInput
                placeholder={defaults.bookBtnUrl}
                value={(cardData.bookBtnUrl as string) || ""}
                onValueChange={(value) => updateField("bookBtnUrl", value)}
                className="bg-background border-border h-8 text-sm"
                debounceMs={300}
              />
            </div>
          </div>
        </div>
      )}

      {/* Refer Button */}
      <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <Gift className="w-4 h-4 text-primary" />
          <span>Botón de Referir</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Texto del botón</Label>
            <DebouncedInput
              placeholder={defaults.referBtnLabel}
              value={(cardData.referBtnLabel as string) || ""}
              onValueChange={(value) => updateField("referBtnLabel", value)}
              className="bg-background border-border h-8 text-sm"
              debounceMs={300}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Icono (FontAwesome)</Label>
            <DebouncedInput
              placeholder={defaults.referBtnIcon}
              value={(cardData.referBtnIcon as string) || ""}
              onValueChange={(value) => updateField("referBtnIcon", value)}
              className="bg-background border-border h-8 text-sm"
              debounceMs={300}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">URL del botón</Label>
          <DebouncedInput
            type="url"
            placeholder={defaults.referBtnUrl}
            value={(cardData.referBtnUrl as string) || ""}
            onValueChange={(value) => updateField("referBtnUrl", value)}
            className="bg-background border-border h-8 text-sm"
            debounceMs={300}
          />
        </div>
      </div>

      {/* Review Button */}
      <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>Botón de Reseñas</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Texto del botón</Label>
            <DebouncedInput
              placeholder={defaults.reviewBtnLabel}
              value={(cardData.reviewBtnLabel as string) || ""}
              onValueChange={(value) => updateField("reviewBtnLabel", value)}
              className="bg-background border-border h-8 text-sm"
              debounceMs={300}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Icono (FontAwesome)</Label>
            <DebouncedInput
              placeholder={defaults.reviewBtnIcon}
              value={(cardData.reviewBtnIcon as string) || ""}
              onValueChange={(value) => updateField("reviewBtnIcon", value)}
              className="bg-background border-border h-8 text-sm"
              debounceMs={300}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">URL del botón</Label>
          <DebouncedInput
            type="url"
            placeholder={defaults.reviewBtnUrl}
            value={(cardData.reviewBtnUrl as string) || ""}
            onValueChange={(value) => updateField("reviewBtnUrl", value)}
            className="bg-background border-border h-8 text-sm"
            debounceMs={300}
          />
        </div>
      </div>

      {/* Save Contact Button */}
      <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <UserCheck className="w-4 h-4 text-green-500" />
          <span>Botón de Guardar Contacto</span>
        </div>
        
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Texto del botón</Label>
          <DebouncedInput
            placeholder={defaults.saveContactBtnLabel}
            value={(cardData.saveContactBtnLabel as string) || ""}
            onValueChange={(value) => updateField("saveContactBtnLabel", value)}
            className="bg-background border-border h-8 text-sm"
            debounceMs={300}
          />
        </div>
      </div>

      {/* Bottom Buttons (Website/Share) */}
      <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <Globe className="w-4 h-4 text-blue-500" />
          <span>Botones Inferiores</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Texto "Website"</Label>
            <DebouncedInput
              placeholder={defaults.websiteBtnLabel}
              value={(cardData.websiteBtnLabel as string) || ""}
              onValueChange={(value) => updateField("websiteBtnLabel", value)}
              className="bg-background border-border h-8 text-sm"
              debounceMs={300}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Texto "Share"</Label>
            <DebouncedInput
              placeholder={defaults.shareBtnLabel}
              value={(cardData.shareBtnLabel as string) || ""}
              onValueChange={(value) => updateField("shareBtnLabel", value)}
              className="bg-background border-border h-8 text-sm"
              debounceMs={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
