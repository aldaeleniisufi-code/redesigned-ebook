import { prisma } from "@/lib/prisma";

// Κάθε χρήστης έχει ένα μόνο προφίλ. Επιστρέφει το id του (δημιουργώντας το αν
// δεν υπάρχει). Το ίδιο profile χρησιμοποιείται για πρόοδο ανάγνωσης κ.λπ.
export async function getOrCreateProfileId(userId: string): Promise<string> {
  const existing = await prisma.childProfile.findFirst({
    where: { parentId: userId },
    orderBy: { createdAt: "asc" },
  });
  if (existing) return existing.id;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const created = await prisma.childProfile.create({
    data: {
      parentId: userId,
      name: user?.name ?? "Προφίλ",
    },
  });
  return created.id;
}
