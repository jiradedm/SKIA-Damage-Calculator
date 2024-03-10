import type { CalulatedCharacter } from "@/store";

export const sortCharacterByTotalDamage = (c1: CalulatedCharacter, c2: CalulatedCharacter) =>
  c1.damage.totalDamage > c2.damage.totalDamage ? -1 : 1;

export const sortCharacterByActiveTotalDamage = (c1: CalulatedCharacter, c2: CalulatedCharacter) => {
  if (c1.active && c2.active) return c1.damage.totalDamage > c2.damage.totalDamage ? -1 : 1;
  if (!c1.active && !c2.active) return c1.damage.totalDamage > c2.damage.totalDamage ? -1 : 1;
  if (c1.active) return -1;
  return 1;
};
