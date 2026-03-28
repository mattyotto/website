"use client";

import { Component as InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { MagicText } from "@/components/ui/magic-text";
import { PageGridBackground } from "@/components/ui/page-grid-background";
import TimeLine_01, { type TimeLine_01Entry } from "@/components/ui/release-time-line";
import { Package, Sparkles, Zap } from "lucide-react";
import { Globe } from "@/components/ui/cobe-globe";
import Contact from "@/components/ui/contact-sections";
import { Nav } from "@/components/ui/nav";

const projects: TimeLine_01Entry[] = [
  {
    icon: Package,
    title: "Project One",
    subtitle: "Coming soon",
    description: "Placeholder for a real project.",
    items: ["Detail one", "Detail two", "Detail three"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
  },
  {
    icon: Sparkles,
    title: "Project Two",
    subtitle: "Coming soon",
    description: "Placeholder for a real project.",
    items: ["Detail one", "Detail two", "Detail three"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
  },
  {
    icon: Zap,
    title: "Project Three",
    subtitle: "Coming soon",
    description: "Placeholder for a real project.",
    items: ["Detail one", "Detail two", "Detail three"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2076&auto=format&fit=crop",
  },
];

const travelMarkers = [
  { id: "australia", location: [-33.8688, 151.2093] as [number, number], label: "Australia" },
  { id: "nz", location: [-36.8509, 174.7645] as [number, number], label: "New Zealand" },
  { id: "singapore", location: [1.3521, 103.8198] as [number, number], label: "Singapore" },
  { id: "china", location: [39.9042, 116.4074] as [number, number], label: "China" },
  { id: "hongkong", location: [22.3193, 114.1694] as [number, number], label: "Hong Kong" },
  { id: "indonesia", location: [-8.3405, 115.0920] as [number, number], label: "Indonesia" },
  { id: "germany", location: [52.5200, 13.4050] as [number, number], label: "Germany" },
  { id: "malta", location: [35.9375, 14.3754] as [number, number], label: "Malta" },
  { id: "usa", location: [40.7128, -74.0060] as [number, number], label: "USA" },
  { id: "la", location: [34.0522, -118.2437] as [number, number], label: "Los Angeles" },
  { id: "canada", location: [43.6532, -79.3832] as [number, number], label: "Canada" },
  { id: "japan", location: [35.6762, 139.6503] as [number, number], label: "Japan" },
  { id: "thailand", location: [13.7563, 100.5018] as [number, number], label: "Thailand" },
  { id: "mexico", location: [19.4326, -99.1332] as [number, number], label: "Mexico" },
  { id: "vietnam", location: [10.8231, 106.6297] as [number, number], label: "Vietnam" },
  { id: "france", location: [48.8566, 2.3522] as [number, number], label: "France" },
  { id: "italy", location: [41.9028, 12.4964] as [number, number], label: "Italy" },
  { id: "spain", location: [40.4168, -3.7038] as [number, number], label: "Spain" },
  { id: "uk", location: [51.5074, -0.1278] as [number, number], label: "UK" },
  { id: "greece", location: [37.9838, 23.7275] as [number, number], label: "Greece" },
  { id: "croatia", location: [42.6507, 18.0944] as [number, number], label: "Croatia" },
  { id: "monaco", location: [43.7384, 7.4246] as [number, number], label: "Monaco" },
  { id: "vatican", location: [41.9029, 12.4534] as [number, number], label: "Vatican City" },
  { id: "fiji", location: [-18.1416, 178.4419] as [number, number], label: "Fiji" },
  { id: "chile", location: [-33.4489, -70.6693] as [number, number], label: "Chile" },
  { id: "argentina", location: [-34.6037, -58.3816] as [number, number], label: "Argentina" },
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
        <section id="about" className="py-16 px-4 bg-transparent flex items-center justify-center">
          <div className="max-w-4xl mx-auto">
            <MagicText text="I'm Matty — a builder who bridges product, data, and delivery. Senior Program Manager at Canva. Previously Pinterest, Accenture, and Gartner. I care about shipping things that actually work." />
          </div>
        </section>
        <section id="projects" className="bg-transparent">
          <TimeLine_01
            title="Projects"
            description="A selection of things I've built, shipped, or contributed to."
            entries={projects}
          />
        </section>
        <section id="travel" className="py-16 px-4 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-16 text-center text-foreground">30+ Countries</h2>
            <div className="w-full max-w-lg mx-auto">
              <Globe markers={travelMarkers} />
            </div>
          </div>
        </section>
        <section id="contact" className="bg-transparent">
          <Contact />
        </section>
      </main>
    </div>
  );
}
