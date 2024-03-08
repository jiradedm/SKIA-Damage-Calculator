import type { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";

import type { Character } from "@/data/character";

interface CharacterIconProps {
  character: Character;
  showName?: boolean;
}

const CharacterIcon: FC<ComponentPropsWithoutRef<"div"> & CharacterIconProps> = ({
  className,
  character,
  showName = true,
  ...props
}) => {
  return (
    <div className={twMerge("rounded w-fit p-0.5", character.rarity.characterClass, className)} {...props}>
      <img src={character.img} alt={character.name} className={showName ? "rounded-t" : "rounded"} />
      {showName && (
        <div className="text-stroke line-clamp-1 w-full p-[1px] text-center text-xs font-[400] leading-[14px]">
          {character.name}
        </div>
      )}
    </div>
  );
};

export default CharacterIcon;
