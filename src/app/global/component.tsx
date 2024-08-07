import type { Dispatch, FC, SetStateAction } from "react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { stat as stat_ } from "@/data/stat";
import type { GlobalStatData } from "@/store";
import { useStatStore } from "@/store";

interface InputProps {
  intialValue: string;
  setEditing: Dispatch<SetStateAction<boolean>>;
  handleInput: (value: number) => void;
}

const Input: FC<InputProps> = ({ intialValue, setEditing, handleInput }) => {
  const [value, setValue] = useState(intialValue);

  const submit = () => {
    setEditing(false);
    handleInput(Number(value));
  };

  return (
    <form className="relative h-4" onSubmit={submit}>
      <input
        inputMode="decimal"
        type="number"
        step="any"
        autoFocus
        value={value}
        className="absolute left-0 top-0 h-4 w-full bg-transparent text-center outline-none"
        onBlur={submit}
        onFocus={(e) => e.target.select()}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="invisible px-1">{value}</div>
    </form>
  );
};

const CheckIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px" viewBox="0 0 512 512" fill="currentColor">
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </svg>
  );
};

export interface StatProps {
  stat: GlobalStatData;
  noEdit?: boolean;
  green?: boolean;
  disabled?: boolean;
}

export const StatItem: FC<StatProps> = ({ stat: statProps, noEdit = false, green = false, disabled = false }) => {
  const { t } = useTranslation("stat");

  const { setGlobalStatValue } = useStatStore();

  const [editing, setEditing] = useState(false);

  const stat = useMemo(() => {
    return stat_[statProps.key];
  }, [statProps.key]);

  const handleInput = (value: number) => {
    const valid = Number.isFinite(value) && Number(value) >= 0;
    if (!valid) return setEditing(false);
    setGlobalStatValue(statProps.key, +value);
  };

  return (
    <div
      className={twMerge("flex w-full select-none gap-2 font-[500]", !noEdit && "cursor-pointer")}
      onClick={() => {
        if (stat.isToggle) {
          handleInput(!statProps.value ? 1 : 0);
        } else {
          setEditing(true);
        }
      }}
    >
      <div
        className={twMerge(
          "flex w-full items-center justify-between bg-[#454445] px-2 py-1 leading-4 outline outline-2 outline-[#565558]",
          disabled && "grayscale brightness-50",
        )}
      >
        <div className="line-clamp-1">{t(stat.key)}</div>
        {stat.isToggle ? (
          <div
            onChange={(value) => handleInput(value ? 1 : 0)}
            className={twMerge(
              "flex justify-center size-4 items-center rounded-sm border",
              statProps.value ? "bg-[#53545b] border-[#8d8788] text-[#fdfdfb]" : "border-[#8d8788] bg-[#53545b]",
            )}
          >
            {!!statProps.value && <CheckIcon />}
          </div>
        ) : (
          <div className={twMerge("flex", green ? "text-[#d2fd7d]" : "text-[#eccd80]")}>
            {!stat.isNotAdd && <div>+</div>}
            {!noEdit && editing ? (
              <Input intialValue={String(statProps.value)} setEditing={setEditing} handleInput={handleInput} />
            ) : (
              <div>{statProps.value.toLocaleString()}</div>
            )}
            {!stat.isFlat && <div>%</div>}
          </div>
        )}
      </div>
    </div>
  );
};
