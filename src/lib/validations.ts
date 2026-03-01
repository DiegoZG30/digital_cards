import { z } from "zod";

// Optional string that accepts empty string
const optionalString = z.string().max(100, "Maximo 100 caracteres").optional().or(z.literal(""));

// Optional URL that accepts empty string
const optionalUrl = z.string()
  .refine(
    (val) => val === "" || /^https?:\/\/.+/.test(val),
    { message: "URL invalida - debe empezar con http:// o https://" }
  )
  .optional()
  .or(z.literal(""));

// Optional phone that accepts empty string
const optionalPhone = z.string()
  .refine(
    (val) => val === "" || /^[+]?[\d\s()-]{7,20}$/.test(val.replace(/\s/g, "")),
    { message: "Telefono invalido - usa formato: +52 123 456 7890" }
  )
  .optional()
  .or(z.literal(""));

// Optional email that accepts empty string
const optionalEmail = z.string()
  .refine(
    (val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
    { message: "Email invalido" }
  )
  .optional()
  .or(z.literal(""));

// Profile schema
export const profileSchema = z.object({
  fullName: z.string().min(1, "Nombre es requerido").max(100, "Maximo 100 caracteres"),
  title: optionalString,
  company: optionalString,
});

// Contact schema
export const contactSchema = z.object({
  phone: optionalPhone,
  whatsapp: optionalPhone,
  email: optionalEmail,
});

// Social links schema
export const socialSchema = z.object({
  instagram: optionalUrl,
  facebook: optionalUrl,
  linkedin: optionalUrl,
  twitter: optionalUrl,
  youtube: optionalUrl,
  tiktok: optionalUrl,
});

// Website URL schema
export const websiteUrlSchema = optionalUrl;

// Reserved slugs that cannot be used (match existing routes)
const RESERVED_SLUGS = ['login', 'admin', 'pricing', 'my-card', 'my-analytics', 'api', 'app'];

// Slug schema for username/URL
export const slugSchema = z.string()
  .min(3, "Minimo 3 caracteres")
  .max(60, "Maximo 60 caracteres")
  .regex(/^[a-z0-9-]+$/, "Solo letras minusculas, numeros y guiones")
  .regex(/^[a-z0-9]/, "Debe empezar con letra o numero")
  .regex(/[a-z0-9]$/, "Debe terminar con letra o numero")
  .refine(
    (val) => !RESERVED_SLUGS.includes(val),
    { message: "Este nombre esta reservado, elige otro" }
  )
  .optional()
  .or(z.literal(""));

// Helper to format slug (lowercase, only valid chars, no double dashes)
export function formatSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/--+/g, '-')
    .slice(0, 60);
}

// Helper to validate and get error message (returns null if valid)
export function getValidationError<T>(
  schema: z.ZodType<T>,
  value: unknown
): string | null {
  const result = schema.safeParse(value);
  if (result.success) {
    return null;
  }
  return result.error.issues[0]?.message || "Valor invalido";
}
