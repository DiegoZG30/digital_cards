import { Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";
import { getSectorDefaults } from "@/config/templateDefaults";

export function CertificationsEditorSection() {
  const { cardData, updateField, selectedSector } = useCardData();
  const defaults = getSectorDefaults(selectedSector);

  const certifications = [
    { 
      num: 1, 
      icon: (cardData.cert1Icon as string) || "", 
      line1: (cardData.cert1Line1 as string) || "", 
      line2: (cardData.cert1Line2 as string) || "",
      defaultIcon: defaults.cert1Icon,
      defaultLine1: defaults.cert1Line1,
      defaultLine2: defaults.cert1Line2,
    },
    { 
      num: 2, 
      icon: (cardData.cert2Icon as string) || "", 
      line1: (cardData.cert2Line1 as string) || "", 
      line2: (cardData.cert2Line2 as string) || "",
      defaultIcon: defaults.cert2Icon,
      defaultLine1: defaults.cert2Line1,
      defaultLine2: defaults.cert2Line2,
    },
    { 
      num: 3, 
      icon: (cardData.cert3Icon as string) || "", 
      line1: (cardData.cert3Line1 as string) || "", 
      line2: (cardData.cert3Line2 as string) || "",
      defaultIcon: defaults.cert3Icon,
      defaultLine1: defaults.cert3Line1,
      defaultLine2: defaults.cert3Line2,
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Muestra hasta 3 certificaciones, licencias o badges que generen confianza.
      </p>

      {certifications.map((cert) => (
        <div 
          key={cert.num} 
          className="space-y-3 p-4 rounded-lg bg-muted/30 border border-border"
        >
          <div className="flex items-center gap-2 text-foreground font-medium">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Certificación {cert.num}</span>
          </div>
          
          <div className="space-y-3">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">
                Icono (FontAwesome, ej: fas fa-award)
              </Label>
              <Input
                placeholder={cert.defaultIcon}
                value={cert.icon}
                onChange={(e) => updateField(`cert${cert.num}Icon`, e.target.value)}
                className="bg-background border-border h-8 text-sm"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Línea 1 (título)</Label>
                <Input
                  placeholder={cert.defaultLine1}
                  value={cert.line1}
                  onChange={(e) => updateField(`cert${cert.num}Line1`, e.target.value)}
                  className="bg-background border-border h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Línea 2 (subtítulo)</Label>
                <Input
                  placeholder={cert.defaultLine2}
                  value={cert.line2}
                  onChange={(e) => updateField(`cert${cert.num}Line2`, e.target.value)}
                  className="bg-background border-border h-8 text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <p className="text-xs text-muted-foreground italic">
        Ejemplos de iconos: fas fa-certificate, fas fa-award, fas fa-shield-halved, fas fa-star, fas fa-trophy, fas fa-medal
      </p>
    </div>
  );
}
