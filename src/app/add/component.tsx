"use client";

import { useRouter } from "next/navigation";
import type { Dispatch, FC, SetStateAction } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { v4 } from "uuid";

import Button from "@/components/button";
import ChooseCharacter from "@/components/chooseCharacter";
import Equipment from "@/components/Equipment";
import AccessoryLevelSelector from "@/components/necklaceSelector";
import type { IPotential, Potential } from "@/components/potentialAdder";
import PotentialAdder from "@/components/potentialAdder";
import Select from "@/components/select";
import StarSelector from "@/components/starSelector";
import StatBonusAdder from "@/components/statBonusAdder";
import Title from "@/components/title";
import { accessory } from "@/data/accessory";
import type { Character } from "@/data/character";
import { characters } from "@/data/character";
import type { LevelOption } from "@/data/characterStat";
import { characterLevelOptions } from "@/data/characterStat";
import { rarity } from "@/data/rarity";
import { stat } from "@/data/stat";
import type { CalulatedCharacter, CharacterPotential } from "@/store";
import { useCharacterStore } from "@/store";

interface CharacterComponentProps {
  character: Character;
  setCharacter?: Dispatch<SetStateAction<Character>>;
  star: number;
  setStar?: Dispatch<SetStateAction<number>>;
  selectedLevel: LevelOption;
  setSelectedLevel?: Dispatch<SetStateAction<LevelOption>>;
  levelOptions: { name: string }[];
  readonly?: boolean;
}

const CharacterComponent: FC<CharacterComponentProps> = ({
  star,
  character,
  setStar = () => {},
  setCharacter = () => {},
  selectedLevel,
  setSelectedLevel = () => {},
  levelOptions,
  readonly,
}) => {
  const { t } = useTranslation("character");

  return (
    <div className="grid grid-cols-[68px_auto] grid-rows-2 gap-x-2 self-center">
      <ChooseCharacter
        className="row-span-2"
        selectedCharacter={character}
        setSelectedCharacter={setCharacter}
        readonly={readonly}
      />
      <div className="flex items-center gap-1">
        <div className="ml-1.5 text-xl font-[500] leading-8">{t(character.key)}</div>
        <Select selected={selectedLevel} setSelected={setSelectedLevel} options={levelOptions} className="w-[80px]" />
      </div>
      <StarSelector selectedStar={star} setSelectedStar={setStar} className="items-center" />
    </div>
  );
};

const initCharIndex = 0;
const initStar = 6;

interface AddPageProps {
  isEdit?: boolean;
  character?: CalulatedCharacter;
  onEdited?: () => void;
}

export const AddPage: FC<AddPageProps> = ({ isEdit = false, character, onEdited = () => {} }) => {
  const router = useRouter();
  const { t } = useTranslation("page/summon");
  const { t: tc } = useTranslation("common");

  const { addCharacter, editCharacter } = useCharacterStore();

  const editingCharacter = characters.find((char) => char.key === character?.character.key);
  const editLevel = characterLevelOptions.find((level) => level.value === character?.level);

  const initPotentials = Array.from<Potential>({ length: 7 }).map((_, index) => {
    if (!character?.potentials[index])
      return index + 1 >
        (editingCharacter || characters[initCharIndex]).rarity.potentialLimit[character?.star || initStar]
        ? "limited"
        : null;

    const charPotential = character.potentials[index];

    const editPotential: IPotential = {
      rarity: rarity[charPotential.rarity],
      stat: stat[charPotential.stat],
      value: charPotential.value,
    };
    return editPotential;
  });

  const [selectedCharacter, setSelectedCharacter] = useState<Character>(editingCharacter || characters[initCharIndex]);
  const [selectedStar, setSelectedStar] = useState<number>(character === undefined ? initStar : character.star);
  const [selectedLevel, setSelectedLevel] = useState<LevelOption>(editLevel || characterLevelOptions[0]);
  const [potentials, setPotentials] = useState<Potential[]>(initPotentials);
  const [earringsLevel, setEarringsLevel] = useState<number>(character?.earringsLevel || 0);
  const [necklaceLevel, setNecklaceLevel] = useState<number>(character?.necklaceLevel || 0);
  const [bonus, setBonus] = useState<number>(character?.statBonus || 0);
  const [equipmentLevel, setEquipmentLevel] = useState<number>(character?.equipmentLevel || 0);

  const levelOptions = useMemo(() => {
    const options = characterLevelOptions.filter((option) => option.value <= selectedCharacter.rarity.maxLevel);
    setSelectedLevel(editLevel || options[0]);
    return options;
  }, [selectedCharacter.rarity.maxLevel, editLevel]);

  useEffect(() => {
    const newPotent: Potential[] = Array.from<Potential>({ length: 7 }).map((_, index) =>
      index + 1 > selectedCharacter.rarity.potentialLimit[selectedStar] ? "limited" : null,
    );

    const newLimited = newPotent.filter((p) => p === "limited").length;
    const oldLimited = [...potentials].filter((p) => p === "limited").length;

    if (newLimited !== oldLimited)
      setPotentials(
        newPotent.map((p, index) => {
          if (p === "limited") return "limited";
          if (potentials[index] && potentials[index] !== "limited") return potentials[index];
          return null;
        }),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCharacter, selectedStar]);

  useEffect(() => {
    if (selectedCharacter.rarity.key !== "Legendary") setEquipmentLevel(0);
  }, [selectedCharacter.rarity.key]);

  const accessoryDisabled = useMemo(() => {
    const necklaceDisabled = selectedStar < selectedCharacter.rarity.unlockNecklaceStarRequirement;
    if (necklaceDisabled) setNecklaceLevel(0);

    const earringsDisabled = selectedStar < selectedCharacter.rarity.unlockEarringsStarRequirement;
    if (earringsDisabled) setEarringsLevel(0);

    return { necklace: necklaceDisabled, earrings: earringsDisabled };
  }, [selectedCharacter, selectedStar]);

  const confirmAddCharacter = () => {
    addCharacter({
      id: v4(),
      level: Number(selectedLevel.value),
      character: selectedCharacter.key,
      potentials: (potentials.filter((p) => !!p && p !== "limited") as IPotential[]).map(
        (p) => ({ rarity: p.rarity.key, stat: p.stat.key, value: p.value }) as CharacterPotential,
      ),
      necklaceLevel,
      earringsLevel,
      star: selectedStar,
      statBonus: bonus,
      equipmentLevel,
    });
    router.push("/");
  };

  const confirmEditCharacter = () => {
    if (!character) return;
    editCharacter({
      id: character.id,
      level: Number(selectedLevel.value),
      character: selectedCharacter.key,
      potentials: (potentials.filter((p) => !!p && p !== "limited") as IPotential[]).map(
        (p) => ({ rarity: p.rarity.key, stat: p.stat.key, value: p.value }) as CharacterPotential,
      ),
      active: character.active ?? false,
      necklaceLevel,
      earringsLevel,
      star: selectedStar,
      statBonus: bonus,
      equipmentLevel,
    });
    onEdited();
  };

  return (
    <>
      {!isEdit && <Title className="self-center text-3xl">{t("title")}</Title>}
      <CharacterComponent
        character={selectedCharacter}
        star={selectedStar}
        setCharacter={setSelectedCharacter}
        setStar={setSelectedStar}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        levelOptions={levelOptions}
        readonly={isEdit}
      />
      <div />
      <PotentialAdder
        potentials={potentials}
        setPotentials={setPotentials}
        className="w-full max-w-[540px] self-center"
      />
      <div />
      <AccessoryLevelSelector
        accessory={accessory.EarringsOfAccuracy}
        disabled={accessoryDisabled.earrings}
        necklaceLevel={earringsLevel}
        setNecklaceLevel={setEarringsLevel}
        className="w-full max-w-[540px] self-center"
      />
      <AccessoryLevelSelector
        accessory={accessory.NecklaceOfCriticalHitDamage}
        disabled={accessoryDisabled.necklace}
        necklaceLevel={necklaceLevel}
        setNecklaceLevel={setNecklaceLevel}
        className="w-full max-w-[540px] self-center"
      />
      <div />
      <StatBonusAdder bonus={bonus} setBonus={setBonus} />
      <div />
      {selectedCharacter.rarity.key === "Legendary" && (
        <>
          <Equipment
            equipmentLevel={equipmentLevel}
            setEquipmentLevel={setEquipmentLevel}
            selectedStar={selectedStar}
          />
          <div />
        </>
      )}
      <Button
        className="max-w-[540px] self-center"
        onClick={() => (isEdit ? confirmEditCharacter : confirmAddCharacter)()}
      >
        {tc("confirm")}
      </Button>
    </>
  );
};
