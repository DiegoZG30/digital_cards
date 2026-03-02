# Nav Fix + UI Polish + Roles Schema

## Context
Admin section has no way to navigate back to user area (My Card).
Client spec requires 3 roles: admin, pro, standard.
Invite-only registration (admin creates accounts).

## Decisions

### 1. Unified Navbar (eliminate AdminLayout/Sidebar)
- All pages use `UserNavbar` + `UserLayout`
- Admin pages stop using `AdminLayout`/`AdminSidebar`
- Logo always links to `/my-card`
- Nav: Mi Tarjeta | Metricas (pro+) | Admin dropdown (admin only) | Avatar menu

### 2. Role Schema: admin | pro | standard
- Update `app_role` enum from `["admin","user"]` to `["admin","pro","standard"]`
- `role` is source of truth (remove frontend `plan` field)
- Middleware enforces access per role

### 3. Invite-Only Registration
- Remove "Registrarse" tab from login page
- Admin creates invitations at `/admin/invitations`
- Flow: admin sets email+role -> generates unique link -> user sets password

### 4. UI Polish (Dark Premium)
- Better spacing, typography hierarchy
- Softer borders, subtle shadows
- Smooth hover transitions
- Admin pages use same container style as user pages

### 5. Out of Scope
- Mini-CRM, Leads, Referidos
- VCF import, ReferUs
- Stripe/GHL integration
- Feature flags backend
