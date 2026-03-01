import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EditorSectionProps {
  value: string;
  icon: ReactNode;
  title: string;
  hasData?: boolean;
  children: ReactNode;
}

export function EditorSection({
  value,
  icon,
  title,
  hasData = false,
  children,
}: EditorSectionProps) {
  return (
    <AccordionItem value={value} className="border-border">
      <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50 transition-colors">
        <div className="flex items-center gap-3 flex-1">
          <span className="text-primary">{icon}</span>
          <span className="text-foreground font-medium">{title}</span>
          {hasData && (
            <Badge 
              variant="outline" 
              className="ml-auto mr-2 bg-green-500/20 text-green-400 border-green-500/30 text-xs"
            >
              ✓
            </Badge>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
