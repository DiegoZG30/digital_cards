import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreditCard, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center animate-slide-up">
        <div className="inline-flex items-center gap-2 mb-8">
          <div className="p-2 bg-primary rounded-lg">
            <CreditCard className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-gradient-gold">Biztec</span>
        </div>

        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          La pagina que buscas no existe
        </p>

        <Button size="lg" className="btn-gold-glow bg-primary text-primary-foreground hover:bg-primary/90" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  );
}
