import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowRight, Sparkles, Users, BarChart3, Globe } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary rounded-lg">
              <CreditCard className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient-gold">Biztec</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Iniciar Sesion</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center stagger-children">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                La nueva era de las tarjetas profesionales
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Tu tarjeta de presentacion{" "}
              <span className="text-gradient-gold">digital</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Crea una landing page profesional con tus datos de contacto, redes sociales,
              portafolio y mucho mas. Compartela con un simple enlace o codigo QR.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-gold-glow bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <Link href="/maria-garcia">
                  Ver Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10" asChild>
                <Link href="/login">
                  Acceder a mi cuenta
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Todo lo que necesitas
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Herramientas profesionales para destacar en tu industria
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 rounded-xl bg-card border border-border card-hover">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Presencia Digital
              </h3>
              <p className="text-muted-foreground">
                Tu propia landing page personalizada con tu marca y estilo profesional.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border card-hover">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Conexiones Directas
              </h3>
              <p className="text-muted-foreground">
                Botones de contacto rapido: llamada, WhatsApp, email y redes sociales.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border card-hover">
              <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Analiticas Pro
              </h3>
              <p className="text-muted-foreground">
                Metricas detalladas de visitas y clics para optimizar tu presencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-1.5 bg-primary rounded-lg">
              <CreditCard className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-gradient-gold">Biztec</span>
          </div>
          <p className="text-sm text-muted-foreground">
            2024 Biztec. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
