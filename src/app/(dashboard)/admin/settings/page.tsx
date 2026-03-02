"use client";

import { UserLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Globe, DollarSign, Palette, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSettings() {
  const [saving, setSaving] = useState(false);
  const [platformName, setPlatformName] = useState("Biztec Connect");
  const [baseUrl, setBaseUrl] = useState("https://biztec.app");
  const [primaryColor, setPrimaryColor] = useState("#c9a44a");
  const [logoUrl, setLogoUrl] = useState("");

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    toast.success("Configuracion guardada correctamente");
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configuracion</h1>
          <p className="text-muted-foreground">
            Ajustes generales de la plataforma
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General
            </CardTitle>
            <CardDescription>
              Informacion basica de la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Nombre de la Plataforma</Label>
              <Input
                id="platform-name"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="base-url">URL Base</Label>
              <Input
                id="base-url"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Planes y Precios
            </CardTitle>
            <CardDescription>
              Precios actuales de los planes de suscripcion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg border border-border bg-muted/30">
                <div className="text-sm text-muted-foreground mb-1">Plan Standard</div>
                <div className="text-2xl font-bold text-foreground">$29<span className="text-sm font-normal text-muted-foreground">/mes</span></div>
              </div>
              <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
                <div className="text-sm text-muted-foreground mb-1">Plan Pro</div>
                <div className="text-2xl font-bold text-foreground">$49<span className="text-sm font-normal text-muted-foreground">/mes</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Branding
            </CardTitle>
            <CardDescription>
              Personaliza la apariencia de la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Color Primario</Label>
              <div className="flex gap-3">
                <Input
                  id="primary-color"
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-14 h-10 p-1 cursor-pointer"
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="flex-1 font-mono"
                  placeholder="#c9a44a"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo-url">Logo URL</Label>
              <Input
                id="logo-url"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="https://ejemplo.com/logo.png"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Settings className="h-4 w-4 mr-2" />
            )}
            Guardar Cambios
          </Button>
        </div>
      </div>
      </div>
    </UserLayout>
  );
}
