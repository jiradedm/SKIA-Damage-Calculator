import { type ComponentPropsWithoutRef, type FC, useState } from "react";
import { isDesktop } from "react-device-detect";
import { twMerge } from "tailwind-merge";

interface StatusIconProps {
  name: string;
  img: string;
  active?: boolean;
}

const EffectIcon: FC<ComponentPropsWithoutRef<"div"> & StatusIconProps> = ({ name, img, className, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative z-[2]">
      <div
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => isDesktop && setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={twMerge("w-fit rounded-sm border-[#d5d5d5] bg-[#161210] shadow-md z-[2]", className)}
        {...props}
      >
        <img className="size-4" src={img} alt={name} />
      </div>
      {open && (
        <div className="absolute bottom-full left-1/2 z-[10] mb-1 -translate-x-1/2 truncate rounded-sm bg-black p-1 text-xs">
          {name}
        </div>
      )}
    </div>
  );
};

export default EffectIcon;
