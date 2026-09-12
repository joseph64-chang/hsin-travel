import Link from "next/link";
import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="glass mt-16 border-x-0 border-b-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
        <div className="flex flex-col gap-3">
          <BrandMark />
          <p className="max-w-xs text-sm text-foreground/60">
            用 AI 為你量身規劃行程，幾個選擇，馬上生成專屬旅遊方案。
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-foreground/80">導覽</span>
          <Link href="/" className="text-foreground/60 transition hover:text-foreground">
            首頁
          </Link>
          <Link
            href="/travel"
            className="text-foreground/60 transition hover:text-foreground"
          >
            旅遊規劃
          </Link>
          <Link href="/blog" className="text-foreground/60 transition hover:text-foreground">
            景點介紹
          </Link>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-foreground/80">關於</span>
          <p className="text-foreground/60">
            Hsin Travel 是一個示範用的 AI 旅遊行程規劃工具。
          </p>
        </div>
      </div>

      <div className="border-t border-black/5 px-4 py-4 text-center text-xs text-foreground/50 dark:border-white/10 sm:px-6">
        © {new Date().getFullYear()} Hsin Travel. All rights reserved.
      </div>
    </footer>
  );
}
