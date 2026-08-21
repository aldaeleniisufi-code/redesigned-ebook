import { revalidatePath } from "next/cache";
import { getLocale, setLocale, type Locale } from "@/lib/i18n";

async function switchLocaleAction(formData: FormData) {
  "use server";
  const next = formData.get("locale");
  if (next === "el" || next === "en") {
    await setLocale(next as Locale);
  }
  revalidatePath("/", "layout");
}

export default async function LanguageSwitcher() {
  const locale = await getLocale();

  return (
    <form action={switchLocaleAction} className="flex items-center gap-1 rounded-full bg-white/15 p-1">
      <button
        type="submit"
        name="locale"
        value="el"
        className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
          locale === "el" ? "bg-white text-brand-purple" : "text-white hover:bg-white/20"
        }`}
      >
        ΕΛ
      </button>
      <button
        type="submit"
        name="locale"
        value="en"
        className={`rounded-full px-2.5 py-1 text-xs font-bold transition ${
          locale === "en" ? "bg-white text-brand-purple" : "text-white hover:bg-white/20"
        }`}
      >
        EN
      </button>
    </form>
  );
}
