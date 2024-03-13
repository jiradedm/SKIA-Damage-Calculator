import type { Stat } from "./stat";
import { stat } from "./stat";

type AccessoryKey = "EarringsOfAccuracy" | "NecklaceOfCriticalHitDamage";

export interface Accessory {
  key: AccessoryKey;
  stat: Stat;
  value: number[];
}

export const accessory: Record<AccessoryKey, Accessory> = {
  EarringsOfAccuracy: {
    key: "EarringsOfAccuracy",
    stat: stat.Accuracy,
    value: [0, 47, 98, 155, 220, 300],
  },
  NecklaceOfCriticalHitDamage: {
    key: "NecklaceOfCriticalHitDamage",
    stat: stat.CritDamage,
    value: [0, 31.25, 65.5, 103, 146.76, 200],
  },
};
