"use client";

import type { ComponentPropsWithoutRef, Dispatch, FC, SetStateAction } from "react";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { IconWrap, MinusIcon, PlusIcon } from "@/components/accessoryLevelSelector";
import { accessory } from "@/data/accessory";

const minLevel = 0;
const maxLevel = accessory.NecklaceOfCriticalHitDamage.value.length - 1;

interface AccessoryLevelSelectorProps {
  limit?: number;
  disabled?: boolean;
  resonanceLevel: number;
  setResonanceLevel?: Dispatch<SetStateAction<number>>;
}

const AccessoryResonanceLevelSelector: FC<ComponentPropsWithoutRef<"div"> & AccessoryLevelSelectorProps> = ({
  limit,
  disabled,
  className,
  resonanceLevel,
  setResonanceLevel = () => {},
  ...props
}) => {
  const { t } = useTranslation("accessory");
  const { t: ts } = useTranslation("stat");

  const increaseLevel = () => {
    setResonanceLevel((prev) => {
      if (prev >= maxLevel || prev >= (limit ?? 0)) return prev;
      return prev + 1;
    });
  };

  const decreaseLevel = () => {
    setResonanceLevel((prev) => {
      if (prev <= minLevel) return prev;
      return prev - 1;
    });
  };

  useEffect(() => {
    if (limit && resonanceLevel > (limit ?? 0)) {
      setResonanceLevel(limit);
    }
  }, [limit, resonanceLevel, setResonanceLevel]);

  return (
    <div
      className={twMerge(
        "select-none rounded border-2 border-[#ebe9e2] bg-[#ebe9e2]",
        disabled && "grayscale pointer-events-none",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-1 py-1 text-center">
        <div className="flex gap-2">
          <IconWrap onClick={decreaseLevel}>
            <MinusIcon />
          </IconWrap>
          <div className="flex text-lg font-[500] leading-[26px] text-[#344557]">
            <div>{`Lv. `}</div>
            <div className="block w-3">{resonanceLevel}</div>
            <div>/{maxLevel}</div>
          </div>
          <IconWrap onClick={increaseLevel}>
            <PlusIcon />
          </IconWrap>
        </div>
        <div className="text-black">{t("resonance")}</div>
      </div>
      <div className="flex justify-between rounded-b bg-[#344557] p-2 text-white">
        <div>{ts("BonusDamageRate")}</div>
        <div className="text-[#d2fd7d]">+{resonanceLevel}%</div>
      </div>
    </div>
  );
};

export default AccessoryResonanceLevelSelector;
