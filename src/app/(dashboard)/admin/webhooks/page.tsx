"use client";

import { UserLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Webhook, Plus, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WebhookConfig {
  id: string;
  url: string;
  event: string;
  created_at: string;
  active: boolean;
}

const eventTypes = [
  { value: "nuevo_usuario", label: "Nuevo Usuario" },
  { value: "cambio_plan", label: "Cambio de Plan" },
  { value: "nueva_tarjeta", label: "Nueva Tarjeta" },
];

const mockWebhooks: WebhookConfig[] = [
  { id: "1", url: "https://api.ejemplo.com/hooks/users", event: "nuevo_usuario", created_at: "2026-02-20T10:00:00Z", active: true },
  { id: "2", url: "https://api.ejemplo.com/hooks/plans", event: "cambio_plan", created_at: "2026-02-22T14:30:00Z", active: true },
];

export default function AdminWebhooks() {
  const [url, setUrl] = useState("");
  const [event, setEvent] = useState("");
  const [saving, setSaving] = useState(false);
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>(mockWebhooks);

  const handleAdd = async () => {
    if (!url || !event) return;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    const newWebhook: WebhookConfig = {
      id: String(webhooks.length + 1),
      url,
      event,
      created_at: new Date().toISOString(),
      active: true,
    };
    setWebhooks([...webhooks, newWebhook]);
    setUrl("");
    setEvent("");
    setSaving(false);
    toast.success("Webhook agregado correctamente");
  };

  const handleDelete = (id: string) => {
    setWebhooks(webhooks.filter((w) => w.id !== id));
    toast.success("Webhook eliminado");
  };

  const getEventLabel = (value: string) => {
    return eventTypes.find((e) => e.value === value)?.label || value;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <UserLayout>
      <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Webhooks</h1>
          <p className="text-muted-foreground">
            Configura integraciones externas
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Webhook className="h-5 w-5" />
              Agregar Webhook
            </CardTitle>
            <CardDescription>
              Recibe notificaciones en tiempo real cuando ocurran eventos en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Endpoint URL</Label>
                <Input
                  id="webhook-url"
                  type="url"
                  placeholder="https://api.ejemplo.com/webhook"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-event">Tipo de Evento</Label>
                <Select value={event} onValueChange={setEvent}>
                  <SelectTrigger id="webhook-event">
                    <SelectValue placeholder="Selecciona un evento" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAdd} disabled={!url || !event || saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Agregar Webhook
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Webhooks Configurados</CardTitle>
          </CardHeader>
          <CardContent>
            {webhooks.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No hay webhooks configurados
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Evento</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {webhooks.map((wh) => (
                    <TableRow key={wh.id} className="border-border">
                      <TableCell className="font-mono text-sm text-foreground">{wh.url}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getEventLabel(wh.event)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/10 text-green-500 border-green-500/30">
                          Activo
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(wh.created_at)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(wh.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
      </div>
    </UserLayout>
  );
}
