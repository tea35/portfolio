import { ImageResponse } from "next/og";
import fs from "fs";
import { join } from "path";
import { SITE_TITLE, SITE_DESCRIPTION, SITE_URL } from "@/lib/config";

export const alt = SITE_TITLE;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const fontPath = join(process.cwd(), "public/fonts/Cinzel-Bold.ttf");
  const cinzelFont = fs.readFileSync(fontPath).buffer;
  return new ImageResponse(
    <div
      style={{
        background: "#1c1c1c",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px",
        position: "relative",
        textAlign: "center",
      }}
    >
      {/* 上ライン */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: "#A8C84A",
        }}
      />

      {/* 下ライン */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: "#A8C84A",
        }}
      />

      {/* タイトル */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 800,
          color: "#eeeeee",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          marginBottom: 24,
        }}
      >
        TEA
      </div>

      {/* サブタイトル */}
      <div
        style={{
          fontSize: 24,
          color: "#A8C84A",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 40,
        }}
      >
        Software Engineer
      </div>

      {/* 説明文 */}
      <div
        style={{
          fontSize: 18,
          color: "rgba(238,238,238,0.5)",
          lineHeight: 1.6,
        }}
      >
        {SITE_DESCRIPTION}
      </div>

      {/* ドメイン */}
      <div
        style={{
          position: "absolute",
          bottom: 48,
          right: 80,
          fontSize: 16,
          color: "rgba(238,238,238,0.3)",
          letterSpacing: "0.1em",
        }}
      >
        {SITE_URL.replace(/^https?:\/\//, "")}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Cinzel",
          data: cinzelFont,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
