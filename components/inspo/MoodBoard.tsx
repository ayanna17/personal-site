"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

const TRAIL_SPAWN_DISTANCE = 100;
const TRAIL_MAX_ITEMS = 8;
const TRAIL_MAX_WIDTH = 280;
const TRAIL_MAX_HEIGHT = 350;
const TRAIL_LIFETIME_MS = 2400;

type TrailItem = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  src: string;
};

export default function MoodBoard({ images }: { images: string[] }) {
  const isDesktop = useMediaQuery("(min-width: 769px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [dismissed, setDismissed] = useState(false);

  const lastSpawn = useRef({ x: 0, y: 0 });
  const primed = useRef(false);
  const imageIdx = useRef(0);
  const idCounter = useRef(0);

  useEffect(() => {
    if (!isDesktop) return;

    const onMove = (e: MouseEvent) => {
      setDismissed(true);
      if (reducedMotion || images.length === 0) return;

      const { clientX: x, clientY: y } = e;

      if (!primed.current) {
        lastSpawn.current = { x, y };
        primed.current = true;
        return;
      }

      const dx = x - lastSpawn.current.x;
      const dy = y - lastSpawn.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < TRAIL_SPAWN_DISTANCE) return;

      lastSpawn.current = { x, y };
      const id = idCounter.current++;
      const src = images[imageIdx.current % images.length];
      imageIdx.current += 1;
      const rotate = Math.random() * 16 - 8;

      setTrail((prev) => {
        const next = [...prev, { id, x, y, rotate, src }];
        return next.length > TRAIL_MAX_ITEMS ? next.slice(next.length - TRAIL_MAX_ITEMS) : next;
      });

      window.setTimeout(() => {
        setTrail((prev) => prev.filter((item) => item.id !== id));
      }, TRAIL_LIFETIME_MS);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop, reducedMotion, images.length]);

  if (!isDesktop) {
    return (
      <div className="min-h-screen bg-background px-4 pt-28 pb-16">
        <h1 className="mb-6 text-center font-serif-display italic text-[28px] text-foreground">
          inspo
        </h1>
        <div className="grid grid-cols-2 gap-2">
          {images.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              width={0}
              height={0}
              sizes="50vw"
              className="h-auto w-full rounded-md"
              style={{ width: "100%", height: "auto" }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      <motion.p
        aria-hidden={dismissed}
        initial={{ opacity: 1 }}
        animate={{ opacity: dismissed ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center text-center font-serif-display italic text-[20px] text-tertiary"
      >
        hover to explore
      </motion.p>

      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
        <AnimatePresence>
          {trail.map((item) => (
            <motion.img
              key={item.id}
              src={item.src}
              alt=""
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.8 }}
              style={{
                position: "fixed",
                left: item.x,
                top: item.y,
                translateX: "-50%",
                translateY: "-50%",
                rotate: item.rotate,
                maxWidth: TRAIL_MAX_WIDTH,
                maxHeight: TRAIL_MAX_HEIGHT,
                width: "auto",
                height: "auto",
              }}
              className="rounded-lg shadow-[0_16px_32px_-10px_rgba(28,25,23,0.4)]"
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
