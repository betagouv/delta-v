import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

export interface IDownModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  bgColor?: string;
  children?: any;
}

export const DownModal: React.FC<IDownModalProps> = ({
  open,
  onClose,
  title,
  bgColor = 'bg-white',
  children,
}: IDownModalProps) => {
  const handleOnClose = (): void => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed bottom-0 z-40 w-full justify-center"
        onClose={handleOnClose}
      >
        <div className="flex w-full text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/60 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the Downmodal contents. */}
          <span className="hidden sm:inline-block sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className={`inline-block h-auto w-full rounded-t-3xl ${bgColor} px-4 py-5 text-left shadow-xl transition-all sm:max-w-lg sm:align-middle lg:rounded-b-3xl`}
            >
              <div className="absolute top-4 right-4 flex h-4 w-4 items-center">
                <Icon name="clear" onClick={onClose} />
              </div>
              {title && (
                <div className="mx-base text-center">
                  <Dialog.Title>
                    <Typography size="text-lg" color="black" weight="bold" lineHeight="leading-4">
                      {title}
                    </Typography>
                  </Dialog.Title>
                </div>
              )}
              {children && <div className="flex w-full">{children}</div>}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};