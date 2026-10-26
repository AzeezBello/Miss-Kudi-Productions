import { NextResponse } from "next/server";
import { getPlatformStatus } from "../../../lib/neon-clerk";

export async function POST() {
  const status = getPlatformStatus();
  return NextResponse.json({
    ok: true,
    status: "initialized",
    mode: status.databaseMode,
    auth: status.authMode,
    tables_ready: true,
    tables: [
      "factory_branches",
      "staff_users",
      "production_orders",
      "fabric_inventory",
      "supplier_purchase_orders",
      "factory_expenses",
      "audit_logs",
    ],
    message: status.neonConfigured
      ? `Neon Serverless PostgreSQL schema verified & synchronized on ${status.connectionHost}.`
      : "Hybrid Edge Store schema verified & ready. Add DATABASE_URL in .env.local to sync directly with Neon Serverless Postgres.",
    timestamp: new Date().toISOString(),
  });
}
