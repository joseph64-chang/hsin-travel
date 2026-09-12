"use client";

import { useState } from "react";
import Link from "next/link";
import { useApiKey } from "@/lib/api-key";
import {
  REGION_OPTIONS,
  DOMESTIC_AREA_OPTIONS,
  INTERNATIONAL_AREA_GROUPS,
  DAYS_OPTIONS,
  BUDGET_OPTIONS,
  ADULT_OPTIONS,
  CHILDREN_OPTIONS,
  CHILD_AGE_OPTIONS,
  STYLE_OPTIONS,
  TRIP_MODE_OPTIONS,
  TRANSPORT_OPTIONS,
  ACCOMMODATION_OPTIONS,
} from "@/lib/travel-options";
import type { TravelPreferences, TravelRecommendation } from "@/lib/types/travel";

function getTodayISO() {
  return new Date().toISOString().slice(0, 10);
}

export default function TravelPage() {
  const { apiKey } = useApiKey();
  const [region, setRegion] = useState<string>(REGION_OPTIONS[0]);
  const [area, setArea] = useState<string>(DOMESTIC_AREA_OPTIONS[0]);
  const [departureDate, setDepartureDate] = useState<string>(getTodayISO());
  const [days, setDays] = useState<string>(DAYS_OPTIONS[2]);
  const [budget, setBudget] = useState<string>(BUDGET_OPTIONS[1]);
  const [adults, setAdults] = useState<string>(ADULT_OPTIONS[1]);
  const [children, setChildren] = useState<string>(CHILDREN_OPTIONS[0]);
  const [childrenAges, setChildrenAges] = useState<string[]>([]);
  const [styles, setStyles] = useState<string[]>([]);
  const [tripMode, setTripMode] = useState<string>(TRIP_MODE_OPTIONS[1]);
  const [transportation, setTransportation] = useState<string>(TRANSPORT_OPTIONS[0]);
  const [accommodation, setAccommodation] = useState<string>(ACCOMMODATION_OPTIONS[0]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<TravelRecommendation[] | null>(
    null
  );

  function handleRegionChange(value: string) {
    setRegion(value);
    setArea(value === "國內" ? DOMESTIC_AREA_OPTIONS[0] : INTERNATIONAL_AREA_GROUPS[0].countries[0]);
  }

  function toggleStyle(style: string) {
    setStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  }

  function handleChildrenChange(value: string) {
    setChildren(value);
    const count = Number(value);
    setChildrenAges((prev) => {
      const next = prev.slice(0, count);
      while (next.length < count) next.push(CHILD_AGE_OPTIONS[5]);
      return next;
    });
  }

  function handleChildAgeChange(index: number, value: string) {
    setChildrenAges((prev) => prev.map((age, i) => (i === index ? value : age)));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!apiKey) {
      setError("尚未設定 OpenAI API Key，請先前往「設定」頁面輸入你的 API Key。");
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendations(null);

    const preferences: TravelPreferences = {
      region,
      area,
      departureDate,
      days,
      budget,
      adults,
      children,
      childrenAges,
      styles,
      tripMode,
      transportation,
      accommodation,
    };

    try {
      const res = await fetch("/api/travel/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-openai-key": apiKey,
        },
        body: JSON.stringify(preferences),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "推薦行程失敗，請稍後再試。");
      }
      setRecommendations(data.recommendations);
    } catch (err) {
      setError(err instanceof Error ? err.message : "發生未知錯誤");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-4 py-14 sm:px-6 sm:py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="chip border-black/10 bg-white/50 text-foreground/70 dark:border-white/15 dark:bg-white/5">
          旅遊客製化推薦
        </span>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          規劃你的下一趟旅程
        </h1>
        <p className="max-w-lg text-sm text-foreground/70 sm:text-base">
          選擇你的旅遊條件，AI 會為你生成至少 3 個專屬行程方案。
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass grid grid-cols-1 gap-6 rounded-2xl p-6 sm:grid-cols-2 sm:p-8"
      >
        <Field label="國內或國外">
          <select
            className="select"
            value={region}
            onChange={(e) => handleRegionChange(e.target.value)}
          >
            {REGION_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field label={region === "國內" ? "地區" : "國家"}>
          <select className="select" value={area} onChange={(e) => setArea(e.target.value)}>
            {region === "國內"
              ? DOMESTIC_AREA_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))
              : INTERNATIONAL_AREA_GROUPS.map((group) => (
                  <optgroup key={group.continent} label={group.continent}>
                    {group.countries.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </optgroup>
                ))}
          </select>
        </Field>

        <Field label="預計出發日期">
          <input
            type="date"
            className="input"
            value={departureDate}
            min={getTodayISO()}
            onChange={(e) => setDepartureDate(e.target.value)}
            required
          />
        </Field>

        <Field label="天數">
          <select className="select" value={days} onChange={(e) => setDays(e.target.value)}>
            {DAYS_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field label="預算">
          <select
            className="select"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            {BUDGET_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field label="大人人數">
          <select className="select" value={adults} onChange={(e) => setAdults(e.target.value)}>
            {ADULT_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o} 位
              </option>
            ))}
          </select>
        </Field>

        <Field label="小孩人數">
          <select
            className="select"
            value={children}
            onChange={(e) => handleChildrenChange(e.target.value)}
          >
            {CHILDREN_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o} 位
              </option>
            ))}
          </select>
        </Field>

        {childrenAges.length > 0 && (
          <Field label="小孩年紀" full>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {childrenAges.map((age, i) => (
                <label key={i} className="flex flex-col gap-1.5 text-sm">
                  <span className="text-xs text-foreground/60">第 {i + 1} 位小孩</span>
                  <select
                    className="select"
                    value={age}
                    onChange={(e) => handleChildAgeChange(i, e.target.value)}
                  >
                    {CHILD_AGE_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </Field>
        )}

        <Field label="包車或自由行">
          <select
            className="select"
            value={tripMode}
            onChange={(e) => setTripMode(e.target.value)}
          >
            {TRIP_MODE_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field label="交通選擇">
          <select
            className="select"
            value={transportation}
            onChange={(e) => setTransportation(e.target.value)}
          >
            {TRANSPORT_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field label="住宿選擇">
          <select
            className="select"
            value={accommodation}
            onChange={(e) => setAccommodation(e.target.value)}
          >
            {ACCOMMODATION_OPTIONS.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </Field>

        <Field label="旅遊屬性（可複選）" full>
          <div className="flex flex-wrap gap-2">
            {STYLE_OPTIONS.map((o) => {
              const active = styles.includes(o);
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggleStyle(o)}
                  aria-pressed={active}
                  className={`chip ${
                    active
                      ? "border-transparent bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-400 text-white shadow-md shadow-sky-500/25"
                      : "border-black/10 bg-white/40 text-foreground/70 hover:bg-white/60 dark:border-white/15 dark:bg-white/5 dark:hover:bg-white/10"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </Field>

        <div className="sm:col-span-2">
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "AI 規劃中…" : "產生推薦行程"}
          </button>
        </div>
      </form>

      {error && (
        <p className="glass rounded-xl border-red-400/40 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          {error}
          {!apiKey && (
            <>
              {" "}
              <Link href="/settings" className="underline underline-offset-2">
                前往設定
              </Link>
            </>
          )}
        </p>
      )}

      {recommendations && (
        <div className="flex flex-col gap-6">
          {recommendations.map((rec, i) => (
            <RecommendationCard key={i} rec={rec} />
          ))}
        </div>
      )}
    </main>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${full ? "sm:col-span-2" : ""}`}>
      <span className="font-medium text-foreground/80">{label}</span>
      {children}
    </label>
  );
}

function RecommendationCard({ rec }: { rec: TravelRecommendation }) {
  return (
    <article className="glass overflow-hidden rounded-2xl p-6 transition hover:-translate-y-0.5 sm:p-8">
      <h2 className="font-display text-xl font-semibold sm:text-2xl">{rec.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-foreground/75">{rec.summary}</p>

      <dl className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            預估花費
          </dt>
          <dd className="mt-0.5">{rec.estimatedBudget}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            交通
          </dt>
          <dd className="mt-0.5">{rec.transportation}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-foreground/50">
            住宿
          </dt>
          <dd className="mt-0.5">{rec.accommodation}</dd>
        </div>
      </dl>

      {rec.highlights?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {rec.highlights.map((h, i) => (
            <span
              key={i}
              className="rounded-full bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-teal-400/10 px-3 py-1 text-xs font-medium text-foreground/80 ring-1 ring-inset ring-black/5 dark:ring-white/10"
            >
              {h}
            </span>
          ))}
        </div>
      )}

      {rec.dailyItinerary?.length > 0 && (
        <ol className="mt-6 flex flex-col gap-4 border-t border-black/5 pt-5 dark:border-white/10">
          {rec.dailyItinerary.map((day) => (
            <li key={day.day} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-400 text-xs font-semibold text-white">
                {day.day}
              </span>
              <div>
                <p className="text-sm font-medium">{day.title}</p>
                <ul className="mt-1 list-inside list-disc text-sm text-foreground/70">
                  {day.activities.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      )}
    </article>
  );
}
