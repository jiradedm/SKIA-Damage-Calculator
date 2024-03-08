"use client";

import { Listbox } from "@headlessui/react";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  selected: any;
  setSelected: Dispatch<SetStateAction<any>>;
  options: any[];
  className?: string;
}

const ListBoxButton: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Listbox.Button className="line-clamp-1 w-full truncate rounded-full border-2 border-[#a47a68] bg-[#1b2f40] p-1">
      {children}
    </Listbox.Button>
  );
};

export function SimpleSelect({ options, selected, setSelected }: Props) {
  return (
    <div className="relative">
      <Listbox value={selected} onChange={setSelected}>
        <Listbox.Button>{selected.name}</Listbox.Button>
        <Listbox.Options className="absolute -right-2 -top-1 flex cursor-pointer gap-2 bg-[#454445] px-2 py-1.5 leading-3 shadow outline outline-2 outline-[#565558]">
          {options.map((option, index) => (
            <Listbox.Option key={index} value={option}>
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default function Select({ options, selected, setSelected, className }: Props) {
  return (
    <div className={twMerge("relative text-center text-white", className)}>
      <Listbox value={selected} onChange={setSelected}>
        <div className="px-1.5">
          <ListBoxButton>{selected.name}</ListBoxButton>
        </div>
        <Listbox.Options className="absolute -top-1.5 z-[1] flex w-full flex-col gap-1 border-2 border-[#5a626c] bg-[#28292c] p-1">
          <ListBoxButton>{selected.name}</ListBoxButton>
          {options.map((option, index) => (
            <Listbox.Option
              className="w-full cursor-pointer rounded-full border-2 border-[#a47a68] bg-[#455868] p-1 text-white"
              key={index}
              value={option}
              disabled={false}
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}
