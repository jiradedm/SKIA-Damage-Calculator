"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Languages } from "@/libs/i18n";

interface GeneralStore {
  language: Languages;
  setLanguage: (language: Languages) => void;
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => {
        set({ language });
      },
    }),
    {
      name: "general",
      partialize: (state) => ({ language: state.language }) as GeneralStore,
    },
  ),
);
