"use client";

import { motion } from "framer-motion";

export default function ResumePage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        data-cursor="text"
        className="text-[32px] font-semibold tracking-[-0.02em] text-foreground"
      >
        resume
      </motion.h1>
      <motion.a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="link"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-5 rounded-full border border-foreground/30 px-5 py-2 text-[13px] text-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background"
      >
        view resume (PDF)
      </motion.a>
    </section>
  );
}
