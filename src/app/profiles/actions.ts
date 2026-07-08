"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { setActiveChildId } from "@/lib/session";
import { EMOJI_CHOICES, COLOR_CHOICES } from "@/lib/constants";

export async function selectChildAction(formData: FormData) {
  const childId = String(formData.get("childId") ?? "");
  if (!childId) return;
  await setActiveChildId(childId);
  redirect("/library");
}

export async function createChildAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const name = String(formData.get("name") ?? "").trim();
  const emoji = String(formData.get("emoji") ?? EMOJI_CHOICES[0]);
  if (!name) return;

  const color = COLOR_CHOICES[Math.floor(Math.random() * COLOR_CHOICES.length)];

  const child = await prisma.childProfile.create({
    data: {
      parentId: session.user.id,
      name,
      avatarEmoji: emoji,
      avatarColor: color,
    },
  });

  await setActiveChildId(child.id);
  redirect("/library");
}
