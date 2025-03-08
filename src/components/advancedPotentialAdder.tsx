"use client";

import type { ComponentPropsWithoutRef, FC } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import type { Potential } from "@/components/potentialAdder";
import { DiceIcon, LockIcon, TrashIcon } from "@/components/potentialAdder";
import { advancedPotentialValues } from "@/data/potential";
import { advancedPotentialRarities, rarity } from "@/data/rarity";
import { advancedStats } from "@/data/stat";

import Button from "./button";
import Select from "./select";

interface PotentialAdderProps {
  readonly?: boolean;
  potentials: Potential[];
  setPotentials?: React.Dispatch<React.SetStateAction<Potential[]>>;
  disabled?: boolean;
}

const PotentialAdder: FC<ComponentPropsWithoutRef<"div"> & PotentialAdderProps> = ({
  readonly,
  className,
  potentials,
  setPotentials = () => {},
  disabled,
  ...props
}) => {
  const { t } = useTranslation("page/summon");
  const { t: tr } = useTranslation("rarity");
  const { t: ts } = useTranslation("stat");

  const [selectedStat, setSelectedStat] = useState(advancedStats[0]);
  const [selectedRarity, setSelectedRarity] = useState(rarity.Legendary);

  const values = useMemo(
    () =>
      advancedPotentialValues[`${selectedRarity.key}${selectedStat.key}`].map((value) => ({
        key: value,
        name: `${value}%`,
      })),
    [selectedRarity, selectedStat],
  );

  const [selectedValue, setSelectedValue] = useState(values[0]);

  const addPotential = () => {
    const potential = {
      rarity: selectedRarity,
      stat: selectedStat,
      value: selectedValue.key,
    };
    setPotentials((prev) => {
      const arr = [...prev];
      const index = prev.findIndex((potent) => !potent);
      if (index === -1) return arr;
      arr[index] = potential;
      return arr;
    });
  };

  const deletePotential = (index: number) => {
    setPotentials((prev) => {
      const arr = [...prev];
      arr[index] = null;
      return arr;
    });
  };

  useEffect(() => {
    setSelectedValue(values[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRarity, selectedStat]);

  return (
    <div className={twMerge("flex flex-col gap-2 text-sm text-white md:text-base", className)} {...props}>
      {!readonly && (
        <div className="grid w-full grid-cols-[33%_45%_22%] gap-y-1.5 md:grid-cols-[25%_35%_20%_20%]">
          <Select
            selected={selectedRarity}
            setSelected={setSelectedRarity}
            options={advancedPotentialRarities}
            namespace="rarity"
          />
          <Select selected={selectedStat} setSelected={setSelectedStat} options={advancedStats} namespace="stat" />
          <Select selected={selectedValue} setSelected={setSelectedValue} options={values} />
          <div className="col-span-3 md:col-span-1 md:pl-1.5">
            <Button onClick={() => addPotential()} disabled={disabled}>
              {t("add")}
            </Button>
          </div>
        </div>
      )}
      {potentials.map((potential, index) => (
        <div
          key={index}
          className={twMerge(
            "flex h-[42px] items-center justify-between rounded-full border-2 border-legendary3/75 bg-[#3b3c40] p-1",
            potential === "limited" && "brightness-[65%]",
          )}
        >
          {!potential && <div className="w-full truncate text-center opacity-50">{t("empty2")}</div>}
          {!!potential &&
            (potential === "limited" ? (
              <div className="flex w-full justify-center opacity-50">
                <DiceIcon />
              </div>
            ) : (
              <>
                <div
                  className={twMerge(
                    "rounded-full min-w-[90px] border-2 py-0.5 px-1 text-center",
                    potential.rarity.selectClass,
                  )}
                >
                  <div className="truncate">{tr(potential.rarity.key)}</div>
                </div>
                <div>
                  +{potential.value}% {ts(potential.stat.key)}
                </div>
                <div className="flex justify-end">
                  <div
                    className={twMerge(
                      "w-fit rounded-full bg-gradient-to-b from-[#bbbbbb] via-[#f8f8f8] to-[#f8f8f8] p-2",
                      !readonly && "hover:brightness-95 cursor-pointer",
                    )}
                    onClick={() => deletePotential(index)}
                  >
                    {readonly ? <LockIcon /> : <TrashIcon />}
                  </div>
                </div>
              </>
            ))}
        </div>
      ))}
    </div>
  );
};

export default PotentialAdder;
