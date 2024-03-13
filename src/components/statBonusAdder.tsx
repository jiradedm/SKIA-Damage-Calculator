import type { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

import { IconWrap, MinusIcon, PlusIcon } from "./necklaceSelector";

const minLevel = 0;
const maxLevel = 100;

interface StatBonusAdderProps {
  readonly?: boolean;
  bonus: number;
  setBonus?: Dispatch<SetStateAction<number>>;
}

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
      <div className="truncate text-center text-[#d2fd7d]">
        {t("bonus")} +{bonus * 0.25}%
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
  );
};

export default StatBonusAdder;
