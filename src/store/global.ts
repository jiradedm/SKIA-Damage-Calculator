"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { type Stat, type StatKey } from "@/data/stat";

export type GlobalStat = Record<StatKey, number>;

export const baseGlobalStat = {
  AttackInfluence: 0,
  Attack: 0,
  Accuracy: 0,
  AttackSpeed: 0,
  CritRate: 0,
  CritDamage: 0,
  WeaknessRate: 0,
  DefenseTypeAttack: 0,
  DefenseTypeAccuracy: 0,
  DefenseTypeCritRate: 0,
  DefenseTypeWeaknessRate: 0,
  MeleeTypeAttack: 0,
  MeleeTypeAccuracy: 0,
  MeleeTypeCritRate: 0,
  MeleeTypeWeaknessRate: 0,
  RangedTypeAttack: 0,
  RangedTypeAccuracy: 0,
  RangedTypeCritRate: 0,
  RangedTypeWeaknessRate: 0,
  SupportTypeAttack: 0,
  SupportTypeAccuracy: 0,
  SupportTypeCritRate: 0,
  SupportTypeWeaknessRate: 0,
  EnemyDefense: 0,
  EnemyEvasion: 0,
  EnemyCritResist: 0,
  EnemyTypeDefense: 0,
  EnemyTypeMelee: 0,
  EnemyTypeRanged: 0,
  EnemyTypeSupport: 0,
  EnemyBurned: 0,
  EnemyPoisoned: 0,
  EnemyBleeding: 0,
  EnemyCursed: 0,
  EnemySilenced: 0,
  EnemyFrostbitten: 0,
  FoodBuff: 0,
  NightmareStage: 0,
  NightmareLevel: 0,
} as GlobalStat;

export interface GlobalStatData extends Stat {
  value: number;
}

interface StatStore {
  globalStat: GlobalStat;
  setGlobalStatValue: (key: StatKey, value: number) => void;
}

const getGlobalStat = (globalStat: GlobalStat) => {
  const base = {} as GlobalStat;
  const keys = Object.keys(baseGlobalStat) as StatKey[];
  keys.forEach((key) => {
    base[key] = globalStat[key] || 0;
  });
  return base;
};

export const useStatStore = create<StatStore>()(
  persist(
    (set) => ({
      globalStat: baseGlobalStat,
      setGlobalStatValue: (key, value) => {
        set((state) => {
          if (!state.globalStat) return {};
          const globalStat = { ...state.globalStat };
          globalStat[key] = value;
          return { globalStat };
        });
      },
    }),
    {
      name: "stat",
      partialize: (state) => ({ globalStat: getGlobalStat(state.globalStat) }) as StatStore,
    },
  ),
);
