import { Phone, MessageCircle, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactButtonsProps {
  phone?: string;
  whatsapp?: string;
  email?: string;
  onTrackClick?: (buttonName: string) => void;
}

export function ContactButtons({ phone, whatsapp, email, onTrackClick }: ContactButtonsProps) {
  const hasAnyContact = phone || whatsapp || email;

  if (!hasAnyContact) return null;

  const handleCall = () => {
    onTrackClick?.("phone");
    if (phone) window.open(`tel:${phone}`, "_self");
  };

  const handleWhatsApp = () => {
    onTrackClick?.("whatsapp");
    if (whatsapp) {
      const cleanNumber = whatsapp.replace(/\D/g, "");
      window.open(`https://wa.me/${cleanNumber}`, "_blank");
    }
  };

  const handleEmail = () => {
    onTrackClick?.("email");
    if (email) window.open(`mailto:${email}`, "_self");
  };

  const handleSMS = () => {
    onTrackClick?.("sms");
    if (phone) window.open(`sms:${phone}`, "_self");
  };

  return (
    <div className="px-6 py-4">
      <div className="flex justify-center gap-3 flex-wrap">
        {phone && (
          <Button
            variant="contact"
            size="icon-lg"
            onClick={handleCall}
            aria-label="Call"
          >
            <Phone className="h-5 w-5" />
          </Button>
        )}
        {whatsapp && (
          <Button
            variant="contact"
            size="icon-lg"
            onClick={handleWhatsApp}
            aria-label="WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </Button>
        )}
        {email && (
          <Button
            variant="contact"
            size="icon-lg"
            onClick={handleEmail}
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </Button>
        )}
        {phone && (
          <Button
            variant="contact"
            size="icon-lg"
            onClick={handleSMS}
            aria-label="SMS"
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
