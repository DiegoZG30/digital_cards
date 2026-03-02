# Draft vs Published Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Allow users to edit their card (draft) without affecting the live public version until they explicitly publish.

**Architecture:** Add a `published_data` JSONB column to the profiles table. When the user publishes, the entire profile + related arrays are serialized into this column. The public card page reads from this snapshot. The editor always works with the live profile row (draft).

**Tech Stack:** Drizzle ORM, PostgreSQL JSONB, Next.js API Routes, React hooks

---

### Task 1: Add published_data column to schema

**Files:**
- Modify: `src/lib/db/schema.ts:73-118`

**Step 1: Add column to profiles table**

In `src/lib/db/schema.ts`, add `publishedData` and `publishedAt` columns to the profiles table, right after line 86 (`isPublished`):

```typescript
publishedData: jsonb("published_data"),
publishedAt: timestamp("published_at"),
```

**Step 2: Run the migration against the database**

Run SQL directly against the Postgres database to add the column:

```bash
# Get the DATABASE_URL from the .env file, then run:
psql "$DATABASE_URL" -c "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS published_data JSONB DEFAULT NULL; ALTER TABLE profiles ADD COLUMN IF NOT EXISTS published_at TIMESTAMP DEFAULT NULL;"
```

**Step 3: Verify build compiles**

```bash
cd /home/diego/biztec-connect/app && source ~/.nvm/nvm.sh && nvm use 20 && npx next build
```

Expected: Build succeeds with no errors.

**Step 4: Commit**

```bash
git add src/lib/db/schema.ts
git commit -m "feat(schema): add published_data JSONB and published_at columns"
```

---

### Task 2: Create POST /api/profiles/publish endpoint

**Files:**
- Create: `src/app/api/profiles/publish/route.ts`

**Step 1: Create the publish endpoint**

Create `src/app/api/profiles/publish/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { profiles, testimonials, certificates, galleryImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST() {
  try {
    const { userId } = await requireAuth();

    // Fetch current profile
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId))
      .limit(1);

    if (!profile) {
      return NextResponse.json({ error: "No profile found" }, { status: 404 });
    }

    // Fetch related data in parallel
    const [profileTestimonials, profileCertificates, profileGallery] =
      await Promise.all([
        db.select().from(testimonials).where(eq(testimonials.profileId, profile.id)).orderBy(testimonials.sortOrder),
        db.select().from(certificates).where(eq(certificates.profileId, profile.id)).orderBy(certificates.sortOrder),
        db.select().from(galleryImages).where(eq(galleryImages.profileId, profile.id)).orderBy(galleryImages.sortOrder),
      ]);

    // Build the snapshot - include everything the public card needs
    const snapshot = {
      // Profile fields
      fullName: profile.fullName,
      title: profile.title,
      company: profile.company,
      profileImageUrl: profile.profileImageUrl,
      coverImageUrl: profile.coverImageUrl,
      phone: profile.phone,
      whatsapp: profile.whatsapp,
      email: profile.email,
      bio: profile.bio,
      videoUrl: profile.videoUrl,
      ctaText: profile.ctaText,
      ctaUrl: profile.ctaUrl,
      bookingUrl: profile.bookingUrl,
      bookingType: profile.bookingType,
      websiteUrl: profile.websiteUrl,
      reviewUrl: profile.reviewUrl,
      backgroundImageUrl: profile.backgroundImageUrl,
      sectionTitle: profile.sectionTitle,
      ctaButtonText: profile.ctaButtonText,
      slug: profile.slug,
      sector: profile.sector,
      selectedTemplateId: profile.selectedTemplateId,
      // JSONB fields
      services: profile.services,
      socialLinks: profile.socialLinks,
      customStyles: profile.customStyles,
      customData: profile.customData,
      // Related arrays
      testimonials: profileTestimonials,
      certificates: profileCertificates,
      gallery_images: profileGallery,
    };

    // Save snapshot and mark as published
    const now = new Date();
    await db
      .update(profiles)
      .set({
        publishedData: snapshot,
        publishedAt: now,
        isPublished: true,
        updatedAt: now,
      })
      .where(eq(profiles.id, profile.id));

    return NextResponse.json({
      success: true,
      publishedAt: now.toISOString(),
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("Publish error:", error);
    return NextResponse.json({ error: "Error al publicar" }, { status: 500 });
  }
}
```

**Step 2: Verify build**

```bash
npx next build 2>&1 | tail -5
```

Expected: Build succeeds, new route appears in output.

**Step 3: Commit**

```bash
git add src/app/api/profiles/publish/route.ts
git commit -m "feat(api): add POST /api/profiles/publish endpoint"
```

---

### Task 3: Update public card to read from published_data

**Files:**
- Modify: `src/app/[username]/page.tsx:58-219`

**Step 1: Update PublicCardPage to use snapshot**

In `src/app/[username]/page.tsx`, after fetching the profile (line 66), add logic to extract data from `published_data` if it exists. The key change is in the data extraction section.

After line 70 (`if (!profile) { notFound(); }`), add:

```typescript
// Use published snapshot if available, otherwise fallback to live data
const publishedSnapshot = profile.publishedData as Record<string, unknown> | null;
```

Then replace the parallel fetch block (lines 73-102) with:

```typescript
// If we have a published snapshot, use it directly
// Otherwise fallback to live data (backward compat for cards published before this feature)
let profileTestimonials: typeof testimonials.$inferSelect[] = [];
let profileCertificates: typeof certificates.$inferSelect[] = [];
let profileGallery: typeof galleryImages.$inferSelect[] = [];
let templateRow: { htmlContent: string; sector: string | null } | null = null;

if (publishedSnapshot) {
  // Extract from snapshot
  profileTestimonials = (publishedSnapshot.testimonials as typeof profileTestimonials) || [];
  profileCertificates = (publishedSnapshot.certificates as typeof profileCertificates) || [];
  profileGallery = (publishedSnapshot.gallery_images as typeof profileGallery) || [];

  // Still need to fetch template HTML (not stored in snapshot to avoid duplication)
  const templateId = publishedSnapshot.selectedTemplateId as string | null;
  if (templateId) {
    templateRow = await db
      .select({ htmlContent: templates.htmlContent, sector: templates.sector })
      .from(templates)
      .where(eq(templates.id, templateId))
      .limit(1)
      .then((rows) => rows[0] ?? null);
  }
} else {
  // Backward compat: fetch from related tables
  [profileTestimonials, profileCertificates, profileGallery, templateRow] =
    await Promise.all([
      db.select().from(testimonials).where(eq(testimonials.profileId, profile.id)).orderBy(testimonials.sortOrder),
      db.select().from(certificates).where(eq(certificates.profileId, profile.id)).orderBy(certificates.sortOrder),
      db.select().from(galleryImages).where(eq(galleryImages.profileId, profile.id)).orderBy(galleryImages.sortOrder),
      profile.selectedTemplateId
        ? db.select({ htmlContent: templates.htmlContent, sector: templates.sector }).from(templates).where(eq(templates.id, profile.selectedTemplateId)).limit(1).then((rows) => rows[0] ?? null)
        : Promise.resolve(null),
    ]);
}
```

Then for the data mapping section (lines 105+), when `publishedSnapshot` exists, read profile fields from the snapshot:

```typescript
// Source of truth: snapshot if available, otherwise live profile columns
const src = publishedSnapshot || profile;
const socialLinksData = ((src as Record<string,unknown>).socialLinks ?? (src as Record<string,unknown>).social_links ?? {}) as Record<string, string>;
```

And update references throughout to use `src` for field access when building `cardData`.

**Step 2: Verify build**

```bash
npx next build 2>&1 | tail -5
```

**Step 3: Commit**

```bash
git add src/app/\\[username\\]/page.tsx
git commit -m "feat(public-card): read from published_data snapshot with fallback"
```

---

### Task 4: Add publishToLive action in useCardData hook

**Files:**
- Modify: `src/hooks/useCardData.tsx`

**Step 1: Add state and action**

Add to `CardDataContextType` interface (after line 197 `isPublished`):

```typescript
publishedAt: string | null;
hasUnpublishedChanges: boolean;
```

Add to interface (after line 268 `saveToDatabase`):

```typescript
publishToLive: () => Promise<void>;
unpublish: () => Promise<void>;
```

**Step 2: Add state variables**

In `CardDataProvider`, after `isSaving` state (line 292):

```typescript
const [publishedAt, setPublishedAt] = useState<string | null>(null);
```

**Step 3: Load publishedAt from profile**

In `loadProfile()`, after `setIsPublished` (line 319), add:

```typescript
setPublishedAt(profile.publishedAt ?? profile.published_at ?? null);
```

**Step 4: Add publishToLive function**

After `saveToDatabase` function, add:

```typescript
const publishToLive = useCallback(async () => {
  // Save draft first, then publish
  await saveToDatabase();

  try {
    const res = await fetch("/api/profiles/publish", { method: "POST" });
    if (!res.ok) throw new Error("Publish failed");
    const data = await res.json();
    setIsPublished(true);
    setPublishedAt(data.publishedAt);
    setHasChanges(false);
    toast.success("Tarjeta publicada exitosamente");
  } catch (error) {
    console.error("Publish error:", error);
    toast.error("Error al publicar la tarjeta");
  }
}, [saveToDatabase]);

const unpublish = useCallback(async () => {
  try {
    const res = await fetch("/api/profiles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: false }),
    });
    if (!res.ok) throw new Error("Unpublish failed");
    setIsPublished(false);
    toast.success("Tarjeta despublicada");
  } catch (error) {
    console.error("Unpublish error:", error);
    toast.error("Error al despublicar");
  }
}, []);
```

**Step 5: Compute hasUnpublishedChanges**

After the state variables section:

```typescript
const hasUnpublishedChanges = isPublished && hasChanges;
```

**Step 6: Add to context value**

In the `value` object (line 879+), add:

```typescript
publishedAt,
hasUnpublishedChanges,
publishToLive,
unpublish,
```

**Step 7: Verify build**

```bash
npx next build 2>&1 | tail -5
```

**Step 8: Commit**

```bash
git add src/hooks/useCardData.tsx
git commit -m "feat(hook): add publishToLive and unpublish actions"
```

---

### Task 5: Update my-card editor UI with publish button

**Files:**
- Modify: `src/app/(dashboard)/my-card/page.tsx:242-329`

**Step 1: Update destructured values from useCardData**

In the `MyCardEditor` component, update the destructure (around line 54) to include new values:

```typescript
const {
  // ... existing fields ...
  publishedAt,
  hasUnpublishedChanges,
  publishToLive,
  unpublish,
} = useCardData();
```

**Step 2: Replace the publish toggle section**

Replace the current toggle block (lines 294-316) with:

```tsx
{/* Publish controls */}
{isPublished ? (
  <>
    {/* Unpublish dropdown or small link */}
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-green-500 text-sm">
        <Globe className="w-4 h-4" />
        <span className="font-medium">Publicada</span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-xs text-muted-foreground hover:text-destructive"
        onClick={unpublish}
      >
        Despublicar
      </Button>
    </div>
    {cardData.slug && (
      <a
        href={`/${cardData.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-primary hover:underline"
      >
        <LinkIcon className="w-3 h-3" />
        /{cardData.slug}
      </a>
    )}
  </>
) : null}
```

**Step 3: Replace the save button with save + publish buttons**

Replace the current save button (lines 318-325) with:

```tsx
{/* Save draft button */}
<Button
  variant="outline"
  onClick={handleSave}
  disabled={!hasChanges || isSaving}
>
  <Save className="w-4 h-4 mr-2" />
  {isSaving ? "Guardando..." : "Guardar borrador"}
</Button>

{/* Publish button */}
<Button
  className="btn-gold-glow bg-primary text-primary-foreground hover:bg-primary/90"
  onClick={publishToLive}
  disabled={isSaving}
>
  <Globe className="w-4 h-4 mr-2" />
  {isPublished ? "Publicar cambios" : "Publicar tarjeta"}
</Button>
```

**Step 4: Add unpublished changes indicator**

Below the header bar (after the closing `</div>` of the sticky header), add a banner:

```tsx
{isPublished && hasChanges && (
  <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2">
    <div className="container mx-auto flex items-center gap-2 text-sm text-amber-400">
      <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
      Tienes cambios sin publicar. Tu tarjeta publica no se ha actualizado.
    </div>
  </div>
)}
```

**Step 5: Verify build**

```bash
npx next build 2>&1 | tail -5
```

**Step 6: Commit**

```bash
git add src/app/\\(dashboard\\)/my-card/page.tsx
git commit -m "feat(ui): replace publish toggle with draft/publish workflow"
```

---

### Task 6: Final integration test and commit

**Step 1: Full build verification**

```bash
cd /home/diego/biztec-connect/app && source ~/.nvm/nvm.sh && nvm use 20 && npx next build
```

Expected: Clean build, no errors.

**Step 2: Verify all files are committed**

```bash
git status
git log --oneline -6
```

Expected: Clean working tree, 5 new commits visible.

**Step 3: Push to deploy**

```bash
git push origin main
```
