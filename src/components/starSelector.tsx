import type { ComponentPropsWithoutRef, Dispatch, FC, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type Color = "yellow" | "red" | "black";

const starColor: Record<Color, [string, string]> = {
  yellow: ["#f7e16d", "#ebc74c"],
  red: ["#db395a", "#b9316b"],
  black: ["#374d6a", "#374d6a"],
};

interface StarProps {
  color?: Color;
  size?: string;
}

const Star: FC<ComponentPropsWithoutRef<"svg"> & StarProps> = ({
  color = "black",
  size,
  className,
  onClick = () => {},
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size || "20px"}
      width={size || "20px"}
      viewBox="0 0 375.573 375.573"
      className={className}
      onClick={onClick}
    >
      <g transform="translate(-10 43) rotate(350)">
        <path
          style={{ fill: starColor[color][0] }}
          d="M169.586,3.243l62.8,102.8l117.2,27.6l-78.4,91.6l9.6,120l-111.2-46.4l-110.8,46.4l9.6-120 l-78.4-91.6l117.2-27.6L169.586,3.243z"
        />
        <path
          style={{ fill: starColor[color][1] }}
          d="M205.586,180.043l-36-160.8l62.8,86.8l117.2,27.6l-78.4,91.6l9.6,120l-111.2-46.4L205.586,180.043z"
        />
        <path
          style={{ fill: "black" }}
          d="M280.786,353.243c-1.2,0-2-0.4-3.2-0.8l-108-45.2l-107.6,45.2c-2.4,1.2-5.6,0.8-7.6-0.8 c-2.4-1.6-3.6-4.4-3.2-7.2l9.2-116.8l-76.4-88.8c-2-2-2.4-5.2-1.6-7.6c0.8-2.8,3.2-4.8,5.6-5.2l114-27.2l60.8-99.6 c1.6-2.4,4-4,6.8-4l0,0c2.8,0,5.2,1.6,6.8,4l61.2,100l114,26.8c2.8,0.8,4.8,2.8,5.6,5.2c0.8,2.8,0.4,5.6-1.6,7.6l-76,89.2 l9.2,116.8c0.4,2.8-1.2,5.6-3.2,7.2C283.986,352.843,282.386,353.243,280.786,353.243z M169.586,290.843c1.2,0,2,0.4,3.2,0.8 l99.2,41.2l-8.4-106.8c0-2,0.4-4.4,2-6l70-81.6l-104.4-24.4c-2-0.4-4-1.6-4.8-3.6l-56-91.6l-56.4,91.2c-1.2,2-2.8,3.2-5.2,3.6 l-104,24.8l70,81.6c1.2,1.6,2,3.6,2,6l-8.4,106.8l98.8-41.2C167.586,291.243,168.386,290.843,169.586,290.843z M107.186,106.043 L107.186,106.043L107.186,106.043z"
        />
      </g>
    </svg>
  );
};

export const StarCompact: FC<StarSelectorProps> = ({ selectedStar, className, readonly }) => {
  return (
    <div className={twMerge("flex justify-center", className)}>
      {Array.from({ length: selectedStar > 5 ? 5 : selectedStar }).map((_, index) => {
        const redStar = selectedStar > 5;
        let color: Color = selectedStar > index ? "yellow" : "black";
        if (redStar && 5 + index < selectedStar) color = "red";
        return (
          <Star
            key={index}
            color={color}
            size="14px"
            className={twMerge(index > 0 && "ml-[-3px]", !readonly && "cursor-pointer")}
          />
        );
      })}
    </div>
  );
};

interface StarSelectorProps extends ComponentPropsWithoutRef<"div"> {
  readonly?: boolean;
  selectedStar: number;
  setSelectedStar?: Dispatch<SetStateAction<number>>;
}

const StarSelector: FC<StarSelectorProps> = ({ className, selectedStar, setSelectedStar = () => {}, ...props }) => {
  const clickStar = (index: number) => {
    setSelectedStar((prev) => {
      const value = index + 1;
      if (prev === value) return 0;
      return value;
    });
  };

  return (
    <div className={twMerge("flex", className)} {...props}>
      {Array.from({ length: 10 }).map((_, index) => {
        const activeColor = index > 4 ? "red" : "yellow";
        const color = index + 1 <= selectedStar ? activeColor : "black";

        return (
          <Star key={index} color={color} onClick={() => clickStar(index)} className={twMerge("cursor-pointer")} />
        );
      })}
    </div>
  );
};

export default StarSelector;
