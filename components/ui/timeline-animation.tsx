"use client";

import { motion, useInView, Variants } from "framer-motion";
import { ElementType, RefObject, useRef } from "react";

interface TimelineContentProps {
  as?: ElementType;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | HTMLDivElement | null>;
  customVariants: Variants;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

export function TimelineContent({
  as: Tag = "div",
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
  onClick,
}: TimelineContentProps) {
  const isInView = useInView(timelineRef as RefObject<Element>, {
    once: true,
    margin: "-10% 0px",
  });

  const MotionTag = motion.create(Tag as keyof HTMLElementTagNameMap);

  return (
    <MotionTag
      className={className}
      custom={animationNum}
      variants={customVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onClick={onClick}
    >
      {children}
    </MotionTag>
  );
}
