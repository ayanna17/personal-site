"use client";

import { motion } from "framer-motion";

const SKILLS = [
  "product strategy",
  "AI policy & governance",
  "community building",
  "economics & investing",
  "content & storytelling",
  "startup operations",
];

export default function SkillsSection() {
  return (
    <section className="mx-auto max-w-[1080px] px-5 pb-[120px] md:px-12 md:pb-[160px]">
      <div className="border-t border-border pt-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="text"
          className="text-[10px] font-bold uppercase tracking-[0.04em] text-tertiary"
        >
          operating across
        </motion.p>

        <ul className="mt-6">
          {SKILLS.map((skill, i) => (
            <motion.li
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="text"
              className="group border-b border-border py-4"
            >
              <span className="font-sans text-[15px] text-secondary transition-colors duration-300 group-hover:text-foreground">
                {skill}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
