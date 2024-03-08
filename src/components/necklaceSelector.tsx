import type { ComponentPropsWithoutRef, Dispatch, FC, SetStateAction } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

import { type Accessory } from "@/data/accessory";

export const MinusIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 349.03 349.03" fill="currentColor">
      <path d="M349.03,141.226v66.579c0,5.012-4.061,9.079-9.079,9.079H9.079c-5.016,0-9.079-4.067-9.079-9.079v-66.579   c0-5.012,4.063-9.079,9.079-9.079h330.872C344.97,132.146,349.03,136.213,349.03,141.226z" />
    </svg>
  );
};

export const PlusIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 349.03 349.03" fill="currentColor">
      <path d="M349.03,141.226v66.579c0,5.012-4.061,9.079-9.079,9.079H216.884v123.067c0,5.019-4.067,9.079-9.079,9.079h-66.579   c-5.009,0-9.079-4.061-9.079-9.079V216.884H9.079c-5.016,0-9.079-4.067-9.079-9.079v-66.579c0-5.013,4.063-9.079,9.079-9.079   h123.068V9.079c0-5.018,4.069-9.079,9.079-9.079h66.579c5.012,0,9.079,4.061,9.079,9.079v123.068h123.067   C344.97,132.147,349.03,136.213,349.03,141.226z" />
    </svg>
  );
};

export const IconWrap: FC<ComponentPropsWithoutRef<"div">> = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge(
        "cursor-pointer rounded-sm outline outline-1 outline-[#96a4b0] bg-[#596c7e] p-1 text-[#fdfdfb] shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const minLevel = 0;
const maxLevel = 5;

interface AccessoryLevelSelectorProps {
  accessory: Accessory;
  disabled?: boolean;
  necklaceLevel: number;
  setNecklaceLevel?: Dispatch<SetStateAction<number>>;
}

const AccessoryLevelSelector: FC<ComponentPropsWithoutRef<"div"> & AccessoryLevelSelectorProps> = ({
  accessory,
  disabled,
  className,
  necklaceLevel,
  setNecklaceLevel = () => {},
  ...props
}) => {
  const increaseLevel = () => {
    setNecklaceLevel((prev) => {
      if (prev >= maxLevel) return prev;
      return prev + 1;
    });
  };

  const decreaseLevel = () => {
    setNecklaceLevel((prev) => {
      if (prev <= minLevel) return prev;
      return prev - 1;
    });
  };

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
            <div className="block w-3">{necklaceLevel}</div>
            <div>/{maxLevel}</div>
          </div>
          <IconWrap onClick={increaseLevel}>
            <PlusIcon />
          </IconWrap>
        </div>
        <div className="text-black">{accessory.name}</div>
      </div>
      <div className="flex justify-between rounded-b bg-[#344557] p-2 text-white">
        <div>{accessory.stat.name}</div>
        <div className="text-[#d2fd7d]">+{accessory.value[necklaceLevel]}%</div>
      </div>
    </div>
  );
};

export default AccessoryLevelSelector;
