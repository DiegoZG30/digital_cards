"use client";

import { UserLayout } from "@/components/layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { UserPlus, Loader2, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

interface UserRecord {
  id: string;
  email: string;
  role: "admin" | "pro" | "standard";
  isActive: boolean | null;
  createdAt: string | null;
}

export default function AdminInvitations() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"pro" | "standard">("standard");
  const [sending, setSending] = useState(false);

  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/admin/invitations");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setUsers(data.users ?? []);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async () => {
    if (!email || !password || password.length < 6) {
      toast.error("Email y password (min 6 chars) requeridos");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/admin/invitations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Error al crear usuario");
        return;
      }

      toast.success(`Usuario ${email} creado con rol ${role}`);
      setEmail("");
      setPassword("");
      setRole("standard");
      fetchUsers();
    } catch {
      toast.error("Error de conexion");
    } finally {
      setSending(false);
    }
  };

  const getRoleBadge = (r: string) => {
    switch (r) {
      case "admin":
        return <Badge className="badge-admin">Admin</Badge>;
      case "pro":
        return <Badge className="badge-pro">Pro</Badge>;
      default:
        return <Badge className="badge-standard">Standard</Badge>;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
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
            <h1 className="text-3xl font-bold text-foreground">
              Crear Usuarios
            </h1>
            <p className="text-muted-foreground">
              Crea nuevos usuarios y asigna roles en la plataforma
            </p>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Nuevo Usuario
              </CardTitle>
              <CardDescription>
                Crea una cuenta con email, password y rol asignado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="new-email">Email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Min 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-role">Rol</Label>
                  <Select
                    value={role}
                    onValueChange={(v) => setRole(v as "pro" | "standard")}
                  >
                    <SelectTrigger id="new-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="invisible">Accion</Label>
                  <Button
                    onClick={handleCreate}
                    disabled={!email || !password || sending}
                    className="w-full"
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <UserPlus className="h-4 w-4 mr-2" />
                    )}
                    Crear Usuario
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">
                Usuarios Registrados
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <AlertCircle className="h-8 w-8 text-destructive" />
                  <p className="text-sm text-muted-foreground">
                    Error cargando usuarios
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fetchUsers()}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Reintentar
                  </Button>
                </div>
              ) : loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : users.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No hay usuarios registrados
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead>Email</TableHead>
                      <TableHead>Rol</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Creado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-border">
                        <TableCell className="font-medium text-foreground">
                          {user.email}
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>
                          {user.isActive !== false ? (
                            <Badge
                              variant="outline"
                              className="text-green-500 border-green-500/30"
                            >
                              Activo
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Inactivo</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {formatDate(user.createdAt)}
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
