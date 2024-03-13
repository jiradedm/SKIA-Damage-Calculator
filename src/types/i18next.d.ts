import "i18next";

import type { AccessoryKey } from "@/data/accessory";
import type { CharacterKey } from "@/data/character";
import type { CharacterTypeKey } from "@/data/characterType";
import type { RarityKey } from "@/data/rarity";
import type { StatKey } from "@/data/stat";

const resource = {
  common: await import("@/libs/locales/en/common.json"),
} as const;

interface ResourceData {
  accessory: Record<AccessoryKey, string>;
  stat: Record<StatKey, string>;
  rarity: Record<RarityKey, string>;
  character: Record<CharacterKey, string>;
  characterType: Record<CharacterTypeKey, string>;
}

type Resource = typeof resource & ResourceData;

declare module "i18next" {
  interface CustomTypeOptions {
    resources: Resource;
  }
}

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: Resource;
  }
}
