import type { CalulatedCharacter } from "@/store";

export const sortCharacterByTotalDamage = (c1: CalulatedCharacter, c2: CalulatedCharacter) =>
  c1.damage.totalDamage >= c2.damage.totalDamage ? -1 : 1;
