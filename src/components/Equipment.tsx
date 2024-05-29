import type { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { StatItem } from "@/app/global/component";
import type { StatKey } from "@/data/stat";

import { IconWrap, MinusIcon, PlusIcon } from "./necklaceSelector";

const minLevel = 0;
const maxLevel = 100;

interface StatBonusAdderProps {
  readonly?: boolean;
  equipmentLevel: number;
  setEquipmentLevel?: Dispatch<SetStateAction<number>>;
}

const bonusStat = {
  FinalAttack: 0.2,
  CritRate: 0.1,
  BonusDamageRate: 0.6,
} as Record<StatKey, number>;

// TODO: DUPS

const bonusStats = Object.keys(bonusStat).map((key) => ({ key: key as StatKey, value: bonusStat[key as StatKey] }));

const Equipment: FC<StatBonusAdderProps> = ({ readonly, equipmentLevel, setEquipmentLevel = () => {} }) => {
  const { t } = useTranslation("page/summon");

  const increaseLevel = (amount: number) => {
    setEquipmentLevel((prev) => {
      const updated = prev + amount;
      if (updated > maxLevel) return maxLevel;
      return updated;
    });
  };

  const decreaseLevel = (amount: number) => {
    setEquipmentLevel((prev) => {
      const updated = prev - amount;
      if (updated < minLevel) return minLevel;
      return updated;
    });
  };

  return (
    <div className="flex min-w-[50%] flex-col gap-3 self-center">
      <div className="flex w-fit select-none gap-2 self-center font-[500]">
        {!readonly && (
          <>
            <IconWrap className="flex w-fit items-center leading-4" onClick={() => decreaseLevel(10)}>
              <MinusIcon />
            </IconWrap>
            <IconWrap className="w-fit" onClick={() => decreaseLevel(1)}>
              <MinusIcon />
            </IconWrap>
          </>
        )}
        <div className="truncate text-center">
          {t("equipment")}: +{equipmentLevel}
        </div>
        {!readonly && (
          <>
            <IconWrap className="w-fit" onClick={() => increaseLevel(1)}>
              <PlusIcon />
            </IconWrap>
            <IconWrap className="flex  w-fit items-center leading-4" onClick={() => increaseLevel(10)}>
              <PlusIcon />
            </IconWrap>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {bonusStats.map((stat, index) => {
          const value = stat.value * equipmentLevel;
          return <StatItem key={index} stat={{ ...stat, value }} noEdit />;
        })}
      </div>
    </div>
  );
};

export default Equipment;
