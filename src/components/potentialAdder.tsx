"use client";

import type { ComponentPropsWithoutRef, FC } from "react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

import { potentialValues } from "@/data/potential";
import type { Rarity } from "@/data/rarity";
import { rarities, rarity } from "@/data/rarity";
import type { Stat } from "@/data/stat";
import { baseStats } from "@/data/stat";

import Button from "./button";
import Select from "./select";

const TrashIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="16px" height="16px" viewBox="-32 0 512 512">
      <path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z" />
    </svg>
  );
};

const LockIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#000" width="16px" height="16px" viewBox="0 0 330 330">
      <path d="M65,330h200c8.284,0,15-6.716,15-15V145c0-8.284-6.716-15-15-15h-15V85c0-46.869-38.131-85-85-85   S80,38.131,80,85v45H65c-8.284,0-15,6.716-15,15v170C50,323.284,56.716,330,65,330z M180,234.986V255c0,8.284-6.716,15-15,15   s-15-6.716-15-15v-20.014c-6.068-4.565-10-11.824-10-19.986c0-13.785,11.215-25,25-25s25,11.215,25,25   C190,223.162,186.068,230.421,180,234.986z M110,85c0-30.327,24.673-55,55-55s55,24.673,55,55v45H110V85z" />
    </svg>
  );
};

const DiceIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="22px" width="22px" viewBox="0 0 512 512">
      <path d="M454.608,111.204L280.557,6.804C272.992,2.268,264.504,0,256,0c-8.507,0-16.996,2.268-24.557,6.797   L57.392,111.204c-5.346,3.203-9.916,7.37-13.555,12.192l207.902,124.707c2.622,1.575,5.896,1.575,8.518,0L468.16,123.396   C464.521,118.574,459.955,114.407,454.608,111.204z M177.16,131.738c-12.056,8.371-31.302,8.16-42.984-0.49   c-11.684-8.65-11.382-22.463,0.678-30.842c12.056-8.386,31.304-8.16,42.992,0.482C189.525,109.539,189.22,123.344,177.16,131.738z    M376.303,134.126c-12.056,8.38-31.306,8.16-42.992-0.49c-11.68-8.65-11.378-22.462,0.685-30.841   c12.053-8.38,31.302-8.168,42.985,0.482C388.664,111.928,388.359,125.732,376.303,134.126z" />
      <path d="M246.136,258.366L38.004,133.523c-2.457,5.802-3.794,12.116-3.794,18.62v208.084   c0,16.773,8.801,32.311,23.182,40.946l174.051,104.392c5.828,3.496,12.203,5.629,18.714,6.435V265.464   C250.156,262.556,248.631,259.858,246.136,258.366z M75.845,369.736c-12.052-6.571-21.829-21.671-21.829-33.728   c0-12.056,9.777-16.502,21.829-9.931c12.056,6.57,21.826,21.671,21.826,33.728C97.671,371.861,87.902,376.306,75.845,369.736z    M75.845,247.869c-12.052-6.578-21.829-21.678-21.829-33.728c0-12.056,9.777-16.501,21.829-9.931   c12.056,6.571,21.826,21.671,21.826,33.728C97.671,249.986,87.902,254.44,75.845,247.869z M136.779,342.014   c-12.056-6.571-21.826-21.671-21.826-33.728s9.769-16.502,21.826-9.931c12.056,6.571,21.829,21.671,21.829,33.728   C158.608,344.131,148.835,348.585,136.779,342.014z M197.716,436.158c-12.056-6.571-21.83-21.671-21.83-33.727   c0-12.049,9.773-16.495,21.83-9.924c12.056,6.57,21.826,21.67,21.826,33.72C219.541,438.284,209.772,442.729,197.716,436.158z    M197.716,314.292c-12.056-6.57-21.83-21.671-21.83-33.727c0-12.056,9.773-16.502,21.83-9.931   c12.056,6.571,21.826,21.671,21.826,33.727C219.541,316.417,209.772,320.863,197.716,314.292z" />
      <path d="M473.992,133.523L265.864,258.366c-2.494,1.492-4.02,4.19-4.02,7.098V512   c6.506-0.806,12.889-2.939,18.714-6.435l174.051-104.392c14.381-8.635,23.182-24.172,23.182-40.946V152.143   C477.79,145.64,476.453,139.326,473.992,133.523z M321.232,262.932c12.053-6.571,21.826-2.125,21.826,9.931   c0,12.049-9.773,27.149-21.826,33.72c-12.06,6.571-21.83,2.125-21.83-9.924C299.402,284.604,309.172,269.503,321.232,262.932z    M321.232,448.735c-12.06,6.57-21.83,2.125-21.83-9.931s9.77-27.15,21.83-33.728c12.053-6.571,21.826-2.118,21.826,9.931   C343.058,427.064,333.285,442.164,321.232,448.735z M322.536,377.663c-12.056,6.571-21.83,2.117-21.83-9.939   c0-12.048,9.773-27.149,21.83-33.72c12.056-6.57,21.826-2.125,21.826,9.931S334.592,371.085,322.536,377.663z M427.32,386.403   c-12.056,6.571-21.826,2.125-21.826-9.931c0-12.056,9.769-27.156,21.826-33.72c12.056-6.578,21.829-2.133,21.829,9.924   C449.149,364.732,439.376,379.833,427.32,386.403z M427.32,315.332c-12.056,6.563-21.826,2.125-21.826-9.931   c0-12.056,9.769-27.157,21.826-33.728c12.056-6.571,21.829-2.125,21.829,9.931C449.149,293.653,439.376,308.761,427.32,315.332z    M427.32,244.253c-12.056,6.57-21.826,2.125-21.826-9.924c0-12.056,9.769-27.157,21.826-33.728   c12.056-6.571,21.829-2.125,21.829,9.931C449.149,222.582,439.376,237.682,427.32,244.253z" />
    </svg>
  );
};

export interface IPotential {
  rarity: Rarity;
  stat: Stat;
  value: number;
}

export type Potential = IPotential | "limited" | null;

interface PotentialAdderProps {
  readonly?: boolean;
  potentials: Potential[];
  setPotentials?: React.Dispatch<React.SetStateAction<Potential[]>>;
}

const PotentialAdder: FC<ComponentPropsWithoutRef<"div"> & PotentialAdderProps> = ({
  readonly,
  className,
  potentials,
  setPotentials = () => {},
  ...props
}) => {
  const { t: tr } = useTranslation("rarity");
  const { t: ts } = useTranslation("stat");

  const [selectedStat, setSelectedStat] = useState(baseStats[0]);
  const [selectedRarity, setSelectedRarity] = useState(rarity.Legendary);

  const values = useMemo(
    () =>
      potentialValues[`${selectedRarity.key}${selectedStat.key}`].map((value) => ({ key: value, name: `${value}%` })),
    [selectedRarity, selectedStat],
  );

  const [selectedValue, setSelectedValue] = useState(values[0]);

  const addPotential = () => {
    const potential = {
      rarity: selectedRarity,
      stat: selectedStat,
      value: selectedValue.key,
    };
    setPotentials((prev) => {
      const arr = [...prev];
      const index = prev.findIndex((potent) => !potent);
      if (index === -1) return arr;
      arr[index] = potential;
      return arr;
    });
  };

  const deletePotential = (index: number) => {
    setPotentials((prev) => {
      const arr = [...prev];
      arr[index] = null;
      return arr;
    });
  };

  useEffect(() => {
    setSelectedValue(values[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRarity, selectedStat]);

  return (
    <div className={twMerge("flex flex-col gap-2 text-sm text-white md:text-base", className)} {...props}>
      {!readonly && (
        <div className="grid w-full grid-cols-[33%_45%_22%] gap-y-1.5 md:grid-cols-[25%_35%_20%_20%]">
          <Select selected={selectedRarity} setSelected={setSelectedRarity} options={rarities} namespace="rarity" />
          <Select selected={selectedStat} setSelected={setSelectedStat} options={baseStats} namespace="stat" />
          <Select selected={selectedValue} setSelected={setSelectedValue} options={values} />
          <div className="col-span-3 md:col-span-1 md:pl-1.5">
            <Button onClick={() => addPotential()}>Add</Button>
          </div>
        </div>
      )}
      {potentials.map((potential, index) => (
        <div
          key={index}
          className={twMerge(
            "flex h-[42px] items-center justify-between rounded-full border-2 border-[#7c7c7c] bg-[#3b3c40] p-1",
            potential === "limited" && "brightness-[65%]",
          )}
        >
          {!potential && <div className="w-full truncate text-center opacity-50">No potential granted.</div>}
          {!!potential &&
            (potential === "limited" ? (
              <div className="flex w-full justify-center opacity-50">
                <DiceIcon />
              </div>
            ) : (
              <>
                <div
                  className={twMerge(
                    "rounded-full min-w-[90px] border-2 py-0.5 px-1 text-center",
                    potential.rarity.selectClass,
                  )}
                >
                  <div className="truncate">{tr(potential.rarity.key)}</div>
                </div>
                <div>
                  +{potential.value}% {ts(potential.stat.key)}
                </div>
                <div className="flex justify-end">
                  <div
                    className={twMerge(
                      "w-fit rounded-full bg-gradient-to-b from-[#bbbbbb] via-[#f8f8f8] to-[#f8f8f8] p-2",
                      !readonly && "hover:brightness-95 cursor-pointer",
                    )}
                    onClick={() => deletePotential(index)}
                  >
                    {readonly ? <LockIcon /> : <TrashIcon />}
                  </div>
                </div>
              </>
            ))}
        </div>
      ))}
    </div>
  );
};

export default PotentialAdder;
