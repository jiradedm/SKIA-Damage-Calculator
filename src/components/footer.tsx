"use client";

import type { FC } from "react";
import React from "react";
import { useTranslation } from "react-i18next";

const Footer: FC = () => {
  const { t } = useTranslation("common");

  return (
    <div className="absolute inset-x-0 bottom-0 mx-4 flex w-[calc(100%-32px)] flex-col items-center justify-center gap-1 pb-3 text-center text-xs text-[#f2f1e9] opacity-70">
      <div className="text-xs">{t("footer.unofficial")}</div>
    </div>
  );
};

export default Footer;
