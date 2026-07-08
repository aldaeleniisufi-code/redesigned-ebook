"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function deleteChildAction(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return;

  const childId = String(formData.get("childId") ?? "");
  if (!childId) return;

  await prisma.childProfile.deleteMany({
    where: { id: childId, parentId: session.user.id },
  });

  revalidatePath("/parent");
}
