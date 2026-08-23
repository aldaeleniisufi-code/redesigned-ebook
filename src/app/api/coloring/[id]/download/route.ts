// Downloads a purchased coloring sheet, enforcing a per-pack download limit.
// Online viewing/coloring/printing stay unlimited; only file downloads are counted.

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const DOWNLOAD_LIMIT = 5;
const ALLOWED_HOST_SUFFIX = ".public.blob.vercel-storage.com";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id: packId } = await params;
  const { searchParams } = new URL(request.url);
  const target = searchParams.get("u");
  if (!target) {
    return new Response("Missing url", { status: 400 });
  }

  let url: URL;
  try {
    url = new URL(target);
  } catch {
    return new Response("Invalid url", { status: 400 });
  }
  if (url.protocol !== "https:" || !url.hostname.endsWith(ALLOWED_HOST_SUFFIX)) {
    return new Response("Forbidden host", { status: 403 });
  }

  const pack = await prisma.coloringPack.findUnique({ where: { id: packId } });
  if (!pack || !pack.published) {
    return new Response("Not found", { status: 404 });
  }

  const isFree = pack.priceCents === 0;
  let remaining = DOWNLOAD_LIMIT;

  if (!isFree) {
    const purchase = await prisma.coloringPurchase.findUnique({
      where: { userId_packId: { userId: session.user.id, packId } },
    });
    if (!purchase) {
      return new Response("Not purchased", { status: 403 });
    }

    // Atomic increment guarded by the limit: updates 0 rows once the limit is hit.
    const result = await prisma.coloringPurchase.updateMany({
      where: {
        userId: session.user.id,
        packId,
        downloads: { lt: DOWNLOAD_LIMIT },
      },
      data: { downloads: { increment: 1 } },
    });

    if (result.count === 0) {
      return new Response(
        JSON.stringify({ error: "limit_reached", limit: DOWNLOAD_LIMIT }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    remaining = Math.max(0, DOWNLOAD_LIMIT - (purchase.downloads + 1));
  }

  const upstream = await fetch(url.toString());
  if (!upstream.ok || !upstream.body) {
    return new Response("Upstream error", { status: 502 });
  }

  const contentType =
    upstream.headers.get("content-type") ?? "application/octet-stream";
  const order = searchParams.get("order") ?? "1";

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="zografia-${order}.png"`,
      "Cache-Control": "no-store",
      "X-Downloads-Remaining": String(remaining),
    },
  });
}
