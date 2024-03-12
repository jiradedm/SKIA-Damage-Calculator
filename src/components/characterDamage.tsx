import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { FC } from "react";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { AddPage } from "@/app/add/component";
import { formatNumber } from "@/libs/format";
import type { CalulatedCharacter } from "@/store";
import { useCharacterStore } from "@/store";

import Button from "./button";
import CharacterIcon from "./characterIcon";
import EffectIcon from "./effectIcon";
import type { ModalProps } from "./modal";
import Modal from "./modal";
import { StarCompact } from "./starSelector";

const DragIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -2 24 24" fill="currentColor" className="size-[14px]">
      <path d="M7 18.005C7 19.1078 7.9 20 9 20C10.1 20 11 19.1078 11 18.005C11 16.9023 10.1 16 9 16C7.9 16 7 16.9023 7 18.005Z" />
      <path d="M7 12.005C7 13.1078 7.9 14 9 14C10.1 14 11 13.1078 11 12.005C11 10.9023 10.1 10 9 10C7.9 10 7 10.9023 7 12.005Z" />
      <path d="M7 6.00501C7 7.10777 7.9 8 9 8C10.1 8 11 7.10777 11 6.00501C11 4.90226 10.1 4 9 4C7.9 4 7 4.90226 7 6.00501Z" />
      <path d="M13 6.00501C13 7.10777 13.9 8 15 8C16.1 8 17 7.10777 17 6.00501C17 4.90226 16.1 4 15 4C13.9 4 13 4.90226 13 6.00501Z" />
      <path d="M13 12.005C13 13.1078 13.9 14 15 14C16.1 14 17 13.1078 17 12.005C17 10.9023 16.1 10 15 10C13.9 10 13 10.9023 13 12.005Z" />
      <path d="M13 18.005C13 19.1078 13.9 20 15 20C16.1 20 17 19.1078 17 18.005C17 16.9023 16.1 16 15 16C13.9 16 13 16.9023 13 18.005Z" />
    </svg>
  );
};

interface CharacterDamageProps {
  character: CalulatedCharacter;
  readonly?: boolean;
}

const StatModal: FC<ModalProps & CharacterDamageProps> = ({ isOpen, setIsOpen, character }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Character Stats">
      <div>
        {character.damage.stats.map((characterStat, index) => {
          let value = String(characterStat.value);
          if (characterStat.isFlat) {
            if (!characterStat.noFormat) value = formatNumber(characterStat.value);
            else value = Math.floor(parseFloat(characterStat.value.toFixed(1))).toLocaleString();
          } else value = parseFloat((characterStat.value * 100).toFixed(2)).toLocaleString();

          return (
            <div key={index} className={twMerge("flex justify-between py-1", index % 2 !== 0 && "bg-[#2f3745]")}>
              <div>{characterStat.name}</div>
              <div className="whitespace-nowrap text-[#fcf4d3]">
                {value}
                {characterStat.isFlat ? "" : "%"}
                {characterStat.isMaxHitFlag ? "*" : ""}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

const CharacterDamage: FC<CharacterDamageProps> = ({ readonly, character }) => {
  const { deleteCharacter, toggleActiveCharacter } = useCharacterStore();

  const { listeners, setNodeRef, transform } = useSortable({ id: character.id });

  const style = { transform: CSS.Transform.toString(transform) };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <div className={twMerge("relative", readonly && !character.active && "grayscale")}>
      {readonly && (
        <div className="absolute z-[1] size-full cursor-pointer" onClick={() => toggleActiveCharacter(character.id)} />
      )}
      <div
        className={twMerge("flex select-none items-center gap-2", !readonly && "bg-[#39465a]")}
        ref={setNodeRef}
        style={style}
      >
        <div className={twMerge("relative w-fit", !readonly && "cursor-pointer")} onClick={() => setIsOpen(true)}>
          <CharacterIcon character={character.character} showName={false} className="row-span-3 w-[72px]" />
          <StarCompact selectedStar={character.star} readonly className="absolute inset-x-0 -top-2" />
        </div>
        <div className="flex w-full flex-col gap-1">
          <div className="flex w-fit cursor-grab touch-none items-center" {...listeners}>
            <div className="text-stroke w-fit text-center text-lg font-[500] leading-5">{character.name}</div>
            {!readonly && <DragIcon />}
          </div>
          <div className="flex h-fit w-full items-center gap-1 bg-gradient-to-r from-[#243a4a] from-40% to-transparent to-100% p-1 text-center font-[500] leading-4">
            <div>
              Total <span className="truncate">Damage :</span>
            </div>
            <div
              className={twMerge(
                "cursor-pointer hover:underline text-lg leading-5 text-[#fcf4d3]",
                character.active && readonly && "z-[2]",
              )}
              onClick={() => setIsOpen3(true)}
            >
              {formatNumber(character.damage.totalDamage)}
            </div>
          </div>
          <StatModal isOpen={isOpen3} setIsOpen={setIsOpen3} character={character} />
          <div className="flex gap-1">
            {character.effects.map((effect) => (
              <EffectIcon key={effect.key} name={effect.name} img={effect.img} active />
            ))}
          </div>
        </div>
      </div>
      {!readonly && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Edit Character">
          <AddPage isEdit character={character} onEdited={() => setIsOpen(false)} />
          <Button className="border-[#e4babd] bg-[#ba7d7a]" onClick={() => setIsOpen2(true)}>
            Delete Character
          </Button>
          <Modal isOpen={isOpen2} setIsOpen={setIsOpen2} className="w-fit">
            <div className="flex min-w-[200px] flex-col gap-2">
              <div className="text-center">Delete {character.character.name} ?</div>
              <div className="flex justify-around gap-2">
                <Button
                  className="w-[80px]"
                  onClick={() => {
                    deleteCharacter(character.id);
                    setIsOpen2(false);
                  }}
                >
                  Confirm
                </Button>
                <Button className="w-[80px] border-[#e4babd] bg-[#ba7d7a]" onClick={() => setIsOpen2(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </Modal>
        </Modal>
      )}
    </div>
  );
};

export default CharacterDamage;
