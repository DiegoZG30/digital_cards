import { 
  Phone, 
  MessageCircle, 
  Mail, 
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { usePlan } from "@/hooks/usePlan";
import { useCardData } from "@/hooks/useCardData";
import { toast } from "sonner";
import { contactSchema, getValidationError } from "@/lib/validations";

export function ContactButtonsSection() {
  const { isPro } = usePlan();
  const { cardData, updateContact } = useCardData();
  const { contact } = cardData;

  return (
    <div className="space-y-4">
      {/* Phone */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Phone className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <Label className="text-foreground text-sm">Llamar</Label>
          <Input
            placeholder="+52 123 456 7890"
            value={contact.phone || ""}
            onChange={(e) => {
              const value = e.target.value;
              const error = getValidationError(contactSchema.shape.phone, value);
              if (error && value !== "") {
                toast.error(error);
              }
              updateContact("phone", value);
            }}
            className="bg-background border-border mt-1 h-8 text-sm"
          />
        </div>
      </div>

      {/* WhatsApp */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-green-500" />
        </div>
        <div className="flex-1 min-w-0">
          <Label className="text-foreground text-sm">WhatsApp</Label>
          <Input
            placeholder="+52 123 456 7890"
            value={contact.whatsapp || ""}
            onChange={(e) => {
              const value = e.target.value;
              const error = getValidationError(contactSchema.shape.whatsapp, value);
              if (error && value !== "") {
                toast.error(error);
              }
              updateContact("whatsapp", value);
            }}
            className="bg-background border-border mt-1 h-8 text-sm"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
          <Mail className="w-5 h-5 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <Label className="text-foreground text-sm">Email</Label>
          <Input
            type="email"
            placeholder="tu@email.com"
            value={contact.email || ""}
            onChange={(e) => {
              const value = e.target.value;
              const error = getValidationError(contactSchema.shape.email, value);
              if (error && value !== "") {
                toast.error(error);
              }
              updateContact("email", value);
            }}
            className="bg-background border-border mt-1 h-8 text-sm"
          />
        </div>
      </div>

      {/* Pro Upgrade Banner (only if not Pro) */}
      {!isPro && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-foreground text-sm font-medium">
                🚀 Desbloquea más botones con Pro
              </p>
              <p className="text-muted-foreground text-xs mt-1">
                SMS, Maps, Reviews, y Refer Us
              </p>
              <Button variant="gold" size="sm" className="mt-3">
                Ver planes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
