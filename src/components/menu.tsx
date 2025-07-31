"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { useGeneralStore } from "@/store";

interface IMenu {
  title: string;
  route: string;
}

const Menu = () => {
  const { t } = useTranslation("common");
  const { language, setLanguage } = useGeneralStore();
  const pathname = usePathname();

  const menus = useMemo(
    () =>
      [
        { title: t("menu.character"), route: "/" },
        { title: t("menu.team"), route: "/team" },
        { title: t("menu.summon"), route: "/add" },
        { title: t("menu.stat"), route: "/global" },
      ] as IMenu[],
    [t],
  );

  const selectedIndex = useMemo(() => {
    return menus.findIndex((menu) => menu.route === pathname);
  }, [menus, pathname]);

  return (
    <div className="fixed z-[3] w-full max-w-maxw px-2">
      <div className="grid grid-cols-[62px_auto_62px] justify-between gap-1 pb-4">
        <div />
        <div className="text-stroke line-clamp-1 text-center text-2xl font-[500] leading-6 text-[#F4d77e]">
          {t("title")}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-white">
          <div
            className={twMerge("cursor-pointer", language === "th" && "underline")}
            onClick={() => setLanguage("th")}
          >
            ไทย
          </div>
          <div
            className={twMerge("cursor-pointer", language === "en" && "underline")}
            onClick={() => setLanguage("en")}
          >
            ENG
          </div>
        </div>
      </div>
      <div className="relative h-[36px] select-none rounded-full bg-[#53545b] px-2 py-1 leading-4 outline outline-2 outline-[#8d8788]">
        {selectedIndex !== -1 && (
          <div
            className="absolute top-[-2px] flex h-[calc(100%+4px)] cursor-pointer items-center justify-center rounded-full bg-[#243a4a] text-[#fdf4d4] outline outline-[3px] outline-[#44627e]"
            style={{ width: `${100 / menus.length}%`, left: `${selectedIndex * (100 / menus.length)}%` }}
          >
            <div className="flex size-[calc(100%-4px)] items-center justify-center rounded-full outline outline-2 outline-[#fdf4d4]" />
          </div>
        )}
        <div
          className="absolute left-0 top-0 grid size-full h-full cursor-pointer items-center text-[#b6cbcc]"
          style={{ gridTemplateColumns: `repeat(${menus.length}, minmax(0, 1fr))` }}
        >
          {menus.map((menu, index) => (
            <div key={index}>
              <Link href={menu.route} key={index}>
                <div
                  className={twMerge(
                    "h-full flex items-center justify-center text-center line-clamp-1 leading-5",
                    selectedIndex === index && "text-[#fcf4d3]",
                  )}
                >
                  {menu.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full text-center text-white">
        {`*i quit : `}
        <a className="hover:underline" target="_blank" href="https://github.com/jiradedm/SKIA-Damage-Calculator">
          source_code
        </a>
      </div>
    </div>
  );
};

export default Menu;
