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
  | "FoodBuff"
  | "HitRate"
  | "EnemyFinalEvasion"
  | "EnemyFinalDefense"
  | "EnemyDamageReduction"
  | "EnemyFinalDamageTaken"
  | "BasicAttackDamage"
  | "CriticalHitAttackDamage"
  | "AverageAttackDamage"
  | "AttackAmount"
  | "TotalAttackDamage"
  | "AverageSkillDamage"
  | "SkillAmount"
  | "TotalSkillDamage"
  | "AverageDoTDamage"
  | "DoTAmount"
  | "TotalDoTDamage";

export interface Stat {
  key: StatKey;
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
  Attack: { key: "Attack" },
  Accuracy: { key: "Accuracy" },
  CritRate: { key: "CritRate" },
  CritDamage: { key: "CritDamage" },
} as StatData;

export const stat: StatData = {
  ...baseStat,
  FinalAttack: { key: "FinalAttack" },
  AttackSpeed: { key: "AttackSpeed" },
  FinalAccuracy: { key: "FinalAccuracy" },
  FinalEvasion: { key: "FinalEvasion" },
  FinalDefense: { key: "FinalDefense" },
  FinalWeaknessDamage: { key: "FinalWeaknessDamage" },
  WeaknessRate: { key: "WeaknessRate" },
  FinalCritDamage: { key: "FinalCritDamage" },
  FinalDamage: { key: "FinalDamage" },
  AttackInfluence: { key: "AttackInfluence", isFlat: true },
  DefenseTypeAttack: { key: "DefenseTypeAttack" },
  DefenseTypeAccuracy: { key: "DefenseTypeAccuracy" },
  DefenseTypeCritRate: { key: "DefenseTypeCritRate" },
  DefenseTypeWeaknessRate: { key: "DefenseTypeWeaknessRate" },
  MeleeTypeAttack: { key: "MeleeTypeAttack" },
  MeleeTypeAccuracy: { key: "MeleeTypeAccuracy" },
  MeleeTypeCritRate: { key: "MeleeTypeCritRate" },
  MeleeTypeWeaknessRate: { key: "MeleeTypeWeaknessRate" },
  RangedTypeAttack: { key: "RangedTypeAttack" },
  RangedTypeAccuracy: { key: "RangedTypeAccuracy" },
  RangedTypeCritRate: { key: "RangedTypeCritRate" },
  RangedTypeWeaknessRate: { key: "RangedTypeWeaknessRate" },
  SupportTypeAttack: { key: "SupportTypeAttack" },
  SupportTypeAccuracy: { key: "SupportTypeAccuracy" },
  SupportTypeCritRate: { key: "SupportTypeCritRate" },
  SupportTypeWeaknessRate: { key: "SupportTypeWeaknessRate" },
  CooldownDecrease: { key: "CooldownDecrease" },
  // ENEMY
  EnemyDefense: { key: "EnemyDefense", isFlat: true },
  EnemyEvasion: { key: "EnemyEvasion", isFlat: true },
  EnemyCritResist: { key: "EnemyCritResist" },
  EnemyTypeDefense: { key: "EnemyTypeDefense", isToggle: true },
  EnemyTypeMelee: { key: "EnemyTypeMelee", isToggle: true },
  EnemyTypeRanged: { key: "EnemyTypeRanged", isToggle: true },
  EnemyTypeSupport: { key: "EnemyTypeSupport", isToggle: true },
  NightmareStage: { key: "NightmareStage", isToggle: true },
  EnemyBurned: { key: "EnemyBurned", isToggle: true },
  EnemyPoisoned: { key: "EnemyPoisoned", isToggle: true },
  EnemyCursed: { key: "EnemyCursed", isToggle: true },
  EnemyBleeding: { key: "EnemyBleeding", isToggle: true },
  FoodBuff: { key: "FoodBuff", isToggle: true },
  NightmareLevel: { key: "NightmareLevel", isFlat: true, isNotAdd: true },
  // EXTRA
  HitRate: { key: "HitRate" },
  EnemyFinalEvasion: { key: "EnemyFinalEvasion" },
  EnemyFinalDefense: { key: "EnemyFinalDefense" },
  EnemyDamageReduction: { key: "EnemyDamageReduction" },
  EnemyFinalDamageTaken: { key: "EnemyFinalDamageTaken" },
  BasicAttackDamage: { key: "BasicAttackDamage", isFlat: true },
  CriticalHitAttackDamage: { key: "CriticalHitAttackDamage", isFlat: true },
  AverageAttackDamage: { key: "AverageAttackDamage", isFlat: true },
  AttackAmount: { key: "AttackAmount", isFlat: true },
  TotalAttackDamage: { key: "TotalAttackDamage", isFlat: true },
  AverageSkillDamage: { key: "AverageSkillDamage", isFlat: true },
  SkillAmount: { key: "SkillAmount", isFlat: true },
  TotalSkillDamage: { key: "TotalSkillDamage", isFlat: true },
  AverageDoTDamage: { key: "AverageDoTDamage", isFlat: true },
  DoTAmount: { key: "DoTAmount", isFlat: true },
  TotalDoTDamage: { key: "TotalDoTDamage", isFlat: true },
};

export const baseStats = Object.values(baseStat);
