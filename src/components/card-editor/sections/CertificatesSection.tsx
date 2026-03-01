import { useState } from "react";
import { Trash2, Award, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Certificate {
  id: number;
  title: string;
  imageUrl: string | null;
}

export function CertificatesSection() {
  const [licensesText, setLicensesText] = useState("");
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: 1,
      title: "Certificación Google Ads",
      imageUrl: null,
    },
    {
      id: 2,
      title: "MBA Universidad de México",
      imageUrl: null,
    },
  ]);

  const deleteCertificate = (id: number) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
  };

  return (
    <div className="space-y-4">
      {/* Licenses Text */}
      <div className="space-y-2">
        <Label htmlFor="licenses" className="text-foreground">
          Licencias y certificaciones (texto)
        </Label>
        <Textarea
          id="licenses"
          placeholder="Ej: Licencia profesional #12345, Certificación ISO 9001..."
          value={licensesText}
          onChange={(e) => setLicensesText(e.target.value)}
          className="bg-background border-border min-h-[80px] resize-none"
        />
        <p className="text-xs text-muted-foreground">
          Describe tus licencias, credenciales o certificaciones en texto
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-border pt-4">
        <Label className="text-foreground">Imágenes de certificados</Label>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-2 gap-3">
        {certificates.map((cert) => (
          <Card key={cert.id} className="bg-background border-border group relative overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                {cert.imageUrl ? (
                  <img 
                    src={cert.imageUrl} 
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Award className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <div className="p-2">
                <p className="text-xs text-foreground truncate">{cert.title}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 bg-destructive/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteCertificate(cert.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button variant="gold-outline" size="sm" className="w-full">
        <Upload className="w-4 h-4 mr-2" />
        Subir certificado
      </Button>
    </div>
  );
}
