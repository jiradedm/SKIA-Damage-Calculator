import type { StatKey } from "./stat";

export interface StatusAilment {
  key: StatKey;
  img: string;
  name: string;
}

export const statusAilment = {
  EnemyBurned: {
    key: "EnemyBurned",
    img: "/status/EnemyBurned.webp",
    name: "Burned",
  },
  EnemyPoisoned: {
    key: "EnemyPoisoned",
    img: "/status/EnemyPoisoned.webp",
    name: "Poisoned",
  },
  EnemyCursed: {
    key: "EnemyCursed",
    img: "/status/EnemyCursed.webp",
    name: "Cursed",
  },
  EnemyBleeding: {
    key: "EnemyBleeding",
    img: "/status/EnemyBleeding.webp",
    name: "Bleeding",
  },
  EnemyFrostbitten: {
    key: "EnemyFrostbitten",
    img: "/status/EnemyFrostbitten.webp",
    name: "Frostbitten",
  },
  EnemySilenced: {
    key: "EnemySilenced",
    img: "/status/EnemySilenced.webp",
    name: "Silenced",
  },
  EnemyStunned: {
    key: "EnemyStunned",
    img: "/status/EnemyStunned.webp",
    name: "Stunned",
  },
  EnemyDisintegrated: {
    key: "EnemyDisintegrated",
    img: "/status/EnemyDisintegrated.webp",
    name: "Disintegrated",
  },
} as Record<StatKey, StatusAilment>;
