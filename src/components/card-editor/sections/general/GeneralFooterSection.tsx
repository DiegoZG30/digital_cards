import { Award, CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function GeneralFooterSection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <Award className="w-4 h-4 text-primary" />
          Badge del footer
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Badge de verificación que aparece al final
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="footerBadgeIcon" className="text-foreground">
          Icono del badge
        </Label>
        <Input
          id="footerBadgeIcon"
          placeholder="fas fa-check-circle"
          value={getValue("footerBadgeIcon")}
          onChange={(e) => updateField("footerBadgeIcon", e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Clase de FontAwesome (ej: fas fa-check-circle)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="footerBadgeTitle" className="text-foreground flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Título del badge
        </Label>
        <Input
          id="footerBadgeTitle"
          placeholder="Verified Business"
          value={getValue("footerBadgeTitle")}
          onChange={(e) => updateField("footerBadgeTitle", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="footerBadgeSubtitle" className="text-foreground">
          Subtítulo del badge
        </Label>
        <Input
          id="footerBadgeSubtitle"
          placeholder="Trusted Professional"
          value={getValue("footerBadgeSubtitle")}
          onChange={(e) => updateField("footerBadgeSubtitle", e.target.value)}
          className="bg-background border-border"
        />
      </div>
    </div>
  );
}
