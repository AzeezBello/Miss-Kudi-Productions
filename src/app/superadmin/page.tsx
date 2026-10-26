"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ACCESS_TIER_LABELS,
  appendAuditLog,
  ARTISAN_ROLE_LABELS,
  ArtisanRole,
  ArtisanStaff,
  AuditLogEntry,
  FactoryBranch,
  getCurrentSessionUser,
  isSuperAdminUser,
  loadArtisans,
  loadAuditLogs,
  loadBranches,
  loadExpenses,
  loadOrders,
  saveArtisans,
  saveBranches,
  setActiveBranchId,
  setCurrentSessionUser,
  UserAccessTier,
} from "../lib/production-os";
import { ModalDialog } from "../components/ProductionJobTicketModal";

export default function SuperadminHqPage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<ArtisanStaff>(() =>
    getCurrentSessionUser()
  );
  const [branches, setBranches] = useState<FactoryBranch[]>([]);
  const [artisans, setArtisans] = useState<ArtisanStaff[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [globalGmv, setGlobalGmv] = useState(0);
  const [globalOpEx, setGlobalOpEx] = useState(0);
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [branchFilter, setBranchFilter] = useState<string>("all");
  const [notice, setNotice] = useState("");
  const [dbVerifying, setDbVerifying] = useState(false);

  // Modals
  const [branchModalOpen, setBranchModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<FactoryBranch | null>(
    null
  );
  const [staffModalOpen, setStaffModalOpen] = useState(false);

  const [newBranch, setNewBranch] = useState({
    name: "",
    location: "",
    specialization: "Bulk Apparel Sewing, Cutting & Quality Control",
    machineCount: 24,
    fabricMetersStock: 1000,
  });

  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    accessTier: "staff" as UserAccessTier,
    role: "tailor" as ArtisanRole,
    branchId: "br-yaba",
    station: "Sewing Line 1",
    specialty: "",
  });

  const refreshData = () => {
    setCurrentUser(getCurrentSessionUser());
    const b = loadBranches();
    const a = loadArtisans();
    const o = loadOrders();
    const e = loadExpenses();
    setBranches(b);
    setArtisans(a);
    setAuditLogs(loadAuditLogs());
    setOrdersCount(o.length);
    setGlobalGmv(o.reduce((sum, item) => sum + item.totalQuoteNgn, 0));
    setGlobalOpEx(e.reduce((sum, item) => sum + item.amountNgn, 0));
  };

  useEffect(() => {
    refreshData();
    window.addEventListener("mkp:session-change", refreshData);
    return () => window.removeEventListener("mkp:session-change", refreshData);
  }, []);

  const showNotice = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 5000);
  };

  const handleVerifyNeonSchema = async () => {
    setDbVerifying(true);
    try {
      const res = await fetch("/api/admin/init-db", { method: "POST" });
      const data = await res.json();
      const logs = appendAuditLog({
        action: "neondb.schema_verified",
        actor: currentUser.name,
        role: "Superadmin HQ",
        targetRef: "NEON_POSTGRES",
        summary:
          data.message ||
          "Verified Neon Serverless PostgreSQL schema & Clerk RBAC tables.",
      });
      setAuditLogs(logs);
      showNotice(
        data.message ||
          "NeonDB PostgreSQL schema & Clerk RBAC tables verified!"
      );
    } finally {
      setDbVerifying(false);
    }
  };

  const handleProvisionBranch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBranch.name.trim() || !newBranch.location.trim()) return;
    const created: FactoryBranch = {
      id: `br-${Date.now()}`,
      name: newBranch.name.trim(),
      location: newBranch.location.trim(),
      specialization: newBranch.specialization.trim(),
      machineCount: Number(newBranch.machineCount) || 20,
      staffCount: 1,
      fabricMetersStock: Number(newBranch.fabricMetersStock) || 500,
      netRevenueNgn: 0,
      operatingExpensesNgn: 0,
      trueNetProfitNgn: 0,
      status: "ACTIVE",
    };
    const next = [...branches, created];
    setBranches(next);
    saveBranches(next);
    const logs = appendAuditLog({
      action: "facility.provisioned",
      actor: currentUser.name,
      role: "Superadmin HQ",
      targetRef: created.name,
      summary: `Provisioned new factory branch "${created.name}" (${created.location}) with ${created.machineCount} industrial machines.`,
    });
    setAuditLogs(logs);
    setBranchModalOpen(false);
    setNewBranch({
      name: "",
      location: "",
      specialization: "Bulk Apparel Sewing, Cutting & Quality Control",
      machineCount: 24,
      fabricMetersStock: 1000,
    });
    showNotice(`Provisioned factory facility "${created.name}"!`);
  };

  const handleSaveBranchEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch) return;
    const next = branches.map((b) =>
      b.id === editingBranch.id ? editingBranch : b
    );
    setBranches(next);
    saveBranches(next);
    setEditingBranch(null);
    showNotice(`Updated facility "${editingBranch.name}".`);
  };

  const handleInspectBranch = (branchId: string) => {
    setActiveBranchId(branchId);
    router.push("/dashboard");
  };

  const handleUpdateUserGovernance = (
    userId: string,
    updates: Partial<ArtisanStaff>
  ) => {
    const next = artisans.map((u) => {
      if (u.id !== userId) return u;
      const updatedBranch = updates.branchId
        ? branches.find((b) => b.id === updates.branchId)
        : undefined;
      return {
        ...u,
        ...updates,
        branchName: updatedBranch ? updatedBranch.name : u.branchName,
      };
    });
    setArtisans(next);
    saveArtisans(next);

    const target = next.find((u) => u.id === userId);
    if (target) {
      if (target.id === currentUser.id) {
        setCurrentSessionUser(target);
      }
      const logs = appendAuditLog({
        action: "rbac.role_updated",
        actor: currentUser.name,
        role: "Superadmin HQ",
        targetRef: target.email,
        summary: `Updated ${target.name} → Tier: ${target.accessTier.toUpperCase()} · Role: ${
          ARTISAN_ROLE_LABELS[target.role]
        } · Branch: ${target.branchName}.`,
      });
      setAuditLogs(logs);
      showNotice(
        `Updated ${target.name} → ${target.accessTier.toUpperCase()} (${
          ARTISAN_ROLE_LABELS[target.role]
        }).`
      );
    }
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaff.name.trim() || !newStaff.email.trim()) return;
    const targetBranch =
      branches.find((b) => b.id === newStaff.branchId) || branches[0];
    const created: ArtisanStaff = {
      id: `art-${Date.now()}`,
      name: newStaff.name.trim(),
      email: newStaff.email.trim(),
      accessTier: newStaff.accessTier,
      role: newStaff.role,
      branchId: targetBranch.id,
      branchName: targetBranch.name,
      station: newStaff.station.trim() || "Main Factory Floor",
      specialty:
        newStaff.specialty.trim() ||
        `${ARTISAN_ROLE_LABELS[newStaff.role]} Specialist`,
      activeRuns: 1,
      unitsCompletedMonth: 0,
      qcPassRate: 99.0,
      shiftStatus: "CLOCKED_IN",
      status:
        newStaff.accessTier === "superadmin"
          ? "Executive HQ"
          : newStaff.role === "pattern_designer"
          ? "Pattern Studio"
          : newStaff.role === "quality_control"
          ? "QC Station"
          : "Active on Floor",
    };
    const next = [created, ...artisans];
    setArtisans(next);
    saveArtisans(next);
    const logs = appendAuditLog({
      action: "rbac.user_created",
      actor: currentUser.name,
      role: "Superadmin HQ",
      targetRef: created.email,
      summary: `Provisioned Clerk RBAC account for ${created.name} (${created.accessTier.toUpperCase()} · ${
        ARTISAN_ROLE_LABELS[created.role]
      }) at ${created.branchName}.`,
    });
    setAuditLogs(logs);
    setStaffModalOpen(false);
    setNewStaff({
      name: "",
      email: "",
      accessTier: "staff",
      role: "tailor",
      branchId: "br-yaba",
      station: "Sewing Line 1",
      specialty: "",
    });
    showNotice(
      `Created ${created.accessTier.toUpperCase()} account for ${created.name}!`
    );
  };

  // Guard if non-superadmin visits /superadmin
  if (!isSuperAdminUser(currentUser)) {
    return (
      <main className="section-wrap" style={{ paddingBlock: 72 }}>
        <div className="workspace-panel" style={{ maxWidth: 620, marginInline: "auto" }}>
          <span className="mkp-badge mkp-badge-critical">
            SUPERADMIN CLEARANCE REQUIRED
          </span>
          <h2 style={{ marginTop: 12, fontSize: 28 }}>
            Restricted Global HQ Control Center
          </h2>
          <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 }}>
            You are currently signed in as <strong>{currentUser.name}</strong> (
            <code>{currentUser.accessTier.toUpperCase()}</code> ·{" "}
            {ARTISAN_ROLE_LABELS[currentUser.role]}). Only{" "}
            <strong>Superadmin</strong> accounts can provision factory facilities
            or modify global RBAC permissions.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 20 }}>
            <Link className="button button-dark" href="/dashboard">
              Go to My {currentUser.accessTier === "admin" ? "Admin" : "Staff"}{" "}
              Dashboard <span>→</span>
            </Link>
            <button
              type="button"
              className="button button-light"
              style={{ border: "1px solid var(--line)" }}
              onClick={() => {
                const superAccount = artisans.find(
                  (a) => a.accessTier === "superadmin"
                );
                if (superAccount) setCurrentSessionUser(superAccount);
              }}
            >
              Switch to Superadmin Demo (Kudi Alabi) <span>★</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  const estimatedCogs = Math.round(globalGmv * 0.42);
  const globalTrueNetProfit = globalGmv - estimatedCogs - globalOpEx;
  const totalMachines = branches.reduce((acc, b) => acc + b.machineCount, 0);

  const filteredArtisans = artisans.filter((u) => {
    const matchBranch =
      branchFilter === "all" || u.branchId === branchFilter;
    const matchTier =
      tierFilter === "all" ||
      u.accessTier === tierFilter ||
      u.role === tierFilter;
    return matchBranch && matchTier;
  });

  return (
    <main>
      <section className="section-wrap" style={{ paddingBlock: "48px 96px" }}>
        {/* Superadmin Header */}
        <div className="section-heading" style={{ marginBottom: 24 }}>
          <div>
            <div className="section-kicker">
              SUPERADMIN GLOBAL HQ · NEONDB SERVERLESS &amp; CLERK RBAC GOVERNANCE
            </div>
            <h2>
              Multi-Facility Command &amp;{" "}
              <em>Role Governance.</em>
            </h2>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              className="button button-light"
              style={{ minHeight: 44, border: "1px solid var(--line)" }}
              onClick={handleVerifyNeonSchema}
              disabled={dbVerifying}
            >
              {dbVerifying
                ? "Verifying NeonDB..."
                : "Verify NeonDB Schema"}{" "}
              <span>⚡</span>
            </button>
            <button
              type="button"
              className="button button-light"
              style={{ minHeight: 44, border: "1px solid var(--line)" }}
              onClick={() => setBranchModalOpen(true)}
            >
              + Provision Factory Branch
            </button>
            <button
              type="button"
              className="button button-dark"
              style={{ minHeight: 44 }}
              onClick={() => setStaffModalOpen(true)}
            >
              + Create Admin / Staff Account
            </button>
          </div>
        </div>

        {notice && (
          <div
            role="status"
            className="mkp-banner mkp-banner-olive"
            style={{ marginBottom: 20 }}
          >
            {notice}
          </div>
        )}

        {/* 1. GLOBAL ENTERPRISE KPI CARDS */}
        <div className="kpi-grid-4">
          <div className="kpi-card">
            <span className="ticket-label">GLOBAL PRODUCTION GMV (ALL PLANTS)</span>
            <div className="kpi-value mono">
              ₦{globalGmv.toLocaleString()}
            </div>
            <div className="kpi-sub">
              {ordersCount} active B2B runs across {branches.length} Lagos facilities
            </div>
          </div>

          <div className="kpi-card">
            <span className="ticket-label">GLOBAL TRUE OPERATING NET PROFIT</span>
            <div className="kpi-value mono" style={{ color: "var(--ink)" }}>
              ₦{globalTrueNetProfit.toLocaleString()}
            </div>
            <div className="kpi-sub">
              COGS: ₦{estimatedCogs.toLocaleString()} · OpEx: ₦
              {globalOpEx.toLocaleString()}
            </div>
          </div>

          <div className="kpi-card">
            <span className="ticket-label">FACILITIES &amp; INDUSTRIAL MACHINES</span>
            <div className="kpi-value mono">
              {branches.length} Plants · {totalMachines} Looms
            </div>
            <div className="kpi-sub">
              Yaba Flagship, Victoria Island Atelier &amp; Ikeja Depot
            </div>
          </div>

          <div className="kpi-card">
            <span className="ticket-label">CLERK RBAC ACCOUNTS</span>
            <div className="kpi-value mono">{artisans.length} Users</div>
            <div className="kpi-sub">
              {artisans.filter((a) => a.accessTier === "superadmin").length}{" "}
              Superadmin ·{" "}
              {artisans.filter((a) => a.accessTier === "admin").length} Admin ·{" "}
              {artisans.filter((a) => a.accessTier === "staff").length} Staff
            </div>
          </div>
        </div>

        {/* 2. MULTI-FACILITY FACTORY PERFORMANCE & PROVISIONING MATRIX */}
        <div className="workspace-panel" style={{ marginBottom: 24 }}>
          <div className="panel-header-row">
            <div>
              <h3>
                Multi-Facility Factory Branch Matrix ({branches.length} Production
                Locations)
              </h3>
              <p>
                Side-by-side financial performance, industrial sewing machine
                capacity, fabric roll depth, and artisan staffing across Lagos.
              </p>
            </div>
            <button
              type="button"
              className="button button-dark"
              style={{ minHeight: 42 }}
              onClick={() => setBranchModalOpen(true)}
            >
              + Provision Factory Facility
            </button>
          </div>

          {/* modern-web-guidance: responsive-table */}
          <div
            tabIndex={0}
            role="region"
            aria-labelledby="superadmin-facilities-caption"
            className="table-wrapper"
          >
            <table
              className="size-chart responsive-data-table"
              style={
                {
                  "--label-1": "Facility Branch",
                  "--label-2": "Location & Focus",
                  "--label-3": "Machines & Staff",
                  "--label-4": "Fabric Stock",
                  "--label-5": "Net Revenue",
                  "--label-6": "True Net Profit",
                  "--label-7": "Actions",
                } as React.CSSProperties
              }
            >
              <caption id="superadmin-facilities-caption" className="sr-only">
                Multi-facility factory branch performance and capacity matrix
              </caption>
              <thead>
                <tr>
                  <th>Facility Branch</th>
                  <th>Location &amp; Focus</th>
                  <th>Machines &amp; Staff</th>
                  <th>Fabric Stock</th>
                  <th>Net Revenue</th>
                  <th>True Net Profit</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {branches.map((br) => {
                  const staffHere = artisans.filter(
                    (a) => a.branchId === br.id
                  ).length;
                  return (
                    <tr key={br.id}>
                      <th>
                        <div>{br.name}</div>
                        <span
                          className="mkp-badge mkp-badge-olive"
                          style={{ marginTop: 4 }}
                        >
                          {br.status}
                        </span>
                      </th>
                      <td>
                        <div style={{ fontWeight: 600 }}>{br.location}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)" }}>
                          {br.specialization}
                        </div>
                      </td>
                      <td className="mono">
                        <strong>{br.machineCount} machines</strong> ·{" "}
                        {staffHere} specialists
                      </td>
                      <td className="mono">
                        {br.fabricMetersStock.toLocaleString()} meters
                      </td>
                      <td className="mono">
                        <strong>₦{br.netRevenueNgn.toLocaleString()}</strong>
                      </td>
                      <td className="mono" style={{ color: "var(--ink)" }}>
                        <strong>₦{br.trueNetProfitNgn.toLocaleString()}</strong>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          <button
                            type="button"
                            className="mkp-inline-btn"
                            onClick={() => handleInspectBranch(br.id)}
                          >
                            Inspect Branch ⊞
                          </button>
                          <button
                            type="button"
                            className="mkp-inline-btn"
                            onClick={() => setEditingBranch(br)}
                          >
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. GLOBAL CLERK RBAC & STAFF GOVERNANCE TABLE */}
        <div className="workspace-panel" style={{ marginBottom: 24 }}>
          <div className="panel-header-row">
            <div>
              <h3>
                Global Clerk RBAC &amp; Artisan Role Governance (
                {filteredArtisans.length} Accounts)
              </h3>
              <p>
                Promote or demote access tiers (<code>superadmin</code>,{" "}
                <code>admin</code>, <code>staff</code>), assign specialist
                roles (Pattern Designer, Cutting Master, Master Tailor, Quality
                Control), or transfer branches.
              </p>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <select
                aria-label="Filter by Facility Branch"
                className="table-select"
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
              >
                <option value="all">All Facilities ({branches.length})</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <select
                aria-label="Filter by Access Tier or Specialist Role"
                className="table-select"
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
              >
                <option value="all">All Roles ({artisans.length})</option>
                <option value="superadmin">Tier: Superadmin HQ</option>
                <option value="admin">Tier: Factory Admin</option>
                <option value="staff">Tier: All Floor Staff</option>
                <option value="pattern_designer">
                  Staff: Pattern Designers
                </option>
                <option value="cutting_master">Staff: Cutting Masters</option>
                <option value="tailor">Staff: Master Tailors</option>
                <option value="quality_control">
                  Staff: Quality Control (QC)
                </option>
              </select>
            </div>
          </div>

          <div
            tabIndex={0}
            role="region"
            aria-labelledby="superadmin-rbac-caption"
            className="table-wrapper"
          >
            <table
              className="size-chart responsive-data-table"
              style={
                {
                  "--label-1": "Staff / Admin Name",
                  "--label-2": "Access Tier (RBAC)",
                  "--label-3": "Specialist Role",
                  "--label-4": "Assigned Facility",
                  "--label-5": "Station & Output",
                  "--label-6": "QC Yield",
                  "--label-7": "Impersonate / Test",
                } as React.CSSProperties
              }
            >
              <caption id="superadmin-rbac-caption" className="sr-only">
                Global staff accounts and role-based access control permissions
              </caption>
              <thead>
                <tr>
                  <th>Staff / Admin Name</th>
                  <th>Access Tier (RBAC)</th>
                  <th>Specialist Role</th>
                  <th>Assigned Facility</th>
                  <th>Station &amp; Output</th>
                  <th>QC Yield</th>
                  <th>Test Dashboard</th>
                </tr>
              </thead>
              <tbody>
                {filteredArtisans.map((u) => (
                  <tr key={u.id}>
                    <th>
                      <div>{u.name}</div>
                      <div
                        className="mono"
                        style={{
                          fontSize: 10.5,
                          fontWeight: 400,
                          color: "var(--muted)",
                        }}
                      >
                        {u.email}
                      </div>
                    </th>
                    <td>
                      <select
                        aria-label={`Access tier for ${u.name}`}
                        className="table-select"
                        value={u.accessTier}
                        onChange={(e) =>
                          handleUpdateUserGovernance(u.id, {
                            accessTier: e.target.value as UserAccessTier,
                          })
                        }
                      >
                        <option value="superadmin">SUPERADMIN (HQ)</option>
                        <option value="admin">ADMIN (Plant Manager)</option>
                        <option value="staff">STAFF (Artisan Floor)</option>
                      </select>
                    </td>
                    <td>
                      <select
                        aria-label={`Specialist role for ${u.name}`}
                        className="table-select"
                        value={u.role}
                        onChange={(e) =>
                          handleUpdateUserGovernance(u.id, {
                            role: e.target.value as ArtisanRole,
                          })
                        }
                      >
                        <option value="pattern_designer">
                          Pattern Designer
                        </option>
                        <option value="cutting_master">Cutting Master</option>
                        <option value="tailor">
                          Master Tailor / Sewing Lead
                        </option>
                        <option value="quality_control">
                          Quality Control (QC)
                        </option>
                        <option value="production_manager">
                          Production Manager
                        </option>
                      </select>
                    </td>
                    <td>
                      <select
                        aria-label={`Facility branch for ${u.name}`}
                        className="table-select"
                        value={u.branchId}
                        onChange={(e) =>
                          handleUpdateUserGovernance(u.id, {
                            branchId: e.target.value,
                          })
                        }
                      >
                        {branches.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div style={{ fontSize: 11.5 }}>{u.station}</div>
                      <div
                        className="mono"
                        style={{ fontSize: 10.5, color: "var(--muted)" }}
                      >
                        {u.unitsCompletedMonth.toLocaleString()} pcs/mo ·{" "}
                        {u.activeRuns} runs
                      </div>
                    </td>
                    <td className="mono" style={{ color: "var(--ink)" }}>
                      <strong>{u.qcPassRate.toFixed(1)}%</strong>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="mkp-inline-btn"
                        onClick={() => {
                          setCurrentSessionUser(u);
                          router.push(
                            u.accessTier === "superadmin"
                              ? "/superadmin"
                              : "/dashboard"
                          );
                        }}
                      >
                        View as {u.name.split(" ")[0]} ↗
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. RECENT SECURITY & GOVERNANCE AUDIT LOGS */}
        <div className="workspace-panel">
          <div className="panel-header-row">
            <div>
              <h3>Global Security, RBAC &amp; QC Audit Trail</h3>
              <p>
                Immutable ledger of role promotions, facility provisioning,
                auto-PO issuances, and QC floor sign-offs.
              </p>
            </div>
          </div>

          <div
            tabIndex={0}
            role="region"
            aria-label="Global security audit log"
            className="table-wrapper"
          >
            <table
              className="size-chart responsive-data-table"
              style={
                {
                  "--label-1": "Timestamp",
                  "--label-2": "Event Action",
                  "--label-3": "Actor & Role",
                  "--label-4": "Target Ref",
                  "--label-5": "Summary",
                } as React.CSSProperties
              }
            >
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Event Action</th>
                  <th>Actor &amp; Role</th>
                  <th>Target Ref</th>
                  <th>Summary</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.slice(0, 8).map((log) => (
                  <tr key={log.id}>
                    <th className="mono" style={{ fontSize: 11 }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </th>
                    <td className="mono">
                      <strong>{log.action}</strong>
                    </td>
                    <td>
                      <strong>{log.actor}</strong> ({log.role})
                    </td>
                    <td className="mono">{log.targetRef}</td>
                    <td>{log.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Provision New Factory Facility Modal */}
      <ModalDialog
        open={branchModalOpen}
        onClose={() => setBranchModalOpen(false)}
        title="Provision New Garment Factory Facility"
        maxWidth={540}
      >
        <form
          className="quote-form"
          style={{ padding: 0, boxShadow: "none", border: "none" }}
          onSubmit={handleProvisionBranch}
        >
          <label>
            Facility / Atelier Name *
            <input
              required
              placeholder="e.g. Surulere Knitwear & Activewear Plant"
              value={newBranch.name}
              onChange={(e) =>
                setNewBranch((p) => ({ ...p, name: e.target.value }))
              }
            />
          </label>
          <label>
            Location / Address *
            <input
              required
              placeholder="e.g. Bode Thomas, Surulere, Lagos"
              value={newBranch.location}
              onChange={(e) =>
                setNewBranch((p) => ({ ...p, location: e.target.value }))
              }
            />
          </label>
          <label>
            Production Specialization *
            <input
              required
              value={newBranch.specialization}
              onChange={(e) =>
                setNewBranch((p) => ({ ...p, specialization: e.target.value }))
              }
            />
          </label>
          <div className="form-row">
            <label>
              Industrial Machine Count
              <input
                type="number"
                min={4}
                value={newBranch.machineCount}
                onChange={(e) =>
                  setNewBranch((p) => ({
                    ...p,
                    machineCount: Number(e.target.value),
                  }))
                }
              />
            </label>
            <label>
              Initial Fabric Roll Stock (Meters)
              <input
                type="number"
                min={0}
                value={newBranch.fabricMetersStock}
                onChange={(e) =>
                  setNewBranch((p) => ({
                    ...p,
                    fabricMetersStock: Number(e.target.value),
                  }))
                }
              />
            </label>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button type="submit" className="button button-dark" style={{ flex: 1 }}>
              Provision Facility
            </button>
            <button
              type="button"
              className="button button-light"
              style={{ border: "1px solid var(--line)" }}
              onClick={() => setBranchModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </ModalDialog>

      {/* Edit Facility Modal */}
      <ModalDialog
        open={Boolean(editingBranch)}
        onClose={() => setEditingBranch(null)}
        title={`Edit Facility — ${editingBranch?.name || ""}`}
        maxWidth={520}
      >
        {editingBranch && (
          <form
            className="quote-form"
            style={{ padding: 0, boxShadow: "none", border: "none" }}
            onSubmit={handleSaveBranchEdit}
          >
            <label>
              Facility Name *
              <input
                required
                value={editingBranch.name}
                onChange={(e) =>
                  setEditingBranch({ ...editingBranch, name: e.target.value })
                }
              />
            </label>
            <label>
              Location *
              <input
                required
                value={editingBranch.location}
                onChange={(e) =>
                  setEditingBranch({
                    ...editingBranch,
                    location: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Specialization
              <input
                value={editingBranch.specialization}
                onChange={(e) =>
                  setEditingBranch({
                    ...editingBranch,
                    specialization: e.target.value,
                  })
                }
              />
            </label>
            <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
              <button
                type="submit"
                className="button button-dark"
                style={{ flex: 1 }}
              >
                Save Facility Changes
              </button>
              <button
                type="button"
                className="button button-light"
                style={{ border: "1px solid var(--line)" }}
                onClick={() => setEditingBranch(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </ModalDialog>

      {/* Create Staff / Admin Account Modal */}
      <ModalDialog
        open={staffModalOpen}
        onClose={() => setStaffModalOpen(false)}
        title="Provision Clerk RBAC Account (Superadmin, Admin or Staff)"
        maxWidth={560}
      >
        <form
          className="quote-form"
          style={{ padding: 0, boxShadow: "none", border: "none" }}
          onSubmit={handleCreateStaff}
        >
          <div className="form-row">
            <label>
              Access Tier (RBAC) *
              <select
                value={newStaff.accessTier}
                onChange={(e) =>
                  setNewStaff((p) => ({
                    ...p,
                    accessTier: e.target.value as UserAccessTier,
                  }))
                }
              >
                <option value="staff">Staff (Artisan / Specialist)</option>
                <option value="admin">Admin (Factory Plant Manager)</option>
                <option value="superadmin">Superadmin (Global HQ)</option>
              </select>
            </label>
            <label>
              Specialist Role *
              <select
                value={newStaff.role}
                onChange={(e) =>
                  setNewStaff((p) => ({
                    ...p,
                    role: e.target.value as ArtisanRole,
                  }))
                }
              >
                <option value="pattern_designer">Pattern Designer</option>
                <option value="cutting_master">Cutting Master</option>
                <option value="tailor">Master Tailor / Sewing Lead</option>
                <option value="quality_control">
                  Quality Control (QC) Inspector
                </option>
                <option value="production_manager">Production Manager</option>
              </select>
            </label>
          </div>
          <label>
            Full Name *
            <input
              required
              placeholder="e.g. Adebayo Adeleke"
              value={newStaff.name}
              onChange={(e) =>
                setNewStaff((p) => ({ ...p, name: e.target.value }))
              }
            />
          </label>
          <label>
            Work Email Address (Clerk Identity) *
            <input
              type="email"
              required
              placeholder="specialist@misskudi.com"
              value={newStaff.email}
              onChange={(e) =>
                setNewStaff((p) => ({ ...p, email: e.target.value }))
              }
            />
          </label>
          <div className="form-row">
            <label>
              Assigned Facility Branch *
              <select
                value={newStaff.branchId}
                onChange={(e) =>
                  setNewStaff((p) => ({ ...p, branchId: e.target.value }))
                }
              >
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Station / Line *
              <input
                required
                placeholder="e.g. Pattern Studio B or QC Bay 1"
                value={newStaff.station}
                onChange={(e) =>
                  setNewStaff((p) => ({ ...p, station: e.target.value }))
                }
              />
            </label>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button type="submit" className="button button-dark" style={{ flex: 1 }}>
              Provision Account
            </button>
            <button
              type="button"
              className="button button-light"
              style={{ border: "1px solid var(--line)" }}
              onClick={() => setStaffModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </ModalDialog>
    </main>
  );
}
