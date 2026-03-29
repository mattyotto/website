import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const courierPrime = localFont({
  src: [
    { path: "../public/fonts/CourierPrime-Regular.ttf", style: "normal", weight: "400" },
    { path: "../public/fonts/CourierPrime-Bold.ttf", style: "normal", weight: "700" },
    { path: "../public/fonts/CourierPrime-Italic.ttf", style: "italic", weight: "400" },
    { path: "../public/fonts/CourierPrime-BoldItalic.ttf", style: "italic", weight: "700" },
  ],
  variable: "--font-display",
});

const spaceMono = Space_Mono({
  variable: "--font-annotation",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Matty Giuffre",
  description: "Senior Program Manager at Canva. Builder. Aspiring PM.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${courierPrime.variable} ${spaceMono.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
