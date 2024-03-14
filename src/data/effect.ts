import type { CharacterTypeKey } from "./characterType";
import type { Stat, StatKey } from "./stat";
import { stat } from "./stat";

type EffectTarget = "Self" | "Team" | "Enemy";

type EffectKey =
  | "BloodMoon"
  | "YachaStrength"
  | "KeenAttack4"
  | "CritDamage5"
  | "Strike4"
  | "CooldownDecrease"
  | "CritRate5"
  | "Strike5"
  | "Focus5"
  | "FierceSpirit5"
  | "WhitePureStarEnergy"
  | "Electrification"
  | "DefenseDecrease5"
  | "KeenAttack5"
  | "TimeOfJudgment"
  | "Gale5"
  | "CritRate4"
  | "AttackSpeed4"
  | "AttackSpeed5"
  | "Attack5"
  | "FierceSpirit4"
  | "EvasionDecrease4"
  | "Sharpshooter"
  | "EvasionDecrease5"
  | "Attack4"
  | "EnlightenedWarrior"
  | "SupremeRuler"
  | "WeaknessRate5"
  | "DefenseDecrease4"
  | "GuardingSpirit"
  | "SkySplitter"
  | "PrecisionStrike5"
  | "Sleepwalking"
  | "SweetDreams"
  | "Insight"
  | "CritRate4"
  | "WarriorGodMajesty"
  | "FullMoon"
  | "CrowVision"
  | "CrimsonScales"
  | "PowerOfTheRune"
  | "CurseOfDestruction"
  | "PowerOfDestruction"
  | "RulerOfNightmares"
  | "BlessedDragonOfMountHua"
  | "MasterOfTheBlossomingBlade"
  | "AgileMovement";

export interface EffectStat {
  stat: Stat;
  value: number;
  target?: EffectTarget;
}

export interface Effect {
  key: EffectKey;
  name: string;
  img: string;
  stats: EffectStat[];
  target: EffectTarget;
  applyCondition?: StatKey;
  characterTypeRestricted?: CharacterTypeKey;
}

export const effect: Record<EffectKey, Effect> = {
  BloodMoon: {
    key: "BloodMoon",
    name: "Blood Moon",
    img: "/effect/Blood Moon.webp",
    target: "Self",
    stats: [{ stat: stat.FinalAttack, value: 30 }],
  },
  YachaStrength: {
    key: "YachaStrength",
    name: "Yacha's Strength",
    img: "/effect/Yacha's Strength.webp",
    target: "Self",
    stats: [
      { stat: stat.CritRate, value: 24 },
      { stat: stat.AttackSpeed, value: 24 },
    ],
  },
  KeenAttack4: {
    key: "KeenAttack4",
    name: "Keen Attack Lv. 4",
    img: "/effect/Critical Hit Rate.webp",
    target: "Team",
    stats: [{ stat: stat.CritRate, value: 16 }],
  },
  CritDamage5: {
    key: "CritDamage5",
    name: "Critical Hit Damage Increaase Lv. 5",
    img: "/effect/Final Critical Hit Damage.webp",
    target: "Self",
    stats: [{ stat: stat.FinalCritDamage, value: 20 }],
  },
  CritRate4: {
    key: "CritRate4",
    name: "Critical Hit Rate Increase Lv. 4",
    img: "/effect/Critical Hit Rate.webp",
    target: "Self",
    stats: [{ stat: stat.CritRate, value: 16 }],
  },
  Strike4: {
    key: "Strike4",
    name: "Strike Lv. 4",
    img: "/effect/Final Critical Hit Damage.webp",
    target: "Team",
    stats: [{ stat: stat.FinalCritDamage, value: 16 }],
  },
  CooldownDecrease: {
    key: "CooldownDecrease",
    name: "Cooldown Decrease",
    img: "/effect/Cooldown Decrease.webp",
    target: "Team",
    stats: [{ stat: stat.CooldownDecrease, value: 20 }],
  },
  CritRate5: {
    key: "CritRate5",
    name: "Critical Hit Rate Increase Lv. 5",
    img: "/effect/Critical Hit Rate.webp",
    target: "Self",
    stats: [{ stat: stat.CritRate, value: 20 }],
  },
  Strike5: {
    key: "Strike5",
    name: "Strike Lv. 5",
    img: "/effect/Final Critical Hit Damage.webp",
    target: "Team",
    stats: [{ stat: stat.FinalCritDamage, value: 20 }],
  },
  Focus5: {
    key: "Focus5",
    name: "Focus Lv. 5",
    img: "/effect/Final Accuracy.webp",
    target: "Team",
    stats: [{ stat: stat.FinalAccuracy, value: 20 }],
  },
  FierceSpirit5: {
    key: "FierceSpirit5",
    name: "Fierce Spirit Lv. 5",
    img: "/effect/Final Attack.webp",
    target: "Team",
    stats: [{ stat: stat.FinalAttack, value: 25 }],
  },
  WhitePureStarEnergy: {
    key: "WhitePureStarEnergy",
    name: "White Pure Star Energy",
    img: "/effect/White Pure Star Energy.webp",
    target: "Self",
    stats: [{ stat: stat.AttackSpeed, value: 20 }],
  },
  Electrification: {
    key: "Electrification",
    name: "Electrification",
    img: "/effect/Electrification.webp",
    target: "Self",
    stats: [
      { stat: stat.CritRate, value: 20 },
      { stat: stat.FinalAccuracy, value: 50 },
    ],
  },
  DefenseDecrease5: {
    key: "DefenseDecrease5",
    name: "Defense Decrease Lv. 5",
    img: "/effect/Defense Decrease.webp",
    target: "Enemy",
    stats: [{ stat: stat.FinalDefense, value: 25 }],
  },
  KeenAttack5: {
    key: "KeenAttack5",
    name: "Keen Attack Lv. 5",
    img: "/effect/Critical Hit Rate.webp",
    target: "Team",
    stats: [{ stat: stat.CritRate, value: 20 }],
  },
  TimeOfJudgment: {
    key: "TimeOfJudgment",
    name: "Time of Judgment",
    img: "/effect/Time of Judgment.webp",
    target: "Self",
    stats: [
      { stat: stat.FinalAttack, value: 25 },
      { stat: stat.CritRate, value: 20 },
    ],
  },
  Gale5: {
    key: "Gale5",
    name: "Gale Lv. 5",
    img: "/effect/Attack Speed.webp",
    target: "Team",
    stats: [{ stat: stat.AttackSpeed, value: 20 }],
  },
  AttackSpeed4: {
    key: "AttackSpeed4",
    name: "Attack Speed Increase Lv. 4",
    img: "/effect/Attack Speed.webp",
    target: "Self",
    stats: [{ stat: stat.AttackSpeed, value: 16 }],
  },
  AttackSpeed5: {
    key: "AttackSpeed5",
    name: "Attack Speed Increase Lv. 5",
    img: "/effect/Attack Speed.webp",
    target: "Self",
    stats: [{ stat: stat.AttackSpeed, value: 20 }],
  },
  Attack5: {
    key: "Attack5",
    name: "Attack Increase Lv. 5",
    img: "/effect/Final Attack.webp",
    target: "Self",
    stats: [{ stat: stat.FinalAttack, value: 25 }],
  },
  FierceSpirit4: {
    key: "FierceSpirit4",
    name: "Fierce Spirit Lv. 4",
    img: "/effect/Final Attack.webp",
    target: "Team",
    stats: [{ stat: stat.FinalAttack, value: 20 }],
  },
  WarriorGodMajesty: {
    key: "WarriorGodMajesty",
    name: "Warrior God's Majesty",
    img: "/effect/Warrior God's Majesty.webp",
    target: "Enemy",
    stats: [{ stat: stat.FinalDamage, value: 30 }],
  },
  EvasionDecrease4: {
    key: "EvasionDecrease4",
    name: "Evasion Decrease Lv. 4",
    img: "/effect/Evasion Decrease.webp",
    target: "Enemy",
    stats: [{ stat: stat.FinalEvasion, value: 40 }],
  },
  Sharpshooter: {
    key: "Sharpshooter",
    name: "Sharpshooter",
    img: "/effect/Sharpshooter.webp",
    target: "Self",
    stats: [
      { stat: stat.FinalAttack, value: 20 },
      { stat: stat.FinalCritDamage, value: 16 },
    ],
  },
  EvasionDecrease5: {
    key: "EvasionDecrease5",
    name: "Evasion Decrease Lv. 5",
    img: "/effect/Evasion Decrease.webp",
    target: "Enemy",
    stats: [{ stat: stat.FinalEvasion, value: 50 }],
  },
  Attack4: {
    key: "Attack4",
    name: "Attack Increase Lv. 4",
    img: "/effect/Final Attack.webp",
    target: "Self",
    stats: [{ stat: stat.FinalAttack, value: 20 }],
  },
  EnlightenedWarrior: {
    key: "EnlightenedWarrior",
    name: "Enlightened Warrior",
    img: "/effect/Enlightened Warrior.webp",
    target: "Team",
    stats: [{ stat: stat.WeaknessRate, value: 24 }],
  },
  SupremeRuler: {
    key: "SupremeRuler",
    name: "Supreme Ruler",
    img: "/effect/Supreme Ruler.webp",
    target: "Self",
    stats: [
      { stat: stat.FinalAttack, value: 20 },
      { stat: stat.CritRate, value: 16 },
    ],
  },
  WeaknessRate5: {
    key: "WeaknessRate5",
    name: "Weakness Attack Rate Increase Lv. 5",
    img: "/effect/Weakness Attack Rate.webp",
    target: "Self",
    stats: [{ stat: stat.WeaknessRate, value: 20 }],
  },
  DefenseDecrease4: {
    key: "DefenseDecrease4",
    name: "Defense Decrease Lv. 4",
    img: "/effect/Defense Decrease.webp",
    target: "Enemy",
    stats: [{ stat: stat.FinalDefense, value: 20 }],
  },
  GuardingSpirit: {
    key: "GuardingSpirit",
    name: "Guarding Spirit",
    img: "/effect/Sharpshooter.webp",
    target: "Self",
    stats: [
      { stat: stat.FinalAttack, value: 25 },
      { stat: stat.FinalCritDamage, value: 20 },
    ],
  },
  SkySplitter: {
    key: "SkySplitter",
    name: "Sky Splitter",
    img: "/effect/Sky Splitter.webp",
    target: "Self",
    stats: [{ stat: stat.CritRate, value: 20 }],
  },
  PrecisionStrike5: {
    key: "PrecisionStrike5",
    name: "Precision Strike Lv. 5",
    img: "/effect/Weakness Attack Rate.webp",
    target: "Team",
    stats: [{ stat: stat.WeaknessRate, value: 20 }],
  },
  FullMoon: {
    key: "FullMoon",
    name: "Full Moon",
    img: "/effect/Full Moon.webp",
    target: "Team",
    stats: [{ stat: stat.AttackSpeed, value: 24 }],
  },
  CrowVision: {
    key: "CrowVision",
    name: "Crow Vision",
    img: "/effect/Crow Vision.webp",
    target: "Self",
    stats: [{ stat: stat.WeaknessRate, value: 24 }],
  },
  Sleepwalking: {
    key: "Sleepwalking",
    name: "Sleepwalking",
    img: "/effect/Sleepwalking.webp",
    target: "Team",
    stats: [{ stat: stat.FinalWeaknessDamage, value: 24 }],
  },
  SweetDreams: {
    key: "SweetDreams",
    name: "Sweet Dreams",
    img: "/effect/Sweet Dreams.webp",
    target: "Self",
    stats: [{ stat: stat.FinalCritDamage, value: 24 }],
  },
  Insight: {
    key: "Insight",
    name: "Insight",
    img: "/effect/Insight.webp",
    target: "Self",
    stats: [{ stat: stat.CritRate, value: 24 }],
  },
  CrimsonScales: {
    key: "CrimsonScales",
    name: "Crimson Scales",
    img: "/effect/Crimson Scales.webp",
    target: "Self",
    stats: [{ stat: stat.FinalCritDamage, value: 24 }],
  },
  PowerOfTheRune: {
    key: "PowerOfTheRune",
    name: "Power of the Rune",
    img: "/effect/Power of the Rune.webp",
    target: "Self",
    stats: [{ stat: stat.FinalAttack, value: 30 }],
  },
  CurseOfDestruction: {
    key: "CurseOfDestruction",
    name: "Curse of Destruction",
    img: "/effect/Curse of Destruction.webp",
    target: "Enemy",
    applyCondition: "NightmareStage",
    stats: [{ stat: stat.FinalDefense, value: 30 }],
  },
  PowerOfDestruction: {
    key: "PowerOfDestruction",
    name: "Power of Destruction",
    img: "/effect/Power of Destruction.webp",
    target: "Self",
    stats: [
      { stat: stat.CritRate, value: 24 },
      { stat: stat.FinalAccuracy, value: 60 },
    ],
  },
  RulerOfNightmares: {
    key: "RulerOfNightmares",
    name: "Ruler of Nightmares",
    img: "/effect/Ruler of Nightmares.webp",
    target: "Team",
    applyCondition: "NightmareStage",
    stats: [{ stat: stat.FinalDamage, value: 50 }],
  },
  BlessedDragonOfMountHua: {
    key: "BlessedDragonOfMountHua",
    name: "Blessed Dragon of Mount Hua",
    img: "/effect/Blessed Dragon of Mount Hua.webp",
    target: "Self",
    stats: [{ stat: stat.AttackSpeed, value: 20 }],
  },
  MasterOfTheBlossomingBlade: {
    key: "MasterOfTheBlossomingBlade",
    name: "Master of the Blossoming Blade",
    img: "/effect/Master of the Blossoming Blade.webp",
    target: "Self",
    stats: [
      { stat: stat.CritRate, value: 20 },
      { stat: stat.FinalAccuracy, value: 50 },
    ],
  },
  AgileMovement: {
    key: "AgileMovement",
    name: "Agile Movement",
    img: "/effect/Agile Movement.webp",
    target: "Self",
    stats: [{ stat: stat.AttackSpeed, value: 20 }],
  },
};
