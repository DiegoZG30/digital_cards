import { Briefcase, Home, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCardData } from "@/hooks/useCardData";

export function RealtorServicesSection() {
  const { cardData, updateField } = useCardData();

  const getValue = (key: string): string => {
    return ((cardData as Record<string, unknown>)[key] as string) || "";
  };

  const buyerServices = [
    { key: "buyerService1Name", placeholder: "Property Search" },
    { key: "buyerService2Name", placeholder: "Market Analysis" },
    { key: "buyerService3Name", placeholder: "Negotiation" },
    { key: "buyerService4Name", placeholder: "Financing Help" },
    { key: "buyerService5Name", placeholder: "Home Inspection" },
    { key: "buyerService6Name", placeholder: "Closing Support" },
  ];

  const sellerServices = [
    { key: "sellerService1Name", placeholder: "Home Valuation" },
    { key: "sellerService2Name", placeholder: "Staging Advice" },
    { key: "sellerService3Name", placeholder: "Professional Photos" },
    { key: "sellerService4Name", placeholder: "MLS Listing" },
    { key: "sellerService5Name", placeholder: "Open Houses" },
    { key: "sellerService6Name", placeholder: "Contract Review" },
  ];

  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <p className="text-sm text-foreground flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-primary" />
          Servicios inmobiliarios
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Define los servicios para compradores y vendedores
        </p>
      </div>

      {/* Section Title */}
      <div className="space-y-2">
        <Label htmlFor="servicesSectionTitle" className="text-foreground">
          Título de la sección
        </Label>
        <Input
          id="servicesSectionTitle"
          placeholder="Services"
          value={getValue("servicesSectionTitle")}
          onChange={(e) => updateField("servicesSectionTitle", e.target.value)}
          className="bg-background border-border"
        />
      </div>

      {/* Buyer Services */}
      <div className="space-y-2 p-3 rounded-lg border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Home className="w-4 h-4 text-primary" />
          <Label className="text-foreground font-medium">Para Compradores</Label>
        </div>
        <Input
          placeholder="For Buyers"
          value={getValue("buyerCategoryTitle")}
          onChange={(e) => updateField("buyerCategoryTitle", e.target.value)}
          className="bg-background border-border mb-2"
        />
        <div className="grid grid-cols-2 gap-2">
          {buyerServices.map((service) => (
            <Input
              key={service.key}
              placeholder={service.placeholder}
              value={getValue(service.key)}
              onChange={(e) => updateField(service.key, e.target.value)}
              className="bg-background border-border h-8 text-sm"
            />
          ))}
        </div>
      </div>

      {/* Seller Services */}
      <div className="space-y-2 p-3 rounded-lg border border-border">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-primary" />
          <Label className="text-foreground font-medium">Para Vendedores</Label>
        </div>
        <Input
          placeholder="For Sellers"
          value={getValue("sellerCategoryTitle")}
          onChange={(e) => updateField("sellerCategoryTitle", e.target.value)}
          className="bg-background border-border mb-2"
        />
        <div className="grid grid-cols-2 gap-2">
          {sellerServices.map((service) => (
            <Input
              key={service.key}
              placeholder={service.placeholder}
              value={getValue(service.key)}
              onChange={(e) => updateField(service.key, e.target.value)}
              className="bg-background border-border h-8 text-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
