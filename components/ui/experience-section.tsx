"use client";

import { motion } from "framer-motion";

const EXPERIENCE = [
  {
    company: "Canva",
    role: "Senior Program Manager — Premium Apps",
    dates: "2025 — Present",
    location: "Sydney, AU",
    bullets: [
      "Owns Canva's Premium Apps product — monetisation for third-party developers",
      "SQL analytics for app performance, conversion & revenue",
      "Commercial negotiations with third-party providers",
      "Partners across Engineering, Product & Design",
    ],
  },
  {
    company: "Pinterest",
    role: "Sr. Program Manager — SMB Sales",
    dates: "2023 — 2025",
    location: "Sydney, AU",
    bullets: [
      "Managed $30M annual SMB sales team, exceeded quota 3x consecutive quarters",
      "Drove seasonal GTM strategies for global SMB teams",
      "Built internal AI tool to automate advertiser comms → +10% reply rate",
      "Onsite go-live support: Japan & US",
    ],
  },
  {
    company: "Accenture",
    role: "Management Consultant — Business Operations",
    dates: "2021 — 2023",
    location: "Sydney, AU",
    bullets: [
      "Business transformation for large tech firms",
      "Managed KYC remediation for major Australian bank (500k+ customer records)",
    ],
  },
  {
    company: "Gartner",
    role: "Business Development Associate — Financial Services",
    dates: "2021",
    location: "Sydney, AU",
    bullets: [
      "Cold outreach to C-level finance executives",
      "Designed CRM tool for associate team",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-32">
      <motion.h2
        className="font-display text-3xl text-foreground mb-20"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Experience
      </motion.h2>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-0 top-1 bottom-1 w-px bg-border" />

        <div className="flex flex-col gap-14">
          {EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.company}
              className="relative pl-8"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              {/* Dot */}
              <span className="absolute left-[-4px] top-[6px] w-2 h-2 rounded-full bg-accent" />

              {/* Meta */}
              <div className="flex items-center gap-3 mb-1">
                <span className="font-annotation text-[11px] uppercase tracking-widest text-muted-foreground">
                  {job.dates}
                </span>
                <span className="font-annotation text-[11px] text-muted-foreground/50">
                  · {job.location}
                </span>
              </div>

              {/* Company */}
              <h3 className="font-display text-2xl text-foreground leading-tight">
                {job.company}
              </h3>

              {/* Role */}
              <p className="font-annotation text-[12px] text-muted-foreground mt-0.5 mb-3">
                {job.role}
              </p>

              {/* Bullets */}
              <ul className="flex flex-col gap-2">
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 font-body text-sm text-foreground/70 leading-relaxed"
                  >
                    <span className="mt-[7px] w-1 h-1 rounded-full bg-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
