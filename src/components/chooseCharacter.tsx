import type { ComponentPropsWithoutRef, Dispatch, FC, SetStateAction } from "react";
import React, { Fragment, useState } from "react";
import { twMerge } from "tailwind-merge";

import { type Character, characters } from "@/data/character";

import CharacterIcon from "./characterIcon";
import Modal from "./modal";

interface ChooseCharacterProps {
  selectedCharacter: Character;
  setSelectedCharacter: Dispatch<SetStateAction<Character>>;
  readonly?: boolean;
}

const ChooseCharacter: FC<ComponentPropsWithoutRef<"div"> & ChooseCharacterProps> = ({
  className,
  readonly,
  selectedCharacter,
  setSelectedCharacter,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CharacterIcon
        character={selectedCharacter}
        showName={false}
        className={twMerge("size-[72px]", !readonly && "cursor-pointer", className)}
        onClick={() => !readonly && setIsOpen(true)}
        {...props}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Choose Character">
        <div className="grid grid-cols-5 justify-center gap-2 sm:grid-cols-6">
          {characters.map((character) => (
            <CharacterIcon
              key={character.name}
              character={character}
              className="w-full cursor-pointer"
              onClick={() => {
                setSelectedCharacter(character);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ChooseCharacter;
