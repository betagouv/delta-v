import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

export interface ICenterModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  bgColor?: string;
  children?: any;
  centeredContent?: boolean;
  noMargin?: boolean;
  containerClassname?: string;
}

export const CenterModal: React.FC<ICenterModalProps> = ({
  open,
  onClose,
  title,
  bgColor = 'bg-white',
  children,
  centeredContent = false,
  noMargin = false,
  containerClassname,
}: ICenterModalProps) => {
  const handleOnClose = (): void => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={classNames({
          'fixed z-40 bottom-1/2 left-1/2 justify-center min-w-[544px]': true,
        })}
        onClose={handleOnClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>
        <div
          className={classNames(
            {
              'flex relative -translate-x-1/2 translate-y-1/2': true,
              'text-center place-content-center': centeredContent,
            },
            containerClassname,
          )}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-100 translate-y-full sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-100 translate-y-full sm:translate-y-0 sm:scale-95"
          >
            <div
              className={twMerge(
                classNames(
                  {
                    'inline-block w-full rounded-[20px] z-10 py-8 px-16 overflow-hidden': true,
                    'py-0 px-0': noMargin,
                  },
                  bgColor,
                ),
              )}
            >
              <div className="absolute top-4 right-4 flex h-7 w-7 items-center cursor-pointer">
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
              {children && <div className="w-full h-full">{children}</div>}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
