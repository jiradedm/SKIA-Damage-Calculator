import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { useGeneralStore } from "@/store";

const CheckIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 512 512" fill="currentColor">
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </svg>
  );
};

const SortButton: FC = () => {
  const { t } = useTranslation("page/character");

  const { sort, setSort } = useGeneralStore();

  return (
    <div
      className="flex w-fit cursor-pointer select-none items-center gap-1 self-end pr-[5%]"
      onClick={() => setSort(!sort)}
    >
      <div
        className={twMerge(
          "flex justify-center size-4 items-center rounded-sm border mt-0.5",
          sort ? "bg-[#53545b] border-[#8d8788] text-[#fdfdfb]" : "border-[#8d8788] bg-[#53545b]",
        )}
      >
        {!!sort && <CheckIcon />}
      </div>
      <div className="align-text-top">{t("sort")}</div>
    </div>
  );
};

export default SortButton;
