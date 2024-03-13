import type { ComponentPropsWithoutRef, Dispatch, FC, SetStateAction } from "react";
import React, { Fragment, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { type Character, characters } from "@/data/character";
import { characterTypes } from "@/data/characterType";
import { rarities } from "@/data/rarity";

import CharacterIcon from "./characterIcon";
import Modal from "./modal";
import Select from "./select";

interface ChooseCharacterProps {
  selectedCharacter: Character;
  setSelectedCharacter: Dispatch<SetStateAction<Character>>;
  readonly?: boolean;
}

const allOption = { key: "All", name: "All" };

const raritieOpions = [allOption, ...rarities.filter(({ key }) => ["Legendary", "Unique"].includes(key))];

const characterTypeOptions = [allOption, ...characterTypes];

const ChooseCharacter: FC<ComponentPropsWithoutRef<"div"> & ChooseCharacterProps> = ({
  className,
  readonly,
  selectedCharacter,
  setSelectedCharacter,
  ...props
}) => {
  const { t } = useTranslation("page/summon");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRarity, setSelectedRarity] = useState(allOption);
  const [selectedType, setSelectedType] = useState(allOption);

  const filteredCharacter = useMemo(() => {
    return characters.filter((character) => {
      const filterRarity = selectedRarity.key === "All" || character.rarity.key === selectedRarity.key;
      const filterType = selectedType.key === "All" || character.type.key === selectedType.key;
      return filterRarity && filterType;
    });
  }, [selectedRarity, selectedType]);

  return (
    <>
      <CharacterIcon
        character={selectedCharacter}
        showName={false}
        className={twMerge("size-[72px]", !readonly && "cursor-pointer", className)}
        onClick={() => !readonly && setIsOpen(true)}
        {...props}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={t("title-character")} className="relative">
        <div className="relative flex w-full gap-1">
          <Select
            selected={selectedType}
            setSelected={setSelectedType}
            options={characterTypeOptions}
            namespace="characterType"
            className="z-10 w-full"
          />
          <Select
            selected={selectedRarity}
            setSelected={setSelectedRarity}
            options={raritieOpions}
            namespace="rarity"
            className="z-10 w-full"
          />
        </div>
        <div className="grid grid-cols-5 justify-center gap-2 sm:grid-cols-6">
          {filteredCharacter.map((character) => (
            <CharacterIcon
              key={character.key}
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
