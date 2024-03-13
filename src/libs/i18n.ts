"use client";

import i18next from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

export type Languages = "th" | "en";

export const languages: Languages[] = ["th", "en"];

export type LanguageData = Record<Languages, string>;

export const defaultLanguage: Languages = "en";

const ini18next = (lng: Languages = defaultLanguage) =>
  i18next
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init({ lng });

ini18next();
