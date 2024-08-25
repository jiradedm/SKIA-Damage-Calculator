import type { StatKey } from "./stat";
import { stat } from "./stat";

export const characterTypeKeys = ["Defense", "Melee", "Ranged", "Support"] as const;

export type CharacterTypeKey = (typeof characterTypeKeys)[number];

export interface CharacterType {
  key: CharacterTypeKey;
  typeRestrictStat: Record<StatKey, StatKey>;
}

export const characterType: Record<CharacterTypeKey, CharacterType> = {
  Defense: {
    key: "Defense",
    typeRestrictStat: {
      Attack: stat.DefenseTypeAttack.key,
      Accuracy: stat.DefenseTypeAccuracy.key,
      CritRate: stat.DefenseTypeCritRate.key,
      WeaknessRate: stat.DefenseTypeWeaknessRate.key,
    } as Record<StatKey, StatKey>,
  },
  Melee: {
    key: "Melee",
    typeRestrictStat: {
      Attack: stat.MeleeTypeAttack.key,
      Accuracy: stat.MeleeTypeAccuracy.key,
      CritRate: stat.MeleeTypeCritRate.key,
      WeaknessRate: stat.MeleeTypeWeaknessRate.key,
    } as Record<StatKey, StatKey>,
  },
  Ranged: {
    key: "Ranged",
    typeRestrictStat: {
      Attack: stat.RangedTypeAttack.key,
      Accuracy: stat.RangedTypeAccuracy.key,
      CritRate: stat.RangedTypeCritRate.key,
      WeaknessRate: stat.RangedTypeWeaknessRate.key,
    } as Record<StatKey, StatKey>,
  },
  Support: {
    key: "Support",
    typeRestrictStat: {
      Attack: stat.SupportTypeAttack.key,
      Accuracy: stat.SupportTypeAccuracy.key,
      CritRate: stat.SupportTypeCritRate.key,
      WeaknessRate: stat.SupportTypeWeaknessRate.key,
    } as Record<StatKey, StatKey>,
  },
};

export const characterTypes = Object.values(characterType);
