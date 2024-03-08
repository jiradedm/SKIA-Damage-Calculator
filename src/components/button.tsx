import type { FC } from "react";
import { twMerge } from "tailwind-merge";

const Button: FC<React.ComponentPropsWithoutRef<"button">> = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        "w-full min-w-14 cursor-pointer rounded-full border-2 border-[#769cb7] bg-[#617c93] px-3 py-1 text-center hover:brightness-95 active:brightness-90",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
