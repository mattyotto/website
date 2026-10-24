import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const ogAlt = SITE_NAME;
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const regularFont = readFile(join(process.cwd(), "public/fonts/Inter-Regular.ttf"));
const boldFont = readFile(join(process.cwd(), "public/fonts/Inter-Bold.ttf"));

export async function createOgImage() {
  const [regular, bold] = await Promise.all([regularFont, boldFont]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0C0C0A",
          color: "#FAFAF9",
          padding: "72px 80px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 4,
            color: "#F59E0B",
            fontWeight: 400,
          }}
        >
          mattygiuffre.com
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 92,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 34,
              lineHeight: 1.35,
              color: "#A8A29E",
              fontWeight: 400,
              maxWidth: 920,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 112,
            height: 6,
            backgroundColor: "#F59E0B",
          }}
        />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    }
  );
}
