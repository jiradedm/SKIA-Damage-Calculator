export const rarityKeys = ["HighLord", "Legendary", "Unique", "Epic", "Rare", "Normal"] as const;
export type RarityKey = (typeof rarityKeys)[number];

export interface Rarity {
  key: RarityKey;
  selectClass: string;
  borderClass: string;
  characterClass: string;
  maxLevel: number;
  potentialLimit: [number, number, number, number, number, number, number, number, number, number, number];
  havePower?: boolean;
  lockedStatBonus?: boolean;
  unlockedEquipment?: boolean;
  unlockNecklaceStarRequirement: number;
  unlockEarringsStarRequirement: number;
}

export const rarity: Record<RarityKey, Rarity> = {
  HighLord: {
    key: "HighLord",
    selectClass: ``,
    borderClass: ``,
    characterClass: `bg-gradient-to-r from-highlordfrom  to-highlordto`,
    maxLevel: 1000,
    havePower: true,
    potentialLimit: [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7],
    lockedStatBonus: false,
    unlockedEquipment: true,
    unlockNecklaceStarRequirement: 3,
    unlockEarringsStarRequirement: 0,
  },
  Legendary: {
    key: "Legendary",
    selectClass: `bg-legendary1 border-legendary2`,
    borderClass: `border-legendary2/75`,
    characterClass: `bg-legendary3`,
    maxLevel: 1000,
    potentialLimit: [0, 3, 3, 3, 3, 5, 5, 7, 7, 7, 7],
    unlockedEquipment: true,
    unlockNecklaceStarRequirement: 3,
    unlockEarringsStarRequirement: 0,
  },
  Unique: {
    key: "Unique",
    selectClass: `bg-unique1 border-unique2`,
    borderClass: `border-unique2/75`,
    characterClass: `bg-unique3`,
    maxLevel: 60,
    potentialLimit: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    unlockNecklaceStarRequirement: 100,
    unlockEarringsStarRequirement: 0,
  },
  Epic: {
    key: "Epic",
    selectClass: `bg-epic1 border-epic2`,
    borderClass: `border-epic2/75`,
    characterClass: `bg-epic3`,
    maxLevel: 0,
    potentialLimit: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    unlockNecklaceStarRequirement: 100,
    unlockEarringsStarRequirement: 100,
  },
  Rare: {
    key: "Rare",
    selectClass: `bg-rare1 border-rare2`,
    borderClass: `border-rare2/75`,
    characterClass: `bg-rare3`,
    maxLevel: 0,
    potentialLimit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    unlockNecklaceStarRequirement: 100,
    unlockEarringsStarRequirement: 100,
  },
  Normal: {
    key: "Normal",
    selectClass: `bg-normal1 border-normal2`,
    borderClass: `border-normal2/75`,
    characterClass: `bg-normal3`,
    maxLevel: 0,
    potentialLimit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    unlockNecklaceStarRequirement: 100,
    unlockEarringsStarRequirement: 100,
  },
};

const rarities = Object.values(rarity).reverse();

export const characterRarities = rarities.filter(({ key }) => ["HighLord", "Legendary", "Unique"].includes(key));

export const potentialRarities = rarities.filter(({ key }) =>
  ["Legendary", "Unique", "Epic", "Rare", "Normal"].includes(key),
);

export const advancedPotentialRarities = rarities.filter(({ key }) => ["Legendary", "Unique", "Epic"].includes(key));
