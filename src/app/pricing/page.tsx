import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, CreditCard, ArrowLeft } from "lucide-react";

const standardFeatures = [
  { text: "Tarjeta digital completa", included: true },
  { text: "Hasta 8 botones de contacto", included: true },
  { text: "Bio, video y galeria", included: true },
  { text: "Testimonios y certificados", included: true },
  { text: "QR Code personalizado", included: true },
  { text: "Agregar a contactos (VCF)", included: true },
  { text: "Compartir por link", included: true },
  { text: "Anadir a pantalla de inicio (PWA)", included: true },
  { text: "Edicion ilimitada desde el portal", included: true },
  { text: "Hosting incluido", included: true },
  { text: "Mini-CRM", included: false },
  { text: "Gestion de contactos", included: false },
  { text: "Boton Refer Us", included: false },
  { text: "Gestion de referidos", included: false },
  { text: "Exportacion de datos", included: false },
  { text: "Dashboard de analytics", included: false },
];

const proFeatures = [
  { text: "Todo lo de Standard", included: true, highlight: true },
  { text: "Dashboard con metricas", included: true },
  { text: 'Boton "Refer Us" en tu tarjeta', included: true },
  { text: "Mini-CRM de contactos", included: true },
  { text: "Gestion de referidos con estados", included: true },
  { text: "Notas y seguimiento por contacto", included: true },
  { text: "Exportacion CSV/Excel", included: true },
  { text: "Notificaciones de nuevos referidos", included: true },
  { text: "Tracking: quien refirio a quien", included: true },
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 bg-primary rounded-lg">
              <CreditCard className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-gradient-gold">Biztec</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Elige tu plan
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transforma tu networking con una tarjeta digital profesional
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Standard Plan */}
          <Card className="bg-card border-border relative overflow-hidden">
            <CardHeader className="pb-8">
              <CardTitle className="text-2xl font-bold text-foreground">
                Standard
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Presencia profesional digital
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {standardFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10" size="lg">
                Comenzar con Standard
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="bg-card border-primary relative overflow-hidden">
            {/* Popular Badge */}
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
              Mas popular
            </Badge>

            <CardHeader className="pb-8">
              <CardTitle className="text-2xl font-bold text-foreground">
                Pro
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Crecimiento con seguimiento
              </CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold text-primary">$49</span>
                <span className="text-muted-foreground">/mes</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check
                      className={`h-5 w-5 shrink-0 mt-0.5 ${
                        feature.highlight ? "text-primary" : "text-primary"
                      }`}
                    />
                    <span
                      className={
                        feature.highlight
                          ? "text-primary font-medium"
                          : "text-foreground"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
              <Button className="w-full btn-gold-glow bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
                Comenzar con Pro
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Tienes preguntas?{" "}
            <Link href="/" className="text-primary hover:underline">
              Contactanos
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
