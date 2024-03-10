"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Character, CharacterKey } from "@/data/character";
import type { Effect } from "@/data/effect";
import type { RarityKey } from "@/data/rarity";
import type { Stat, StatKey } from "@/data/stat";

export const characterMaxActive = 12;

export interface CharacterPotential {
  rarity: RarityKey;
  stat: StatKey;
  value: number;
}

export interface AddedCharacter {
  id: string;
  name: string;
  level: number;
  character: CharacterKey;
  star: number;
  potentials: CharacterPotential[];
  necklaceLevel: number;
  earringsLevel: number;
  statBonus: number;
  active?: boolean;
}

export interface CharacterStatData extends Omit<Stat, "key"> {
  value: number;
  isMaxHitFlag?: boolean;
}

export interface CalulatedCharacter extends Omit<AddedCharacter, "character"> {
  character: Character;
  chartPercentage?: number;
  damage: { totalDamage: number; stats: CharacterStatData[] };
  effects: Effect[];
}

interface CharacterStore {
  addedCharacters: AddedCharacter[];
  addCharacter: (character: AddedCharacter) => void;
  moveCharacter: (oldIndex: number, newIndex: number) => void;
  editCharacter: (character: AddedCharacter) => void;
  deleteCharacter: (id: string) => void;
  toggleActiveCharacter: (id: string) => void;
  // computed character
  characters: CalulatedCharacter[];
  setCharacters: (characters: CalulatedCharacter[]) => void;
  // effect
  teamEffects?: Effect[];
  setTeamEffects: (teamEffects: Effect[]) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      addedCharacters: [],
      moveCharacter: (oldIndex, newIndex) => {
        set((state) => {
          const movedAddedCharacters = arrayMove(state.addedCharacters, oldIndex, newIndex);
          return { addedCharacters: movedAddedCharacters };
        });
      },
      addCharacter: (character) => {
        set((state) => {
          const addedCharacters = [character, ...state.addedCharacters];

          return { addedCharacters };
        });
      },
      editCharacter: (character) => {
        set((state) => {
          const addedCharacters = [...state.addedCharacters];
          const index = addedCharacters.findIndex((char) => char.id === character.id);
          if (index === -1) return {};
          addedCharacters[index] = character;
          return { addedCharacters };
        });
      },
      deleteCharacter: (id) => {
        set((state) => {
          const addedCharacters = state.addedCharacters.filter((char) => char.id !== id);
          return { addedCharacters };
        });
      },
      toggleActiveCharacter: (id: string) => {
        set((state) => {
          const addedCharacters = [...state.addedCharacters];
          const index = addedCharacters.findIndex((char) => char.id === id);
          if (index === -1) return {};

          const { length } = state.addedCharacters.filter((char) => !!char.active);
          const isRemove = !!addedCharacters[index].active;

          if (!isRemove && length >= characterMaxActive) return {};

          addedCharacters[index] = { ...addedCharacters[index], active: !addedCharacters[index].active };
          return { addedCharacters };
        });
      },
      // computed character
      characters: [],
      setCharacters: (characters) => {
        set(() => ({ characters }));
      },
      // effect
      teamEffects: undefined,
      setTeamEffects: (teamEffects) => {
        set((state) => {
          if (state.teamEffects?.length === teamEffects.length) return {};
          return { teamEffects };
        });
      },
    }),
    {
      name: "character",
      partialize: (state) => ({ addedCharacters: state.addedCharacters }) as CharacterStore,
    },
  ),
);
