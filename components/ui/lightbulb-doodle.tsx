"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const HATCH_LINES = Array.from({ length: 14 }, (_, i) => ({
  x1: -40 + i * 10,
  y1: 10,
  x2: -40 + i * 10 + 64,
  y2: 74,
}));

export function LightbulbDoodle() {
  return (
    <div className="relative w-[120px] h-[120px] rotate-12">
      {/* Yellow hatch — rendered behind the image */}
      <svg
        className="absolute inset-0 pointer-events-none"
        viewBox="0 0 120 120"
      >
        <defs>
          <clipPath id="bulb-glass">
            <ellipse cx="60" cy="42" rx="33" ry="33" />
          </clipPath>
        </defs>
        <g clipPath="url(#bulb-glass)">
          {HATCH_LINES.map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#F59E0B"
              strokeWidth="7"
              strokeLinecap="round"
              strokeOpacity={0.75}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.25, delay: 1 + i * 0.055, ease: "easeOut" },
                opacity:    { duration: 0.05, delay: 1 + i * 0.055 },
              }}
            />
          ))}
        </g>
      </svg>
      {/* Outline on top */}
      <Image
        src="/lightbulb.webp"
        alt="lightbulb doodle"
        fill
        className="object-contain dark:invert"
      />
    </div>
  );
}
