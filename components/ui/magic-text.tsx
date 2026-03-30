"use client"

import * as React from "react"
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

export interface MagicTextProps {
  text: string;
}

interface WordProps {
  children: string;
  progress: any;
  range: number[];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mt-[12px] mr-1 text-3xl font-semibold">
      <span className="absolute opacity-20 md:block hidden">{children}</span>
      <motion.span className="hidden md:inline" style={{ opacity }}>{children}</motion.span>
      <span className="md:hidden">{children}</span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const container = useRef<HTMLParagraphElement>(null);
  const progress = useMotionValue(0);

  useEffect(() => {
    let raf: number;

    const update = () => {
      const el = container.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress 0: element top at viewport bottom
        // progress 1: element center at viewport center
        const start = vh;
        const end = vh / 2 - rect.height / 2;
        const raw = (start - rect.top) / (start - end);
        progress.set(Math.max(0, Math.min(1, raw)));
      }
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [progress]);

  const words = text.split(" ");

  return (
    <p ref={container} className="flex flex-wrap leading-[0.5] p-4">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={progress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};
