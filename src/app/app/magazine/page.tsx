import Link from "next/link";
import { getDict, getLocale, pickText } from "@/lib/i18n";
import { MAGAZINE_ISSUES, getIssueById } from "@/lib/magazine";

export default async function MagazinePage({
  searchParams,
}: {
  searchParams: Promise<{ issue?: string }>;
}) {
  const d = await getDict();
  const locale = await getLocale();
  const { issue: issueId } = await searchParams;
  const issue = getIssueById(issueId);
  const t = (o: { el: string; en: string }) => pickText(locale, o.el, o.en);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-4">
      <Link
        href="/app"
        className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-purple shadow-sm ring-1 ring-brand-purple/10 transition hover:shadow"
      >
        ← Kidleido
      </Link>

      <div className="py-6">
        <h1 className="mb-4 text-center text-2xl font-bold text-brand-purple sm:text-3xl">
          {d.magazine.title}
        </h1>

        {/* issue chips */}
        {MAGAZINE_ISSUES.length > 1 && (
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {[...MAGAZINE_ISSUES].reverse().map((iss) => (
              <Link
                key={iss.id}
                href={iss.id === getIssueById().id ? "/app/magazine" : `/app/magazine?issue=${iss.id}`}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
                  iss.id === issue.id
                    ? "bg-brand-purple text-white"
                    : "bg-brand-purple/8 text-brand-purple hover:bg-brand-purple/15"
                }`}
              >
                {t(iss.season)}
              </Link>
            ))}
          </div>
        )}

        {/* cover */}
        <div className="relative mb-8 overflow-hidden rounded-3xl bg-brand-purple px-6 py-10 text-center text-white shadow-lg">
          <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden="true">
            <span className="absolute left-6 top-6 text-2xl">⭐</span>
            <span className="absolute right-8 top-10 text-lg">⭐</span>
            <span className="absolute bottom-8 left-10 text-sm">⭐</span>
            <span className="absolute bottom-6 right-6 text-2xl">⭐</span>
          </div>
          <p className="relative mb-2 text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow">
            {t(issue.season)}
          </p>
          <h2 className="relative mx-auto max-w-md text-2xl font-bold leading-tight sm:text-3xl">
            {t(issue.title)}
          </h2>
        </div>

        {/* articles */}
        <div className="grid gap-5 sm:grid-cols-2">
          {issue.articles.map((art) => {
            const inner = (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-3xl" aria-hidden="true">
                    {art.emoji}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide opacity-70">
                    {t(art.kicker)}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-bold leading-tight">{t(art.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-90">{t(art.body)}</p>
                {art.href && art.cta && (
                  <span className="mt-3 inline-block rounded-full bg-black/15 px-4 py-1.5 text-sm font-bold">
                    {t(art.cta)} →
                  </span>
                )}
              </>
            );

            const base = "flex flex-col rounded-3xl p-5 shadow-md";

            return art.href ? (
              <Link
                key={art.id}
                href={art.href}
                className={`${base} ${art.className} transition hover:-translate-y-1 hover:shadow-xl`}
              >
                {inner}
              </Link>
            ) : (
              <div key={art.id} className={`${base} ${art.className}`}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
