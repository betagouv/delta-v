import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { Icon } from '../Icon';

export interface IModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  subtitle?: string;
  children?: any;
}

export const Modal: React.FC<IModalProps> = ({
  open,
  onClose,
  title,
  children,
  subtitle,
}: IModalProps) => {
  const handleOnClose = (): void => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0  z-10 w-full overflow-visible"
        onClose={handleOnClose}
      >
        <div className="flex min-h-screen items-center justify-center px-small pt-small pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/70 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
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
            <div className="my-largeBase inline-block w-full rounded-lg bg-white p-modal text-left align-bottom shadow-xl transition-all sm:max-w-lg sm:align-middle">
              <div className="absolute top-0 right-0 p-extraSmall sm:block">
                <Icon name="clear" size="base" onClick={onClose} />
              </div>
              {title && (
                <div className="text-center">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-primary-600">
                    {title}
                  </Dialog.Title>
                </div>
              )}
              {subtitle && (
                <div className="text-center">
                  <div className="mt-2 text-base">{subtitle}</div>
                </div>
              )}
              {children && <div className="mt-base flex justify-center">{children}</div>}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
