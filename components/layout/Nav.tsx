"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { href: "/writing", label: "writing" },
  { href: "/projects", label: "projects" },
  { href: "/inspo", label: "inspo" },
  { href: "/Varma%2C%20Ayanna%202026.pdf", label: "resume", external: true },
];

export default function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const lastY = useRef(0);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY.current) > 4) {
        setHidden(y > lastY.current && y > 80);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-12">
        <Link
          href="/"
          data-cursor="link"
          className="font-sans text-[15px] font-semibold tracking-[-0.02em] text-foreground transition-colors duration-300"
        >
          ayanna varma
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="text-[13px] tracking-[0.02em] text-secondary transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="link"
                className={`text-[13px] tracking-[0.02em] transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-foreground"
                    : "text-secondary hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          data-cursor="link"
          onClick={() => setOpen((v) => !v)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
            className="h-[1.5px] w-5 bg-foreground"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="h-[1.5px] w-5 bg-foreground"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
            className="h-[1.5px] w-5 bg-foreground"
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-b border-border/70 bg-background/95 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="py-2 text-[15px] text-secondary transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-cursor="link"
                    className={`py-2 text-[15px] transition-colors duration-300 ${
                      pathname === link.href ? "text-foreground" : "text-secondary"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
