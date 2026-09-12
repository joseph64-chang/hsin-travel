"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "hsin-travel-openai-key";

type Listener = () => void;
let listeners: Listener[] = [];

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener) {
  listeners = [...listeners, listener];
  window.addEventListener("storage", emitChange);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
    window.removeEventListener("storage", emitChange);
  };
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerSnapshot() {
  return null;
}

export function setApiKey(key: string) {
  try {
    if (key) {
      localStorage.setItem(STORAGE_KEY, key);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore write failures (private mode, etc.)
  }
  emitChange();
}

export function getApiKey() {
  return getSnapshot();
}

export function useApiKey() {
  const apiKey = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { apiKey, setApiKey };
}
