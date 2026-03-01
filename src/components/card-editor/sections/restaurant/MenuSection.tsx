import { Upload, Loader2, X, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useCardData } from "@/hooks/useCardData";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useState, useRef } from "react";

export function MenuSection() {
  const { cardData, updateField } = useCardData();
  const { user } = useAuth();
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]);

  const menuItems = [
    { imageKey: "menuItem1Image", nameKey: "menuItem1Name", descKey: "menuItem1Desc", priceKey: "menuItem1Price", num: 1 },
    { imageKey: "menuItem2Image", nameKey: "menuItem2Name", descKey: "menuItem2Desc", priceKey: "menuItem2Price", num: 2 },
    { imageKey: "menuItem3Image", nameKey: "menuItem3Name", descKey: "menuItem3Desc", priceKey: "menuItem3Price", num: 3 },
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
        updateField(menuItems[index].imageKey, data.url);
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

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          Menú destacado
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Muestra tus 3 platillos estrella
        </p>
      </div>

      {/* Section Title */}
      <div className="space-y-2">
        <Label htmlFor="menuSectionTitle" className="text-foreground">
          Título de la sección
        </Label>
        <Input
          id="menuSectionTitle"
          placeholder="Featured Menu"
          value={getValue("menuSectionTitle")}
          onChange={(e) => updateField("menuSectionTitle", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Menu Items */}
      {menuItems.map((item, index) => (
        <div key={item.num} className="p-3 rounded-lg border border-border space-y-3">
          <p className="text-sm font-medium text-foreground">Platillo {item.num}</p>
          
          {/* Image */}
          <div className="flex gap-2">
            {getValue(item.imageKey) ? (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-border flex-shrink-0 group">
                <img 
                  src={getValue(item.imageKey)} 
                  alt={`Platillo ${item.num}`} 
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-0.5 right-0.5 w-4 h-4 opacity-0 group-hover:opacity-100"
                  onClick={() => updateField(item.imageKey, "")}
                >
                  <X className="w-2 h-2" />
                </Button>
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg border border-dashed border-border flex items-center justify-center flex-shrink-0">
                <input
                  ref={el => { fileInputRefs.current[index] = el; }}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(index, e)}
                  className="hidden"
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="w-8 h-8"
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
            
            <div className="flex-1 space-y-2">
              <Input
                placeholder="Nombre del platillo"
                value={getValue(item.nameKey)}
                onChange={(e) => updateField(item.nameKey, e.target.value)}
                className="bg-background border-border h-8 text-sm"
              />
              <Input
                placeholder="Descripción breve"
                value={getValue(item.descKey)}
                onChange={(e) => updateField(item.descKey, e.target.value)}
                className="bg-background border-border h-8 text-sm"
              />
            </div>
            
            <Input
              placeholder="$45"
              value={getValue(item.priceKey)}
              onChange={(e) => updateField(item.priceKey, e.target.value)}
              className="bg-background border-border w-16 h-8 text-sm"
            />
          </div>
        </div>
      ))}

      {/* Full Menu Button */}
      <div className="space-y-2 pt-2 border-t border-border">
        <Label className="text-foreground text-sm">Botón de menú completo</Label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="View Full Menu"
            value={getValue("fullMenuBtnLabel")}
            onChange={(e) => updateField("fullMenuBtnLabel", e.target.value)}
            className="bg-background border-border"
          />
          <Input
            placeholder="https://menu.com"
            value={getValue("fullMenuBtnUrl")}
            onChange={(e) => updateField("fullMenuBtnUrl", e.target.value)}
            className="bg-background border-border"
          />
        </div>
      </div>
    </div>
  );
}
