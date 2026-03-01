"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type TemplateSector = "general" | "restaurant" | "real-estate" | "construction" | "cleaning";

export interface Template {
  id: string;
  name: string;
  sector: TemplateSector;
  description: string | null;
  html_content: string;
  htmlContent: string;
  thumbnail_url: string | null;
  thumbnailUrl: string | null;
  is_active: boolean;
  isActive: boolean;
  created_at: string;
  updated_at: string;
  editor_schema: unknown;
  editorSchema: unknown;
}

export interface CreateTemplateData {
  name: string;
  sector: TemplateSector;
  description?: string;
  html_content: string;
  thumbnail_url?: string;
  is_active?: boolean;
}

export interface UpdateTemplateData extends Partial<CreateTemplateData> {
  id: string;
}

export const SECTOR_LABELS: Record<TemplateSector, string> = {
  general: "General",
  restaurant: "Restaurant",
  "real-estate": "Real Estate",
  construction: "Construcción",
  cleaning: "Limpieza",
};

export const SECTOR_COLORS: Record<TemplateSector, string> = {
  general: "#6B7280",
  restaurant: "#F59E0B",
  "real-estate": "#10B981",
  construction: "#F97316",
  cleaning: "#3B82F6",
};

export function useTemplates(sectorFilter?: TemplateSector | "all", searchQuery?: string) {
  return useQuery({
    queryKey: ["templates", sectorFilter, searchQuery],
    queryFn: async () => {
      const res = await fetch("/api/templates");
      if (!res.ok) throw new Error("Failed to fetch templates");
      let data: Template[] = await res.json();

      if (sectorFilter && sectorFilter !== "all") {
        data = data.filter(t => t.sector === sectorFilter);
      }
      if (searchQuery) {
        data = data.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
      }
      return data;
    },
  });
}

export function useActiveTemplates(sectorFilter?: TemplateSector | "all") {
  return useQuery({
    queryKey: ["active-templates", sectorFilter],
    queryFn: async () => {
      const res = await fetch("/api/templates");
      if (!res.ok) throw new Error("Failed to fetch templates");
      let data: Template[] = await res.json();

      data = data.filter(t => t.is_active || t.isActive);
      if (sectorFilter && sectorFilter !== "all") {
        data = data.filter(t => t.sector === sectorFilter);
      }
      return data.sort((a, b) => a.name.localeCompare(b.name));
    },
  });
}

export function useCreateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (templateData: CreateTemplateData) => {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(templateData),
      });
      if (!res.ok) throw new Error("Failed to create template");
      return res.json() as Promise<Template>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Plantilla creada correctamente");
    },
    onError: (error) => toast.error("Error al crear plantilla: " + error.message),
  });
}

export function useUpdateTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...templateData }: UpdateTemplateData) => {
      const res = await fetch(`/api/templates/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(templateData),
      });
      if (!res.ok) throw new Error("Failed to update template");
      return res.json() as Promise<Template>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Plantilla actualizada correctamente");
    },
    onError: (error) => toast.error("Error al actualizar plantilla: " + error.message),
  });
}

export function useDeleteTemplate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/templates/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete template");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["templates"] });
      toast.success("Plantilla eliminada correctamente");
    },
    onError: (error) => toast.error("Error al eliminar plantilla: " + error.message),
  });
}

export function useUploadThumbnail() {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Failed to upload");
      const data = await res.json();
      return data.url as string;
    },
    onError: (error) => toast.error("Error al subir imagen: " + error.message),
  });
}
