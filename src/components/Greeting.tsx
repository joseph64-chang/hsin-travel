"use client";

import { useUserName } from "@/lib/user-name";

export default function Greeting() {
  const { name } = useUserName();
  if (!name) return null;

  return (
    <p className="text-sm font-medium text-sky-600 dark:text-sky-400">
      嗨，{name}！歡迎回來 👋
    </p>
  );
}
