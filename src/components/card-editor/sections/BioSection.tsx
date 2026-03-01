import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function BioSection() {
  const { cardData, updateBio } = useCardData();
  const maxLength = 300;
  const currentLength = cardData.bio?.length || 0;

  return (
    <div className="space-y-2">
      <Label htmlFor="bio" className="text-foreground">
        Biografía
      </Label>
      <Textarea
        id="bio"
        placeholder="Cuéntale al mundo sobre ti, tu experiencia y lo que haces..."
        className="bg-background border-border min-h-[120px] resize-none"
        maxLength={maxLength}
        value={cardData.bio || ""}
        onChange={(e) => updateBio(e.target.value)}
      />
      <p className="text-xs text-muted-foreground text-right">
        {currentLength}/{maxLength} caracteres
      </p>
    </div>
  );
}
