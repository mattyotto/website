"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { type TimeLine_01Entry } from "@/components/ui/release-time-line";

export default function ProjectCarousel({ title, description, entries }: {
  title: string;
  description: string;
  entries: TimeLine_01Entry[];
}) {
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto max-w-3xl mb-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
          <p className="text-base text-muted-foreground md:text-lg">{description}</p>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            ref={containerRef}
            className="flex gap-6 cursor-grab active:cursor-grabbing select-none"
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.1}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            style={{ width: "max-content" }}
          >
            {entries.map((entry, i) => {
              const Icon = entry.icon;
              return (
                <motion.div
                  key={i}
                  className="w-[480px] shrink-0 rounded-2xl border border-border bg-card overflow-hidden"
                  whileHover={{ y: dragging ? 0 : -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {entry.image && (
                    <div className="h-52 overflow-hidden">
                      <img
                        src={entry.image}
                        alt={entry.title}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{entry.title}</p>
                        <p className="text-xs text-muted-foreground">{entry.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{entry.description}</p>
                    {entry.items && (
                      <ul className="space-y-1.5">
                        {entry.items.map((item, j) => (
                          <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="mt-0.5 shrink-0 text-zinc-400">·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                    {entry.button && (
                      <a
                        href={entry.button.url}
                        className="inline-block mt-4 text-sm font-medium text-foreground underline underline-offset-4"
                        onClick={(e) => dragging && e.preventDefault()}
                      >
                        {entry.button.text}
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">← drag to explore →</p>
      </div>
    </section>
  );
}
