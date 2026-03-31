'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Timeline } from '@/components/ui/timeline';

type Experience = {
  id: string;
  logo: string;
  logoMono?: string;
  logoAlt: string;
  caption: string;
  active: boolean;
  title: string;
  org: string;
  period: string;
  bullets: string[];
};

const experiences: Experience[] = [
  {
    id: 'accenture',
    logo: '/logos/accenture.png',
    logoAlt: 'Accenture',
    caption: '2021',
    active: true,
    title: 'Management Consultant',
    org: 'Accenture',
    period: '2021 – 2023',
    bullets: ['Business transformation for large tech firms', 'Big 4 Bank KYC remediation: 500k+ records'],
  },
  {
    id: 'pinterest',
    logo: '/logos/pinterest.png',
    logoAlt: 'Pinterest',
    caption: '2023',
    active: true,
    title: 'Senior Program Manager',
    org: 'Pinterest',
    period: '2023 – 2025',
    bullets: ['Managed $30M annual SMB sales team, beat quota 3x', 'Built AI email flow → +10% advertiser reply rate'],
  },
  {
    id: 'canva',
    logo: '/logos/canva.png',
    logoMono: '/logos/canva-black.png',
    logoAlt: 'Canva',
    caption: '2025',
    active: true,
    title: 'Program Manager',
    org: 'Canva',
    period: '2025 – Present',
    bullets: ["Manage Canva's Premium Apps Program", "Interim PM for Canva's Apps Marketplace"],
  },
];

function DockDot({
  mouseX,
  item,
}: {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  item: Experience;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = React.useState(false);


  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scale = useSpring(
    useTransform(distance, [-130, 0, 130], [1, 1.7, 1]),
    { mass: 0.1, stiffness: 160, damping: 13 }
  );

  return (
    <div
      className="relative flex flex-col items-center"
      onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(false); }}
    >
      {/* Logo above dot */}
      <button
        type="button"
        onClick={() => setHovered(h => !h)}
        className="absolute appearance-none bg-transparent border-0 p-0"
        style={{ bottom: '100%', marginBottom: 23 }}
      >
        <img
          src={hovered ? item.logo : (item.logoMono ?? item.logo)}
          alt={item.logoAlt}
          className={cn(!hovered && !item.logoMono && 'brightness-0 dark:invert transition-[filter] duration-200', !hovered && item.logoMono && 'dark:invert')}
          style={{ height: 50, width: 'auto', objectFit: 'contain', maxWidth: 'none' }}
        />
      </button>

      {/* Dot */}
      <motion.div
        ref={ref}
        style={{ scale, width: 18, height: 18 }}
        className={cn('relative z-10',
          'rounded-full ring-2 ring-black/10 dark:ring-white/10 cursor-pointer',
          item.active
            ? 'bg-zinc-900 dark:bg-zinc-100'
            : 'bg-zinc-400 dark:bg-zinc-600'
        )}
      />

      {/* Year caption below */}
      <span
        className="absolute select-none text-xs text-zinc-500 dark:text-zinc-400 pointer-events-none"
        style={{ top: '100%', marginTop: 12 }}
        aria-hidden
      >
        {item.caption}
      </span>

      {/* Hover card — below timeline, to the right of dot */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-52 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl p-4 pointer-events-none"
            style={{ top: 'calc(100% + 16px)', left: '50%' }}
          >
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-1">{item.period}</p>
            <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">{item.title}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">{item.org}</p>
            <ul className="space-y-1.5">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex gap-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                  <span className="mt-px shrink-0 text-zinc-600 dark:text-zinc-300">·</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const mobileTimelineItems = [
  {
    date: '2025-01-01',
    title: 'Program Manager · Canva',
    items: ["Manage Canva's Premium Apps Program", "Interim PM for Canva's Apps Marketplace"],
    logo: '/logos/canva-black.png',
    logoClassName: 'dark:invert scale-125 origin-left -ml-4',
  },
  {
    date: '2023-01-01',
    title: 'Senior Program Manager · Pinterest',
    items: ['Managed $30M annual SMB sales team, beat quota 3x', 'Built AI email flow → +10% advertiser reply rate'],
    logo: '/logos/pinterest.png',
    logoClassName: 'brightness-0 dark:invert',
  },
  {
    date: '2021-01-01',
    title: 'Management Consultant · Accenture',
    items: ['Business transformation for large tech firms', 'Big 4 Bank KYC remediation: 500k+ records'],
    logo: '/logos/accenture.png',
    logoClassName: 'brightness-0 dark:invert scale-150',
  },
];

export default function ExperienceDock() {
  const mouseX = useMotionValue(Infinity);

  const lastActiveIndex = React.useMemo(() => {
    let idx = -1;
    experiences.forEach((ex, i) => { if (ex.active) idx = i; });
    return idx;
  }, []);

  return (
    <div id="experience">
      {/* Mobile: timeline */}
      <div className="md:hidden">
        <Timeline items={mobileTimelineItems} initialCount={3} showAnimation={false} sortOrder="asc" />
      </div>
      {/* Desktop: dock */}
      <div className="hidden md:flex justify-center">
      <div
          className="relative w-[min(520px,82vw)]"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {/* Rail background */}
          <div className="absolute h-[1.5px] top-0 z-0" style={{ left: 0, right: 0, transform: 'translateY(17px)' }}>
            <div className="h-full w-full bg-zinc-200 dark:bg-zinc-800" />
            {lastActiveIndex >= 0 && (
              <div
                className="absolute left-0 top-0 h-full bg-zinc-900 dark:bg-zinc-100"
                style={{ width: `${(lastActiveIndex / (experiences.length - 1)) * 100}%` }}
              />
            )}
          </div>

          {/* Dots */}
          <ol className="relative flex items-center justify-between" style={{ marginTop: 8 }}>
            {experiences.map((item) => (
              <li key={item.id}>
                <DockDot mouseX={mouseX} item={item} />
              </li>
            ))}
          </ol>
      </div>
      </div>
    </div>
  );
}
