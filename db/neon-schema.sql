-- Miss Kudi Productions — Neon Serverless PostgreSQL Schema + Clerk RBAC Integration
-- Apply in Neon SQL Editor or via POST /api/admin/init-db

CREATE TABLE IF NOT EXISTS factory_branches (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  specialization TEXT NOT NULL,
  machine_count INTEGER NOT NULL DEFAULT 20,
  staff_count INTEGER NOT NULL DEFAULT 1,
  fabric_meters_stock NUMERIC(12, 2) NOT NULL DEFAULT 0,
  net_revenue_ngn NUMERIC(14, 2) NOT NULL DEFAULT 0,
  operating_expenses_ngn NUMERIC(14, 2) NOT NULL DEFAULT 0,
  true_net_profit_ngn NUMERIC(14, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff_users (
  id TEXT PRIMARY KEY,
  clerk_user_id TEXT UNIQUE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  access_tier TEXT NOT NULL CHECK (access_tier IN ('superadmin', 'admin', 'staff')),
  specialist_role TEXT NOT NULL CHECK (
    specialist_role IN (
      'pattern_designer',
      'cutting_master',
      'tailor',
      'quality_control',
      'production_manager'
    )
  ),
  branch_id TEXT REFERENCES factory_branches(id) ON DELETE SET NULL,
  station TEXT NOT NULL,
  specialty TEXT NOT NULL,
  active_runs INTEGER NOT NULL DEFAULT 0,
  units_completed_month INTEGER NOT NULL DEFAULT 0,
  qc_pass_rate NUMERIC(5, 2) NOT NULL DEFAULT 99.0,
  shift_status TEXT NOT NULL DEFAULT 'CLOCKED_IN',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS production_orders (
  id TEXT PRIMARY KEY,
  job_code TEXT UNIQUE NOT NULL,
  offline_id TEXT UNIQUE NOT NULL,
  branch_id TEXT REFERENCES factory_branches(id) ON DELETE SET NULL,
  company TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  garment_category TEXT NOT NULL,
  quantity_bracket TEXT NOT NULL,
  exact_quantity INTEGER NOT NULL,
  specifications_ready TEXT NOT NULL,
  details TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT '01_brief',
  size_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
  estimated_unit_cost_ngn NUMERIC(12, 2) NOT NULL,
  total_quote_ngn NUMERIC(14, 2) NOT NULL,
  estimated_fabric_meters NUMERIC(12, 2) NOT NULL,
  estimated_lead_weeks INTEGER NOT NULL DEFAULT 4,
  discount_percent NUMERIC(5, 2) NOT NULL DEFAULT 0,
  promo_code TEXT,
  assigned_pattern_designer TEXT NOT NULL,
  assigned_tailor_lead TEXT NOT NULL,
  assigned_qc_inspector TEXT NOT NULL,
  units_sewn INTEGER NOT NULL DEFAULT 0,
  units_passed_qc INTEGER NOT NULL DEFAULT 0,
  units_rework INTEGER NOT NULL DEFAULT 0,
  target_delivery_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fabric_inventory (
  id TEXT PRIMARY KEY,
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  stock_level NUMERIC(12, 2) NOT NULL DEFAULT 0,
  reorder_threshold NUMERIC(12, 2) NOT NULL DEFAULT 100,
  daily_burn_rate NUMERIC(10, 2) NOT NULL DEFAULT 10,
  cost_per_unit_ngn NUMERIC(12, 2) NOT NULL DEFAULT 0,
  supplier_name TEXT NOT NULL,
  batch_lot TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS supplier_purchase_orders (
  id TEXT PRIMARY KEY,
  po_number TEXT UNIQUE NOT NULL,
  supplier_name TEXT NOT NULL,
  material_sku TEXT NOT NULL,
  material_name TEXT NOT NULL,
  quantity_ordered NUMERIC(12, 2) NOT NULL,
  unit TEXT NOT NULL,
  unit_cost_ngn NUMERIC(12, 2) NOT NULL,
  total_cost_ngn NUMERIC(14, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'issued',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  received_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS factory_expenses (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  amount_ngn NUMERIC(14, 2) NOT NULL,
  recorded_by TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  role TEXT NOT NULL,
  target_ref TEXT NOT NULL,
  summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
