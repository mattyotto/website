"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Package, Calendar, Sparkles, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Local button with asChild support (needed for link rendering)
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-sm shadow-black/5 hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm shadow-black/5 hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm shadow-black/5 hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm shadow-black/5 hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export type TimeLine_01Entry = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  description: string;
  items?: string[];
  image?: string;
  images?: string[];
  video?: string;
  button?: {
    url: string;
    text: string;
  };
};

export interface TimeLine_01Props {
  title?: string;
  description?: string;
  entries?: TimeLine_01Entry[];
  className?: string;
  firstCardMarginLeft?: number;
}

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = React.useState(0);
  return (
    <div className="relative mb-4 w-full h-72 rounded-lg overflow-hidden group">
      <img
        key={idx}
        src={images[idx]}
        alt={`${title} ${idx + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
        loading="lazy"
      />
      {(images[idx].includes('before') || images[idx].includes('after')) && (
        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-medium tracking-widest uppercase backdrop-blur-sm">
          {images[idx].includes('before') ? 'Before' : 'After'}
        </span>
      )}
      {/* Prev */}
      {idx > 0 && (
        <button
          onClick={() => setIdx(i => i - 1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100"
          aria-label="Previous"
        >
          ‹
        </button>
      )}
      {/* Next */}
      {idx < images.length - 1 && (
        <button
          onClick={() => setIdx(i => i + 1)}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100"
          aria-label="Next"
        >
          ›
        </button>
      )}
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === idx ? 'bg-white scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

export const defaultEntries: TimeLine_01Entry[] = [
  {
    icon: Package,
    title: "Advanced Component Pack",
    subtitle: "Version 2.1.0 • Feb 2025",
    description:
      "Ruixen UI now ships with an advanced component pack including complex layouts, enterprise-ready data tables, and animated navigation menus.",
    items: [
      "New Data Grid with sorting, filtering, and pagination",
      "Kanban board with drag-and-drop support",
      "Animated mega menu component",
      "Masonry grid layout for galleries and portfolios",
      "Extended accessibility support across all components",
    ],
    image:
      "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-gradient.png",
    button: {
      url: "https://ruixenui.com",
      text: "Explore Components",
    },
  },
  {
    icon: Sparkles,
    title: "Theme Builder & Design Tokens",
    subtitle: "Version 2.0.0 • Jan 2025",
    description:
      "We've introduced a fully customizable theme builder powered by design tokens so you can tailor Ruixen UI to match any brand identity.",
    items: [
      "Real-time theme preview in the dashboard",
      "Customizable color palettes, typography, and spacing",
      "Preset themes for quick project setup",
      "Export tokens to CSS variables or JSON",
    ],
    image:
      "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/featured-01.png",
  },
  {
    icon: Zap,
    title: "Motion & Interaction Update",
    subtitle: "Version 1.8.0 • Dec 2024",
    description:
      "Micro-interactions across Ruixen UI have been enhanced with Framer Motion, delivering a smoother and more engaging user experience.",
    items: [
      "Animated dropdown menus and modals",
      "Smooth transitions between pages",
      "Custom easing curves for a premium feel",
      "Reduced layout shift for better stability",
    ],
    image:
      "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/dashboard-02.png",
  },
  {
    icon: Calendar,
    title: "Initial Pro Release",
    subtitle: "Version 1.5.0 • Oct 2024",
    description:
      "Ruixen UI Pro is here — a premium set of components, templates, and utilities designed for production-grade applications.",
    items: [
      "Full Figma design kit",
      "Extended form components with validation",
      "Chart components with Recharts integration",
      "Ready-to-use dashboard layouts",
    ],
    image:
      "https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/featured-06.png",
    button: {
      url: "https://ruixenui.com/pro",
      text: "View Ruixen UI Pro",
    },
  },
];

/**
 * Behavior: Only the card that is currently centered in the viewport is "open".
 * As you scroll, the active card expands to reveal its full content. Others stay collapsed.
 */
export default function TimeLine_01({
  title = "Ruixen UI Release Notes",
  description = "Stay up to date with the latest components, features, and performance enhancements in Ruixen UI — built to help you design and ship faster.",
  entries = defaultEntries,
  firstCardMarginLeft,
}: TimeLine_01Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scroll = (dir: 'prev' | 'next') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'next' ? el.clientWidth : -el.clientWidth, behavior: 'smooth' });
  };

  // Create stable setters for refs inside map
  const setItemRef = (el: HTMLDivElement | null, i: number) => {
    itemRefs.current[i] = el;
  };
  const setSentinelRef = (el: HTMLDivElement | null, i: number) => {
    sentinelRefs.current[i] = el;
  };

  useEffect(() => {
    if (!sentinelRefs.current.length) return;

    // We observe small sentinels placed near the title of each card. Whichever
    // sentinel is closest to the vertical center of the viewport becomes active.
    // Using IntersectionObserver to track visibility + a rAF loop to pick the closest.

    let frame = 0;
    const updateActiveByProximity = () => {
      frame = requestAnimationFrame(updateActiveByProximity);
      // Compute distance of each sentinel to viewport center
      const centerY = window.innerHeight / 3;
      let bestIndex = 0;
      let bestDist = Infinity;
      sentinelRefs.current.forEach((node, i) => {
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (bestIndex !== activeIndex) setActiveIndex(bestIndex);
    };

    frame = requestAnimationFrame(updateActiveByProximity);
    return () => cancelAnimationFrame(frame);
  }, [activeIndex]);

  // Optional: ensure the first card is active on mount
  useEffect(() => {
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    return () => el.removeEventListener('scroll', updateScrollState);
  }, []);

  return (
    <section className="pt-20 pb-12" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="container">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mb-6 text-base text-muted-foreground md:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="relative mt-8 md:mt-10">
        {/* Prev arrow */}
        <button
          onClick={() => scroll('prev')}
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full border border-border bg-background/80 backdrop-blur p-2 shadow-md transition-opacity duration-200 ${hovered && canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next arrow */}
        <button
          onClick={() => scroll('next')}
          className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full border border-border bg-background/80 backdrop-blur p-2 shadow-md transition-opacity duration-200 ${hovered && canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-stretch overflow-x-auto scroll-smooth pb-8 gap-4"
          style={{
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 97%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 97%, transparent 100%)',
          }}
        >
          {entries.map((entry, index) => {
            const isActive = index === activeIndex;
            const isFirst = index === 0;
            const isLast = index === entries.length - 1;

            return (
              <div
                key={index}
                className="relative shrink-0 w-[500px] max-w-[85vw] flex flex-col"
                style={{
                  scrollSnapAlign: 'center',
                  marginLeft: isFirst ? (firstCardMarginLeft ?? 'max(1rem, calc((100vw - 1280px) / 2))') : undefined,
                  marginRight: isLast ? '2rem' : undefined,
                }}
                ref={(el) => setItemRef(el, index)}
                aria-current={isActive ? "true" : "false"}
              >

                {/* Invisible sentinel near the card title to measure proximity to viewport center */}
                <div
                  ref={(el) => setSentinelRef(el, index)}
                  aria-hidden
                  className="absolute -top-24 left-0 h-12 w-12 opacity-0"
                />

                {/* Content column */}
                <article
                  className={
                    "flex flex-col h-full rounded-2xl border p-3 transition-all duration-300 border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-black shadow-lg"
                  }
                >
                  {entry.video ? (
                    <video
                      src={entry.video}
                      className="mb-4 w-full h-72 rounded-lg object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : entry.images && entry.images.length > 0 ? (
                    <ImageCarousel images={entry.images} title={entry.title} />
                  ) : entry.image && (
                    <img
                      src={entry.image}
                      alt={`${entry.title} visual`}
                      className="mb-4 w-full h-72 rounded-lg object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="space-y-4">
                    {/* Header with improved typography */}
                    <div className="space-y-2">
                      <h2
                        className={
                          "text-md font-medium leading-tight tracking-tight md:text-lg transition-colors duration-200 " +
                          "text-foreground"
                        }
                      >
                        {entry.title}
                      </h2>

                      {/* Improved description with better spacing */}
                      <p
                        className={
                          "text-xs leading-relaxed md:text-sm transition-all duration-300 " +
                          (isActive
                            ? "text-muted-foreground line-clamp-none"
                            : "text-muted-foreground/80 line-clamp-none")
                        }
                      >
                        {entry.description}
                      </p>
                    </div>

                    <div>
                      <div>
                        <div className="space-y-4 pt-2">
                          {entry.items && entry.items.length > 0 && (
                            <div className="rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black p-4">
                              <ul className="space-y-2">
                                {entry.items.map((item, itemIndex) => (
                                  <li
                                    key={itemIndex}
                                    className="flex items-start gap-2 text-sm text-muted-foreground"
                                  >
                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                                    <span className="leading-relaxed">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {entry.button && (
                            <div className="flex justify-end">
                              <Button
                                variant="default"
                                size="sm"
                                className="group hover:bg-primary hover:text-primary-foreground font-normal transition-all duration-200"
                                asChild
                              >
                                <a href={entry.button.url} target="_blank" rel="noreferrer">
                                  {entry.button.text}
                                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
