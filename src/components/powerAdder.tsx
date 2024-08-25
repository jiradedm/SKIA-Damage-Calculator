"use client";

import type { ComponentPropsWithoutRef, FC } from "react";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import type { CharacterTypeKey } from "@/data/characterType";
import { characterTypes } from "@/data/characterType";
import { type PowerValueKey, powerValues } from "@/data/power";
import type { RarityKey } from "@/data/rarity";
import { potentialRarities, rarity } from "@/data/rarity";
import type { StatKey } from "@/data/stat";
import { powerStats } from "@/data/stat";
import type { AddedCharacter } from "@/store";

import Select from "./select";

interface PowerAdderProps {
  readonly?: boolean;
  power: AddedCharacter["power"];
  setPower?: React.Dispatch<React.SetStateAction<AddedCharacter["power"]>>;
}

const PowerAdder: FC<ComponentPropsWithoutRef<"div"> & PowerAdderProps> = ({
  readonly,
  className,
  power,
  setPower = () => {},
  ...props
}) => {
  const { t } = useTranslation("page/summon");
  const { t: tr } = useTranslation("rarity");
  const { t: ts } = useTranslation("stat");
  const { t: tc } = useTranslation("characterType");

  const values = useMemo(
    () =>
      powerValues[`${power?.rarity}${power?.stat}${power?.type}` as PowerValueKey]?.map((value) => ({
        key: value,
        name: `${value}%`,
      })) ?? [],
    [power?.rarity, power?.stat, power?.type],
  );

  const types = useMemo(() => {
    return characterTypes.map((charType) => ({
      key: charType.key,
      name: tc(charType.key),
    }));
  }, [tc]);

  useEffect(() => {
    setPower(
      (prev) =>
        prev && {
          ...prev,
          value: powerValues[`${power?.rarity}${power?.stat}${power?.type}` as PowerValueKey][0] as number,
        },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [power?.rarity]);

  return (
    <div className={twMerge("flex flex-col gap-2 text-sm text-white md:text-base", className)} {...props}>
      {!readonly && (
        <div className="grid w-full grid-cols-[20%_35%_29%_16%] gap-y-1.5 md:grid-cols-[23%_35%_26%_16%]">
          <Select
            selected={{ key: power?.rarity, name: tr(power?.rarity ?? "Legendary") }}
            setSelected={(rar) => setPower((prev) => prev && { ...prev, rarity: rar.key as RarityKey })}
            options={potentialRarities}
            namespace="rarity"
          />
          <Select
            selected={{ key: power?.stat, name: ts(power?.stat ?? "FinalAttack") }}
            setSelected={(stat) => setPower((prev) => prev && { ...prev, stat: stat.key as StatKey })}
            options={powerStats}
            namespace="stat"
          />
          <Select
            selected={{ key: power?.type, name: tc(power?.type ?? "Defense") }}
            setSelected={(type) => setPower((prev) => prev && { ...prev, type: type.key as CharacterTypeKey })}
            options={types}
            namespace="characterType"
          />
          <Select
            selected={{ key: power?.value, name: power?.value }}
            setSelected={(value) => setPower((prev) => prev && { ...prev, value: value.key as number })}
            options={values}
          />
        </div>
      )}
      <div
        className={twMerge(
          "flex h-[42px] items-center justify-between rounded-full border-2 border-[#7c7c7c] bg-[#3b3c40] p-1",
        )}
      >
        <>
          <div
            className={twMerge(
              "rounded-full min-w-[90px] border-2 py-0.5 px-1 text-center",
              rarity[power?.rarity ?? "Legendary"].selectClass,
            )}
          >
            <div className="truncate">{tr(rarity[power?.rarity ?? "Legendary"].key)}</div>
          </div>
          <div className="overflow-x-auto overflow-y-hidden text-nowrap">
            +{power?.value}% {ts(power?.stat ?? "FinalAttack")}
            {t("for")}
            {t("hero", { type: tc(power?.type ?? "Defense") })}
          </div>

          <div />
        </>
      </div>
    </div>
  );
};

export default PowerAdder;
