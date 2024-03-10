import type { ComponentPropsWithoutRef, FC } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

interface ProgressbarProps extends ComponentPropsWithoutRef<"div"> {
  percentage: number;
  text?: string;
}

const Progressbar: FC<ProgressbarProps> = ({ percentage, text = "", className, ...props }) => {
  return (
    <div className={twMerge("relative h-6 bg-black", className)} {...props}>
      <div className="h-full bg-[#243a4a] text-center" style={{ width: `${percentage}%` }} />
      <div className="text-stroke absolute inset-0 w-full text-center font-[500]">{text}</div>
    </div>
  );
};

export default Progressbar;
