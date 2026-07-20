"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const ref = useRef<HTMLElement>(null);
  // On the homepage this component never renders the footer element below, so
  // `ref` would never attach — omit it as a scroll target in that case.
  const { scrollYProgress } = useScroll(isHome ? {} : { target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  // The homepage's FooterCTA already ends in an equivalent copyright/email row.
  if (isHome) return null;

  return (
    <footer ref={ref} className="mt-auto border-t border-border">
      <motion.div
        style={{ y }}
        className="mx-auto flex max-w-[1080px] flex-col items-center justify-between gap-3 px-5 py-8 text-[12px] text-tertiary md:flex-row md:px-12"
      >
        <span data-cursor="text">&copy; 2026 Ayanna Varma</span>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=av15@williams.edu"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          className="transition-colors duration-300 hover:text-foreground"
        >
          av15@williams.edu
        </a>
      </motion.div>
    </footer>
  );
}
