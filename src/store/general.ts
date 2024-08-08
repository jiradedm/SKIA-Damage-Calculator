"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Languages } from "@/libs/i18n";

interface GeneralStore {
  language: Languages;
  setLanguage: (language: Languages) => void;
  sort: boolean;
  setSort: (sort: boolean) => void;
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      language: "en",
      setLanguage: (language) => {
        set({ language });
      },
      sort: false,
      setSort: (sort) => set({ sort }),
    }),
    {
      name: "general",
      partialize: (state) => ({ language: state.language, sort: state.sort }) as GeneralStore,
    },
  ),
);
