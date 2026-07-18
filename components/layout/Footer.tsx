"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return (
    <footer ref={ref} className="mt-auto border-t border-border">
      <motion.div
        style={{ y }}
        className="mx-auto flex max-w-[1080px] flex-col items-center justify-between gap-3 px-5 py-8 text-[12px] text-tertiary md:flex-row md:px-12"
      >
        <span data-cursor="text">&copy; 2026 Ayanna Varma</span>
        <a
          href="mailto:av15@williams.edu"
          data-cursor="link"
          className="transition-colors duration-300 hover:text-foreground"
        >
          av15@williams.edu
        </a>
      </motion.div>
    </footer>
  );
}
