import { relations } from "drizzle-orm";
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

// ─── Enums ──────────────────────────────────────────────────────────────────────

export const appRoleEnum = pgEnum("app_role", ["admin", "user"]);
export const templateSectorEnum = pgEnum("template_sector", [
  "general",
  "restaurant",
  "real-estate",
  "construction",
  "cleaning",
]);

// ─── Users ──────────────────────────────────────────────────────────────────────
// Replaces Supabase auth.users + user_roles

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: appRoleEnum("role").default("user").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Sessions ───────────────────────────────────────────────────────────────────
// Custom auth sessions (replaces Supabase auth sessions)

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [index("idx_sessions_token").on(table.token)]
);

// ─── Templates ──────────────────────────────────────────────────────────────────

export const templates = pgTable("templates", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  sector: templateSectorEnum("sector").default("general").notNull(),
  description: text("description"),
  htmlContent: text("html_content").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  isActive: boolean("is_active").default(true).notNull(),
  editorSchema: jsonb("editor_schema"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Profiles ───────────────────────────────────────────────────────────────────
// Main card data table (~25 columns from accumulated migrations)

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: "cascade" }),
    selectedTemplateId: uuid("selected_template_id").references(
      () => templates.id,
      { onDelete: "set null" }
    ),
    slug: text("slug").unique(),
    isPublished: boolean("is_published").default(false),
    fullName: text("full_name"),
    title: text("title"),
    company: text("company"),
    profileImageUrl: text("profile_image_url"),
    coverImageUrl: text("cover_image_url"),
    phone: text("phone"),
    whatsapp: text("whatsapp"),
    email: text("email"),
    bio: text("bio"),
    videoUrl: text("video_url"),
    ctaText: text("cta_text"),
    ctaUrl: text("cta_url"),
    bookingUrl: text("booking_url"),
    bookingType: text("booking_type"),
    websiteUrl: text("website_url"),
    reviewUrl: text("review_url"),
    backgroundImageUrl: text("background_image_url"),
    sectionTitle: text("section_title"),
    services: jsonb("services"),
    ctaButtonText: text("cta_button_text"),
    socialLinks: jsonb("social_links"),
    customStyles: jsonb("custom_styles"),
    customData: jsonb("custom_data"),
    sector: text("sector"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [
    index("idx_profiles_slug").on(table.slug),
    index("idx_profiles_user_id").on(table.userId),
  ]
);

// ─── Testimonials ───────────────────────────────────────────────────────────────

export const testimonials = pgTable(
  "testimonials",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    content: text("content").notNull(),
    rating: integer("rating").default(5).notNull(),
    videoUrl: text("video_url"),
    sortOrder: integer("sort_order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [index("idx_testimonials_profile_id").on(table.profileId)]
);

// ─── Certificates ───────────────────────────────────────────────────────────────

export const certificates = pgTable(
  "certificates",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    imageUrl: text("image_url"),
    licenseNumber: text("license_number"),
    sortOrder: integer("sort_order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [index("idx_certificates_profile_id").on(table.profileId)]
);

// ─── Gallery Images ─────────────────────────────────────────────────────────────

export const galleryImages = pgTable(
  "gallery_images",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    imageUrl: text("image_url").notNull(),
    caption: text("caption"),
    sortOrder: integer("sort_order").default(0),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
  },
  (table) => [index("idx_gallery_images_profile_id").on(table.profileId)]
);

// ─── Analytics Events ───────────────────────────────────────────────────────────

export const analyticsEvents = pgTable(
  "analytics_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),
    eventType: text("event_type").notNull(),
    buttonName: text("button_name"),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    index("idx_analytics_events_profile_id").on(table.profileId),
    index("idx_analytics_events_created_at").on(table.createdAt),
    index("idx_analytics_events_type").on(table.eventType),
  ]
);

// ─── Subscriptions ──────────────────────────────────────────────────────────────

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  plan: text("plan").default("standard").notNull(),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// ─── Relations ──────────────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ one, many }) => ({
  sessions: many(sessions),
  profile: one(profiles),
  subscription: one(subscriptions),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const templatesRelations = relations(templates, ({ many }) => ({
  profiles: many(profiles),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
  selectedTemplate: one(templates, {
    fields: [profiles.selectedTemplateId],
    references: [templates.id],
  }),
  testimonials: many(testimonials),
  certificates: many(certificates),
  galleryImages: many(galleryImages),
  analyticsEvents: many(analyticsEvents),
}));

export const testimonialsRelations = relations(testimonials, ({ one }) => ({
  profile: one(profiles, {
    fields: [testimonials.profileId],
    references: [profiles.id],
  }),
}));

export const certificatesRelations = relations(certificates, ({ one }) => ({
  profile: one(profiles, {
    fields: [certificates.profileId],
    references: [profiles.id],
  }),
}));

export const galleryImagesRelations = relations(galleryImages, ({ one }) => ({
  profile: one(profiles, {
    fields: [galleryImages.profileId],
    references: [profiles.id],
  }),
}));

export const analyticsEventsRelations = relations(
  analyticsEvents,
  ({ one }) => ({
    profile: one(profiles, {
      fields: [analyticsEvents.profileId],
      references: [profiles.id],
    }),
  })
);

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));
