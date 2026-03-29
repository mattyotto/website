"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggleButton2 } from "@/components/ui/theme-toggle-buttons";

export default function DarkModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="h-7 w-7" />;

  const isDark = resolvedTheme === "dark";

  return (
    <ThemeToggleButton2
      className="h-7 w-7"
      isDark={!isDark}
      onToggle={() => setTheme(isDark ? "light" : "dark")}
    />
  );
}
