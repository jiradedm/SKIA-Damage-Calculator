"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { useGeneralStore } from "@/store";

interface IMenu {
  title: string;
  route: string;
}

const menus: IMenu[] = [
  { title: "Characters", route: "/" },
  { title: "Team", route: "/team" },
  { title: "Summon Character", route: "/add" },
  { title: "Global Stats", route: "/global" },
];

const Menu = () => {
  const { language, setLanguage } = useGeneralStore();
  const pathname = usePathname();

  const selectedIndex = useMemo(() => {
    return menus.findIndex((menu) => menu.route === pathname);
  }, [pathname]);

  return (
    <div className="fixed z-[3] w-full max-w-maxw px-2">
      <div className="grid grid-cols-[50px_auto_50px] justify-between pb-4 ">
        <div />
        <div className="text-stroke text-center text-2xl font-[500] leading-5 text-[#F4d77e]">
          SKIA Damage Calculator
        </div>
        <div className="flex gap-2 text-white">
          <div
            className={twMerge("cursor-pointer", language === "en" && "underline")}
            onClick={() => setLanguage("en")}
          >
            EN
          </div>
          <div
            className={twMerge("cursor-pointer", language === "th" && "underline")}
            onClick={() => setLanguage("th")}
          >
            TH
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
          className="absolute left-0 top-0 grid size-full h-full cursor-pointer text-[#b6cbcc]"
          style={{ gridTemplateColumns: `repeat(${menus.length}, minmax(0, 1fr))` }}
        >
          {menus.map((menu, index) => (
            <div key={index}>
              <Link href={menu.route} key={index}>
                <div
                  className={twMerge(
                    "h-full flex items-center justify-center text-center",
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
    </div>
  );
};

export default Menu;
