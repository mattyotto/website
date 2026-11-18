import { ImageResponse } from "next/og";
import sharp from "sharp";
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
// Same resting grid as the hero: muted-foreground strokes at ~5% opacity.
const GRID_STROKE_OPACITY = 0.05;

const regularFont = readFile(join(process.cwd(), "public/fonts/Inter-Regular.ttf"));
const boldFont = readFile(join(process.cwd(), "public/fonts/Inter-Bold.ttf"));
const avatarFile = readFile(join(process.cwd(), "public/avatar2.png"));

function gridDataUrl(width: number, height: number) {
  const step = 40;
  const lines: string[] = [];
  for (let x = step; x < width; x += step) {
    const pos = x + 0.5;
    lines.push(
      `<line x1="${pos}" y1="0" x2="${pos}" y2="${height}" stroke="#78716C" stroke-opacity="${GRID_STROKE_OPACITY}" stroke-width="1"/>`,
    );
  }
  for (let y = step; y < height; y += step) {
    const pos = y + 0.5;
    lines.push(
      `<line x1="0" y1="${pos}" x2="${width}" y2="${pos}" stroke="#78716C" stroke-opacity="${GRID_STROKE_OPACITY}" stroke-width="1"/>`,
    );
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${lines.join("")}</svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/** Fade the portrait's alpha the way the hero mask does, so no overlay box is painted. */
async function fadeAvatarBottom(input: Buffer) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const pixels = Buffer.from(data);
  const fadeStart = Math.round(height * 0.6);
  const span = height - 1 - fadeStart;
  for (let y = fadeStart; y < height; y++) {
    const keep = span <= 0 ? 0 : 1 - (y - fadeStart) / span;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels + 3;
      pixels[i] = Math.round(pixels[i] * keep);
    }
  }
  return sharp(pixels, { raw: { width, height, channels } }).png().toBuffer();
}

export async function createOgImage() {
  const [regular, bold, avatar] = await Promise.all([regularFont, boldFont, avatarFile]);
  const fadedAvatar = await fadeAvatarBottom(avatar);
  const avatarSrc = `data:image/png;base64,${fadedAvatar.toString("base64")}`;

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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            src={avatarSrc}
            width={AVATAR_SIZE}
            height={AVATAR_SIZE}
          />
          <div
            style={{
              display: "flex",
              marginTop: -8,
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
