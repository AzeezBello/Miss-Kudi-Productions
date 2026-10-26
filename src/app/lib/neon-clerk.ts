import {
  ArtisanRole,
  ArtisanStaff,
  INITIAL_ARTISANS,
  INITIAL_BRANCHES,
  UserAccessTier,
} from "./production-os";

export interface NeonClerkStatus {
  neonConfigured: boolean;
  clerkConfigured: boolean;
  databaseMode: "neon_postgres_serverless" | "hybrid_edge_store";
  authMode: "clerk_rbac_live" | "clerk_hybrid_session";
  connectionHost: string;
}

export function getNeonConnectionString(): string | null {
  const url =
    process.env.DATABASE_URL?.trim() ||
    process.env.POSTGRES_URL?.trim() ||
    process.env.NEON_DATABASE_URL?.trim() ||
    "";
  return url.length > 0 ? url : null;
}

export function isClerkConfigured(): boolean {
  const pub = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.trim() || "";
  return pub.startsWith("pk_");
}

export function getPlatformStatus(): NeonClerkStatus {
  const conn = getNeonConnectionString();
  const clerkReady = isClerkConfigured();
  let host = "ep-lagos-pooler.eu-central-1.aws.neon.tech (Hybrid Edge Ready)";
  if (conn) {
    try {
      const parsed = new URL(conn);
      host = parsed.host;
    } catch {
      host = "neon.tech (Configured)";
    }
  }
  return {
    neonConfigured: Boolean(conn),
    clerkConfigured: clerkReady,
    databaseMode: conn ? "neon_postgres_serverless" : "hybrid_edge_store",
    authMode: clerkReady ? "clerk_rbac_live" : "clerk_hybrid_session",
    connectionHost: host,
  };
}

/**
 * Maps a Clerk user session (with publicMetadata.accessTier & publicMetadata.specialistRole)
 * to a Miss Kudi Productions ArtisanStaff profile.
 */
export function mapClerkUserToArtisan(clerkUser: {
  id: string;
  fullName?: string | null;
  primaryEmailAddress?: { emailAddress: string } | null;
  publicMetadata?: {
    accessTier?: UserAccessTier;
    specialistRole?: ArtisanRole;
    branchId?: string;
    station?: string;
  };
}): ArtisanStaff {
  const email =
    clerkUser.primaryEmailAddress?.emailAddress?.toLowerCase() || "";
  const matchedSeed = INITIAL_ARTISANS.find(
    (a) => a.email.toLowerCase() === email
  );
  if (matchedSeed) {
    return {
      ...matchedSeed,
      accessTier:
        clerkUser.publicMetadata?.accessTier || matchedSeed.accessTier,
      role: clerkUser.publicMetadata?.specialistRole || matchedSeed.role,
    };
  }

  const branchId =
    clerkUser.publicMetadata?.branchId || INITIAL_BRANCHES[0].id;
  const branch =
    INITIAL_BRANCHES.find((b) => b.id === branchId) || INITIAL_BRANCHES[0];

  return {
    id: clerkUser.id,
    name: clerkUser.fullName || email.split("@")[0] || "Factory Specialist",
    email: email || "staff@misskudi.com",
    accessTier: clerkUser.publicMetadata?.accessTier || "staff",
    role: clerkUser.publicMetadata?.specialistRole || "tailor",
    branchId: branch.id,
    branchName: branch.name,
    specialty: "Garment Production & Quality Assurance",
    station: clerkUser.publicMetadata?.station || "Main Sewing Floor",
    activeRuns: 1,
    unitsCompletedMonth: 0,
    qcPassRate: 99.0,
    shiftStatus: "CLOCKED_IN",
    status: "Active on Floor",
  };
}
