"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { saveProgressAction } from "@/app/books/[id]/actions";

type ReaderPage = {
  id: string;
  order: number;
  imageUrl: string;
  text: string;
};

type ReaderLabels = {
  page: string;
  back: string;
  next: string;
  finish: string;
  pageLabel: string;
  of: string;
};

export default function BookReader({
  bookId,
  title,
  pages,
  initialPage,
  labels,
}: {
  bookId: string;
  title: string;
  pages: ReaderPage[];
  initialPage: number;
  labels: ReaderLabels;
}) {
  const [index, setIndex] = useState(
    Math.min(Math.max(initialPage, 0), pages.length - 1)
  );
  const [direction, setDirection] = useState(1);
  const [, startTransition] = useTransition();

  const page = pages[index];
  const isLast = index === pages.length - 1;
  const isFirst = index === 0;

  function goTo(newIndex: number) {
    if (newIndex < 0 || newIndex >= pages.length) return;
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
    startTransition(() => {
      saveProgressAction(bookId, newIndex, newIndex === pages.length - 1);
    });
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-brand-purple">{title}</h1>

      <div className="w-full max-w-md">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page.id}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex flex-col items-center gap-4"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={page.imageUrl}
              alt={`${title} - ${labels.page} ${page.order}`}
              className="block h-auto w-full rounded-2xl shadow-xl"
            />
            {page.text.trim() && (
              <p className="text-center text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                {page.text}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => goTo(index - 1)}
          disabled={isFirst}
          className="rounded-full bg-brand-purple px-6 py-3 font-bold text-white shadow transition hover:brightness-110 disabled:opacity-30"
        >
          {labels.back}
        </button>
        <span className="font-semibold text-foreground/70">
          {labels.pageLabel} {index + 1} {labels.of} {pages.length}
        </span>
        {isLast ? (
          <Link
            href="/library"
            className="rounded-full bg-brand-teal px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            {labels.finish}
          </Link>
        ) : (
          <button
            onClick={() => goTo(index + 1)}
            className="rounded-full bg-brand-orange px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            {labels.next}
          </button>
        )}
      </div>
    </div>
  );
}
