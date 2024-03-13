import "./globals.css";

import type { Metadata } from "next";
import { Kanit } from "next/font/google";

import Footer from "@/components/footer";
import InitialLanguage from "@/components/initialLanguage";
import Intitalize from "@/components/intitalize";
import Menu from "@/components/menu";

const font = Kanit({ weight: ["400", "500", "600", "700", "800", "900"], subsets: ["latin", "thai"] });

export const metadata: Metadata = {
  title: "SKIA Damage Calculator",
  description: "Seven Knight Idle Adventure Damage Calculator",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.ico" sizes="any" />
      </head>
      <body className={font.className} suppressHydrationWarning={true}>
        <InitialLanguage />
        <Intitalize />
        <div className="relative flex min-h-[calc(100vh)] w-full justify-center overflow-auto bg-[#f2f1e9]">
          <div className="fixed z-[3] h-[68px] w-full bg-[#2f3745] outline outline-4 outline-[#585e68]" />
          <div className="relative w-full max-w-maxw bg-[#39465a] py-4">
            <Menu />
            <div className="flex flex-col gap-3 px-2 pb-[140px] pt-[calc(5%+60px)] text-white">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
