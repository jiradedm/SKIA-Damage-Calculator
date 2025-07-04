import { useClipboard } from "@mantine/hooks";
import type { ComponentPropsWithoutRef, FC } from "react";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { StatItem } from "@/app/global/component";
import Title from "@/components/title";
import type { StatKey } from "@/data/stat";
// import { character } from "@/data/character";
import type { GlobalStat, GlobalStatData } from "@/store";
import { getGlobalStat, globalStatObject, useStatStore } from "@/store";

import Button, { SmallButton } from "./button";
import Modal from "./modal";

const ImportIcon: FC<ComponentPropsWithoutRef<"svg">> = ({ className, ...prop }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 537.795 537.795"
      fill="currentColor"
      className={twMerge("size-[14px]", className)}
      {...prop}
    >
      <path d="M463.091,466.114H74.854c-11.857,0-21.497,9.716-21.497,21.497v28.688c0,11.857,9.716,21.496,21.497,21.496h388.084 c11.857,0,21.496-9.716,21.496-21.496v-28.688C484.665,475.677,474.949,466.114,463.091,466.114z" />
      <path d="M253.94,427.635c4.208,4.208,9.716,6.35,15.147,6.35c5.508,0,11.016-2.142,15.147-6.35l147.033-147.033 c8.339-8.338,8.339-21.955,0-30.447l-20.349-20.349c-8.339-8.339-21.956-8.339-30.447,0l-75.582,75.659V21.497 C304.889,9.639,295.173,0,283.393,0h-28.688c-11.857,0-21.497,9.562-21.497,21.497v284.044l-75.658-75.659 c-8.339-8.338-22.032-8.338-30.447,0l-20.349,20.349c-8.338,8.338-8.338,22.032,0,30.447L253.94,427.635z" />
    </svg>
  );
};

const CopyIcon: FC<ComponentPropsWithoutRef<"svg">> = ({ className, ...prop }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      fill="currentColor"
      className={twMerge("size-[20px]", className)}
      {...prop}
    >
      <path d="M38,16c0-2.2-1.8-4-4-4H8c-2.2,0-4,1.8-4,4v30c0,2.2,1.8,4,4,4h26c2.2,0,4-1.8,4-4V16z M20,23  c0,0.6-0.4,1-1,1h-8c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1V23z M28,39c0,0.6-0.4,1-1,1H11c-0.6,0-1-0.4-1-1v-2  c0-0.6,0.4-1,1-1h16c0.6,0,1,0.4,1,1V39z M32,31c0,0.6-0.4,1-1,1H11c-0.6,0-1-0.4-1-1v-2c0-0.6,0.4-1,1-1h20c0.6,0,1,0.4,1,1V31z" />
      <path d="M44,2H18c-2.2,0-4,1.8-4,4v2h24c2.2,0,4,1.8,4,4v28h2c2.2,0,4-1.8,4-4V6C48,3.8,46.2,2,44,2z" />
    </svg>
  );
};

// DUPS ????
const CheckIcon: FC<ComponentPropsWithoutRef<"svg">> = ({ className, ...prop }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      fill="currentColor"
      className={twMerge("size-[20px]", className)}
      {...prop}
    >
      <path d="M19.1,42.5L2.6,25.9c-0.6-0.6-0.6-1.6,0-2.2l2.2-2.2c0.6-0.6,1.6-0.6,2.2,0L19.4,34c0.4,0.4,1.1,0.4,1.5,0 L45.2,9.5c0.6-0.6,1.6-0.6,2.2,0l2.2,2.2c0.6,0.6,0.6,1.6,0,2.2L21.3,42.5C20.7,43.2,19.7,43.2,19.1,42.5z" />
    </svg>
  );
};

interface PortButtonProps {
  data: string;
  exportDisabled?: boolean;
}

const PortButton: FC<PortButtonProps> = ({ data, exportDisabled }) => {
  const { t } = useTranslation("page/character");
  const { t: tc } = useTranslation("common");
  const { t: ts } = useTranslation("page/stat");

  const clipboard = useClipboard({ timeout: 1500 });
  const { setGlobalStat } = useStatStore();

  // COMPONENTIZING THIS
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [code, setCode] = useState("");
  const [code2, setCode2] = useState("");
  const [error, setError] = useState("");
  const [globalStatTemp, setGlobalStatTemp] = useState<GlobalStat | undefined>(undefined);

  const handleExport = () => {
    const code_ = Buffer.from(data).toString("base64");
    setCode(code_);
    setOpen(true);
  };

  const handleImport = () => {
    try {
      const parsedData = JSON.parse(Buffer.from(code2, "base64").toString("utf-8")) as { globalStat: GlobalStat };
      globalStatObject.parse(parsedData.globalStat);
      setGlobalStatTemp(getGlobalStat(parsedData.globalStat));
      setOpen3(true);
    } catch {
      setError("invalid code !");
    }
  };

  const stats: GlobalStatData[] = useMemo(() => {
    if (!globalStatTemp) return [];
    const keys = Object.keys(globalStatTemp) as StatKey[];
    const statKeys = keys.filter((key) => !key.startsWith("Enemy"));
    return statKeys.map((key) => ({ key, value: globalStatTemp[key] }) as GlobalStatData);
  }, [globalStatTemp]);

  const enemyStats: GlobalStatData[] = useMemo(() => {
    if (!globalStatTemp) return [];
    const keys = Object.keys(globalStatTemp) as StatKey[];
    const statKeys = keys.filter((key) => key.startsWith("Enemy"));
    return statKeys.map((key) => ({ key, value: globalStatTemp[key] }) as GlobalStatData);
  }, [globalStatTemp]);

  const confirmImported = () => {
    if (globalStatTemp === undefined) return;
    setGlobalStat(globalStatTemp);
    setOpen3(false);
    setOpen2(false);
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        <SmallButton onClick={() => setOpen2(true)}>
          <div className="flex items-center gap-1">
            <ImportIcon />
            <div>{t("import")}</div>
          </div>
        </SmallButton>
        <SmallButton onClick={handleExport} disabled={exportDisabled}>
          <div className="flex items-center gap-1">
            <ImportIcon className="rotate-180" />
            <div>{t("export")}</div>
          </div>
        </SmallButton>
      </div>
      <Modal isOpen={open2} setIsOpen={setOpen2} title={t("import-code")}>
        <div className="mx-2 grid grid-cols-[auto_80px] items-center gap-2">
          {/* DUPS */}
          <input
            className="rounded border border-[#afafaf] bg-black p-1 text-center outline-none"
            value={code2}
            onChange={(e) => {
              setCode2(e.target.value);
              setError("");
            }}
          />
          <SmallButton onClick={handleImport} className="text-base">
            {t("import")}
          </SmallButton>
        </div>
        {error && <div className="mx-2">*{error}</div>}
        <Modal isOpen={open3} setIsOpen={setOpen3} title={ts("confirm")}>
          <Title>{ts("character")}</Title>
          <div className="flex flex-col gap-2">
            {stats.map((stat, index) => {
              return <StatItem key={index} stat={stat} noEdit />;
            })}
          </div>
          <Title className="pt-5">{ts("enemy")}</Title>
          <div className="flex flex-col gap-2">
            {enemyStats.map((stat, index) => (
              <StatItem key={index} stat={stat} noEdit />
            ))}
          </div>
          <Button onClick={() => confirmImported()}>{tc("confirm")}</Button>
        </Modal>
      </Modal>
      <Modal isOpen={open} setIsOpen={setOpen} title={t("export-code")}>
        <div className="mx-6 grid grid-cols-[auto_20px] items-center gap-3">
          <div className="overflow-x-auto">{code}</div>
          {clipboard.copied ? (
            <CheckIcon />
          ) : (
            <CopyIcon onClick={() => clipboard.copy(code)} className="cursor-pointer" />
          )}
        </div>
      </Modal>
    </>
  );
};

export default PortButton;
