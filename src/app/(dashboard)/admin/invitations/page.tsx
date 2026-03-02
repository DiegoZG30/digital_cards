"use client";

import { AdminLayout } from "@/components/layout";
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
import { Mail, Send, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Invitation {
  id: string;
  email: string;
  status: "pendiente" | "aceptada" | "expirada";
  created_at: string;
}

const mockInvitations: Invitation[] = [
  { id: "1", email: "carlos@empresa.com", status: "pendiente", created_at: "2026-02-28T10:00:00Z" },
  { id: "2", email: "maria@negocio.com", status: "aceptada", created_at: "2026-02-25T14:30:00Z" },
  { id: "3", email: "luis@startup.com", status: "expirada", created_at: "2026-02-10T09:15:00Z" },
];

export default function AdminInvitations() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [invitations] = useState<Invitation[]>(mockInvitations);

  const handleSend = async () => {
    if (!email) return;
    setSending(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    setEmail("");
    toast.success(`Invitacion enviada a ${email}`);
  };

  const getStatusBadge = (status: Invitation["status"]) => {
    switch (status) {
      case "pendiente":
        return <Badge variant="outline" className="text-amber-500 border-amber-500/30">Pendiente</Badge>;
      case "aceptada":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/30">Aceptada</Badge>;
      case "expirada":
        return <Badge variant="secondary">Expirada</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invitaciones</h1>
          <p className="text-muted-foreground">
            Gestiona las invitaciones de tu plataforma
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Enviar Invitacion
            </CardTitle>
            <CardDescription>
              Invita nuevos usuarios a la plataforma por correo electronico
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <div className="flex-1">
                <Label htmlFor="email" className="sr-only">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
              </div>
              <Button onClick={handleSend} disabled={!email || sending}>
                {sending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Enviar Invitacion
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Invitaciones Enviadas</CardTitle>
          </CardHeader>
          <CardContent>
            {invitations.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No hay invitaciones pendientes
              </p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Email</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((inv) => (
                    <TableRow key={inv.id} className="border-border">
                      <TableCell className="font-medium text-foreground">{inv.email}</TableCell>
                      <TableCell>{getStatusBadge(inv.status)}</TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(inv.created_at)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
