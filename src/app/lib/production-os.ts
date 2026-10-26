export type ProductionStage =
  | "01_brief"
  | "02_quotation"
  | "03_approved"
  | "04_production_qc"
  | "05_dispatch";

export type UserAccessTier = "superadmin" | "admin" | "staff";

export type ArtisanRole =
  | "pattern_designer"
  | "cutting_master"
  | "tailor"
  | "quality_control"
  | "production_manager";

export interface FactoryBranch {
  id: string;
  name: string;
  location: string;
  specialization: string;
  machineCount: number;
  staffCount: number;
  fabricMetersStock: number;
  netRevenueNgn: number;
  operatingExpensesNgn: number;
  trueNetProfitNgn: number;
  status: "ACTIVE" | "MAINTENANCE";
}

export interface ArtisanStaff {
  id: string;
  name: string;
  email: string;
  accessTier: UserAccessTier;
  role: ArtisanRole;
  branchId: string;
  branchName: string;
  specialty: string;
  station: string;
  activeRuns: number;
  unitsCompletedMonth: number;
  qcPassRate: number; // percentage e.g. 98.4
  shiftStatus: "CLOCKED_IN" | "BREAK" | "OFF_SHIFT";
  status: "Active on Floor" | "Pattern Studio" | "QC Station" | "Executive HQ";
}

export interface SizeBreakdown {
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
  XXL: number;
}

export interface ProductionOrder {
  id: string;
  jobCode: string; // e.g. MKP-20261025-841
  offlineId: string;
  branchId?: string;
  company: string;
  email: string;
  phone: string;
  garmentCategory: string;
  quantityBracket: string;
  exactQuantity: number;
  specificationsReady: string;
  details: string;
  stage: ProductionStage;
  sizeBreakdown: SizeBreakdown;
  estimatedUnitCostNgn: number;
  totalQuoteNgn: number;
  estimatedFabricMeters: number;
  estimatedLeadWeeks: number;
  discountPercent: number;
  promoCode?: string;
  assignedPatternDesigner: string;
  assignedTailorLead: string;
  assignedQcInspector: string;
  unitsSewn: number;
  unitsPassedQc: number;
  unitsRework: number;
  targetDeliveryDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface FabricInventoryItem {
  id: string;
  sku: string;
  name: string;
  category: "Fabric Roll" | "Trim & Hardware" | "Labels & Packaging";
  unit: "meters" | "pieces" | "cones";
  stockLevel: number;
  reorderThreshold: number;
  dailyBurnRate: number; // units per day based on 30-day velocity
  costPerUnitNgn: number;
  supplierName: string;
  batchLot: string;
}

export interface SupplierPurchaseOrder {
  id: string;
  poNumber: string;
  supplierName: string;
  materialSku: string;
  materialName: string;
  quantityOrdered: number;
  unit: string;
  unitCostNgn: number;
  totalCostNgn: number;
  status: "issued" | "received";
  createdAt: string;
  receivedAt?: string;
}

export interface BrandClientCrm {
  id: string;
  brandName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  tier: "Emerging Label" | "Studio Partner" | "Collection Partner" | "Heritage VIP";
  lifetimeUnitsOrdered: number;
  lifetimeSpendNgn: number;
  loyaltyPoints: number;
  discountRate: number; // percentage
  lastOrderDate: string;
}

export interface FactoryExpense {
  id: string;
  category:
    | "generator_diesel"
    | "machinery_maintenance"
    | "artisan_payroll"
    | "fabric_logistics"
    | "phcn_utilities"
    | "qc_packaging";
  description: string;
  amountNgn: number;
  recordedBy: string;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  action: string;
  actor: string;
  role: string;
  targetRef: string;
  summary: string;
  createdAt: string;
}

export const STAGE_METADATA: Record<
  ProductionStage,
  { stepNumber: string; label: string; shortLabel: string; description: string }
> = {
  "01_brief": {
    stepNumber: "01",
    label: "Share your brief",
    shortLabel: "Brief Received",
    description: "Order specifications, quantity, size ratio and target delivery logged.",
  },
  "02_quotation": {
    stepNumber: "02",
    label: "Review & quotation",
    shortLabel: "Pattern & Quote Review",
    description: "Pattern designer reviews tech pack, fabric consumption and pro-forma costing.",
  },
  "03_approved": {
    stepNumber: "03",
    label: "Approve the details",
    shortLabel: "Sample & Tech Pack Approved",
    description: "Pre-production sample, size grading and markers approved for bulk cutting.",
  },
  "04_production_qc": {
    stepNumber: "04",
    label: "Production & checks",
    shortLabel: "Sewing Floor & QC Checks",
    description: "Active bulk sewing by assigned tailors with inline & final Quality Control inspection.",
  },
  "05_dispatch": {
    stepNumber: "05",
    label: "Prepare for delivery",
    shortLabel: "Finished & Dispatched",
    description: "Final pressing, private-label tagging, poly-bagging and dispatch to brand.",
  },
};

export const ARTISAN_ROLE_LABELS: Record<ArtisanRole, string> = {
  pattern_designer: "Pattern Designer",
  cutting_master: "Cutting Master",
  tailor: "Master Tailor / Sewing Lead",
  quality_control: "Quality Control (QC)",
  production_manager: "Production Manager",
};

export const ACCESS_TIER_LABELS: Record<UserAccessTier, string> = {
  superadmin: "Superadmin (Global HQ)",
  admin: "Factory Admin / Manager",
  staff: "Artisan / Floor Staff",
};

export const INITIAL_BRANCHES: FactoryBranch[] = [
  {
    id: "br-yaba",
    name: "Yaba Flagship Production Plant",
    location: "Sabon Yaba, Lagos Mainland",
    specialization: "High-Volume Bulk Sewing, Knits, Wovens & AQL 2.5 QC Hub",
    machineCount: 48,
    staffCount: 6,
    fabricMetersStock: 2480,
    netRevenueNgn: 23020000,
    operatingExpensesNgn: 5125000,
    trueNetProfitNgn: 8216600,
    status: "ACTIVE",
  },
  {
    id: "br-vi",
    name: "Victoria Island Pattern & Sample Atelier",
    location: "Adeola Odeku, Victoria Island, Lagos",
    specialization: "CAD Pattern Drafting, Luxury Resortwear, Draping & Client Fittings",
    machineCount: 16,
    staffCount: 3,
    fabricMetersStock: 920,
    netRevenueNgn: 8700000,
    operatingExpensesNgn: 1650000,
    trueNetProfitNgn: 3396000,
    status: "ACTIVE",
  },
  {
    id: "br-ikeja",
    name: "Ikeja Workwear & Export Finishing Depot",
    location: "Ikeja Industrial Estate, Lagos",
    specialization: "Corporate Uniforms, Heavy Twill/Denim, Steam Pressing & Export Cartons",
    machineCount: 28,
    staffCount: 2,
    fabricMetersStock: 1640,
    netRevenueNgn: 7600000,
    operatingExpensesNgn: 840000,
    trueNetProfitNgn: 3568000,
    status: "ACTIVE",
  },
];

export const PROMO_CODES: Record<
  string,
  { code: string; label: string; discountPercent: number; minUnits: number }
> = {
  LAGOSVIP10: {
    code: "LAGOSVIP10",
    label: "10% VIP Collection Partner Discount",
    discountPercent: 10,
    minUnits: 100,
  },
  FIRSTBULK5: {
    code: "FIRSTBULK5",
    label: "5% First Bulk Run Welcome Credit",
    discountPercent: 5,
    minUnits: 50,
  },
  SCALE1000: {
    code: "SCALE1000",
    label: "12% High-Volume Scale Contract (1,000+ pcs)",
    discountPercent: 12,
    minUnits: 1000,
  },
};

export const INITIAL_ARTISANS: ArtisanStaff[] = [
  {
    id: "art-super",
    name: "Kudi Alabi",
    email: "kudi@misskudi.com",
    accessTier: "superadmin",
    role: "production_manager",
    branchId: "br-yaba",
    branchName: "Yaba Flagship Production Plant",
    specialty: "Multi-Facility Executive Operations, Private-Label Contracts & Global P&L",
    station: "Executive HQ · All Facilities",
    activeRuns: 5,
    unitsCompletedMonth: 3050,
    qcPassRate: 99.6,
    shiftStatus: "CLOCKED_IN",
    status: "Executive HQ",
  },
  {
    id: "art-admin-1",
    name: "Damilola Ojo",
    email: "admin@misskudi.com",
    accessTier: "admin",
    role: "production_manager",
    branchId: "br-yaba",
    branchName: "Yaba Flagship Production Plant",
    specialty: "Plant Floor Scheduling, Line Balancing, Fabric Procurement & QC Sign-Off",
    station: "Yaba Plant Operations Office",
    activeRuns: 4,
    unitsCompletedMonth: 2650,
    qcPassRate: 99.3,
    shiftStatus: "CLOCKED_IN",
    status: "Active on Floor",
  },
  {
    id: "art-admin-2",
    name: "Zainab Lawal",
    email: "zainab.admin@misskudi.com",
    accessTier: "admin",
    role: "production_manager",
    branchId: "br-vi",
    branchName: "Victoria Island Pattern & Sample Atelier",
    specialty: "Atelier Sample Management, Luxury Brand Onboarding & Tech Pack Governance",
    station: "VI Atelier Management Suite",
    activeRuns: 2,
    unitsCompletedMonth: 1100,
    qcPassRate: 99.5,
    shiftStatus: "CLOCKED_IN",
    status: "Pattern Studio",
  },
  {
    id: "art-1",
    name: "Chioma Nwosu",
    email: "chioma.patterns@misskudi.com",
    accessTier: "staff",
    role: "pattern_designer",
    branchId: "br-vi",
    branchName: "Victoria Island Pattern & Sample Atelier",
    specialty: "CAD Pattern Drafting, Draping & Multi-Size Grading",
    station: "Pattern & Sample Studio A",
    activeRuns: 3,
    unitsCompletedMonth: 1850,
    qcPassRate: 99.2,
    shiftStatus: "CLOCKED_IN",
    status: "Pattern Studio",
  },
  {
    id: "art-2",
    name: "Tunde Bakare",
    email: "tunde.grading@misskudi.com",
    accessTier: "staff",
    role: "pattern_designer",
    branchId: "br-yaba",
    branchName: "Yaba Flagship Production Plant",
    specialty: "Menswear Tailoring, Shirts & Technical Spec Sheets",
    station: "Pattern & Sample Studio B",
    activeRuns: 2,
    unitsCompletedMonth: 1420,
    qcPassRate: 98.7,
    shiftStatus: "CLOCKED_IN",
    status: "Pattern Studio",
  },
  {
    id: "art-3",
    name: "Segun Adeyemi",
    email: "segun.cutting@misskudi.com",
    accessTier: "staff",
    role: "cutting_master",
    branchId: "br-yaba",
    branchName: "Yaba Flagship Production Plant",
    specialty: "Bulk Lay Planning, Marker Efficiency & Precision Cutting",
    station: "Cutting Table Line 1",
    activeRuns: 4,
    unitsCompletedMonth: 3400,
    qcPassRate: 99.5,
    shiftStatus: "CLOCKED_IN",
    status: "Active on Floor",
  },
  {
    id: "art-4",
    name: "Ibrahim Musa",
    email: "ibrahim.tailor@misskudi.com",
    accessTier: "staff",
    role: "tailor",
    branchId: "br-ikeja",
    branchName: "Ikeja Workwear & Export Finishing Depot",
    specialty: "Structured Menswear, Trousers, Uniforms & Heavy Wovens",
    station: "Sewing Line 1 (12 Machines)",
    activeRuns: 2,
    unitsCompletedMonth: 1640,
    qcPassRate: 97.9,
    shiftStatus: "CLOCKED_IN",
    status: "Active on Floor",
  },
  {
    id: "art-5",
    name: "Funke Olatunji",
    email: "funke.tailor@misskudi.com",
    accessTier: "staff",
    role: "tailor",
    branchId: "br-vi",
    branchName: "Victoria Island Pattern & Sample Atelier",
    specialty: "Dresses, Womenswear, Resortwear & Fine Silk/Linen Finishing",
    station: "Sewing Line 2 (10 Machines)",
    activeRuns: 2,
    unitsCompletedMonth: 1290,
    qcPassRate: 98.8,
    shiftStatus: "CLOCKED_IN",
    status: "Active on Floor",
  },
  {
    id: "art-6",
    name: "Emeka Okafor",
    email: "emeka.knits@misskudi.com",
    accessTier: "staff",
    role: "tailor",
    branchId: "br-yaba",
    branchName: "Yaba Flagship Production Plant",
    specialty: "T-Shirts, Jersey Tops, Overlock & Sportswear Flatlock",
    station: "Sewing Line 3 — Knits (14 Machines)",
    activeRuns: 3,
    unitsCompletedMonth: 2450,
    qcPassRate: 98.1,
    shiftStatus: "CLOCKED_IN",
    status: "Active on Floor",
  },
  {
    id: "art-7",
    name: "Ngozi Eze",
    email: "ngozi.qc@misskudi.com",
    accessTier: "staff",
    role: "quality_control",
    branchId: "br-yaba",
    branchName: "Yaba Flagship Production Plant",
    specialty: "AQL 2.5 Final Inspection, Measurement Verification & Stitch Density",
    station: "QC & Finishing Bay 1",
    activeRuns: 4,
    unitsCompletedMonth: 3120,
    qcPassRate: 99.6,
    shiftStatus: "CLOCKED_IN",
    status: "QC Station",
  },
  {
    id: "art-8",
    name: "Halima Bello",
    email: "halima.qc@misskudi.com",
    accessTier: "staff",
    role: "quality_control",
    branchId: "br-ikeja",
    branchName: "Ikeja Workwear & Export Finishing Depot",
    specialty: "Private-Label Neck Tagging, Steam Pressing & Export Packaging QC",
    station: "QC & Finishing Bay 2",
    activeRuns: 3,
    unitsCompletedMonth: 2260,
    qcPassRate: 99.4,
    shiftStatus: "CLOCKED_IN",
    status: "QC Station",
  },
];

export const INITIAL_ORDERS: ProductionOrder[] = [
  {
    id: "ord-1",
    jobCode: "MKP-20261018-841",
    offlineId: "seed-mkp-841",
    branchId: "br-vi",
    company: "Zikora Lagos",
    email: "production@zikoralagos.com",
    phone: "+234 803 441 9200",
    garmentCategory: "Dresses and womenswear",
    quantityBracket: "500–999 pieces",
    exactQuantity: 600,
    specificationsReady: "Technical pack",
    details:
      "Resort 26 Pleated Linen Midi Dress in Olive & Bone. Custom woven main label + care label, concealed YKK back zip, steam pressed on hangers.",
    stage: "04_production_qc",
    sizeBreakdown: { XS: 60, S: 150, M: 180, L: 130, XL: 60, XXL: 20 },
    estimatedUnitCostNgn: 14500,
    totalQuoteNgn: 8700000,
    estimatedFabricMeters: 1320,
    estimatedLeadWeeks: 4,
    discountPercent: 7,
    promoCode: "LAGOSVIP10",
    assignedPatternDesigner: "Chioma Nwosu",
    assignedTailorLead: "Funke Olatunji",
    assignedQcInspector: "Ngozi Eze",
    unitsSewn: 485,
    unitsPassedQc: 472,
    unitsRework: 13,
    targetDeliveryDate: "2026-11-08",
    createdAt: "2026-10-18T09:30:00.000Z",
    updatedAt: "2026-10-25T14:20:00.000Z",
  },
  {
    id: "ord-2",
    jobCode: "MKP-20261020-842",
    offlineId: "seed-mkp-842",
    branchId: "br-yaba",
    company: "Aire Studio London",
    email: "sourcing@airestudio.co.uk",
    phone: "+44 7700 900412",
    garmentCategory: "T-shirts and tops",
    quantityBracket: "1,000–4,999 pieces",
    exactQuantity: 1200,
    specificationsReady: "Tech pack + graded patterns",
    details:
      "240 GSM Heavyweight Boxy Tees in Washed Olive and Ecru. Ribbed 1x1 collar, shoulder-to-shoulder tape, screen-printed size neck transfer, export carton packing.",
    stage: "04_production_qc",
    sizeBreakdown: { XS: 100, S: 260, M: 400, L: 280, XL: 120, XXL: 40 },
    estimatedUnitCostNgn: 8200,
    totalQuoteNgn: 9840000,
    estimatedFabricMeters: 1560,
    estimatedLeadWeeks: 4,
    discountPercent: 12,
    promoCode: "SCALE1000",
    assignedPatternDesigner: "Tunde Bakare",
    assignedTailorLead: "Emeka Okafor",
    assignedQcInspector: "Halima Bello",
    unitsSewn: 920,
    unitsPassedQc: 905,
    unitsRework: 15,
    targetDeliveryDate: "2026-11-12",
    createdAt: "2026-10-20T11:15:00.000Z",
    updatedAt: "2026-10-25T16:05:00.000Z",
  },
  {
    id: "ord-3",
    jobCode: "MKP-20261022-843",
    offlineId: "seed-mkp-843",
    branchId: "br-yaba",
    company: "Odua Menswear",
    email: "ops@oduamenswear.ng",
    phone: "+234 809 211 3380",
    garmentCategory: "Shirts and menswear",
    quantityBracket: "100–499 pieces",
    exactQuantity: 350,
    specificationsReady: "Sample garment",
    details:
      "Relaxed Camp-Collar Embroidered Cotton Shirts. Corozo nut buttons, French seams, folded with tissue paper and branded belly band.",
    stage: "03_approved",
    sizeBreakdown: { XS: 25, S: 75, M: 115, L: 85, XL: 35, XXL: 15 },
    estimatedUnitCostNgn: 12800,
    totalQuoteNgn: 4480000,
    estimatedFabricMeters: 630,
    estimatedLeadWeeks: 3,
    discountPercent: 3,
    assignedPatternDesigner: "Tunde Bakare",
    assignedTailorLead: "Ibrahim Musa",
    assignedQcInspector: "Ngozi Eze",
    unitsSewn: 60,
    unitsPassedQc: 58,
    unitsRework: 2,
    targetDeliveryDate: "2026-11-18",
    createdAt: "2026-10-22T15:00:00.000Z",
    updatedAt: "2026-10-24T17:40:00.000Z",
  },
  {
    id: "ord-4",
    jobCode: "MKP-20261024-844",
    offlineId: "seed-mkp-844",
    branchId: "br-ikeja",
    company: "Eko Hospitality Group",
    email: "procurement@ekohospitality.com",
    phone: "+234 812 700 5511",
    garmentCategory: "Uniforms and workwear",
    quantityBracket: "500–999 pieces",
    exactQuantity: 500,
    specificationsReady: "Designs and patterns",
    details:
      "Contemporary Linen-Blend Staff Tunics & Tailored Trousers in Olive & Charcoal. Reinforced bar-tack pockets, industrial launderable thread.",
    stage: "02_quotation",
    sizeBreakdown: { XS: 40, S: 110, M: 160, L: 120, XL: 50, XXL: 20 },
    estimatedUnitCostNgn: 15200,
    totalQuoteNgn: 7600000,
    estimatedFabricMeters: 1150,
    estimatedLeadWeeks: 4,
    discountPercent: 5,
    assignedPatternDesigner: "Chioma Nwosu",
    assignedTailorLead: "Ibrahim Musa",
    assignedQcInspector: "Halima Bello",
    unitsSewn: 0,
    unitsPassedQc: 0,
    unitsRework: 0,
    targetDeliveryDate: "2026-11-25",
    createdAt: "2026-10-24T10:10:00.000Z",
    updatedAt: "2026-10-25T11:00:00.000Z",
  },
  {
    id: "ord-5",
    jobCode: "MKP-20261010-839",
    offlineId: "seed-mkp-839",
    branchId: "br-yaba",
    company: "Kora Active",
    email: "hello@koraactive.com",
    phone: "+234 706 882 1940",
    garmentCategory: "Sportswear and activewear",
    quantityBracket: "100–499 pieces",
    exactQuantity: 400,
    specificationsReady: "Technical pack",
    details:
      "Compression Nylon-Spandex Leggings & Cropped Track Jackets. 4-needle 6-thread flatlock seams, silicone waistband grip.",
    stage: "05_dispatch",
    sizeBreakdown: { XS: 60, S: 120, M: 120, L: 70, XL: 20, XXL: 10 },
    estimatedUnitCostNgn: 11500,
    totalQuoteNgn: 4600000,
    estimatedFabricMeters: 680,
    estimatedLeadWeeks: 3,
    discountPercent: 7,
    assignedPatternDesigner: "Chioma Nwosu",
    assignedTailorLead: "Emeka Okafor",
    assignedQcInspector: "Ngozi Eze",
    unitsSewn: 400,
    unitsPassedQc: 400,
    unitsRework: 4,
    targetDeliveryDate: "2026-10-26",
    createdAt: "2026-10-10T08:45:00.000Z",
    updatedAt: "2026-10-25T09:15:00.000Z",
  },
];

export const INITIAL_FABRIC_INVENTORY: FabricInventoryItem[] = [
  {
    id: "fab-1",
    sku: "FAB-CTN-240-OLV",
    name: "240 GSM Combed Cotton Jersey (Olive / Ecru)",
    category: "Fabric Roll",
    unit: "meters",
    stockLevel: 420,
    reorderThreshold: 800,
    dailyBurnRate: 85,
    costPerUnitNgn: 3800,
    supplierName: "Kaduna Cotton Spinners Ltd",
    batchLot: "LOT-KD-2026-09",
  },
  {
    id: "fab-2",
    sku: "FAB-LIN-180-NAT",
    name: "180 GSM Washed Flax-Linen Blend (Natural Bone)",
    category: "Fabric Roll",
    unit: "meters",
    stockLevel: 610,
    reorderThreshold: 700,
    dailyBurnRate: 62,
    costPerUnitNgn: 5400,
    supplierName: "Lagos Island Textile Mills",
    batchLot: "LOT-LIT-2026-14",
  },
  {
    id: "fab-3",
    sku: "FAB-TWL-280-CHR",
    name: "280 GSM Brushed Cotton Workwear Twill",
    category: "Fabric Roll",
    unit: "meters",
    stockLevel: 1450,
    reorderThreshold: 600,
    dailyBurnRate: 45,
    costPerUnitNgn: 4200,
    supplierName: "Lagos Island Textile Mills",
    batchLot: "LOT-LIT-2026-19",
  },
  {
    id: "fab-4",
    sku: "TRM-YKK-ZIP-18",
    name: "YKK Concealed Nylon & Brass Zippers (18cm–45cm)",
    category: "Trim & Hardware",
    unit: "pieces",
    stockLevel: 380,
    reorderThreshold: 600,
    dailyBurnRate: 55,
    costPerUnitNgn: 450,
    supplierName: "Aba Garment Trims & Hardware Co.",
    batchLot: "LOT-ABA-Z88",
  },
  {
    id: "fab-5",
    sku: "LBL-WVN-HD-01",
    name: "High-Density Damask Woven Brand & Size Labels",
    category: "Labels & Packaging",
    unit: "pieces",
    stockLevel: 3200,
    reorderThreshold: 1500,
    dailyBurnRate: 140,
    costPerUnitNgn: 180,
    supplierName: "Mainland Label Weavers Lagos",
    batchLot: "LOT-MLW-402",
  },
  {
    id: "fab-6",
    sku: "TRM-THD-POLY-40",
    name: "Industrial Core-Spun Polyester Thread Cones (5000m)",
    category: "Trim & Hardware",
    unit: "cones",
    stockLevel: 95,
    reorderThreshold: 120,
    dailyBurnRate: 9,
    costPerUnitNgn: 2200,
    supplierName: "Aba Garment Trims & Hardware Co.",
    batchLot: "LOT-ABA-T19",
  },
];

export const INITIAL_BRAND_CLIENTS: BrandClientCrm[] = [
  {
    id: "crm-1",
    brandName: "Aire Studio London",
    contactName: "Tomiwa Adeyinka",
    email: "sourcing@airestudio.co.uk",
    phone: "+44 7700 900412",
    city: "London / Lagos",
    tier: "Heritage VIP",
    lifetimeUnitsOrdered: 6400,
    lifetimeSpendNgn: 54800000,
    loyaltyPoints: 5480,
    discountRate: 12,
    lastOrderDate: "2026-10-20",
  },
  {
    id: "crm-2",
    brandName: "Zikora Lagos",
    contactName: "Zainab Okonkwo",
    email: "production@zikoralagos.com",
    phone: "+234 803 441 9200",
    city: "Victoria Island, Lagos",
    tier: "Collection Partner",
    lifetimeUnitsOrdered: 2850,
    lifetimeSpendNgn: 36200000,
    loyaltyPoints: 3620,
    discountRate: 7,
    lastOrderDate: "2026-10-18",
  },
  {
    id: "crm-3",
    brandName: "Kora Active",
    contactName: "Kemi Danjuma",
    email: "hello@koraactive.com",
    phone: "+234 706 882 1940",
    city: "Lekki Phase 1, Lagos",
    tier: "Collection Partner",
    lifetimeUnitsOrdered: 1900,
    lifetimeSpendNgn: 21400000,
    loyaltyPoints: 2140,
    discountRate: 7,
    lastOrderDate: "2026-10-10",
  },
  {
    id: "crm-4",
    brandName: "Odua Menswear",
    contactName: "Dapo Ogunleye",
    email: "ops@oduamenswear.ng",
    phone: "+234 809 211 3380",
    city: "Ikeja GRA, Lagos",
    tier: "Studio Partner",
    lifetimeUnitsOrdered: 920,
    lifetimeSpendNgn: 11800000,
    loyaltyPoints: 1180,
    discountRate: 3,
    lastOrderDate: "2026-10-22",
  },
  {
    id: "crm-5",
    brandName: "Eko Hospitality Group",
    contactName: "Chuka Obi",
    email: "procurement@ekohospitality.com",
    phone: "+234 812 700 5511",
    city: "Ikoyi, Lagos",
    tier: "Emerging Label",
    lifetimeUnitsOrdered: 500,
    lifetimeSpendNgn: 7600000,
    loyaltyPoints: 760,
    discountRate: 0,
    lastOrderDate: "2026-10-24",
  },
];

export const INITIAL_EXPENSES: FactoryExpense[] = [
  {
    id: "exp-1",
    category: "artisan_payroll",
    description: "Monthly payroll — Pattern Designers, Cutting Masters, Tailors & QC Inspectors",
    amountNgn: 4250000,
    recordedBy: "Kudi Alabi (Superadmin)",
    createdAt: "2026-10-20T09:00:00.000Z",
  },
  {
    id: "exp-2",
    category: "generator_diesel",
    description: "1,500L Automotive Gas Oil (Diesel) for 100kVA Industrial Factory Generator",
    amountNgn: 1875000,
    recordedBy: "Damilola Ojo (Plant Admin)",
    createdAt: "2026-10-21T14:30:00.000Z",
  },
  {
    id: "exp-3",
    category: "machinery_maintenance",
    description: "Juki DDL-8700 Lockstitch & Pegasus Overlock servicing + needle replacements",
    amountNgn: 380000,
    recordedBy: "Ibrahim Musa",
    createdAt: "2026-10-22T11:20:00.000Z",
  },
  {
    id: "exp-4",
    category: "qc_packaging",
    description: "Export master cartons, biodegradable garment polybags & silica gel packs",
    amountNgn: 490000,
    recordedBy: "Halima Bello (QC)",
    createdAt: "2026-10-23T16:10:00.000Z",
  },
  {
    id: "exp-5",
    category: "phcn_utilities",
    description: "EKEDC industrial feeder electricity tariff & steam boiler water treatment",
    amountNgn: 620000,
    recordedBy: "Kudi Alabi (Superadmin)",
    createdAt: "2026-10-24T10:00:00.000Z",
  },
];

export const INITIAL_POS: SupplierPurchaseOrder[] = [
  {
    id: "po-1",
    poNumber: "PO-MKP-2026-104",
    supplierName: "Lagos Island Textile Mills",
    materialSku: "FAB-TWL-280-CHR",
    materialName: "280 GSM Brushed Cotton Workwear Twill",
    quantityOrdered: 1000,
    unit: "meters",
    unitCostNgn: 4200,
    totalCostNgn: 4200000,
    status: "received",
    createdAt: "2026-10-14T10:00:00.000Z",
    receivedAt: "2026-10-17T15:30:00.000Z",
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "aud-1",
    action: "qc.inspection_logged",
    actor: "Ngozi Eze",
    role: "Staff · Quality Control (QC)",
    targetRef: "MKP-20261018-841",
    summary: "Passed 472/485 units on Zikora Lagos Linen Midi Dress (97.3% first-pass yield; 13 flagged for hem pressing).",
    createdAt: "2026-10-25T14:20:00.000Z",
  },
  {
    id: "aud-2",
    action: "production.sewing_batch",
    actor: "Emeka Okafor",
    role: "Staff · Master Tailor",
    targetRef: "MKP-20261020-842",
    summary: "Completed sewing batch #4 (220 pcs) for Aire Studio 240 GSM Heavyweight Tees on Sewing Line 3.",
    createdAt: "2026-10-25T12:45:00.000Z",
  },
  {
    id: "aud-3",
    action: "pattern.techpack_approved",
    actor: "Tunde Bakare",
    role: "Staff · Pattern Designer",
    targetRef: "MKP-20261022-843",
    summary: "Approved graded nest (XS–XXL) and marker layout (91.4% fabric utilization) for Odua Menswear Shirts.",
    createdAt: "2026-10-24T17:40:00.000Z",
  },
];

// Category pricing & fabric consumption baselines
export const GARMENT_ESTIMATION_SPECS: Record<
  string,
  {
    baseUnitCostNgn: number;
    fabricMetersPerUnit: number;
    baseLeadWeeks: number;
    defaultPatternDesigner: string;
    defaultTailorLead: string;
    defaultQcInspector: string;
  }
> = {
  "T-shirts and tops": {
    baseUnitCostNgn: 9500,
    fabricMetersPerUnit: 1.3,
    baseLeadWeeks: 3,
    defaultPatternDesigner: "Tunde Bakare",
    defaultTailorLead: "Emeka Okafor",
    defaultQcInspector: "Halima Bello",
  },
  "T‑shirts and tops": {
    baseUnitCostNgn: 9500,
    fabricMetersPerUnit: 1.3,
    baseLeadWeeks: 3,
    defaultPatternDesigner: "Tunde Bakare",
    defaultTailorLead: "Emeka Okafor",
    defaultQcInspector: "Halima Bello",
  },
  "Dresses and womenswear": {
    baseUnitCostNgn: 16000,
    fabricMetersPerUnit: 2.2,
    baseLeadWeeks: 4,
    defaultPatternDesigner: "Chioma Nwosu",
    defaultTailorLead: "Funke Olatunji",
    defaultQcInspector: "Ngozi Eze",
  },
  "Shirts and menswear": {
    baseUnitCostNgn: 13500,
    fabricMetersPerUnit: 1.8,
    baseLeadWeeks: 3,
    defaultPatternDesigner: "Tunde Bakare",
    defaultTailorLead: "Ibrahim Musa",
    defaultQcInspector: "Ngozi Eze",
  },
  "Trousers and bottoms": {
    baseUnitCostNgn: 14200,
    fabricMetersPerUnit: 1.7,
    baseLeadWeeks: 4,
    defaultPatternDesigner: "Tunde Bakare",
    defaultTailorLead: "Ibrahim Musa",
    defaultQcInspector: "Ngozi Eze",
  },
  "Uniforms and workwear": {
    baseUnitCostNgn: 15800,
    fabricMetersPerUnit: 2.3,
    baseLeadWeeks: 4,
    defaultPatternDesigner: "Chioma Nwosu",
    defaultTailorLead: "Ibrahim Musa",
    defaultQcInspector: "Halima Bello",
  },
  "Sportswear and activewear": {
    baseUnitCostNgn: 12200,
    fabricMetersPerUnit: 1.7,
    baseLeadWeeks: 3,
    defaultPatternDesigner: "Chioma Nwosu",
    defaultTailorLead: "Emeka Okafor",
    defaultQcInspector: "Ngozi Eze",
  },
  "Mixed collection / other": {
    baseUnitCostNgn: 14800,
    fabricMetersPerUnit: 2.0,
    baseLeadWeeks: 4,
    defaultPatternDesigner: "Chioma Nwosu",
    defaultTailorLead: "Funke Olatunji",
    defaultQcInspector: "Ngozi Eze",
  },
};

export function parseQuantityBracketToDefaultUnits(bracket: string): number {
  if (bracket.includes("Under 100")) return 80;
  if (bracket.includes("100–499")) return 250;
  if (bracket.includes("500–999")) return 600;
  if (bracket.includes("1,000–4,999")) return 1500;
  if (bracket.includes("5,000+")) return 5000;
  return 200;
}

export function computeDefaultSizeBreakdown(totalUnits: number): SizeBreakdown {
  const safeTotal = Math.max(10, Math.round(totalUnits));
  const xs = Math.round(safeTotal * 0.1);
  const s = Math.round(safeTotal * 0.22);
  const m = Math.round(safeTotal * 0.32);
  const l = Math.round(safeTotal * 0.22);
  const xl = Math.round(safeTotal * 0.1);
  const xxl = Math.max(0, safeTotal - (xs + s + m + l + xl));
  return { XS: xs, S: s, M: s > 0 ? m : 0, L: l, XL: xl, XXL: xxl };
}

export function calculateProductionEstimate(params: {
  garmentCategory: string;
  exactQuantity: number;
  specificationsReady: string;
  promoCode?: string;
}) {
  const spec =
    GARMENT_ESTIMATION_SPECS[params.garmentCategory] ||
    GARMENT_ESTIMATION_SPECS["Mixed collection / other"];

  const qty = Math.max(20, Number(params.exactQuantity) || 100);

  let volumeDiscount = 0;
  let volumeTierLabel = "Standard Run (<100 pcs)";
  if (qty >= 5000) {
    volumeDiscount = 18;
    volumeTierLabel = "Enterprise Bulk Tier (18% volume efficiency)";
  } else if (qty >= 1000) {
    volumeDiscount = 12;
    volumeTierLabel = "Scale Run Tier (12% volume efficiency)";
  } else if (qty >= 500) {
    volumeDiscount = 7;
    volumeTierLabel = "Mid-Bulk Tier (7% volume efficiency)";
  } else if (qty >= 100) {
    volumeDiscount = 3;
    volumeTierLabel = "Studio Bulk Tier (3% volume efficiency)";
  }

  const needsPatternHelp =
    params.specificationsReady.includes("Need help") ||
    params.specificationsReady.includes("Sample");
  const patternFeePerUnit = needsPatternHelp ? 650 : 0;

  const normalizedCode = (params.promoCode || "").trim().toUpperCase();
  const matchedPromo = PROMO_CODES[normalizedCode];
  const promoDiscount =
    matchedPromo && qty >= matchedPromo.minUnits ? matchedPromo.discountPercent : 0;

  const combinedDiscountPercent = Math.min(25, volumeDiscount + promoDiscount);
  const rawUnitCost = spec.baseUnitCostNgn + patternFeePerUnit;
  const estimatedUnitCostNgn =
    Math.round(((rawUnitCost * (100 - combinedDiscountPercent)) / 100) / 50) * 50;

  const totalQuoteNgn = estimatedUnitCostNgn * qty;
  const estimatedFabricMeters = Math.ceil(qty * spec.fabricMetersPerUnit * 1.05);
  const estimatedLeadWeeks =
    qty >= 1500
      ? spec.baseLeadWeeks + 2
      : qty >= 500
      ? spec.baseLeadWeeks + 1
      : spec.baseLeadWeeks;

  return {
    estimatedUnitCostNgn,
    totalQuoteNgn,
    estimatedFabricMeters,
    estimatedLeadWeeks,
    volumeTierLabel,
    combinedDiscountPercent,
    promoApplied: promoDiscount > 0 ? matchedPromo.code : undefined,
    assignedPatternDesigner: spec.defaultPatternDesigner,
    assignedTailorLead: spec.defaultTailorLead,
    assignedQcInspector: spec.defaultQcInspector,
  };
}

const STORAGE_KEYS = {
  ORDERS: "mkp_nexus_orders_v2",
  ARTISANS: "mkp_nexus_artisans_v2",
  BRANCHES: "mkp_nexus_branches_v2",
  INVENTORY: "mkp_nexus_inventory_v2",
  POS: "mkp_nexus_pos_v2",
  CLIENTS: "mkp_nexus_clients_v2",
  EXPENSES: "mkp_nexus_expenses_v2",
  AUDIT: "mkp_nexus_audit_v2",
  DRAFT_SIZE_MATRIX: "mkp_nexus_draft_sizes_v2",
  CURRENT_USER: "mkp_nexus_session_user_v2",
  ACTIVE_BRANCH: "mkp_nexus_active_branch_v2",
};

// --- RBAC Session Helpers ---
export function getCurrentSessionUser(): ArtisanStaff {
  if (typeof window === "undefined") return INITIAL_ARTISANS[0];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!raw) return INITIAL_ARTISANS[0];
    return JSON.parse(raw);
  } catch {
    return INITIAL_ARTISANS[0];
  }
}

export function setCurrentSessionUser(user: ArtisanStaff) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  if (user.branchId) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_BRANCH, user.branchId);
  }
  window.dispatchEvent(new CustomEvent("mkp:session-change", { detail: user }));
}

export function isSuperAdminUser(user?: ArtisanStaff | null): boolean {
  return user?.accessTier === "superadmin";
}

export function canManageFactory(user?: ArtisanStaff | null): boolean {
  return user?.accessTier === "superadmin" || user?.accessTier === "admin";
}

export function isStaffUser(user?: ArtisanStaff | null): boolean {
  return user?.accessTier === "staff";
}

export function getActiveBranchId(): string {
  if (typeof window === "undefined") return INITIAL_BRANCHES[0].id;
  const user = getCurrentSessionUser();
  if (isStaffUser(user) && user.branchId) {
    return user.branchId;
  }
  return (
    localStorage.getItem(STORAGE_KEYS.ACTIVE_BRANCH) ||
    user.branchId ||
    INITIAL_BRANCHES[0].id
  );
}

export function setActiveBranchId(branchId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ACTIVE_BRANCH, branchId);
  window.dispatchEvent(
    new CustomEvent("mkp:branch-change", { detail: branchId })
  );
}

export function loadBranches(): FactoryBranch[] {
  if (typeof window === "undefined") return INITIAL_BRANCHES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BRANCHES);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.BRANCHES,
        JSON.stringify(INITIAL_BRANCHES)
      );
      return INITIAL_BRANCHES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BRANCHES;
  }
}

export function saveBranches(branches: FactoryBranch[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.BRANCHES, JSON.stringify(branches));
}

export interface DraftSizeMatrixPayload {
  garmentCategory: string;
  totalQuantity: number;
  sizeBreakdown: SizeBreakdown;
  unitSystem: "in" | "cm";
  updatedAt: string;
}

export function saveDraftSizeMatrix(payload: DraftSizeMatrixPayload) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.DRAFT_SIZE_MATRIX, JSON.stringify(payload));
}

export function loadDraftSizeMatrix(): DraftSizeMatrixPayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFT_SIZE_MATRIX);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function loadOrders(): ProductionOrder[] {
  if (typeof window === "undefined") return INITIAL_ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ORDERS;
  }
}

export function saveOrders(orders: ProductionOrder[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

export function upsertOrderIdempotent(order: ProductionOrder): ProductionOrder[] {
  const existing = loadOrders();
  const idx = existing.findIndex(
    (o) => o.offlineId === order.offlineId || o.jobCode === order.jobCode
  );
  let next: ProductionOrder[];
  if (idx >= 0) {
    next = existing.map((o, i) => (i === idx ? order : o));
  } else {
    next = [order, ...existing];
  }
  saveOrders(next);
  return next;
}

export function loadArtisans(): ArtisanStaff[] {
  if (typeof window === "undefined") return INITIAL_ARTISANS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ARTISANS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(INITIAL_ARTISANS));
      return INITIAL_ARTISANS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_ARTISANS;
  }
}

export function saveArtisans(list: ArtisanStaff[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.ARTISANS, JSON.stringify(list));
}

export function loadInventory(): FabricInventoryItem[] {
  if (typeof window === "undefined") return INITIAL_FABRIC_INVENTORY;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.INVENTORY,
        JSON.stringify(INITIAL_FABRIC_INVENTORY)
      );
      return INITIAL_FABRIC_INVENTORY;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_FABRIC_INVENTORY;
  }
}

export function saveInventory(list: FabricInventoryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(list));
}

export function loadPurchaseOrders(): SupplierPurchaseOrder[] {
  if (typeof window === "undefined") return INITIAL_POS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.POS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.POS, JSON.stringify(INITIAL_POS));
      return INITIAL_POS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_POS;
  }
}

export function savePurchaseOrders(list: SupplierPurchaseOrder[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.POS, JSON.stringify(list));
}

export function loadBrandClients(): BrandClientCrm[] {
  if (typeof window === "undefined") return INITIAL_BRAND_CLIENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CLIENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(INITIAL_BRAND_CLIENTS));
      return INITIAL_BRAND_CLIENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BRAND_CLIENTS;
  }
}

export function saveBrandClients(list: BrandClientCrm[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(list));
}

export function loadExpenses(): FactoryExpense[] {
  if (typeof window === "undefined") return INITIAL_EXPENSES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(INITIAL_EXPENSES));
      return INITIAL_EXPENSES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_EXPENSES;
  }
}

export function saveExpenses(list: FactoryExpense[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(list));
}

export function loadAuditLogs(): AuditLogEntry[] {
  if (typeof window === "undefined") return INITIAL_AUDIT_LOGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(INITIAL_AUDIT_LOGS));
      return INITIAL_AUDIT_LOGS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_AUDIT_LOGS;
  }
}

export function appendAuditLog(entry: Omit<AuditLogEntry, "id" | "createdAt">) {
  const current = loadAuditLogs();
  const next: AuditLogEntry[] = [
    {
      ...entry,
      id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      createdAt: new Date().toISOString(),
    },
    ...current,
  ];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(next));
  }
  return next;
}
