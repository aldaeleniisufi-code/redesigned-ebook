"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function resetPasswordAction(formData: FormData) {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (!token) redirect("/forgot-password");
  if (password.length < 6) redirect(`/reset-password?token=${token}&error=short`);
  if (password !== confirm) redirect(`/reset-password?token=${token}&error=mismatch`);

  const rec = await prisma.passwordResetToken.findUnique({ where: { token } });
  if (!rec || rec.expiresAt < new Date()) {
    redirect("/forgot-password?expired=1");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: rec.userId },
    data: { passwordHash },
  });
  // invalidate the link(s) after use
  await prisma.passwordResetToken.deleteMany({ where: { userId: rec.userId } });

  redirect("/login?reset=1");
}
