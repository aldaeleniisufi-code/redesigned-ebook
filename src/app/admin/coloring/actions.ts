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

export async function createPackAction(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "Ζωγραφιές").trim();
  const priceCents = parsePriceCents(formData);
  const cover = formData.get("cover");

  if (!title || !(cover instanceof File) || cover.size === 0) {
    redirect("/admin/coloring/new?error=1");
  }

  const coverImage = await saveUploadedFile(cover as File);

  const pack = await prisma.coloringPack.create({
    data: { title, description, category, priceCents, coverImage },
  });

  revalidatePath("/admin/coloring");
  redirect(`/admin/coloring/${pack.id}/edit`);
}

export async function updatePackAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "Ζωγραφιές").trim();
  const priceCents = parsePriceCents(formData);
  const cover = formData.get("cover");

  const data: Record<string, unknown> = { title, description, category, priceCents };
  if (cover instanceof File && cover.size > 0) {
    data.coverImage = await saveUploadedFile(cover);
  }

  await prisma.coloringPack.update({ where: { id }, data });

  revalidatePath("/admin/coloring");
  revalidatePath(`/admin/coloring/${id}/edit`);
  redirect(`/admin/coloring/${id}/edit`);
}

export async function togglePackPublishAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const pack = await prisma.coloringPack.findUnique({ where: { id } });
  if (!pack) return;
  await prisma.coloringPack.update({
    where: { id },
    data: { published: !pack.published },
  });
  revalidatePath("/admin/coloring");
  revalidatePath(`/admin/coloring/${id}/edit`);
}

export async function deletePackAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  await prisma.coloringPack.delete({ where: { id } });
  revalidatePath("/admin/coloring");
}

export async function addColoringPageAction(formData: FormData) {
  await requireAdmin();
  const packId = String(formData.get("packId") ?? "");
  const image = formData.get("image");

  if (!packId || !(image instanceof File) || image.size === 0) {
    redirect(`/admin/coloring/${packId}/edit?error=1`);
  }

  const lastPage = await prisma.coloringPage.findFirst({
    where: { packId },
    orderBy: { order: "desc" },
  });
  const order = (lastPage?.order ?? 0) + 1;

  const imageUrl = await saveUploadedFile(image as File);

  await prisma.coloringPage.create({ data: { packId, order, imageUrl } });

  revalidatePath(`/admin/coloring/${packId}/edit`);
  redirect(`/admin/coloring/${packId}/edit`);
}

export async function updateColoringPageAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const packId = String(formData.get("packId") ?? "");
  const order = Number(formData.get("order") ?? 1);
  const image = formData.get("image");

  const data: Record<string, unknown> = { order };
  if (image instanceof File && image.size > 0) {
    data.imageUrl = await saveUploadedFile(image);
  }

  await prisma.coloringPage.update({ where: { id }, data });

  revalidatePath(`/admin/coloring/${packId}/edit`);
  redirect(`/admin/coloring/${packId}/edit`);
}

export async function deleteColoringPageAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const packId = String(formData.get("packId") ?? "");
  await prisma.coloringPage.delete({ where: { id } });
  revalidatePath(`/admin/coloring/${packId}/edit`);
}
