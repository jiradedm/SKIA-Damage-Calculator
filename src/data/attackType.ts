export type AttackTypeKey = "BasicAttack" | "CritAttack" | "Skill" | "DoT";

interface AttackType {
  key: AttackTypeKey;
}

export const attackType: Record<AttackTypeKey, AttackType> = {
  BasicAttack: { key: "BasicAttack" },
  CritAttack: { key: "CritAttack" },
  Skill: { key: "Skill" },
  DoT: { key: "DoT" },
};
