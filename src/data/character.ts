import type { CharacterType } from "./characterType";
import { characterType } from "./characterType";
import type { Effect } from "./effect";
import { effect } from "./effect";
import { type Rarity, rarity } from "./rarity";
import type { StatKey } from "./stat";
import { type StatusAilment, statusAilment } from "./statusAilment";

export type CharacterKey =
  | "Ace"
  | "Aleem"
  | "Alice"
  | "Aragon"
  | "Ariel"
  | "Aris"
  | "Asura"
  | "BaiLong"
  | "Ballista"
  | "Bane"
  | "Bathory"
  | "BlackRose"
  | "Chancellor"
  | "Chloe"
  | "Clemyth"
  | "XiaoQiao"
  | "Daisy"
  | "Dellons"
  | "Diaochan"
  | "DokjaKim"
  | "Eileene"
  | "Espada"
  | "Evan"
  | "FengYan"
  | "GuanYu"
  | "Harmal"
  | "Hayoung"
  | "Heavenia"
  | "Hellenia"
  | "HuiwonJeong"
  | "Ingrid"
  | "Isabella"
  | "Jane"
  | "Jave"
  | "Jin"
  | "Jupy"
  | "Kagura"
  | "Karin"
  | "KarlHeron"
  | "Knox"
  | "Kris"
  | "Kyrielle"
  | "Lania"
  | "Li"
  | "Lina"
  | "LingLing"
  | "LuBu"
  | "Lucrezia"
  | "MaoSong"
  | "Meg"
  | "Mirage"
  | "Misha"
  | "Nezha"
  | "Nia"
  | "Noho"
  | "Orkah"
  | "Orly"
  | "Rachel"
  | "Rin"
  | "Roro"
  | "Rudy"
  | "Ruri"
  | "Ryan"
  | "Salem"
  | "Seaton"
  | "Sebastian"
  | "Sera"
  | "Shane"
  | "Sieg"
  | "Sizar"
  | "Snipper"
  | "Snolled"
  | "Soi"
  | "Spike"
  | "Spina"
  | "SunWukong"
  | "Sylvia"
  | "Tara"
  | "TsingTao"
  | "Velika"
  | "Victoria"
  | "Weiser"
  | "XiangYu"
  | "Yui"
  | "Yuri"
  | "ZhaoYun"
  | "JunghyeokYu"
  | "SangahYu"
  | "BaiJiao"
  | "Teo"
  | "ZhugeLiang"
  | "Zahara"
  | "Rakshasa"
  | "LeeJung"
  | "Xiao"
  | "Medea"
  | "Yeonhee"
  | "Kwonho"
  | "Cheongmyeong"
  | "Baekcheon"
  | "IseolYu"
  | "Yunjong"
  | "Jogeol"
  | "Noa"
  | "Jake"
  | "GuardianPooki";

interface Attack {
  modifier: number;
  speed: number;
  fixedSpeed?: boolean;
  cutCooldown?: number;
  attackModifier?: Partial<Record<StatKey, { applyCondition?: StatKey; value: number }>>;
}

export type CharacterAttack = {
  BasicAttack: Attack;
  CritAttack: Attack;
  Skill?: Attack;
  DoT?: Attack;
};

export interface CharacterApplyAilment {
  status: StatusAilment;
  uptime: number;
}

export interface Character {
  key: CharacterKey;
  img: string;
  rarity: Rarity;
  type: CharacterType;
  effects?: Effect[];
  maxHit?: number;
  applyStatusAilments?: CharacterApplyAilment[];
  attack: CharacterAttack;
}

export const character: Record<CharacterKey, Character> = {
  Ace: {
    key: "Ace",
    img: "/character/Ace.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.BloodMoon, effect.YachaStrength],
    attack: {
      BasicAttack: { modifier: 280, speed: 96.71 },
      CritAttack: { modifier: 320, cutCooldown: 3, speed: 90.91 },
      Skill: { modifier: 900, speed: 51.71 },
    },
  },
  Aleem: {
    key: "Aleem",
    img: "/character/Aleem.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [effect.CritDamage5],
    attack: {
      BasicAttack: { modifier: 175, speed: 119.9 },
      CritAttack: { modifier: 130, speed: 100 },
    },
  },
  Alice: {
    key: "Alice",
    img: "/character/Alice.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [{ ...effect.KeenAttack4, characterTypeRestricted: "Ranged" }],
    attack: {
      BasicAttack: { modifier: 225, speed: 100 },
      CritAttack: { modifier: 250, speed: 85.69 },
    },
  },
  Aragon: {
    key: "Aragon",
    img: "/character/Aragon.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 275, speed: 81.04 },
      CritAttack: { modifier: 275, speed: 81.04 },
      Skill: { modifier: 230, speed: 74.96 },
    },
  },
  Ariel: {
    key: "Ariel",
    img: "/character/Ariel.webp",
    rarity: rarity.Unique,
    type: characterType.Ranged,
    effects: [],
    attack: {
      BasicAttack: { modifier: 175, speed: 119.9 },
      CritAttack: { modifier: 450, speed: 51.71 },
    },
  },
  Aris: {
    key: "Aris",
    img: "/character/Aris.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 225, speed: 100 },
      CritAttack: { modifier: 250, speed: 85.69 },
      Skill: { modifier: 250, speed: 69.74 },
    },
  },
  Asura: {
    key: "Asura",
    img: "/character/Asura.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 175, speed: 125 },
      CritAttack: { modifier: 225, speed: 100 },
      Skill: { modifier: 0, speed: 90.91 },
    },
  },
  BaiLong: {
    key: "BaiLong",
    img: "/character/Bai Long.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [effect.CritRate4],
    attack: {
      BasicAttack: { modifier: 200, speed: 115.34 },
      CritAttack: { modifier: 300, speed: 74.96 },
    },
  },
  Ballista: {
    key: "Ballista",
    img: "/character/Ballista.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    applyStatusAilments: [{ status: statusAilment.EnemyCursed, uptime: 1 }],
    effects: [],
    attack: {
      BasicAttack: {
        modifier: 100,
        speed: 187.27,
        attackModifier: { FinalDamage: { applyCondition: "EnemyTypeDefense", value: 50 } },
      },
      CritAttack: {
        modifier: 175,
        speed: 130.38,
        attackModifier: { FinalDamage: { applyCondition: "EnemyTypeDefense", value: 50 } },
      },
    },
  },
  Bane: {
    key: "Bane",
    img: "/character/Bane.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [],
    maxHit: 4,
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 500, speed: 136.24 },
    },
  },
  Bathory: {
    key: "Bathory",
    img: "/character/Bathory.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [],
    attack: {
      BasicAttack: { modifier: 175, speed: 119.9 },
      CritAttack: { modifier: 300, speed: 74.96 },
    },
  },
  BlackRose: {
    key: "BlackRose",
    img: "/character/Black Rose.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [],
    applyStatusAilments: [{ status: statusAilment.EnemyBleeding, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: {
        modifier: 350,
        speed: 66.67,
        attackModifier: { FinalDamage: { value: 50, applyCondition: "EnemyBurned" } },
      },
      Skill: { modifier: 0, speed: 74.96 },
      DoT: { modifier: 20, speed: 100 },
    },
  },
  Chancellor: {
    key: "Chancellor",
    img: "/character/Chancellor.webp",
    rarity: rarity.Unique,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 225, speed: 100 },
      CritAttack: { modifier: 400, speed: 56.59 },
      Skill: { modifier: 0, speed: 57.67 },
    },
  },
  Chloe: {
    key: "Chloe",
    img: "/character/Chloe.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [effect.EvasionDecrease4, { ...effect.Strike4, characterTypeRestricted: "Melee" }],
    attack: {
      BasicAttack: { modifier: 250, speed: 85.69 },
      CritAttack: { modifier: 275, speed: 81.04 },
    },
  },
  Clemyth: {
    key: "Clemyth",
    img: "/character/Clemyth.webp",
    rarity: rarity.Legendary,
    type: characterType.Support,
    effects: [{ ...effect.CooldownDecrease, characterTypeRestricted: "Melee" }],
    attack: {
      BasicAttack: { modifier: 250, speed: 85.69 },
      CritAttack: { modifier: 200, speed: 66.67 },
    },
  },
  XiaoQiao: {
    key: "XiaoQiao",
    img: "/character/Xiao Qiao.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [effect.DefenseDecrease5, effect.CritRate5],
    attack: {
      BasicAttack: { modifier: 150, speed: 157.73 },
      CritAttack: { modifier: 110, speed: 111.11 },
    },
  },
  Daisy: {
    key: "Daisy",
    img: "/character/Daisy.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [],
    attack: {
      BasicAttack: { modifier: 275, speed: 81.04 },
      CritAttack: { modifier: 110, speed: 111.11 },
    },
  },
  Dellons: {
    key: "Dellons",
    img: "/character/Dellons.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.Strike5],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 225, speed: 100 },
      Skill: { modifier: 250, speed: 90.91 },
    },
  },
  Diaochan: {
    key: "Diaochan",
    img: "/character/Diaochan.webp",
    rarity: rarity.Legendary,
    type: characterType.Support,
    effects: [effect.Focus5],
    attack: {
      BasicAttack: { modifier: 225, speed: 100 },
      CritAttack: { modifier: 225, speed: 100 },
      Skill: { modifier: 0, speed: 81.04 },
    },
  },
  DokjaKim: {
    key: "DokjaKim",
    img: "/character/Dokja Kim.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.FierceSpirit5, effect.WhitePureStarEnergy, effect.Electrification],
    attack: {
      BasicAttack: { modifier: 250, speed: 136.2 },
      CritAttack: { modifier: 300, speed: 125 },
      Skill: { modifier: 1250, speed: 125 },
    },
  },
  Eileene: {
    key: "Eileene",
    img: "/character/Eileene.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.FierceSpirit5],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 225, speed: 96.71 },
      Skill: { modifier: 250, speed: 54.53 },
    },
  },
  Espada: {
    key: "Espada",
    img: "/character/Espada.webp",
    rarity: rarity.Unique,
    type: characterType.Ranged,
    effects: [effect.AttackSpeed4],
    attack: {
      BasicAttack: {
        modifier: 150,
        speed: 149.93,
        attackModifier: { FinalDamage: { applyCondition: "EnemyTypeDefense", value: 40 } },
      },
      CritAttack: {
        modifier: 175,
        speed: 119.9,
        attackModifier: { FinalDamage: { applyCondition: "EnemyTypeDefense", value: 40 } },
      },
    },
  },
  Evan: {
    key: "Evan",
    img: "/character/Evan.webp",
    rarity: rarity.Unique,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 150, speed: 157.73 },
      Skill: { modifier: 0, speed: 136.24 },
    },
  },
  FengYan: {
    key: "FengYan",
    img: "/character/Feng Yan.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [{ ...effect.KeenAttack5, characterTypeRestricted: "Melee" }],
    attack: {
      BasicAttack: { modifier: 200, speed: 107.07 },
      CritAttack: { modifier: 250, speed: 85.69 },
      Skill: { modifier: 700, speed: 59.99 },
    },
  },
  GuanYu: {
    key: "GuanYu",
    img: "/character/Guan Yu.webp",
    rarity: rarity.Legendary,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 136.24 },
      CritAttack: { modifier: 200, speed: 115.34 },
    },
  },
  Harmal: {
    key: "Harmal",
    img: "/character/Harmal.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 225, speed: 100 },
      CritAttack: { modifier: 275, speed: 78.93 },
      Skill: { modifier: 700, speed: 74.96 },
    },
  },
  Hayoung: {
    key: "Hayoung",
    img: "/character/Hayoung.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [],
    attack: {
      BasicAttack: { modifier: 275, speed: 78.93 },
      CritAttack: { modifier: 300, speed: 74.96 },
      Skill: { modifier: 0, speed: 74.96 },
    },
  },
  Heavenia: {
    key: "Heavenia",
    img: "/character/Heavenia.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 200, speed: 115.34 },
      CritAttack: { modifier: 250, speed: 85.69 },
      Skill: { modifier: 780, speed: 71.43 },
    },
  },
  Hellenia: {
    key: "Hellenia",
    img: "/character/Hellenia.webp",
    rarity: rarity.Unique,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 125, speed: 176.37 },
      CritAttack: { modifier: 200, speed: 111.11 },
      Skill: { modifier: 0, speed: 119.9 },
    },
  },
  HuiwonJeong: {
    key: "HuiwonJeong",
    img: "/character/Huiwon Jeong.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.TimeOfJudgment],
    applyStatusAilments: [{ status: statusAilment.EnemyBurned, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 125, speed: 176.37 },
      CritAttack: { modifier: 100, speed: 136.24 },
      Skill: { modifier: 0, speed: 93.72 },
      DoT: { modifier: 40, speed: 500 },
    },
  },
  Ingrid: {
    key: "Ingrid",
    img: "/character/Ingrid.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.DefenseDecrease5],
    // applyStatusAilments: [{ status: statusAilment.Frostbitten, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 175, speed: 119.9 },
      CritAttack: { modifier: 300, speed: 76.92 },
      Skill: { modifier: 700, speed: 76.92 },
      DoT: { modifier: 10, speed: 100 },
    },
  },
  Isabella: {
    key: "Isabella",
    img: "/character/Isabella.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [],
    attack: {
      BasicAttack: { modifier: 200, speed: 107.07 },
      CritAttack: { modifier: 300, speed: 74.96 },
      Skill: { modifier: 250, speed: 93.72 },
    },
  },
  Jane: {
    key: "Jane",
    img: "/character/Jane.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 157.73 },
      CritAttack: { modifier: 300, speed: 74.96 },
      Skill: { modifier: 650, speed: 63.82 },
    },
  },
  Jave: {
    key: "Jave",
    img: "/character/Jave.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.Gale5],
    attack: {
      BasicAttack: { modifier: 150, speed: 157.73 },
      CritAttack: { modifier: 225, speed: 100 },
      Skill: { modifier: 250, speed: 85.69 },
    },
  },
  Jin: {
    key: "Jin",
    img: "/character/Jin.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [effect.CritRate4],
    attack: {
      BasicAttack: { modifier: 175, speed: 119.9 },
      CritAttack: {
        modifier: 300,
        speed: 71.43,
        attackModifier: { FinalDamage: { value: 20, applyCondition: "EnemyTypeDefense" } },
      },
      Skill: { modifier: 230, speed: 52.63 },
    },
  },
  Jupy: {
    key: "Jupy",
    img: "/character/Jupy.webp",
    rarity: rarity.Unique,
    type: characterType.Ranged,
    effects: [],
    attack: {
      BasicAttack: { modifier: 100, speed: 200 },
      CritAttack: { modifier: 225, speed: 100 },
      Skill: { modifier: 780, speed: 52.63 },
    },
  },
  Kagura: {
    key: "Kagura",
    img: "/character/Kagura.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 136.24 },
      CritAttack: { modifier: 225, speed: 100 },
      Skill: {
        modifier: 250,
        speed: 93.72,
        attackModifier: { FinalDamage: { applyCondition: "EnemyTypeDefense", value: 50 } },
      },
    },
  },
  Karin: {
    key: "Karin",
    img: "/character/Karin.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [],
    attack: {
      BasicAttack: { modifier: 225, speed: 100 },
      CritAttack: { modifier: 200, speed: 107.07 },
      Skill: { modifier: 0, speed: 66.67 },
    },
  },
  KarlHeron: {
    key: "KarlHeron",
    img: "/character/Karl Heron.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 200, speed: 103.41 },
      Skill: { modifier: 250, speed: 96.71 },
    },
  },
  Knox: {
    key: "Knox",
    img: "/character/Knox.webp",
    rarity: rarity.Unique,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 375, speed: 61.2 },
    },
  },
  Kris: {
    key: "Kris",
    img: "/character/Kris.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 225, speed: 100 },
      CritAttack: { modifier: 300, speed: 74.96 },
      Skill: { modifier: 300, speed: 50, fixedSpeed: true },
    },
  },
  Kyrielle: {
    key: "Kyrielle",
    img: "/character/Kyrielle.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [effect.AttackSpeed5, effect.Attack5],
    attack: {
      BasicAttack: { modifier: 125, speed: 176.37 },
      CritAttack: { modifier: 225, speed: 100 },
      Skill: { modifier: 700, speed: 100 },
    },
  },
  Lania: {
    key: "Lania",
    img: "/character/Lania.webp",
    rarity: rarity.Legendary,
    type: characterType.Support,
    effects: [],
    // applyStatusAilments: [{ status: statusAilment.EnemyFrostbitten, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 200, speed: 111.11 },
      CritAttack: { modifier: 170, speed: 74.96 },
      DoT: { modifier: 10, speed: 100 },
    },
  },
  Li: {
    key: "Li",
    img: "/character/Li.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 200, speed: 115.34 },
      CritAttack: { modifier: 275, speed: 78.93 },
      Skill: { modifier: 650, speed: 50 },
    },
  },
  Lina: {
    key: "Lina",
    img: "/character/Lina.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [{ ...effect.FierceSpirit4, characterTypeRestricted: "Melee" }],
    attack: {
      BasicAttack: { modifier: 175, speed: 119.9 },
      CritAttack: { modifier: 275, speed: 81.04 },
      Skill: { modifier: 0, speed: 59.99 },
    },
  },
  LingLing: {
    key: "LingLing",
    img: "/character/Ling Ling.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [],
    attack: {
      BasicAttack: { modifier: 175, speed: 125 },
      CritAttack: { modifier: 140, speed: 93.72 },
    },
  },
  LuBu: {
    key: "LuBu",
    img: "/character/Lu Bu.webp",
    rarity: rarity.Legendary,
    type: characterType.Defense,
    effects: [effect.WarriorGodMajesty],
    attack: {
      BasicAttack: { modifier: 250, speed: 136.24 },
      CritAttack: { modifier: 250, speed: 136.24 },
      Skill: { modifier: 400, speed: 74.96 },
    },
  },
  Lucrezia: {
    key: "Lucrezia",
    img: "/character/Lucrezia.webp",
    rarity: rarity.Legendary,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 250, speed: 90.91 },
      CritAttack: { modifier: 250, speed: 90.91, cutCooldown: 2 },
      Skill: { modifier: 0, speed: 100 },
    },
  },
  MaoSong: {
    key: "MaoSong",
    img: "/character/Mao Song.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 175, speed: 119.9 },
      CritAttack: { modifier: 200, speed: 107.07 },
      Skill: { modifier: 230, speed: 85.69 },
    },
  },
  Meg: {
    key: "Meg",
    img: "/character/Meg.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 160, speed: 83.33 },
      Skill: { modifier: 250, speed: 100 },
    },
  },
  Mirage: {
    key: "Mirage",
    img: "/character/Mirage.webp",
    rarity: rarity.Legendary,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 350, speed: 62.5 },
      Skill: { modifier: 250, speed: 107.07 },
    },
  },
  Misha: {
    key: "Misha",
    img: "/character/Misha.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [],
    applyStatusAilments: [
      { status: statusAilment.EnemyPoisoned, uptime: 1 },
      { status: statusAilment.EnemyCursed, uptime: 1 },
    ],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 300, speed: 74.96 },
      Skill: { modifier: 700, speed: 115.34 },
      DoT: { modifier: 20, speed: 100 },
    },
  },
  Nezha: {
    key: "Nezha",
    img: "/character/Nezha.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 136.24 },
      CritAttack: { modifier: 130, speed: 100 },
    },
  },
  Nia: {
    key: "Nia",
    img: "/character/Nia.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 225, speed: 100 },
      CritAttack: { modifier: 300, speed: 74.96 },
      Skill: { modifier: 230, speed: 85.69 },
    },
  },
  Noho: {
    key: "Noho",
    img: "/character/Noho.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [effect.EvasionDecrease4, { ...effect.Strike4, characterTypeRestricted: "Ranged" }],
    attack: {
      BasicAttack: { modifier: 225, speed: 100 },
      CritAttack: { modifier: 375, speed: 59.99 },
    },
  },
  Orkah: {
    key: "Orkah",
    img: "/character/Orkah.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [],
    applyStatusAilments: [{ status: statusAilment.EnemyBleeding, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 150, speed: 136.24 },
      CritAttack: { modifier: 250, speed: 85.69 },
      Skill: { modifier: 700, speed: 74.96 },
      DoT: { modifier: 20, speed: 100 },
    },
  },
  Orly: {
    key: "Orly",
    img: "/character/Orly.webp",
    rarity: rarity.Legendary,
    type: characterType.Support,
    effects: [{ ...effect.Gale5, characterTypeRestricted: "Melee" }],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 140, speed: 88.18 },
    },
  },
  Rachel: {
    key: "Rachel",
    img: "/character/Rachel.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.KeenAttack5],
    applyStatusAilments: [{ status: statusAilment.EnemyBurned, uptime: 0.5 }],
    attack: {
      BasicAttack: { modifier: 100, speed: 200 },
      CritAttack: { modifier: 150, speed: 136.24 },
      Skill: { modifier: 250, speed: 78.93 },
      DoT: { modifier: 20, speed: 50 },
    },
  },
  Rin: {
    key: "Rin",
    img: "/character/Rin.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [effect.CrimsonScales],
    attack: {
      BasicAttack: { modifier: 240, speed: 142.86 },
      CritAttack: { modifier: 360, speed: 100 },
      Skill: { modifier: 1120, speed: 59.99, attackModifier: { FinalDamage: { value: 30 }, CritRate: { value: 100 } } },
      DoT: undefined,
    },
  },
  Roro: {
    key: "Roro",
    img: "/character/Roro.webp",
    rarity: rarity.Legendary,
    type: characterType.Support,
    effects: [],
    attack: {
      BasicAttack: { modifier: 225, speed: 100 },
      CritAttack: { modifier: 300, speed: 74.96 },
      Skill: { modifier: 250, speed: 85.69 },
    },
  },
  Rudy: {
    key: "Rudy",
    img: "/character/Rudy.webp",
    rarity: rarity.Legendary,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 136.24 },
      CritAttack: { modifier: 150, speed: 149.93 },
      Skill: { modifier: 0, speed: 74.96 },
    },
  },
  Ruri: {
    key: "Ruri",
    img: "/character/Ruri.webp",
    rarity: rarity.Unique,
    type: characterType.Ranged,
    effects: [effect.Sharpshooter],
    attack: {
      BasicAttack: { modifier: 275, speed: 83.33 },
      CritAttack: { modifier: 325, speed: 69.74 },
      Skill: { modifier: 0, speed: 119.9 },
    },
  },
  Ryan: {
    key: "Ryan",
    img: "/character/Ryan.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.CritRate5],
    attack: {
      BasicAttack: { modifier: 175, speed: 130.38 },
      CritAttack: { modifier: 150, speed: 142.86 },
      Skill: { modifier: 700, speed: 59.99 },
    },
  },
  Salem: {
    key: "Salem",
    img: "/character/Salem.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [],
    attack: {
      BasicAttack: { modifier: 175, speed: 130.38 },
      CritAttack: { modifier: 250, speed: 88.18 },
      Skill: { modifier: 250, speed: 55.52 },
    },
  },
  Seaton: {
    key: "Seaton",
    img: "/character/Seaton.webp",
    rarity: rarity.Legendary,
    type: characterType.Support,
    effects: [effect.DefenseDecrease5],
    attack: {
      BasicAttack: { modifier: 250, speed: 85.69 },
      CritAttack: { modifier: 170, speed: 74.96 },
      Skill: { modifier: 0, speed: 85.69 },
    },
  },
  Sebastian: {
    key: "Sebastian",
    img: "/character/Sebastian.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [effect.Attack5],
    attack: {
      BasicAttack: { modifier: 175, speed: 130.38 },
      CritAttack: { modifier: 275, speed: 78.93 },
      Skill: { modifier: 880, speed: 44.11 },
    },
  },
  Sera: {
    key: "Sera",
    img: "/character/Sera.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [{ ...effect.KeenAttack4, characterTypeRestricted: "Melee" }],
    applyStatusAilments: [{ status: statusAilment.EnemyCursed, uptime: 0.4 }],
    attack: {
      BasicAttack: { modifier: 200, speed: 103.41 },
      CritAttack: { modifier: 300, speed: 74.96 },
    },
  },
  Shane: {
    key: "Shane",
    img: "/character/Shane.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    attack: {
      BasicAttack: { modifier: 125, speed: 176.37 },
      CritAttack: { modifier: 225, speed: 96.71, cutCooldown: 1 },
      Skill: {
        modifier: 650,
        speed: 78.93,
        attackModifier: { FinalDamage: { value: 40, applyCondition: "EnemyTypeDefense" } },
      },
    },
  },
  Sieg: {
    key: "Sieg",
    img: "/character/Sieg.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [],
    attack: {
      BasicAttack: { modifier: 100, speed: 187.27 },
      CritAttack: { modifier: 225, speed: 100 },
      Skill: { modifier: 230, speed: 59.99 },
    },
  },
  Sizar: {
    key: "Sizar",
    img: "/character/Sizar.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [],
    applyStatusAilments: [{ status: statusAilment.EnemyPoisoned, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 250, speed: 85.69 },
      CritAttack: { modifier: 275, speed: 83.33 },
      Skill: { modifier: 250, speed: 66.67 },
      DoT: { modifier: 20, speed: 100 },
    },
  },
  Snipper: {
    key: "Snipper",
    img: "/character/Snipper.webp",
    rarity: rarity.Unique,
    type: characterType.Ranged,
    effects: [],
    applyStatusAilments: [{ status: statusAilment.EnemyBleeding, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 225, speed: 96.71 },
      Skill: { modifier: 280, speed: 107.07 },
      DoT: { modifier: 20, speed: 100 },
    },
  },
  Snolled: {
    key: "Snolled",
    img: "/character/Snolled.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [effect.AttackSpeed5],
    attack: {
      BasicAttack: { modifier: 250, speed: 85.69 },
      CritAttack: { modifier: 225, speed: 100 },
      Skill: { modifier: 310, speed: 74.96 },
    },
  },
  Soi: {
    key: "Soi",
    img: "/character/Soi.webp",
    rarity: rarity.Legendary,
    type: characterType.Support,
    effects: [effect.EvasionDecrease5],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 275, speed: 78.93 },
      Skill: { modifier: 0, speed: 74.96 },
    },
  },
  Spike: {
    key: "Spike",
    img: "/character/Spike.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.Focus5],
    // applyStatusAilments: [{ status: statusAilment.Frostbitten, uptime: 0.5 }],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 250, speed: 85.69 },
      Skill: { modifier: 250, speed: 81.04 },
      DoT: { modifier: 10, speed: 100 },
    },
  },
  Spina: {
    key: "Spina",
    img: "/character/Spina.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [effect.Attack4],
    applyStatusAilments: [{ status: statusAilment.EnemyCursed, uptime: 0.8 }],
    attack: {
      BasicAttack: { modifier: 250, speed: 88.18 },
      CritAttack: { modifier: 350, speed: 66.67 },
      Skill: { modifier: 650, speed: 100 },
    },
  },
  SunWukong: {
    key: "SunWukong",
    img: "/character/Sun Wukong.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.EnlightenedWarrior],
    applyStatusAilments: [{ status: statusAilment.EnemyCursed, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 200, speed: 176.37 },
      CritAttack: { modifier: 200, speed: 176.37 },
      Skill: { modifier: 3500, speed: 93.72 },
    },
  },
  Sylvia: {
    key: "Sylvia",
    img: "/character/Sylvia.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 100, speed: 119.9 },
    },
  },
  Tara: {
    key: "Tara",
    img: "/character/Tara.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [{ ...effect.FierceSpirit5, characterTypeRestricted: "Ranged" }],
    attack: {
      BasicAttack: { modifier: 125, speed: 176.37 },
      CritAttack: {
        modifier: 225,
        speed: 100,
        attackModifier: { FinalDamage: { applyCondition: "EnemyBurned", value: 50 } },
      },
      Skill: { modifier: 250, speed: 56.59 },
    },
  },
  TsingTao: {
    key: "TsingTao",
    img: "/character/Tsing Tao.webp",
    rarity: rarity.Unique,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 360, speed: 76.92 },
      Skill: { modifier: 0, speed: 65.19 },
    },
  },
  Velika: {
    key: "Velika",
    img: "/character/Velika.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [],
    applyStatusAilments: [{ status: statusAilment.EnemyCursed, uptime: 0.5 }],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 275, speed: 78.93 },
      Skill: { modifier: 250, speed: 85.69 },
    },
  },
  Victoria: {
    key: "Victoria",
    img: "/character/Victoria.webp",
    rarity: rarity.Unique,
    type: characterType.Melee,
    effects: [effect.SupremeRuler],
    applyStatusAilments: [{ status: statusAilment.EnemyBurned, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 275, speed: 83.33 },
      Skill: { modifier: 0, speed: 100 },
      DoT: { modifier: 20, speed: 100 },
    },
  },
  Weiser: {
    key: "Weiser",
    img: "/character/Weiser.webp",
    rarity: rarity.Legendary,
    type: characterType.Defense,
    effects: [],
    applyStatusAilments: [{ status: statusAilment.EnemyBurned, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 140, speed: 85.69 },
      DoT: { modifier: 20, speed: 100 },
    },
  },
  XiangYu: {
    key: "XiangYu",
    img: "/character/Xiang Yu.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.EvasionDecrease5, effect.WeaknessRate5],
    attack: {
      BasicAttack: { modifier: 225, speed: 149.93 },
      CritAttack: { modifier: 250, speed: 119.9 },
    },
  },
  Yui: {
    key: "Yui",
    img: "/character/Yui.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [],
    attack: {
      BasicAttack: { modifier: 300, speed: 74.96 },
      CritAttack: { modifier: 300, speed: 74.96 },
      Skill: { modifier: 0, speed: 74.96 },
    },
  },
  Yuri: {
    key: "Yuri",
    img: "/character/Yuri.webp",
    rarity: rarity.Unique,
    type: characterType.Support,
    effects: [effect.DefenseDecrease4],
    attack: {
      BasicAttack: { modifier: 175, speed: 119.9 },
      CritAttack: { modifier: 200, speed: 115.34 },
    },
  },
  ZhaoYun: {
    key: "ZhaoYun",
    img: "/character/Zhao Yun.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.GuardingSpirit],
    attack: {
      BasicAttack: { modifier: 180, speed: 107.07 },
      CritAttack: { modifier: 200, speed: 100 },
      Skill: { modifier: 0, speed: 74.96 },
    },
  },
  JunghyeokYu: {
    key: "JunghyeokYu",
    img: "/character/Junghyeok Yu.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.SkySplitter],
    attack: {
      BasicAttack: { modifier: 200, speed: 176 },
      CritAttack: { modifier: 250, speed: 157.98 },
      Skill: {
        modifier: 1250,
        speed: 93.72,
        attackModifier: { FinalDamage: { value: 50, applyCondition: "EnemyTypeRanged" } },
      },
    },
  },
  SangahYu: {
    key: "SangahYu",
    img: "/character/Sangah Yu.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [effect.AgileMovement],
    attack: {
      BasicAttack: { modifier: 200, speed: 115 },
      CritAttack: { modifier: 200, speed: 107.18 },
      Skill: { modifier: 700, speed: 85.69 },
    },
  },
  BaiJiao: {
    key: "BaiJiao",
    img: "/character/Bai Jiao.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [{ ...effect.PrecisionStrike5, characterTypeRestricted: "Ranged" }],
    applyStatusAilments: [{ status: statusAilment.EnemyPoisoned, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 175, speed: 119 },
      CritAttack: { modifier: 300, speed: 75.02 },
      Skill: { modifier: 0, speed: 75.02 },
      DoT: { modifier: 40, speed: 500 },
    },
  },
  Teo: {
    key: "Teo",
    img: "/character/Teo.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.FullMoon, effect.CrowVision],
    attack: {
      BasicAttack: { modifier: 350, speed: 176.37 },
      CritAttack: { modifier: 350, speed: 176.37 },
      Skill: { modifier: 1000, speed: 93.72, attackModifier: { CritRate: { value: 100 } } },
    },
  },
  ZhugeLiang: {
    key: "ZhugeLiang",
    img: "/character/Zhuge Liang.webp",
    rarity: rarity.Legendary,
    type: characterType.Support,
    effects: [],
    attack: {
      BasicAttack: { modifier: 175, speed: 130 },
      CritAttack: { modifier: 225, speed: 100 },
    },
  },
  Zahara: {
    key: "Zahara",
    img: "/character/Zahara.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [],
    applyStatusAilments: [{ status: statusAilment.EnemyBurned, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 175, speed: 149 },
      CritAttack: {
        modifier: 225,
        speed: 119.9,
        attackModifier: { FinalDamage: { applyCondition: "EnemyBleeding", value: 50 } },
      },
      Skill: { modifier: 250, speed: 83.33 },
      DoT: { modifier: 20, speed: 100 },
    },
  },
  Rakshasa: {
    key: "Rakshasa",
    img: "/character/Rakshasa.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [effect.AttackSpeed5, { ...effect.KeenAttack5, characterTypeRestricted: "Defense" }],
    attack: {
      BasicAttack: { modifier: 200, speed: 130.38 },
      CritAttack: {
        modifier: 225,
        speed: 115.34,
        attackModifier: { FinalDamage: { applyCondition: "EnemyPoisoned", value: 50 } },
      },
      Skill: { modifier: 400, speed: 76.92 },
    },
  },
  LeeJung: {
    key: "LeeJung",
    img: "/character/Lee Jung.webp",
    rarity: rarity.Legendary,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 142.86 },
      CritAttack: { modifier: 225, speed: 100, cutCooldown: 2 },
      Skill: { modifier: 250, speed: 115.34 },
    },
  },
  Xiao: {
    key: "Xiao",
    img: "/character/Xiao.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [],
    applyStatusAilments: [{ status: statusAilment.EnemyPoisoned, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 150, speed: 136.24 },
      CritAttack: { modifier: 250, speed: 90.9 },
      Skill: { modifier: 700, speed: 85.69 },
      DoT: { modifier: 20, speed: 100 },
    },
  },
  Medea: {
    key: "Medea",
    img: "/character/Medea.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [effect.PowerOfTheRune, effect.CurseOfDestruction, effect.PowerOfDestruction, effect.RulerOfNightmares],
    attack: {
      BasicAttack: { modifier: 225, speed: 142.86 },
      CritAttack: { modifier: 375, speed: 93.72 },
      Skill: { modifier: 1200, speed: 83.33 },
    },
  },
  Yeonhee: {
    key: "Yeonhee",
    img: "/character/Yeonhee.webp",
    rarity: rarity.Legendary,
    type: characterType.Ranged,
    effects: [effect.Sleepwalking, effect.SweetDreams, effect.Insight],
    attack: {
      BasicAttack: { modifier: 175, speed: 187.27 },
      CritAttack: { modifier: 200, speed: 187.27, attackModifier: { FinalDamage: { value: 25 } } },
      Skill: { modifier: 800, speed: 78.93 },
    },
  },
  Kwonho: {
    key: "Kwonho",
    img: "/character/Kwonho.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [{ ...effect.FierceSpirit5, characterTypeRestricted: "Melee" }],
    applyStatusAilments: [{ status: statusAilment.EnemyBleeding, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 250, speed: 90.91 },
      Skill: { modifier: 250, speed: 78.93 },
      DoT: { modifier: 40, speed: 500 },
    },
  },
  Cheongmyeong: {
    key: "Cheongmyeong",
    img: "/character/Cheongmyeong.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.Strike5, effect.BlessedDragonOfMountHua, effect.MasterOfTheBlossomingBlade],
    attack: {
      BasicAttack: { modifier: 250, speed: 142.86 },
      CritAttack: { modifier: 300, speed: 125 },
      Skill: { modifier: 1250, speed: 85.69 },
    },
  },
  Baekcheon: {
    key: "Baekcheon",
    img: "/character/Baekcheon.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [{ ...effect.PrecisionStrike5, characterTypeRestricted: "Melee" }],
    applyStatusAilments: [{ status: statusAilment.EnemyBurned, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 100, speed: 187.27 },
      CritAttack: { modifier: 200, speed: 115.34 },
      Skill: { modifier: 800, speed: 115.34 },
      DoT: { modifier: 40, speed: 500 },
    },
  },
  IseolYu: {
    key: "IseolYu",
    img: "/character/Iseol Yu.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [{ ...effect.Focus5, characterTypeRestricted: "Melee" }],
    // applyStatusAilments: [{ status: statusAilment.Frostbitten, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 250, speed: 115.34 },
      Skill: { modifier: 800, speed: 100 },
      DoT: { modifier: 20, speed: 500 },
    },
  },
  Yunjong: {
    key: "Yunjong",
    img: "/character/Yunjong.webp",
    rarity: rarity.Legendary,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 150, speed: 136.24 },
      Skill: { modifier: 800, speed: 149.93 },
    },
  },
  Jogeol: {
    key: "Jogeol",
    img: "/character/Jogeol.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [{ ...effect.Gale5, characterTypeRestricted: "Melee" }],
    applyStatusAilments: [{ status: statusAilment.EnemyBleeding, uptime: 1 }],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 150, speed: 142.86 },
      Skill: { modifier: 800, speed: 103.41 },
      DoT: { modifier: 40, speed: 500 },
    },
  },
  Noa: {
    key: "Noa",
    img: "/character/Noa.webp",
    rarity: rarity.Legendary,
    type: characterType.Melee,
    effects: [effect.CritRate5],
    attack: {
      BasicAttack: { modifier: 175, speed: 157.73 },
      CritAttack: {
        modifier: 250,
        speed: 93.72,
        attackModifier: { FinalDamage: { value: 50, applyCondition: "EnemyCursed" } },
      },
      Skill: { modifier: 1250, speed: 96.71 },
    },
  },
  Jake: {
    key: "Jake",
    img: "/character/Jake.webp",
    rarity: rarity.Legendary,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 150, speed: 149.93 },
      CritAttack: { modifier: 150, speed: 136.24 },
    },
  },
  GuardianPooki: {
    key: "GuardianPooki",
    img: "/character/Guardian Pooki.webp",
    rarity: rarity.Legendary,
    type: characterType.Defense,
    effects: [],
    attack: {
      BasicAttack: { modifier: 125, speed: 166.67 },
      CritAttack: { modifier: 150, speed: 119.9, cutCooldown: 2 },
      Skill: { modifier: 0, speed: 33.3 },
    },
  },
};

export const characters: Character[] = Object.values(character).sort((char1, char2) => {
  if (char1.rarity.key === char2.rarity.key) return char1.key > char2.key ? 1 : -1;
  return char1.rarity.key > char2.rarity.key ? 1 : -1;
});
