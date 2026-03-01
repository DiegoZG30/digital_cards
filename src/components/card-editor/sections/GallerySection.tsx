import { useState, useRef } from "react";
import { Trash2, Image, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useCardData } from "@/hooks/useCardData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const MAX_IMAGES = 30;

export function GallerySection() {
  const { cardData, addGalleryImage, removeGalleryImage } = useCardData();
  const { user } = useAuth();
  const images = cardData.gallery || [];
  
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user?.id) return;

    const filesToUpload = Array.from(files).slice(0, MAX_IMAGES - images.length);
    
    if (filesToUpload.length === 0) {
      toast.error(`Máximo ${MAX_IMAGES} imágenes permitidas`);
      return;
    }

    setIsUploading(true);
    try {
      for (const file of filesToUpload) {
        if (!file.type.startsWith("image/")) continue;
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} es muy grande (máx 5MB)`);
          continue;
        }

        const fileExt = file.name.split(".").pop();
        const fileName = `${user.id}/gallery-${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("card-images")
          .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Upload error:", uploadError);
          continue;
        }

        const { data: urlData } = supabase.storage
          .from("card-images")
          .getPublicUrl(fileName);

        if (urlData?.publicUrl) {
          const versionedUrl = `${urlData.publicUrl}?v=${Date.now()}`;
          addGalleryImage({ imageUrl: versionedUrl, caption: "" });
        }
      }
      toast.success("Imágenes subidas correctamente");
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error("Error al subir imágenes");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDelete = (index: number) => {
    removeGalleryImage(index);
  };

  const canAddMore = images.length < MAX_IMAGES;

  return (
    <div className="space-y-4">
      {/* Counter */}
      <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
        <span className="text-xs text-muted-foreground">Imágenes</span>
        <span className={`text-xs font-medium ${images.length >= MAX_IMAGES ? 'text-destructive' : 'text-foreground'}`}>
          {images.length}/{MAX_IMAGES}
        </span>
      </div>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {images.map((image, index) => (
            <Card key={index} className="bg-background border-border overflow-hidden relative group">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  {image.imageUrl ? (
                    <img 
                      src={image.imageUrl} 
                      alt={image.caption || "Gallery image"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <Image className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Delete overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white hover:text-destructive hover:bg-white/20"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Upload button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleUpload}
        className="hidden"
      />
      
      <Button 
        variant="gold-outline" 
        size="sm" 
        className="w-full"
        disabled={!canAddMore || isUploading || !user}
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Subiendo...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Subir imágenes
          </>
        )}
      </Button>

      {!user && (
        <p className="text-xs text-destructive text-center">
          Debes iniciar sesión para subir imágenes
        </p>
      )}

      <p className="text-xs text-muted-foreground text-center">
        Máximo {MAX_IMAGES} imágenes • 5MB por imagen
      </p>
    </div>
  );
}
