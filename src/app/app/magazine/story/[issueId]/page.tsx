import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, pickText } from "@/lib/i18n";
import { getIssueById } from "@/lib/magazine";

export default async function MagazineStoryPage({
  params,
}: {
  params: Promise<{ issueId: string }>;
}) {
  const { issueId } = await params;
  const locale = await getLocale();
  const t = (o: { el: string; en: string }) => pickText(locale, o.el, o.en);

  const issue = getIssueById(issueId);
  const story = issue.articles.find((a) => a.id === "story");

  // Only issues that actually carry a full story get a reader page.
  if (!story || !story.fullStory) notFound();

  const paragraphs = locale === "en" ? story.fullStory.en : story.fullStory.el;
  const backLabel = locale === "en" ? "← Back to the magazine" : "← Πίσω στο περιοδικό";

  return (
    <div className="mx-auto max-w-2xl px-4 pt-4 pb-16">
      <Link
        href={`/app/magazine?issue=${issue.id}`}
        className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-purple shadow-sm ring-1 ring-brand-purple/10 transition hover:shadow"
      >
        {backLabel}
      </Link>

      <article className="mt-6 rounded-3xl bg-white p-6 shadow-md sm:p-10">
        <div className="flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-pink">
          <span className="text-2xl" aria-hidden="true">
            {story.emoji}
          </span>
          <span>{t(story.kicker)}</span>
        </div>

        <h1 className="mt-3 text-center text-2xl font-bold leading-tight text-brand-purple sm:text-3xl">
          {t(story.title)}
        </h1>

        <div className="mx-auto mt-6 flex max-w-prose flex-col gap-4 text-lg leading-relaxed text-foreground/90">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <p className="mt-10 text-center text-2xl" aria-hidden="true">
          ⭐ ✨ ⭐
        </p>
      </article>
    </div>
  );
}
