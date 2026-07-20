"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Paper {
  title: string;
  description: string;
  meta: string;
  file: string;
}

// Chronological, newest first.
const PAPERS: Paper[] = [
  {
    title: "Balancing Security and Liberty in the Reauthorization of Section 702 FISA",
    description:
      "How America's most powerful surveillance tool walks the line between national security and constitutional rights",
    meta: "Spring 2026 · 12 min read",
    file: "/papers/Balancing Security and Liberty in the Reauthorization of Section 702 FISA.pdf",
  },
  {
    title: "Reversing Course on Semiconductor Export Controls Was a Strategic Mistake",
    description: "Why reversing course on chip export restrictions undermines national interest",
    meta: "Spring 2026 · 15 min read",
    file: "/papers/Reversing Course on Semiconductor Export Controls Was a Strategic Mistake.pdf",
  },
  {
    title:
      "The Blitzkrieg That Never Came: Explaining Russia's Failure and Its Implications for Cyber Warfighting",
    description:
      "Why Russia's cyber operations in Ukraine fell short of expectations and what it reveals about digital warfare",
    meta: "Winter 2025 · 8 min read",
    file: "/papers/The Blitzkrieg That Never Came - Russia and Cyber Warfighting.pdf",
  },
  {
    title:
      "The \"Big Tech\" Governance Dilemma: Lessons from OpenAI's Struggle to Balance Innovation and Accountability",
    description: "Navigating regulation, innovation, and power in the platform economy",
    meta: "Fall 2025 · 20 min read",
    file: "/papers/The Big Tech Governance Dilemma - Lessons from OpenAI.pdf",
  },
  {
    title: "Central Bank Digital Currencies: A Trillion Dollar Opportunity",
    description:
      "How effective are retail central bank digital currencies in promoting wealth distribution and economic growth when compared to the standard reserve currency?",
    meta: "Fall 2025 · 16 min read",
    file: "/papers/Central Bank Digital Currencies - A Trillion Dollar Opportunity.pdf",
  },
];

const CHAR_DELAY = 38;
const TITLE_CHAR_DELAY = 14;
const TOP_COMMAND = "ls -la papers/";
const BOTTOM_COMMAND = "cat next-paper.pdf";
const ROW_STAGGER = 0.1;
const ROW_FADE_DURATION = 0.4;

// The bottom prompt should wait for the slowest-typing title to finish, not
// just the row fade-ins, since titles can take longer than the fade.
const ROWS_COMPLETE_MS =
  Math.max(
    ...PAPERS.map((p, i) => i * ROW_STAGGER * 1000 + p.title.length * TITLE_CHAR_DELAY)
  ) + 300;

function useTypewriter(text: string, enabled: boolean, charDelay: number = CHAR_DELAY) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled || count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), charDelay);
    return () => clearTimeout(id);
  }, [enabled, count, text.length, charDelay]);

  return { rendered: text.slice(0, count), done: count >= text.length };
}

function TitleTypewriter({
  text,
  start,
  delaySeconds,
}: {
  text: string;
  start: boolean;
  delaySeconds: number;
}) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!start) return;
    const id = setTimeout(() => setEnabled(true), delaySeconds * 1000);
    return () => clearTimeout(id);
  }, [start, delaySeconds]);

  const { rendered, done } = useTypewriter(text, enabled, TITLE_CHAR_DELAY);

  return (
    <>
      {rendered}
      {enabled && !done && (
        <span
          aria-hidden
          className="ml-[1px] inline-block h-[0.85em] w-[2px] animate-cursor-blink bg-foreground align-middle"
        />
      )}
    </>
  );
}

export default function TerminalPapers() {
  const topCommand = useTypewriter(TOP_COMMAND, true);
  const [rowsVisible, setRowsVisible] = useState(false);
  const [bottomEnabled, setBottomEnabled] = useState(false);
  const bottomCommand = useTypewriter(BOTTOM_COMMAND, bottomEnabled);

  // Each phase is triggered by the actual completion of the previous one,
  // rather than an absolute delay from mount, so the sequence stays correct
  // regardless of hydration timing.
  useEffect(() => {
    if (!topCommand.done) return;
    const id = setTimeout(() => setRowsVisible(true), 200);
    return () => clearTimeout(id);
  }, [topCommand.done]);

  useEffect(() => {
    if (!rowsVisible) return;
    const id = setTimeout(() => setBottomEnabled(true), ROWS_COMPLETE_MS);
    return () => clearTimeout(id);
  }, [rowsVisible]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden rounded-xl border border-border bg-white shadow-[0_4px_24px_rgba(28,25,23,0.06)]"
    >
      {/* Title bar */}
      <div className="flex items-center gap-5 border-b border-border bg-[#EFECE8] px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: "#EC4899" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#10B981" }} />
          <span className="h-3 w-3 rounded-full" style={{ background: "#8B5CF6" }} />
        </div>
        <span className="font-mono text-[12px] text-secondary">ayanna@brain: ~/writing</span>
      </div>

      <div className="p-10">
        {/* ls prompt */}
        <div className="font-mono text-[13px]">
          <span style={{ color: "#10B981" }}>ayanna</span>
          <span className="text-secondary">@brain ~ $ </span>
          <span className="text-foreground">{topCommand.rendered}</span>
          {!topCommand.done && (
            <span
              aria-hidden
              className="ml-[1px] inline-block h-[13px] w-[7px] animate-cursor-blink bg-foreground align-middle"
            />
          )}
        </div>

        {/* Papers */}
        <div className="mt-6">
          {PAPERS.map((paper, i) => (
            <motion.a
              key={paper.title}
              href={encodeURI(paper.file)}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              initial={{ opacity: 0, y: 10 }}
              animate={rowsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{
                duration: ROW_FADE_DURATION,
                delay: rowsVisible ? i * ROW_STAGGER : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group block border-b border-border py-5 first:pt-0 last:border-b-0 last:pb-0"
            >
              <div className="flex items-baseline justify-between gap-4">
                <p
                  className="text-[15px] font-medium text-foreground transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:text-[#8B5CF6]"
                  style={{ willChange: "transform" }}
                >
                  <TitleTypewriter text={paper.title} start={rowsVisible} delaySeconds={i * ROW_STAGGER} />
                </p>
                <div className="flex shrink-0 items-baseline gap-3">
                  <span className="whitespace-nowrap text-[12px] text-tertiary">
                    {paper.meta}
                  </span>
                  <span className="text-[13px] text-tertiary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    &#8599;
                  </span>
                </div>
              </div>
              <p className="mt-1.5 text-[13px] italic text-secondary">{paper.description}</p>
            </motion.a>
          ))}
        </div>

        {/* Bottom prompt with blinking cursor */}
        <div className="mt-6 font-mono text-[13px]">
          <span style={{ color: "#10B981" }}>ayanna</span>
          <span className="text-secondary">@brain ~ $ </span>
          <span className="text-tertiary">{bottomCommand.rendered}</span>
          <span
            aria-hidden
            className="ml-[1px] inline-block h-[13px] w-[7px] animate-cursor-blink bg-foreground align-middle"
          />
        </div>
      </div>
    </motion.div>
  );
}
