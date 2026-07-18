import raw from "./brain-paths.json";

export type RegionId = "prefrontal" | "parietalOccipital" | "temporal" | "cerebellum";

export interface RegionItem {
  name: string;
  description: string;
}

export interface RegionInfo {
  id: RegionId;
  label: string;
  color: string;
  hex: string;
  tint: string;
  path: string;
  sulci: string[];
  anatomicalFunction: string;
  items: RegionItem[];
}

export const BRAIN_VIEWBOX = "0 25 520 295";

export const brainstemPath: string = raw.brainstem;

export const regions: RegionInfo[] = [
  {
    id: "prefrontal",
    label: "Prefrontal Cortex",
    color: "var(--region-pfc)",
    hex: "#8B5CF6",
    tint: "var(--region-pfc-tint)",
    path: raw.prefrontal,
    sulci: raw.sulciPrefrontal,
    anatomicalFunction:
      "Planning, decision-making, complex problem-solving, executive function",
    items: [
      {
        name: "Williams Angel Investor Network",
        description: "Co-founded the first student-run angel network at Williams",
      },
      {
        name: "EphStart",
        description: "Building entrepreneurship infrastructure on campus",
      },
      { name: "Rally", description: "Tennis community" },
      {
        name: "Startup & VC",
        description: "Internships and ecosystem building",
      },
    ],
  },
  {
    id: "parietalOccipital",
    label: "Parietal & Occipital Lobes",
    color: "var(--region-po)",
    hex: "#0EA5E9",
    tint: "var(--region-po-tint)",
    path: raw.parietalOccipital,
    sulci: raw.sulciParietalOccipital,
    anatomicalFunction:
      "Processing information, pattern recognition, spatial reasoning, integrating sensory data",
    items: [
      {
        name: "AI Policy & Governance",
        description: "Research on regulation, safety, and responsible deployment",
      },
      {
        name: "Economics & Investing",
        description: "Macro thinking, market analysis, investment strategy",
      },
      {
        name: "Published Research",
        description: "Academic papers (coming soon)",
      },
    ],
  },
  {
    id: "temporal",
    label: "Temporal Lobe",
    color: "var(--region-temporal)",
    hex: "#EC4899",
    tint: "var(--region-temporal-tint)",
    path: raw.temporal,
    sulci: raw.sulciTemporal,
    anatomicalFunction:
      "Language, auditory processing, memory, narrative comprehension",
    items: [
      {
        name: "Content & Storytelling",
        description: "Making complex ideas accessible",
      },
      {
        name: "Essays & Writing",
        description: "Long-form thinking on tech, culture, and systems",
      },
      {
        name: "Advocacy",
        description: "Using narrative to push for policy and social change",
      },
    ],
  },
  {
    id: "cerebellum",
    label: "Cerebellum",
    color: "var(--region-cerebellum)",
    hex: "#10B981",
    tint: "var(--region-cerebellum-tint)",
    path: raw.cerebellum,
    sulci: raw.sulciCerebellum,
    anatomicalFunction:
      "Movement, coordination, motor learning, balance, physical precision",
    items: [
      { name: "Tennis", description: "All-NESCAC, competitive player" },
      { name: "Dance", description: "Expression through movement" },
      {
        name: "Running & Training",
        description: "Distance running, gym, strength training",
      },
    ],
  },
];
