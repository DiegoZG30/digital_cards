"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/layout";
import { useAuth } from "@/hooks/useAuth";
import {
  useTemplates,
  useCreateTemplate,
  useUpdateTemplate,
  useDeleteTemplate,
  useUploadThumbnail,
  SECTOR_LABELS,
  SECTOR_COLORS,
  Template,
  TemplateSector,
  CreateTemplateData,
} from "@/hooks/useTemplates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import {
  Plus,
  Search,
  Pencil,
  Eye,
  Trash2,
  Upload,
  Loader2,
  Layout,
  UtensilsCrossed,
  Home,
  HardHat,
  SprayCan,
  Globe,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const SECTORS: TemplateSector[] = ["general", "restaurant", "real-estate", "construction", "cleaning"];

const sectorStyles: Record<string, { bg: string; text: string; gradient: string }> = {
  general: { bg: "bg-gray-500/20", text: "text-gray-400", gradient: "from-gray-700 to-gray-900" },
  restaurant: { bg: "bg-red-500/20", text: "text-red-400", gradient: "from-red-800 to-red-950" },
  "real-estate": { bg: "bg-green-500/20", text: "text-green-400", gradient: "from-green-800 to-green-950" },
  construction: { bg: "bg-orange-500/20", text: "text-orange-400", gradient: "from-orange-800 to-orange-950" },
  cleaning: { bg: "bg-blue-500/20", text: "text-blue-400", gradient: "from-blue-800 to-blue-950" },
};

const sectorIcons: Record<string, React.ReactNode> = {
  general: <Globe className="h-10 w-10" />,
  restaurant: <UtensilsCrossed className="h-10 w-10" />,
  "real-estate": <Home className="h-10 w-10" />,
  construction: <HardHat className="h-10 w-10" />,
  cleaning: <SprayCan className="h-10 w-10" />,
};

interface TemplateFormData {
  name: string;
  sector: TemplateSector;
  description: string;
  html_content: string;
  thumbnail_url: string;
  is_active: boolean;
}

const initialFormData: TemplateFormData = {
  name: "",
  sector: "general",
  description: "",
  html_content: "",
  thumbnail_url: "",
  is_active: true,
};

export default function AdminTemplates() {
  const router = useRouter();
  const { isLoading: authLoading, isAdmin, user } = useAuth();

  const [sectorFilter, setSectorFilter] = useState<TemplateSector | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [deleteTemplate, setDeleteTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<TemplateFormData>(initialFormData);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [htmlFile, setHtmlFile] = useState<File | null>(null);

  const { data: templates, isLoading } = useTemplates(sectorFilter, searchQuery);
  const createMutation = useCreateTemplate();
  const updateMutation = useUpdateTemplate();
  const deleteMutation = useDeleteTemplate();
  const uploadThumbnailMutation = useUploadThumbnail();

  // Redirect non-admin users
  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      router.push("/my-card");
    }
  }, [authLoading, isAdmin, user, router]);

  if (authLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminLayout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const handleOpenModal = (template?: Template) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        name: template.name,
        sector: template.sector,
        description: template.description || "",
        html_content: template.htmlContent || template.html_content,
        thumbnail_url: template.thumbnailUrl || template.thumbnail_url || "",
        is_active: template.isActive ?? template.is_active,
      });
    } else {
      setEditingTemplate(null);
      setFormData(initialFormData);
    }
    setThumbnailFile(null);
    setHtmlFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTemplate(null);
    setFormData(initialFormData);
    setThumbnailFile(null);
    setHtmlFile(null);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleHtmlFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHtmlFile(file);
      const text = await file.text();
      setFormData((prev) => ({ ...prev, html_content: text }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.html_content) {
      return;
    }

    let thumbnailUrl = formData.thumbnail_url;

    if (thumbnailFile) {
      thumbnailUrl = await uploadThumbnailMutation.mutateAsync(thumbnailFile);
    }

    const templateData: CreateTemplateData = {
      name: formData.name,
      sector: formData.sector,
      description: formData.description || undefined,
      html_content: formData.html_content,
      thumbnail_url: thumbnailUrl || undefined,
      is_active: formData.is_active,
    };

    if (editingTemplate) {
      await updateMutation.mutateAsync({ id: editingTemplate.id, ...templateData });
    } else {
      await createMutation.mutateAsync(templateData);
    }

    handleCloseModal();
  };

  const handleDelete = async () => {
    if (deleteTemplate) {
      await deleteMutation.mutateAsync(deleteTemplate.id);
      setIsDeleteOpen(false);
      setDeleteTemplate(null);
    }
  };

  const handlePreview = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending || uploadThumbnailMutation.isPending;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion de Plantillas</h1>
            <p className="text-muted-foreground">
              Administra las plantillas disponibles para los usuarios
            </p>
          </div>
          <Button className="btn-gold-glow bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => handleOpenModal()}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Plantilla
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={sectorFilter}
            onValueChange={(value) => setSectorFilter(value as TemplateSector | "all")}
          >
            <SelectTrigger className="w-full sm:w-48 bg-card border-border">
              <SelectValue placeholder="Filtrar por sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los sectores</SelectItem>
              {SECTORS.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {SECTOR_LABELS[sector]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>
        </div>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : templates && templates.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => {
              const style = sectorStyles[template.sector] || sectorStyles.general;
              return (
                <Card key={template.id} className="bg-card border-border overflow-hidden card-hover group">
                  {/* Thumbnail */}
                  <div className="aspect-video relative">
                    {(template.thumbnailUrl || template.thumbnail_url) ? (
                      <img
                        src={template.thumbnailUrl || template.thumbnail_url || undefined}
                        alt={template.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${style.gradient} flex items-center justify-center`}>
                        <span className={`${style.text} opacity-60`}>
                          {sectorIcons[template.sector] || sectorIcons.general}
                        </span>
                      </div>
                    )}
                    <span
                      className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text} backdrop-blur-sm`}
                    >
                      {SECTOR_LABELS[template.sector]}
                    </span>
                  </div>

                  <CardContent className="p-4 space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground truncate text-base">
                        {template.name}
                      </h3>
                      <Badge
                        variant={(template.isActive ?? template.is_active) ? "default" : "secondary"}
                        className={(template.isActive ?? template.is_active) ? "bg-emerald-500/20 text-emerald-400 border-0 text-xs" : "text-xs"}
                      >
                        {(template.isActive ?? template.is_active) ? "Activa" : "Inactiva"}
                      </Badge>
                    </div>

                    {template.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.description}
                      </p>
                    )}

                    <p className="text-xs text-muted-foreground">
                      Creada: {format(new Date(template.createdAt || template.created_at), "dd MMM yyyy", { locale: es })}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t border-border/50">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => handleOpenModal(template)}
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1.5" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePreview(template)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => {
                          setDeleteTemplate(template);
                          setIsDeleteOpen(true);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <Layout className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">
                No hay plantillas {sectorFilter !== "all" && `en el sector ${SECTOR_LABELS[sectorFilter]}`}
              </p>
              <Button className="mt-4 btn-gold-glow bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => handleOpenModal()}>
                <Plus className="h-4 w-4 mr-2" />
                Crear primera plantilla
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingTemplate ? "Editar Plantilla" : "Nueva Plantilla"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre de plantilla *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Elegante Dorado"
                className="bg-background border-border"
              />
            </div>

            {/* Sector */}
            <div className="space-y-2">
              <Label>Sector/Rubro *</Label>
              <Select
                value={formData.sector}
                onValueChange={(value) => setFormData({ ...formData, sector: value as TemplateSector })}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SECTORS.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: SECTOR_COLORS[sector] }}
                        />
                        {SECTOR_LABELS[sector]}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Descripcion corta</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripcion opcional de la plantilla..."
                className="bg-background border-border resize-none"
                rows={2}
              />
            </div>

            {/* HTML File */}
            <div className="space-y-2">
              <Label>Archivo HTML *</Label>
              <div className="border border-dashed border-border rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept=".html"
                  onChange={handleHtmlFileChange}
                  className="hidden"
                  id="html-upload"
                />
                <label htmlFor="html-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {htmlFile ? htmlFile.name : "Click para subir archivo .html"}
                  </p>
                </label>
              </div>
              {formData.html_content && (
                <p className="text-xs text-primary">
                  HTML cargado ({formData.html_content.length} caracteres)
                </p>
              )}
            </div>

            {/* Thumbnail */}
            <div className="space-y-2">
              <Label>Thumbnail (preview)</Label>
              <div className="border border-dashed border-border rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload" className="cursor-pointer">
                  {thumbnailFile ? (
                    <img
                      src={URL.createObjectURL(thumbnailFile)}
                      alt="Preview"
                      className="max-h-32 mx-auto rounded"
                    />
                  ) : formData.thumbnail_url ? (
                    <img
                      src={formData.thumbnail_url}
                      alt="Current"
                      className="max-h-32 mx-auto rounded"
                    />
                  ) : (
                    <>
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click para subir imagen
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <Label>Estado</Label>
                <p className="text-sm text-muted-foreground">
                  Las plantillas inactivas no aparecen para los usuarios
                </p>
              </div>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button
              className="btn-gold-glow bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleSubmit}
              disabled={!formData.name || !formData.html_content || isSaving}
            >
              {isSaving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {editingTemplate ? "Guardar Cambios" : "Crear Plantilla"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Vista previa: {previewTemplate?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="bg-white rounded-lg overflow-hidden">
            {previewTemplate && (
              <iframe
                srcDoc={previewTemplate.htmlContent || previewTemplate.html_content}
                className="w-full h-[60vh] border-0"
                title="Template Preview"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Eliminar plantilla?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta accion no se puede deshacer. La plantilla &quot;{deleteTemplate?.name}&quot;
              sera eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
