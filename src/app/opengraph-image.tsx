import { ImageResponse } from "next/og";

export const alt = "Kidleido — Magic Worlds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#173f73",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 24,
            marginBottom: 24,
          }}
        >
          <div style={{ width: 40, height: 40, borderRadius: 20, background: "#f4c95d" }} />
          <div style={{ width: 40, height: 40, borderRadius: 20, background: "#e86a5a" }} />
          <div style={{ width: 40, height: 40, borderRadius: 20, background: "#8fd6c2" }} />
        </div>
        <div style={{ fontSize: 130, fontWeight: 700, color: "#f4c95d", letterSpacing: -2 }}>
          Kidleido
        </div>
        <div style={{ fontSize: 52, color: "#ffffff", marginTop: 8 }}>Magic Worlds</div>
        <div style={{ fontSize: 30, color: "#8fd6c2", marginTop: 28 }}>
          Stories · Coloring · Adventures for kids
        </div>
      </div>
    ),
    { ...size }
  );
}
