import type { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { StatItem } from "@/app/global/component";
import type { StatKey } from "@/data/stat";

import { IconWrap, MinusIcon, PlusIcon } from "./necklaceSelector";

const minLevel = 0;
const maxLevel = 100;

interface StatBonusAdderProps {
  readonly?: boolean;
  bonus: number;
  setBonus?: Dispatch<SetStateAction<number>>;
}

const bonusStat = {
  FinalAttack: 0.25,
  FinalAccuracy: 0.25,
} as Record<StatKey, number>;

const bonusStats = Object.keys(bonusStat).map((key) => ({ key: key as StatKey, value: bonusStat[key as StatKey] }));

const StatBonusAdder: FC<StatBonusAdderProps> = ({ readonly, bonus, setBonus = () => {} }) => {
  const { t } = useTranslation("page/summon");

  const increaseLevel = (amount: number) => {
    setBonus((prev) => {
      const updated = prev + amount;
      if (updated > maxLevel) return maxLevel;
      return updated;
    });
  };

  const decreaseLevel = (amount: number) => {
    setBonus((prev) => {
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
          {t("stat")}: +{bonus}
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
          const value = stat.value * bonus;
          return <StatItem key={index} stat={{ ...stat, value }} noEdit green />;
        })}
      </div>
    </div>
  );
};

export default StatBonusAdder;
