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
