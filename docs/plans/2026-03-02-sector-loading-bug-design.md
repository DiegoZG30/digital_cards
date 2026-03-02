# Fix: Sector Selection Flash Bug

**Date:** 2026-03-02
**Status:** Approved
**Scope:** Bug fix - minimal change

## Problem

When navigating to "Mi Tarjeta" from another page, the sector selection screen flashes for 1-2 seconds before the editor loads. This happens because:

1. Component mounts with empty state (`selectedSector = null`)
2. `currentView` computes `"sector"` (shows selector UI)
3. `loadProfile()` fetches data from server and updates state
4. Once sector/template state updates, view switches to `"editor"`

The gap between steps 2 and 4 causes the visual flash.

## Root Cause

In `useCardData.tsx`, `loadProfile()` sets `isLoading = false` but React may render before processing the `setSelectedSector()` and `setSelectedTemplateId()` updates from the same function. The `currentView` in `my-card/page.tsx` sees `isLoading = false` + `selectedSector = null` and shows the sector selector.

## Solution: Loading Gate

Ensure `isLoading` stays `true` until ALL profile state (including sector and template) is fully set. The loading spinner already exists in `my-card/page.tsx:118-126`.

### Changes

**File: `src/hooks/useCardData.tsx`**
- In `loadProfile()`: restructure so `setIsLoading(false)` is called AFTER `setSelectedSector()` and `setSelectedTemplateId()` in a way that React batches them in the same render cycle
- If profile has sector+template saved, these must be set before loading completes

### Expected Behavior

| Scenario | Before | After |
|----------|--------|-------|
| User has saved sector+template | Flash selector -> editor | Spinner -> editor |
| User has no sector saved | Flash selector (stays) | Spinner -> selector |
| Page refresh | Flash selector -> editor | Spinner -> editor |

## Files Affected

- `src/hooks/useCardData.tsx` (~10 lines changed)

## Risk

Low - only changes the timing of when `isLoading` becomes false. No logic changes.
