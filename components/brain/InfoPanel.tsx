"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { RegionInfo } from "./brainPaths";

interface InfoPanelProps {
  region: RegionInfo | null;
  locked: boolean;
}

export default function InfoPanel({ region, locked }: InfoPanelProps) {
  return (
    <div className="relative w-full md:w-[340px] md:shrink-0">
      <AnimatePresence mode="wait">
        {region ? (
          <motion.div
            key={region.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="rounded-xl border border-border bg-white/70 p-6 shadow-[0_4px_24px_rgba(28,25,23,0.06)]"
            style={{ borderTop: `3px solid ${region.hex}` }}
          >
            <span
              className="text-[11px] font-bold uppercase tracking-[0.04em]"
              style={{ color: region.hex }}
            >
              {region.label}
            </span>
            <p className="mt-2 font-sans text-[13px] italic text-secondary">
              {region.anatomicalFunction}
            </p>
            <ul className="mt-5 flex flex-col gap-4">
              {region.items.map((item) => (
                <li key={item.name}>
                  <p className="text-[14px] font-semibold text-foreground">{item.name}</p>
                  <p className="mt-0.5 text-[13px] text-secondary">{item.description}</p>
                </li>
              ))}
            </ul>
            {locked && (
              <p className="mt-5 text-[11px] font-light text-tertiary">
                click elsewhere to dismiss
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full min-h-[220px] items-center justify-center rounded-xl border border-dashed border-border px-6 text-center md:justify-start md:text-left"
          >
            <p data-cursor="text" className="text-[13px] font-light text-tertiary">
              ← hover over a region to explore
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
