import { getDict } from "@/lib/i18n";
import { SOCIAL_LINKS } from "@/lib/links";

function SocialIcon({ name }: { name: string }) {
  const common = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "currentColor" };
  switch (name) {
    case "Instagram":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.9.07s-3.63-.01-4.9-.07c-1.17-.05-1.8-.25-2.23-.42a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.17-.42-.37-1.06-.42-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.4 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.5.01-4.74.07-.9.04-1.38.19-1.7.32-.43.16-.74.36-1.06.68-.32.32-.52.63-.68 1.06-.13.32-.28.8-.32 1.7C3.44 9.05 3.43 9.4 3.43 12s.01 2.95.07 4.19c.04.9.19 1.38.32 1.7.16.43.36.74.68 1.06.32.32.63.52 1.06.68.32.13.8.28 1.7.32 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.9-.04 1.38-.19 1.7-.32.43-.16.74-.36 1.06-.68.32-.32.52-.63.68-1.06.13-.32.28-.8.32-1.7.06-1.24.07-1.6.07-4.19s-.01-2.95-.07-4.19c-.04-.9-.19-1.38-.32-1.7a2.85 2.85 0 0 0-.68-1.06 2.85 2.85 0 0 0-1.06-.68c-.32-.13-.8-.28-1.7-.32C15.5 4.01 15.14 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.6a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
        </svg>
      );
    case "Facebook":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
        </svg>
      );
    case "YouTube":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M23.5 6.5a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.5C0 8.38 0 12 0 12s0 3.62.5 5.5a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.62 24 12 24 12s0-3.62-.5-5.5ZM9.6 15.57V8.43L15.82 12 9.6 15.57Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default async function Footer() {
  const d = await getDict();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-brand-purple text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 text-center">
        <div className="flex items-center gap-2 text-2xl font-bold">
          <span>📚</span>
          <span>{d.brand}</span>
        </div>
        <p className="text-sm text-white/70">{d.footer.tagline}</p>

        <p className="mt-2 text-sm font-semibold text-white/80">{d.footer.follow}</p>
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:scale-110 hover:bg-brand-yellow hover:text-brand-purple"
            >
              <SocialIcon name={s.name} />
            </a>
          ))}
        </div>

        <p className="mt-4 text-xs text-white/50">
          © {year} {d.brand}
        </p>
      </div>
    </footer>
  );
}
