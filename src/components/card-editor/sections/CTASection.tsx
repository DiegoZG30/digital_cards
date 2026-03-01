import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MousePointer2, ExternalLink } from "lucide-react";

export function CTASection() {
  const [buttonText, setButtonText] = useState("");
  const [buttonUrl, setButtonUrl] = useState("");

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <MousePointer2 className="w-4 h-4 text-primary" />
          Botón principal de acción
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Este botón destacará en tu tarjeta para dirigir a tus visitantes a una acción específica
        </p>
      </div>

      {/* Button Text */}
      <div className="space-y-2">
        <Label htmlFor="ctaText" className="text-foreground">
          Texto del botón
        </Label>
        <Input
          id="ctaText"
          placeholder="Ej: Agenda una cita, Compra ahora, Contáctame"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Button URL */}
      <div className="space-y-2">
        <Label htmlFor="ctaUrl" className="text-foreground flex items-center gap-2">
          <ExternalLink className="w-4 h-4" />
          URL de destino
        </Label>
        <Input
          id="ctaUrl"
          placeholder="https://tu-link.com/agendar"
          value={buttonUrl}
          onChange={(e) => setButtonUrl(e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          A dónde llevará el botón cuando lo presionen
        </p>
      </div>

      {/* Preview */}
      {buttonText && (
        <div className="pt-2">
          <Label className="text-muted-foreground text-xs mb-2 block">Vista previa:</Label>
          <div className="flex justify-center">
            <div className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm shadow-lg">
              {buttonText || "Texto del botón"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
