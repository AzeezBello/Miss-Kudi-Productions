import fs from "node:fs";
import path from "node:path";

const conn =
  process.env.DATABASE_URL?.trim() ||
  process.env.POSTGRES_URL?.trim() ||
  process.env.DATABASE_URL_UNPOOLED?.trim() ||
  "";

if (!conn || conn.includes("YOUR_NEON_PASSWORD")) {
  console.error("No live DATABASE_URL / POSTGRES_URL found in environment.");
  process.exit(1);
}

const parsed = new URL(conn);
const endpoint = `https://${parsed.host}/sql`;

async function runQuery(query, params = []) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Neon-Connection-String": conn,
    },
    body: JSON.stringify({ query, params }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Neon HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

async function main() {
  console.log(`Connecting to Neon Serverless Postgres host: ${parsed.host} ...`);
  const schemaPath = path.join(process.cwd(), "db", "neon-schema.sql");
  const rawSql = fs.readFileSync(schemaPath, "utf8");

  // Strip single-line SQL comments first, then split by semicolon
  const withoutComments = rawSql
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n");

  const statements = withoutComments
    .split(/;\s*$/m)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    await runQuery(stmt);
  }

  // Seed initial branches idempotently
  await runQuery(
    `INSERT INTO factory_branches (id, name, location, specialization, machine_count, staff_count, fabric_meters_stock, net_revenue_ngn, operating_expenses_ngn, true_net_profit_ngn, status)
     VALUES
       ('BR-LOS-YABA', 'Yaba Flagship Production Plant', 'Sabon Yaba, Lagos Mainland', 'Woven Tops, Streetwear & Bulk Cut-and-Sew', 48, 34, 4820, 42850000, 14200000, 28650000, 'ACTIVE'),
       ('BR-LOS-VI', 'Victoria Island Bespoke & Bridal Atelier', 'Adeola Odeku, Victoria Island, Lagos', 'Couture Draping, Silk & Luxury Eveningwear', 22, 16, 1650, 29400000, 9100000, 20300000, 'ACTIVE'),
       ('BR-LOS-IKEJA', 'Ikeja Bulk Uniform & Industrial Depot', 'Oba Akran Industrial Estate, Ikeja', 'Corporate Uniforms, Workwear & Heavy Denim', 64, 45, 7900, 38100000, 12850000, 25250000, 'ACTIVE')
     ON CONFLICT (id) DO NOTHING`
  );

  // Seed initial Superadmin, Admin, and Staff accounts idempotently
  await runQuery(
    `INSERT INTO staff_users (id, clerk_user_id, name, email, access_tier, artisan_role, branch_id, branch_name, specialty, station, active_runs, units_completed_month, qc_pass_rate, shift_status, floor_status)
     VALUES
       ('art-super-demola', 'user_3LDmpp5iS8YnIwmYQlrRwVZCLz2', 'Demola Blaze', 'demolablaze@gmail.com', 'superadmin', 'production_manager', 'BR-LOS-YABA', 'Yaba Flagship Production Plant', 'Founder, Global Superadmin & Multi-Facility Operations', 'Executive HQ · Lagos', 6, 4800, 99.9, 'CLOCKED_IN', 'Executive HQ'),
       ('art-super-1', NULL, 'Kudi Alabi', 'kudi@misskudi.com', 'superadmin', 'production_manager', 'BR-LOS-YABA', 'Yaba Flagship Production Plant', 'Executive Production Director & Multi-Plant Governance', 'Executive HQ · Yaba', 5, 4200, 99.8, 'CLOCKED_IN', 'Executive HQ'),
       ('art-admin-1', NULL, 'Damilola Ojo', 'damilola@misskudi.com', 'admin', 'production_manager', 'BR-LOS-YABA', 'Yaba Flagship Production Plant', 'Floor Scheduling, Merchandising & B2B Quotes', 'Planning Office 1 · Yaba', 4, 2400, 99.4, 'CLOCKED_IN', 'Active on Floor'),
       ('art-admin-2', NULL, 'Zainab Lawal', 'zainab@misskudi.com', 'admin', 'production_manager', 'BR-LOS-VI', 'Victoria Island Bespoke & Bridal Atelier', 'Luxury Atelier Director & VIP Client Relations', 'VI Studio Suite', 3, 1150, 99.7, 'CLOCKED_IN', 'Active on Floor'),
       ('art-1', NULL, 'Chioma Nwosu', 'chioma@misskudi.com', 'staff', 'pattern_designer', 'BR-LOS-YABA', 'Yaba Flagship Production Plant', 'CAD Grading, Tech Packs & Structured Outerwear', 'Pattern Studio A', 3, 1420, 99.4, 'CLOCKED_IN', 'Pattern Studio'),
       ('art-3', NULL, 'Segun Adeyemi', 'segun@misskudi.com', 'staff', 'cutting_master', 'BR-LOS-YABA', 'Yaba Flagship Production Plant', 'Laser Marker Nesting & Zero-Waste Fabric Laying', 'Cutting Table 1', 4, 2850, 99.6, 'CLOCKED_IN', 'Active on Floor'),
       ('art-4', NULL, 'Funke Olatunji', 'funke@misskudi.com', 'staff', 'tailor', 'BR-LOS-YABA', 'Yaba Flagship Production Plant', 'Heavyweight Streetwear, French Seams & Hoodies', 'Sewing Line 1 (Lead)', 2, 1680, 98.7, 'CLOCKED_IN', 'Active on Floor'),
       ('art-7', NULL, 'Ngozi Eze', 'ngozi@misskudi.com', 'staff', 'quality_control', 'BR-LOS-YABA', 'Yaba Flagship Production Plant', 'AQL 2.5 Final Audit, Spec Tolerance & Export Finishing', 'QC Station 1 (Lead)', 4, 3120, 99.8, 'CLOCKED_IN', 'QC Station')
     ON CONFLICT (email) DO NOTHING`
  );

  const tablesRes = await runQuery(
    `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name`
  );
  const tableNames = tablesRes.rows.map((r) => r.table_name);
  const staffCountRes = await runQuery(`SELECT COUNT(*)::int AS cnt FROM staff_users`);
  const branchCountRes = await runQuery(`SELECT COUNT(*)::int AS cnt FROM factory_branches`);

  console.log(`✓ Verified ${tableNames.length} Neon tables:`, tableNames.join(", "));
  console.log(
    `✓ Seeded ${branchCountRes.rows[0]?.cnt} factory branches and ${staffCountRes.rows[0]?.cnt} RBAC staff accounts on Neon!`
  );
}

main().catch((err) => {
  console.error("Failed to initialize Neon schema:", err.message);
  process.exit(1);
});
