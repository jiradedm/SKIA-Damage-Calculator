"use client";

import { useEffect, useMemo } from "react";

import CharacterDamage from "@/components/characterDamage";
import { getTeamEffects } from "@/components/intitalize";
import Title from "@/components/title";
import { characterMaxActive, useCharacterStore } from "@/store";

import { formatNumber } from "../../libs/format";

export default function TeamPage() {
  const { characters, addedCharacters, setTeamEffects } = useCharacterStore();

  useEffect(() => {
    if (addedCharacters.length === 0) return;
    setTeamEffects(getTeamEffects(addedCharacters));
  }, [addedCharacters, setTeamEffects]);

  const teamDamage = useMemo(() => {
    return characters.reduce((total, character) => total + (!character.active ? 0 : character.damage.totalDamage), 0);
  }, [characters]);

  const characterActiveAmount = useMemo(() => {
    return characters.filter((character) => !!character.active).length;
  }, [characters]);

  return (
    <>
      <Title className="self-center text-3xl">Team Damage</Title>
      <div className="flex h-fit w-full items-center justify-center gap-1 bg-gradient-to-r from-transparent via-[#243a4a] via-50% to-transparent p-1">
        <div className="text-2xl font-[600] leading-6 text-[#fcf4d3]">{formatNumber(teamDamage)}</div>
      </div>
      <div className="text-center text-xl font-[500] leading-5">
        Team Slot [ {characterActiveAmount}/{characterMaxActive} ]
      </div>
      {characters?.length === 0 ? (
        <div className="py-[20%] text-center opacity-50">No characters have been summoned.</div>
      ) : (
        (characters || []).map((character, index) => <CharacterDamage key={index} character={character} readonly />)
      )}
    </>
  );
}
