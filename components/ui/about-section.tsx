"use client";

import { TimelineContent } from "@/components/ui/timeline-animation";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

export default function AboutSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 1.5,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };

  const textVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  return (
    <section className="py-32 px-4 bg-background min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto w-full" ref={heroRef}>
        <TimelineContent
          as="p"
          animationNum={0}
          timelineRef={heroRef}
          customVariants={textVariants}
          className="font-annotation text-xs uppercase tracking-widest text-muted-foreground mb-8"
        >
          About
        </TimelineContent>

        <TimelineContent
          as="h2"
          animationNum={0}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="text-3xl md:text-5xl font-display leading-[110%] text-foreground mb-8"
        >
          I&apos;m a{" "}
          <TimelineContent
            as="span"
            animationNum={1}
            timelineRef={heroRef}
            customVariants={textVariants}
            className="text-amber-600 dark:text-amber-400 border-b-2 border-dotted border-amber-500"
          >
            builder
          </TimelineContent>{" "}
          who bridges product, data, and delivery. I care about shipping things that{" "}
          <TimelineContent
            as="span"
            animationNum={2}
            timelineRef={heroRef}
            customVariants={textVariants}
            className="text-foreground border-b-2 border-dotted border-foreground/40"
          >
            actually work
          </TimelineContent>{" "}
          — for the business and for the people using them.
        </TimelineContent>

        <div className="mt-16 flex flex-col sm:flex-row gap-8 justify-between items-start">
          <TimelineContent
            as="div"
            animationNum={4}
            timelineRef={heroRef}
            customVariants={textVariants}
            className="space-y-1"
          >
            <div className="font-annotation text-xs uppercase tracking-widest text-muted-foreground">
              Currently
            </div>
            <div className="font-display text-lg text-foreground">
              Senior PM · Canva
            </div>
            <div className="font-body text-sm text-muted-foreground">
              Sydney, Australia
            </div>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={5}
            timelineRef={heroRef}
            customVariants={textVariants}
            className="space-y-1"
          >
            <div className="font-annotation text-xs uppercase tracking-widest text-muted-foreground">
              Background
            </div>
            <div className="font-display text-lg text-foreground">
              PM · Consultant · BDR
            </div>
            <div className="font-body text-sm text-muted-foreground">
              Canva, Pinterest, Accenture, Gartner
            </div>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={6}
            timelineRef={heroRef}
            customVariants={textVariants}
            className="space-y-1"
          >
            <div className="font-annotation text-xs uppercase tracking-widest text-muted-foreground">
              Education
            </div>
            <div className="font-display text-lg text-foreground">
              UNSW · NYU Stern
            </div>
            <div className="font-body text-sm text-muted-foreground">
              B.Com & B.Sc (Dist.) · FinTech
            </div>
          </TimelineContent>
        </div>

        <TimelineContent
          as="div"
          animationNum={7}
          timelineRef={heroRef}
          customVariants={textVariants}
          className="mt-16"
        >
          <a
            href="mailto:matthew.e.giuffre@gmail.com"
            className="inline-flex items-center gap-2 font-annotation text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Get in touch
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </TimelineContent>
      </div>
    </section>
  );
}
