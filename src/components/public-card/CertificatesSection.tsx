import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Award, X } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  imageUrl: string;
}

interface CertificatesSectionProps {
  certificates?: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  if (!certificates || certificates.length === 0) return null;

  return (
    <div className="px-6 py-4">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        Certificados
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {certificates.map((cert) => (
          <Card
            key={cert.id}
            className="cursor-pointer hover:border-primary transition-colors bg-card border-border overflow-hidden"
            onClick={() => setSelectedCertificate(cert)}
          >
            <CardContent className="p-3">
              <div className="aspect-[4/3] rounded overflow-hidden bg-muted mb-2">
                {cert.imageUrl ? (
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Award className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-foreground truncate">
                {cert.title}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
        <DialogContent className="max-w-3xl p-0 bg-transparent border-none">
          <button
            onClick={() => setSelectedCertificate(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          {selectedCertificate && (
            <div className="bg-card rounded-lg overflow-hidden">
              <img
                src={selectedCertificate.imageUrl}
                alt={selectedCertificate.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
              <div className="p-4 border-t border-border">
                <p className="text-lg font-semibold text-foreground">
                  {selectedCertificate.title}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export type { Certificate };
