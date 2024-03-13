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
  namespace?: "rarity" | "stat";
}

const ListBoxButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Listbox.Button className="line-clamp-1 w-full truncate rounded-full border-2 border-[#a47a68] bg-[#1b2f40] p-1">
      {children}
    </Listbox.Button>
  );
};

const Select: FC<SelectProps> = ({ options, selected, setSelected, className, namespace }) => {
  const { t } = useTranslation(namespace);

  return (
    <div className={twMerge("relative text-center text-white", className)}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="px-1.5">
          <ListBoxButton>{!namespace ? selected.name : t(selected.key)}</ListBoxButton>
        </div>
        <Listbox.Options className="absolute -top-1.5 z-[1] flex w-full flex-col gap-1 border-2 border-[#5a626c] bg-[#28292c] p-1">
          <ListBoxButton>{!namespace ? selected.name : t(selected.key)}</ListBoxButton>
          {options.map((option, index) => (
            <Listbox.Option
              className="w-full cursor-pointer rounded-full border-2 border-[#a47a68] bg-[#455868] p-1 text-white"
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
