"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BRAIN_VIEWBOX, brainstemPath, regions, type RegionId } from "./brainPaths";

interface BrainSVGProps {
  activeRegion: RegionId | null;
  onHover: (id: RegionId | null) => void;
  onSelect: (id: RegionId) => void;
}

export default function BrainSVG({ activeRegion, onHover, onSelect }: BrainSVGProps) {
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
      className="w-full max-w-[560px] mx-auto md:mx-0"
      role="img"
      aria-label="Anatomical illustration of a brain, divided into hoverable regions"
    >
      <defs>
        {regions.map((region) => (
          <clipPath key={region.id} id={`clip-${region.id}`}>
            <path d={region.path} />
          </clipPath>
        ))}
      </defs>

      <path
        d={brainstemPath}
        fill="var(--text-tertiary)"
        fillOpacity={0.35}
        stroke="var(--text-tertiary)"
        strokeOpacity={0.6}
        strokeWidth={1.2}
      />

      {regions.map((region, index) => {
        const isActive = activeRegion === region.id;
        const visible = index < enteredCount;

        return (
          <g key={region.id}>
            <motion.path
              d={region.path}
              data-cursor="region"
              data-cursor-color={region.hex}
              animate={{
                opacity: visible ? 1 : 0,
                scale: !visible ? 0.95 : isActive ? 1.03 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              fill={isActive ? region.hex : region.tint}
              fillOpacity={isActive ? 0.4 : 0.85}
              stroke={region.hex}
              strokeWidth={isActive ? 2 : 1.25}
              strokeOpacity={isActive ? 1 : 0.7}
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
            />
            <g
              clipPath={`url(#clip-${region.id})`}
              opacity={visible ? (isActive ? 0.9 : 0.55) : 0}
              style={{ transition: "opacity 350ms cubic-bezier(0.16,1,0.3,1)" }}
              className="pointer-events-none"
            >
              {region.sulci.map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={region.hex}
                  strokeWidth={1}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: visible ? 1 : 0 }}
                  transition={{
                    duration: 1.5,
                    delay: index * 0.2 + i * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              ))}
            </g>
          </g>
        );
      })}
    </svg>
  );
}
