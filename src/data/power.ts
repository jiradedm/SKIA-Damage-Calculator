import type { CharacterTypeKey } from "@/data/characterType";
import { characterTypes } from "@/data/characterType";
import type { RarityKey } from "@/data/rarity";

import type { StatKey } from "./stat";

const powerStatValues = {
  NormalFinalAttack: [13.5, 14.25, 15],
  RareFinalAttack: [18, 19, 20],
  EpicFinalAttack: [22.5, 23.75, 25],
  UniqueFinalAttack: [27, 28.5, 30],
  LegendaryFinalAttack: [31.5, 33.25, 35],
  NormalFinalAccuracy: [13.5, 14.25, 15],
  RareFinalAccuracy: [18, 19, 20],
  EpicFinalAccuracy: [22.5, 23.75, 25],
  UniqueFinalAccuracy: [27, 28.5, 30],
  LegendaryFinalAccuracy: [31.5, 33.25, 35],
  NormalFinalCritDamage: [13.5, 14.25, 15],
  RareFinalCritDamage: [18, 19, 20],
  EpicFinalCritDamage: [22.5, 23.75, 25],
  UniqueFinalCritDamage: [27, 28.5, 30],
  LegendaryFinalCritDamage: [31.5, 33.25, 35],
} as Record<`${RarityKey}${StatKey}`, [number, number, number]>;

export type PowerValueKey = `${RarityKey}${StatKey}${CharacterTypeKey}`;

const mapPowerValues = () => {
  const arr = {} as Record<PowerValueKey, [number, number, number]>;
  characterTypes.forEach((characterType) => {
    Object.keys(powerStatValues).forEach((key) => {
      arr[`${key}${characterType.key}` as PowerValueKey] = powerStatValues[key as `${RarityKey}${StatKey}`];
    });
  });
  return arr;
};

export const powerValues = mapPowerValues();
