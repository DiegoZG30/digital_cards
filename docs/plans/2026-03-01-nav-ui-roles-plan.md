# Nav Fix + UI Polish + Roles Schema — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix admin-to-cards navigation, unify layout under single navbar, update role system to admin/pro/standard, remove public registration, and polish dark premium UI.

**Architecture:** Replace AdminLayout+Sidebar with UserLayout on all admin pages. Update Postgres enum from ["admin","user"] to ["admin","pro","standard"]. Remove register tab from login. Add admin sub-nav for admin pages (horizontal pills below navbar). Polish spacing/typography/cards globally.

**Tech Stack:** Next.js 16, Drizzle ORM, PostgreSQL, Tailwind CSS 4, shadcn/ui

---

### Task 1: Database Migration — Update app_role enum

**Files:**
- Create: `src/lib/db/migrations/add-roles.ts` (one-time migration script)
- Modify: `src/lib/db/schema.ts:16`

**Step 1: Update the schema enum definition**

In `src/lib/db/schema.ts`, change line 16 from:
```typescript
export const appRoleEnum = pgEnum("app_role", ["admin", "user"]);
```
to:
```typescript
export const appRoleEnum = pgEnum("app_role", ["admin", "pro", "standard"]);
```

**Step 2: Create and run the SQL migration**

Run this SQL against the database to alter the existing enum and migrate existing "user" rows:
```sql
-- Add new enum values
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'pro';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'standard';

-- Migrate existing "user" rows to "standard"
UPDATE users SET role = 'standard' WHERE role = 'user';

-- Note: Postgres doesn't support removing enum values easily.
-- "user" will remain in the enum but won't be used.
```

Run via: `psql` or Drizzle `db.execute(sql)` in a one-time script.

**Step 3: Verify migration**

```bash
cd /home/diego/biztec-connect/app && npx drizzle-kit generate
```

Confirm no diff errors. Check the DB has updated roles.

**Step 4: Commit**

```
feat(schema): update app_role enum to admin/pro/standard
```

---

### Task 2: Update useAuth hook — Support 3 roles

**Files:**
- Modify: `src/hooks/useAuth.tsx`

**Step 1: Update the AppRole type and add role helpers**

Replace the entire file content:

```typescript
"use client";

import { useEffect, useState, useCallback } from "react";

export type AppRole = "admin" | "pro" | "standard";

interface AuthUser {
  userId: string;
  email: string;
  role: AppRole;
}

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (data.user) {
        setState({ user: data.user, isLoading: false });
      } else {
        setState({ user: null, isLoading: false });
      }
    } catch {
      setState({ user: null, isLoading: false });
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setState({ user: null, isLoading: false });
  };

  const user = state.user;
  const isAdmin = user?.role === "admin";
  const isPro = user?.role === "pro" || isAdmin; // admin gets pro features too
  const isStandard = user?.role === "standard";

  return {
    user,
    isLoading: state.isLoading,
    isAdmin,
    isPro,
    isStandard,
    signOut,
    refetch: checkSession,
  };
}
```

Key changes:
- `AppRole` now includes `"pro"` and `"standard"` (not `"user"`)
- `isAdmin`, `isPro`, `isStandard` are derived booleans
- `isPro` is true for both "pro" and "admin" roles (admin gets everything)

**Step 2: Update session.ts return type**

In `src/lib/auth/session.ts:70`, change:
```typescript
role: user.role as "admin" | "user",
```
to:
```typescript
role: user.role as "admin" | "pro" | "standard",
```

**Step 3: Verify build compiles**

```bash
cd /home/diego/biztec-connect/app && npx next build 2>&1 | head -30
```

Fix any TypeScript errors from the `"user"` -> `"standard"` change.

**Step 4: Commit**

```
feat(auth): update useAuth for 3-role system (admin/pro/standard)
```

---

### Task 3: Update UserNavbar — Unified navigation with admin sub-nav

**Files:**
- Modify: `src/components/layout/UserNavbar.tsx`

**Step 1: Replace UserNavbar with unified version**

The new navbar:
- Logo always links to `/my-card`
- "Mi Tarjeta" and "Metricas" (pro+ only) as main nav
- "Admin" dropdown (admin only) with all 6 admin links
- When on an admin page, show a horizontal sub-nav below with admin links
- User avatar dropdown with role badge, logout
- Mobile: hamburger or sheet menu

Replace the full `UserNavbar` component. Key structural changes:

1. Import `useAuth` and use `isPro` (not `currentUser.plan === "pro"`)
2. Remove the `user` prop — get everything from `useAuth()`
3. Add `isAdminPage = pathname?.startsWith("/admin")` check
4. When `isAdminPage`: render a secondary nav bar below with admin links as horizontal pills
5. Logo always links to `/my-card` (not `/`)
6. Show role badge in user dropdown: "Admin", "Pro", "Standard"

**Step 2: Verify navigation works**

- Click logo from admin -> goes to `/my-card`
- Click "Admin" dropdown -> navigates to admin pages
- Admin sub-nav shows on all `/admin/*` pages
- "Mi Tarjeta" button always visible for returning to card editor

**Step 3: Commit**

```
feat(nav): unified navbar with admin sub-nav, fix admin->cards navigation
```

---

### Task 4: Remove AdminLayout and AdminSidebar — Switch admin pages to UserLayout

**Files:**
- Modify: `src/app/(dashboard)/admin/page.tsx` — replace `AdminLayout` with `UserLayout`
- Modify: `src/app/(dashboard)/admin/users/page.tsx` — same
- Modify: `src/app/(dashboard)/admin/templates/page.tsx` — same
- Modify: `src/app/(dashboard)/admin/invitations/page.tsx` — same
- Modify: `src/app/(dashboard)/admin/webhooks/page.tsx` — same
- Modify: `src/app/(dashboard)/admin/settings/page.tsx` — same
- Modify: `src/components/layout/index.ts` — remove AdminLayout/AdminSidebar exports
- Delete: `src/components/layout/AdminLayout.tsx`
- Delete: `src/components/layout/AdminSidebar.tsx`

**Step 1: For each admin page, make these changes:**

1. Change import from `AdminLayout` to `UserLayout`:
   ```typescript
   // Before
   import { AdminLayout } from "@/components/layout";
   // After
   import { UserLayout } from "@/components/layout";
   ```

2. Replace `<AdminLayout>` wrapper with `<UserLayout>`:
   ```typescript
   // Before
   <AdminLayout>
     {/* content */}
   </AdminLayout>
   // After
   <UserLayout>
     <div className="container mx-auto px-4 py-6 max-w-7xl">
       {/* content */}
     </div>
   </UserLayout>
   ```

3. Add the max-width container since admin pages no longer have the sidebar providing width constraints.

**Step 2: Update layout index exports**

In `src/components/layout/index.ts`, change to:
```typescript
export { UserNavbar } from "./UserNavbar";
export { UserLayout } from "./UserLayout";
```

**Step 3: Delete old files**

Delete `AdminLayout.tsx` and `AdminSidebar.tsx`.

**Step 4: Verify all admin pages render correctly**

Navigate to each admin page and confirm:
- UserNavbar appears at top
- Admin sub-nav shows
- Content is properly contained
- No visual breakage

**Step 5: Commit**

```
refactor(admin): replace AdminLayout with UserLayout across all admin pages
```

---

### Task 5: Remove public registration — Login only

**Files:**
- Modify: `src/app/(auth)/login/page.tsx`
- Modify: `src/app/api/auth/register/route.ts`

**Step 1: Simplify login page — remove register tab**

Replace the `Tabs` component with just the login form. Remove:
- `TabsList`, `TabsTrigger` for register
- `TabsContent value="register"` and its form
- `handleSignUp` function
- `Tabs` import

The login page becomes a simple card with email + password form only.

Update the subtitle from "Tarjetas digitales profesionales" to "Accede a tu cuenta" or similar.

Add a note at the bottom: "No tienes cuenta? Contacta a tu administrador."

**Step 2: Disable the register API**

In `src/app/api/auth/register/route.ts`, replace the POST handler to return 403:

```typescript
import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "El registro publico esta deshabilitado. Contacta a tu administrador." },
    { status: 403 }
  );
}
```

**Step 3: Verify**

- Visit `/login` — only login form shows
- Attempt POST to `/api/auth/register` — returns 403
- Login with existing credentials still works

**Step 4: Commit**

```
feat(auth): disable public registration, login-only access
```

---

### Task 6: Admin Invitations — Create users endpoint

**Files:**
- Create: `src/app/api/admin/invitations/route.ts`
- Modify: `src/app/(dashboard)/admin/invitations/page.tsx`

**Step 1: Create the API endpoint for admin to create users**

```typescript
// src/app/api/admin/invitations/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { users, profiles, subscriptions } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const { email, password, role } = await request.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { error: "Email y password (min 6 chars) requeridos" },
        { status: 400 }
      );
    }

    if (!["pro", "standard"].includes(role)) {
      return NextResponse.json(
        { error: "Role debe ser 'pro' o 'standard'" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email ya registrado" },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const [user] = await db
      .insert(users)
      .values({
        email: email.toLowerCase(),
        passwordHash,
        role,
      })
      .returning({ id: users.id });

    const slug = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-");

    await db.insert(profiles).values({ userId: user.id, slug });
    await db.insert(subscriptions).values({ userId: user.id, plan: role });

    return NextResponse.json({ success: true, userId: user.id });
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    console.error("Create user error:", error);
    return NextResponse.json({ error: "Error al crear usuario" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await requireAdmin();
    const allUsers = await db
      .select({
        id: users.id,
        email: users.email,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(users.createdAt);

    return NextResponse.json({ users: allUsers });
  } catch (error: any) {
    if (error.message === "Unauthorized" || error.message === "Forbidden") {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
```

**Step 2: Update invitations page to use real API**

Replace mock data with a form that calls `POST /api/admin/invitations` with email, temporary password, and role selection.

Show list of created users from `GET /api/admin/invitations`.

**Step 3: Verify**

- Admin can create a new user with role "pro" or "standard"
- New user can login with provided credentials
- Non-admin cannot access the endpoint

**Step 4: Commit**

```
feat(admin): real user creation endpoint for invite-only flow
```

---

### Task 7: UI Polish — Dark Premium improvements

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/layout/UserNavbar.tsx` (refinements)
- Possibly modify admin page components for spacing consistency

**Step 1: Typography and spacing improvements in globals.css**

Add/update these utility classes:
- `.page-header` — consistent page title styling (text-2xl font-bold tracking-tight)
- Better card hover states with subtle border glow
- Smooth transitions on all interactive elements
- Consistent container padding across pages

**Step 2: Refine card components**

- Add `transition-all duration-200` to cards
- Add subtle hover elevation: `hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5`
- Ensure consistent border-radius (rounded-xl preferred)

**Step 3: Polish navbar**

- Add subtle bottom border glow when scrolled
- Improve active state indicator
- Smooth dropdown animations

**Step 4: Verify visual consistency**

- Navigate all pages, check spacing is uniform
- Cards have consistent hover effects
- Typography hierarchy is clear (h1 > h2 > body)
- No visual regressions

**Step 5: Commit**

```
style: polish dark premium theme — typography, spacing, card hover effects
```

---

### Task 8: Update admin/users page — Show role instead of plan

**Files:**
- Modify: `src/app/(dashboard)/admin/users/page.tsx`
- Modify: `src/app/api/admin/users/[userId]/plan/route.ts` (rename concept to role)

**Step 1: Update users page to display role column**

Replace "Plan" column with "Role" column showing admin/pro/standard badges.
Update the dropdown to change role instead of plan.

**Step 2: Update the API route**

Rename/update `PUT /api/admin/users/[userId]/plan` to update `users.role` instead of subscription plan.

**Step 3: Verify**

- Users table shows correct roles
- Admin can change a user from standard to pro (and vice versa)
- Changes persist after page refresh

**Step 4: Commit**

```
feat(admin/users): display and manage roles instead of plans
```

---

### Task 9: Final verification and cleanup

**Step 1: Full navigation flow test**

- Login as admin -> lands on `/my-card`
- Click "Admin" -> navigate to admin dashboard
- Click "Mi Tarjeta" -> back to card editor (THE BUG FIX)
- Click through all admin pages via sub-nav
- Logout -> login page (no register option)

**Step 2: Role-based visibility test**

- As admin: see Admin dropdown, Metricas, all admin pages
- As pro: see Metricas, no Admin dropdown
- As standard: no Metricas, no Admin

**Step 3: Build check**

```bash
cd /home/diego/biztec-connect/app && npx next build
```

Must compile with zero errors.

**Step 4: Final commit**

```
chore: cleanup unused imports and verify build
```
