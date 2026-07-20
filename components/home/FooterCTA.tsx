"use client";

import { motion } from "framer-motion";

export default function FooterCTA() {
  return (
    <section className="w-full">
      <div className="px-12 pt-16 pb-12 text-left">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="text"
          className="font-serif-display italic text-[38px] leading-tight text-foreground"
        >
          I&apos;d love to hear from you.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="text"
          className="mt-3 font-sans text-[15px]"
          style={{ color: "#78716C" }}
        >
          Always looking to chat with interesting people.
        </motion.p>

        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=av15@williams.edu"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 inline-flex items-center gap-2 font-sans text-[15px] font-medium transition-opacity duration-300 hover:opacity-85"
          style={{
            backgroundColor: "#1C1917",
            color: "#F8F7F4",
            borderRadius: 100,
            padding: "14px 32px",
          }}
        >
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Get in touch
        </motion.a>
      </div>

      <div
        className="flex items-center justify-between border-t px-12 py-6 font-sans text-[12px]"
        style={{ borderColor: "#E7E5E4", color: "#A8A29E" }}
      >
        <span>&copy; 2026</span>
        <span>av15@williams.edu</span>
      </div>
    </section>
  );
}
