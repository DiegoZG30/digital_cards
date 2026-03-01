import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCardData } from "@/hooks/useCardData";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

export function BackgroundImagesSection() {
  const { cardData, updateField } = useCardData();
  const { user } = useAuth();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);

  const bgImages = [
    { key: "bgImage1", label: "Imagen de fondo 1" },
    { key: "bgImage2", label: "Imagen de fondo 2" },
    { key: "bgImage3", label: "Imagen de fondo 3" },
    { key: "bgImage4", label: "Imagen de fondo 4" },
  ];

  const handleFileSelect = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.userId) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen debe ser menor a 5MB");
      return;
    }

    setUploadingIndex(index);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      if (data.url) {
        updateField(bgImages[index].key, data.url);
        toast.success("Imagen subida correctamente");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setUploadingIndex(null);
      if (fileInputRefs.current[index]) {
        fileInputRefs.current[index]!.value = "";
      }
    }
  };

  const handleRemoveImage = (key: string) => {
    updateField(key, "");
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" />
          Imágenes de fondo animadas
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          El restaurante muestra 4 imágenes que se alternan automáticamente
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {bgImages.map((img, index) => (
          <div key={img.key} className="space-y-2">
            <Label className="text-foreground text-xs">{img.label}</Label>
            
            {(cardData as Record<string, unknown>)[img.key] ? (
              <div className="relative h-20 rounded-lg overflow-hidden border border-border group">
                <img 
                  src={(cardData as Record<string, unknown>)[img.key] as string} 
                  alt={img.label} 
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(img.key)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div className="h-20 rounded-lg border border-dashed border-border flex items-center justify-center">
                <input
                  ref={el => { fileInputRefs.current[index] = el; }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(index, e)}
                  className="hidden"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => fileInputRefs.current[index]?.click()}
                  disabled={uploadingIndex === index || !user}
                >
                  {uploadingIndex === index ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4" />
                  )}
                </Button>
              </div>
            )}

            <Input
              placeholder="https://..."
              value={((cardData as Record<string, unknown>)[img.key] as string) || ""}
              onChange={(e) => updateField(img.key, e.target.value)}
              className="bg-background border-border text-xs h-8"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
