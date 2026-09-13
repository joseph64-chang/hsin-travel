import Image from "next/image";
import Link from "next/link";

import Greeting from "@/components/Greeting";
import Parallax from "@/components/Parallax";
import {
  DOMESTIC_DESTINATIONS,
  INTERNATIONAL_DESTINATIONS,
  type Destination,
} from "@/lib/destinations";

const jiufen = DOMESTIC_DESTINATIONS.find((d) => d.slug === "jiufen")!.image;
const mountFuji = INTERNATIONAL_DESTINATIONS.find((d) => d.slug === "mount-fuji")!.image;
const aurora = INTERNATIONAL_DESTINATIONS.find((d) => d.slug === "aurora")!.image;

const STATS = [
  { value: "10+", label: "精選景點" },
  { value: "3", label: "行程方案比較" },
  { value: "<1", label: "分鐘生成行程" },
];

const FEATURES = [
  {
    title: "客製化條件",
    desc: "國內外、天數、預算、旅遊風格、交通與住宿，通通自己選。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <line x1="4" y1="6" x2="20" y2="6" />
        <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="7" cy="18" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "AI 即時規劃",
    desc: "送出條件後，AI 立即分析並產出符合需求的完整行程。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
      </svg>
    ),
  },
  {
    title: "多方案比較",
    desc: "一次取得至少 3 個風格各異的行程，直接比較後再決定。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path d="M3 13l9 5 9-5" />
      </svg>
    ),
  },
  {
    title: "BYOK，資料自己掌控",
    desc: "使用你自己的 OpenAI API Key，費用透明、金鑰只存在你的瀏覽器，不經過我們的伺服器。",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3 4 6v6c0 4.5 3.2 7.7 8 9 4.8-1.3 8-4.5 8-9V6l-8-3Z" />
        <path d="M9.5 12l1.8 1.8L15 10.2" />
      </svg>
    ),
  },
];

const STEPS = [
  { title: "選擇你的條件", desc: "國內或出國、天數、預算、旅遊風格，用選單和點選幾秒完成。" },
  { title: "AI 立即生成", desc: "送出後 AI 依你的條件即時分析，產出完整每日行程。" },
  { title: "比較後出發", desc: "一次取得 3 個風格不同的方案，直接比較、直接安排。" },
];

const FAQS = [
  {
    q: "需要付費才能使用嗎？",
    a: "Hsin Travel 本身免費使用，採 BYOK（Bring Your Own Key）模式，只要在「設定」頁輸入你自己的 OpenAI API Key 即可，實際費用依你的 OpenAI 帳單計算。",
  },
  {
    q: "我的 API Key 安全嗎？",
    a: "你的 API Key 只會儲存在你瀏覽器的 localStorage，並在呼叫行程規劃時直接由瀏覽器帶出，不會上傳或儲存在我們的伺服器。",
  },
  {
    q: "可以規劃國外行程嗎？",
    a: "可以，國內外景點都支援。在旅遊規劃頁選擇「國外」，再挑選想去的國家與地區即可。",
  },
  {
    q: "AI 生成的行程準確嗎？",
    a: "AI 會依你輸入的條件產生建議行程，方便你快速比較與規劃方向；實際出發前建議再次確認景點開放時間、交通與訂位資訊。",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-10 lg:py-28">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-7 lg:items-start lg:text-left">
          <Greeting />
          <span className="chip border-black/10 bg-white/50 text-foreground/70 dark:border-white/15 dark:bg-white/5">
            AI 旅遊行程規劃
          </span>
          <h1 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            幾個選擇，
            <br />
            規劃出屬於你的旅程
          </h1>
          <p className="max-w-lg text-sm leading-relaxed text-foreground/70 sm:text-base lg:text-lg">
            告訴我們你想去哪、玩幾天、預算多少，AI
            會立刻幫你生成多個客製化行程方案，讓你輕鬆比較、直接出發。
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/travel" className="btn-primary">
              立即開始規劃
            </Link>
            <a href="#destinations" className="btn-ghost">
              熱門景點
            </a>
          </div>

          <p className="text-xs text-foreground/50">
            免費使用・BYOK 自備 API Key・不需註冊帳號
          </p>
        </div>

        <div className="relative mx-auto hidden aspect-[4/5] w-full max-w-sm lg:block">
          <Parallax speed={0.12} className="absolute left-0 top-6 z-10 aspect-[3/4] w-[58%]">
            <div className="glass relative h-full w-full -rotate-6 overflow-hidden rounded-2xl shadow-xl">
              <Image src={jiufen} alt="九份老街" fill priority sizes="240px" className="object-cover" />
            </div>
          </Parallax>
          <Parallax speed={-0.1} className="absolute right-0 top-0 z-20 aspect-square w-[48%]">
            <div className="glass relative h-full w-full rotate-3 overflow-hidden rounded-2xl shadow-xl">
              <Image src={aurora} alt="極光" fill priority sizes="200px" className="object-cover" />
            </div>
          </Parallax>
          <Parallax speed={0.08} className="absolute bottom-0 left-[16%] z-30 aspect-[4/3] w-[58%]">
            <div className="glass relative h-full w-full rotate-2 overflow-hidden rounded-2xl shadow-2xl">
              <Image src={mountFuji} alt="富士山" fill priority sizes="240px" className="object-cover" />
            </div>
          </Parallax>
          <Parallax speed={0.05} className="absolute -left-6 bottom-10 z-40">
            <div className="glass flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium shadow-lg">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-sky-500 to-teal-400" />
              AI 即時生成行程
            </div>
          </Parallax>
        </div>

        <div className="glass relative aspect-[16/10] w-full overflow-hidden rounded-2xl lg:hidden">
          <Image
            src={jiufen}
            alt="九份老街"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 640px"
            className="object-cover"
          />
        </div>
      </section>

      <section className="border-y border-black/5 bg-white/30 py-8 backdrop-blur-md dark:border-white/10 dark:bg-white/[0.03]">
        <div className="mx-auto grid w-full max-w-4xl grid-cols-3 gap-4 px-4 text-center sm:px-6">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-display text-2xl font-semibold sm:text-4xl">{s.value}</span>
              <span className="text-xs text-foreground/60 sm:text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="mb-6 flex flex-col gap-1 text-center sm:mb-8">
          <span className="mx-auto chip border-black/10 bg-white/50 text-foreground/70 dark:border-white/15 dark:bg-white/5">
            功能特色
          </span>
          <h2 className="mt-3 font-display text-xl font-semibold sm:text-2xl">
            為什麼選擇 Hsin Travel
          </h2>
          <p className="text-sm text-foreground/60">一個工具，搞定選擇、規劃、比較。</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="glass relative flex flex-col gap-3 overflow-hidden rounded-2xl p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-400 text-white shadow-md shadow-sky-500/25 [&_svg]:h-5 [&_svg]:w-5">
                {f.icon}
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/70">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
        <div className="mb-6 flex flex-col gap-1 text-center sm:mb-8">
          <h2 className="font-display text-xl font-semibold sm:text-2xl">怎麼開始？三步驟就好</h2>
          <p className="text-sm text-foreground/60">從條件到行程，全程不用一分鐘。</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="glass relative flex flex-col gap-3 overflow-hidden rounded-2xl p-6">
              <span className="pointer-events-none absolute -right-3 -top-6 select-none font-display text-8xl font-bold text-foreground/[0.04]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-400 text-sm font-semibold text-white shadow-md shadow-sky-500/25">
                {i + 1}
              </span>
              <h3 className="font-display text-lg font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-foreground/70">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="destinations" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
        <div className="mb-6 flex flex-col gap-1 sm:mb-8">
          <h2 className="font-display text-xl font-semibold sm:text-2xl">熱門景點精選</h2>
          <p className="text-sm text-foreground/60">國內外人氣旅遊地，先看看有沒有你的口袋名單。</p>
        </div>

        <div className="flex flex-col gap-10">
          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold sm:text-lg">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-sky-500 to-teal-400" />
              國內經典景點
            </h3>
            <DestinationGrid destinations={DOMESTIC_DESTINATIONS} />
          </div>

          <div>
            <h3 className="mb-4 flex items-center gap-2 font-display text-base font-semibold sm:text-lg">
              <span className="h-2 w-2 rounded-full bg-gradient-to-br from-orange-400 to-rose-400" />
              海外經典景點
            </h3>
            <DestinationGrid destinations={INTERNATIONAL_DESTINATIONS} />
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6 md:pb-24">
        <div className="mb-6 flex flex-col gap-1 text-center sm:mb-8">
          <h2 className="font-display text-xl font-semibold sm:text-2xl">常見問題</h2>
          <p className="text-sm text-foreground/60">關於費用、資料安全與使用方式。</p>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map((item) => (
            <details key={item.q} className="glass group rounded-2xl p-5 open:pb-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium marker:content-none">
                {item.q}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-4 w-4 shrink-0 text-foreground/50 transition group-open:rotate-45"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 md:pb-24">
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-br from-sky-400/20 via-cyan-400/10 to-teal-300/20"
          />
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            準備好規劃你的下一趟旅程了嗎？
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-foreground/70 sm:text-base">
            現在就告訴我們你的條件，AI 立即為你生成專屬行程方案。
          </p>
          <Link href="/travel" className="btn-primary mt-6 inline-flex">
            立即開始規劃
          </Link>
          <p className="mt-4 text-xs text-foreground/50">
            免費使用・BYOK 自備 API Key・不需註冊帳號
          </p>
        </div>
      </section>
    </main>
  );
}

function DestinationGrid({ destinations }: { destinations: Destination[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {destinations.map((d) => (
        <div
          key={d.slug}
          className="glass group relative aspect-[4/5] overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <Image
            src={d.image}
            alt={d.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
            <p className="font-display text-sm font-semibold text-white sm:text-base">{d.name}</p>
            <p className="text-xs text-white/75">{d.place}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
