import { Globe, Share2, CreditCard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";
import { getSectorDefaults } from "@/config/templateDefaults";

export function BottomButtonsSection() {
  const { cardData, updateField, selectedSector } = useCardData();
  const defaults = getSectorDefaults(selectedSector);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Personaliza los botones que aparecen en la parte inferior de tu tarjeta.
      </p>

      {/* Website Button */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
          <Globe className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <Label className="text-foreground text-sm">Botón de Website</Label>
          <Input
            placeholder={defaults.websiteBtnLabel}
            value={(cardData.websiteBtnLabel as string) || ""}
            onChange={(e) => updateField("websiteBtnLabel", e.target.value)}
            className="bg-background border-border mt-1 h-8 text-sm"
          />
        </div>
      </div>

      {/* Share Button */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
          <Share2 className="w-5 h-5 text-purple-500" />
        </div>
        <div className="flex-1 min-w-0">
          <Label className="text-foreground text-sm">Botón de Compartir</Label>
          <Input
            placeholder={defaults.shareBtnLabel}
            value={(cardData.shareBtnLabel as string) || ""}
            onChange={(e) => updateField("shareBtnLabel", e.target.value)}
            className="bg-background border-border mt-1 h-8 text-sm"
          />
        </div>
      </div>

      {/* Share Info Button */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
          <Share2 className="w-5 h-5 text-green-500" />
        </div>
        <div className="flex-1 min-w-0">
          <Label className="text-foreground text-sm">Botón Compartir Info</Label>
          <Input
            placeholder={defaults.shareInfoBtnLabel}
            value={(cardData.shareInfoBtnLabel as string) || ""}
            onChange={(e) => updateField("shareInfoBtnLabel", e.target.value)}
            className="bg-background border-border mt-1 h-8 text-sm"
          />
        </div>
      </div>

      {/* Get Card Button */}
      <div className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border">
        <div className="flex items-center gap-2 text-foreground font-medium">
          <CreditCard className="w-4 h-4 text-primary" />
          <span>Botón "Obtener Tarjeta"</span>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Texto del botón</Label>
            <Input
              placeholder={defaults.getCardBtnLabel}
              value={(cardData.getCardBtnLabel as string) || ""}
              onChange={(e) => updateField("getCardBtnLabel", e.target.value)}
              className="bg-background border-border h-8 text-sm"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">URL</Label>
            <Input
              type="url"
              placeholder={defaults.getCardUrl}
              value={(cardData.getCardUrl as string) || ""}
              onChange={(e) => updateField("getCardUrl", e.target.value)}
              className="bg-background border-border h-8 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
