"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    ArtisanStaff,
    INITIAL_ARTISANS,
    ACCESS_TIER_LABELS,
    ARTISAN_ROLE_LABELS,
    UserAccessTier,
    getCurrentSessionUser,
    setCurrentSessionUser,
    loadArtisans,
} from "../lib/production-os";

const TIER_BADGE_CLASS: Record<UserAccessTier, string> = {
    superadmin: "badge-gold",
    admin: "badge-blue",
    staff: "badge-green",
};

export default function LoginPage() {
    const router = useRouter();
    const errorSummaryRef = useRef<HTMLDivElement>(null);

    const [artisans, setArtisans] = useState<ArtisanStaff[]>(INITIAL_ARTISANS);
    const [currentUser, setCurrentUser] = useState<ArtisanStaff>(INITIAL_ARTISANS[0]);

    const [email, setEmail] = useState("demolablaze@gmail.com");
    const [password, setPassword] = useState("••••••••••••");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [authSuccess, setAuthSuccess] = useState<string | null>(null);

    useEffect(() => {
        setArtisans(loadArtisans());
        setCurrentUser(getCurrentSessionUser());
    }, []);

    const handleFormSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setAuthSuccess(null);

        const cleanEmail = email.trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes("@")) {
            setErrorMessage("Please enter a valid factory work email address (e.g. demolablaze@gmail.com).");
            requestAnimationFrame(() => errorSummaryRef.current?.focus());
            return;
        }

        if (!password || password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            requestAnimationFrame(() => errorSummaryRef.current?.focus());
            return;
        }

        const matchedUser = artisans.find(
            (a) => a.email.toLowerCase() === cleanEmail
        );

        if (!matchedUser) {
            setErrorMessage(
                `No Clerk / NeonDB staff record found for "${email}". Select one of the pre-provisioned accounts below or sign in with demolablaze@gmail.com.`
            );
            requestAnimationFrame(() => errorSummaryRef.current?.focus());
            return;
        }

        setCurrentSessionUser(matchedUser);
        setCurrentUser(matchedUser);
        setAuthSuccess(
            `Authenticated via Clerk RBAC as ${matchedUser.name} (${ACCESS_TIER_LABELS[matchedUser.accessTier]}). Redirecting...`
        );

        setTimeout(() => {
            if (matchedUser.accessTier === "superadmin") {
                router.push("/superadmin");
            } else {
                router.push("/dashboard");
            }
        }, 500);
    };

    const handleQuickDemoSwitch = (user: ArtisanStaff, destination: string) => {
        setCurrentSessionUser(user);
        setCurrentUser(user);
        setEmail(user.email);
        router.push(destination);
    };

    const superadmins = artisans.filter((a) => a.accessTier === "superadmin");
    const admins = artisans.filter((a) => a.accessTier === "admin");
    const staffList = artisans.filter((a) => a.accessTier === "staff");

    return (
        <main className="section-padding" style={{ paddingTop: "3.5rem", minHeight: "100vh" }}>
            <div className="container">
                <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap", marginBottom: "0.5rem" }}>
                            <span className="section-tag" style={{ marginBottom: 0 }}>CLERK AUTHENTICATION &amp; NEON SERVERLESS RBAC</span>
                            <span className="badge badge-gold">HYBRID SESSION GATEWAY</span>
                        </div>
                        <h1 style={{ fontSize: "clamp(1.85rem, 3.8vw, 2.75rem)" }}>
                            Factory Identity &amp; <span className="text-gold">Role Portal</span>
                        </h1>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "68ch", marginTop: "0.4rem" }}>
                            Sign in with your Clerk factory credentials or use the 1-click Role Switcher to test{" "}
                            <strong style={{ color: "var(--text-primary)" }}>Superadmin</strong>,{" "}
                            <strong style={{ color: "var(--text-primary)" }}>Factory Admin</strong>, and{" "}
                            <strong style={{ color: "var(--text-primary)" }}>Artisan Staff</strong> dashboards.
                        </p>
                    </div>

                    <div className="login-grid">
                        {/* Left Column: Standard Clerk Sign-In Form following autofill-sign-in-form & accessible-error-announcement */}
                        <section
                            className="glass-panel"
                            aria-labelledby="clerk-signin-heading"
                            style={{ padding: "2rem", alignSelf: "start" }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                                <h2 id="clerk-signin-heading" style={{ fontSize: "1.35rem" }}>
                                    Clerk Identity Sign-In
                                </h2>
                                <span className="badge badge-blue">CLERK v6 + NEON</span>
                            </div>

                            {errorMessage && (
                                <div
                                    ref={errorSummaryRef}
                                    role="alert"
                                    aria-live="assertive"
                                    tabIndex={-1}
                                    style={{
                                        padding: "0.9rem 1rem",
                                        marginBottom: "1.25rem",
                                        background: "#fee2e2",
                                        border: "1px solid #fecaca",
                                        borderRadius: "4px",
                                        color: "#991b1b",
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    <strong style={{ display: "block", marginBottom: "0.2rem" }}>Authentication Error</strong>
                                    {errorMessage}
                                </div>
                            )}

                            {authSuccess && (
                                <div
                                    role="status"
                                    aria-live="polite"
                                    style={{
                                        padding: "0.9rem 1rem",
                                        marginBottom: "1.25rem",
                                        background: "#dcfce7",
                                        border: "1px solid #bbf7d0",
                                        borderRadius: "4px",
                                        color: "#166534",
                                        fontSize: "0.85rem",
                                        fontWeight: 600,
                                    }}
                                >
                                    ✓ {authSuccess}
                                </div>
                            )}

                            <form onSubmit={handleFormSignIn} noValidate>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">
                                        Factory Work Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="username"
                                        spellCheck={false}
                                        autoCapitalize="none"
                                        enterKeyHint="next"
                                        required
                                        aria-invalid={errorMessage ? "true" : "false"}
                                        placeholder="name@misskudiproductions.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                        <label htmlFor="current-password" className="form-label" style={{ marginBottom: 0 }}>
                                            Password / Clerk Passkey
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            aria-pressed={showPassword}
                                            style={{
                                                background: "transparent",
                                                border: "1px solid var(--border-subtle)",
                                                color: "var(--accent-gold)",
                                                fontSize: "0.72rem",
                                                padding: "0.25rem 0.6rem",
                                                borderRadius: "3px",
                                                cursor: "pointer",
                                                minHeight: "32px",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {showPassword ? "HIDE" : "SHOW"}
                                        </button>
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="current-password"
                                        name="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                        enterKeyHint="done"
                                        minLength={6}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                                    Sign In with Clerk Identity
                                </button>
                            </form>

                            <div
                                style={{
                                    marginTop: "1.5rem",
                                    paddingTop: "1.25rem",
                                    borderTop: "1px solid var(--border-subtle)",
                                    fontSize: "0.8rem",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                                    Active Session Identity:
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                                    <span>
                                        {currentUser.name} ({currentUser.email})
                                    </span>
                                    <span className={`badge ${TIER_BADGE_CLASS[currentUser.accessTier]}`}>
                                        {ACCESS_TIER_LABELS[currentUser.accessTier]}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* Right Column: Instant 1-Click Role Switcher Cards */}
                        <section aria-labelledby="demo-switcher-heading" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div className="glass-panel" style={{ padding: "1.5rem" }}>
                                <span className="section-tag" style={{ marginBottom: "0.25rem" }}>INSTANT ROLE EMULATOR</span>
                                <h2 id="demo-switcher-heading" style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>
                                    1-Click Role Switcher (Superadmin / Admin / Staff)
                                </h2>
                                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                                    Switch immediately between pre-configured Clerk + NeonDB staff accounts to inspect role-gated views and dashboards:
                                </p>

                                {/* Tier 1: Superadmin */}
                                <div style={{ marginBottom: "1.25rem" }}>
                                    <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--accent-gold)", fontWeight: 700, marginBottom: "0.5rem" }}>
                                        1. Superadmin Tier — Multi-Facility HQ Governance
                                    </div>
                                    {superadmins.map((user) => (
                                        <div
                                            key={user.id}
                                            style={{
                                                padding: "0.95rem 1rem",
                                                background: currentUser.id === user.id ? "#eef3e8" : "var(--paper)",
                                                border: currentUser.id === user.id ? "1px solid var(--ink)" : "1px solid var(--border-subtle)",
                                                borderRadius: "4px",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                                gap: "0.75rem",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <div>
                                                <div style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "0.92rem" }}>
                                                    {user.name} <span className="badge badge-gold" style={{ marginLeft: "0.35rem" }}>SUPERADMIN</span>
                                                </div>
                                                <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                                                    {user.specialty} • {user.email} • Station: <code>{user.station}</code>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                                                <button
                                                    type="button"
                                                    className="btn-primary"
                                                    style={{ padding: "0.55rem 0.95rem", fontSize: "0.72rem" }}
                                                    onClick={() => handleQuickDemoSwitch(user, "/superadmin")}
                                                >
                                                    Open Superadmin HQ →
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Tier 2: Factory Admins */}
                                <div style={{ marginBottom: "1.25rem" }}>
                                    <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#0369a1", fontWeight: 700, marginBottom: "0.5rem" }}>
                                        2. Admin Tier — Plant Managers &amp; Merchandising Leads
                                    </div>
                                    <div style={{ display: "grid", gap: "0.6rem" }}>
                                        {admins.map((user) => (
                                            <div
                                                key={user.id}
                                                style={{
                                                    padding: "0.85rem 1rem",
                                                    background: currentUser.id === user.id ? "#e0f2fe" : "var(--paper)",
                                                    border: currentUser.id === user.id ? "1px solid #0284c7" : "1px solid var(--border-subtle)",
                                                    borderRadius: "4px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    gap: "0.75rem",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <div>
                                                    <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.88rem" }}>
                                                        {user.name} <span className="badge badge-blue" style={{ marginLeft: "0.35rem" }}>ADMIN</span>
                                                    </div>
                                                    <div style={{ fontSize: "0.76rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                                                        {user.branchName} • {user.specialty}
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn-secondary"
                                                    style={{ padding: "0.5rem 0.9rem", fontSize: "0.72rem" }}
                                                    onClick={() => handleQuickDemoSwitch(user, "/dashboard")}
                                                >
                                                    Open Admin Dashboard →
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Tier 3: Artisan Staff */}
                                <div>
                                    <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#15803d", fontWeight: 700, marginBottom: "0.5rem" }}>
                                        3. Staff Tier — Pattern Designers, Cutters, Tailors &amp; QC Inspectors
                                    </div>
                                    <div style={{ display: "grid", gap: "0.6rem" }}>
                                        {staffList.slice(0, 4).map((user) => (
                                            <div
                                                key={user.id}
                                                style={{
                                                    padding: "0.8rem 1rem",
                                                    background: currentUser.id === user.id ? "#dcfce7" : "var(--paper)",
                                                    border: currentUser.id === user.id ? "1px solid #16a34a" : "1px solid var(--border-subtle)",
                                                    borderRadius: "4px",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    gap: "0.75rem",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <div>
                                                    <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.86rem" }}>
                                                        {user.name}{" "}
                                                        <span className="badge badge-green" style={{ marginLeft: "0.35rem" }}>
                                                            {ARTISAN_ROLE_LABELS[user.role]}
                                                        </span>
                                                    </div>
                                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                                                        Station: {user.station} • {user.specialty}
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn-secondary"
                                                    style={{ padding: "0.5rem 0.9rem", fontSize: "0.72rem" }}
                                                    onClick={() => handleQuickDemoSwitch(user, "/dashboard")}
                                                >
                                                    Open Staff Station →
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="glass-panel" style={{ padding: "1.15rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                                    Want to inspect the Neon PostgreSQL schema &amp; Clerk webhook status?
                                </div>
                                <Link href="/api/health" className="btn-secondary" style={{ padding: "0.45rem 0.85rem", fontSize: "0.72rem" }}>
                                    View /api/health JSON
                                </Link>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}
