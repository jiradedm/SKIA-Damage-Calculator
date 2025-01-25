"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import CharacterDamage from "@/components/characterDamage";
import PortButton from "@/components/portButton";
import SortButton from "@/components/sortButton";
import Title from "@/components/title";
import { sortCharacterByTotalDamage } from "@/libs/sort";
import { useCharacterStore, useGeneralStore } from "@/store";

export default function HomePage() {
  const { t } = useTranslation("page/character");

  const { sort } = useGeneralStore();

  const { characters, addedCharacters, moveCharacter, setTeamEffects, setStatusAliments: setStatusAilments, setTeamComp } =
    useCharacterStore();

  const sortedCharacters = useMemo(() => {
    if (!sort) return characters;
    return [...characters].sort(sortCharacterByTotalDamage);
  }, [characters, sort]);

  useEffect(() => {
    if (addedCharacters.length === 0) return;
    setTeamEffects([]);
    setTeamComp(undefined);
  }, [addedCharacters, setTeamComp, setTeamEffects]);

  useEffect(() => {
    if (addedCharacters.length === 0) return;
    setStatusAilments(undefined);
  }, [addedCharacters, setStatusAilments]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = addedCharacters.findIndex((char) => char.id === active.id);
      const newIndex = addedCharacters.findIndex((char) => char.id === over.id);
      moveCharacter(oldIndex, newIndex);
    }
  };

  return (
    <>
      <Title className="self-center text-3xl">{t("title")}</Title>
      <PortButton data={JSON.stringify(addedCharacters)} exportDisabled={addedCharacters.length === 0} />
      <SortButton />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={addedCharacters} strategy={verticalListSortingStrategy}>
          {characters.length === 0 ? (
            <div className="py-[20%] text-center opacity-50">{t("empty")}</div>
          ) : (
            sortedCharacters.map((character) => <CharacterDamage key={character.id} character={character} />)
          )}
        </SortableContext>
      </DndContext>
    </>
  );
}
