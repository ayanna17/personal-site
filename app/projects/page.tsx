"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectsPage() {
  return (
    <section className="min-h-screen px-5 pb-24 pt-32 md:px-12 md:pt-40">
      <div className="mx-auto max-w-[1080px]">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard
              title="Rally for Tennis"
              role="Co-Founder"
              years="2021–2025"
              href="https://newjersey.news12.com/greater-newark-tennis-and-education-3rd-annual-rally-for-tennis-fundraiser-event"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] bg-[#eae7e2] p-8 sm:p-10 md:p-12">
                <div className="relative h-full w-full">
                  <div className="absolute left-0 top-[4%] w-[76%] overflow-hidden rounded-xl shadow-[0_18px_36px_-14px_rgba(28,25,23,0.28)]">
                    <Image
                      src="/images/rft1.png"
                      alt="Rally for Tennis product screenshot"
                      width={2936}
                      height={1596}
                      className="h-auto w-full"
                    />
                  </div>
                  <div className="absolute bottom-[4%] right-0 w-[76%] overflow-hidden rounded-xl shadow-[0_22px_44px_-12px_rgba(28,25,23,0.35)]">
                    <Image
                      src="/images/rft2.png"
                      alt="Rally for Tennis product screenshot"
                      width={2934}
                      height={1660}
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </ProjectCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard
              title="EphStart & Williams Investor Network"
              role="Co-Founder"
              years="2025–Present"
              href="https://hub.williams.edu/career-center/ephstart/"
            >
              <div className="relative aspect-[16/11] overflow-hidden rounded-[32px] bg-[#eae7e2] p-8 sm:p-10 md:p-12">
                <div
                  className="grid h-full w-full gap-[3px]"
                  style={{
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gridTemplateRows: "1.3fr 0.85fr 1fr",
                    gridTemplateAreas: `"a a b b" "c d e e" "f f g g"`,
                  }}
                >
                  <div className="relative overflow-hidden rounded-[4px]" style={{ gridArea: "a" }}>
                    <Image
                      src="/images/eph1.jpg"
                      alt="EphStart photo"
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[4px]" style={{ gridArea: "b" }}>
                    <Image
                      src="/images/eph3.jpg"
                      alt="EphStart photo"
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[4px]" style={{ gridArea: "c" }}>
                    <Image
                      src="/images/eph-presenting.jpg"
                      alt="EphStart presenting"
                      fill
                      sizes="(min-width: 640px) 12vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[4px]" style={{ gridArea: "d" }}>
                    <Image
                      src="/images/eph-group.JPG"
                      alt="EphStart group photo"
                      fill
                      sizes="(min-width: 640px) 12vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[4px]" style={{ gridArea: "e" }}>
                    <Image
                      src="/images/eph-event.JPG"
                      alt="EphStart event"
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[4px]" style={{ gridArea: "f" }}>
                    <Image
                      src="/images/eph4.JPG"
                      alt="EphStart photo"
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-[4px]" style={{ gridArea: "g" }}>
                    <Image
                      src="/images/eph.jpg"
                      alt="EphStart photo"
                      fill
                      sizes="(min-width: 640px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </ProjectCard>
          </motion.div>
        </div>

        <p className="mt-16 text-center text-[13px] text-tertiary">
          more projects loading
          <span
            aria-hidden
            className="ml-1 inline-block h-[0.85em] w-[2px] animate-cursor-blink bg-tertiary align-middle"
          />
        </p>
      </div>
    </section>
  );
}
