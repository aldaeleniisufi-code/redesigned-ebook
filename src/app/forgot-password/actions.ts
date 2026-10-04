"use server";

import { randomBytes } from "node:crypto";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { passwordResetEmailHtml } from "@/lib/email-templates";

export async function requestPasswordResetAction(formData: FormData) {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();

  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      // one active reset link per user
      await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } });
      const token = randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
      await prisma.passwordResetToken.create({
        data: { token, userId: user.id, expiresAt },
      });
      const base = process.env.APP_URL ?? "https://kidleido.com";
      const resetUrl = `${base}/reset-password?token=${token}`;
      await sendEmail({
        to: user.email,
        subject: "Επαναφορά κωδικού — Kidleido 🔑",
        html: passwordResetEmailHtml({ name: user.name, resetUrl }),
      });
    }
  }

  // Always the same result, so we never reveal whether an email exists.
  redirect("/forgot-password?sent=1");
}
