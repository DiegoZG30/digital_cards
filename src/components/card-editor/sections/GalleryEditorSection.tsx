import { useState, useRef } from "react";
import { Images, Upload, Loader2, X, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCardData } from "@/hooks/useCardData";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { getSectorDefaults } from "@/config/templateDefaults";

export function GalleryEditorSection() {
  const { cardData, updateField, selectedSector } = useCardData();
  const { user } = useAuth();
  const defaults = getSectorDefaults(selectedSector);
  
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Determine gallery size based on sector
  const getGallerySize = () => {
    switch (selectedSector) {
      case "restaurant": return 6;
      case "real-estate": return 4; // Listings with prices
      case "construction": return 8;
      case "cleaning": return 8;
      default: return 12;
    }
  };

  const gallerySize = getGallerySize();
  const isRealtor = selectedSector === "real-estate";

  const handleImageUpload = async (index: number, file: File) => {
    if (!user?.userId) {
      toast.error("Debes iniciar sesión para subir imágenes");
      return;
    }

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
        const fieldName = isRealtor ? `listing${index}Image` : `gallery${index}Image`;
        updateField(fieldName, data.url);
        toast.success("Imagen subida correctamente");
      }
    } catch (error) {
      console.error("Error uploading gallery image:", error);
      toast.error("Error al subir la imagen");
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(index, file);
    }
    e.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    const fieldName = isRealtor ? `listing${index}Image` : `gallery${index}Image`;
    updateField(fieldName, "");
    if (isRealtor) {
      updateField(`listing${index}Price`, "");
    }
  };

  const getImageValue = (index: number): string => {
    const fieldName = isRealtor ? `listing${index}Image` : `gallery${index}Image`;
    return (cardData[fieldName] as string) || "";
  };

  const getDefaultImage = (index: number): string => {
    const fieldName = isRealtor ? `listing${index}Image` : `gallery${index}Image`;
    return (defaults as unknown as Record<string, string>)[fieldName] || "";
  };

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <div className="space-y-2">
        <Label className="text-foreground">Título de la sección</Label>
        <Input
          placeholder={defaults.gallerySectionTitle}
          value={(cardData.gallerySectionTitle as string) || ""}
          onChange={(e) => updateField("gallerySectionTitle", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {isRealtor 
          ? "Sube fotos de tus propiedades destacadas con sus precios."
          : "Sube fotos de tu trabajo, productos o instalaciones."
        }
      </p>

      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: gallerySize }, (_, i) => i + 1).map((num) => {
          const imageUrl = getImageValue(num);
          const defaultImage = getDefaultImage(num);
          const displayUrl = imageUrl || defaultImage;
          const isUploading = uploadingIndex === num;

          return (
            <div key={num} className="space-y-2">
              <div className="relative aspect-square rounded-lg bg-muted border-2 border-dashed border-border overflow-hidden group">
                {displayUrl ? (
                  <>
                    <img 
                      src={displayUrl} 
                      alt={`Gallery ${num}`} 
                      className="w-full h-full object-cover"
                    />
                    {imageUrl && (
                      <button
                        onClick={() => handleRemoveImage(num)}
                        className="absolute top-1 right-1 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Images className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                
                {isUploading && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>

              <input
                ref={(el) => { fileInputRefs.current[num] = el; }}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(num, e)}
                className="hidden"
              />
              
              <Button 
                variant="outline" 
                size="sm"
                className="w-full h-7 text-xs"
                onClick={() => fileInputRefs.current[num]?.click()}
                disabled={isUploading || !user}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="w-3 h-3 mr-1" />
                    Imagen {num}
                  </>
                )}
              </Button>

              {/* Price input for realtor listings */}
              {isRealtor && (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-muted-foreground" />
                  <Input
                    placeholder={(defaults as unknown as Record<string, string>)[`listing${num}Price`] || "$0"}
                    value={(cardData[`listing${num}Price`] as string) || ""}
                    onChange={(e) => updateField(`listing${num}Price`, e.target.value)}
                    className="bg-background border-border h-7 text-xs"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!user && (
        <p className="text-xs text-destructive">
          Debes iniciar sesión para subir imágenes
        </p>
      )}
    </div>
  );
}
