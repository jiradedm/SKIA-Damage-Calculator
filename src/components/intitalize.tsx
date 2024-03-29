"use client";

import { useEffect } from "react";

import { accessory } from "@/data/accessory";
import type { Character, CharacterApplyAilment } from "@/data/character";
import { character as char } from "@/data/character";
import type { CharacterLevelKey } from "@/data/characterStat";
import { characterStat } from "@/data/characterStat";
import type { Effect, EffectStat } from "@/data/effect";
import type { StatKey } from "@/data/stat";
import { foodBuff, stat } from "@/data/stat";
import type { AddedCharacter, CharacterStatDataGroup, GlobalStat } from "@/store";
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

  const modifier = {
    Attack: [globalStat.Attack, globalStat[character.type.typeRestrictStat.Attack]],
    FinalAttack: [addedCharacter.statBonus * 0.25],
    Accuracy: [
      accessory.EarringsOfAccuracy.value[addedCharacter.earringsLevel],
      globalStat.Accuracy,
      globalStat[character.type.typeRestrictStat.Accuracy],
    ],
    AttackSpeed: [globalStat.AttackSpeed],
    CritRate: [charStat.CritRate, globalStat.CritRate, globalStat[character.type.typeRestrictStat.CritRate]],
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
  const weaknessDamageMultiplier = modifier.FinalWeaknessDamage.reduce(sum, 0);
  const FinalWeaknessDamage = (150 + (150 * weaknessDamageMultiplier) / 100) / 100;
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

const getEnemyModifer = (totalEffectStats: EffectStat[], globalStat: GlobalStat): StatKeyWithValue => {
  const enemyModifier = {
    FinalDefense: [0],
    FinalDamage: [0],
    FinalEvasion: [0],
    CritResist: [globalStat.EnemyCritResist * -1],
  } as Record<StatKey, number[]>;

  totalEffectStats.forEach((effectStat) => {
    if (effectStat.target !== "Enemy") return;
    enemyModifier[effectStat.stat.key].push(effectStat.value);
  });

  const FinalDefense = enemyModifier.FinalDefense.reduce(minus, 100) / 100;
  const FinalEvasion = enemyModifier.FinalEvasion.reduce(minus, 100) / 100;
  const FinalDamage = enemyModifier.FinalDamage.reduce(sum, 100) / 100;
  const CritResist = enemyModifier.CritResist.reduce(sum, 0) / 100;

  return { FinalDefense, FinalEvasion, FinalDamage, CritResist } as StatKeyWithValue;
};

const getCharacterAttackDamage = (
  character: Character,
  addedCharacter: AddedCharacter,
  globalStat: GlobalStat,
  modifier: StatKeyWithValue,
  enemyModifier: StatKeyWithValue,
  statusAilments?: CharacterApplyAilment[],
) => {
  const charStat =
    characterStat[`${character.rarity.key}${character.type.key}${String(addedCharacter.level) as CharacterLevelKey}`];

  const baseAttackValue =
    (charStat.Attack[addedCharacter.star] * modifier.Attack + globalStat.AttackInfluence) * modifier.FinalAttack;

  const enemyDefenseModifier = enemyModifier.FinalDefense < 0 ? 0 : enemyModifier.FinalDefense;
  const enemyDefense = globalStat.EnemyDefense * enemyDefenseModifier;

  const getCritRate = (rate: number): number => {
    if (rate > 1) return 1;
    if (rate < 0) return 0;
    return rate;
  };

  const critRate = getCritRate(modifier.CritRate - enemyModifier.CritResist * -1);

  const enemyDamageReductionRate = 1 - enemyDefense / (enemyDefense + 2 * baseAttackValue);
  const enemyDamageReduction = enemyDamageReductionRate < 0.3 ? 0.3 : enemyDamageReductionRate;

  const weaknessRate = modifier.WeaknessRate > 1 ? 1 : modifier.WeaknessRate;

  const weaknessModifier = 1 + (modifier.FinalWeaknessDamage - 1) * weaknessRate;

  const baseAttack = baseAttackValue * enemyDamageReduction * enemyModifier.FinalDamage * modifier.FinalDamage;

  const enemyEvasionModifier = enemyModifier.FinalEvasion < 0 ? 0 : enemyModifier.FinalEvasion;
  const enemyEvasion = globalStat.EnemyEvasion * enemyEvasionModifier;

  const baseAccuracy = charStat.Accuracy[addedCharacter.star] * modifier.Accuracy * modifier.FinalAccuracy;

  const hitRateRadio = baseAccuracy / enemyEvasion;
  const hitRate = hitRateRadio > 1 ? 1 : hitRateRadio;

  const getApplyConditionUptime = (condition?: StatKey) => {
    if (!condition) return undefined;
    if (!statusAilments) return globalStat[condition];
    // TODO: [TEMP FIX] ADD ENEMY TYPE TO FORMATION
    if (condition.startsWith("EnemyType")) return globalStat[condition];
    const statusAilment = statusAilments.find((alignment) => alignment.status.key === condition);
    if (statusAilment) return statusAilment.uptime;
    return 0;
  };

  // BASIC ATTACK FINAL DAMAGE MODIFIER
  const basicAttackFinalDamageModifierPercent = character.attack.BasicAttack.attackModifier
    ? character.attack.BasicAttack.attackModifier.FinalDamage?.value || 0
    : 0;
  const basicAttackConditionUptime = getApplyConditionUptime(
    character.attack.CritAttack?.attackModifier?.FinalDamage?.applyCondition,
  );
  const basicAttackFinalDamageModifier =
    (100 + (!basicAttackConditionUptime ? 0 : basicAttackFinalDamageModifierPercent * basicAttackConditionUptime)) /
    100;

  // *** BASIC ATTACK DAMAGE ***
  const basicAttackDamage = baseAttack * (character.attack.BasicAttack.modifier / 100) * basicAttackFinalDamageModifier;

  // CRITICAL HIT ATTACK FINAL ATTACK
  const critAttackFinalDamageModifierPercent = character.attack.CritAttack.attackModifier
    ? character.attack.CritAttack.attackModifier.FinalDamage?.value || 0
    : 0;
  const critAttackConditionUptime = getApplyConditionUptime(
    character.attack.CritAttack?.attackModifier?.FinalDamage?.applyCondition,
  );
  const critAttackFinalDamageModifier =
    (100 + (!critAttackConditionUptime ? 0 : critAttackFinalDamageModifierPercent * critAttackConditionUptime)) / 100;

  // *** CRITICAL HIT ATTACK DAMAGE ***
  const critAttackDamage =
    baseAttack *
    (character.attack.CritAttack.modifier / 100) *
    modifier.CritDamage *
    modifier.FinalCritDamage *
    critAttackFinalDamageModifier;

  // *** AVERAGE ATTACK DAMAGE ***
  const attackDamage = ((1 - critRate) * basicAttackDamage + critAttackDamage * critRate) * weaknessModifier * hitRate;

  // SKILL FINAL ATTACK MODIFIER
  const SkillFinalDamageModifierPercent = character.attack.Skill?.attackModifier
    ? character.attack.Skill?.attackModifier.FinalDamage?.value || 0
    : 0;

  const skillConditionUptime = getApplyConditionUptime(
    character.attack.Skill?.attackModifier?.FinalDamage?.applyCondition,
  );

  const skillFinalDamageModifier =
    (100 + (!skillConditionUptime ? 0 : SkillFinalDamageModifierPercent * skillConditionUptime)) / 100;

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

  // *** DoT DAMAGE ***
  const overTimeDamage =
    baseAttack *
    (overTimeAttackModifier / 100) *
    critRate *
    modifier.CritDamage *
    modifier.FinalCritDamage *
    weaknessModifier;

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
    enemyCritResistModifier: enemyModifier.CritResist * -1,
  };
};

const calculateDamage = (
  addedCharacter: AddedCharacter,
  globalStat: GlobalStat,
  totalEffectStats: EffectStat[],
  statusAilments?: CharacterApplyAilment[],
) => {
  const character = char[addedCharacter.character];

  const modifier = getModifier(addedCharacter, globalStat, totalEffectStats);
  const attack = getSimulatedAttackAmount(
    character,
    modifier.AttackSpeed,
    modifier.CritRate,
    modifier.CooldownDecrease,
  );

  const enemyModifier = getEnemyModifer(totalEffectStats, globalStat);

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
    enemyCritResistModifier,
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
        { ...stat.WeaknessRate, value: modifier.WeaknessRate },
        { ...stat.FinalWeaknessDamage, value: modifier.FinalWeaknessDamage },
        { ...stat.FinalDamage, value: modifier.FinalDamage },
        { ...stat.CooldownDecrease, value: modifier.CooldownDecrease },
      ],
    },
    {
      key: "enemyStat",
      stats: [
        { ...stat.EnemyCritResist, value: enemyCritResistModifier },
        { ...stat.EnemyFinalEvasion, value: enemyEvasionModifier },
        { ...stat.EnemyFinalDefense, value: enemyDefenseModifier },
        { ...stat.EnemyDamageReduction, value: 1 - enemyDamageReductionRate },
        { ...stat.EnemyFinalDamageTaken, value: enemyModifier.FinalDamage },
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

export const getStatusAilments = (addedCharacters: AddedCharacter[]) => {
  const statusAilmentArray: CharacterApplyAilment[] = [];
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
  const { teamEffects, addedCharacters, setCharacters, statusAilments } = useCharacterStore();
  const { globalStat } = useStatStore();

  useEffect(() => {
    if (!teamEffects) return;

    const characters = addedCharacters.map((addedCharacter) => {
      const effects = getEffect(addedCharacter, teamEffects, globalStat);
      const effectStats = getTotalEffectStats(effects);

      const damage = calculateDamage(addedCharacter, globalStat, effectStats, statusAilments);
      return { ...addedCharacter, character: char[addedCharacter.character], effects, effectStats, damage };
    });
    setCharacters(characters);
  }, [addedCharacters, teamEffects, setCharacters, statusAilments, globalStat]);

  return <></>;
};

export default Intitalize;
