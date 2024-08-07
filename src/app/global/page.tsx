"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import PortButton from "@/components/portButtonStat";
import Title from "@/components/title";
import type { StatKey } from "@/data/stat";
import type { GlobalStatData } from "@/store";
import { useStatStore } from "@/store";

import { StatItem } from "./component";

export default function GlobalStatPage() {
  const { t } = useTranslation("page/stat");

  const { globalStat } = useStatStore();

  const stats: GlobalStatData[] = useMemo(() => {
    const keys = Object.keys(globalStat) as StatKey[];
    const statKeys = keys.filter((key) => !key.startsWith("Enemy"));
    return statKeys.map((key) => ({ key, value: globalStat[key] }) as GlobalStatData);
  }, [globalStat]);

  const enemyStats: GlobalStatData[] = useMemo(() => {
    const keys = Object.keys(globalStat) as StatKey[];
    const statKeys = keys.filter((key) => key.startsWith("Enemy"));
    return statKeys.map((key) => ({ key, value: globalStat[key] }) as GlobalStatData);
  }, [globalStat]);

  return (
    <div className="flex w-full max-w-[400px] flex-col gap-3 self-center">
      <Title className="self-center text-3xl">{t("title")}</Title>
      <PortButton data={JSON.stringify({ globalStat })} />
      <Title>{t("character")}</Title>
      <div className="flex flex-col gap-2">
        {stats.map((stat, index) => {
          return <StatItem key={index} stat={stat} />;
        })}
      </div>
      <Title className="pt-5">{t("enemy")}</Title>
      <div className="flex flex-col gap-2">
        {enemyStats.map((stat, index) => (
          <StatItem key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
}
