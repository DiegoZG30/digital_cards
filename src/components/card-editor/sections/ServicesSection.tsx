import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCardData } from "@/hooks/useCardData";

// Common FontAwesome icons for services
const ICON_OPTIONS = [
  { value: "fa-utensils", label: "Restaurante", category: "food" },
  { value: "fa-pizza-slice", label: "Pizza", category: "food" },
  { value: "fa-burger", label: "Hamburguesa", category: "food" },
  { value: "fa-coffee", label: "Café", category: "food" },
  { value: "fa-wine-glass", label: "Vino", category: "food" },
  { value: "fa-cocktail", label: "Cóctel", category: "food" },
  { value: "fa-ice-cream", label: "Helado", category: "food" },
  { value: "fa-cake-candles", label: "Pastel", category: "food" },
  { value: "fa-hammer", label: "Martillo", category: "construction" },
  { value: "fa-wrench", label: "Llave", category: "construction" },
  { value: "fa-paint-roller", label: "Pintura", category: "construction" },
  { value: "fa-hard-hat", label: "Casco", category: "construction" },
  { value: "fa-home", label: "Casa", category: "real-estate" },
  { value: "fa-building", label: "Edificio", category: "real-estate" },
  { value: "fa-key", label: "Llave", category: "real-estate" },
  { value: "fa-door-open", label: "Puerta", category: "real-estate" },
  { value: "fa-broom", label: "Escoba", category: "cleaning" },
  { value: "fa-spray-can-sparkles", label: "Spray", category: "cleaning" },
  { value: "fa-soap", label: "Jabón", category: "cleaning" },
  { value: "fa-bucket", label: "Cubeta", category: "cleaning" },
  { value: "fa-bath", label: "Baño", category: "general" },
  { value: "fa-car", label: "Auto", category: "general" },
  { value: "fa-phone", label: "Teléfono", category: "general" },
  { value: "fa-star", label: "Estrella", category: "general" },
  { value: "fa-heart", label: "Corazón", category: "general" },
  { value: "fa-check", label: "Check", category: "general" },
  { value: "fa-tools", label: "Herramientas", category: "general" },
  { value: "fa-cog", label: "Engranaje", category: "general" },
  { value: "fa-leaf", label: "Hoja", category: "general" },
  { value: "fa-tree", label: "Árbol", category: "general" },
  { value: "fa-warehouse", label: "Bodega", category: "general" },
  { value: "fa-truck", label: "Camión", category: "general" },
  { value: "fa-layer-group", label: "Capas", category: "general" },
];

export function ServicesSection() {
  const { cardData, updateSectionTitle, updateServices } = useCardData();
  const services = cardData.services || [];
  const sectionTitle = cardData.sectionTitle || "Servicios";
  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceIcon, setNewServiceIcon] = useState("fa-star");

  const handleAddService = () => {
    if (!newServiceName.trim()) return;
    
    const newService = {
      icon: newServiceIcon,
      name: newServiceName.trim(),
    };
    
    updateServices([...services, newService]);
    setNewServiceName("");
    setNewServiceIcon("fa-star");
  };

  const handleRemoveService = (index: number) => {
    updateServices(services.filter((_, i) => i !== index));
  };

  const handleUpdateService = (index: number, field: "icon" | "name", value: string) => {
    const updated = services.map((s, i) => 
      i === index ? { ...s, [field]: value } : s
    );
    updateServices(updated);
  };

  return (
    <div className="space-y-4">
      {/* Section Title */}
      <div className="space-y-2">
        <Label htmlFor="sectionTitle" className="text-foreground">
          Título de la sección
        </Label>
        <Input
          id="sectionTitle"
          placeholder="Servicios, Menú, Our Services..."
          value={sectionTitle}
          onChange={(e) => updateSectionTitle(e.target.value)}
          className="bg-background border-border"
        />
        <p className="text-xs text-muted-foreground">
          Este título aparecerá sobre la lista de servicios
        </p>
      </div>

      {/* Existing Services */}
      {services.length > 0 && (
        <div className="space-y-2">
          <Label className="text-foreground">Servicios actuales</Label>
          <div className="space-y-2">
            {services.map((service, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border"
              >
                <div className="cursor-grab text-muted-foreground">
                  <GripVertical className="w-4 h-4" />
                </div>
                
                <Select
                  value={service.icon}
                  onValueChange={(value) => handleUpdateService(index, "icon", value)}
                >
                  <SelectTrigger className="w-[100px] bg-background">
                    <i className={`fas ${service.icon}`}></i>
                  </SelectTrigger>
                  <SelectContent>
                    {ICON_OPTIONS.map((icon) => (
                      <SelectItem key={icon.value} value={icon.value}>
                        <div className="flex items-center gap-2">
                          <i className={`fas ${icon.value}`}></i>
                          <span>{icon.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  value={service.name}
                  onChange={(e) => handleUpdateService(index, "name", e.target.value)}
                  className="flex-1 bg-background border-border"
                  placeholder="Nombre del servicio"
                />

                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveService(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Service */}
      <div className="space-y-2 p-3 rounded-lg border border-dashed border-border">
        <Label className="text-foreground text-sm">Agregar servicio</Label>
        <div className="flex items-center gap-2">
          <Select
            value={newServiceIcon}
            onValueChange={setNewServiceIcon}
          >
            <SelectTrigger className="w-[100px] bg-background">
              <i className={`fas ${newServiceIcon}`}></i>
            </SelectTrigger>
            <SelectContent>
              {ICON_OPTIONS.map((icon) => (
                <SelectItem key={icon.value} value={icon.value}>
                  <div className="flex items-center gap-2">
                    <i className={`fas ${icon.value}`}></i>
                    <span>{icon.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
            className="flex-1 bg-background border-border"
            placeholder="Nombre del servicio"
            onKeyDown={(e) => e.key === "Enter" && handleAddService()}
          />

          <Button 
            variant="gold"
            size="icon"
            onClick={handleAddService}
            disabled={!newServiceName.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Máximo 12 servicios • Arrastra para reordenar
      </p>
    </div>
  );
}
