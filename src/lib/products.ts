export type CategorySlug =
  | "built-in"
  | "freestanding"
  | "countertop"
  | "combi"
  | "specialty";

export type OvenType =
  | "built-in"
  | "range"
  | "countertop"
  | "combi"
  | "pizza"
  | "outdoor";

export type FuelType = "electric" | "gas" | "dual-fuel";

export type ProductColor = { name: string; hex: string; panel: string };

export type Product = {
  id: string;
  slug: string;
  name: string;
  image: string;
  series: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: CategorySlug;
  type: OvenType;
  fuel: FuelType;
  energyClass: "A++" | "A+" | "A" | "B";
  capacityLiters: number;
  powerKw: number;
  voltage: string;
  dimensions: { width: number; height: number; depth: number };
  weightKg: number;
  rating: number;
  reviewCount: number;
  stock: number;
  warrantyYears: number;
  badges: string[];
  colors: ProductColor[];
  features: string[];
  highlights: { label: string; value: string }[];
  included: string[];
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
};

export const categories: {
  slug: CategorySlug;
  name: string;
  description: string;
  eyebrow: string;
}[] = [
  {
    slug: "built-in",
    name: "Built-in ovens",
    eyebrow: "Series A",
    description:
      "Single and double deck ovens engineered to disappear into cabinetry while delivering bakery-grade evenness.",
  },
  {
    slug: "freestanding",
    name: "Ranges & cooktops",
    eyebrow: "Series E",
    description:
      "Induction and dual-fuel ranges with bridge burners, steam injection and true convection at every level.",
  },
  {
    slug: "countertop",
    name: "Countertop bakers",
    eyebrow: "Series P",
    description:
      "Compact convection ovens for apartments, offices and serious home bakers who want full-size performance.",
  },
  {
    slug: "combi",
    name: "Combi & microwave",
    eyebrow: "Series W",
    description:
      "Combi-steam microwave ovens that sear, steam and bake with 70% less energy than conventional units.",
  },
  {
    slug: "specialty",
    name: "Specialty cooking",
    eyebrow: "Series S",
    description:
      "Pizza ovens, outdoor griddles and sous-vide-ready appliances built for a different kind of heat.",
  },
];

export const products: Product[] = [
  {
    id: "nv-aria-60",
    slug: "aria-60-built-in-single-oven",
    image: "/ovens/industrial-baking-oven-open-door-visible-interior-racks-modern-kitchen-environment-stands-bright-its-revealing-415646304.webp",
    name: "Aria 60 Built-In Single Oven",
    series: "Aria",
    tagline: "Quiet precision for the daily bake.",
    description:
      "A 60cm built-in convection oven with a 3-level crisp roof, pyrolytic self-clean and a whisper-quiet inverter fan. The Aria 60 holds temperature within ±5°C through every rack, so your sourdough proofs and roasts land exactly where you planned them.",
    price: 1249,
    compareAtPrice: 1499,
    category: "built-in",
    type: "built-in",
    fuel: "electric",
    energyClass: "A+",
    capacityLiters: 72,
    powerKw: 2.9,
    voltage: "220–240V",
    dimensions: { width: 595, height: 595, depth: 550 },
    weightKg: 38,
    rating: 4.8,
    reviewCount: 214,
    stock: 12,
    warrantyYears: 10,
    badges: ["Best seller", "10-year warranty"],
    colors: [
      { name: "Matte Black", hex: "#26211d", panel: "#0a1930" },
      { name: "Brushed Steel", hex: "#b9b4ad", panel: "#8d8880" },
      { name: "Bone White", hex: "#e8e2d8", panel: "#c9c1b4" },
    ],
    features: [
      "3-level crisp roof with rapid preheat",
      "Pyrolytic self-clean cycle (3 settings)",
      "Adaptive steam injection with humidity sensor",
      "Inverter fan motor at 38 dB",
      "12 cooking modes incl. slow cook, proof and dehydrate",
      "Soft-close triple-glazed door",
    ],
    highlights: [
      { label: "Temperature accuracy", value: "±5°C" },
      { label: "Cavity volume", value: "72 L" },
      { label: "Energy rating", value: "A+" },
      { label: "Noise level", value: "38 dB" },
    ],
    included: [
      "Two telescopic rails",
      "Perforated baking tray",
      "Temperature probe",
      "Installation template",
    ],

    featured: true,
    bestseller: true,
  },
  {
    id: "nv-aria-90",
    slug: "aria-90-pyrolytic-double-oven",
    image: "/ovens/IR_Oven-transformed.webp",
    name: "Aria 90 Double Deck Oven",
    series: "Aria",
    tagline: "Two ovens. Zero compromises.",
    description:
      "A stacked double oven with independently controlled cavities. Bake a cake in the lower deck while roasting a chicken in the upper, each with its own temperature probe and steam profile.",
    price: 2890,
    compareAtPrice: 3290,
    category: "built-in",
    type: "built-in",
    fuel: "electric",
    energyClass: "A",
    capacityLiters: 108,
    powerKw: 4.1,
    voltage: "220–240V",
    dimensions: { width: 595, height: 880, depth: 550 },
    weightKg: 62,
    rating: 4.9,
    reviewCount: 87,
    stock: 5,
    warrantyYears: 10,
    badges: ["New", "Install required"],
    colors: [
      { name: "Matte Black", hex: "#26211d", panel: "#0a1930" },
      { name: "Brushed Steel", hex: "#b9b4ad", panel: "#8d8880" },
    ],
    features: [
      "Two independent cavities with separate probes",
      "Synchronised cook mode across both decks",
      "Pyrolytic self-clean in both cavities",
      "Soft-close doors on both decks",
      "Fingerprint-resistant glass front",
    ],
    highlights: [
      { label: "Total cavity volume", value: "108 L" },
      { label: "Independent zones", value: "2" },
      { label: "Energy rating", value: "A" },
      { label: "Warranty", value: "10 years" },
    ],
    included: ["Two telescopic rails", "Grill pan", "Temperature probe", "Installation template"],

    featured: true,
    newArrival: true,
  },
  {
    id: "nv-vulcan-70",
    slug: "vulcan-70-built-in-steam-oven",
    image: "/ovens/img-2077-500x500.webp",
    name: "Vulcan 70 Steam & Convection Oven",
    series: "Vulcan",
    tagline: "Steam, then crunch.",
    description:
      "A 70cm built-in oven with dedicated steam injection up to 300°C, perfect for sourdough crust, lacquered fish and vegetables that keep their colour.",
    price: 1799,
    category: "built-in",
    type: "built-in",
    fuel: "electric",
    energyClass: "A+",
    capacityLiters: 76,
    powerKw: 3.2,
    voltage: "220–240V",
    dimensions: { width: 595, height: 595, depth: 565 },
    weightKg: 44,
    rating: 4.7,
    reviewCount: 132,
    stock: 8,
    warrantyYears: 10,
    badges: ["Steam plus"],
    colors: [
      { name: "Brushed Steel", hex: "#b9b4ad", panel: "#8d8880" },
      { name: "Matte Black", hex: "#26211d", panel: "#0a1930" },
    ],
    features: [
      "Steam injection up to 300°C",
      "Humidity levels from 20–100%",
      "Combination steam and convection modes",
      "Savour probe with 10-point calibration",
      "Descaling cycle with guided prompts",
    ],
    highlights: [
      { label: "Steam ceiling", value: "300°C" },
      { label: "Cavity volume", value: "76 L" },
      { label: "Humidity range", value: "20–100%" },
      { label: "Energy rating", value: "A+" },
    ],
    included: ["Steam reservoir", "Savour probe", "Perforated tray", "Descaling tablets (4)"],

    featured: true,
  },
  {
    id: "nv-ember-90-gas",
    slug: "ember-90-gas-range",
    image: "/ovens/industrial-ovens--918.webp",
    name: "Ember 90 Gas Range",
    series: "Ember",
    tagline: "Open flame, sealed precision.",
    description:
      "A 90cm dual-fuel range with a sealed gas burners for serious heat control, weighted cast-iron grates and a convection oven that holds ±5°C.",
    price: 2199,
    compareAtPrice: 2499,
    category: "freestanding",
    type: "range",
    fuel: "gas",
    energyClass: "B",
    capacityLiters: 104,
    powerKw: 3.4,
    voltage: "230V",
    dimensions: { width: 900, height: 900, depth: 600 },
    weightKg: 71,
    rating: 4.7,
    reviewCount: 163,
    stock: 7,
    warrantyYears: 5,
    badges: ["Best seller"],
    colors: [
      { name: "Graphite Steel", hex: "#6e6a65", panel: "#2b2724" },
      { name: "Matte Black", hex: "#26211d", panel: "#0a1930" },
    ],
    features: [
      "6 sealed burners with cast-iron grates",
      "3,200 W electric convection oven",
      "Central dual-ring burner for wok work",
      "Full-extension storage drawer",
      "Adjustable levelling legs",
    ],
    highlights: [
      { label: "Burner count", value: "6" },
      { label: "Oven volume", value: "104 L" },
      { label: "Energy rating", value: "B" },
      { label: "Warranty", value: "5 years" },
    ],
    included: ["Cast-iron grates", "Burner caps", "Wok ring", "Anti-tip bracket"],

    bestseller: true,
  },
  {
    id: "nv-ember-60-induction",
    slug: "ember-60-induction-range",
    image: "/ovens/IR_Oven-transformed.webp",
    name: "Ember 60 Induction Range",
    series: "Ember",
    tagline: "Induction heat, zero delay.",
    description:
      "A 60cm induction range with four zones, a bridge function for griddle-sized cookware and an oven that reaches temperature in nine minutes.",
    price: 1699,
    category: "freestanding",
    type: "range",
    fuel: "electric",
    energyClass: "A++",
    capacityLiters: 68,
    powerKw: 7.4,
    voltage: "220–240V, 40A",
    dimensions: { width: 600, height: 900, depth: 600 },
    weightKg: 58,
    rating: 4.8,
    reviewCount: 241,
    stock: 14,
    warrantyYears: 10,
    badges: ["A++ efficiency", "New"],
    colors: [
      { name: "Matte Black", hex: "#26211d", panel: "#0a1930" },
      { name: "Brushed Steel", hex: "#b9b4ad", panel: "#8d8880" },
    ],
    features: [
      "4 induction zones with bridge function",
      "13 power levels per zone",
      "9-minute rapid preheat",
      "3D convection with steam injection",
      "Residual heat indicator per zone",
    ],
    highlights: [
      { label: "Zones", value: "4" },
      { label: "Oven volume", value: "68 L" },
      { label: "Energy rating", value: "A++" },
      { label: "Total power", value: "7.4 kW" },
    ],
    included: ["Induction hob seal", "Griddle plate", "Temperature probe"],

    featured: true,
    newArrival: true,
  },
  {
    id: "nv-nordic-110",
    slug: "nordic-110-dual-fuel-range",
    image: "/ovens/1.webp",
    name: "Nordic 110 Dual Fuel Range",
    series: "Nordic",
    tagline: "Built for the whole kitchen.",
    description:
      "A 110cm statement range with a gas hob, induction bridge, twin ovens and an integrated warming drawer with its own controls.",
    price: 3499,
    compareAtPrice: 3999,
    category: "freestanding",
    type: "range",
    fuel: "dual-fuel",
    energyClass: "B",
    capacityLiters: 152,
    powerKw: 5.2,
    voltage: "230V / 40A",
    dimensions: { width: 1100, height: 900, depth: 620 },
    weightKg: 94,
    rating: 4.9,
    reviewCount: 54,
    stock: 3,
    warrantyYears: 10,
    badges: ["Showroom piece", "Install required"],
    colors: [
      { name: "Anthracite", hex: "#3a332d", panel: "#171412" },
      { name: "Porcelain", hex: "#e8e2d8", panel: "#c9c1b4" },
    ],
    features: [
      "5-zone gas hob + induction bridge",
      "Twin ovens with independent temperature",
      "Integrated warming drawer with its own control",
      "Twin-catalogue convection fans",
      "Heavy-duty telescopic rails",
    ],
    highlights: [
      { label: "Cooking zones", value: "6" },
      { label: "Total volume", value: "152 L" },
      { label: "Energy rating", value: "B" },
      { label: "Warranty", value: "10 years" },
    ],
    included: ["Twin oven rails", "Griddle plate", "Warming drawer liner", "Anti-tip bracket"],

    featured: true,
  },
  {
    id: "nv-pico-20",
    slug: "pico-20-countertop-oven",
    image: "/ovens/multi-cook-ovens.webp",
    name: "Pico 20 Countertop Oven",
    series: "Pico",
    tagline: "Small footprint, serious heat.",
    description:
      "A 20-litre countertop convection oven that reaches 250°C with an external probe, six preset programs and a viewing window with a proper light.",
    price: 279,
    compareAtPrice: 349,
    category: "countertop",
    type: "countertop",
    fuel: "electric",
    energyClass: "A",
    capacityLiters: 20,
    powerKw: 1.8,
    voltage: "220–240V",
    dimensions: { width: 440, height: 300, depth: 380 },
    weightKg: 11,
    rating: 4.6,
    reviewCount: 412,
    stock: 26,
    warrantyYears: 3,
    badges: ["Best seller"],
    colors: [
      { name: "Matte Black", hex: "#26211d", panel: "#0a1930" },
      { name: "Cream", hex: "#e8e2d8", panel: "#c9c1b4" },
    ],
    features: [
      "20 L cavity with 4 shelf positions",
      "External temperature probe",
      "6 presets: toast, bake, broil, pizza, dehydrate, keep warm",
      "Convection fan with defrost setting",
      "Dishwasher-safe crumb tray",
    ],
    highlights: [
      { label: "Cavity volume", value: "20 L" },
      { label: "Max temperature", value: "250°C" },
      { label: "Power", value: "1.8 kW" },
      { label: "Weight", value: "11 kg" },
    ],
    included: ["Temperature probe", "Wire rack", "Crumb tray", "Recipe card booklet"],

    bestseller: true,
  },
  {
    id: "nv-pico-35",
    slug: "pico-35-smart-countertop-oven",
    image: "/ovens/img-2077-500x500.webp",
    name: "Pico 35 Smart Countertop Oven",
    series: "Pico",
    tagline: "Connected, calibrated, clever.",
    description:
      "A 35-litre smart oven with a 7-inch touchscreen, guided recipe programs, remote preheat and automatic probe pairing over Wi-Fi.",
    price: 649,
    category: "countertop",
    type: "countertop",
    fuel: "electric",
    energyClass: "A",
    capacityLiters: 35,
    powerKw: 2.4,
    voltage: "220–240V",
    dimensions: { width: 560, height: 380, depth: 430 },
    weightKg: 18,
    rating: 4.5,
    reviewCount: 176,
    stock: 10,
    warrantyYears: 3,
    badges: ["Wi-Fi", "App ready"],
    colors: [{ name: "Matte Black", hex: "#26211d", panel: "#0a1930" }],
    features: [
      "7-inch capacitive touchscreen",
      "Wi-Fi remote start and status",
      "60 guided recipe programs",
      "Two-point probe with auto-pairing",
      "Steam injection with refill reservoir",
    ],
    highlights: [
      { label: "Cavity volume", value: "35 L" },
      { label: "Screen", value: "7 inch" },
      { label: "Power", value: "2.4 kW" },
      { label: "Programs", value: "60" },
    ],
    included: ["Temperature probe", "Steam reservoir", "Two wire racks", "Crumb tray"],

    newArrival: true,
  },
  {
    id: "nv-steambake-mini",
    slug: "steambake-mini-countertop",
    image: "/ovens/1.webp",
    name: "Steambake Mini",
    series: "Pico",
    tagline: "Steam, compactly.",
    description:
      "A 12-litre countertop steamer with a 1.2 L reservoir and three steam-only programs for dumplings, vegetables and proofing.",
    price: 189,
    category: "countertop",
    type: "countertop",
    fuel: "electric",
    energyClass: "A",
    capacityLiters: 12,
    powerKw: 1.4,
    voltage: "220–240V",
    dimensions: { width: 360, height: 290, depth: 320 },
    weightKg: 8,
    rating: 4.4,
    reviewCount: 298,
    stock: 31,
    warrantyYears: 2,
    badges: ["Value pick"],
    colors: [
      { name: "Cream", hex: "#e8e2d8", panel: "#c9c1b4" },
      { name: "Matte Black", hex: "#26211d", panel: "#0a1930" },
    ],
    features: [
      "1.2 L refillable steam reservoir",
      "Steam, steam plus and clean modes",
      "3 auto programs: steam, dumplings, proof",
      "60-minute continuous steam",
      "Dishwasher-safe tray and basket",
    ],
    highlights: [
      { label: "Cavity volume", value: "12 L" },
      { label: "Reservoir", value: "1.2 L" },
      { label: "Power", value: "1.4 kW" },
      { label: "Weight", value: "8 kg" },
    ],
    included: ["Steam basket", "Drip tray", "Measuring cup"],

  },
  {
    id: "nv-wave-45",
    slug: "wave-45-combi-microwave",
    image: "/ovens/commercial-ovens-for-bakeries.webp",
    name: "Wave 45 Combi Microwave",
    series: "Wave",
    tagline: "Speed cooking, chef results.",
    description:
      "A 45-litre combi microwave with steam, grill and convection modes, 110 automatic programs and 30% faster cooking than a conventional oven.",
    price: 799,
    compareAtPrice: 949,
    category: "combi",
    type: "combi",
    fuel: "electric",
    energyClass: "A+",
    capacityLiters: 45,
    powerKw: 2.2,
    voltage: "220–240V",
    dimensions: { width: 595, height: 455, depth: 520 },
    weightKg: 31,
    rating: 4.7,
    reviewCount: 389,
    stock: 17,
    warrantyYears: 5,
    badges: ["Best seller", "30% faster"],
    colors: [
      { name: "Matte Black", hex: "#26211d", panel: "#0a1930" },
      { name: "Brushed Steel", hex: "#b9b4ad", panel: "#8d8880" },
    ],
    features: [
      "Microwave + steam + grill + convection",
      "110 automatic programs with weight input",
      "Inverter microwave with 10 power levels",
      "4.3 L water tank with auto-refill",
      "Turbo defrost by weight",
    ],
    highlights: [
      { label: "Cavity volume", value: "45 L" },
      { label: "Programs", value: "110" },
      { label: "Energy rating", value: "A+" },
      { label: "Warranty", value: "5 years" },
    ],
    included: ["Grill rack", "Steam tray", "Lid to cover microwave mode"],

    bestseller: true,
  },
  {
    id: "nv-wave-30",
    slug: "wave-30-slim-combi",
    image: "/ovens/bakery-oven-multy-level-food-factory-36146778.webp",
    name: "Wave 30 Slim Combi",
    series: "Wave",
    tagline: "Full combi, slim footprint.",
    description:
      "A 30-centimetre slim combi that fits a standard tall unit, with steam, grill, convection and 70 automatic programs.",
    price: 549,
    category: "combi",
    type: "combi",
    fuel: "electric",
    energyClass: "A+",
    capacityLiters: 30,
    powerKw: 1.9,
    voltage: "220–240V",
    dimensions: { width: 455, height: 455, depth: 520 },
    weightKg: 26,
    rating: 4.5,
    reviewCount: 143,
    stock: 11,
    warrantyYears: 5,
    badges: ["Slim 30 cm"],
    colors: [{ name: "Matte Black", hex: "#26211d", panel: "#0a1930" }],
    features: [
      "30 cm slim width for tight cabinetry",
      "Microwave + steam + grill + convection",
      "70 automatic programs",
      "3.0 L water tank",
      "Fingerprint-resistant glass front",
    ],
    highlights: [
      { label: "Cavity volume", value: "30 L" },
      { label: "Width", value: "455 mm" },
      { label: "Programs", value: "70" },
      { label: "Energy rating", value: "A+" },
    ],
    included: ["Grill rack", "Steam tray"],

  },
  {
    id: "nv-chef-400",
    slug: "chef-400-pizza-oven",
    image: "/ovens/1.webp",
    name: "Chef 400 Pizza Oven",
    series: "Chef",
    tagline: "Sixty seconds to Neapolitan.",
    description:
      "A 400°C stone hearth oven with a 60 cm cordierite floor, dual-fan stone heat recovery and a folding chassis that reaches temperature in 12 minutes.",
    price: 1099,
    compareAtPrice: 1299,
    category: "specialty",
    type: "pizza",
    fuel: "electric",
    energyClass: "B",
    capacityLiters: 38,
    powerKw: 3.6,
    voltage: "220–240V",
    dimensions: { width: 620, height: 480, depth: 700 },
    weightKg: 46,
    rating: 4.8,
    reviewCount: 92,
    stock: 6,
    warrantyYears: 2,
    badges: ["400°C", "12-minute heat-up"],
    colors: [
      { name: "Terracotta", hex: "#b5552f", panel: "#5e2a15" },
      { name: "Matte Black", hex: "#26211d", panel: "#0a1930" },
    ],
    features: [
      "400°C max with stone heat recovery",
      "60 cm cordierite baking stone",
      "Twin fans with independent dampers",
      "Foldable chassis with carry handles",
      "Separate stone and infrared burners",
    ],
    highlights: [
      { label: "Max temperature", value: "400°C" },
      { label: "Stone size", value: "60 cm" },
      { label: "Heat-up time", value: "12 min" },
      { label: "Weight", value: "46 kg" },
    ],
    included: ["Pizza peel", "Infrared burner", "Stone cover", "Blower cover"],

    featured: true,
  },
  {
    id: "nv-grill-master",
    slug: "grill-master-outdoor-oven",
    image: "/ovens/industrial-bakery-oven-and-bread-racks-in-commercial-kitchen-setting-photo.webp",
    name: "Grill Master Outdoor Oven",
    series: "Chef",
    tagline: "Weatherproof, year-round.",
    description:
      "A 316 stainless outdoor oven rated for year-round outdoor use, with a 700°C infrared zone, rotisserie and a 65°C weatherproof cabinet.",
    price: 1899,
    category: "specialty",
    type: "outdoor",
    fuel: "electric",
    energyClass: "B",
    capacityLiters: 88,
    powerKw: 3.4,
    voltage: "220–240V",
    dimensions: { width: 720, height: 1180, depth: 620 },
    weightKg: 88,
    rating: 4.7,
    reviewCount: 58,
    stock: 4,
    warrantyYears: 5,
    badges: ["Outdoor rated", "Year-round"],
    colors: [
      { name: "Marine Steel", hex: "#a9b0b4", panel: "#5f676b" },
      { name: "Matte Black", hex: "#26211d", panel: "#0a1930" },
    ],
    features: [
      "316 marine-grade stainless body",
      "700°C infrared searing zone",
      "Powered rotisserie with 2 spits",
      "65°C anti-freeze cabinet",
      "Lockable castors and side shelf",
    ],
    highlights: [
      { label: "Infrared zone", value: "700°C" },
      { label: "Cavity volume", value: "88 L" },
      { label: "Body", value: "316 stainless" },
      { label: "Warranty", value: "5 years" },
    ],
    included: ["Rotisserie spits", "Grill rack", "Rain cover", "Side burner shelf"],

  },
];

export function formatPrice(value: number, currency = "USD", locale = "en-US") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}
