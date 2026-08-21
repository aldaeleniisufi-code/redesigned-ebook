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

function optText(formData: FormData, key: string): string | null {
  const v = String(formData.get(key) ?? "").trim();
  return v || null;
}

export async function createPackAction(formData: FormData) {
  await requireAdmin();

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "Ζωγραφιές").trim();
  const priceCents = parsePriceCents(formData);
  const cover = formData.get("cover");

  if (!(cover instanceof File) || cover.size === 0) {
    redirect("/admin/coloring/new?error=1");
  }

  const imageUrl = await saveUploadedFile(cover as File);

  const pack = await prisma.coloringPack.create({
    data: {
      title,
      titleEn: optText(formData, "titleEn"),
      description,
      descriptionEn: optText(formData, "descriptionEn"),
      category,
      categoryEn: optText(formData, "categoryEn"),
      priceCents,
      coverImage: imageUrl,
      pages: { create: { order: 1, imageUrl } },
    },
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

  const data: Record<string, unknown> = {
    title,
    titleEn: optText(formData, "titleEn"),
    description,
    descriptionEn: optText(formData, "descriptionEn"),
    category,
    categoryEn: optText(formData, "categoryEn"),
    priceCents,
  };
  if (cover instanceof File && cover.size > 0) {
    const imageUrl = await saveUploadedFile(cover);
    data.coverImage = imageUrl;
    const firstPage = await prisma.coloringPage.findFirst({
      where: { packId: id },
      orderBy: { order: "asc" },
    });
    if (firstPage) {
      await prisma.coloringPage.update({ where: { id: firstPage.id }, data: { imageUrl } });
    } else {
      await prisma.coloringPage.create({ data: { packId: id, order: 1, imageUrl } });
    }
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
