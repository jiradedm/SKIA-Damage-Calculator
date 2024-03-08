export type AttackTypeKey = "BasicAttack" | "CritAttack" | "Skill" | "DoT";

interface AttackType {
  key: AttackTypeKey;
  name: string;
}

export const attackType: Record<AttackTypeKey, AttackType> = {
  BasicAttack: {
    key: "BasicAttack",
    name: "Basic Attack",
  },
  CritAttack: {
    key: "CritAttack",
    name: "Critical Hit Attack",
  },
  Skill: {
    key: "Skill",
    name: "Skill",
  },
  DoT: {
    key: "DoT",
    name: "Damage Over Time",
  },
};
