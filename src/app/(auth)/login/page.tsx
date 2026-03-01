"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, CreditCard } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al iniciar sesion");

      toast.success("Bienvenido!");
      router.push("/my-card");
    } catch (error: any) {
      toast.error(error.message || "Error al iniciar sesion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al crear cuenta");

      toast.success("Cuenta creada! Ya puedes iniciar sesion.");
      router.push("/my-card");
    } catch (error: any) {
      toast.error(error.message || "Error al crear cuenta");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-slide-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary rounded-lg">
              <CreditCard className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="text-3xl font-bold text-gradient-gold">Biztec</span>
          </div>
          <p className="text-muted-foreground">
            Tarjetas digitales profesionales
          </p>
        </div>

        <Card className="bg-card border-border">
          <Tabs defaultValue="login" className="w-full">
            <CardHeader className="space-y-1 pb-2">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesion</TabsTrigger>
                <TabsTrigger value="register">Registrarse</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="login" className="mt-0">
                <div className="mb-4">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Bienvenido de nuevo
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Ingresa tus credenciales para acceder
                  </CardDescription>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-foreground">
                      Correo electronico
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-foreground">
                      Contrasena
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="--------"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full btn-gold-glow bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Iniciando sesion...
                      </>
                    ) : (
                      "Iniciar Sesion"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="mt-0">
                <div className="mb-4">
                  <CardTitle className="text-xl font-bold text-foreground">
                    Crear cuenta
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Registra tu cuenta para comenzar
                  </CardDescription>
                </div>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-foreground">
                      Correo electronico
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-foreground">
                      Contrasena
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Minimo 6 caracteres"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full btn-gold-glow bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creando cuenta...
                      </>
                    ) : (
                      "Crear Cuenta"
                    )}
                  </Button>
                </form>
              </TabsContent>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Problemas para acceder?{" "}
                  <a
                    href="mailto:soporte@biztec.com"
                    className="text-primary hover:underline font-medium"
                  >
                    Contactar soporte
                  </a>
                </p>
              </div>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
