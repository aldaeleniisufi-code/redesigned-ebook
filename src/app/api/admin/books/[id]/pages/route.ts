// Bulk page upload endpoint: the admin bulk uploader POSTs one (compressed)
// image per request; each call appends a new page at the next order.
// One image per request keeps every request well under the serverless body
// limit, so a 100-page book uploads reliably with a progress bar.

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

  const { id: bookId } = await params;

  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) {
    return new Response("Book not found", { status: 404 });
  }

  const form = await request.formData();
  const image = form.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return new Response("Missing image", { status: 400 });
  }

  const locale = form.get("locale") === "en" ? "en" : "el";

  // order is global per book (el set then en set); the reader filters by
  // locale and sorts, so each language still shows in the right sequence.
  const last = await prisma.page.findFirst({
    where: { bookId },
    orderBy: { order: "desc" },
  });
  const order = (last?.order ?? 0) + 1;

  const imageUrl = await saveUploadedFile(image);
  await prisma.page.create({ data: { bookId, order, text: "", imageUrl, locale } });

  return Response.json({ ok: true, order, locale });
}
