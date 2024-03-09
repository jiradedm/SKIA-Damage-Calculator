import "./globals.css";

import type { Metadata } from "next";
import { Kanit } from "next/font/google";

import Intitalize from "@/components/intitalize";
import Menu from "@/components/menu";

const font = Kanit({ weight: ["400", "500", "600", "700", "800", "900"], subsets: ["latin", "thai"] });

export const metadata: Metadata = {
  title: "Seven Knight Idle",
  description: 'Seven Knight Idle "description."',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <div className="relative flex min-h-[calc(100vh)] w-full justify-center overflow-auto bg-[#f2f1e9]">
          <div className="fixed z-[2] h-[68px] w-full bg-[#2f3745] outline outline-4 outline-[#585e68]" />
          <div className="relative w-full max-w-maxw bg-[#39465a] py-4">
            <Intitalize />
            <Menu />
            <div className="flex flex-col gap-3 px-2 pb-[140px] pt-[calc(5%+60px)] text-white">{children}</div>
            <div className="absolute inset-x-0 bottom-0 mx-4 flex w-[calc(100%-32px)] flex-col items-center justify-center gap-1 pb-3 text-center text-xs text-[#f2f1e9] opacity-70">
              <div className="text-xs">
                This is unofficial website and not affiliated in any way with Netmarble Corp.
              </div>
              {/* <div>Report Issues: </div> */}
              <div className="flex gap-1">
                <span>Thanks to</span>
                <a
                  className="underline"
                  href="https://docs.google.com/spreadsheets/d/1V4KSe15vo4o9m__LcVgfhjp9KyTiXjDzxhCtwLE3AyU"
                  target="_blank"
                >
                  Antharok
                </a>
                <span>for providing game information.</span>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
