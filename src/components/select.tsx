"use client";

import { Listbox } from "@headlessui/react";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface SelectProps {
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
  options: any[];
  className?: string;
  optionClassName?: string;
  namespace?: "rarity" | "stat" | "characterType";
}

const ListBoxButton: FC<PropsWithChildren & { optionClassName?: string }> = ({ children, optionClassName }) => {
  return (
    <Listbox.Button
      className={twMerge(
        "line-clamp-1 w-full truncate rounded-full border-2 border-[#a47a68] bg-[#1b2f40] p-1",
        optionClassName,
      )}
    >
      {children}
    </Listbox.Button>
  );
};

const Select: FC<SelectProps> = ({ options, selected, setSelected, className, optionClassName, namespace }) => {
  const { t } = useTranslation(namespace);

  return (
    <div className={twMerge("relative text-center text-white", className)}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="px-1.5">
          <ListBoxButton optionClassName={optionClassName}>
            {!namespace ? selected.name : t(selected.key)}
          </ListBoxButton>
        </div>
        <Listbox.Options className="absolute -top-1.5 z-[1] flex w-full flex-col gap-1 border-2 border-[#5a626c] bg-[#28292c] p-1">
          <ListBoxButton optionClassName={optionClassName}>
            {!namespace ? selected.name : t(selected.key)}
          </ListBoxButton>
          {options.map((option, index) => (
            <Listbox.Option
              className={twMerge(
                "w-full cursor-pointer truncate rounded-full border-2 border-[#a47a68] bg-[#455868] p-1 text-white",
                optionClassName,
              )}
              key={index}
              value={option}
              disabled={false}
            >
              {!namespace ? option.name : t(option.key)}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default Select;
