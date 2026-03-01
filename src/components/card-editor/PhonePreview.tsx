import { Smartphone } from "lucide-react";

export function PhonePreview() {
  return (
    <div className="flex items-center justify-center h-full p-6">
      {/* iPhone-like frame */}
      <div className="relative w-full max-w-[320px]">
        {/* Phone frame */}
        <div className="relative bg-[#1E1E1E] rounded-[40px] p-3 shadow-2xl border border-border/50">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1E1E1E] rounded-b-2xl z-10" />
          
          {/* Screen */}
          <div className="relative bg-card rounded-[32px] overflow-hidden aspect-[9/19.5]">
            {/* Status bar */}
            <div className="h-12 bg-card/80 flex items-center justify-center">
              <div className="w-20 h-5 bg-muted rounded-full" />
            </div>
            
            {/* Content placeholder */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 h-full">
              <Smartphone className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center text-sm">
                Vista previa de tu tarjeta
              </p>
              <p className="text-muted-foreground/60 text-center text-xs mt-2">
                Los cambios se reflejarán aquí en tiempo real
              </p>
            </div>
          </div>
        </div>
        
        {/* Reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-[40px] pointer-events-none" />
      </div>
    </div>
  );
}
