"use client";

import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

import CharacterDamage from "@/components/characterDamage";
import CharacterIcon from "@/components/characterIcon";
import EffectIcon from "@/components/effectIcon";
import { getStatusAilments, getTeamEffects } from "@/components/intitalize";
import Modal from "@/components/modal";
import Progressbar from "@/components/progressbar";
import SortButton from "@/components/sortButton";
import Title from "@/components/title";
import { sortCharacterByActiveTotalDamage, sortCharacterByTotalDamage } from "@/libs/sort";
import type { CalulatedCharacter } from "@/store";
import { characterMaxActive, useCharacterStore } from "@/store";

import { formatNumber } from "../../libs/format";

interface TeamModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  characters: CalulatedCharacter[];
}

const InfoIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-[18px]">
      <path d="M10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18ZM10 6C9.44772 6 9 6.44772 9 7V11C9 11.5523 9.44772 12 10 12C10.5523 12 11 11.5523 11 11V7C11 6.44772 10.5523 6 10 6ZM10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15Z" />
    </svg>
  );
};

const TeamModal: FC<TeamModalProps> = ({ characters, isOpen, setIsOpen }) => {
  const [showPercentage, setShowPercentage] = useState(true);

  const sortedCharacters = useMemo(() => {
    const sortedChar = characters.sort(sortCharacterByTotalDamage);

    if (sortedChar.length === 0) return [];

    const highestDamage = sortedChar[0].damage.totalDamage;

    return characters.map((character) => ({
      ...character,
      chartPercentage: parseFloat(((character.damage.totalDamage * 100) / highestDamage).toFixed(2)),
    }));
  }, [characters]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Team Damage Comparison">
      <div
        onClick={() => setShowPercentage((prev) => !prev)}
        className="flex cursor-pointer select-none flex-col gap-2"
      >
        {sortedCharacters.map((character) => (
          <div key={character.character.key} className="grid grid-cols-[60px_auto] grid-rows-2 items-center gap-x-2">
            <CharacterIcon character={character.character} className="row-span-2 w-full" showName={false} />
            <div className="text-stroke text-lg font-[500] leading-5">{character.name}</div>
            <Progressbar
              percentage={character.chartPercentage}
              text={showPercentage ? `${character.chartPercentage}%` : `${formatNumber(character.damage.totalDamage)}`}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default function TeamPage() {
  const { characters, addedCharacters, setTeamEffects, statusAilments, setStatusAilments } = useCharacterStore();

  const [isOpen, setIsOpen] = useState(false);
  const [sortActive, setSortActive] = useState(true);

  useEffect(() => {
    if (addedCharacters.length === 0) return;
    setTeamEffects(getTeamEffects(addedCharacters));
  }, [addedCharacters, setTeamEffects]);

  const teamDamage = useMemo(() => {
    return characters.reduce((total, character) => total + (!character.active ? 0 : character.damage.totalDamage), 0);
  }, [characters]);

  const sortedCharacters = useMemo(() => {
    if (!sortActive) return characters;
    return [...characters].sort(sortCharacterByActiveTotalDamage);
  }, [characters, sortActive]);

  const activeCharacters = useMemo(() => characters.filter((character) => !!character.active), [characters]);

  const characterActiveAmount = useMemo(() => activeCharacters.length, [activeCharacters]);

  useEffect(() => {
    if (addedCharacters.length === 0) return;
    setStatusAilments(getStatusAilments(addedCharacters));
  }, [addedCharacters, setStatusAilments]);

  // const statusAilments = useMemo(() => {
  //   const statusAilmentArray: CharacterApplyAilment[] = [];
  //   characters.forEach((character) => {
  //     if (character.active) statusAilmentArray.push(...(character.character.applyStatusAilments || []));
  //   });
  //   return statusAilmentArray;
  // }, [characters]);

  return (
    <>
      <Title className="self-center text-3xl">Team Damage</Title>
      <div className="flex h-fit w-full items-center justify-center gap-1 bg-gradient-to-r from-transparent via-[#243a4a] via-50% to-transparent p-1">
        <div
          className={twMerge(
            "text-2xl font-[600] leading-6 text-[#fcf4d3] flex gap-0.5 items-center hover:underline",
            activeCharacters.length !== 0 && "cursor-pointer",
          )}
          onClick={() => {
            if (activeCharacters.length !== 0) setIsOpen(true);
          }}
        >
          <div>{formatNumber(teamDamage)}</div>
          <InfoIcon />
        </div>
      </div>
      <div className="text-center text-xl font-[500] leading-5">
        Team Slot [ {characterActiveAmount}/{characterMaxActive} ]
      </div>
      {statusAilments && (
        <div className="flex items-center gap-1">
          <div>Enemy Status Ailment :</div>
          {statusAilments.length === 0
            ? "none"
            : statusAilments.map((statusAilment) => (
                <EffectIcon
                  key={statusAilment.status.key}
                  name={statusAilment.status.name}
                  img={statusAilment.status.img}
                  active
                />
              ))}
        </div>
      )}
      <SortButton active={sortActive} setActive={setSortActive} />
      {characters.length === 0 ? (
        <div className="py-[20%] text-center opacity-50">No characters have been summoned.</div>
      ) : (
        sortedCharacters.map((character, index) => <CharacterDamage key={index} character={character} readonly />)
      )}
      <TeamModal characters={activeCharacters} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
