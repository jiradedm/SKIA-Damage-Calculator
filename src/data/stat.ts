export type StatKey =
  | "AttackInfluence"
  | "Attack"
  | "Accuracy"
  | "AttackSpeed"
  | "FinalAccuracy"
  | "FinalEvasion"
  | "CritRate"
  | "CritDamage"
  | "WeaknessRate"
  | "DefenseTypeAttack"
  | "DefenseTypeAccuracy"
  | "DefenseTypeCritRate"
  | "DefenseTypeWeaknessRate"
  | "MeleeTypeAttack"
  | "MeleeTypeCritRate"
  | "MeleeTypeAccuracy"
  | "MeleeTypeWeaknessRate"
  | "RangedTypeAttack"
  | "RangedTypeAccuracy"
  | "RangedTypeCritRate"
  | "RangedTypeWeaknessRate"
  | "SupportTypeAttack"
  | "SupportTypeAccuracy"
  | "SupportTypeCritRate"
  | "SupportTypeWeaknessRate"
  | "FinalAttack"
  | "FinalDefense"
  | "FinalWeaknessDamage"
  | "FinalCritDamage"
  | "FinalDamage"
  | "CooldownDecrease"
  | "EnemyDefense"
  | "EnemyEvasion"
  | "EnemyTypeDefense"
  | "EnemyTypeMelee"
  | "EnemyTypeRanged"
  | "EnemyTypeSupport"
  | "EnemyCritResist"
  | "EnemyBurned"
  | "EnemyPoisoned"
  | "EnemyBleeding"
  | "EnemyCursed"
  | "NightmareStage"
  | "NightmareLevel"
  | "FoodBuff";

export interface Stat {
  key: StatKey;
  name: string;
  isFlat?: boolean;
  noFormat?: boolean;
  isToggle?: boolean;
  isNotAdd?: boolean;
}

export const foodBuff = {
  FinalAttack: 15,
  AttackSpeed: 15,
  FinalAccuracy: 15,
  CritRate: 15,
  FinalCritDamage: 15,
} as Record<StatKey, number>;

export type StatData = Record<StatKey, Stat>;

const baseStat = {
  Attack: {
    key: "Attack",
    name: "Attack",
  },
  Accuracy: {
    key: "Accuracy",
    name: "Accuracy",
  },
  CritRate: {
    key: "CritRate",
    name: "Critical Hit Rate",
  },
  CritDamage: {
    key: "CritDamage",
    name: "Critical Hit Damage",
  },
} as StatData;

export const stat: StatData = {
  ...baseStat,
  FinalAttack: {
    key: "FinalAttack",
    name: "Final Attack",
  },
  AttackSpeed: {
    key: "AttackSpeed",
    name: "Attack Speed",
  },
  FinalAccuracy: {
    key: "FinalAccuracy",
    name: "Final Accuracy",
  },
  FinalEvasion: {
    key: "FinalEvasion",
    name: "Final Evasion",
  },
  FinalDefense: {
    key: "FinalDefense",
    name: "Final Defense",
  },
  FinalWeaknessDamage: {
    key: "FinalWeaknessDamage",
    name: "Final Weakness Attack Damage",
  },
  WeaknessRate: {
    key: "WeaknessRate",
    name: "Weakness Attack Rate",
  },
  FinalCritDamage: {
    key: "FinalCritDamage",
    name: "Final Critical Hit Damage",
  },
  FinalDamage: {
    key: "FinalDamage",
    name: "Final Damage",
  },
  AttackInfluence: {
    key: "AttackInfluence",
    name: "Attack",
    isFlat: true,
  },
  DefenseTypeAttack: {
    key: "DefenseTypeAttack",
    name: "Defense Type Hero Attack",
  },
  DefenseTypeAccuracy: {
    key: "DefenseTypeAccuracy",
    name: "Defense Type Hero Accuracy",
  },
  DefenseTypeCritRate: {
    key: "DefenseTypeCritRate",
    name: "Defense Type Critical Hit Rate",
  },
  DefenseTypeWeaknessRate: {
    key: "DefenseTypeWeaknessRate",
    name: "Defense Type Weakness Attack Rate",
  },
  MeleeTypeAttack: {
    key: "MeleeTypeAttack",
    name: "Melee Type Hero Attack",
  },
  MeleeTypeAccuracy: {
    key: "MeleeTypeAccuracy",
    name: "Melee Type Hero Accuracy",
  },
  MeleeTypeCritRate: {
    key: "MeleeTypeCritRate",
    name: "Melee Type Critical Hit Rate",
  },
  MeleeTypeWeaknessRate: {
    key: "MeleeTypeWeaknessRate",
    name: "Melee Type Weakness Attack Rate",
  },
  RangedTypeAttack: {
    key: "RangedTypeAttack",
    name: "Ranged Type Hero Attack",
  },
  RangedTypeAccuracy: {
    key: "RangedTypeAccuracy",
    name: "Ranged Type Hero Accuracy",
  },
  RangedTypeCritRate: {
    key: "RangedTypeCritRate",
    name: "Ranged Type Critical Hit Rate",
  },
  RangedTypeWeaknessRate: {
    key: "RangedTypeWeaknessRate",
    name: "Ranged Type Weakness Attack Rate",
  },
  SupportTypeAttack: {
    key: "SupportTypeAttack",
    name: "Support Type Hero Attack",
  },
  SupportTypeAccuracy: {
    key: "SupportTypeAccuracy",
    name: "Support Type Hero Accuracy",
  },
  SupportTypeCritRate: {
    key: "SupportTypeCritRate",
    name: "Support Type Critical Hit Rate",
  },
  SupportTypeWeaknessRate: {
    key: "SupportTypeWeaknessRate",
    name: "Support Type Weakness Attack Rate",
  },
  CooldownDecrease: {
    key: "CooldownDecrease",
    name: "Decrease Skill Cooldown",
    isFlat: true,
  },
  // ENEMY
  EnemyDefense: {
    key: "EnemyDefense",
    name: "Defense",
    isFlat: true,
  },
  EnemyEvasion: {
    key: "EnemyEvasion",
    name: "Evasion",
    isFlat: true,
  },
  EnemyCritResist: {
    key: "EnemyCritResist",
    name: "Critical Hit Resist",
  },
  EnemyTypeDefense: {
    key: "EnemyTypeDefense",
    name: "Enemy is Defense Type",
    isToggle: true,
  },
  EnemyTypeMelee: {
    key: "EnemyTypeMelee",
    name: "Enemy is Melee Type",
    isToggle: true,
  },
  EnemyTypeRanged: {
    key: "EnemyTypeRanged",
    name: "Enemy is Ranged Type",
    isToggle: true,
  },
  EnemyTypeSupport: {
    key: "EnemyTypeSupport",
    name: "Enemy is Support Type",
    isToggle: true,
  },
  NightmareStage: {
    key: "NightmareStage",
    name: "Nightmare Stage",
    isToggle: true,
  },
  EnemyBurned: {
    key: "EnemyBurned",
    name: "Enemy is Burned",
    isToggle: true,
  },
  EnemyPoisoned: {
    key: "EnemyBurned",
    name: "Enemy is Burned",
    isToggle: true,
  },
  EnemyCursed: {
    key: "EnemyCursed",
    name: "Enemy is Cursed",
    isToggle: true,
  },
  EnemyBleeding: {
    key: "EnemyBleeding",
    name: "Enemy is Bleeding",
    isToggle: true,
  },
  FoodBuff: {
    key: "FoodBuff",
    name: "Food Buff",
    isToggle: true,
  },
  NightmareLevel: {
    key: "NightmareLevel",
    name: "Nightmare Fragment Level",
    isFlat: true,
    isNotAdd: true,
  },
};

export const baseStats = Object.values(baseStat);
