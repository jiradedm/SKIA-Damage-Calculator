"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useGeneralStore } from "@/store";

export default function InitialLanguage() {
  const { language } = useGeneralStore();

  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  return <></>;
}
