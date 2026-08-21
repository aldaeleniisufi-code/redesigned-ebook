"use server";

import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { sendEmail } from "@/lib/send-email";
import { confirmationEmailHtml } from "@/lib/email-templates";
import { getDict } from "@/lib/i18n";

export async function registerAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string } | undefined> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const d = await getDict();

  if (!name || !email || password.length < 6) {
    return { error: d.register.errorFields };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: d.register.errorExists };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { name, email, passwordHash, role: "PARENT" },
  });

  await sendEmail({
    to: email,
    subject: "Καλωσόρισες στο Kidleido! ✨",
    html: confirmationEmailHtml({ name }),
  });

  try {
    await signIn("credentials", { email, password, redirectTo: "/library" });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect("/login");
    }
    throw error;
  }
}
