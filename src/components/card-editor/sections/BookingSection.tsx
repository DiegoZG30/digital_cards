import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, ExternalLink, Maximize2 } from "lucide-react";
import { useCardData } from "@/hooks/useCardData";

export function BookingSection() {
  const { cardData, updateBookingUrl, updateBookingType } = useCardData();
  const { bookingUrl = "", bookingType = "external" } = cardData;

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Configura tu botón de reservas
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Conecta Calendly, Cal.com, GoHighLevel u otro servicio de agendamiento
        </p>
      </div>

      {/* Booking URL */}
      <div className="space-y-2">
        <Label htmlFor="bookingUrl" className="text-foreground">
          URL de tu calendario
        </Label>
        <Input
          id="bookingUrl"
          placeholder="https://calendly.com/tu-usuario"
          value={bookingUrl}
          onChange={(e) => updateBookingUrl(e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Pega el link de tu servicio de agendamiento
        </p>
      </div>

      {/* Booking Type */}
      <div className="space-y-3">
        <Label className="text-foreground">Comportamiento del botón</Label>
        <RadioGroup
          value={bookingType}
          onValueChange={(value) => updateBookingType(value as "popup" | "external")}
          className="space-y-2"
        >
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
            <RadioGroupItem value="popup" id="popup" />
            <Label htmlFor="popup" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-primary" />
                <span className="font-medium">Popup modal</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                El calendario se abre dentro de tu tarjeta
              </p>
            </Label>
          </div>
          
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
            <RadioGroupItem value="external" id="external" />
            <Label htmlFor="external" className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2">
                <ExternalLink className="w-4 h-4 text-primary" />
                <span className="font-medium">Link externo</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Se abre en una nueva pestaña del navegador
              </p>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Preview */}
      {bookingUrl && (
        <div className="pt-2">
          <Label className="text-muted-foreground text-xs mb-2 block">Vista previa del botón:</Label>
          <div className="flex justify-center">
            <div className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium text-sm shadow-lg flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Book Now
              {bookingType === "external" && <ExternalLink className="w-3 h-3" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
