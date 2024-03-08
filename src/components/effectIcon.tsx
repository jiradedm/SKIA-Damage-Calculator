import { Transition } from "@headlessui/react";
import { type ComponentPropsWithoutRef, type FC, Fragment, useState } from "react";
import { isDesktop } from "react-device-detect";
import { twMerge } from "tailwind-merge";

import type { Effect } from "@/data/effect";

interface StatusIconProps {
  effect: Effect;
  active?: boolean;
}

const EffectIcon: FC<ComponentPropsWithoutRef<"div"> & StatusIconProps> = ({
  effect,
  active = false,
  className,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-[2]">
      <div
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => isDesktop && setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={twMerge(
          "w-fit rounded-sm border-[#d5d5d5] bg-[#161210] shadow-md z-[2]",
          className,
          !active && "grayscale",
        )}
        {...props}
      >
        <img className="size-4" src={effect.img} alt={effect.name} />
      </div>
      <Transition
        show={open}
        as={Fragment}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="absolute z-[5] -translate-x-1/2 truncate rounded-sm bg-black p-1 text-xs">{effect.name}</div>
      </Transition>
    </div>
  );
};

export default EffectIcon;
