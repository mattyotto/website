"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function MobileThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-6 z-50">
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="flex items-center gap-3 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-5 py-2.5 shadow-md active:scale-95 transition-transform"
      >
        <div className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${isDark ? "bg-zinc-700" : "bg-zinc-200"}`}>
          <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${isDark ? "translate-x-5" : "translate-x-0.5"}`} />
        </div>
        {isDark ? <Moon className="w-3.5 h-3.5 text-zinc-300" /> : <Sun className="w-3.5 h-3.5 text-zinc-600" />}
      </button>
    </div>
  );
}
