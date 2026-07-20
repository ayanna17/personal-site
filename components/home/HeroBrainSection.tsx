"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";
import BrainSVG from "@/components/brain/BrainSVG";
import InfoPanel from "@/components/brain/InfoPanel";
import { regions, type RegionId } from "@/components/brain/brainPaths";

const HeroParticles = dynamic(() => import("./HeroParticles"), {
  ssr: false,
});

const HEADLINE = "hi, i'm ayanna.";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ayanna.varma/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com/Ayanna576206",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayanna-varma",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="7.5" y1="10" x2="7.5" y2="16.5" strokeLinecap="round" />
        <circle cx="7.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
        <path d="M11.5 16.5v-4c0-1.4 1-2.5 2.5-2.5s2.5 1.1 2.5 2.5v4" strokeLinecap="round" />
        <line x1="11.5" y1="10.2" x2="11.5" y2="16.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=av15@williams.edu",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function useTypewriter(text: string, delay: number, enabled: boolean) {
  const [count, setCount] = useState(enabled ? 0 : text.length);

  useEffect(() => {
    if (!enabled) return;
    if (count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(id);
  }, [count, delay, enabled, text.length]);

  return { rendered: text.slice(0, count), done: count >= text.length };
}

export default function HeroBrainSection() {
  const reducedMotion = useReducedMotion();
  const particlesEnabled = useMediaQuery("(min-width: 768px)");
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { rendered, done } = useTypewriter(HEADLINE, 60, !reducedMotion);

  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);
  const [lockedRegion, setLockedRegion] = useState<RegionId | null>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const brainAreaRef = useRef<HTMLDivElement>(null);

  const activeId = lockedRegion ?? hoveredRegion;
  const activeRegion = regions.find((r) => r.id === activeId) ?? null;

  const [prevActiveId, setPrevActiveId] = useState(activeId);
  if (activeId !== prevActiveId) {
    setPrevActiveId(activeId);
    if (activeId) setHintVisible(false);
  }

  useEffect(() => {
    if (!lockedRegion) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!brainAreaRef.current?.contains(e.target as Node)) {
        setLockedRegion(null);
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [lockedRegion]);

  return (
    <section
      id="brain"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 py-28 md:flex-row md:items-center md:gap-10 md:px-12 md:py-0"
    >
      {particlesEnabled && (
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <HeroParticles />
        </div>
      )}

      <span
        data-cursor="text"
        className="absolute left-5 top-24 z-10 font-sans md:left-12"
        style={{ fontSize: 12, color: "#A8A29E", letterSpacing: "0.04em" }}
      >
        Williamstown &middot; New York &middot; San Francisco
      </span>

      <div className="relative z-10 mx-auto flex w-full max-w-[1080px] flex-col md:flex-row md:items-center md:gap-10">
        {/* Left column: intro */}
        <div className="flex w-full flex-col items-start text-left md:w-[40%]">
          <h1
            data-cursor="text"
            className="font-serif-display text-[48px] leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[56px] lg:text-[64px]"
          >
            {rendered}
            <span
              aria-hidden
              className={`ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.05em] bg-foreground align-middle ${
                done ? "animate-cursor-blink" : "opacity-100"
              }`}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="text"
            className="mt-4 font-sans text-[16px] font-light text-secondary"
          >
            20 yr old
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="text"
            className="mt-2 font-sans text-[14px] text-secondary sm:text-[15px]"
          >
            builder &middot; student &middot; athlete &middot; writer
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex items-center gap-3"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                data-cursor="link"
                className="group flex h-8 w-8 items-center justify-center rounded-full border border-foreground/30 text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground"
              >
                <span className="h-[15px] w-[15px] transition-colors duration-300 group-hover:text-background">
                  {s.icon}
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right column: brain */}
        <div
          ref={brainAreaRef}
          className="relative mt-14 w-full md:mt-0 md:w-[60%]"
        >
          <div className="relative">
            <BrainSVG
              activeRegion={activeId}
              onHover={(id) => setHoveredRegion(id)}
              onSelect={(id) => setLockedRegion((cur) => (cur === id ? null : id))}
              className="mx-auto h-auto w-full max-h-[60vh] max-w-[640px] md:mx-0 md:max-h-[72vh]"
            />

            <motion.p
              animate={{ opacity: hintVisible ? 1 : 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="text"
              className="pointer-events-none absolute right-1 top-0 font-sans text-[12px] font-light text-tertiary sm:right-3"
            >
              {isMobile ? "tap to explore" : "hover to explore"}
            </motion.p>

            <div className="pointer-events-none relative mt-6 md:absolute md:top-1/2 md:right-0 md:mt-0 md:w-[368px] md:-translate-y-1/2">
              <InfoPanel region={activeRegion} locked={Boolean(lockedRegion)} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
