"use client";

import { useEffect } from "react";

import { accessory } from "@/data/accessory";
import type { Character } from "@/data/character";
import { character as char } from "@/data/character";
import { characterStat } from "@/data/characterStat";
import type { Effect, EffectStat } from "@/data/effect";
import type { StatKey } from "@/data/stat";
import { foodBuff, stat } from "@/data/stat";
import type { AddedCharacter, CharacterStatData, GlobalStat } from "@/store";
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
  const baseCooldown = 10 * (1 - (cooldownDecreaseModifier > 1 ? 1 : cooldownDecreaseModifier));

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

  const charStat = characterStat[`${character.rarity.key}${character.type.key}${60}`];

  const modifier = {
    Attack: [globalStat.Attack, globalStat[character.type.typeRestrictStat.Attack]],
    FinalAttack: [addedCharacter.statBonus * 0.25],
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
      globalStat.EnemyCritResist * -1,
    ],
    CritDamage: [
      accessory.NecklaceOfCriticalHitDamage.value[addedCharacter.necklaceLevel],
      charStat.CritDamage[addedCharacter.star],
      globalStat.CritDamage,
    ],
    FinalCritDamage: [0],
    WeaknessRate: [globalStat.WeaknessRate, globalStat[character.type.typeRestrictStat.WeaknessRate]],
    FinalWeaknessDamage: [0],
    FinalAccuracy: [0],
    CooldownDecrease: [0],
    FinalDamage: [0],
  } as Record<StatKey, number[]>;

  if (globalStat.FoodBuff) {
    const foodKeys = Object.keys(foodBuff) as StatKey[];
    foodKeys.forEach((key) => {
      modifier[key].push(foodBuff[key]);
    });
  }

  if (globalStat.NightmareStage) {
    const nightmareValue = globalStat.NightmareLevel * 2;

    modifier.FinalAttack.push(nightmareValue);
    modifier.Accuracy.push(nightmareValue);
    modifier.AttackSpeed.push(nightmareValue > 50 ? 50 : nightmareValue);
    modifier.CritRate.push(nightmareValue > 50 ? 50 : nightmareValue);
  }

  addedCharacter.potentials.forEach((potential) => {
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
  const FinalCritDamage = modifier.FinalCritDamage.reduce(sum, 100) / 100;
  const WeaknessRate = modifier.WeaknessRate.reduce(sum, 0) / 100;
  const FinalWeaknessDamage = modifier.FinalWeaknessDamage.reduce(sum, 150) / 100;
  const CooldownDecrease = modifier.CooldownDecrease.reduce(sum, 0) / 100;
  const FinalDamage = modifier.FinalDamage.reduce(sum, 100) / 100;
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
    FinalCritDamage,
    WeaknessRate,
    FinalWeaknessDamage,
    CooldownDecrease,
    FinalDamage,
  } as StatKeyWithValue;
};

const getEnemyModifer = (totalEffectStats: EffectStat[]): StatKeyWithValue => {
  const enemyModifier = {
    FinalDefense: [0],
    FinalDamage: [0],
    FinalEvasion: [0],
  } as Record<StatKey, number[]>;

  totalEffectStats.forEach((effectStat) => {
    if (effectStat.target !== "Enemy") return;
    enemyModifier[effectStat.stat.key].push(effectStat.value);
  });

  const FinalDefense = enemyModifier.FinalDefense.reduce(minus, 100) / 100;
  const FinalEvasion = enemyModifier.FinalEvasion.reduce(minus, 100) / 100;
  const FinalDamage = enemyModifier.FinalDamage.reduce(sum, 100) / 100;

  return { FinalDefense, FinalEvasion, FinalDamage } as StatKeyWithValue;
};

const getCharacterAttackDamage = (
  character: Character,
  star: number,
  globalStat: GlobalStat,
  modifier: StatKeyWithValue,
  enemyModifier: StatKeyWithValue,
) => {
  const charStat = characterStat[`${character.rarity.key}${character.type.key}${60}`];

  const baseAttackValue = (charStat.Attack[star] * modifier.Attack + globalStat.AttackInfluence) * modifier.FinalAttack;

  const enemyDefenseModifier = enemyModifier.FinalDefense < 0 ? 0 : enemyModifier.FinalDefense;
  const enemyDefense = globalStat.EnemyDefense * enemyDefenseModifier;

  const enemyDamageReductionRate = 1 - enemyDefense / (enemyDefense + 2 * baseAttackValue);
  const enemyDamageReduction = enemyDamageReductionRate < 0.3 ? 0.3 : enemyDamageReductionRate;

  const weaknessRate = modifier.WeaknessRate > 1 ? 1 : modifier.WeaknessRate;

  const weaknessModifier = 1 + (modifier.FinalWeaknessDamage - 1) * weaknessRate;

  const baseAttack = baseAttackValue * enemyDamageReduction * enemyModifier.FinalDamage * modifier.FinalDamage;

  const enemyEvasionModifier = enemyModifier.FinalEvasion < 0 ? 0 : enemyModifier.FinalEvasion;
  const enemyEvasion = globalStat.EnemyEvasion * enemyEvasionModifier;

  const baseAccuracy = charStat.Accuracy[star] * modifier.Accuracy * modifier.FinalAccuracy;

  const hitRateRadio = baseAccuracy / enemyEvasion;
  const hitRate = hitRateRadio > 1 ? 1 : hitRateRadio;

  // BASIC ATTACK FINAL DAMAGE MODIFIER
  const basicAttackFinalDamageModifierPercent = character.attack.BasicAttack.attackModifier
    ? character.attack.BasicAttack.attackModifier.FinalDamage?.value || 0
    : 0;
  const condition1 = character.attack.BasicAttack?.attackModifier?.FinalDamage?.applyCondition;
  const conditionChecked1 = condition1 && globalStat[condition1];
  const basicAttackFinalDamageModifier =
    (100 + (!condition1 || conditionChecked1 ? basicAttackFinalDamageModifierPercent : 0)) / 100;

  // *** BASIC ATTACK DAMAGE ***
  const basicAttackDamage = baseAttack * (character.attack.BasicAttack.modifier / 100) * basicAttackFinalDamageModifier;

  // CRITICAL HIT ATTACK FINAL ATTACK
  const critAttackFinalDamageModifierPercent = character.attack.CritAttack.attackModifier
    ? character.attack.CritAttack.attackModifier.FinalDamage?.value || 0
    : 0;
  const condition0 = character.attack.CritAttack?.attackModifier?.FinalDamage?.applyCondition;
  const conditionChecked0 = condition0 && globalStat[condition0];
  const critAttackFinalDamageModifier =
    (100 + (!condition0 || conditionChecked0 ? critAttackFinalDamageModifierPercent : 0)) / 100;

  // *** CRITICAL HIT ATTACK DAMAGE ***
  const critAttackDamage =
    baseAttack *
    (character.attack.CritAttack.modifier / 100) *
    modifier.CritDamage *
    modifier.FinalCritDamage *
    critAttackFinalDamageModifier;

  const critRate = modifier.CritRate > 1 ? 1 : modifier.CritRate;

  // *** AVERAGE ATTACK DAMAGE ***
  const attackDamage = ((1 - critRate) * basicAttackDamage + critAttackDamage * critRate) * weaknessModifier * hitRate;

  // SKILL FINAL ATTACK MODIFIER
  const SkillFinalDamageModifierPercent = character.attack.Skill?.attackModifier
    ? character.attack.Skill?.attackModifier.FinalDamage?.value || 0
    : 0;
  const condition = character.attack.Skill?.attackModifier?.FinalDamage?.applyCondition;
  const conditionChecked = condition && globalStat[condition];
  const skillFinalDamageModifier = (100 + (!condition || conditionChecked ? SkillFinalDamageModifierPercent : 0)) / 100;

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
    skillFinalDamageModifier *
    weaknessModifier *
    hitRate;

  const overTimeAttackModifier = character.attack.DoT?.modifier || 0;
  // *** SKILL DAMAGE ***

  const overTimeDamage =
    baseAttack *
    (overTimeAttackModifier / 100) *
    critRate *
    modifier.CritDamage *
    modifier.FinalCritDamage *
    weaknessModifier *
    hitRate;

  return {
    baseAttackValue,
    baseAccuracy,
    basicAttackDamage,
    critAttackDamage,
    attackDamage,
    skillDamage,
    overTimeDamage,
    hitRate,
    enemyDamageReductionRate,
    enemyDefenseModifier,
    enemyEvasionModifier,
  };
};

const calculateDamage = (addedCharacter: AddedCharacter, globalStat: GlobalStat, totalEffectStats: EffectStat[]) => {
  const character = char[addedCharacter.character];

  const modifier = getModifier(addedCharacter, globalStat, totalEffectStats);
  const attack = getSimulatedAttackAmount(
    character,
    modifier.AttackSpeed,
    modifier.CritRate,
    modifier.CooldownDecrease,
  );

  const enemyModifier = getEnemyModifer(totalEffectStats);

  const {
    baseAttackValue,
    baseAccuracy,
    basicAttackDamage,
    critAttackDamage,
    attackDamage,
    skillDamage,
    overTimeDamage,
    hitRate,
    enemyDamageReductionRate,
    enemyDefenseModifier,
    enemyEvasionModifier,
  } = getCharacterAttackDamage(character, addedCharacter.star, globalStat, modifier, enemyModifier);

  const totalAttackDamage = attackDamage * attack.atkAmount;
  const totalSkillDamage = skillDamage * attack.skillAmount;
  const totalOverTimelDamage = overTimeDamage * attack.DotAmount;

  const totalDamage = totalAttackDamage + totalSkillDamage + totalOverTimelDamage;

  const stats: CharacterStatData[] = [
    { name: "Attack", value: baseAttackValue, isFlat: true },
    { name: "Accuracy", value: baseAccuracy, isFlat: true, noFormat: true },
    ...(Object.keys(modifier) as StatKey[]).map((key) => ({
      name: stat[key].name,
      value: modifier[key],
      isFlat: stat[key].isFlat,
      isMaxHitFlag: !!character.maxHit && key === "CritRate",
    })),
    { name: "Hit Rate", value: hitRate },
    { name: "Enemy Final Evasion", value: enemyEvasionModifier },
    { name: "Enemy Final Defense", value: enemyDefenseModifier },
    { name: "Enemy Damage Reduction", value: 1 - enemyDamageReductionRate, isFlat: false },
    { name: "Enemy Final Damage Taken", value: enemyModifier.FinalDamage, isFlat: false },
    { name: "Basic Attack Damage", value: basicAttackDamage, isFlat: true },
    { name: "Critical Hit Attack Damage", value: critAttackDamage, isFlat: true },
    { name: "Average Attack Damage", value: attackDamage, isFlat: true },
    { name: "Attack Amount", value: attack.atkAmount, isFlat: true, isMaxHitFlag: !!character.maxHit },
    { name: "Total Attack Damage", value: totalAttackDamage, isFlat: true },
    { name: "Average Skill Damage", value: skillDamage, isFlat: true },
    { name: "Skill Amount", value: attack.skillAmount, isFlat: true },
    { name: "Total Skill Damage", value: totalSkillDamage, isFlat: true },
    { name: "Average DoT Damage", value: overTimeDamage, isFlat: true },
    { name: "DoT Amount", value: attack.DotAmount, isFlat: true },
    { name: "Total DoT Damage", value: totalOverTimelDamage, isFlat: true },
  ];

  return {
    stats,
    totalDamage,
  };
};

export const getTeamEffects = (addedCharacters: AddedCharacter[]) => {
  const effects: Effect[] = [];
  const activeCharacters = addedCharacters.filter((character) => !!character.active);
  activeCharacters.forEach((addedCharacter) => {
    const character = char[addedCharacter.character];
    character.effects?.forEach((effect) => {
      if (effect.target !== "Self") effects.push(effect);
    });
  });
  return effects;
};

const getEffect = (addedCharacter: AddedCharacter, teamEffects: Effect[], gloabalStat: GlobalStat) => {
  const character = char[addedCharacter.character];

  const baseEffects: Effect[] = [];

  // ADD CHARACTER EFFECT
  character.effects?.forEach((effect) => {
    const invalidType = effect.characterTypeRestricted && effect.characterTypeRestricted !== character.type.key;
    const invalidCondition = effect.applyCondition && !gloabalStat[effect.applyCondition];
    if (invalidType || invalidCondition) return;
    baseEffects.push(effect);
  });

  // ADD TEAM EFFECT
  if (addedCharacter.active) {
    teamEffects.forEach((effect) => {
      const invalidType = effect.characterTypeRestricted && effect.characterTypeRestricted !== character.type.key;
      const invalidCondition = effect.applyCondition && !gloabalStat[effect.applyCondition];
      if (invalidType || invalidCondition) return;
      const index = baseEffects.findIndex((baseEffect) => baseEffect.key === effect.key);
      if (index !== -1) return;
      baseEffects.push(effect);
    });
  }

  return baseEffects;
};

const getTotalEffectStats = (effects: Effect[]) => {
  const effectStats: EffectStat[] = [];
  effects.forEach((effect) => {
    effect.stats.forEach((effectStat) => {
      const index = effectStats.findIndex(
        (stat_) => stat_.stat.key === effectStat.stat.key && effect.target === stat_.target,
      );
      if (index !== -1) {
        const exist = effectStats[index];
        if (exist.value < effectStat.value) {
          effectStats[index] = { ...effectStat, target: effect.target };
        }
      } else effectStats.push({ ...effectStat, target: effect.target });
    });
  });
  return effectStats;
};

// TODO: CHANGE CALCULATE TO COMPONENT LEVEL
const Intitalize = () => {
  const { teamEffects, addedCharacters, setCharacters } = useCharacterStore();
  const { globalStat } = useStatStore();

  useEffect(() => {
    if (!teamEffects) return;
    const characters = addedCharacters.map((addedCharacter) => {
      const effects = getEffect(addedCharacter, teamEffects, globalStat);
      const effectStats = getTotalEffectStats(effects);

      const damage = calculateDamage(addedCharacter, globalStat, effectStats);
      return { ...addedCharacter, character: char[addedCharacter.character], effects, effectStats, damage };
    });
    setCharacters(characters);
  }, [addedCharacters, teamEffects, setCharacters, globalStat]);

  return <></>;
};

export default Intitalize;
