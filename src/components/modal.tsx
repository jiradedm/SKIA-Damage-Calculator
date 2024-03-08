import { Dialog, Transition } from "@headlessui/react";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

import Title from "./title";

export interface ModalProps {
  isOpen: boolean;
  className?: string;
  title?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="22px"
      width="22px"
      viewBox="4 4 40 40"
      fill="currentColor"
      className="rounded border-2 border-black bg-white"
    >
      <path d="M42,4H6A2,2,0,0,0,4,6V42a2,2,0,0,0,2,2H42a2,2,0,0,0,2-2V6A2,2,0,0,0,42,4ZM32.3,29.5a2.1,2.1,0,0,1,.4,2.7,2,2,0,0,1-3.1.2L24,26.8l-5.6,5.6a2,2,0,0,1-3.1-.2,2.1,2.1,0,0,1,.4-2.7L21.2,24l-5.5-5.5a2.2,2.2,0,0,1-.4-2.7,2,2,0,0,1,3.1-.2L24,21.2l5.6-5.6a2,2,0,0,1,3.1.2,2.2,2.2,0,0,1-.4,2.7L26.8,24Z" />
    </svg>
  );
};

const Modal: FC<PropsWithChildren & ModalProps> = ({ isOpen, setIsOpen, children, title = "", className = "" }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-[2%] text-white">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={twMerge(
                  "flex w-full relative max-w-lg flex-col gap-3 overflow-hidden rounded bg-[#39465a] p-3 align-middle shadow-xl outline outline-4 outline-[#44627e] transition-all",
                  className,
                )}
              >
                {title && (
                  <div className="flex items-center justify-between">
                    <Title className="w-full">{title}</Title>
                    <div className="cursor-pointer rounded-md text-[#db395a]" onClick={() => setIsOpen(false)}>
                      <CloseIcon />
                    </div>
                  </div>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
