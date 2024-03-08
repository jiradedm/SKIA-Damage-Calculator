import type { CharacterTypeKey } from "./characterType";
import type { RarityKey } from "./rarity";

interface CharacterStatData {
  Attack: number[];
  Accuracy: number[];
  CritRate: number;
  CritDamage: number[];
}

export interface LevelOption {
  name: string;
  value: number;
}

const characterLevels = ["50", "55", "60"] as const;

export const characterLevelOptions: LevelOption[] = characterLevels.map((value) => ({
  name: `Lv. ${value}`,
  value: Number(value),
}));

export type CharacterLevelKey = (typeof characterLevels)[number];

export const characterStat = {
  LegendaryDefense50: {
    Attack: [15153, 18184, 21517, 25306, 29397, 33791, 38489, 43489, 48793, 54551, 60612],
    Accuracy: [681, 749, 817, 892, 974, 1062, 1158, 1267, 1389, 1532, 1703],
    CritRate: 11.61,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  LegendaryMelee50: {
    Attack: [33338, 40006, 47340, 55674, 64676, 74344, 84679, 95680, 107348, 120017, 133352],
    Accuracy: [681, 749, 817, 892, 974, 1062, 1158, 1267, 1389, 1532, 1703],
    CritRate: 15.49,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  LegendaryRanged50: {
    Attack: [37505, 45006, 53257, 62633, 72760, 83636, 95263, 107639, 120766, 135018, 150020],
    Accuracy: [681, 749, 817, 892, 974, 1062, 1158, 1267, 1389, 1532, 1703],
    CritRate: 19.36,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },
  LegendarySupport50: {
    Attack: [30307, 36368, 43036, 50613, 58796, 67585, 76980, 86981, 97589, 109105, 121228],
    Accuracy: [851, 936, 1021, 1115, 1217, 1328, 1447, 1583, 1736, 1915, 2128],
    CritRate: 19.36,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },
  UniqueDefense50: {
    Attack: [10228, 11251, 13194, 15342, 17694, 20251, 23013, 25979, 29150, 32423, 35798],
    Accuracy: [454, 499, 545, 595, 649, 708, 772, 844, 926, 1022, 1135],
    CritRate: 11.61,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  UniqueMelee50: {
    Attack: [22086, 24295, 28491, 33129, 38209, 43730, 49694, 56098, 62945, 70013, 77301],
    Accuracy: [454, 499, 545, 595, 649, 708, 772, 844, 926, 1022, 1135],
    CritRate: 15.49,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  UniqueRanged50: {
    Attack: [25003, 27503, 32254, 37505, 43255, 49506, 56257, 63508, 71259, 79260, 87511],
    Accuracy: [454, 499, 545, 595, 649, 708, 772, 844, 926, 1022, 1135],
    CritRate: 19.36,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },
  UniqueSupport50: {
    Attack: [20078, 22086, 25901, 30117, 34735, 39754, 45176, 50998, 57222, 63647, 70273],
    Accuracy: [568, 625, 682, 744, 812, 886, 965.6, 1056, 1159, 1278, 1420],
    CritRate: 19.36,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },

  LegendaryDefense55: {
    Attack: [16731, 20077, 23758, 27941, 32458, 37310, 42497, 48018, 53874, 60232, 66924],
    Accuracy: [716, 788, 859, 938, 1024, 1117, 1217, 1332, 1461, 1611, 1790],
    CritRate: 12.21,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  LegendaryMelee55: {
    Attack: [36808, 44170, 52267, 61469, 71408, 82082, 93492, 105639, 118522, 132509, 147232],
    Accuracy: [716, 788, 859, 938, 1024, 1117, 1217, 1332, 1461, 1611, 1790],
    CritRate: 16.28,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  LegendaryRanged55: {
    Attack: [41409, 49691, 58801, 69153, 80333, 92342, 105179, 118844, 133337, 149072, 165636],
    Accuracy: [716, 788, 859, 938, 1024, 1117, 1217, 1332, 1461, 1611, 1790],
    CritRate: 20.35,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },
  LegendarySupport55: {
    Attack: [33462, 40154, 47516, 55882, 64916, 74620, 84993, 96036, 107748, 120463, 133848],
    Accuracy: [895, 985, 1074, 1172, 1280, 1396, 1522, 1665, 1826, 2014, 2238],
    CritRate: 20.35,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },
  UniqueDefense55: {
    Attack: [11293, 12422, 14568, 16940, 19537, 22360, 25409, 28684, 32185, 35799, 39526],
    Accuracy: [477, 525, 572, 625, 682, 744, 811, 887, 973, 1073, 1193],
    CritRate: 12.21,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  UniqueMelee55: {
    Attack: [24385, 26824, 31457, 36578, 42186, 48282, 54866, 61938, 69497, 77300, 85348],
    Accuracy: [477, 525, 572, 625, 682, 744, 811, 887, 973, 1073, 1193],
    CritRate: 16.28,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  UniqueRanged55: {
    Attack: [27606, 30367, 35612, 41409, 47758, 54660, 62114, 70119, 78677, 87511, 96621],
    Accuracy: [477, 525, 572, 625, 682, 744, 811, 887, 973, 1073, 1193],
    CritRate: 20.35,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },
  UniqueSupport55: {
    Attack: [22168, 24385, 28597, 33252, 38351, 43893, 49878, 56307, 63179, 70273, 77588],
    Accuracy: [597, 657, 716, 782, 854, 931, 1014.9, 1110, 1218, 1343, 1493],
    CritRate: 20.35,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },

  LegendaryDefense60: {
    Attack: [18472, 22166, 26230, 30848, 35836, 41193, 46919, 53015, 59480, 66499, 73888],
    Accuracy: [752, 827, 902, 985, 1075, 1173, 1278, 1399, 1534, 1692, 1880],
    CritRate: 12.83,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  LegendaryMelee60: {
    Attack: [40639, 48767, 57707, 67867, 78840, 90625, 103223, 116634, 130858, 146300, 162556],
    Accuracy: [752, 827, 902, 985, 1075, 1173, 1278, 1399, 1534, 1692, 1880],
    CritRate: 17.11,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  LegendaryRanged60: {
    Attack: [45719, 54863, 64921, 76351, 88695, 101953, 116126, 131214, 147215, 164588, 182876],
    Accuracy: [752, 827, 902, 985, 1075, 1173, 1278, 1399, 1534, 1692, 1880],
    CritRate: 21.38,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },
  LegendarySupport60: {
    Attack: [36944, 44333, 52460, 61696, 71671, 82385, 93838, 106029, 118960, 132998, 147776],
    Accuracy: [941, 1035, 1129, 1233, 1346, 1468, 1600, 1750, 1920, 2117, 2353],
    CritRate: 21.38,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },
  UniqueDefense60: {
    Attack: [12468, 13715, 16084, 18702, 21570, 24687, 28053, 31669, 35534, 39524, 43638],
    Accuracy: [501, 551, 601, 656, 716, 782, 852, 932, 1022, 1127, 1253],
    CritRate: 12.83,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  UniqueMelee60: {
    Attack: [26923, 29615, 34731, 40385, 46577, 53308, 60577, 68384, 76731, 85346, 94231],
    Accuracy: [501, 551, 601, 656, 716, 782, 852, 932, 1022, 1127, 1253],
    CritRate: 17.11,
    CritDamage: [125, 131.25, 137.5, 143.75, 150.0, 156.25, 168.75, 181.25, 193.75, 206.25, 218.75],
  },
  UniqueRanged60: {
    Attack: [30479, 33527, 39318, 45719, 52729, 60348, 68578, 77417, 86865, 96618, 106677],
    Accuracy: [501, 551, 601, 656, 716, 782, 852, 932, 1022, 1127, 1253],
    CritRate: 21.38,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },
  UniqueSupport60: {
    Attack: [24476, 26924, 31574, 36714, 42343, 48462, 55071, 62169, 69757, 77589, 85666],
    Accuracy: [627, 690, 752, 821, 897, 978, 1065.9, 1166, 1279, 1411, 1568],
    CritRate: 21.38,
    CritDamage: [150, 158, 165, 173, 180, 188, 202.5, 217.5, 232.5, 247.5, 262.5],
  },
} as Record<`${RarityKey}${CharacterTypeKey}${CharacterLevelKey}`, CharacterStatData>;