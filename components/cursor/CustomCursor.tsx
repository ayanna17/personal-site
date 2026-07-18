"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/useMediaQuery";

type Variant = "default" | "link" | "text" | "region";

export default function CustomCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [variant, setVariant] = useState<Variant>("default");
  const [regionColor, setRegionColor] = useState<string | null>(null);

  const reducedMotionRef = useRef(reducedMotion);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const squish = useRef(1);
  const clickScale = useRef(1);
  const clickStart = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const rafId = useRef<number | undefined>(undefined);
  const primed = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const resolveVariant = (el: Element | null) => {
      const match = el?.closest("[data-cursor]") as HTMLElement | null;
      if (!match) return { variant: "default" as Variant, color: null as string | null };
      const v = (match.dataset.cursor as Variant) || "default";
      return { variant: v, color: match.dataset.cursorColor ?? null };
    };

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!primed.current) {
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        primed.current = true;
      }
    };

    const onOver = (e: MouseEvent) => {
      const { variant: v, color } = resolveVariant(e.target as Element);
      setVariant(v);
      setRegionColor(color);
    };

    const onDown = () => {
      clickStart.current = performance.now();
    };

    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;
      if (reducedMotionRef.current) return;
      if (delta > 0) squish.current = 0.85;
      else if (delta < 0) squish.current = 1.15;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const loop = () => {
      const lerpFactor = reducedMotionRef.current ? 1 : 0.15;
      pos.current.x += (target.current.x - pos.current.x) * lerpFactor;
      pos.current.y += (target.current.y - pos.current.y) * lerpFactor;

      squish.current += (1 - squish.current) * 0.12;

      if (clickStart.current !== null) {
        const t = performance.now() - clickStart.current;
        if (t < 200) {
          const p = t / 200;
          clickScale.current = p < 0.5 ? 1 - p * 0.6 : 0.7 + (p - 0.5) * 0.6;
        } else {
          clickScale.current = 1;
          clickStart.current = null;
        }
      }

      const el = wrapperRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%) scaleY(${squish.current}) scale(${clickScale.current})`;
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  const isText = variant === "text";
  const isRegion = variant === "region";
  const isLink = variant === "link";

  const size = isText ? 2 : isRegion ? 56 : isLink ? 48 : 10;
  const height = isText ? 24 : size;

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform"
      style={{ mixBlendMode: isLink ? "difference" : "normal" }}
    >
      <div
        className={`cursor-ring rounded-full ${isRegion ? "animate-cursor-pulse" : ""}`}
        style={{
          width: size,
          height,
          borderRadius: isText ? 2 : 999,
          borderWidth: isRegion ? 1.5 : isLink ? 1 : 1.5,
          borderStyle: "solid",
          borderColor: isRegion && regionColor ? regionColor : "var(--foreground)",
          backgroundColor: isRegion && regionColor ? `${regionColor}26` : "transparent",
        }}
      />
      {variant === "default" && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
          style={{ width: 3, height: 3 }}
        />
      )}
    </div>
  );
}
