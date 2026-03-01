"use client";

import { useState, useMemo } from "react";
import { UserLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Save,
  Loader2,
  Layout,
  Palette,
  Briefcase,
  Globe,
  Link as LinkIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";
import { PlanProvider, usePlan } from "@/hooks/usePlan";
import { useActiveTemplates, TemplateSector } from "@/hooks/useTemplates";
import { CardDataProvider, useCardData } from "@/hooks/useCardData";
import {
  CardPreview,
  PreviewErrorBoundary,
  MobilePreviewModal,
  SectorSelector,
  DynamicEditor,
  TemplateSection,
} from "@/components/card-editor";
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
import { getSectorSchema } from "@/config/sectorSchemas";

// The flow has 3 steps: sector -> template -> editor
// User can only go forward, not back (except via "Cambiar rubro/plantilla" buttons)

function MyCardEditor() {
  const isMobile = useIsMobile();
  const { plan } = usePlan();
  const isPro = plan === "pro";

  const [showPreview, setShowPreview] = useState(false);
  const [showTemplateChanger, setShowTemplateChanger] = useState(false);
  const [showSectorChangeDialog, setShowSectorChangeDialog] = useState(false);

  const {
    cardData,
    customStyles,
    selectedTemplateId,
    previewTemplateId,
    selectedSector,
    isPublished,
    selectSector,
    selectTemplate,
    previewTemplate,
    updateIsPublished,
    hasChanges,
    isLoading,
    isSaving,
    saveToDatabase,
  } = useCardData();

  // Fetch ALL templates for current sector filter
  const { data: templates } = useActiveTemplates(selectedSector || undefined);

  // Get the template to display in preview
  const displayTemplate = useMemo(() => {
    const effectiveTemplateId = previewTemplateId || selectedTemplateId;
    if (!effectiveTemplateId || !templates) return null;
    return templates.find(t => t.id === effectiveTemplateId) || null;
  }, [previewTemplateId, selectedTemplateId, templates]);

  // Determine which view to show based on data state
  const currentView = useMemo(() => {
    if (selectedSector && selectedTemplateId) return "editor";
    if (selectedSector) return "template";
    return "sector";
  }, [selectedSector, selectedTemplateId]);

  // Get current sector label
  const currentSectorLabel = selectedSector
    ? getSectorSchema(selectedSector)?.label || selectedSector
    : "";

  // Handle sector selection and immediately proceed
  const handleSectorSelected = (sector: TemplateSector) => {
    selectSector(sector);
  };

  // Handle template confirmation
  const handleTemplateConfirmed = () => {
    setShowTemplateChanger(false);
  };

  const handleSave = async () => {
    await saveToDatabase();
  };

  const handleChangeSectorConfirm = () => {
    selectTemplate(null);
    selectSector(null);
    previewTemplate(null);
    setShowSectorChangeDialog(false);
  };

  const handleChangeTemplateClick = () => {
    setShowTemplateChanger(true);
  };

  if (isLoading) {
    return (
      <UserLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </UserLayout>
    );
  }

  // ============ VIEW: SECTOR SELECTION ============
  if (currentView === "sector") {
    return (
      <UserLayout>
        <div className="min-h-screen bg-background">
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Selecciona tu Rubro</h1>
                <p className="text-sm text-muted-foreground">Que tipo de negocio tienes?</p>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-6">
            <SectorSelector
              selectedSector={selectedSector}
              onSelectSector={handleSectorSelected}
              onContinue={() => {}}
            />
          </div>
        </div>
      </UserLayout>
    );
  }

  // ============ VIEW: TEMPLATE SELECTION ============
  if (currentView === "template") {
    return (
      <UserLayout>
        <div className="min-h-screen bg-background">
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Elige una Plantilla</h1>
                  <p className="text-sm text-muted-foreground">
                    Selecciona el diseno para tu negocio de <span className="text-primary font-medium">{currentSectorLabel}</span>
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSectorChangeDialog(true)}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Cambiar rubro
                </Button>
              </div>
            </div>
          </div>
          <div className="container mx-auto px-4 py-6">
            <div className="flex gap-6">
              <div className={`${isMobile ? "w-full" : "w-[40%]"} space-y-4`}>
                <div className="bg-card rounded-lg border border-border p-4">
                  <TemplateSection onTemplateConfirmed={handleTemplateConfirmed} />
                </div>
              </div>

              {!isMobile && (
                <div className="w-[60%] sticky top-24 h-[calc(100vh-8rem)]">
                  <div className="h-full bg-card rounded-lg border border-border overflow-hidden">
                    {displayTemplate ? (
                      <PreviewErrorBoundary>
                        <CardPreview
                          template={displayTemplate}
                          cardData={cardData}
                          customStyles={customStyles}
                          isPro={isPro}
                        />
                      </PreviewErrorBoundary>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                          <Layout className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">
                          Previsualiza una plantilla
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-sm">
                          Haz clic en una plantilla para ver como se vera tu tarjeta.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Change Sector Dialog */}
          <AlertDialog open={showSectorChangeDialog} onOpenChange={setShowSectorChangeDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-amber-500" />
                  Cambiar de rubro
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Quieres seleccionar otro tipo de negocio?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleChangeSectorConfirm}>
                  Cambiar rubro
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </UserLayout>
    );
  }

  // ============ VIEW: EDITOR ============
  return (
    <UserLayout>
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Mi Tarjeta</h1>
                <p className="text-sm text-muted-foreground">Personaliza tu tarjeta digital</p>
              </div>

              <div className="flex items-center gap-3">
                {isSaving && (
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando...</span>
                  </div>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSectorChangeDialog(true)}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Cambiar rubro
                </Button>

                {!showTemplateChanger && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleChangeTemplateClick}
                  >
                    <Palette className="w-4 h-4 mr-2" />
                    Cambiar plantilla
                  </Button>
                )}

                {isMobile && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary/10"
                    onClick={() => setShowPreview(true)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                )}

                <div className="flex items-center gap-2 border border-border rounded-lg px-3 py-1.5">
                  <Globe className={`w-4 h-4 ${isPublished ? "text-green-500" : "text-muted-foreground"}`} />
                  <Label htmlFor="publish-toggle" className="text-sm font-medium cursor-pointer whitespace-nowrap">
                    Publicar tarjeta
                  </Label>
                  <Switch
                    id="publish-toggle"
                    checked={isPublished}
                    onCheckedChange={updateIsPublished}
                  />
                </div>
                {isPublished && cardData.slug && (
                  <a
                    href={`/${cardData.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                    title={`/${cardData.slug}`}
                  >
                    <LinkIcon className="w-3 h-3" />
                    /{cardData.slug}
                  </a>
                )}

                <Button
                  className="btn-gold-glow bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "Guardando..." : "Guardar"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-6">
            <div className={`${isMobile ? "w-full" : "w-[40%]"} space-y-4`}>
              {showTemplateChanger && (
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-foreground">Cambiar Plantilla</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTemplateChanger(false)}
                    >
                      Cerrar
                    </Button>
                  </div>
                  <TemplateSection onTemplateConfirmed={handleTemplateConfirmed} />
                </div>
              )}

              <DynamicEditor sector={selectedSector!} />
            </div>

            {!isMobile && (
              <div className="w-[60%] sticky top-24 h-[calc(100vh-8rem)]">
                <div className="h-full bg-card rounded-lg border border-border overflow-hidden">
                  {displayTemplate ? (
                    <PreviewErrorBoundary>
                      <CardPreview
                        template={displayTemplate}
                        cardData={cardData}
                        customStyles={customStyles}
                        isPro={isPro}
                      />
                    </PreviewErrorBoundary>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-8">
                      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Layout className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        Sin plantilla
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-sm mb-4">
                        Selecciona una plantilla para ver tu tarjeta.
                      </p>
                      <Button variant="outline" onClick={handleChangeTemplateClick}>
                        <Palette className="w-4 h-4 mr-2" />
                        Elegir plantilla
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <MobilePreviewModal
          open={showPreview}
          onOpenChange={setShowPreview}
          template={displayTemplate}
          cardData={cardData}
          customStyles={customStyles}
          isPro={isPro}
        />

        <AlertDialog open={showSectorChangeDialog} onOpenChange={setShowSectorChangeDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-amber-500" />
                Cambiar de rubro
              </AlertDialogTitle>
              <AlertDialogDescription>
                Estas seguro de que quieres cambiar tu rubro de negocio?
                <br /><br />
                Esto te llevara a seleccionar un nuevo rubro y una nueva plantilla.
                <span className="text-amber-600 font-medium block mt-2">
                  Algunos campos especificos del rubro actual podrian no aplicar al nuevo.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleChangeSectorConfirm}>
                Cambiar rubro
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </UserLayout>
  );
}

export default function MyCard() {
  return (
    <PlanProvider>
      <CardDataProvider>
        <MyCardEditor />
      </CardDataProvider>
    </PlanProvider>
  );
}
