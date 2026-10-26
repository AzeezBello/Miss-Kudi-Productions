"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ACCESS_TIER_LABELS,
  ARTISAN_ROLE_LABELS,
  ArtisanStaff,
  canManageFactory,
  FactoryBranch,
  getActiveBranchId,
  getCurrentSessionUser,
  INITIAL_ARTISANS,
  INITIAL_BRANCHES,
  isSuperAdminUser,
  loadArtisans,
  loadBranches,
  setActiveBranchId,
  setCurrentSessionUser,
} from "../lib/production-os";

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const drawerRef = useRef<HTMLDialogElement>(null);
  const drawerTitleId = useId();

  const [user, setUser] = useState<ArtisanStaff>(INITIAL_ARTISANS[0]);
  const [artisans, setArtisans] = useState<ArtisanStaff[]>(INITIAL_ARTISANS);
  const [branches, setBranches] = useState<FactoryBranch[]>(INITIAL_BRANCHES);
  const [activeBranchId, setBranchState] = useState<string>(
    INITIAL_BRANCHES[0].id
  );
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Strict boundary: Internal in-house portals vs. Public marketing/client pages
  const isInternalRoute =
    pathname.startsWith("/workspace") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/superadmin") ||
    pathname.startsWith("/login");

  useEffect(() => {
    const syncState = () => {
      setArtisans(loadArtisans());
      setBranches(loadBranches());
      setUser(getCurrentSessionUser());
      setBranchState(getActiveBranchId());
    };
    syncState();
    window.addEventListener("mkp:session-change", syncState);
    window.addEventListener("mkp:branch-change", syncState);
    return () => {
      window.removeEventListener("mkp:session-change", syncState);
      window.removeEventListener("mkp:branch-change", syncState);
    };
  }, [pathname]);

  // modern-web-guidance: light-dismiss-a-dialog for mobile drawer
  useEffect(() => {
    const dialog = drawerRef.current;
    if (!dialog) return;

    if (drawerOpen && !dialog.open) {
      dialog.showModal();
    } else if (!drawerOpen && dialog.open) {
      dialog.close();
    }
  }, [drawerOpen]);

  useEffect(() => {
    const dialog = drawerRef.current;
    if (!dialog) return;
    const onClose = () => setDrawerOpen(false);
    dialog.addEventListener("close", onClose);

    let handleBackdropClick: ((event: MouseEvent) => void) | null = null;
    if (
      typeof HTMLDialogElement !== "undefined" &&
      !("closedBy" in HTMLDialogElement.prototype)
    ) {
      handleBackdropClick = (event: MouseEvent) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const inside =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!inside) dialog.close();
      };
      dialog.addEventListener("click", handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener("close", onClose);
      if (handleBackdropClick) {
        dialog.removeEventListener("click", handleBackdropClick);
      }
    };
  }, []);

  const handleRoleSwitch = (userId: string) => {
    const target = artisans.find((a) => a.id === userId);
    if (!target) return;
    setCurrentSessionUser(target);
    setUser(target);
    setBranchState(target.branchId);
    if (
      pathname.startsWith("/superadmin") &&
      target.accessTier !== "superadmin"
    ) {
      router.push("/dashboard");
    }
  };

  const handleBranchSwitch = (branchId: string) => {
    setActiveBranchId(branchId);
    setBranchState(branchId);
  };

  const isSuper = isSuperAdminUser(user);
  const canManage = canManageFactory(user);

  const publicNavLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/process", label: "Process" },
    { href: "/size-charts", label: "Size & Ratio" },
    { href: "/tracker", label: "Order Tracker" },
    { href: "/quote", label: "Quote" },
  ];

  const internalNavLinks = [
    {
      href: "/dashboard",
      label:
        user.accessTier === "staff"
          ? `My Station (${ARTISAN_ROLE_LABELS[user.role].split(" ")[0]})`
          : "Admin Dashboard",
    },
    ...(isSuper ? [{ href: "/superadmin", label: "Superadmin HQ" }] : []),
    { href: "/workspace", label: "Operations Workspace" },
    { href: "/tracker", label: "Order Tracker" },
    { href: "/", label: "Public Site ↗" },
  ];

  const navLinks = isInternalRoute ? internalNavLinks : publicNavLinks;

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Internal RBAC Bar — Rendered STRICTLY on in-house staff/admin routes */}
      {isInternalRoute && (
        <div className="rbac-topbar no-print">
          <div className="rbac-topbar-inner">
            <div className="rbac-status-group">
              <span className="rbac-pill rbac-pill-ok">
                <span className="status-dot" />
                IN-HOUSE STAFF PORTAL
              </span>
              <span className="rbac-pill">
                {user.accessTier.toUpperCase()} · {ARTISAN_ROLE_LABELS[user.role]}
              </span>
            </div>

            <div className="rbac-controls-group">
              <label className="rbac-select-label" htmlFor="global-role-switcher">
                <span>Role Session:</span>
                <select
                  id="global-role-switcher"
                  className="rbac-select"
                  value={user.id}
                  onChange={(e) => handleRoleSwitch(e.target.value)}
                >
                  <optgroup label="Superadmin (Global Executive HQ)">
                    {artisans
                      .filter((a) => a.accessTier === "superadmin")
                      .map((a) => (
                        <option key={a.id} value={a.id}>
                          ★ {a.name} — Superadmin
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Admin (Plant & Atelier Managers)">
                    {artisans
                      .filter((a) => a.accessTier === "admin")
                      .map((a) => (
                        <option key={a.id} value={a.id}>
                          ◆ {a.name} — Admin ({a.branchName.split(" ")[0]})
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Staff (Pattern, Cutting, Tailors & QC)">
                    {artisans
                      .filter((a) => a.accessTier === "staff")
                      .map((a) => (
                        <option key={a.id} value={a.id}>
                          • {a.name} — {ARTISAN_ROLE_LABELS[a.role]}
                        </option>
                      ))}
                  </optgroup>
                </select>
              </label>

              {canManage && (
                <label className="rbac-select-label" htmlFor="global-branch-switcher">
                  <span>Facility:</span>
                  <select
                    id="global-branch-switcher"
                    className="rbac-select"
                    value={activeBranchId}
                    onChange={(e) => handleBranchSwitch(e.target.value)}
                  >
                    <option value="ALL">All Lagos Facilities (Consolidated)</option>
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </label>
              )}

              <Link href="/login" className="rbac-signin-link">
                Switch Account
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation Header */}
      <header className="site-header no-print">
        <Link href="/" className="wordmark" aria-label="Miss Kudi Productions Home">
          <span className="wordmark-main">MISS KUDI</span>
          <span className="wordmark-sub">PRODUCTIONS</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary Navigation">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "active-nav-link" : ""}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions-group">
          <Link
            className="button button-dark header-cta desktop-cta"
            href={isInternalRoute ? "/dashboard" : "/quote"}
          >
            {isInternalRoute ? "Staff Dashboard" : "Request a Quote"} <span>↗</span>
          </Link>

          <button
            type="button"
            className="mobile-menu-trigger"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={() => setDrawerOpen(true)}
          >
            <span className="hamburger-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>Menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer (<dialog closedby="any">) */}
      <dialog
        id="mobile-navigation-drawer"
        ref={drawerRef}
        className="mobile-nav-drawer no-print"
        aria-labelledby={drawerTitleId}
        {...({ closedby: "any" } as React.DialogHTMLAttributes<HTMLDialogElement>)}
      >
        <div className="mobile-drawer-header">
          <div>
            <strong id={drawerTitleId} style={{ fontSize: 14, letterSpacing: "0.1em" }}>
              MISS KUDI PRODUCTIONS
            </strong>
            <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>
              {isInternalRoute ? ACCESS_TIER_LABELS[user.accessTier] : "Lagos Garment Manufacturing"}
            </div>
          </div>
          <button
            type="button"
            className="mobile-drawer-close"
            aria-label="Close navigation menu"
            onClick={() => setDrawerOpen(false)}
          >
            Close ✕
          </button>
        </div>

        {isInternalRoute && (
          <div className="mobile-drawer-session-card">
            <div className="ticket-label">ACTIVE STAFF SESSION</div>
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>
              {user.name}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
              {ARTISAN_ROLE_LABELS[user.role]} · {user.branchName}
            </div>

            <label
              htmlFor="mobile-role-select"
              style={{ display: "block", fontSize: 10, fontWeight: 700, marginBottom: 4 }}
            >
              SWITCH ROLE SESSION
            </label>
            <select
              id="mobile-role-select"
              value={user.id}
              onChange={(e) => handleRoleSwitch(e.target.value)}
              style={{
                width: "100%",
                minHeight: 44,
                padding: "8px 10px",
                border: "1px solid var(--line)",
                background: "#fff",
                fontSize: 13,
              }}
            >
              {artisans.map((a) => (
                <option key={a.id} value={a.id}>
                  [{a.accessTier.toUpperCase()}] {a.name} — {ARTISAN_ROLE_LABELS[a.role]}
                </option>
              ))}
            </select>
          </div>
        )}

        <nav className="mobile-drawer-links" aria-label="Mobile Navigation">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-drawer-link ${active ? "active" : ""}`}
                onClick={() => setDrawerOpen(false)}
              >
                <span>{link.label}</span>
                <span>→</span>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-drawer-footer">
          <Link
            href="/quote"
            className="button button-dark"
            style={{ width: "100%" }}
            onClick={() => setDrawerOpen(false)}
          >
            Request Production Quote <span>↗</span>
          </Link>
          <Link
            href="/tracker"
            className="button button-light"
            style={{ width: "100%", border: "1px solid var(--line)" }}
            onClick={() => setDrawerOpen(false)}
          >
            Track Production Order <span>⌖</span>
          </Link>
        </div>
      </dialog>

      {/* Mobile Bottom Thumb-Zone Navigation Dock */}
      <nav className="mobile-bottom-dock no-print" aria-label="Quick Mobile Actions">
        {isInternalRoute ? (
          <>
            <Link
              href="/dashboard"
              className={`mobile-dock-item ${pathname.startsWith("/dashboard") ? "active" : ""}`}
            >
              <span aria-hidden="true">⊞</span>
              <span>Station</span>
            </Link>
            <Link
              href="/workspace"
              className={`mobile-dock-item ${pathname.startsWith("/workspace") ? "active" : ""}`}
            >
              <span aria-hidden="true">⚙</span>
              <span>Workspace</span>
            </Link>
            {isSuper && (
              <Link
                href="/superadmin"
                className={`mobile-dock-item ${pathname.startsWith("/superadmin") ? "active" : ""}`}
              >
                <span aria-hidden="true">★</span>
                <span>HQ</span>
              </Link>
            )}
            <Link
              href="/tracker"
              className={`mobile-dock-item ${pathname.startsWith("/tracker") ? "active" : ""}`}
            >
              <span aria-hidden="true">⌖</span>
              <span>Tracker</span>
            </Link>
            <Link
              href="/login"
              className={`mobile-dock-item ${pathname.startsWith("/login") ? "active" : ""}`}
            >
              <span aria-hidden="true">👤</span>
              <span>Account</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/"
              className={`mobile-dock-item ${pathname === "/" ? "active" : ""}`}
            >
              <span aria-hidden="true">⌂</span>
              <span>Home</span>
            </Link>
            <Link
              href="/services"
              className={`mobile-dock-item ${pathname.startsWith("/services") ? "active" : ""}`}
            >
              <span aria-hidden="true">✦</span>
              <span>Services</span>
            </Link>
            <Link
              href="/size-charts"
              className={`mobile-dock-item ${pathname.startsWith("/size-charts") ? "active" : ""}`}
            >
              <span aria-hidden="true">⊞</span>
              <span>Grading</span>
            </Link>
            <Link
              href="/tracker"
              className={`mobile-dock-item ${pathname.startsWith("/tracker") ? "active" : ""}`}
            >
              <span aria-hidden="true">⌖</span>
              <span>Tracker</span>
            </Link>
            <Link
              href="/quote"
              className={`mobile-dock-item ${pathname.startsWith("/quote") ? "active" : ""}`}
            >
              <span aria-hidden="true">↗</span>
              <span>Quote</span>
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
