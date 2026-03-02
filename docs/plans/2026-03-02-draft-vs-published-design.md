# Design: Draft vs Published (JSONB Snapshot)

**Date:** 2026-03-02
**Status:** Approved
**Approach:** Option A - JSONB Snapshot column

## Problem

Currently all edits go directly to the profiles table, which is the same data source for public cards. Users cannot edit their card without immediately affecting the live version.

## Solution

Add a `published_data` JSONB column to profiles. The public card reads from this snapshot. Users edit the live profile freely (draft), and explicitly "Publish" to update the snapshot.

## Schema Change

```sql
ALTER TABLE profiles ADD COLUMN published_data JSONB DEFAULT NULL;
```

## New API Endpoint

### POST /api/profiles/publish
1. Read current profile + testimonials + certificates + gallery
2. Serialize all into one JSONB object
3. Save to `published_data`, set `isPublished = true`
4. Return success with published timestamp

## Changes to Public Card ([username]/page.tsx)

- If `published_data` exists AND `isPublished = true`: render from snapshot
- If `published_data` is null AND `isPublished = true`: fallback to live data (backward compat)
- If `isPublished = false`: 404

## UI Changes (my-card/page.tsx)

- Replace toggle "Publicar tarjeta" with button "Publicar cambios"
- Show "Cambios sin publicar" indicator when draft differs from published
- "Guardar" = save draft only
- "Publicar cambios" = save draft + create snapshot
- First-time publish: button says "Publicar tarjeta"

## Files Affected

| File | Change |
|------|--------|
| src/lib/db/schema.ts | Add `published_data` column |
| migrations/0004_add_published_data.sql | Schema migration |
| src/app/api/profiles/publish/route.ts | New endpoint |
| src/app/[username]/page.tsx | Read from published_data |
| src/hooks/useCardData.tsx | Add publish action |
| src/app/(dashboard)/my-card/page.tsx | Replace toggle with publish button |

## Backward Compatibility

- Existing published cards (published_data = null): fallback to live data
- Existing unpublished cards: no change
- First publish after migration: creates snapshot from current data

## Estimated LOC: ~120 lines added/modified
