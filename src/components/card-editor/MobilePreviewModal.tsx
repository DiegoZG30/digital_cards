import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CardPreview, CardData, CustomStyles } from "./CardPreview";
import { Template } from "@/hooks/useTemplates";

interface MobilePreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: Template | null;
  cardData: CardData;
  customStyles: CustomStyles;
  isPro?: boolean;
}

export function MobilePreviewModal({ 
  open, 
  onOpenChange, 
  template,
  cardData,
  customStyles,
  isPro = false,
}: MobilePreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] bg-background border-border p-0">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="text-foreground">Vista Previa</DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <CardPreview
            template={template}
            cardData={cardData}
            customStyles={customStyles}
            isPro={isPro}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
