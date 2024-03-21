import type { ComponentPropsWithoutRef, FC } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("character");

  return (
    <div className={twMerge("relative rounded w-fit p-0.5", character.rarity.characterClass, className)} {...props}>
      <div className="relative">
        <img
          src={character.img}
          alt={character.key}
          className={twMerge("absolute", showName ? "rounded-t" : "rounded")}
        />
      </div>
      <div className="relative pb-[100%]">
        {character.testing && (
          <div className="absolute top-1/2 w-full -translate-y-1/2 bg-unique3 text-center text-xs font-[500] text-white">
            TESTING
          </div>
        )}
      </div>
      {showName && (
        <div className="text-stroke line-clamp-1 w-full p-[1px] text-center text-xs font-[400] leading-[14px]">
          {t(character.key)}
        </div>
      )}
    </div>
  );
};

export default CharacterIcon;
