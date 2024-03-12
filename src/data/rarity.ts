export type RarityKey = "Legendary" | "Unique" | "Epic" | "Rare" | "Normal";

export interface Rarity {
  key: RarityKey;
  name: string;
  selectClass: string;
  characterClass: string;
  maxLevel: number;
  getPotentialLimit: (star: number) => number;
  unlockNecklaceStarRequirement: number;
  unlockEarringsStarRequirement: number;
}

export const rarity: Record<RarityKey, Rarity> = {
  Legendary: {
    key: "Legendary",
    name: "Legendary",
    selectClass: `bg-legendary1 border-legendary2`,
    characterClass: `bg-legendary3`,
    maxLevel: 70,
    getPotentialLimit: (star) => {
      if (star >= 5) return 5;
      if (star >= 1) return 3;
      return 0;
    },
    unlockNecklaceStarRequirement: 3,
    unlockEarringsStarRequirement: 0,
  },
  Unique: {
    key: "Unique",
    name: "Unique",
    selectClass: `bg-unique1 border-unique2`,
    characterClass: `bg-unique3`,
    maxLevel: 60,
    getPotentialLimit: () => 3,
    unlockNecklaceStarRequirement: 100,
    unlockEarringsStarRequirement: 0,
  },
  Epic: {
    key: "Epic",
    name: "Epic",
    selectClass: `bg-epic1 border-epic2`,
    characterClass: `bg-epic3`,
    maxLevel: 0,
    getPotentialLimit: () => 2,
    unlockNecklaceStarRequirement: 100,
    unlockEarringsStarRequirement: 100,
  },
  Rare: {
    key: "Rare",
    name: "Rare",
    selectClass: `bg-rare1 border-rare2`,
    characterClass: `bg-rare3`,
    maxLevel: 0,
    getPotentialLimit: () => 0,
    unlockNecklaceStarRequirement: 100,
    unlockEarringsStarRequirement: 100,
  },
  Normal: {
    key: "Normal",
    name: "Normal",
    selectClass: `bg-normal1 border-normal2`,
    characterClass: `bg-normal3`,
    maxLevel: 0,
    getPotentialLimit: () => 0,
    unlockNecklaceStarRequirement: 100,
    unlockEarringsStarRequirement: 100,
  },
};

export const rarities = Object.values(rarity).reverse();
