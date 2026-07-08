import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { put } from "@vercel/blob";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "seed");

function ensureUploadsDir() {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Δημιουργεί μια απλή, χρωματιστή SVG εικόνα-placeholder (χωρίς εξωτερικό fetch).
// Ανεβαίνει στο Vercel Blob αν υπάρχει token, αλλιώς γράφεται τοπικά.
async function makePlaceholderSvg(opts: {
  filename: string;
  bgColor: string;
  emoji: string;
  label: string;
}): Promise<string> {
  const { filename, bgColor, emoji, label } = opts;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
  <rect width="900" height="700" fill="${bgColor}" rx="40" />
  <circle cx="450" cy="270" r="150" fill="rgba(255,255,255,0.25)" />
  <text x="450" y="330" font-size="180" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  <text x="450" y="560" font-size="42" font-family="sans-serif" font-weight="bold" fill="white" text-anchor="middle">${label}</text>
</svg>`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`uploads/seed/${filename}`, svg, {
      access: "public",
      contentType: "image/svg+xml",
    });
    return blob.url;
  }

  fs.writeFileSync(path.join(UPLOADS_DIR, filename), svg, "utf-8");
  return `/uploads/seed/${filename}`;
}

type PageSeed = { emoji: string; bg: string; label: string; text: string };

type BookSeed = {
  title: string;
  author: string;
  description: string;
  category: string;
  ageMin: number;
  ageMax: number;
  priceCents: number;
  coverEmoji: string;
  coverBg: string;
  pages: PageSeed[];
};

const books: BookSeed[] = [
  {
    title: "Ο Λέων και το Ποντικάκι",
    author: "Παραδοσιακό Παραμύθι",
    description:
      "Ένα μικρό ποντικάκι βοηθάει τον βασιλιά της ζούγκλας και μαθαίνουν πως η φιλία δεν έχει μέγεθος.",
    category: "Παραμύθι",
    ageMin: 3,
    ageMax: 6,
    priceCents: 199,
    coverEmoji: "🦁",
    coverBg: "#F59E0B",
    pages: [
      { emoji: "🌳", bg: "#84CC16", label: "Σελίδα 1", text: "Μια φορά κι έναν καιρό, σε ένα πυκνό δάσος, ζούσε ένα δυνατό λιοντάρι." },
      { emoji: "🐭", bg: "#22D3EE", label: "Σελίδα 2", text: "Ένα μικρό ποντικάκι έπαιζε κοντά του και κατά λάθος τον ξύπνησε." },
      { emoji: "🤝", bg: "#F472B6", label: "Σελίδα 3", text: "Το λιοντάρι θύμωσε, μα το ποντικάκι ζήτησε συγγνώμη και έγιναν φίλοι." },
      { emoji: "🕸️", bg: "#A78BFA", label: "Σελίδα 4", text: "Κάποια μέρα το λιοντάρι έπεσε σε παγίδα κυνηγών και δεν μπορούσε να ξεφύγει." },
      { emoji: "🎉", bg: "#FB923C", label: "Σελίδα 5", text: "Το ποντικάκι έφαγε τα σχοινιά και έσωσε τον φίλο του. Ζήσανε αυτοί καλά!" },
    ],
  },
  {
    title: "Ταξίδι στο Διάστημα",
    author: "Ελένη Αστρονόμου",
    description:
      "Ο μικρός Νίκος γίνεται αστροναύτης για μια νύχτα και εξερευνά τους πλανήτες του ηλιακού μας συστήματος.",
    category: "Περιπέτεια",
    ageMin: 5,
    ageMax: 9,
    priceCents: 299,
    coverEmoji: "🚀",
    coverBg: "#6366F1",
    pages: [
      { emoji: "🌌", bg: "#1E293B", label: "Σελίδα 1", text: "Μια νύχτα, ο Νίκος είδε ένα αστροσκάφος να προσγειώνεται στην αυλή του." },
      { emoji: "🪐", bg: "#7C3AED", label: "Σελίδα 2", text: "Μαζί με τον ρομποτικό του φίλο πέταξαν ψηλά, ψηλά, μέχρι τον Κρόνο." },
      { emoji: "☄️", bg: "#0EA5E9", label: "Σελίδα 3", text: "Είδαν έναν κομήτη να περνάει σαν φωτεινή ουρά μέσα στο σκοτάδι." },
      { emoji: "👽", bg: "#10B981", label: "Σελίδα 4", text: "Συνάντησαν έναν φιλικό εξωγήινο που τους κέρασε αστρικά γλυκά." },
      { emoji: "🌍", bg: "#3B82F6", label: "Σελίδα 5", text: "Στο τέλος γύρισαν στη Γη, κοιτάζοντας τον πλανήτη μας από ψηλά με θαυμασμό." },
    ],
  },
  {
    title: "Η Μικρή Γοργόνα και οι Φίλοι της",
    author: "Σοφία Κυματίδου",
    description:
      "Στα βάθη της θάλασσας, μια περίεργη γοργόνα ανακαλύπτει έναν κρυμμένο κόσμο γεμάτο χρώματα και φίλους.",
    category: "Φαντασία",
    ageMin: 4,
    ageMax: 8,
    priceCents: 349,
    coverEmoji: "🧜‍♀️",
    coverBg: "#06B6D4",
    pages: [
      { emoji: "🐚", bg: "#22D3EE", label: "Σελίδα 1", text: "Στα γαλάζια νερά ζούσε μια μικρή γοργόνα με μαλλιά σαν φύκια." },
      { emoji: "🐠", bg: "#F97316", label: "Σελίδα 2", text: "Έκανε φίλους με πολύχρωμα ψαράκια που της έδειχναν κρυμμένες σπηλιές." },
      { emoji: "🐢", bg: "#65A30D", label: "Σελίδα 3", text: "Μια σοφή χελώνα της είπε την ιστορία ενός χαμένου θησαυρού." },
      { emoji: "💎", bg: "#8B5CF6", label: "Σελίδα 4", text: "Μαζί βρήκαν το σεντούκι, γεμάτο μαργαριτάρια που έλαμπαν σαν αστέρια." },
      { emoji: "🌊", bg: "#0284C7", label: "Σελίδα 5", text: "Μοιράστηκαν τον θησαυρό με όλο το βασίλειο της θάλασσας και γιόρτασαν." },
    ],
  },
];

async function main() {
  ensureUploadsDir();

  const adminPassword = await bcrypt.hash("Admin123!", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@paidika-vivlia.gr" },
    update: {},
    create: {
      email: "admin@paidika-vivlia.gr",
      passwordHash: adminPassword,
      name: "Διαχειριστής",
      role: "ADMIN",
    },
  });

  const parentPassword = await bcrypt.hash("Goneas123!", 10);
  const parent = await prisma.user.upsert({
    where: { email: "goneas@example.com" },
    update: {},
    create: {
      email: "goneas@example.com",
      passwordHash: parentPassword,
      name: "Δοκιμαστικός Γονέας",
      role: "PARENT",
    },
  });

  const existingChild = await prisma.childProfile.findFirst({
    where: { parentId: parent.id, name: "Νίκος" },
  });
  const child =
    existingChild ??
    (await prisma.childProfile.create({
      data: {
        parentId: parent.id,
        name: "Νίκος",
        avatarEmoji: "🦊",
        avatarColor: "#FB923C",
      },
    }));

  for (let bookIndex = 0; bookIndex < books.length; bookIndex++) {
    const b = books[bookIndex];
    const slug = `book-${bookIndex + 1}`;
    const existing = await prisma.book.findFirst({ where: { title: b.title } });
    if (existing) continue;

    const coverImage = await makePlaceholderSvg({
      filename: `cover-${slug}.svg`,
      bgColor: b.coverBg,
      emoji: b.coverEmoji,
      label: b.title,
    });

    const book = await prisma.book.create({
      data: {
        title: b.title,
        author: b.author,
        description: b.description,
        coverImage,
        ageMin: b.ageMin,
        ageMax: b.ageMax,
        category: b.category,
        priceCents: b.priceCents,
        published: true,
      },
    });

    for (let i = 0; i < b.pages.length; i++) {
      const p = b.pages[i];
      const imageUrl = await makePlaceholderSvg({
        filename: `${slug}-page-${i + 1}.svg`,
        bgColor: p.bg,
        emoji: p.emoji,
        label: p.label,
      });
      await prisma.page.create({
        data: {
          bookId: book.id,
          order: i + 1,
          imageUrl,
          text: p.text,
        },
      });
    }
  }

  console.log("✅ Seed ολοκληρώθηκε.");
  console.log(`   Admin:  ${admin.email} / Admin123!`);
  console.log(`   Γονέας: ${parent.email} / Goneas123! (παιδικό προφίλ: ${child.name})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
