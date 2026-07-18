"use client";

import { motion } from "framer-motion";

export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        data-cursor="text"
        className="text-[32px] font-semibold tracking-[-0.02em] text-foreground"
      >
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        data-cursor="text"
        className="mt-3 text-[14px] font-light text-tertiary"
      >
        coming soon
      </motion.p>
    </section>
  );
}
