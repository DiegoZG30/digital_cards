/**
 * Seed script for biztec-connect
 *
 * Inserts:
 *   1. Master admin user (diegozapatagallo23@gmail.com)
 *   2. 5 HTML templates from /home/diego/ADVANCED MARKETING/HECTOR/
 *
 * Idempotent: checks existence before inserting (admin by email, templates by name).
 *
 * Usage:
 *   DATABASE_URL=postgres://... node drizzle/seed.mjs
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import pg from "pg";
import bcrypt from "bcryptjs";

const { Client } = pg;

// ── Template definitions ────────────────────────────────────────────────────

const TEMPLATES = [
  {
    name: "RESTAURANT V1",
    sector: "restaurant",
    description:
      "Tarjeta digital elegante para restaurantes con paleta dorada, secciones de menu, galeria y reservas.",
    file: "/home/diego/ADVANCED MARKETING/HECTOR/01-restaurant-TEMPLATE.html",
  },
  {
    name: "Real Estate v1",
    sector: "real-estate",
    description:
      "Tarjeta digital profesional para agentes inmobiliarios con listados de propiedades, CTA de contacto y galeria.",
    file: "/home/diego/ADVANCED MARKETING/HECTOR/02-realtor-TEMPLATE.html",
  },
  {
    name: "Construccion v1",
    sector: "construction",
    description:
      "Tarjeta digital para empresas de construccion con portafolio de proyectos, certificaciones y servicios.",
    file: "/home/diego/ADVANCED MARKETING/HECTOR/03-construction-TEMPLATE.html",
  },
  {
    name: "Limpieza",
    sector: "cleaning",
    description:
      "Tarjeta digital para servicios de limpieza profesional con listado de servicios, testimonios y cotizaciones.",
    file: "/home/diego/ADVANCED MARKETING/HECTOR/04-alldry-TEMPLATE.html",
  },
  {
    name: "PLANTILLA V1",
    sector: "general",
    description:
      "Plantilla general multiproposito adaptable a cualquier sector con diseno moderno azul profesional.",
    file: "/home/diego/ADVANCED MARKETING/HECTOR/05-general-TEMPLATE.html",
  },
];

// ── Main seed function ──────────────────────────────────────────────────────

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not set, skipping seed");
    process.exit(1);
  }

  const client = new Client({ connectionString: databaseUrl });

  try {
    await client.connect();
    console.log("[seed] Connected to database");

    // ── 1. Admin user ─────────────────────────────────────────────────────

    const adminEmail = "diegozapatagallo23@gmail.com";
    const adminPassword = "administraci\u00f3n2025";
    const passwordHash = await bcrypt.hash(adminPassword, 12);

    const adminResult = await client.query(
      `INSERT INTO users (email, password_hash, role)
       VALUES ($1, $2, 'admin')
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [adminEmail, passwordHash]
    );

    if (adminResult.rowCount > 0) {
      console.log(`[seed] Admin user created: ${adminEmail}`);
    } else {
      console.log(`[seed] Admin user already exists: ${adminEmail}`);
    }

    // ── 2. Templates ──────────────────────────────────────────────────────

    for (const tpl of TEMPLATES) {
      // Check if template already exists by name + sector
      const existing = await client.query(
        `SELECT id FROM templates WHERE name = $1 AND sector = $2::template_sector`,
        [tpl.name, tpl.sector]
      );

      if (existing.rows.length > 0) {
        console.log(`[seed] Template already exists: ${tpl.name} (${tpl.sector})`);
        continue;
      }

      const filePath = resolve(tpl.file);
      let htmlContent;

      try {
        htmlContent = readFileSync(filePath, "utf-8");
      } catch (err) {
        console.error(`[seed] Could not read template file: ${filePath}`);
        console.error(`       ${err.message}`);
        continue;
      }

      await client.query(
        `INSERT INTO templates (name, sector, description, html_content, is_active)
         VALUES ($1, $2::template_sector, $3, $4, true)`,
        [tpl.name, tpl.sector, tpl.description, htmlContent]
      );

      console.log(`[seed] Template inserted: ${tpl.name} (${tpl.sector})`);
    }

    console.log("[seed] Seed complete");
  } catch (error) {
    console.error("[seed] Seed failed:", error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();
