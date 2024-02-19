import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { Icon } from '../Icon';
import { Typography } from '../Typography';
import clsxm from '@/utils/clsxm';

export interface IModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: any;
  preventClose?: boolean;
  withMargin?: boolean;
  noPadding?: boolean;
}

export const Modal: React.FC<IModalProps> = ({
  open,
  onClose = () => {},
  title,
  children,
  subtitle,
  preventClose = false,
  withMargin = true,
  noPadding = false,
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
        className="fixed inset-0 z-40 w-full overflow-visible"
        onClose={preventClose ? () => {} : handleOnClose}
      >
        <div className="flex min-h-screen items-center justify-center px-small pt-small pb-20 text-center">
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
            <div
              className={clsxm({
                'overflow-hidden relative z-50 my-largeBase inline-block w-full p-modalMobile md:p-modalDesktop rounded-lg md:rounded-[20px] bg-white text-left align-bottom shadow-xl transition-all sm:max-w-lg sm:align-middle':
                  true,
                'p-0 md:p-0': noPadding,
              })}
            >
              {!preventClose && (
                <div className="absolute top-4 right-4 flex h-7 w-7 items-center cursor-pointer">
                  <Icon name="clear" onClick={onClose} />
                </div>
              )}
              {title && (
                <div className="text-center">
                  <Dialog.Title>
                    <Typography size="text-lg" color="primary" weight="bold" lineHeight="leading-4">
                      {title}
                    </Typography>
                  </Dialog.Title>
                </div>
              )}
              {subtitle && (
                <div className="mt-5 text-center">
                  <Typography size="text-sm" color="secondary" lineHeight="leading-4">
                    {subtitle}
                  </Typography>
                </div>
              )}
              {children && (
                <div className={`flex ${withMargin && 'sm:mt-base md:m-0'} justify-center`}>
                  {children}
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
