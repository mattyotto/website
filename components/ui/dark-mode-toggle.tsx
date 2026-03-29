"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function DarkModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-16 h-8" />;

  const isDark = theme === "dark";

  return (
    <label className="relative inline-flex items-center w-16 h-8 cursor-pointer select-none">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
      />
      {/* Track */}
      <span
        className="absolute inset-0 rounded-full transition-colors duration-300"
        style={{ backgroundColor: isDark ? "#111111" : "#e5e7eb" }}
      />
      {/* Icon — opposite side from thumb */}
      <span
        className="absolute flex items-center justify-center transition-all duration-300 pointer-events-none"
        style={{ [isDark ? "right" : "left"]: "10px" }}
      >
        {isDark
          ? <Moon size={13} className="text-white" strokeWidth={2} />
          : <Sun size={13} className="text-gray-500" strokeWidth={2} />
        }
      </span>
      {/* Thumb */}
      <span
        className="absolute left-1 h-6 w-6 rounded-full shadow-sm"
        style={{
          backgroundColor: isDark ? "#ffffff" : "#1a1a1a",
          transform: isDark ? "translateX(0px)" : "translateX(32px)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease",
        }}
      />
    </label>
  );
}
