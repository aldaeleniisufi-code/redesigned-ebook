"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { saveProgressAction } from "@/app/books/[id]/actions";

type ReaderPage = {
  id: string;
  order: number;
  imageUrl: string;
  text: string;
};

export default function BookReader({
  bookId,
  title,
  pages,
  initialPage,
}: {
  bookId: string;
  title: string;
  pages: ReaderPage[];
  initialPage: number;
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

      <div className="relative h-[420px] w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-xl [perspective:1200px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page.id}
            custom={direction}
            initial={{ rotateY: direction > 0 ? 90 : -90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: direction > 0 ? -90 : 90, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 flex flex-col items-center gap-4 p-6 [transform-style:preserve-3d]"
          >
            <div className="relative h-56 w-full overflow-hidden rounded-2xl">
              <Image
                src={page.imageUrl}
                alt={`${title} - σελίδα ${page.order}`}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <p className="text-center text-lg leading-relaxed text-foreground">
              {page.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={() => goTo(index - 1)}
          disabled={isFirst}
          className="rounded-full bg-brand-purple px-6 py-3 font-bold text-white shadow transition hover:brightness-110 disabled:opacity-30"
        >
          ⬅ Πίσω
        </button>
        <span className="font-semibold text-foreground/70">
          Σελίδα {index + 1} / {pages.length}
        </span>
        {isLast ? (
          <Link
            href="/library"
            className="rounded-full bg-brand-teal px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            Τέλος 🎉
          </Link>
        ) : (
          <button
            onClick={() => goTo(index + 1)}
            className="rounded-full bg-brand-orange px-6 py-3 font-bold text-white shadow transition hover:brightness-110"
          >
            Μπρος ➡
          </button>
        )}
      </div>
    </div>
  );
}
