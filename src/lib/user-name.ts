"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "hsin-travel-username";

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

export function setUserName(name: string) {
  try {
    localStorage.setItem(STORAGE_KEY, name);
  } catch {
    // ignore write failures (private mode, etc.)
  }
  emitChange();
}

export function useUserName() {
  const name = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { name, setName: setUserName };
}
