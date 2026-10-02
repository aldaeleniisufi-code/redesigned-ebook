// Bulk coloring-page upload: the admin bulk uploader POSTs one (compressed)
// image per request; each call appends a new sheet at the next order.

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const { id: packId } = await params;

  const pack = await prisma.coloringPack.findUnique({ where: { id: packId } });
  if (!pack) {
    return new Response("Pack not found", { status: 404 });
  }

  const form = await request.formData();
  const image = form.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return new Response("Missing image", { status: 400 });
  }

  const last = await prisma.coloringPage.findFirst({
    where: { packId },
    orderBy: { order: "desc" },
  });
  const order = (last?.order ?? 0) + 1;

  const imageUrl = await saveUploadedFile(image);
  await prisma.coloringPage.create({ data: { packId, order, imageUrl } });

  return Response.json({ ok: true, order });
}
