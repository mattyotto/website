"use client";

import { Component as InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { MagicText } from "@/components/ui/magic-text";
import { PageGridBackground } from "@/components/ui/page-grid-background";
import { Timeline } from "@/components/ui/timeline";
import { Briefcase } from "lucide-react";
import { ProjectCard } from "@/components/ui/project-card";
import { Globe } from "@/components/ui/cobe-globe";
import Contact from "@/components/ui/contact-sections";
import { Nav } from "@/components/ui/nav";

const jobHistory = [
  {
    date: "2025-01-01",
    title: "Senior Program Manager — Canva",
    description: "Premium Apps monetisation for third-party developers. SQL analytics, commercial negotiations, cross-functional delivery.",
    icon: <Briefcase className="h-3 w-3" />,
    logo: "/logos/canva.png",
  },
  {
    date: "2023-01-01",
    title: "Sr. Program Manager — Pinterest",
    description: "$30M SMB sales team. Exceeded quota 3x. Built AI tool for advertiser comms → +10% reply rate.",
    icon: <Briefcase className="h-3 w-3" />,
    logo: "/logos/pinterest.png",
  },
  {
    date: "2021-06-01",
    title: "Management Consultant — Accenture",
    description: "Business transformation for large tech firms. KYC remediation for major Australian bank (500k+ records).",
    icon: <Briefcase className="h-3 w-3" />,
    logo: "/logos/accenture.png",
  },
];

const travelMarkers = [
  { id: "sydney", location: [-33.8688, 151.2093] as [number, number], label: "Sydney" },
  { id: "tokyo", location: [35.6762, 139.6503] as [number, number], label: "Tokyo" },
  { id: "nyc", location: [40.7128, -74.006] as [number, number], label: "New York" },
  { id: "london", location: [51.5074, -0.1278] as [number, number], label: "London" },
  { id: "paris", location: [48.8566, 2.3522] as [number, number], label: "Paris" },
  { id: "dubai", location: [25.2048, 55.2708] as [number, number], label: "Dubai" },
  { id: "bali", location: [-8.3405, 115.0920] as [number, number], label: "Bali" },
  { id: "la", location: [34.0522, -118.2437] as [number, number], label: "Los Angeles" },
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
        <section id="experience" className="py-16 px-4 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-16 text-center text-foreground">Job History</h2>
            <Timeline
              items={jobHistory}
              initialCount={3}
              showMoreText="Load More"
              showLessText="Show Less"
              dotClassName="bg-gradient-to-b from-background to-muted ring-1 ring-border"
              lineClassName="border-l border-border"
            />
          </div>
        </section>
<section id="projects" className="py-16 px-4 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-16 text-center text-foreground">Projects</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Aero Landing Page"
                description="A comprehensive AI chatbot platform. This project focuses on the design and development of a user-friendly and visually appealing landing page."
                imgSrc="https://framerusercontent.com/images/hynA7mpUiyBRDcssvVKCDBT14IM.jpg"
                link="#"
              />
              <ProjectCard
                title="Dreamland App Concept"
                description="A dreamy mobile app prototype designed for mindfulness and relaxation, featuring calming animations and a serene user interface."
                imgSrc="https://framerusercontent.com/images/D4M3JTkvSAJaqyRe9AzUnHvL8Ao.jpg"
                link="#"
                linkText="Explore Concept"
              />
              <ProjectCard
                title="Quantum Analytics Dashboard"
                description="A data visualization tool for quantum computing experiments, providing real-time insights and complex data analysis."
                imgSrc="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                link="#"
              />
            </div>
          </div>
        </section>
<section id="travel" className="py-16 px-4 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-extrabold tracking-tight mb-16 text-center text-foreground">Places I've Travelled</h2>
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
