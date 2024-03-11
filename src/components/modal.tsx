import { Dialog, Transition } from "@headlessui/react";
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from "react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

import Title from "./title";

export interface ModalProps {
  className?: string;
  title?: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CloseIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="16px" width="16px" viewBox="0 0 492 492" fill="currentColor">
      <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872    c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872    c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052    L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116    c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952    c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116    c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z" />
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
                  "flex w-full relative max-w-lg flex-col gap-3 rounded bg-[#39465a] p-3 align-middle shadow-xl outline outline-4 outline-[#44627e] transition-all",
                  className,
                )}
              >
                {title && (
                  <div className="flex items-center justify-between">
                    <Title className="w-full">{title}</Title>
                    <div className="cursor-pointer p-1 text-[#ffffff]" onClick={() => setIsOpen(false)}>
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
