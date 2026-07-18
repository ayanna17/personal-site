"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BrainSVG from "./BrainSVG";
import InfoPanel from "./InfoPanel";
import { regions, type RegionId } from "./brainPaths";

export default function BrainSection() {
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);
  const [lockedRegion, setLockedRegion] = useState<RegionId | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lockedRegion) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setLockedRegion(null);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [lockedRegion]);

  const activeId = lockedRegion ?? hoveredRegion;
  const activeRegion = regions.find((r) => r.id === activeId) ?? null;

  return (
    <section id="brain" className="mx-auto max-w-[1080px] px-5 py-[120px] md:px-12 md:py-[160px]">
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex items-baseline gap-4 md:mb-16"
      >
        <h2 data-cursor="text" className="text-[28px] font-bold tracking-[-0.02em] text-foreground">
          ayanna&apos;s brain
        </h2>
        <span data-cursor="text" className="text-[13px] font-light text-tertiary">
          hover to explore
        </span>
      </motion.header>

      <div
        ref={containerRef}
        className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16"
      >
        <BrainSVG
          activeRegion={activeId}
          onHover={(id) => setHoveredRegion(id)}
          onSelect={(id) => setLockedRegion((cur) => (cur === id ? null : id))}
        />
        <InfoPanel region={activeRegion} locked={Boolean(lockedRegion)} />
      </div>
    </section>
  );
}
