import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCardData } from "@/hooks/useCardData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function BackgroundSection() {
  const { cardData, updateBackgroundImage, updateCtaButtonText } = useCardData();
  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Solo se permiten archivos de imagen");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("La imagen debe ser menor a 5MB");
      return;
    }

    setIsUploading(true);
    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/background-${Date.now()}.${fileExt}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("card-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL with cache-busting timestamp
      const { data: urlData } = supabase.storage
        .from("card-images")
        .getPublicUrl(fileName);

      if (urlData?.publicUrl) {
        // Add cache-busting query param to force browser refresh
        const versionedUrl = `${urlData.publicUrl}?v=${Date.now()}`;
        updateBackgroundImage(versionedUrl);
        toast.success("Imagen subida correctamente");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveImage = () => {
    updateBackgroundImage("");
  };

  return (
    <div className="space-y-4">
      {/* Background Image */}
      <div className="space-y-2">
        <Label htmlFor="backgroundImage" className="text-foreground flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-primary" />
          Imagen de fondo
        </Label>
        
        {/* Preview */}
        {cardData.backgroundImage && (
          <div className="relative h-24 rounded-lg overflow-hidden border border-border group">
            <img 
              src={cardData.backgroundImage} 
              alt="Background preview" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemoveImage}
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        )}

        {/* URL Input */}
        <Input
          id="backgroundImage"
          placeholder="https://images.unsplash.com/..."
          value={cardData.backgroundImage || ""}
          onChange={(e) => updateBackgroundImage(e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Pega una URL o sube una imagen de fondo
        </p>
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
          variant="gold-outline" 
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

      {!user && (
        <p className="text-xs text-destructive text-center">
          Debes iniciar sesión para subir imágenes
        </p>
      )}

      {/* CTA Button Text */}
      <div className="space-y-2 pt-4 border-t border-border">
        <Label htmlFor="ctaButtonText" className="text-foreground">
          Texto del botón principal
        </Label>
        <Input
          id="ctaButtonText"
          placeholder="Book Now, Agendar, Free Quote..."
          value={cardData.ctaButtonText || "Book Now"}
          onChange={(e) => updateCtaButtonText(e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          El texto que aparecerá en el botón de acción principal
        </p>
      </div>
    </div>
  );
}
