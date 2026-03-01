import { Calendar, ExternalLink, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function RealtorCTASection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Botón de agendar cita
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Configura el botón principal para agendar visitas
        </p>
      </div>

      {/* Schedule Button */}
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="bookBtnLabel" className="text-foreground">
            Texto del botón
          </Label>
          <Input
            id="bookBtnLabel"
            placeholder="Schedule Showing"
            value={getValue("bookBtnLabel")}
            onChange={(e) => updateField("bookBtnLabel", e.target.value)}
            className="bg-background border-border"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="scheduleBtnUrl" className="text-foreground flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            URL de agenda
          </Label>
          <Input
            id="scheduleBtnUrl"
            placeholder="https://calendly.com/tu-calendario"
            value={getValue("scheduleBtnUrl")}
            onChange={(e) => updateField("scheduleBtnUrl", e.target.value)}
            className="bg-background border-border"
          />
        </div>
      </div>

      {/* Languages Badge */}
      <div className="space-y-2 pt-3 border-t border-border">
        <Label htmlFor="languagesBadge" className="text-foreground flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Badge de idiomas
        </Label>
        <Input
          id="languagesBadge"
          placeholder="English | Spanish"
          value={getValue("languagesBadge")}
          onChange={(e) => updateField("languagesBadge", e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Idiomas que hablas, aparece debajo del nombre
        </p>
      </div>
    </div>
  );
}
