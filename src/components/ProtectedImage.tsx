"use client";

// Image wrapper that discourages casual copying:
// - disables right-click "save image", dragging and text selection
// - overlays a repeating, low-opacity watermark with the buyer's identity
//   (traceable if a screenshot is ever shared)
// NOTE: no web page can truly BLOCK OS-level screenshots — these are deterrents.

function xmlEscape(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Repeating diagonal watermark as an inline-SVG data URL, for use as a
// CSS background-image over any image container.
export function watermarkDataUrl(wm: string): string | null {
  const t = wm.trim();
  if (!t) return null;
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='170'><text x='12' y='95' transform='rotate(-28 150 85)' fill='rgba(23,63,115,0.13)' font-size='15' font-weight='bold' font-family='Arial, sans-serif'>${xmlEscape(
      t
    )}</text></svg>`
  )}`;
}

export default function ProtectedImage({
  src,
  alt,
  watermark,
  imgClassName = "block h-auto w-full rounded-2xl shadow-xl",
  wrapperClassName = "",
}: {
  src: string;
  alt: string;
  watermark?: string;
  imgClassName?: string;
  wrapperClassName?: string;
}) {
  const wmUrl = watermark ? watermarkDataUrl(watermark) : null;

  return (
    <div
      className={`relative select-none ${wrapperClassName}`}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        className={`${imgClassName} pointer-events-none select-none`}
        style={{
          WebkitUserSelect: "none",
          userSelect: "none",
          WebkitTouchCallout: "none",
        }}
      />
      {wmUrl && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url("${wmUrl}")`,
            backgroundRepeat: "repeat",
            borderRadius: "inherit",
          }}
        />
      )}
    </div>
  );
}
