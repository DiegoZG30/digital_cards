/**
 * Sector-based editor schemas
 * 
 * Each sector defines which editor sections are available and their configuration.
 * Common sections (profile, contact, social) are shared across all sectors.
 * Specific sections are unique to each sector's needs.
 */

import { TemplateSector } from "@/hooks/useTemplates";

export interface EditorFieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "phone" | "email" | "color" | "select" | "image";
  placeholder?: string;
  required?: boolean;
}

export interface EditorSectionConfig {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  description?: string;
  fields?: EditorFieldConfig[];
  componentType?: string;
  order: number;
}

export interface SectorSchema {
  sector: TemplateSector;
  label: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Hex color for UI
  sections: EditorSectionConfig[];
}

// ============================================
// COMMON SECTIONS (shared across all sectors)
// ============================================

const COMMON_SECTIONS: EditorSectionConfig[] = [
  {
    id: "profile",
    title: "Perfil",
    icon: "User",
    description: "Información básica de tu negocio",
    componentType: "profile",
    order: 1,
  },
  {
    id: "contact",
    title: "Botones de Contacto",
    icon: "Phone",
    description: "Teléfono, WhatsApp, Email",
    componentType: "contact",
    order: 2,
  },
  {
    id: "social",
    title: "Redes Sociales",
    icon: "Share2",
    description: "Links a tus perfiles sociales",
    componentType: "social",
    order: 3,
  },
  {
    id: "mainButtons",
    title: "Botones Principales",
    icon: "MousePointer2",
    description: "Refer, Review, Save Contact",
    componentType: "mainButtons",
    order: 4,
  },
  {
    id: "certifications",
    title: "Certificaciones",
    icon: "Award",
    description: "3 badges de certificación",
    componentType: "certifications",
    order: 5,
  },
  {
    id: "colors",
    title: "Colores",
    icon: "Palette",
    description: "Personaliza los colores de tu tarjeta",
    componentType: "colors",
    order: 6,
  },
];

// ============================================
// SECTOR-SPECIFIC CONFIGURATIONS
// ============================================

export const SECTOR_SCHEMAS: Record<TemplateSector, SectorSchema> = {
  // GENERAL - Basic digital card
  general: {
    sector: "general",
    label: "General",
    description: "Tarjeta digital básica para cualquier profesional",
    icon: "Briefcase",
    color: "#6366F1",
    sections: [
      ...COMMON_SECTIONS,
      {
        id: "generalCta",
        title: "Botón Principal",
        icon: "Calendar",
        description: "Botón de acción principal",
        componentType: "generalCta",
        order: 7,
      },
      {
        id: "experience",
        title: "Experiencia / Historia",
        icon: "BookOpen",
        description: "Sección de presentación con video",
        componentType: "experience",
        order: 8,
      },
      {
        id: "testimonialsVideo",
        title: "Testimonios (Video)",
        icon: "Video",
        description: "Video de testimonios de clientes",
        componentType: "testimonialsVideo",
        order: 9,
      },
      {
        id: "galleryEditor",
        title: "Galería",
        icon: "Images",
        description: "12 imágenes de tu trabajo",
        componentType: "galleryEditor",
        order: 10,
      },
      {
        id: "bottomButtons",
        title: "Botones Inferiores",
        icon: "Globe",
        description: "Website, Share, Get Card",
        componentType: "bottomButtons",
        order: 11,
      },
      {
        id: "generalFooter",
        title: "Footer",
        icon: "Award",
        description: "Badge de verificación",
        componentType: "generalFooter",
        order: 12,
      },
      {
        id: "styles",
        title: "Estilos Avanzados",
        icon: "Palette",
        description: "Fuentes y bordes",
        componentType: "styles",
        order: 100,
      },
    ],
  },

  // RESTAURANT - Menu-focused
  restaurant: {
    sector: "restaurant",
    label: "Restaurante",
    description: "Menú digital para restaurantes y cafeterías",
    icon: "UtensilsCrossed",
    color: "#F59E0B",
    sections: [
      {
        id: "bgImages",
        title: "Imágenes de Fondo",
        icon: "ImageIcon",
        description: "4 imágenes animadas de fondo",
        componentType: "bgImages",
        order: 1,
      },
      {
        id: "profile",
        title: "Información del Local",
        icon: "User",
        description: "Nombre y datos del restaurante",
        componentType: "profile",
        order: 2,
      },
      {
        id: "restaurantCta",
        title: "Reservaciones",
        icon: "Calendar",
        description: "Botón y badge de cocina",
        componentType: "restaurantCta",
        order: 3,
      },
      {
        id: "contact",
        title: "Botones de Contacto",
        icon: "Phone",
        description: "Teléfono, WhatsApp, Email",
        componentType: "contact",
        order: 4,
      },
      {
        id: "social",
        title: "Redes Sociales",
        icon: "Share2",
        description: "Links a tus perfiles sociales",
        componentType: "social",
        order: 5,
      },
      {
        id: "mainButtons",
        title: "Botones Principales",
        icon: "MousePointer2",
        description: "Refer, Review, Save Contact",
        componentType: "mainButtons",
        order: 6,
      },
      {
        id: "certifications",
        title: "Certificaciones",
        icon: "Award",
        description: "3 badges de certificación",
        componentType: "certifications",
        order: 7,
      },
      {
        id: "restaurantMenu",
        title: "Menú",
        icon: "BookOpen",
        description: "3 platillos destacados",
        componentType: "restaurantMenu",
        order: 8,
      },
      {
        id: "hours",
        title: "Horarios",
        icon: "Clock",
        description: "Horarios de atención",
        componentType: "hours",
        order: 9,
      },
      {
        id: "experience",
        title: "Nuestra Historia",
        icon: "BookOpen",
        description: "Video y texto de experiencia",
        componentType: "experience",
        order: 10,
      },
      {
        id: "testimonialsWithSource",
        title: "Reseñas",
        icon: "MessageSquareQuote",
        description: "4 testimonios con fuente",
        componentType: "testimonialsWithSource",
        order: 11,
      },
      {
        id: "galleryEditor",
        title: "Galería de Platillos",
        icon: "Images",
        description: "6 fotos de platillos",
        componentType: "galleryEditor",
        order: 12,
      },
      {
        id: "bottomButtons",
        title: "Botones Inferiores",
        icon: "Globe",
        description: "Website, Share, Get Card",
        componentType: "bottomButtons",
        order: 13,
      },
      {
        id: "restaurantFooter",
        title: "Footer",
        icon: "MapPin",
        description: "Frase y dirección",
        componentType: "restaurantFooter",
        order: 14,
      },
      {
        id: "colors",
        title: "Colores",
        icon: "Palette",
        description: "Personaliza los colores",
        componentType: "colors",
        order: 15,
      },
    ],
  },

  // CONSTRUCTION - Project/services focused
  construction: {
    sector: "construction",
    label: "Construcción",
    description: "Portfolio para contratistas y constructoras",
    icon: "HardHat",
    color: "#D97706",
    sections: [
      {
        id: "singleBackground",
        title: "Imagen de Fondo",
        icon: "ImageIcon",
        description: "Imagen principal de fondo",
        componentType: "singleBackground",
        order: 1,
      },
      {
        id: "profile",
        title: "Perfil",
        icon: "User",
        description: "Información del contratista",
        componentType: "profile",
        order: 2,
      },
      {
        id: "constructionCta",
        title: "Solicitar Cotización",
        icon: "HardHat",
        description: "Botón principal de cotización",
        componentType: "constructionCta",
        order: 3,
      },
      {
        id: "contact",
        title: "Botones de Contacto",
        icon: "Phone",
        description: "Teléfono, WhatsApp, Email",
        componentType: "contact",
        order: 4,
      },
      {
        id: "social",
        title: "Redes Sociales",
        icon: "Share2",
        description: "Links a tus perfiles",
        componentType: "social",
        order: 5,
      },
      {
        id: "mainButtons",
        title: "Botones Principales",
        icon: "MousePointer2",
        description: "Refer, Review, Save Contact",
        componentType: "mainButtons",
        order: 6,
      },
      {
        id: "certifications",
        title: "Certificaciones",
        icon: "Award",
        description: "Licencias y seguros",
        componentType: "certifications",
        order: 7,
      },
      {
        id: "services9",
        title: "Servicios",
        icon: "Wrench",
        description: "9 tipos de servicios",
        componentType: "services9",
        order: 8,
      },
      {
        id: "video",
        title: "Video",
        icon: "Video",
        description: "Video de presentación",
        componentType: "video",
        order: 9,
      },
      {
        id: "featuresWithIcons",
        title: "Características",
        icon: "CheckCircle",
        description: "4 puntos con iconos",
        componentType: "featuresWithIcons",
        order: 10,
      },
      {
        id: "testimonialsEditor",
        title: "Testimonios",
        icon: "MessageSquareQuote",
        description: "4 testimonios de clientes",
        componentType: "testimonialsEditor",
        order: 11,
      },
      {
        id: "galleryEditor",
        title: "Proyectos Realizados",
        icon: "Images",
        description: "8 fotos de proyectos",
        componentType: "galleryEditor",
        order: 12,
      },
      {
        id: "bottomButtons",
        title: "Botones Inferiores",
        icon: "Globe",
        description: "Website, Share, Get Card",
        componentType: "bottomButtons",
        order: 13,
      },
      {
        id: "badgeFooter",
        title: "Footer",
        icon: "Award",
        description: "Frase y badge de licencia",
        componentType: "badgeFooter",
        order: 14,
      },
      {
        id: "colors",
        title: "Colores",
        icon: "Palette",
        description: "Personaliza los colores",
        componentType: "colors",
        order: 15,
      },
    ],
  },

  // REAL ESTATE - Property listings focused
  "real-estate": {
    sector: "real-estate",
    label: "Bienes Raíces",
    description: "Portafolio para agentes inmobiliarios",
    icon: "Home",
    color: "#10B981",
    sections: [
      {
        id: "singleBackground",
        title: "Imagen de Fondo",
        icon: "ImageIcon",
        description: "Imagen principal de fondo",
        componentType: "singleBackground",
        order: 1,
      },
      {
        id: "profile",
        title: "Información del Agente",
        icon: "User",
        description: "Nombre y datos del agente",
        componentType: "profile",
        order: 2,
      },
      {
        id: "realtorCta",
        title: "Agendar Visita",
        icon: "Calendar",
        description: "Botón y badge de idiomas",
        componentType: "realtorCta",
        order: 3,
      },
      {
        id: "contact",
        title: "Botones de Contacto",
        icon: "Phone",
        description: "Teléfono, WhatsApp, Email",
        componentType: "contact",
        order: 4,
      },
      {
        id: "social",
        title: "Redes Sociales",
        icon: "Share2",
        description: "Links a tus perfiles",
        componentType: "social",
        order: 5,
      },
      {
        id: "mainButtons",
        title: "Botones Principales",
        icon: "MousePointer2",
        description: "Refer, Review, Save Contact",
        componentType: "mainButtons",
        order: 6,
      },
      {
        id: "certifications",
        title: "Credenciales",
        icon: "Award",
        description: "Licencias y afiliaciones",
        componentType: "certifications",
        order: 7,
      },
      {
        id: "realtorServices",
        title: "Servicios",
        icon: "Briefcase",
        description: "Servicios para compradores y vendedores",
        componentType: "realtorServices",
        order: 8,
      },
      {
        id: "stats",
        title: "Estadísticas",
        icon: "BarChart3",
        description: "3 estadísticas de éxito",
        componentType: "stats",
        order: 9,
      },
      {
        id: "realtorFeatures",
        title: "Características",
        icon: "CheckCircle",
        description: "4 puntos diferenciadores",
        componentType: "realtorFeatures",
        order: 10,
      },
      {
        id: "testimonialsEditor",
        title: "Clientes Satisfechos",
        icon: "MessageSquareQuote",
        description: "4 testimonios de clientes",
        componentType: "testimonialsEditor",
        order: 11,
      },
      {
        id: "listings",
        title: "Propiedades",
        icon: "Home",
        description: "4 propiedades con precio",
        componentType: "listings",
        order: 12,
      },
      {
        id: "bottomButtons",
        title: "Botones Inferiores",
        icon: "Globe",
        description: "Website, Share, Get Card",
        componentType: "bottomButtons",
        order: 13,
      },
      {
        id: "realtorFooter",
        title: "Footer",
        icon: "Award",
        description: "Frase y badge de licencia",
        componentType: "realtorFooter",
        order: 14,
      },
      {
        id: "colors",
        title: "Colores",
        icon: "Palette",
        description: "Personaliza los colores",
        componentType: "colors",
        order: 15,
      },
    ],
  },

  // CLEANING - Service-focused (AllDry style)
  cleaning: {
    sector: "cleaning",
    label: "Limpieza / Restauración",
    description: "Servicios de limpieza y restauración",
    icon: "Sparkles",
    color: "#06B6D4",
    sections: [
      {
        id: "singleBackground",
        title: "Imagen de Fondo",
        icon: "ImageIcon",
        description: "Imagen principal de fondo",
        componentType: "singleBackground",
        order: 1,
      },
      {
        id: "profile",
        title: "Perfil",
        icon: "User",
        description: "Información del negocio",
        componentType: "profile",
        order: 2,
      },
      {
        id: "generalCta",
        title: "Reservar Servicio",
        icon: "Calendar",
        description: "Botón principal de reserva",
        componentType: "generalCta",
        order: 3,
      },
      {
        id: "contact",
        title: "Botones de Contacto",
        icon: "Phone",
        description: "Teléfono, WhatsApp, Email",
        componentType: "contact",
        order: 4,
      },
      {
        id: "social",
        title: "Redes Sociales",
        icon: "Share2",
        description: "Links a tus perfiles",
        componentType: "social",
        order: 5,
      },
      {
        id: "mainButtons",
        title: "Botones Principales",
        icon: "MousePointer2",
        description: "Refer, Review, Save Contact",
        componentType: "mainButtons",
        order: 6,
      },
      {
        id: "certifications",
        title: "Certificaciones",
        icon: "Award",
        description: "IICRC y seguros",
        componentType: "certifications",
        order: 7,
      },
      {
        id: "services9",
        title: "Servicios",
        icon: "Wrench",
        description: "9 tipos de servicios",
        componentType: "services9",
        order: 8,
      },
      {
        id: "video",
        title: "Video",
        icon: "Video",
        description: "Video de presentación",
        componentType: "video",
        order: 9,
      },
      {
        id: "featuresWithIcons",
        title: "Características",
        icon: "CheckCircle",
        description: "4 puntos con iconos",
        componentType: "featuresWithIcons",
        order: 10,
      },
      {
        id: "testimonialsEditor",
        title: "Testimonios",
        icon: "MessageSquareQuote",
        description: "4 testimonios de clientes",
        componentType: "testimonialsEditor",
        order: 11,
      },
      {
        id: "galleryEditor",
        title: "Antes y Después",
        icon: "Images",
        description: "8 fotos de resultados",
        componentType: "galleryEditor",
        order: 12,
      },
      {
        id: "bottomButtons",
        title: "Botones Inferiores",
        icon: "Globe",
        description: "Website, Share, Get Card",
        componentType: "bottomButtons",
        order: 13,
      },
      {
        id: "badgeFooter",
        title: "Footer",
        icon: "Award",
        description: "Frase y badge IICRC",
        componentType: "badgeFooter",
        order: 14,
      },
      {
        id: "colors",
        title: "Colores",
        icon: "Palette",
        description: "Personaliza los colores",
        componentType: "colors",
        order: 15,
      },
    ],
  },
};

// Helper to get schema for a sector
export function getSectorSchema(sector: TemplateSector): SectorSchema {
  return SECTOR_SCHEMAS[sector];
}

// Helper to get sorted sections for a sector
export function getSectorSections(sector: TemplateSector): EditorSectionConfig[] {
  const schema = SECTOR_SCHEMAS[sector];
  return [...schema.sections].sort((a, b) => a.order - b.order);
}

// Get all sectors for selection UI
export function getAllSectors(): SectorSchema[] {
  return Object.values(SECTOR_SCHEMAS);
}
