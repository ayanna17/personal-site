import type { ReactNode } from "react";

type ProjectCardProps = {
  title: string;
  role: string;
  years: string;
  href: string;
  children: ReactNode;
};

export default function ProjectCard({ title, role, years, href, children }: ProjectCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="link"
      className="block transition-transform duration-300 ease-out hover:-translate-y-1"
    >
      {children}

      <div className="mt-5 flex items-baseline justify-between px-1">
        <p className="text-[15px] text-foreground">
          <span className="font-medium">{title}</span>
          <span className="mx-1.5 text-secondary">·</span>
          <span className="font-light text-secondary">{role}</span>
        </p>
        <p className="whitespace-nowrap pl-4 text-[14px] font-light text-secondary">{years}</p>
      </div>
    </a>
  );
}
