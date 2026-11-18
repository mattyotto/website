import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const ogAlt = `${SITE_NAME}. ${SITE_DESCRIPTION}`;
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const BACKGROUND = "#FAFAF9";
const FOREGROUND = "#111110";
const MUTED = "#78716C";
const AVATAR_SIZE = 332;
const AVATAR_WINDOW = 300;
const AVATAR_FADE = 132;

const regularFont = readFile(join(process.cwd(), "public/fonts/Inter-Regular.ttf"));
const boldFont = readFile(join(process.cwd(), "public/fonts/Inter-Bold.ttf"));
const avatarFile = readFile(join(process.cwd(), "public/avatar2.png"));

function gridDataUrl(width: number, height: number) {
  const step = 40;
  const lines: string[] = [];
  for (let x = 0; x <= width; x += step) {
    lines.push(
      `<line x1="${x}" y1="0" x2="${x}" y2="${height}" stroke="#78716C" stroke-opacity="0.34" stroke-width="1.5"/>`,
    );
  }
  for (let y = 0; y <= height; y += step) {
    lines.push(
      `<line x1="0" y1="${y}" x2="${width}" y2="${y}" stroke="#78716C" stroke-opacity="0.34" stroke-width="1.5"/>`,
    );
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${lines.join("")}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function createOgImage() {
  const [regular, bold, avatar] = await Promise.all([regularFont, boldFont, avatarFile]);
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: BACKGROUND,
          color: FOREGROUND,
          fontFamily: "Inter",
        }}
      >
        {/* Satori renders <img>; next/image is not supported in ImageResponse. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={gridDataUrl(ogSize.width, ogSize.height)}
          width={ogSize.width}
          height={ogSize.height}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              width: AVATAR_SIZE,
              height: AVATAR_WINDOW,
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              src={avatarSrc}
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: AVATAR_SIZE,
                height: AVATAR_FADE,
                backgroundImage: `linear-gradient(to bottom, rgba(250,250,249,0) 0%, ${BACKGROUND} 80%)`,
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 4,
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2.2,
              lineHeight: 1,
              color: FOREGROUND,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontSize: 30,
              fontWeight: 400,
              lineHeight: 1.15,
              color: MUTED,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
