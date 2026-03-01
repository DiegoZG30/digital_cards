import { useState } from "react";
import { QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface CardFooterProps {
  username: string;
  fullName: string;
  phone?: string;
  email?: string;
  jobTitle?: string;
}

export function CardFooter({ username, fullName, phone, email, jobTitle }: CardFooterProps) {
  const [showQR, setShowQR] = useState(false);

  const publicUrl = `${window.location.origin}/${username}`;
  
  // Generate QR code URL using a free QR API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(publicUrl)}`;

  const handleDownloadVCF = () => {
    const vcfContent = `BEGIN:VCARD
VERSION:3.0
FN:${fullName}
${jobTitle ? `TITLE:${jobTitle}` : ""}
${phone ? `TEL;TYPE=CELL:${phone}` : ""}
${email ? `EMAIL:${email}` : ""}
URL:${publicUrl}
END:VCARD`;

    const blob = new Blob([vcfContent], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fullName.replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="px-6 py-6 border-t border-border">
      <div className="flex justify-center gap-4">
        <Button
          variant="gold-outline"
          size="lg"
          onClick={() => setShowQR(true)}
          className="flex-1 max-w-[140px]"
        >
          <QrCode className="h-4 w-4 mr-2" />
          QR Code
        </Button>
        <Button
          variant="gold"
          size="lg"
          onClick={handleDownloadVCF}
          className="flex-1 max-w-[140px]"
        >
          <Download className="h-4 w-4 mr-2" />
          Guardar
        </Button>
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Powered by <span className="text-primary font-semibold">Biztec</span>
      </p>

      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Código QR</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center p-4">
            <div className="bg-white p-4 rounded-lg">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-64 h-64"
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Escanea para ver la tarjeta digital
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
