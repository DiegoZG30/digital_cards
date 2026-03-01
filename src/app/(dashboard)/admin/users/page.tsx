"use client";

import { AdminLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, MoreHorizontal, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

interface UserWithSubscription {
  id: string;
  email: string;
  created_at: string;
  subscription?: {
    plan: string;
    expires_at: string | null;
  };
}

export default function AdminUsers() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json() as Promise<UserWithSubscription[]>;
    },
  });

  // Mutation to update plan
  const updatePlanMutation = useMutation({
    mutationFn: async ({ userId, plan }: { userId: string; plan: string }) => {
      const res = await fetch(`/api/admin/users/${userId}/plan`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) throw new Error("Failed to update plan");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Plan actualizado correctamente");
    },
    onError: (error) => {
      console.error("Error updating plan:", error);
      toast.error("Error al actualizar el plan");
    },
  });

  const handlePlanChange = (userId: string, plan: string) => {
    updatePlanMutation.mutate({ userId, plan });
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Usuarios</h1>
            <p className="text-muted-foreground">
              Gestiona los usuarios de la plataforma
            </p>
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuarios..."
                  className="pl-9 bg-input border-border"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Usuario</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Expira</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers?.map((user) => (
                    <TableRow key={user.id} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                              {getInitials(user.email)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">{user.email}</p>
                            <p className="text-sm text-muted-foreground">
                              ID: {user.id.slice(0, 8)}...
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={user.subscription?.plan || "standard"}
                          onValueChange={(value) => handlePlanChange(user.id, value)}
                          disabled={updatePlanMutation.isPending}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">
                              <Badge variant="secondary">Standard</Badge>
                            </SelectItem>
                            <SelectItem value="pro">
                              <Badge className="bg-primary text-primary-foreground">Pro</Badge>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {user.subscription?.expires_at
                          ? new Date(user.subscription.expires_at).toLocaleDateString("es")
                          : "Sin expiracion"}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver tarjeta</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Desactivar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredUsers?.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No se encontraron usuarios
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
