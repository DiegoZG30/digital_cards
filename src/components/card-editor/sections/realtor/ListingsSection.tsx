import { useState, useRef } from "react";
import { Upload, Home, Loader2, X, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCardData } from "@/hooks/useCardData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function ListingsSection() {
  const { cardData, updateField } = useCardData();
  const { user } = useAuth();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);

  const listings = [
    { imageKey: "listing1Image", priceKey: "listing1Price", num: 1, pricePlaceholder: "$450,000" },
    { imageKey: "listing2Image", priceKey: "listing2Price", num: 2, pricePlaceholder: "$680,000" },
    { imageKey: "listing3Image", priceKey: "listing3Price", num: 3, pricePlaceholder: "$925,000" },
    { imageKey: "listing4Image", priceKey: "listing4Price", num: 4, pricePlaceholder: "$1,200,000" },
  ];

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  const handleFileSelect = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

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
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/listing-${index + 1}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("card-images")
        .upload(fileName, file, { cacheControl: "3600", upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("card-images").getPublicUrl(fileName);

      if (urlData?.publicUrl) {
        const versionedUrl = `${urlData.publicUrl}?v=${Date.now()}`;
        updateField(listings[index].imageKey, versionedUrl);
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

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <Home className="w-4 h-4 text-primary" />
          Propiedades destacadas
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Muestra tus 4 propiedades más atractivas
        </p>
      </div>

      {/* Section Title */}
      <div className="space-y-2">
        <Label htmlFor="gallerySectionTitle" className="text-foreground">
          Título de la sección
        </Label>
        <Input
          id="gallerySectionTitle"
          placeholder="Featured Properties"
          value={getValue("gallerySectionTitle")}
          onChange={(e) => updateField("gallerySectionTitle", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-2 gap-3">
        {listings.map((listing, index) => (
          <div key={listing.num} className="space-y-2 p-2 rounded-lg border border-border">
            {/* Image */}
            {getValue(listing.imageKey) ? (
              <div className="relative h-24 rounded-lg overflow-hidden group">
                <img 
                  src={getValue(listing.imageKey)} 
                  alt={`Propiedad ${listing.num}`} 
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-1 right-1 w-5 h-5 opacity-0 group-hover:opacity-100"
                  onClick={() => updateField(listing.imageKey, "")}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ) : (
              <div className="h-24 rounded-lg border border-dashed border-border flex items-center justify-center">
                <input
                  ref={el => fileInputRefs.current[index] = el}
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
                    <>
                      <Upload className="w-4 h-4 mr-1" />
                      <span className="text-xs">Subir</span>
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Price */}
            <div className="relative">
              <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted-foreground" />
              <Input
                placeholder={listing.pricePlaceholder}
                value={getValue(listing.priceKey)}
                onChange={(e) => updateField(listing.priceKey, e.target.value)}
                className="bg-background border-border h-8 text-sm pl-6"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
