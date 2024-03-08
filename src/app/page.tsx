"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React, { useEffect } from "react";

import CharacterDamage from "@/components/characterDamage";
import Title from "@/components/title";
import { useCharacterStore } from "@/store";

export default function HomePage() {
  const { characters, addedCharacters, moveCharacter, setTeamEffects } = useCharacterStore();

  useEffect(() => {
    if (addedCharacters.length === 0) return;
    setTeamEffects([]);
  }, [addedCharacters, setTeamEffects]);

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
      <Title className="self-center text-3xl">Characters</Title>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={addedCharacters} strategy={verticalListSortingStrategy}>
          {characters.length === 0 ? (
            <div className="py-[20%] text-center opacity-50">No characters have been summoned.</div>
          ) : (
            characters.map((character) => <CharacterDamage key={character.id} character={character} />)
          )}
        </SortableContext>
      </DndContext>
    </>
  );
}
