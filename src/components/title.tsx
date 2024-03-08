import type { ComponentPropsWithoutRef, FC } from "react";
import React from "react";
import { twMerge } from "tailwind-merge";

const Title: FC<ComponentPropsWithoutRef<"div">> = ({ children, className, ...props }) => {
  return (
    <div className={twMerge("font-bold text-stroke text-xl py-1", className)} {...props}>
      {children}
    </div>
  );
};

export default Title;
