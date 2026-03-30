"use client";

import { motion, useMotionValue, useMotionTemplate, useAnimationFrame } from "framer-motion";
import { useEffect } from "react";

const GridPattern = ({ offsetX, offsetY }: { offsetX: any; offsetY: any }) => (
  <svg className="w-full h-full">
    <defs>
      <motion.pattern
        id="page-grid-pattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x={offsetX}
        y={offsetY}
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-muted-foreground"
        />
      </motion.pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#page-grid-pattern)" />
  </svg>
);

export function PageGridBackground() {
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  useEffect(() => {
    const handler = (e: Event) => {
      const { x, y } = (e as CustomEvent).detail;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("page-mouse-move", handler);
    return () => window.removeEventListener("page-mouse-move", handler);
  }, [mouseX, mouseY]);

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40);
  });

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Faint base grid — always visible */}
      <div className="absolute inset-0 opacity-[0.04]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      {/* Mobile: full grid at moderate opacity */}
      <div className="absolute inset-0 opacity-[0.15] md:hidden">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      {/* Desktop: cursor-revealed grid */}
      <motion.div
        className="absolute inset-0 opacity-40 hidden md:block"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>
    </div>
  );
}
