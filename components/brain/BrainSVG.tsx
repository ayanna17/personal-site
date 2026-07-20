"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BRAIN_VIEWBOX,
  blackAccentPaths,
  detailPaths,
  outlinePaths,
  regions,
  shadowAccentPaths,
  type RegionId,
} from "./brainPaths";

interface BrainSVGProps {
  activeRegion: RegionId | null;
  onHover: (id: RegionId | null) => void;
  onSelect: (id: RegionId) => void;
  className?: string;
}

export default function BrainSVG({
  activeRegion,
  onHover,
  onSelect,
  className,
}: BrainSVGProps) {
  const [enteredCount, setEnteredCount] = useState(0);

  useEffect(() => {
    const timers = regions.map((_, i) =>
      setTimeout(() => setEnteredCount((c) => Math.max(c, i + 1)), i * 200)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <svg
      viewBox={BRAIN_VIEWBOX}
      className={className ?? "w-full max-w-[560px] mx-auto md:mx-0"}
      role="img"
      aria-label="Anatomical illustration of a brain, divided into hoverable regions"
    >
      {outlinePaths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="var(--foreground)"
          strokeOpacity={0.55}
          strokeWidth={3}
        />
      ))}

      {blackAccentPaths.map((d, i) => (
        <path key={i} d={d} fill="var(--foreground)" fillOpacity={0.16} />
      ))}

      {shadowAccentPaths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="var(--text-tertiary)"
          fillOpacity={0.35}
          stroke="var(--text-tertiary)"
          strokeOpacity={0.5}
          strokeWidth={1}
        />
      ))}

      {regions.map((region, index) => {
        const isActive = activeRegion === region.id;
        const visible = index < enteredCount;

        return (
          <motion.g
            key={region.id}
            data-cursor="region"
            data-cursor-color={region.hex}
            animate={{
              opacity: visible ? 1 : 0,
              scale: visible ? 1 : 0.95,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="cursor-none"
            style={{
              transformBox: "fill-box",
              transformOrigin: "center",
              filter: isActive ? `drop-shadow(0 0 16px ${region.hex}66)` : "none",
              transition: "filter 350ms cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={() => onHover(region.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(region.id)}
          >
            {region.paths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill={isActive ? region.hex : region.tint}
                fillOpacity={isActive ? 0.5 : 1}
                stroke={region.hex}
                strokeWidth={isActive ? 2 : 1.25}
                strokeOpacity={isActive ? 1 : 0.75}
                style={{
                  transition:
                    "fill 350ms cubic-bezier(0.16,1,0.3,1), fill-opacity 350ms cubic-bezier(0.16,1,0.3,1), stroke-width 350ms cubic-bezier(0.16,1,0.3,1), stroke-opacity 350ms cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
          </motion.g>
        );
      })}

      <g opacity={enteredCount >= regions.length ? 1 : 0} className="pointer-events-none">
        {detailPaths.map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="var(--foreground)"
            strokeOpacity={0.4}
            strokeWidth={1.2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: enteredCount >= regions.length ? 1 : 0 }}
            transition={{
              duration: 1.5,
              delay: (i % 20) * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </g>
    </svg>
  );
}
