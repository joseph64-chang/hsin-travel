"use client";

import { useState } from "react";
import { useUserName } from "@/lib/user-name";

export default function WelcomeModal() {
  const { name, setName } = useUserName();
  const [value, setValue] = useState("");

  if (name) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setName(value.trim() || "旅人");
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="glass w-full max-w-sm rounded-2xl p-6 sm:p-8"
      >
        <h2 className="font-display text-xl font-semibold sm:text-2xl">
          歡迎來到 Hsin Travel
        </h2>
        <p className="mt-2 text-sm text-foreground/70">
          怎麼稱呼你呢？我們會用這個名字歡迎你。
        </p>
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="請輸入你的稱呼"
          maxLength={20}
          className="input mt-5"
        />
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button type="submit" className="btn-primary flex-1">
            開始使用
          </button>
          <button type="button" onClick={() => setName("旅人")} className="btn-ghost flex-1">
            先隨便逛逛
          </button>
        </div>
      </form>
    </div>
  );
}
