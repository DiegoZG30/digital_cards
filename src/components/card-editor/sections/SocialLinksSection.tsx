import { Instagram, Facebook, Linkedin, Twitter, Youtube, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";
import { getSectorDefaults } from "@/config/templateDefaults";
import { toast } from "sonner";
import { websiteUrlSchema, socialSchema, getValidationError } from "@/lib/validations";

const socialNetworks = [
  { key: "instagram" as const, label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/tu-perfil", color: "text-pink-500" },
  { key: "facebook" as const, label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/tu-pagina", color: "text-blue-600" },
  { key: "linkedin" as const, label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/tu-perfil", color: "text-blue-500" },
  { key: "twitter" as const, label: "Twitter/X", icon: Twitter, placeholder: "https://twitter.com/tu-usuario", color: "text-sky-500" },
  { key: "youtube" as const, label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@tu-canal", color: "text-red-500" },
  { key: "tiktok" as const, label: "TikTok", icon: () => <span className="text-sm font-bold">TT</span>, placeholder: "https://tiktok.com/@tu-usuario", color: "text-foreground" },
];

export function SocialLinksSection() {
  const { cardData, updateSocial, updateWebsiteUrl, selectedSector } = useCardData();
  const { social } = cardData;
  const defaults = getSectorDefaults(selectedSector);

  return (
    <div className="space-y-4">
      {/* Website URL - most important */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <Label className="text-foreground text-sm font-medium">Sitio Web</Label>
          <Input
            type="url"
            placeholder={defaults.websiteUrl}
            value={cardData.websiteUrl || ""}
            onChange={(e) => {
              const value = e.target.value;
              const error = getValidationError(websiteUrlSchema, value);
              if (error && value !== "") {
                toast.error(error);
              }
              updateWebsiteUrl(value);
            }}
            className="bg-background border-border mt-1 h-8 text-sm"
          />
        </div>
      </div>

      {/* Social Networks */}
      {socialNetworks.map((network) => {
        const Icon = network.icon;
        return (
          <div key={network.key} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border">
            <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 ${network.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <Label className="text-foreground text-sm">{network.label}</Label>
              <Input
                type="url"
                placeholder={network.placeholder}
                value={social[network.key] || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  const error = getValidationError(socialSchema.shape[network.key], value);
                  if (error && value !== "") {
                    toast.error(error);
                  }
                  updateSocial(network.key, value);
                }}
                className="bg-background border-border mt-1 h-8 text-sm"
              />
            </div>
          </div>
        );
      })}

      <p className="text-xs text-muted-foreground text-center">
        Solo se mostrarán las redes con URL configurada
      </p>
    </div>
  );
}
