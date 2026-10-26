# Miss Kudi Productions — B2B Garment Manufacturing & Factory Operations OS

End-to-end B2B garment production platform and **Nexus-powered Factory Operations OS** for **Miss Kudi Productions** (Lagos, Nigeria).

## Key Productivity & Role-Based Features

### 1. Three-Tier Role-Based Access Control (`superadmin`, `admin`, `staff`)
- **[`/superadmin`](src/app/superadmin/page.tsx) — Superadmin Multi-Facility HQ Control Center**:
  - Multi-facility consolidated telemetry across **Yaba Flagship Production Plant**, **Victoria Island Bespoke & Bridal Atelier**, and **Ikeja Bulk Uniform & Industrial Depot**.
  - Provision & edit factory plants, manage global Clerk staff access tiers (`superadmin`, `admin`, `staff`), verify NeonDB schema tables, and inspect the immutable security audit trail.
- **[`/dashboard`](src/app/dashboard/page.tsx) — Adaptive Admin & Artisan Staff Dashboard**:
  - **Factory Admin View (`admin` / `superadmin`)**: Plant-level Revenue, COGS, OpEx, True Net Profit, critical fabric stockout alerts, and production stage velocity.
  - **Artisan Staff View (`staff`)**: Personal workstation terminal tailored to **Pattern Designers**, **Cutting Masters**, **Master Tailors**, and **Quality Control (QC) Inspectors** with 1-click shift status toggles (`CLOCKED_IN`, `BREAK`, `OFF_SHIFT`) and role-specific batch completion actions.
- **[`/login`](src/app/login/page.tsx) — Clerk Identity Sign-In & 1-Click Role Switcher**:
  - Built with password-manager autofill (`autocomplete="username"` / `autocomplete="current-password"`) and 1-click role switching across all 11 pre-provisioned Lagos factory accounts.

### 2. Nexus Commerce OS Modules Adapted for Garment Manufacturing
1. **Live Production Order Pipeline & Printable Job Ticket (`01_brief` → `05_dispatch`)**: Real-time tracking in [`/tracker`](src/app/tracker/page.tsx) and [`/workspace`](src/app/workspace/page.tsx) with printable Factory Job Tickets & AQL 2.5 QC Passports ([`ProductionJobTicketModal.tsx`](src/app/components/ProductionJobTicketModal.tsx)).
2. **Artisan Floor Roster**: Replaces retail POS tellers with **Pattern Designers, Cutting Masters, Master Tailors / Sewing Leads, and Quality Control (QC) Inspectors**.
3. **Fabric & Trim Inventory Velocity + 1-Click Auto-POs**: 30-day meter/piece burn-rate runway, stockout countdowns, and 1-click Supplier Purchase Order generation & receiving.
4. **Live MOQ, Yardage & Volume Tier Estimator**: Built into [`QuoteForm.tsx`](src/app/components/QuoteForm.tsx) with XS–XXL size breakdown ratios and B2B promo codes (`LAGOSFASHION10`, `BULK500`, `FIRSTSAMPLE`).
5. **Interactive Size Grading & Fabric Consumption Calculator**: Available on [`/size-charts`](src/app/size-charts/page.tsx) with 1-click sync into the Quote Form.
6. **True Net Profit, Factory OpEx Ledger & Accounting CSV Export**: Tracks generator diesel, machinery maintenance, artisan payroll, and logistics against production revenue.

### 3. Neon Serverless PostgreSQL & Clerk Integration
- **SQL Schema**: [`db/neon-schema.sql`](db/neon-schema.sql) defines all 7 production tables (`factory_branches`, `staff_users`, `production_orders`, `fabric_inventory`, `supplier_purchase_orders`, `factory_expenses`, `audit_logs`).
- **Hybrid Adapter**: [`src/app/lib/neon-clerk.ts`](src/app/lib/neon-clerk.ts) automatically detects `DATABASE_URL` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`, seamlessly falling back to deterministic local persistence when running offline or before credentials are added.
- **Health & Schema Endpoints**: [`/api/health`](src/app/api/health/route.ts) and [`/api/admin/init-db`](src/app/api/admin/init-db/route.ts).

## Getting Started

```bash
npm install
npm run dev
```
