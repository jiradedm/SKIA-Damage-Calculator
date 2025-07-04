"use client";

import { useEffect } from "react";

import { accessory } from "@/data/accessory";
import type { Attack, Character, CharacterApplyAilment as CharacterApplyAliment } from "@/data/character";
import { character as char } from "@/data/character";
import type { CharacterLevelKey } from "@/data/characterStat";
import { characterStat } from "@/data/characterStat";
import type { Effect, EffectStat } from "@/data/effect";
import type { StatKey } from "@/data/stat";
import { foodBuff, stat } from "@/data/stat";
import type { AddedCharacter, CharacterStatDataGroup, GlobalStat, TeamCompType } from "@/store";
import { useCharacterStore, useStatStore } from "@/store";

const sum = (total: number, current: number) => total + current;
const minus = (total: number, current: number) => total - current;

type StatKeyWithValue = Record<StatKey, number>;

type AttackAmount = Record<"atkAmount" | "skillAmount" | "DotAmount", number>;

const getSimulatedAttackAmount = (
  character: Character,
  attackSpeedModifier: number,
  criticalRateModifier: number,
  cooldownDecreaseModifier: number,
): AttackAmount => {
  const timeLimit = 30;
  const baseCooldown = (character.cooldown || 10) * (1 - (cooldownDecreaseModifier > 1 ? 1 : cooldownDecreaseModifier));

  const critRate = criticalRateModifier > 1 ? 1 : criticalRateModifier;

  const maxHitAmount = character.maxHit && Math.floor(character.maxHit / critRate);

  const characterAttack = character.attack;

  const averageCooldownCut = (character.attack.CritAttack.cutCooldown || 0) * critRate;

  const BasicAttackAverageAnimationTime =
    (1 - critRate) *
    (100 / (characterAttack.BasicAttack.speed * (characterAttack.BasicAttack.fixedSpeed ? 1 : attackSpeedModifier)));

  const CritAttackAverageAnimationTime =
    critRate *
    (100 / (characterAttack.CritAttack.speed * (characterAttack.CritAttack.fixedSpeed ? 1 : attackSpeedModifier)));

  const AttackAverageAnimationTime = BasicAttackAverageAnimationTime + CritAttackAverageAnimationTime;

  const skillCooldown = baseCooldown;

  let currentTime = 0;
  let atkAmount = 0;
  let skillAmount = 0;
  let timeFromLastSkillAttack = 0;

  while (currentTime < timeLimit && (maxHitAmount ? atkAmount < maxHitAmount : true)) {
    if (characterAttack.Skill && (currentTime === 0 || timeFromLastSkillAttack >= skillCooldown)) {
      skillAmount += 1;
      currentTime += 100 / (characterAttack.Skill.speed * (characterAttack.Skill.fixedSpeed ? 1 : attackSpeedModifier));
      timeFromLastSkillAttack = 0;
    } else {
      atkAmount += 1;
      currentTime += AttackAverageAnimationTime;
      if (averageCooldownCut) timeFromLastSkillAttack += averageCooldownCut;
      timeFromLastSkillAttack += AttackAverageAnimationTime;
    }
  }

  const DotAmount = !character.attack.DoT ? 0 : timeLimit / (100 / character.attack.DoT.speed);

  return { atkAmount, skillAmount, DotAmount };
};

const getModifier = (
  addedCharacter: AddedCharacter,
  globalStat: GlobalStat,
  totalEffectStats: EffectStat[],
): StatKeyWithValue => {
  const character = char[addedCharacter.character];

  const charStat =
    characterStat[`${character.rarity.key}${character.type.key}${String(addedCharacter.level) as CharacterLevelKey}`];

  const equipmentLevel = addedCharacter.equipmentLevel || 0;

  const statBonusLocked = char[addedCharacter.character].rarity.lockedStatBonus;
  const equipmentUnlocked = char[addedCharacter.character].rarity.unlockedEquipment;

  const modifier = {
    Attack: [globalStat.Attack, globalStat[character.type.typeRestrictStat.Attack]],
    FinalAttack: [
      (!statBonusLocked ? addedCharacter.statBonus : 0) * 0.25,
      !equipmentUnlocked ? 0 : equipmentLevel * 0.2,
    ],
    Accuracy: [
      accessory.EarringsOfAccuracy.value[addedCharacter.earringsLevel],
      globalStat.Accuracy,
      globalStat[character.type.typeRestrictStat.Accuracy],
    ],
    AttackSpeed: [globalStat.AttackSpeed],
    CritRate: [
      charStat.CritRate,
      globalStat.CritRate,
      globalStat[character.type.typeRestrictStat.CritRate],
      (addedCharacter.star < 4 ? 0 : equipmentLevel) * (!equipmentUnlocked ? 0 : 0.1),
    ],
    CritDamage: [
      accessory.NecklaceOfCriticalHitDamage.value[addedCharacter.necklaceLevel],
      charStat.CritDamage[addedCharacter.star],
      globalStat.CritDamage,
    ],
    CritModifier: [0],
    SkillModifier: [0],
    FinalCritDamage: [0],
    WeaknessRate: [globalStat.WeaknessRate, globalStat[character.type.typeRestrictStat.WeaknessRate]],
    FinalWeaknessDamage: [0],
    BonusDamageRate: [
      (addedCharacter.star < 6 ? 0 : equipmentLevel) * (!equipmentUnlocked ? 0 : 0.6),
      addedCharacter.resonanceLevel ?? 0,
    ],
    FinalBonusDamage: [0],
    VitalStrikeRate: [0],
    FinalVitalStrikeDamage: [0],
    FinalAccuracy: [0, (!statBonusLocked ? addedCharacter.statBonus : 0) * 0.25],
    CooldownDecrease: [0],
    CooldownDecrease2: [0],
    FinalDamage: [0],
    FinalDamage2: [0],
  } as Record<StatKey, number[]>;

  if (globalStat.FoodBuff) {
    const foodKeys = Object.keys(foodBuff) as StatKey[];
    foodKeys.forEach((key) => {
      modifier[key].push(foodBuff[key]);
    });
  }

  if (globalStat.NightmareStage) {
    const nightmareValue = (globalStat.NightmareLevel || 0) * 2;

    modifier.FinalAttack.push(nightmareValue);
    modifier.FinalAccuracy.push(nightmareValue);
    modifier.FinalCritDamage.push(nightmareValue);
    modifier.AttackSpeed.push(nightmareValue > 50 ? 50 : nightmareValue);
    modifier.CritRate.push(nightmareValue > 50 ? 50 : nightmareValue);
  }

  addedCharacter.potentials.forEach((potential) => {
    modifier[potential.stat].push(potential.value);
  });

  addedCharacter.advancedPotentials?.forEach((potential) => {
    modifier[potential.stat].push(potential.value);
  });

  totalEffectStats.forEach((effectStat) => {
    if (effectStat.target === "Enemy") return;
    modifier[effectStat.stat.key].push(effectStat.value);
  });

  const Attack = modifier.Attack.reduce(sum, 100) / 100;
  const FinalAttack = modifier.FinalAttack.reduce(sum, 100) / 100;
  const AttackSpeed = modifier.AttackSpeed.reduce(sum, 100) / 100;
  const CritRate = character.maxHit ? 1 : modifier.CritRate.reduce(sum, 0) / 100;
  const CritDamage = modifier.CritDamage.reduce(sum, 0) / 100;
  const CritModifier = modifier.CritModifier.reduce(sum, 100) / 100;
  const SkillModifier = modifier.SkillModifier.reduce(sum, 100) / 100;
  const FinalCritDamage = modifier.FinalCritDamage.reduce(sum, 100) / 100;

  const WeaknessRate = modifier.WeaknessRate.reduce(sum, 0) / 100;
  const weaknessDamageMultiplier = modifier.FinalWeaknessDamage.reduce(sum, 0);
  const FinalWeaknessDamage = (150 + (150 * weaknessDamageMultiplier) / 100) / 100;

  const BonusDamageRate = modifier.BonusDamageRate.reduce(sum, 0) / 100;
  const FinalBonusDamageMultiplier = modifier.FinalBonusDamage.reduce(sum, 0);
  const FinalBonusDamage = (150 + (150 * FinalBonusDamageMultiplier) / 100) / 100;

  const VitalStrikeRate = modifier.VitalStrikeRate.reduce(sum, 0) / 100;
  const FinalVitalStrikeDamageMultiplier = modifier.FinalVitalStrikeDamage.reduce(sum, 0);
  const FinalVitalStrikeDamage = (130 + (130 * FinalVitalStrikeDamageMultiplier) / 100) / 100;

  const CooldownDecrease = modifier.CooldownDecrease.reduce(sum, 0) / 100;
  const CooldownDecrease2 = modifier.CooldownDecrease2.reduce(sum, 0) / 100;
  const FinalDamage = modifier.FinalDamage.reduce(sum, 100) / 100;
  const FinalDamage2 = modifier.FinalDamage2.reduce(sum, 100) / 100;
  const Accuracy = modifier.Accuracy.reduce(sum, 100) / 100;
  const FinalAccuracy = modifier.FinalAccuracy.reduce(sum, 100) / 100;

  return {
    Attack,
    FinalAttack,
    Accuracy,
    FinalAccuracy,
    AttackSpeed,
    CritRate,
    CritDamage,
    CritModifier,
    SkillModifier,
    FinalCritDamage,
    WeaknessRate,
    FinalWeaknessDamage,
    BonusDamageRate,
    FinalBonusDamage,
    VitalStrikeRate,
    FinalVitalStrikeDamage,
    CooldownDecrease,
    CooldownDecrease2,
    FinalDamage,
    FinalDamage2,
  } as StatKeyWithValue;
};

const getEnemyModifer = (
  totalEffectStats: EffectStat[],
  globalStat: GlobalStat,
  appliedAilments?: CharacterApplyAliment[],
): StatKeyWithValue => {
  const enemyModifier = {
    FinalDefense: [0],
    FinalDamage: [0],
    FinalDamage2: [0],
    FinalEvasion: [0],
    CritResist: [(globalStat.EnemyCritResist || 0) * -1],
    WeaknessResist: [0],
    BonusDamageResist: [0],
    VitalStrikeResist: [0],
    ReductionRate: [(globalStat.EnemyReductionRate || 0) * -1],
  } as Record<StatKey, number[]>;

  totalEffectStats.forEach((effectStat) => {
    if (effectStat.target !== "Enemy") return;
    enemyModifier[effectStat.stat.key].push(effectStat.value);
  });

  appliedAilments?.forEach((appliedAilment) => {
    if (!appliedAilment.status.effect) return;
    const modifier = appliedAilment.uptime > 1 ? 1 : appliedAilment.uptime;
    enemyModifier[appliedAilment.status.effect.stat].push(appliedAilment.status.effect.value * modifier);
  });

  const FinalDefense = enemyModifier.FinalDefense.reduce(minus, 100) / 100;
  const FinalEvasion = enemyModifier.FinalEvasion.reduce(minus, 100) / 100;
  const FinalDamage = enemyModifier.FinalDamage.reduce(sum, 100) / 100;
  const FinalDamage2 = enemyModifier.FinalDamage2.reduce(sum, 100) / 100;
  const CritResist = enemyModifier.CritResist.reduce(sum, 0) / 100;
  const WeaknessResist = enemyModifier.WeaknessResist.reduce(sum, 0) / 100;
  const BonusDamageResist = enemyModifier.BonusDamageResist.reduce(sum, 0) / 100;
  const VitalStrikeResist = enemyModifier.VitalStrikeResist.reduce(sum, 0) / 100;
  const ReductionRate = enemyModifier.ReductionRate.reduce(sum, 0) / 100;

  return {
    FinalDefense,
    FinalEvasion,
    FinalDamage,
    FinalDamage2,
    CritResist,
    WeaknessResist,
    BonusDamageResist,
    VitalStrikeResist,
    ReductionRate,
  } as StatKeyWithValue;
};

const getCharacterAttackDamage = (
  character: Character,
  addedCharacter: AddedCharacter,
  globalStat: GlobalStat,
  modifier: StatKeyWithValue,
  enemyModifier: StatKeyWithValue,
  statusAilments?: CharacterApplyAliment[],
) => {
  const charStat =
    characterStat[`${character.rarity.key}${character.type.key}${String(addedCharacter.level) as CharacterLevelKey}`];

  const baseAttackValue =
    (charStat.Attack[addedCharacter.star] * modifier.Attack + (globalStat.AttackInfluence || 0)) * modifier.FinalAttack;

  const enemyDefenseModifier = enemyModifier.FinalDefense < 0 ? 0 : enemyModifier.FinalDefense;
  const enemyDefense = (globalStat.EnemyDefense || 0) * enemyDefenseModifier;

  const getCritRate = (rate: number): number => {
    if (rate > 1) return 1;
    if (rate < 0) return 0;
    return rate;
  };

  const critRate = getCritRate(modifier.CritRate - enemyModifier.CritResist * -1);

  const enemyDamageReductionRate = 1 - enemyDefense / (enemyDefense + 2 * baseAttackValue);
  const enemyDamageReduction = enemyDamageReductionRate < 0.3 ? 0.3 : enemyDamageReductionRate;

  const weaknessRateModifier = modifier.WeaknessRate - enemyModifier.WeaknessResist * -1;
  const weaknessRate = weaknessRateModifier > 1 ? 1 : weaknessRateModifier;
  const weaknessModifier = 1 + (modifier.FinalWeaknessDamage - 1) * weaknessRate;

  const bonusDamageRateModifier = modifier.BonusDamageRate - enemyModifier.BonusDamageResist * -1;
  const bonusDamageRate = bonusDamageRateModifier > 1 ? 1 : bonusDamageRateModifier;
  const bonusDamageModifier = 1 + (modifier.FinalBonusDamage - 1) * bonusDamageRate;

  const vitalStrikeRateModifier = modifier.VitalStrikeRate - enemyModifier.VitalStrikeResist * -1;
  const vitalStrikeRate = vitalStrikeRateModifier > 1 ? 1 : vitalStrikeRateModifier;
  const vitalStrikeModifier = 1 + (modifier.FinalVitalStrikeDamage - 1) * vitalStrikeRate;

  const reductionRate = getCritRate(enemyModifier.ReductionRate * -1) * 0.3;
  const enemyReduction = 1 - reductionRate;

  const baseAttack =
    baseAttackValue *
    enemyDamageReduction *
    enemyReduction *
    enemyModifier.FinalDamage *
    enemyModifier.FinalDamage2 *
    weaknessModifier *
    bonusDamageModifier *
    vitalStrikeModifier *
    modifier.FinalDamage *
    modifier.FinalDamage2;

  const enemyEvasionModifier = enemyModifier.FinalEvasion < 0 ? 0 : enemyModifier.FinalEvasion;
  const enemyEvasion = (globalStat.EnemyEvasion || 0) * enemyEvasionModifier;

  const baseAccuracy = charStat.Accuracy[addedCharacter.star] * modifier.Accuracy * modifier.FinalAccuracy;

  const hitRateRadio = baseAccuracy / enemyEvasion;

  const hitRate = hitRateRadio > 1 ? 1 : hitRateRadio;
  const finalHitRate = (1 - vitalStrikeRate) * hitRate + vitalStrikeRate;

  const getApplyConditionUptime = (condition?: StatKey) => {
    if (!condition) return undefined;
    if (!statusAilments) return globalStat[condition];

    // TODO: [TEMP] ADD ENEMY TYPE TO FORMATION ?
    if (condition.startsWith("EnemyType")) return globalStat[condition];

    const statusAilment = statusAilments.find((alignment) => alignment.status.key === condition);
    if (statusAilment) return statusAilment.uptime;
    return 0;
  };

  const getApplyConditionMultiplier = (attack?: Attack) => {
    if (!attack) return 1;
    if (!attack.attackModifier?.FinalDamage?.applyCondition) return 1;
    const mutipliers = attack.attackModifier.FinalDamage.applyCondition.map((applyCondition) => {
      const attackFinalDamageModifierPercent = attack.attackModifier
        ? attack.attackModifier.FinalDamage?.value || 0
        : 0;
      const attackConditionUptime = getApplyConditionUptime(applyCondition);
      const attackFinalDamageModifier =
        (100 + (!attackConditionUptime ? 0 : attackFinalDamageModifierPercent * attackConditionUptime)) / 100;
      return attackFinalDamageModifier;
    });
    return mutipliers?.reduce((acc, cur) => acc * cur, 1);
  };

  const basicAttackFinalDamageModifier = getApplyConditionMultiplier(character.attack.BasicAttack);

  // *** BASIC ATTACK DAMAGE ***
  const basicAttackDamage = baseAttack * (character.attack.BasicAttack.modifier / 100) * basicAttackFinalDamageModifier;

  const critAttackFinalDamageModifier = getApplyConditionMultiplier(character.attack.CritAttack);
  // *** CRITICAL HIT ATTACK DAMAGE ***

  const critAttackDamage =
    baseAttack *
    (character.attack.CritAttack.modifier / 100) *
    modifier.CritDamage *
    modifier.FinalCritDamage *
    modifier.CritModifier *
    critAttackFinalDamageModifier;

  // *** AVERAGE ATTACK DAMAGE ***
  const attackDamage = ((1 - critRate) * basicAttackDamage + critAttackDamage * critRate) * finalHitRate;

  const skillFinalDamageModifier = getApplyConditionMultiplier(character.attack.Skill);

  // SKILL EXTRA CRITICAL MODIFIER
  const skillCritModifierPercent = character.attack.Skill?.attackModifier
    ? character.attack.Skill?.attackModifier.CritRate?.value || 0
    : 0;

  const skillCritRate = critRate + skillCritModifierPercent / 100;
  const skillCritModifier = skillCritRate > 1 ? 1 : skillCritRate;

  // *** SKILL DAMAGE ***
  const skillDamage =
    baseAttack *
    ((character.attack.Skill?.modifier || 0) / 100) *
    skillCritModifier *
    modifier.CritDamage *
    modifier.FinalCritDamage *
    modifier.SkillModifier *
    skillFinalDamageModifier *
    finalHitRate;

  const overTimeAttackModifier = character.attack.DoT?.modifier || 0;

  // *** DoT DAMAGE ***
  const overTimeDamage =
    baseAttack * (overTimeAttackModifier / 100) * critRate * modifier.CritDamage * modifier.FinalCritDamage;

  return {
    baseAttackValue,
    baseAccuracy,
    basicAttackDamage,
    critAttackDamage,
    attackDamage,
    skillDamage,
    overTimeDamage,
    hitRate: finalHitRate,
    enemyDamageReductionRate,
    enemyDefenseModifier,
    enemyEvasionModifier,
    enemyReduction: 1 - enemyReduction,
    enemyCritResistModifier: enemyModifier.CritResist * -1,
    WeaknessResistModifier: enemyModifier.WeaknessResist * -1,
    BonusDamageResistModifier: enemyModifier.BonusDamageResist * -1,
    VitalStrikeResistModifier: enemyModifier.VitalStrikeResist * -1,
  };
};

const calculateDamage = (
  addedCharacter: AddedCharacter,
  globalStat: GlobalStat,
  totalEffectStats: EffectStat[],
  statusAilments?: CharacterApplyAliment[],
) => {
  const character = char[addedCharacter.character];

  const modifier = getModifier(addedCharacter, globalStat, totalEffectStats);
  const enemyModifier = getEnemyModifer(totalEffectStats, globalStat, statusAilments);

  // TODO REMOVE DUPS
  const getCritRate = (rate: number): number => {
    if (rate > 1) return 1;
    if (rate < 0) return 0;
    return rate;
  };

  const attack = getSimulatedAttackAmount(
    character,
    modifier.AttackSpeed,
    getCritRate(modifier.CritRate - enemyModifier.CritResist * -1),
    modifier.CooldownDecrease + modifier.CooldownDecrease2,
  );

  const {
    baseAttackValue,
    baseAccuracy,
    basicAttackDamage,
    critAttackDamage,
    attackDamage,
    skillDamage,
    overTimeDamage,
    hitRate,
    enemyReduction,
    enemyDamageReductionRate,
    enemyDefenseModifier,
    enemyEvasionModifier,
    enemyCritResistModifier,
    WeaknessResistModifier,
    BonusDamageResistModifier,
    VitalStrikeResistModifier,
  } = getCharacterAttackDamage(character, addedCharacter, globalStat, modifier, enemyModifier, statusAilments);

  const totalAttackDamage = attackDamage * attack.atkAmount;
  const totalSkillDamage = skillDamage * attack.skillAmount;
  const totalOverTimelDamage = overTimeDamage * attack.DotAmount;

  const totalDamage = totalAttackDamage + totalSkillDamage + totalOverTimelDamage;

  const statGroups: CharacterStatDataGroup[] = [
    {
      key: "characterStat",
      stats: [
        { ...stat.Attack, value: baseAttackValue, isFlat: true },
        { ...stat.Attack, value: modifier.Attack },
        { ...stat.FinalAttack, value: modifier.FinalAttack },
        { ...stat.Accuracy, value: baseAccuracy, isFlat: true, noFormat: true },
        { ...stat.Accuracy, value: modifier.Accuracy },
        { ...stat.FinalAccuracy, value: modifier.FinalAccuracy },
        { ...stat.HitRate, value: hitRate },
        { ...stat.AttackSpeed, value: modifier.AttackSpeed },
        { ...stat.CritRate, value: modifier.CritRate, isMaxHitFlag: !!character.maxHit },
        { ...stat.CritDamage, value: modifier.CritDamage },
        { ...stat.FinalCritDamage, value: modifier.FinalCritDamage },
        { ...stat.CritModifier, value: modifier.CritModifier },
        { ...stat.WeaknessRate, value: modifier.WeaknessRate },
        { ...stat.FinalWeaknessDamage, value: modifier.FinalWeaknessDamage },
        { ...stat.BonusDamageRate, value: modifier.BonusDamageRate },
        { ...stat.FinalBonusDamage, value: modifier.FinalBonusDamage },
        { ...stat.VitalStrikeRate, value: modifier.VitalStrikeRate },
        { ...stat.FinalVitalStrikeDamage, value: modifier.FinalVitalStrikeDamage },
        { ...stat.FinalDamage, value: modifier.FinalDamage },
        { ...stat.FinalDamage2, value: modifier.FinalDamage2 },
        { ...stat.CooldownDecrease, value: modifier.CooldownDecrease },
        // { ...stat.CooldownDecrease2, value: modifier.CooldownDecrease2 },
      ],
    },
    {
      key: "enemyStat",
      stats: [
        { ...stat.EnemyCritResist, value: enemyCritResistModifier },
        { ...stat.EnemyWeaknessResist, value: WeaknessResistModifier },
        { ...stat.EnemyBonusDamageResist, value: BonusDamageResistModifier },
        { ...stat.EnemyVitalStrikeResist, value: VitalStrikeResistModifier },
        { ...stat.EnemyFinalEvasion, value: enemyEvasionModifier },
        { ...stat.EnemyFinalDefense, value: enemyDefenseModifier },
        { ...stat.EnemyDamageReduction, value: 1 - enemyDamageReductionRate },
        { ...stat.EnemyReductionRate, value: enemyModifier.ReductionRate * -1 },
        { ...stat.EnemyReduction, value: enemyReduction },
        { ...stat.EnemyFinalDamageTaken, value: enemyModifier.FinalDamage },
        { ...stat.EnemyFinalDamageTaken2, value: enemyModifier.FinalDamage2 },
      ],
    },
    {
      key: "attackStat",
      stats: [
        { ...stat.BasicAttackDamage, value: basicAttackDamage },
        { ...stat.CriticalHitAttackDamage, value: critAttackDamage },
        { ...stat.AverageAttackDamage, value: attackDamage },
        { ...stat.AttackAmount, value: attack.atkAmount, isMaxHitFlag: !!character.maxHit },
        { ...stat.TotalAttackDamage, value: totalAttackDamage },
      ],
    },
    {
      key: "skillStat",
      stats: [
        { ...stat.AverageSkillDamage, value: skillDamage },
        { ...stat.SkillAmount, value: attack.skillAmount },
        { ...stat.TotalSkillDamage, value: totalSkillDamage },
      ],
    },
    {
      key: "dotStat",
      stats: [
        { ...stat.AverageDoTDamage, value: overTimeDamage },
        { ...stat.DoTAmount, value: attack.DotAmount },
        { ...stat.TotalDoTDamage, value: totalOverTimelDamage },
      ],
    },
  ];

  return { statGroups, totalDamage };
};

export const getTeamEffects = (addedCharacters: AddedCharacter[]) => {
  const effects: Effect[] = [];
  const activeCharacters = addedCharacters.filter((character) => !!character.active);

  activeCharacters.forEach((addedCharacter) => {
    const character = char[addedCharacter.character];

    character.effects?.forEach((effect) => {
      if (effect.target === "Self") return;
      if (effect.isHighLordPower) {
        if (!addedCharacter.power) return;
        const characterTypeRestricted = addedCharacter.power.type;
        const stats = [{ stat: stat[addedCharacter.power.stat], value: addedCharacter.power.value }];
        effects.push({ ...effect, characterTypeRestricted, stats });
        return;
      }

      effects.push(effect);
    });
  });

  return effects;
};

const getEffect = (
  addedCharacter: AddedCharacter,
  teamEffects: Effect[],
  gloabalStat: GlobalStat,
  teamComp: TeamCompType,
  statusAliments?: CharacterApplyAliment[],
) => {
  const character = char[addedCharacter.character];

  let highLordEffect: Effect | undefined;
  const baseEffects: Effect[] = [];

  // ADD CHARACTER EFFECT
  character.effects?.forEach((effect) => {
    if (effect.isHighLordPower) {
      if (!addedCharacter.power || teamEffects.length !== 0) return;
      const characterTypeRestricted = addedCharacter.power.type;
      const stats = [{ stat: stat[addedCharacter.power.stat], value: addedCharacter.power.value }];
      highLordEffect = { ...effect, characterTypeRestricted, stats };
      return;
    }

    const invalidType = effect.characterTypeRestricted && effect.characterTypeRestricted !== character.type.key;
    const invalidCondition = effect.applyCondition && !gloabalStat[effect.applyCondition];
    if (invalidType || invalidCondition) return;

    effect.stats.forEach((_stat) => {
      if (_stat.conditionType === "Team") {
        let conditionedValue = 0;

        _stat.condition?.forEach((condition) => {
          const amount = teamComp[condition.stat];
          const maxApply = condition.maxApply ?? 1;
          const value = condition.value * (amount > maxApply ? maxApply : amount);
          conditionedValue += value;
        });

        _stat.value = conditionedValue;
        return _stat;
      }
      if (_stat.conditionType === "Enemy") {
        let conditionedValue = 0;

        _stat.condition?.forEach((condition) => {
          const appliedAlignment = statusAliments?.find((statusAilment) => condition.stat === statusAilment.status.key);

          if (appliedAlignment) {
            const amount = appliedAlignment.uptime;
            const maxApply = condition.maxApply ?? 1;
            const value = condition.value * (amount > maxApply ? maxApply : amount);
            conditionedValue += value;
          }
        });

        _stat.value = conditionedValue;
        return _stat;
      }
      return stat;
    });

    baseEffects.push(effect);
  });

  // ADD TEAM EFFECT
  if (addedCharacter.active) {
    teamEffects.forEach((effect) => {
      const invalidType = effect.characterTypeRestricted && effect.characterTypeRestricted !== character.type.key;
      const invalidCondition = effect.applyCondition && !gloabalStat[effect.applyCondition];
      if (invalidType || invalidCondition) return;

      if (effect.isHighLordPower) {
        highLordEffect = effect;
        return;
      }

      const index = baseEffects.findIndex((baseEffect) => baseEffect.key === effect.key);
      if (index !== -1) return;

      baseEffects.push(effect);
    });
  }

  return { highLordEffect, effects: baseEffects };
};

const getTotalEffectStats = (effects: Effect[]) => {
  const effectStats: EffectStat[] = [];
  effects.forEach((effect) => {
    effect.stats.forEach((effectStat) => {
      const index = effectStats.findIndex(
        (stat_) => stat_.stat.key === effectStat.stat.key && effect.target === stat_.target,
      );

      if (index === -1 || effectStat.stat.isStacked) {
        effectStats.push({ ...effectStat, target: effect.target });
      } else {
        const exist = effectStats[index];
        if (exist.value < effectStat.value) {
          effectStats[index] = { ...effectStat, target: effect.target };
        }
      }
    });
  });

  return effectStats;
};

export const getStatusAilments = (addedCharacters: AddedCharacter[]) => {
  const statusAilmentArray: CharacterApplyAliment[] = [];
  addedCharacters.forEach((addedCharacter) => {
    if (!addedCharacter.active) return;

    const character = char[addedCharacter.character];

    (character.applyStatusAilments || []).forEach((statusAilment) => {
      const index = statusAilmentArray.findIndex((alignment) => {
        return alignment.status.key === statusAilment.status.key;
      });
      if (index === -1) {
        statusAilmentArray.push(statusAilment);
        return;
      }
      if (statusAilment.uptime > statusAilmentArray[index].uptime) statusAilmentArray[index] = statusAilment;
    });
  });
  return statusAilmentArray;
};

// TODO: CHANGE CALCULATE TO COMPONENT LEVEL
const Intitalize = () => {
  const { teamEffects, addedCharacters, setCharacters, statusAliments: statusAilments, teamComp } = useCharacterStore();
  const { globalStat } = useStatStore();

  useEffect(() => {
    if (!teamEffects) return;

    const characters = addedCharacters.map((addedCharacter) => {
      const { highLordEffect, effects } = getEffect(addedCharacter, teamEffects, globalStat, teamComp, statusAilments);

      const effectStats = getTotalEffectStats(effects);

      if (highLordEffect) effectStats.push(...highLordEffect.stats);

      const damage = calculateDamage(addedCharacter, globalStat, effectStats, statusAilments);

      const getDisplayEffects = (_effects: Effect[]) => {
        if (!highLordEffect) return _effects;
        if (_effects.some((effect) => effect.isHighLordPower)) return _effects;
        return [..._effects, highLordEffect];
      };

      return {
        ...addedCharacter,
        character: char[addedCharacter.character],
        effects: getDisplayEffects(effects),
        effectStats,
        damage,
      };
    });
    setCharacters(characters);
  }, [addedCharacters, teamEffects, setCharacters, statusAilments, globalStat, teamComp]);

  return <></>;
};

export default Intitalize;
