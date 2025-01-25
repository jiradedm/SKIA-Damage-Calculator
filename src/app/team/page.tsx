"use client";

import { Popover } from "@headlessui/react";
import type { ComponentPropsWithoutRef, Dispatch, FC, SetStateAction } from "react";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
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
import type { CalulatedCharacter, TeamCompType } from "@/store";
import { characterMaxActive, useCharacterStore, useGeneralStore } from "@/store";

import { character as character_ } from "../../data/character";
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

const LockIcon: FC<ComponentPropsWithoutRef<"svg">> = ({ className, ...prop }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={twMerge("size-[22px]", className)}
      {...prop}
    >
      <path d="M15 9h-1V6c0-2.2-1.8-4-4-4S6 3.8 6 6v3H5c-.5 0-1 .5-1 1v7c0 .5.5 1 1 1h10c.5 0 1-.5 1-1v-7c0-.5-.5-1-1-1zm-4 7H9l.4-2.2c-.5-.2-.9-.8-.9-1.3 0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5c0 .6-.3 1.1-.9 1.3L11 16zm1-7H8V6c0-1.1.9-2 2-2s2 .9 2 2v3z" />
    </svg>
  );
};

const UnlockIcon: FC<ComponentPropsWithoutRef<"svg">> = ({ className, ...prop }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={twMerge("size-[22px]", className)}
      {...prop}
    >
      <path d="M12 9V6c0-1.1-.9-2-2-2s-2 .9-2 2H6c0-2.21 1.79-4 4-4s4 1.79 4 4v3h1c.55 0 1 .45 1 1v7c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1v-7c0-.55.45-1 1-1h7zm-1 7l-.36-2.15c.51-.24.86-.75.86-1.35 0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 .6.35 1.11.86 1.35L9 16h2z" />
    </svg>
  );
};

const TeamModal: FC<TeamModalProps> = ({ characters, isOpen, setIsOpen }) => {
  const { t } = useTranslation("page/team");
  const { t: tc } = useTranslation("character");

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
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={t("title-compare")}>
      <div
        onClick={() => setShowPercentage((prev) => !prev)}
        className="flex cursor-pointer select-none flex-col gap-2"
      >
        {sortedCharacters.map((character) => (
          <div key={character.character.key} className="grid grid-cols-[60px_auto] grid-rows-2 items-center gap-x-2">
            <CharacterIcon character={character.character} className="row-span-2 w-full" showName={false} />
            <div className="text-stroke text-lg font-[500] leading-5">{tc(character.character.key)}</div>
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

interface DiffNumberProps {
  lockedNumber?: number;
  teamDamage: number;
}

const DiffNumberComponent: FC<DiffNumberProps> = ({ lockedNumber, teamDamage }) => {
  const diffNumber = useMemo(() => {
    if (lockedNumber === undefined) return undefined;
    return teamDamage - lockedNumber;
  }, [lockedNumber, teamDamage]);

  return (
    lockedNumber !== undefined &&
    diffNumber !== undefined && (
      <Popover className="relative w-full text-center">
        <Popover.Button>
          <div
            className={twMerge("text-normal3 text-center hover:underline", diffNumber < 0 && "text-unique3")}
          >{`${diffNumber >= 0 ? "+" : "-"}${formatNumber(Math.abs(diffNumber))}`}</div>
        </Popover.Button>
        <Popover.Panel className="absolute -bottom-1 left-1/2 z-[2] flex -translate-x-1/2 translate-y-full items-center gap-1 truncate rounded-md bg-[#39465a] px-2 py-1 outline outline-2 outline-[#44627e] transition-all">
          <LockIcon className="size-[18px]" />
          <div>{formatNumber(lockedNumber)}</div>
        </Popover.Panel>
      </Popover>
    )
  );
};

export default function TeamPage() {
  const { t } = useTranslation("page/team");
  const { t: tc } = useTranslation("page/character");

  const {
    characters,
    addedCharacters,
    setTeamEffects,
    statusAliments: statusAilments,
    setStatusAliments: setStatusAilments,
    setTeamComp,
  } = useCharacterStore();

  const { sort } = useGeneralStore();

  const [lockedNumber, setLockedNumber] = useState<number | undefined>(undefined);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (addedCharacters.length === 0) return;
    setTeamEffects(getTeamEffects(addedCharacters));
  }, [addedCharacters, setTeamEffects]);

  useEffect(() => {
    const TeamDefenseUnit = addedCharacters.filter(
      (char) => !!char.active && character_[char.character].type.key === "Defense",
    ).length;
    const TeamMeleeUnit = addedCharacters.filter(
      (char) => !!char.active && character_[char.character].type.key === "Melee",
    ).length;
    const TeamRangedUnit = addedCharacters.filter(
      (char) => !!char.active && character_[char.character].type.key === "Ranged",
    ).length;
    const TeamSupportUnit = addedCharacters.filter(
      (char) => !!char.active && character_[char.character].type.key === "Support",
    ).length;
    setTeamComp({ TeamDefenseUnit, TeamMeleeUnit, TeamRangedUnit, TeamSupportUnit } as TeamCompType);
  }, [addedCharacters, setTeamComp]);

  const teamDamage = useMemo(() => {
    return characters.reduce((total, character) => total + (!character.active ? 0 : character.damage.totalDamage), 0);
  }, [characters]);

  const sortedCharacters = useMemo(() => {
    if (!sort) return characters;
    return [...characters].sort(sortCharacterByActiveTotalDamage);
  }, [characters, sort]);

  const activeCharacters = useMemo(() => characters.filter((character) => !!character.active), [characters]);

  const characterActiveAmount = useMemo(() => activeCharacters.length, [activeCharacters]);

  useEffect(() => {
    if (addedCharacters.length === 0) return;
    setStatusAilments(getStatusAilments(addedCharacters));
  }, [addedCharacters, setStatusAilments]);

  return (
    <>
      <Title className="self-center text-3xl">{t("title")}</Title>
      <div>
        <div className="relative flex h-fit w-full items-center justify-center gap-1 bg-gradient-to-r from-transparent via-[#243a4a] via-50% to-transparent p-1">
          <div
            className="cursor-pointer p-1 text-lg"
            onClick={() => setLockedNumber((prev) => (prev === undefined ? teamDamage : undefined))}
          >
            {lockedNumber === undefined ? <UnlockIcon /> : <LockIcon />}
          </div>
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
        <DiffNumberComponent lockedNumber={lockedNumber} teamDamage={teamDamage} />
      </div>
      <div className="text-center text-xl font-[500] leading-5">
        {t("slot")} [ {characterActiveAmount}/{characterMaxActive} ]
      </div>
      {statusAilments && (
        <div className="flex items-center gap-1">
          <div>{t("ailment")} :</div>
          {statusAilments.length === 0
            ? t("none")
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
      <SortButton />
      {characters.length === 0 ? (
        <div className="py-[20%] text-center opacity-50">{tc("empty")}</div>
      ) : (
        sortedCharacters.map((character, index) => <CharacterDamage key={index} character={character} readonly />)
      )}
      <TeamModal characters={activeCharacters} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
