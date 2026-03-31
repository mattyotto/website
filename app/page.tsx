"use client";

import { Component as InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { MagicText } from "@/components/ui/magic-text";
import { PageGridBackground } from "@/components/ui/page-grid-background";
import TimeLine_01, { type TimeLine_01Entry } from "@/components/ui/release-time-line";
import { Sparkles, Clock } from "lucide-react";
import { Globe } from "@/components/ui/cobe-globe";
import Contact from "@/components/ui/contact-sections";
import { Nav } from "@/components/ui/nav";
import ExperienceDock from "@/components/ui/experience-dock";
import HoverRevealCards from "@/components/ui/cards";
import { MobileThemeToggle } from "@/components/ui/mobile-theme-toggle";

function PhotoCard({ src, label, width, height }: { src: string; label: string; width: number; height: number }) {
  return (
    <div style={{
      width,
      borderRadius: 12,
      overflow: 'hidden',
      background: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)',
      border: '1.5px solid rgba(255,255,255,0.7)',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.2)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={e => {
      (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.13), 0 2px 8px rgba(0,0,0,0.07)';
    }}
    >
      <img
        src={src}
        alt={label}
        style={{ width: '100%', height, objectFit: 'cover', display: 'block' }}
        draggable={false}
      />
      <div style={{
        padding: '6px 10px 7px',
        fontSize: '0.65rem',
        fontFamily: 'monospace',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: '#444',
        background: '#fff',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </div>
    </div>
  );
}

const projects: TimeLine_01Entry[] = [

  {
    icon: Sparkles,
    title: "Renovation Project",
    subtitle: "Darlinghurst, Sydney",
    description: "Turned a 19th century horse stable in Darlinghurst, Sydney into a one bedroom loft apartment. The sandstone walls and exposed timber rafters stayed. Everything else got a revamp.",
    images: [
      "/images/reno/before-exterior.jpg",
      "/images/reno/before-bedroom.jpg",
      "/images/reno/after-living-room.jpg",
      "/images/reno/after-stair.jpg",
      "/images/reno/after-kitchen.jpg",
      "/images/reno/after-bedroom.jpg",
    ],
  },
  {
    icon: Clock,
    title: "This Website",
    subtitle: "mattygiuffre.com",
    description: "Built with Next.js, Claude Code, and a lot of late nights. Hosted on Cloudflare. You're looking at it.",
    video: "/videos/website-video.mp4",
  },
{
    icon: Clock,
    title: "Coming Soon",
    subtitle: "Work in Progress",
    description: "Another project on the way. Stay tuned.",
    images: ["https://placehold.co/600x400"],
  },
];

const travelMarkers = [
  { id: "australia", location: [-33.8688, 151.2093] as [number, number], label: "Sydney 🏠" },
  { id: "nz", location: [-36.8509, 174.7645] as [number, number], label: "New Zealand" },
  { id: "singapore", location: [1.3521, 103.8198] as [number, number], label: "Singapore" },
  { id: "china", location: [39.9042, 116.4074] as [number, number], label: "China" },
  { id: "hongkong", location: [22.3193, 114.1694] as [number, number], label: "Hong Kong" },
  { id: "indonesia", location: [-8.3405, 115.0920] as [number, number], label: "Indonesia" },
  { id: "uk", location: [54.0, -2.0] as [number, number], label: "UK" },
  { id: "france", location: [46.0, 2.0] as [number, number], label: "France" },
  { id: "spain", location: [40.4168, -3.7038] as [number, number], label: "Spain" },
  { id: "germany", location: [51.5, 10.0] as [number, number], label: "Germany" },
  { id: "malta", location: [35.9375, 14.3754] as [number, number], label: "Malta" },
  { id: "greece", location: [39.0742, 21.8243] as [number, number], label: "Greece" },
  { id: "usa", location: [39.5, -98.35] as [number, number], label: "USA" },
  { id: "canada", location: [43.6532, -79.3832] as [number, number], label: "Canada" },
  { id: "japan", location: [35.6762, 139.6503] as [number, number], label: "Japan" },
  { id: "thailand", location: [13.7563, 100.5018] as [number, number], label: "Thailand" },
  { id: "mexico", location: [19.4326, -99.1332] as [number, number], label: "Mexico" },
  { id: "vietnam", location: [10.8231, 106.6297] as [number, number], label: "Vietnam" },
{ id: "fiji", location: [-18.1416, 178.4419] as [number, number], label: "Fiji" },
  { id: "chile", location: [-33.4489, -70.6693] as [number, number], label: "Chile" },
  { id: "argentina", location: [-55.0, -65.0] as [number, number], label: "Argentina" },
  { id: "uruguay", location: [-34.9011, -56.1645] as [number, number], label: "Uruguay" },
  { id: "bolivia", location: [-16.5000, -68.1500] as [number, number], label: "Bolivia" },
  { id: "peru", location: [-12.0464, -77.0428] as [number, number], label: "Peru" },
  { id: "colombia", location: [4.7110, -74.0721] as [number, number], label: "Colombia" },
  { id: "srilanka", location: [6.9271, 79.8612] as [number, number], label: "Sri Lanka" },
];

export default function Home() {
  return (
    <div
      className="relative"
      onMouseMove={(e) => {
        window.dispatchEvent(
          new CustomEvent("page-mouse-move", {
            detail: { x: e.clientX, y: e.clientY },
          })
        );
      }}
    >
      <PageGridBackground />
      <Nav />
      <main className="relative z-10 flex flex-col">
        <div className="relative">
          <InfiniteGrid />
          {/* Avatar — above name */}
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 pointer-events-none z-20">
            <img
              src="/avatar2.png"
              alt="Matty Giuffre"
              className="w-64 md:w-80 object-contain"
              style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}
            />
          </div>
        </div>
        <section id="about" className="py-20 px-4 bg-transparent flex items-center justify-center">
          <div className="max-w-4xl mx-auto w-full">
            <MagicText text="👋 I'm Matty. I bridge product, data, and delivery. Six years in tech. I care about simple things that work — clean interfaces, smart automations and shipping stuff that matters." />
            <div className="mt-52">
              <ExperienceDock />
            </div>
          </div>
        </section>
        <section id="projects" className="bg-transparent">
          <TimeLine_01
            title="Projects"
            description="Things I've built. At work, at home, and everywhere in between."
            entries={projects}
          />
        </section>
        <section id="travel" className="py-20 bg-transparent">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">Places I&apos;ve Been</h2>
              <p className="mb-16 text-base text-muted-foreground md:text-lg">The world is big. I&apos;m working on it.</p>
            </div>
          </div>
          {/* Mobile: hover reveal cards */}
          <div className="md:hidden px-4">
            <HoverRevealCards items={[
              { id: "malta", title: "Valletta", subtitle: "Malta", imageUrl: "/images/travel/malta.jpg" },
              { id: "peru", title: "Rainbow Mountains", subtitle: "Peru", imageUrl: "/images/travel/peru.jpg" },
              { id: "uruguay", title: "Colonia del Sacramento", subtitle: "Uruguay", imageUrl: "/images/travel/uruguay.jpg" },
              { id: "indonesia", title: "Ubud", subtitle: "Indonesia", imageUrl: "/images/travel/indonesia.jpg" },
            ]} />
          </div>

          {/* Desktop: globe + floating photos */}
          <div className="relative hidden md:block w-full lg:overflow-hidden" style={{ minHeight: 620 }}>
            {/* Globe centered */}
            <div className="relative z-10 mx-auto flex justify-center">
              <Globe markers={travelMarkers} />
            </div>

            {/* Top-left — Indonesia portrait */}
            <div className="absolute hidden lg:block" style={{
              top: '2%', left: 'calc(50% - 460px)',
              transform: 'rotate(-4deg)',
              zIndex: 5,
            }}>
              <PhotoCard
                src="/images/travel/malta.jpg"
                label="Valletta, Malta"
                width={155}
                height={210}
              />
            </div>

            {/* Bottom-left — Uruguay */}
            <div className="absolute hidden lg:block" style={{
              bottom: '4%', left: 'calc(50% - 530px)',
              transform: 'rotate(5deg)',
              zIndex: 5,
            }}>
              <PhotoCard
                src="/images/travel/uruguay.jpg"
                label="Colonia del Sacramento, Uruguay"
                width={276}
                height={186}
              />
            </div>

            {/* Top-right — Malta portrait */}
            <div className="absolute hidden lg:block" style={{
              top: '2%', right: 'calc(50% - 560px)',
              transform: 'rotate(4deg)',
              zIndex: 5,
            }}>
              <PhotoCard
                src="/images/travel/peru.jpg"
                label="Rainbow Mountains, Peru"
                width={230}
                height={155}
              />
            </div>

            {/* Bottom-right — Peru */}
            <div className="absolute hidden lg:block" style={{
              bottom: '4%', right: 'calc(50% - 450px)',
              transform: 'rotate(-3deg)',
              zIndex: 5,
            }}>
              <PhotoCard
                src="/images/travel/indonesia.jpg"
                label="Ubud, Indonesia"
                width={195}
                height={210}
              />
            </div>
          </div>
        </section>
        <section id="contact" className="bg-transparent">
          <Contact />
        </section>
        <MobileThemeToggle />
      </main>
    </div>
  );
}
