"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Travel", href: "#travel" },
  { label: "Contact", href: "#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const lockedRef = useRef(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40);
      if (lockedRef.current) return;
      const aboutEl = document.getElementById("about");
      if (aboutEl && window.scrollY < aboutEl.offsetTop - window.innerHeight * 0.4) {
        setActive("");
        return;
      }
      const nearBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 80;
      if (nearBottom) setActive("contact");
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        if (lockedRef.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          } else if (entry.boundingClientRect.bottom < 0) {
            // Section has scrolled above viewport — find the next visible one or clear
            const aboutEl = document.getElementById("about");
            if (aboutEl && window.scrollY < aboutEl.offsetTop - window.innerHeight * 0.4) {
              setActive("");
            }
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActive(href.slice(1));
    lockedRef.current = true;
    setTimeout(() => { lockedRef.current = false; }, 1200);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={cn(
        "fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        "rounded-full border px-4 py-2",
        "bg-background/80 backdrop-blur-lg",
        scrolled ? "shadow-md" : "shadow-sm"
      )}
    >
      <nav className="flex items-center gap-1">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            className={cn(
                "px-3 py-1.5 text-sm rounded-full hover:bg-muted transition-colors duration-150",
                active === link.href.slice(1)
                  ? "text-foreground underline underline-offset-[6px]"
                  : "text-muted-foreground hover:text-foreground"
              )}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
