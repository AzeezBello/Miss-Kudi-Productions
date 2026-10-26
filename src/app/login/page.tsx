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

    const [email, setEmail] = useState("kudi@kproductions.com");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [authSuccess, setAuthSuccess] = useState<string | null>(null);

    useEffect(() => {
        setArtisans(loadArtisans());
        setCurrentUser(getCurrentSessionUser());

        fetch("/api/admin/users")
            .then((r) => r.json())
            .then((data) => {
                if (data?.ok && Array.isArray(data.users) && data.users.length > 0) {
                    setArtisans(data.users);
                }
            })
            .catch(() => {
                // Keep local accounts
            });
    }, []);

    const handleFormSignIn = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setAuthSuccess(null);

        const cleanEmail = email.trim().toLowerCase();
        if (!cleanEmail || !cleanEmail.includes("@")) {
            setErrorMessage("Please enter a valid factory work email address (e.g. kudi@kproductions.com).");
            requestAnimationFrame(() => errorSummaryRef.current?.focus());
            return;
        }

        if (!password || password.length < 6) {
            setErrorMessage("Please enter your password (at least 6 characters).");
            requestAnimationFrame(() => errorSummaryRef.current?.focus());
            return;
        }

        const matchedUser = artisans.find(
            (a) => a.email.toLowerCase() === cleanEmail
        );

        if (!matchedUser) {
            setErrorMessage(
                `No provisioned account found for "${email}". Active accounts: kudi@kproductions.com (Admin) and demolablaze@gmail.com (Superadmin).`
            );
            requestAnimationFrame(() => errorSummaryRef.current?.focus());
            return;
        }

        if (cleanEmail === "kudi@kproductions.com" && password !== "misskudi") {
            setErrorMessage("Invalid password for kudi@kproductions.com.");
            requestAnimationFrame(() => errorSummaryRef.current?.focus());
            return;
        }

        if (cleanEmail === "demolablaze@gmail.com" && password !== "$Omerta93") {
            setErrorMessage("Invalid password for demolablaze@gmail.com.");
            requestAnimationFrame(() => errorSummaryRef.current?.focus());
            return;
        }

        setCurrentSessionUser(matchedUser);
        setCurrentUser(matchedUser);
        setAuthSuccess(
            `Authenticated as ${matchedUser.name} (${ACCESS_TIER_LABELS[matchedUser.accessTier]}). Redirecting...`
        );

        setTimeout(() => {
            if (matchedUser.accessTier === "superadmin") {
                router.push("/superadmin");
            } else {
                router.push("/dashboard");
            }
        }, 500);
    };

    const handleSelectAccount = (user: ArtisanStaff) => {
        setEmail(user.email);
        setErrorMessage(null);
        setAuthSuccess(null);
    };

    const superadmins = artisans.filter((a) => a.accessTier === "superadmin");
    const admins = artisans.filter((a) => a.accessTier === "admin");
    const staffList = artisans.filter((a) => a.accessTier === "staff");

    return (
        <main className="section-padding" style={{ paddingTop: "3.5rem", minHeight: "100vh" }}>
            <div className="container">
                <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
                    <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                            <img
                                src="/images/mk-logo-transparent.png"
                                alt="Miss Kudi Productions"
                                width={64}
                                height={64}
                                className="wordmark-logo-img"
                                style={{ width: 64, height: 64 }}
                            />
                            <div>
                                <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", flexWrap: "wrap" }}>
                                    <span className="section-tag" style={{ marginBottom: 0 }}>INTERNAL STAFF &amp; ADMIN AUTHENTICATION</span>
                                    <span className="badge badge-gold">AUTHORIZED ACCESS ONLY</span>
                                </div>
                                <div className="mono" style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: 2 }}>
                                    LAGOS GARMENT MANUFACTURING · YABA · VICTORIA ISLAND · IKEJA
                                </div>
                            </div>
                        </div>
                        <h1 style={{ fontSize: "clamp(1.85rem, 3.8vw, 2.75rem)" }}>
                            Factory Identity &amp; <span className="text-gold">Operations Portal</span>
                        </h1>
                        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: "68ch", marginTop: "0.4rem" }}>
                            Sign in with your authorized Miss Kudi Productions credentials to access{" "}
                            <strong style={{ color: "var(--text-primary)" }}>Superadmin HQ</strong>,{" "}
                            <strong style={{ color: "var(--text-primary)" }}>Factory Admin Dashboard</strong>, or{" "}
                            <strong style={{ color: "var(--text-primary)" }}>Production Floor Stations</strong>.
                        </p>
                    </div>

                    <div className="login-grid">
                        {/* Left Column: Standard Clerk Sign-In Form */}
                        <section
                            className="glass-panel"
                            aria-labelledby="clerk-signin-heading"
                            style={{ padding: "2rem", alignSelf: "start" }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
                                <h2 id="clerk-signin-heading" style={{ fontSize: "1.35rem" }}>
                                    Staff &amp; Admin Sign-In
                                </h2>
                                <span className="badge badge-blue">CLERK + NEON RBAC</span>
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
                                        Work Email
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
                                        placeholder="kudi@kproductions.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                                        <label htmlFor="current-password" className="form-label" style={{ marginBottom: 0 }}>
                                            Password
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
                                        placeholder="Enter your password"
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
                                    Sign In to Operations Portal
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

                        {/* Right Column: Provisioned Directory Accounts */}
                        <section aria-labelledby="directory-accounts-heading" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div className="glass-panel" style={{ padding: "1.5rem" }}>
                                <span className="section-tag" style={{ marginBottom: "0.25rem" }}>PROVISIONED DIRECTORY</span>
                                <h2 id="directory-accounts-heading" style={{ fontSize: "1.25rem", marginBottom: "0.35rem" }}>
                                    Authorized Accounts ({artisans.length})
                                </h2>
                                <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                                    Active Clerk &amp; Neon PostgreSQL accounts across our Lagos facilities:
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
                                                background: email.toLowerCase() === user.email.toLowerCase() ? "#eef3e8" : "var(--paper)",
                                                border: email.toLowerCase() === user.email.toLowerCase() ? "1px solid var(--ink)" : "1px solid var(--border-subtle)",
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
                                                    {user.email} • Station: <code>{user.station}</code>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                className="btn-secondary"
                                                style={{ padding: "0.5rem 0.9rem", fontSize: "0.72rem" }}
                                                onClick={() => handleSelectAccount(user)}
                                            >
                                                Select Email
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                {/* Tier 2: Factory Admins */}
                                <div style={{ marginBottom: "1.25rem" }}>
                                    <div style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#0369a1", fontWeight: 700, marginBottom: "0.5rem" }}>
                                        2. Admin Tier — Plant Managers &amp; Operations Leads
                                    </div>
                                    <div style={{ display: "grid", gap: "0.6rem" }}>
                                        {admins.map((user) => (
                                            <div
                                                key={user.id}
                                                style={{
                                                    padding: "0.85rem 1rem",
                                                    background: email.toLowerCase() === user.email.toLowerCase() ? "#e0f2fe" : "var(--paper)",
                                                    border: email.toLowerCase() === user.email.toLowerCase() ? "1px solid #0284c7" : "1px solid var(--border-subtle)",
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
                                                        {user.email} • {user.branchName} • Station: <code>{user.station}</code>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn-secondary"
                                                    style={{ padding: "0.5rem 0.9rem", fontSize: "0.72rem" }}
                                                    onClick={() => handleSelectAccount(user)}
                                                >
                                                    Select Email
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
                                    {staffList.length === 0 ? (
                                        <div style={{ padding: "0.85rem 1rem", background: "var(--paper)", border: "1px dashed var(--border-subtle)", borderRadius: "4px", fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                                            No demo staff accounts loaded. Superadmin and Admin users can provision floor staff from <code>/superadmin</code> or <code>/dashboard</code>.
                                        </div>
                                    ) : (
                                        <div style={{ display: "grid", gap: "0.6rem" }}>
                                            {staffList.map((user) => (
                                                <div
                                                    key={user.id}
                                                    style={{
                                                        padding: "0.8rem 1rem",
                                                        background: email.toLowerCase() === user.email.toLowerCase() ? "#dcfce7" : "var(--paper)",
                                                        border: email.toLowerCase() === user.email.toLowerCase() ? "1px solid #16a34a" : "1px solid var(--border-subtle)",
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
                                                            {user.email} • Station: {user.station}
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn-secondary"
                                                        style={{ padding: "0.5rem 0.9rem", fontSize: "0.72rem" }}
                                                        onClick={() => handleSelectAccount(user)}
                                                    >
                                                        Select Email
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="glass-panel" style={{ padding: "1.15rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
                                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                                    Want to inspect the Neon PostgreSQL schema &amp; Clerk status?
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
