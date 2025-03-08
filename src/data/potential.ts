import type { RarityKey } from "./rarity";
import type { StatKey } from "./stat";

export const potentialValues = {
  LegendaryAttack: [40, 36, 32],
  LegendaryAccuracy: [40, 36, 32],
  LegendaryCritDamage: [40, 36, 32],
  LegendaryCritRate: [4, 3.6, 3.2],
  UniqueAttack: [26.67, 24, 21.33],
  UniqueAccuracy: [26.67, 24, 21.33],
  UniqueCritDamage: [26.67, 24, 21.33],
  UniqueCritRate: [2.67, 2.4, 2.13],
  EpicAttack: [20, 18, 16],
  EpicAccuracy: [20, 18, 16],
  EpicCritDamage: [20, 18, 16],
  EpicCritRate: [2.0, 1.8, 1.6],
  RareAttack: [16.67, 15, 13.33],
  RareAccuracy: [16.67, 15, 13.33],
  RareCritDamage: [16.67, 15, 13.33],
  RareCritRate: [1.67, 1.5, 1.33],
  NormalAttack: [13.33, 12, 10.67],
  NormalAccuracy: [13.33, 12, 10.67],
  NormalCritDamage: [13.33, 12, 10.67],
  NormalCritRate: [1.33, 1.2, 1.07],
} as Record<`${RarityKey}${StatKey}`, [number, number, number]>;

export const advancedPotentialValues = {
  LegendaryFinalAttack: [24, 21.6, 19.2],
  LegendaryFinalAccuracy: [45, 40.5, 36],
  LegendaryFinalBonusDamage: [30, 27, 24],
  UniqueFinalAttack: [16, 14.4, 12.8],
  UniqueFinalAccuracy: [30, 27, 24],
  UniqueFinalBonusDamage: [20, 18, 16],
  EpicFinalAttack: [9.6, 8.64, 7.68],
  EpicFinalAccuracy: [18, 16.2, 14.4],
  EpicFinalBonusDamage: [12, 10.8, 9.6],
} as Record<`${RarityKey}${StatKey}`, [number, number, number]>;
