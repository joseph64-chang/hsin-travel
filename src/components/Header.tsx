"use client";

import { useState } from "react";
import Link from "next/link";
import BrandMark from "./BrandMark";
import { useUserName } from "@/lib/user-name";

const NAV_LINKS = [
  { href: "/", label: "首頁" },
  { href: "/travel", label: "旅遊規劃" },
  { href: "/blog", label: "景點介紹" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { name } = useUserName();

  return (
    <header className="glass sticky top-0 z-50 border-x-0 border-t-0">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" onClick={() => setOpen(false)}>
            <BrandMark />
          </Link>
          {name && (
            <span className="hidden text-sm text-foreground/60 md:inline">
              嗨，{name} 👋
            </span>
          )}
        </div>

        <nav className="hidden items-center gap-8 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/travel" className="btn-primary !px-5 !py-2 text-sm">
            開始規劃
          </Link>
        </nav>

        <button
          type="button"
          aria-label="開啟選單"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/15 sm:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-4 w-4"
          >
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="glass flex flex-col gap-1 border-t-0 px-4 pb-4 sm:hidden">
          {name && (
            <p className="px-3 pb-2 text-sm text-foreground/60">嗨，{name} 👋</p>
          )}
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-white/40 dark:hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/travel"
            onClick={() => setOpen(false)}
            className="btn-primary mt-1 text-sm"
          >
            開始規劃
          </Link>
        </nav>
      )}
    </header>
  );
}
