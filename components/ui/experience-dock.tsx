'use client';

import * as React from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Experience = {
  id: string;
  logo: string;
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
    bullets: ['Business transformation for large tech firms', 'KYC remediation: 500k+ customer records'],
  },
  {
    id: 'pinterest',
    logo: '/logos/pinterest.png',
    logoAlt: 'Pinterest',
    caption: '2023',
    active: true,
    title: 'Sr PM, SMB Sales',
    org: 'Pinterest',
    period: '2023 – 2025',
    bullets: ['$30M annual SMB sales team, exceeded quota 3x', 'Built AI tool → +10% advertiser reply rate'],
  },
  {
    id: 'canva',
    logo: '/logos/canva.png',
    logoAlt: 'Canva',
    caption: '2025',
    active: true,
    title: 'Senior Program Manager',
    org: 'Canva',
    period: '2025 – Present',
    bullets: ['Owns Premium Apps monetisation', 'SQL analytics & commercial negotiations'],
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
    <div className="relative flex flex-col items-center" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Logo above dot */}
      <div
        className="absolute"
        style={{ bottom: '100%', marginBottom: 23, pointerEvents: 'auto' }}
      >
        <img
          src={item.logo}
          alt={item.logoAlt}
          style={{ height: 50, width: 'auto', objectFit: 'contain', maxWidth: 'none', filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)', transition: 'filter 0.2s ease' }}
        />
      </div>

      {/* Dot */}
      <motion.div
        ref={ref}
        style={{ scale, width: 18, height: 18 }}
        className={cn(
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

      {/* Hover card above */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-1/2 w-52 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-2xl p-4 pointer-events-none"
            style={{ left: '100%', marginLeft: 16, y: '-50%' }}
          >
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mb-1">{item.period}</p>
            <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 leading-snug">{item.title}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">{item.org}</p>
            <ul className="space-y-1.5">
              {item.bullets.map((b, i) => (
                <li key={i} className="flex gap-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                  <span className="mt-px shrink-0 text-zinc-400">·</span>
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

export default function ExperienceDock() {
  const mouseX = useMotionValue(Infinity);

  const lastActiveIndex = React.useMemo(() => {
    let idx = -1;
    experiences.forEach((ex, i) => { if (ex.active) idx = i; });
    return idx;
  }, []);

  return (
    <div id="experience" className="flex justify-center">
      <div
          className="relative w-[520px]"
          onMouseMove={(e) => mouseX.set(e.clientX)}
          onMouseLeave={() => mouseX.set(Infinity)}
        >
          {/* Rail background */}
          <div className="absolute h-[1.5px] top-0 z-10" style={{ left: -80, right: -80, transform: 'translateY(17px)' }}>
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
  );
}
