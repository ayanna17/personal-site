"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

const HeroParticles = dynamic(() => import("./HeroParticles"), {
  ssr: false,
});

const HEADLINE = "hi, i'm ayanna.";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
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
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
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
    href: "mailto:av15@williams.edu",
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

export default function Hero() {
  const reducedMotion = useReducedMotion();
  const particlesEnabled = useMediaQuery("(min-width: 768px)");
  const { rendered, done } = useTypewriter(HEADLINE, 60, !reducedMotion);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5">
      {particlesEnabled && (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <HeroParticles />
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center text-center">
        <h1
          data-cursor="text"
          className="font-serif-display text-[56px] leading-[1.05] tracking-[-0.02em] text-foreground sm:text-[64px]"
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
          builder &middot; writer &middot; athlete &middot; student &middot;
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

        <motion.a
          href="#brain"
          data-cursor="link"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{
            opacity: { delay: 1.6, duration: 0.5 },
            y: { delay: 2.1, duration: 1.8, repeat: Infinity, ease: "easeInOut" },
          }}
          className="mt-16 font-sans text-[13px] font-light text-tertiary transition-colors duration-300 hover:text-secondary"
        >
          explore my brain ↓
        </motion.a>
      </div>
    </section>
  );
}
