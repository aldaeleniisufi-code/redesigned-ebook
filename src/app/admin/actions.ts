"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/upload";

async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/login");
  return session;
}

function parsePriceCents(formData: FormData, fallback = 299): number {
  const raw = String(formData.get("price") ?? "").replace(",", ".").trim();
  const euros = Number.parseFloat(raw);
  if (Number.isNaN(euros) || euros < 0) return fallback;
  return Math.round(euros * 100);
}

export async function createBookAction(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "Παραμύθι").trim();
  const ageMin = Number(formData.get("ageMin") ?? 3);
  const ageMax = Number(formData.get("ageMax") ?? 8);
  const priceCents = parsePriceCents(formData);
  const cover = formData.get("cover");

  if (!title || !(cover instanceof File) || cover.size === 0) {
    redirect("/admin/books/new?error=1");
  }

  const coverImage = await saveUploadedFile(cover as File);

  const book = await prisma.book.create({
    data: { title, author, description, category, ageMin, ageMax, priceCents, coverImage },
  });

  revalidatePath("/admin");
  redirect(`/admin/books/${book.id}/edit`);
}

export async function updateBookAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "Παραμύθι").trim();
  const ageMin = Number(formData.get("ageMin") ?? 3);
  const ageMax = Number(formData.get("ageMax") ?? 8);
  const priceCents = parsePriceCents(formData);
  const cover = formData.get("cover");

  const data: Record<string, unknown> = {
    title,
    author,
    description,
    category,
    ageMin,
    ageMax,
    priceCents,
  };

  if (cover instanceof File && cover.size > 0) {
    data.coverImage = await saveUploadedFile(cover);
  }

  await prisma.book.update({ where: { id }, data });

  revalidatePath("/admin");
  revalidatePath(`/admin/books/${id}/edit`);
  redirect(`/admin/books/${id}/edit`);
}

export async function togglePublishAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const book = await prisma.book.findUnique({ where: { id } });
  if (!book) return;
  await prisma.book.update({ where: { id }, data: { published: !book.published } });
  revalidatePath("/admin");
}

export async function deleteBookAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.book.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function addPageAction(formData: FormData) {
  await requireAdmin();
  const bookId = String(formData.get("bookId") ?? "");
  const text = String(formData.get("text") ?? "").trim();
  const image = formData.get("image");

  if (!bookId || !(image instanceof File) || image.size === 0) {
    redirect(`/admin/books/${bookId}/edit?error=1`);
  }

  const lastPage = await prisma.page.findFirst({
    where: { bookId },
    orderBy: { order: "desc" },
  });
  const order = (lastPage?.order ?? 0) + 1;

  const imageUrl = await saveUploadedFile(image as File);

  await prisma.page.create({ data: { bookId, order, text, imageUrl } });

  revalidatePath(`/admin/books/${bookId}/edit`);
  redirect(`/admin/books/${bookId}/edit`);
}

export async function updatePageAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const bookId = String(formData.get("bookId") ?? "");
  const order = Number(formData.get("order") ?? 1);
  const text = String(formData.get("text") ?? "").trim();
  const image = formData.get("image");

  const data: Record<string, unknown> = { order, text };
  if (image instanceof File && image.size > 0) {
    data.imageUrl = await saveUploadedFile(image);
  }

  await prisma.page.update({ where: { id }, data });

  revalidatePath(`/admin/books/${bookId}/edit`);
  redirect(`/admin/books/${bookId}/edit`);
}

export async function deletePageAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const bookId = String(formData.get("bookId") ?? "");
  await prisma.page.delete({ where: { id } });
  revalidatePath(`/admin/books/${bookId}/edit`);
}
