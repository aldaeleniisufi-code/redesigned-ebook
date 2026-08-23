// Same-origin proxy for public Vercel Blob images.
// Lets the client download a coloring sheet with a proper filename and print it
// without relying on cross-origin fetches or pop-up windows.

const ALLOWED_HOST_SUFFIX = ".public.blob.vercel-storage.com";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("u");
  const download = searchParams.get("download") === "1";
  const name = searchParams.get("name");

  if (!target) {
    return new Response("Missing url", { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(target);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }

  // SSRF guard: only proxy files from our public blob storage.
  if (url.protocol !== "https:" || !url.hostname.endsWith(ALLOWED_HOST_SUFFIX)) {
    return new Response("Forbidden host", { status: 403 });
  }

  const upstream = await fetch(url.toString());
  if (!upstream.ok || !upstream.body) {
    return new Response("Upstream error", { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") ?? "application/octet-stream";
  const safeName = (name ?? "zografia").replace(/[^\w.\-]+/g, "_");
  const disposition = download
    ? `attachment; filename="${safeName}"`
    : "inline";

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": disposition,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
