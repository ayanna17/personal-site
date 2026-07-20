import raw from "./brain-wiki-paths.json";

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
  paths: string[];
  anatomicalFunction: string;
  items: RegionItem[];
}

export const BRAIN_VIEWBOX = raw.viewBox;

// Decorative, non-interactive layers traced from the source illustration.
export const outlinePaths: string[] = raw.outline;
export const detailPaths: string[] = raw.detailLines;
export const shadowAccentPaths: string[] = raw.shadowAccents;
export const blackAccentPaths: string[] = raw.blackAccents;

export const regions: RegionInfo[] = [
  {
    id: "prefrontal",
    label: "Prefrontal Cortex",
    color: "var(--region-pfc)",
    hex: "#8B5CF6",
    tint: "var(--region-pfc-tint)",
    paths: raw.regions.prefrontal,
    anatomicalFunction:
      "Planning, decision-making, complex problem-solving, executive function",
    items: [
      {
        name: "Ecosystem & Community Building",
        description:
          "Building the Williams entrepreneurship program (EphStart) and founding the Williams Investor Network. Creating community hubs, hacker houses, and the infrastructure that brings young builders together. Innovation shouldn't be concentrated. The best version of the future is collaborative, accessible, and in the hands of the next generation.",
      },
      {
        name: "Startup Operations",
        description:
          "On the operating side, drawn to the zero-to-one work of building products and companies. Most recently building at Klear Capital.",
      },
    ],
  },
  {
    id: "parietalOccipital",
    label: "Parietal & Occipital Lobes",
    color: "var(--region-po)",
    hex: "#0EA5E9",
    tint: "var(--region-po-tint)",
    paths: raw.regions.parietalOccipital,
    anatomicalFunction:
      "Processing information, pattern recognition, spatial reasoning, integrating sensory data",
    items: [
      {
        name: "AI Policy & Governance",
        description:
          "Understanding how AI should be regulated, deployed, and governed. Currently developing institutional and economic AI strategy for Williams College.",
      },
      {
        name: "Economics & Investing",
        description:
          "Exploring the forces that drive markets and economic systems. Fascinated by the incentives and choice architecture that underpin human behavior.",
      },
    ],
  },
  {
    id: "temporal",
    label: "Temporal Lobe",
    color: "var(--region-temporal)",
    hex: "#EC4899",
    tint: "var(--region-temporal-tint)",
    paths: raw.regions.temporal,
    anatomicalFunction:
      "Language, auditory processing, memory, narrative comprehension",
    items: [
      {
        name: "Content & Storytelling",
        description:
          "Building and learning to communicate ideas that resonate. Your story is your most undervalued asset.",
      },
      {
        name: "Essays & Writing",
        description:
          "Long-form thinking on tech, culture, and the belief systems that shape how we see the world. Writing is a form of thinking and discovery — the process of understanding what you believe.",
      },
      {
        name: "Advocacy",
        description: "Using narrative to push for policy and social change.",
      },
    ],
  },
  {
    id: "cerebellum",
    label: "Cerebellum",
    color: "var(--region-cerebellum)",
    hex: "#10B981",
    tint: "var(--region-cerebellum-tint)",
    paths: raw.regions.cerebellum,
    anatomicalFunction:
      "Movement, coordination, motor learning, balance, physical precision",
    items: [
      {
        name: "Tennis",
        description:
          "Recruited collegiate athlete (All-NESCAC). Playing since I was 5 (thanks, Dad). Tennis cultivated a mindset that goes way beyond the court. How I think, how I compete, how I show up — it all started here.",
      },
      {
        name: "Dance",
        description:
          "Hip-hop is my creative and physical outlet — and where I've met some of my closest friends :)",
      },
      {
        name: "Training & Wellness",
        description:
          "Strength training, running, and nutrition are non-negotiables. A healthy mind and body is an investment that pays dividends in every other pursuit.",
      },
    ],
  },
];
