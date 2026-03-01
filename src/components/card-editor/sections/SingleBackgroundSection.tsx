import { Upload, Image as ImageIcon, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCardData } from "@/hooks/useCardData";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useState, useRef } from "react";

export function SingleBackgroundSection() {
  const { cardData, updateField } = useCardData();
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      if (data.url) {
        updateField("backgroundImage", data.url);
        toast.success("Imagen subida correctamente");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" />
          Imagen de fondo
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Imagen principal que aparece detrás de tu perfil
        </p>
      </div>

      {/* Preview */}
      {getValue("backgroundImage") && (
        <div className="relative h-32 rounded-lg overflow-hidden border border-border group">
          <img 
            src={getValue("backgroundImage")} 
            alt="Background preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => updateField("backgroundImage", "")}
          >
            <X className="w-3 h-3" />
          </Button>
        </div>
      )}

      {/* URL Input */}
      <div className="space-y-2">
        <Label htmlFor="backgroundImage" className="text-foreground">
          URL de la imagen
        </Label>
        <Input
          id="backgroundImage"
          placeholder="https://images.unsplash.com/..."
          value={getValue("backgroundImage")}
          onChange={(e) => updateField("backgroundImage", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Upload Button */}
      <div className="flex justify-center">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || !user}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Subiendo...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Subir imagen
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
