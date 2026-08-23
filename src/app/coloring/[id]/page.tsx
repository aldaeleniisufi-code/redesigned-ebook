import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  hasColoringPurchase,
  recordColoringPurchase,
} from "@/lib/coloring-purchases";
import { getStripeClient } from "@/lib/stripe";
import Paywall from "@/components/Paywall";
import ColoringViewer from "@/components/ColoringViewer";
import { getDict, getLocale, pickText } from "@/lib/i18n";
import { createColoringCheckoutAction } from "./actions";

export default async function ColoringPackPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role === "ADMIN") redirect("/admin/coloring");

  const { id } = await params;
  const { session_id } = await searchParams;
  const d = await getDict();
  const locale = await getLocale();

  const pack = await prisma.coloringPack.findUnique({
    where: { id },
    include: { pages: { orderBy: { order: "asc" } } },
  });

  if (!pack || !pack.published) notFound();

  const displayTitle = pickText(locale, pack.title, pack.titleEn).trim() || d.coloring.untitled;
  const displayDescription = pickText(locale, pack.description, pack.descriptionEn);

  const isFree = pack.priceCents === 0;
  let purchased = isFree || (await hasColoringPurchase(session.user.id, pack.id));

  // Runs on both the first purchase and a repeat purchase (to refill downloads).
  if (!isFree && session_id) {
    const stripe = getStripeClient();
    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    if (
      checkoutSession.payment_status === "paid" &&
      checkoutSession.metadata?.packId === pack.id &&
      checkoutSession.metadata?.userId === session.user.id
    ) {
      await recordColoringPurchase(session.user.id, pack.id, checkoutSession.id);
      purchased = true;
    }
  }

  if (!purchased) {
    return (
      <Paywall
        action={createColoringCheckoutAction}
        idField="packId"
        idValue={pack.id}
        title={displayTitle}
        description={displayDescription}
        coverImage={pack.coverImage}
        priceCents={pack.priceCents}
        note={d.coloring.note}
        buyLabel={d.coloring.buy}
      />
    );
  }

  const purchase = isFree
    ? null
    : await prisma.coloringPurchase.findUnique({
        where: { userId_packId: { userId: session.user.id, packId: pack.id } },
      });

  return (
    <ColoringViewer
      title={displayTitle}
      pages={pack.pages.map((p) => ({ id: p.id, order: p.order, imageUrl: p.imageUrl }))}
      packId={pack.id}
      isFree={isFree}
      downloadsUsed={purchase?.downloads ?? 0}
      downloadLimit={5}
      priceCents={pack.priceCents}
      buyAgainAction={createColoringCheckoutAction}
      labels={{
        sheet: d.coloring.sheet,
        download: d.coloring.download,
        print: d.coloring.print,
        colorDigitally: d.coloring.colorDigitally,
        close: d.coloring.close,
        brush: d.coloring.brush,
        eraser: d.coloring.eraser,
        clear: d.coloring.clear,
        downloadDrawing: d.coloring.downloadDrawing,
        downloadsRemaining: d.coloring.downloadsRemaining,
        limitReached: d.coloring.limitReached,
        buyAgain: d.coloring.buyAgain,
      }}
    />
  );
}
