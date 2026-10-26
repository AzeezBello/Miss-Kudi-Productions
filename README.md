# Miss Kudi Productions — B2B Garment Manufacturing & Factory OS

A responsive **Next.js 16** website and B2B factory operations suite for **Miss Kudi Productions**, a Lagos‑based garment manufacturer and private‑label production partner. Combines a **minimalist‑luxury** aesthetic (`#556b2f` olive-green & `#f8f5f0` off-white) with high-productivity operational modules adapted from **Nexus Commerce OS**.

## Productivity Features Adapted from Nexus Commerce OS
1. **Smart Quote & MOQ Estimator + Printable Production Job Ticket ([`QuoteForm.tsx`](src/app/components/QuoteForm.tsx), [`ProductionJobTicketModal.tsx`](src/app/components/ProductionJobTicketModal.tsx))**:
   - Live pro-forma unit cost, volume discount tier, fabric yardage (`meters` + 5% cutting wastage allowance), and lead-time estimation.
   - Idempotent `offlineId` deduplication via `/api/inquiry` and local storage queue.
   - Instant printable 80mm/A4 **Production Job Ticket (`MKP-YYYYMMDD-XXX`)** with assigned **Pattern Designer**, **Master Tailor Lead**, and **Quality Control (QC) Inspector**.
2. **Interactive Size-Grading Matrix & Tech-Pack Ratio Calculator ([`src/app/size-charts/page.tsx`](src/app/size-charts/page.tsx))**:
   - Instant **Inches ↔ Centimeters** toggle and garment category filtering.
   - Interactive bulk size-ratio planner (`XS` to `XXL`) with preset curves (*Standard Retail Bell Curve*, *Womenswear/Resort*, *Streetwear Boxy*), graded fabric roll yardage calculation, 1-click CSV export, and 1-click transfer to the Quote Form.
3. **Live 5-Stage Production Order Tracker ([`src/app/tracker/page.tsx`](src/app/tracker/page.tsx))**:
   - End-to-end visibility across all 5 manufacturing stages: `01 Brief Received` → `02 Pattern & Quote Review` → `03 Sample & Tech Pack Approved` → `04 Sewing Floor & QC Checks` → `05 Finished & Dispatched`.
   - Tracks pieces sewn, AQL 2.5 Quality Control pass rates, and assigned artisan leads.
4. **Artisan Specialist Roster — Pattern Designers, Cutting Masters, Tailors & Quality Control ([`src/app/workspace/page.tsx`](src/app/workspace/page.tsx))**:
   - Replaces retail POS tellers with garment manufacturing specialists: **Pattern Designers**, **Cutting Masters**, **Master Tailors / Sewing Line Leads**, and **Quality Control (QC) Inspectors**.
   - Includes specialist onboarding modal and printable **End-of-Day Factory QC & Output Z-Report**.
5. **Fabric & Trim Runway + 1-Click Supplier Auto-PO ([`src/app/workspace/page.tsx`](src/app/workspace/page.tsx))**:
   - 30-day daily cutting consumption velocity (`meters/day`), days of remaining stock runway (`CRITICAL`, `REORDER SOON`, `HEALTHY`), 1-click Auto-PO issuance (`PO-AUTO-...`) to textile mills, and 1-click PO receiving.
6. **B2B Fashion Label CRM, Factory OpEx Ledger & Security Audit Trail ([`src/app/workspace/page.tsx`](src/app/workspace/page.tsx))**:
   - B2B Volume Tiers (*Emerging Label*, *Studio Partner 3%*, *Collection Partner 7%*, *Heritage VIP 12%*) and partner promo codes (`LAGOSVIP10`, `FIRSTBULK5`, `SCALE1000`).
   - Executive P&L tracking Gross Revenue, Fabric COGS, and Lagos Factory Operating Expenses (*Generator Diesel*, *Artisan Payroll*, *Machine Maintenance*, *EKEDC Utilities*, *QC Packaging*) with 1-click Accounting CSV export and immutable Audit Trail.

## Routes
| Route | Description |
|-------|-------------|
| `/` | Home page with 3D hero, capabilities, 5-step workflow, and live MOQ Quote Estimator. |
| `/quote` | Dedicated quote & pro-forma estimator page with printable Production Job Ticket. |
| `/size-charts` | Interactive US/Metric (`in`/`cm`) size guide and bulk XS–XXL ratio & fabric calculator. |
| `/tracker` | Client & factory live 5-stage production order tracker (`MKP-...`). |
| `/workspace` | Factory Operations OS (Pipeline & QC, Artisan Roster, Fabric Auto-PO, Brand CRM, OpEx & P&L). |
| `/services` | Detailed list of manufacturing services. |
| `/process` | Step‑by‑step workflow overview. |
| `/about` | Company story and team overview. |
| `/api/inquiry` | Idempotent `GET` / `POST` production inquiry & pro-forma estimation endpoint. |
