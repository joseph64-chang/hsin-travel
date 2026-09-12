"use client";

import { useEffect, useState } from "react";
import { useApiKey } from "@/lib/api-key";

export default function SettingsPage() {
  const { apiKey, setApiKey } = useApiKey();
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValue(apiKey ?? "");
  }, [apiKey]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setApiKey(value.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleClear() {
    setApiKey("");
    setValue("");
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-8 px-4 py-14 sm:px-6 sm:py-20">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="chip border-black/10 bg-white/50 text-foreground/70 dark:border-white/15 dark:bg-white/5">
          設定
        </span>
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          OpenAI API Key
        </h1>
        <p className="max-w-md text-sm text-foreground/70 sm:text-base">
          本站採 BYOK（Bring Your Own Key）模式，請輸入你自己的 OpenAI API Key。
          Key 僅會儲存在你瀏覽器的 localStorage，不會上傳到我們的伺服器。
        </p>
      </div>

      <form onSubmit={handleSave} className="glass flex flex-col gap-4 rounded-2xl p-6 sm:p-8">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground/80">API Key</span>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className="input pr-16"
              placeholder="sk-..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute inset-y-0 right-3 text-xs font-medium text-foreground/50 hover:text-foreground/80"
            >
              {show ? "隱藏" : "顯示"}
            </button>
          </div>
        </label>

        <div className="flex gap-3">
          <button type="submit" className="btn-primary flex-1">
            {saved ? "已儲存 ✓" : "儲存"}
          </button>
          <button type="button" onClick={handleClear} className="btn-ghost">
            清除
          </button>
        </div>

        <p className="text-xs text-foreground/50">
          還沒有 API Key？前往{" "}
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2"
          >
            platform.openai.com/api-keys
          </a>{" "}
          申請。
        </p>
      </form>
    </main>
  );
}
