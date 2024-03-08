import type { StatKey } from "./stat";
import { stat } from "./stat";

export type CharacterTypeKey = "Defense" | "Melee" | "Ranged" | "Support";

export interface CharacterType {
  key: CharacterTypeKey;
  name: string;
  status: {
    Attack: number[];
    CritRate: number;
    CritDamage: number[];
  };
  typeRestrictStat: Record<StatKey, StatKey>;
}

export const characterType: Record<CharacterTypeKey, CharacterType> = {
  Defense: {
    key: "Defense",
    name: "Defense",
    status: {
      Attack: [18472, 22166, 26230, 30848, 35836, 41193, 46919, 53015, 59480, 66499, 73888],
      CritRate: 12.83,
      CritDamage: [125, 131.25, 137.5, 143.75, 150, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
    },
    typeRestrictStat: {
      Attack: stat.DefenseTypeAttack.key,
      Accuracy: stat.DefenseTypeAccuracy.key,
      CritRate: stat.DefenseTypeCritRate.key,
      WeaknessRate: stat.DefenseTypeWeaknessRate.key,
    } as Record<StatKey, StatKey>,
  },
  Melee: {
    key: "Melee",
    name: "Melee",
    status: {
      Attack: [40639, 48767, 57707, 67867, 78840, 90625, 103223, 116634, 130858, 146300, 162556],
      CritRate: 17.11,
      CritDamage: [125, 131.25, 137.5, 143.75, 150, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
    },
    typeRestrictStat: {
      Attack: stat.MeleeTypeAttack.key,
      Accuracy: stat.MeleeTypeAccuracy.key,
      CritRate: stat.MeleeTypeCritRate.key,
      WeaknessRate: stat.MeleeTypeWeaknessRate.key,
    } as Record<StatKey, StatKey>,
  },
  Ranged: {
    key: "Ranged",
    name: "Ranged",
    status: {
      Attack: [45719, 54863, 64921, 76351, 88695, 101953, 116126, 131214, 147215, 164588, 182876],
      CritRate: 21.38,
      CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
    },
    typeRestrictStat: {
      Attack: stat.RangedTypeAttack.key,
      Accuracy: stat.RangedTypeAccuracy.key,
      CritRate: stat.RangedTypeCritRate.key,
      WeaknessRate: stat.RangedTypeWeaknessRate.key,
    } as Record<StatKey, StatKey>,
  },
  Support: {
    key: "Support",
    name: "Support",
    status: {
      Attack: [36944, 44333, 52460, 61696, 71671, 82385, 93838, 106029, 118960, 132998, 147776],
      CritRate: 21.38,
      CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
    },
    typeRestrictStat: {
      Attack: stat.SupportTypeAttack.key,
      Accuracy: stat.SupportTypeAccuracy.key,
      CritRate: stat.SupportTypeCritRate.key,
      WeaknessRate: stat.SupportTypeWeaknessRate.key,
    } as Record<StatKey, StatKey>,
  },
};

export const characterTypeKeys = Object.keys(characterType) as CharacterTypeKey[];
