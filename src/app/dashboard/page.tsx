"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ACCESS_TIER_LABELS,
  appendAuditLog,
  ARTISAN_ROLE_LABELS,
  ArtisanStaff,
  canManageFactory,
  FabricInventoryItem,
  FactoryBranch,
  getActiveBranchId,
  getCurrentSessionUser,
  isStaffUser,
  isSuperAdminUser,
  loadArtisans,
  loadBranches,
  loadInventory,
  loadOrders,
  ProductionOrder,
  ProductionStage,
  saveArtisans,
  saveOrders,
  setCurrentSessionUser,
  STAGE_METADATA,
} from "../lib/production-os";
import { ProductionJobTicketModal } from "../components/ProductionJobTicketModal";

export default function RoleDashboardPage() {
  const [user, setUser] = useState<ArtisanStaff>(() => getCurrentSessionUser());
  const [branches, setBranches] = useState<FactoryBranch[]>([]);
  const [activeBranchId, setBranchId] = useState<string>(() =>
    getActiveBranchId()
  );
  const [artisans, setArtisans] = useState<ArtisanStaff[]>([]);
  const [orders, setOrders] = useState<ProductionOrder[]>([]);
  const [inventory, setInventory] = useState<FabricInventoryItem[]>([]);
  const [showAllFloorRuns, setShowAllFloorRuns] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ProductionOrder | null>(
    null
  );
  const [ticketOpen, setTicketOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const syncDashboard = () => {
    setUser(getCurrentSessionUser());
    setBranches(loadBranches());
    setBranchId(getActiveBranchId());
    setArtisans(loadArtisans());
    setOrders(loadOrders());
    setInventory(loadInventory());
  };

  useEffect(() => {
    syncDashboard();
    window.addEventListener("mkp:session-change", syncDashboard);
    window.addEventListener("mkp:branch-change", syncDashboard);
    return () => {
      window.removeEventListener("mkp:session-change", syncDashboard);
      window.removeEventListener("mkp:branch-change", syncDashboard);
    };
  }, []);

  const showToast = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(""), 5000);
  };

  const isStaff = isStaffUser(user);
  const isManager = canManageFactory(user);
  const isSuper = isSuperAdminUser(user);

  const activeBranch =
    branches.find((b) => b.id === activeBranchId) || branches[0];

  // Toggle shift clock-in for Staff
  const handleToggleShift = () => {
    const nextShift =
      user.shiftStatus === "CLOCKED_IN" ? "OFF_SHIFT" : "CLOCKED_IN";
    const updatedUser: ArtisanStaff = { ...user, shiftStatus: nextShift };
    const nextArtisans = artisans.map((a) =>
      a.id === user.id ? updatedUser : a
    );
    setArtisans(nextArtisans);
    saveArtisans(nextArtisans);
    setCurrentSessionUser(updatedUser);
    appendAuditLog({
      action: nextShift === "CLOCKED_IN" ? "shift.clock_in" : "shift.clock_out",
      actor: user.name,
      role: `Staff · ${ARTISAN_ROLE_LABELS[user.role]}`,
      targetRef: user.station,
      summary: `${user.name} (${ARTISAN_ROLE_LABELS[user.role]}) ${
        nextShift === "CLOCKED_IN" ? "clocked in to" : "clocked out from"
      } ${user.station}.`,
    });
    showToast(
      `Shift status updated: ${
        nextShift === "CLOCKED_IN" ? "CLOCKED IN (Active on Station)" : "OFF SHIFT"
      }`
    );
  };

  // Staff role-specific batch action on an order
  const handleStaffBatchAction = (
    order: ProductionOrder,
    actionType: "approve_pattern" | "log_cutting" | "log_sewing" | "pass_qc"
  ) => {
    const nextOrders = orders.map((o) => {
      if (o.jobCode !== order.jobCode) return o;
      if (actionType === "approve_pattern") {
        return {
          ...o,
          stage: "03_approved" as ProductionStage,
          updatedAt: new Date().toISOString(),
        };
      }
      if (actionType === "log_cutting") {
        return {
          ...o,
          stage: "04_production_qc" as ProductionStage,
          updatedAt: new Date().toISOString(),
        };
      }
      if (actionType === "log_sewing") {
        const newSewn = Math.min(o.exactQuantity, o.unitsSewn + 50);
        return {
          ...o,
          stage: "04_production_qc" as ProductionStage,
          unitsSewn: newSewn,
          updatedAt: new Date().toISOString(),
        };
      }
      // pass_qc
      const newSewn = Math.max(o.unitsSewn, Math.min(o.exactQuantity, o.unitsPassedQc + 50));
      const newPassed = Math.min(newSewn, o.unitsPassedQc + 50);
      const nextStage: ProductionStage =
        newPassed >= o.exactQuantity ? "05_dispatch" : "04_production_qc";
      return {
        ...o,
        unitsSewn: newSewn,
        unitsPassedQc: newPassed,
        stage: nextStage,
        updatedAt: new Date().toISOString(),
      };
    });

    setOrders(nextOrders);
    saveOrders(nextOrders);

    // Increment staff monthly output counter
    const updatedUser: ArtisanStaff = {
      ...user,
      unitsCompletedMonth: user.unitsCompletedMonth + 50,
    };
    const nextArtisans = artisans.map((a) =>
      a.id === user.id ? updatedUser : a
    );
    setArtisans(nextArtisans);
    saveArtisans(nextArtisans);
    setCurrentSessionUser(updatedUser);

    appendAuditLog({
      action: `staff.${actionType}`,
      actor: user.name,
      role: `Staff · ${ARTISAN_ROLE_LABELS[user.role]}`,
      targetRef: order.jobCode,
      summary: `${user.name} (${ARTISAN_ROLE_LABELS[user.role]}) executed ${actionType.replace(
        "_",
        " "
      )} on ${order.company} (${order.jobCode}).`,
    });

    showToast(
      `Recorded ${actionType.replace("_", " ")} on ${order.jobCode} (${
        order.company
      })!`
    );
  };

  // Filter runs assigned to this staff member vs all facility runs
  const myAssignedOrders = orders.filter(
    (o) =>
      o.assignedPatternDesigner.toLowerCase() === user.name.toLowerCase() ||
      o.assignedTailorLead.toLowerCase() === user.name.toLowerCase() ||
      o.assignedQcInspector.toLowerCase() === user.name.toLowerCase()
  );

  const displayedStaffOrders =
    showAllFloorRuns || myAssignedOrders.length === 0
      ? orders
      : myAssignedOrders;

  const branchStaff = artisans.filter(
    (a) => !activeBranch || a.branchId === activeBranch.id
  );
  const lowStockItems = inventory.filter(
    (i) => i.stockLevel / Math.max(1, i.dailyBurnRate) < 14
  );

  const branchRevenue = orders.reduce((acc, o) => acc + o.totalQuoteNgn, 0);
  const branchGrossProfit = Math.round(branchRevenue * 0.58);

  return (
    <main>
      <section className="section-wrap" style={{ paddingBlock: "48px 96px" }}>
        {/* Role-Adaptive Header */}
        <div className="section-heading" style={{ marginBottom: 24 }}>
          <div>
            <div className="section-kicker">
              {isStaff
                ? `STAFF STATION DASHBOARD · ${ARTISAN_ROLE_LABELS[
                    user.role
                  ].toUpperCase()}`
                : `${ACCESS_TIER_LABELS[user.accessTier].toUpperCase()} · ${
                    activeBranch?.name.toUpperCase() || "LAGOS FACILITY"
                  }`}
            </div>
            <h2>
              {isStaff ? (
                <>
                  {user.name}’s{" "}
                  <em>{ARTISAN_ROLE_LABELS[user.role]} Console.</em>
                </>
              ) : (
                <>
                  Plant Operations, Artisans &amp;{" "}
                  <em>Branch P&amp;L.</em>
                </>
              )}
            </h2>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {isSuper && (
              <Link
                className="button button-light"
                href="/superadmin"
                style={{ minHeight: 44, border: "1px solid var(--line)" }}
              >
                Superadmin Global HQ <span>★</span>
              </Link>
            )}
            {isStaff ? (
              <button
                type="button"
                className={`button ${
                  user.shiftStatus === "CLOCKED_IN"
                    ? "button-dark"
                    : "button-light"
                }`}
                style={{ minHeight: 44, border: "1px solid var(--line)" }}
                onClick={handleToggleShift}
              >
                {user.shiftStatus === "CLOCKED_IN"
                  ? "● Shift Clocked In (Click to Clock Out)"
                  : "○ Off Shift (Click to Clock In)"}
              </button>
            ) : (
              <Link
                className="button button-dark"
                href="/workspace"
                style={{ minHeight: 44 }}
              >
                Open Full Factory OS <span>⚙</span>
              </Link>
            )}
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

        {/* KPI CARDS: STAFF VS ADMIN/SUPERADMIN */}
        {isStaff ? (
          <div className="kpi-grid-4">
            <div className="kpi-card">
              <span className="ticket-label">MY ASSIGNED PRODUCTION RUNS</span>
              <div className="kpi-value mono">
                {myAssignedOrders.length} Active Runs
              </div>
              <div className="kpi-sub">Station: {user.station}</div>
            </div>

            <div className="kpi-card">
              <span className="ticket-label">MY OUTPUT THIS MONTH</span>
              <div className="kpi-value mono" style={{ color: "var(--ink)" }}>
                {user.unitsCompletedMonth.toLocaleString()} pcs
              </div>
              <div className="kpi-sub">
                Role: {ARTISAN_ROLE_LABELS[user.role]}
              </div>
            </div>

            <div className="kpi-card">
              <span className="ticket-label">MY FIRST-PASS QC YIELD</span>
              <div className="kpi-value mono">{user.qcPassRate.toFixed(1)}%</div>
              <div className="kpi-sub">AQL 2.5 Standard Target: ≥ 98.0%</div>
            </div>

            <div className="kpi-card">
              <span className="ticket-label">ACTIVE SHIFT &amp; FACILITY</span>
              <div className="kpi-value" style={{ fontSize: 18 }}>
                {user.shiftStatus === "CLOCKED_IN" ? "CLOCKED IN" : "OFF SHIFT"}
              </div>
              <div className="kpi-sub">{user.branchName}</div>
            </div>
          </div>
        ) : (
          <div className="kpi-grid-4">
            <div className="kpi-card">
              <span className="ticket-label">BRANCH PIPELINE REVENUE</span>
              <div className="kpi-value mono">
                ₦{branchRevenue.toLocaleString()}
              </div>
              <div className="kpi-sub">
                {orders.length} active B2B garment production runs
              </div>
            </div>

            <div className="kpi-card">
              <span className="ticket-label">EST. BRANCH GROSS PROFIT (58%)</span>
              <div className="kpi-value mono" style={{ color: "var(--ink)" }}>
                ₦{branchGrossProfit.toLocaleString()}
              </div>
              <div className="kpi-sub">
                Facility: {activeBranch?.name || "Yaba Flagship"}
              </div>
            </div>

            <div className="kpi-card">
              <span className="ticket-label">ACTIVE ARTISANS &amp; SPECIALISTS</span>
              <div className="kpi-value mono">
                {branchStaff.length} Specialists
              </div>
              <div className="kpi-sub">
                Pattern Studio, Cutting, Tailors &amp; QC Inspectors
              </div>
            </div>

            <div className="kpi-card">
              <span className="ticket-label">LOW-RUNWAY FABRIC ALERTS</span>
              <div className="kpi-value mono">
                {lowStockItems.length} Materials
              </div>
              <div className="kpi-sub">
                SKUs with &lt; 14 days cutting velocity runway
              </div>
            </div>
          </div>
        )}

        {/* STAFF VIEW: ASSIGNED RUNS & STATION BATCH WORKBENCH */}
        {isStaff ? (
          <div className="workspace-panel" style={{ marginBottom: 24 }}>
            <div className="panel-header-row">
              <div>
                <h3>
                  My Station Work Queue — {ARTISAN_ROLE_LABELS[user.role]} (
                  {displayedStaffOrders.length} Runs)
                </h3>
                <p>
                  Log completed pattern grading, cutting lays, sewing line
                  batches, or AQL 2.5 Quality Control inspections directly from
                  your station.
                </p>
              </div>
              <button
                type="button"
                className="mkp-inline-btn"
                onClick={() => setShowAllFloorRuns((v) => !v)}
              >
                {showAllFloorRuns
                  ? `Show Only My Runs (${myAssignedOrders.length})`
                  : `Show All Plant Runs (${orders.length})`}
              </button>
            </div>

            <div
              tabIndex={0}
              role="region"
              aria-label="Assigned production runs table"
              className="table-wrapper"
            >
              <table
                className="size-chart responsive-data-table"
                style={
                  {
                    "--label-1": "Job Code & Brand",
                    "--label-2": "Garment & Volume",
                    "--label-3": "Current Stage",
                    "--label-4": "Assigned Team",
                    "--label-5": "Sewing & QC Progress",
                    "--label-6": "Station Action",
                  } as React.CSSProperties
                }
              >
                <thead>
                  <tr>
                    <th>Job Code &amp; Brand</th>
                    <th>Garment &amp; Volume</th>
                    <th>Current Stage</th>
                    <th>Assigned Team</th>
                    <th>Sewing &amp; QC Progress</th>
                    <th>Station Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedStaffOrders.map((ord) => (
                    <tr key={ord.jobCode}>
                      <th>
                        <div className="mono">{ord.jobCode}</div>
                        <div style={{ fontWeight: 600 }}>{ord.company}</div>
                      </th>
                      <td>
                        <div>{ord.garmentCategory}</div>
                        <div className="mono" style={{ fontSize: 11 }}>
                          <strong>{ord.exactQuantity.toLocaleString()} pcs</strong>{" "}
                          · Due {ord.targetDeliveryDate}
                        </div>
                      </td>
                      <td>
                        <span className="mkp-badge mkp-badge-olive">
                          {STAGE_METADATA[ord.stage].stepNumber}.{" "}
                          {STAGE_METADATA[ord.stage].shortLabel}
                        </span>
                      </td>
                      <td style={{ fontSize: 11 }}>
                        <div>
                          <strong>Pattern:</strong> {ord.assignedPatternDesigner}
                        </div>
                        <div>
                          <strong>Tailor:</strong> {ord.assignedTailorLead}
                        </div>
                        <div>
                          <strong>QC:</strong> {ord.assignedQcInspector}
                        </div>
                      </td>
                      <td className="mono" style={{ fontSize: 11.5 }}>
                        <div>
                          Sewn: <strong>{ord.unitsSewn}</strong> /{" "}
                          {ord.exactQuantity}
                        </div>
                        <div style={{ color: "var(--ink)" }}>
                          Passed QC: <strong>{ord.unitsPassedQc}</strong> pcs
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {user.role === "pattern_designer" && (
                            <button
                              type="button"
                              className="button button-dark"
                              style={{ minHeight: 36, padding: "0 12px", fontSize: 10 }}
                              onClick={() =>
                                handleStaffBatchAction(ord, "approve_pattern")
                              }
                            >
                              ✓ Approve Pattern &amp; Marker
                            </button>
                          )}
                          {user.role === "cutting_master" && (
                            <button
                              type="button"
                              className="button button-dark"
                              style={{ minHeight: 36, padding: "0 12px", fontSize: 10 }}
                              onClick={() =>
                                handleStaffBatchAction(ord, "log_cutting")
                              }
                            >
                              + Log Bulk Cut Bundle
                            </button>
                          )}
                          {user.role === "tailor" && (
                            <button
                              type="button"
                              className="button button-dark"
                              style={{ minHeight: 36, padding: "0 12px", fontSize: 10 }}
                              onClick={() =>
                                handleStaffBatchAction(ord, "log_sewing")
                              }
                            >
                              +50 Pieces Sewn
                            </button>
                          )}
                          {(user.role === "quality_control" ||
                            user.role === "production_manager") && (
                            <button
                              type="button"
                              className="button button-dark"
                              style={{ minHeight: 36, padding: "0 12px", fontSize: 10 }}
                              onClick={() =>
                                handleStaffBatchAction(ord, "pass_qc")
                              }
                            >
                              ✓ Pass +50 QC Units
                            </button>
                          )}
                          <button
                            type="button"
                            className="mkp-inline-btn"
                            onClick={() => {
                              setSelectedOrder(ord);
                              setTicketOpen(true);
                            }}
                          >
                            Job Ticket 🖨
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* ADMIN / MANAGER VIEW: ARTISAN LEADERBOARD & FACILITY RUNS */
          <div className="dashboard-split-grid">
            <div className="workspace-panel">
              <div className="panel-header-row">
                <div>
                  <h3>
                    Facility Artisans — Pattern Designers, Tailors, Cutting &amp;
                    QC ({branchStaff.length})
                  </h3>
                  <p>
                    Assigned specialists, station throughput, and AQL 2.5
                    Quality Control pass rates.
                  </p>
                </div>
                <Link
                  href="/workspace"
                  className="mkp-inline-btn"
                >
                  Manage Full Roster →
                </Link>
              </div>

              <div
                tabIndex={0}
                role="region"
                aria-label="Facility artisan performance table"
                className="table-wrapper"
              >
                <table
                  className="size-chart responsive-data-table"
                  style={
                    {
                      "--label-1": "Specialist",
                      "--label-2": "Role & Station",
                      "--label-3": "Monthly Output",
                      "--label-4": "QC Yield",
                      "--label-5": "Shift",
                    } as React.CSSProperties
                  }
                >
                  <thead>
                    <tr>
                      <th>Specialist</th>
                      <th>Role &amp; Station</th>
                      <th>Monthly Output</th>
                      <th>QC Yield</th>
                      <th>Shift</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branchStaff.map((sp) => (
                      <tr key={sp.id}>
                        <th>
                          <div>{sp.name}</div>
                          <div
                            className="mono"
                            style={{
                              fontSize: 10,
                              fontWeight: 400,
                              color: "var(--muted)",
                            }}
                          >
                            {sp.email}
                          </div>
                        </th>
                        <td>
                          <span className="mkp-badge mkp-badge-olive">
                            {ARTISAN_ROLE_LABELS[sp.role]}
                          </span>
                          <div
                            style={{
                              fontSize: 10.5,
                              color: "var(--muted)",
                              marginTop: 3,
                            }}
                          >
                            {sp.station}
                          </div>
                        </td>
                        <td className="mono">
                          <strong>
                            {sp.unitsCompletedMonth.toLocaleString()} pcs
                          </strong>
                        </td>
                        <td className="mono" style={{ color: "var(--ink)" }}>
                          <strong>{sp.qcPassRate.toFixed(1)}%</strong>
                        </td>
                        <td>
                          <span className="size-pill-item">
                            {sp.shiftStatus === "CLOCKED_IN"
                              ? "● Clocked In"
                              : "○ Off Shift"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="workspace-panel">
              <div className="panel-header-row">
                <div>
                  <h3>Low-Runway Fabric &amp; Trim Watchlist ({lowStockItems.length})</h3>
                  <p>Materials below 14-day cutting velocity threshold</p>
                </div>
                {isManager && (
                  <Link href="/workspace" className="mkp-inline-btn">
                    Issue Auto-PO →
                  </Link>
                )}
              </div>

              <div
                tabIndex={0}
                role="region"
                aria-label="Low stock fabric watchlist"
                className="table-wrapper"
              >
                <table
                  className="size-chart responsive-data-table"
                  style={
                    {
                      "--label-1": "Material",
                      "--label-2": "Remaining Stock",
                      "--label-3": "Runway Left",
                    } as React.CSSProperties
                  }
                >
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Remaining Stock</th>
                      <th>Runway Left</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map((item) => {
                      const days =
                        item.stockLevel / Math.max(1, item.dailyBurnRate);
                      return (
                        <tr key={item.id}>
                          <th>
                            <div>{item.name}</div>
                            <span
                              className="mono"
                              style={{
                                fontSize: 10,
                                fontWeight: 400,
                                color: "var(--muted)",
                              }}
                            >
                              {item.sku} · {item.supplierName}
                            </span>
                          </th>
                          <td className="mono">
                            <strong>
                              {item.stockLevel.toLocaleString()} {item.unit}
                            </strong>
                          </td>
                          <td>
                            <span
                              className={`mkp-badge ${
                                days < 7
                                  ? "mkp-badge-critical"
                                  : "mkp-badge-warn"
                              }`}
                            >
                              {days.toFixed(1)} days left
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>

      <ProductionJobTicketModal
        order={selectedOrder}
        open={ticketOpen}
        onClose={() => setTicketOpen(false)}
      />
    </main>
  );
}
