import {
  useActiveTemplates,
  SECTOR_LABELS,
  SECTOR_COLORS,
  Template,
} from "@/hooks/useTemplates";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Check, Layout, Loader2, Info, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useCardData } from "@/hooks/useCardData";

interface TemplateSectionProps {
  onTemplateConfirmed?: () => void;
}

export function TemplateSection({ onTemplateConfirmed }: TemplateSectionProps = {}) {
  // Use selectedSector from context to filter templates - NO manual filter!
  const { selectedTemplateId, selectTemplate, previewTemplateId, previewTemplate, selectedSector } = useCardData();
  
  // Fetch templates ONLY for the selected sector
  const { data: templates, isLoading } = useActiveTemplates(selectedSector || undefined);
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    templateId: string | null;
    templateName: string;
  }>({ open: false, templateId: null, templateName: "" });

  // Get the currently previewed template info
  const previewedTemplate = previewTemplateId 
    ? templates?.find(t => t.id === previewTemplateId) 
    : null;

  const handleTemplatePreview = (templateId: string) => {
    // If clicking the currently selected template, do nothing
    if (templateId === selectedTemplateId) return;
    
    // Preview the clicked template (switch preview, no toggle off)
    previewTemplate(templateId);
  };

  const handleSelectClick = () => {
    if (!previewedTemplate) return;
    
    // If same as current, just clear preview
    if (previewedTemplate.id === selectedTemplateId) {
      previewTemplate(null);
      return;
    }
    
    // If no template selected yet (first time), select directly without dialog
    if (!selectedTemplateId) {
      selectTemplate(previewedTemplate.id);
      previewTemplate(null);
      onTemplateConfirmed?.();
      return;
    }
    
    // Show confirmation dialog only when CHANGING templates
    setConfirmDialog({ 
      open: true, 
      templateId: previewedTemplate.id, 
      templateName: previewedTemplate.name 
    });
  };

  const handleConfirmChange = () => {
    if (confirmDialog.templateId) {
      selectTemplate(confirmDialog.templateId);
      previewTemplate(null); // Clear preview after selection
      onTemplateConfirmed?.(); // Notify parent
    }
    setConfirmDialog({ open: false, templateId: null, templateName: "" });
  };

  return (
    <div className="space-y-4">
      <Alert className="bg-primary/5 border-primary/20">
        <Info className="h-4 w-4 text-primary" />
        <AlertDescription className="text-muted-foreground">
          Tu información se mantendrá, solo cambia el diseño visual de tu tarjeta.
        </AlertDescription>
      </Alert>

      {/* Templates Grid - filtered by sector automatically */}
      {isLoading ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : templates && templates.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {templates.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                isSelected={selectedTemplateId === template.id}
                isPreviewing={previewTemplateId === template.id}
                onPreview={() => handleTemplatePreview(template.id)}
              />
            ))}
          </div>
          
          {/* Select Button - shown when previewing a template */}
          {previewedTemplate && previewedTemplate.id !== selectedTemplateId && (
            <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2">
                <Layout className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  {previewedTemplate.name}
                </span>
              </div>
              <Button 
                size="sm" 
                onClick={handleSelectClick}
                className="bg-primary hover:bg-primary/90"
              >
                <Check className="h-4 w-4 mr-1" />
                Seleccionar
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <Layout className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
          <p className="text-muted-foreground text-sm">
            No hay plantillas disponibles para este rubro
          </p>
        </div>
      )}

      {/* Confirmation Dialog */}
      <AlertDialog 
        open={confirmDialog.open} 
        onOpenChange={(open) => !open && setConfirmDialog({ open: false, templateId: null, templateName: "" })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Cambiar plantilla
            </AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que quieres cambiar a <strong>"{confirmDialog.templateName}"</strong>?
              <br /><br />
              Tu información (nombre, contacto, testimonios, etc.) se mantendrá, 
              pero el diseño visual cambiará completamente.
              <br /><br />
              <span className="text-amber-600 font-medium">
                Recuerda guardar los cambios después de seleccionar la nueva plantilla.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmChange}>
              Cambiar plantilla
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
  isSelected: boolean;
  isPreviewing: boolean;
  onPreview: () => void;
}

function TemplateCard({ template, isSelected, isPreviewing, onPreview }: TemplateCardProps) {
  return (
    <Card
      className={`cursor-pointer transition-all overflow-hidden ${
        isSelected
          ? "ring-2 ring-primary border-primary"
          : isPreviewing
            ? "ring-2 ring-primary/60 border-primary/60"
            : "bg-card border-border hover:border-primary/50"
      }`}
      onClick={onPreview}
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-muted relative">
        {template.thumbnail_url ? (
          <img
            src={template.thumbnail_url}
            alt={template.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Layout className="h-8 w-8 text-muted-foreground/50" />
          </div>
        )}
        
        {/* Selected Checkmark (current template) */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
            <Check className="h-4 w-4 text-primary-foreground" />
          </div>
        )}

        {/* Sector Badge */}
        <Badge
          className="absolute bottom-2 left-2 text-xs"
          style={{ backgroundColor: SECTOR_COLORS[template.sector] }}
        >
          {SECTOR_LABELS[template.sector]}
        </Badge>
      </div>

      <CardContent className="p-3">
        <h4 className="font-medium text-foreground text-sm truncate">
          {template.name}
        </h4>
        {template.description && (
          <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
            {template.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
