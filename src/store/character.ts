"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  type Character,
  character as characterData,
  type CharacterApplyAilment,
  characterKeys,
} from "@/data/character";
import { characterTypeKeys } from "@/data/characterType";
import type { Effect } from "@/data/effect";
import { type RarityKey, rarityKeys } from "@/data/rarity";
import { type Stat, type StatKey, statKeys } from "@/data/stat";

export const characterMaxActive = 15;

export interface CharacterPotential {
  rarity: RarityKey;
  stat: StatKey;
  value: number;
}

export const addedCharacterObject = z.object({
  id: z.string(),
  level: z.number(),
  character: z.enum(characterKeys),
  star: z.number(),
  potentials: z.array(z.object({ rarity: z.enum(rarityKeys), stat: z.enum(statKeys), value: z.number() })),
  advancedPotentials: z
    .array(z.object({ rarity: z.enum(rarityKeys), stat: z.enum(statKeys), value: z.number() }))
    .optional(),
  necklaceLevel: z.number(),
  earringsLevel: z.number(),
  resonanceLevel: z.number().optional(),
  power: z
    .object({
      rarity: z.enum(rarityKeys),
      stat: z.enum(statKeys),
      type: z.enum(characterTypeKeys),
      value: z.number(),
    })
    .optional(),
  statBonus: z.number(),
  equipmentLevel: z.number().optional(),
  active: z.boolean().optional(),
});

export type AddedCharacter = z.infer<typeof addedCharacterObject>;

export interface CharacterStatData extends Stat {
  value: number;
  isMaxHitFlag?: boolean;
}

export type CharacterStatDataGroup = {
  key: StatKey;
  stats: CharacterStatData[];
};

export interface CalulatedCharacter extends Omit<AddedCharacter, "character"> {
  character: Character;
  chartPercentage?: number;
  damage: { totalDamage: number; statGroups: CharacterStatDataGroup[] };
  effects: Effect[];
}

export type TeamCompType = Record<StatKey, number>;

const defaultTeamComp = {
  TeamDefenseUnit: 1,
  TeamMeleeUnit: 1,
  TeamRangedUnit: 1,
  TeamSupportUnit: 1,
} as TeamCompType;

interface CharacterStore {
  addedCharacters: AddedCharacter[];
  setAddedCharacters: (addedCharacters: AddedCharacter[]) => void;
  addCharacter: (character: AddedCharacter) => void;
  moveCharacter: (oldIndex: number, newIndex: number) => void;
  editCharacter: (character: AddedCharacter) => void;
  deleteCharacter: (id: string) => void;
  toggleActiveCharacter: (id: string) => void;
  // computed character
  characters: CalulatedCharacter[];
  setCharacters: (characters: CalulatedCharacter[]) => void;
  // comp
  teamComp: TeamCompType;
  setTeamComp: (teamComp?: TeamCompType) => void;
  // effect
  teamEffects?: Effect[];
  setTeamEffects: (teamEffects: Effect[]) => void;
  // status
  statusAliments?: CharacterApplyAilment[];
  setStatusAliments: (statusAilments: CharacterApplyAilment[] | undefined) => void;
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      addedCharacters: [],
      setAddedCharacters: (addedCharacters) => {
        set({ addedCharacters });
      },
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

          const isRemove = !!addedCharacters[index].active;

          if (!isRemove) {
            const character = characterData[addedCharacters[index].character];

            const highLorded = state.characters.find((c) => c.active && c.character.rarity.key === "HighLord");
            if (character.rarity.key === "HighLord" && highLorded) return {};
          }

          addedCharacters[index] = { ...addedCharacters[index], active: !addedCharacters[index].active };
          return { addedCharacters };
        });
      },
      // computed character
      characters: [],
      setCharacters: (characters) => {
        set(() => ({ characters }));
      },
      // comp
      teamComp: defaultTeamComp,
      setTeamComp: (teamComp) => {
        set(() => ({ teamComp: teamComp ?? defaultTeamComp }));
      },
      // effect
      teamEffects: undefined,
      setTeamEffects: (teamEffects) => {
        set((state) => {
          if (state.teamEffects?.length === teamEffects.length) return {};
          return { teamEffects };
        });
      },
      // status
      statusAliments: undefined,
      setStatusAliments: (statusAliments) => {
        set(() => ({ statusAliments }));
      },
    }),
    {
      name: "character",
      partialize: (state) => ({ addedCharacters: state.addedCharacters }) as CharacterStore,
    },
  ),
);
