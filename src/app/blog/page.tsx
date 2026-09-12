import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { DOMESTIC_DESTINATIONS, INTERNATIONAL_DESTINATIONS, type Destination } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "景點介紹｜Hsin Travel",
  description: "國內外經典景點的必去賣點介紹，出發前先做功課。",
};

export default function BlogPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-14 px-4 py-14 sm:px-6 sm:py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="chip border-black/10 bg-white/50 text-foreground/70 dark:border-white/15 dark:bg-white/5">
          景點介紹
        </span>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          國內外經典景點，必去賣點一次看
        </h1>
        <p className="max-w-lg text-sm text-foreground/70 sm:text-base">
          出發前先認識這些經典景點的亮點，規劃行程時更有方向。
        </p>
      </div>

      <section className="flex flex-col gap-6">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold sm:text-2xl">
          <span className="h-2 w-2 rounded-full bg-gradient-to-br from-sky-500 to-teal-400" />
          國內經典景點
        </h2>
        <div className="flex flex-col gap-6">
          {DOMESTIC_DESTINATIONS.map((d, i) => (
            <DestinationArticle key={d.slug} destination={d} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="flex items-center gap-2 font-display text-xl font-semibold sm:text-2xl">
          <span className="h-2 w-2 rounded-full bg-gradient-to-br from-orange-400 to-rose-400" />
          海外經典景點
        </h2>
        <div className="flex flex-col gap-6">
          {INTERNATIONAL_DESTINATIONS.map((d, i) => (
            <DestinationArticle key={d.slug} destination={d} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      <div className="glass relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-400/20 via-cyan-400/10 to-teal-300/20"
        />
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          看完介紹，換 AI 幫你排進行程
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-foreground/70 sm:text-base">
          告訴我們你的條件，AI 立即為你生成包含這些景點的專屬行程方案。
        </p>
        <Link href="/travel" className="btn-primary mt-6 inline-flex">
          立即開始規劃
        </Link>
      </div>
    </main>
  );
}

function DestinationArticle({
  destination,
  reverse,
}: {
  destination: Destination;
  reverse?: boolean;
}) {
  return (
    <article
      className={`glass flex flex-col overflow-hidden rounded-3xl md:flex-row ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="relative aspect-[16/10] w-full md:aspect-auto md:w-2/5">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-3 p-6 sm:p-8">
        <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
          {destination.place}
        </span>
        <h3 className="font-display text-xl font-semibold sm:text-2xl">{destination.name}</h3>
        <p className="text-sm text-foreground/70 sm:text-base">{destination.tagline}</p>
        <ul className="mt-1 flex flex-col gap-2 text-sm text-foreground/80">
          {destination.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 h-4 w-4 shrink-0 text-sky-500"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
