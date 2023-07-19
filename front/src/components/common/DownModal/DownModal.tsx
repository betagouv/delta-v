import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';

import { Icon } from '../Icon';
import { Typography } from '../Typography';

export interface IDownModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  bgColor?: string;
  children?: any;
  withoutMargin?: boolean;
  defaultHeight?: boolean;
}

export const DownModal: React.FC<IDownModalProps> = ({
  open,
  onClose,
  title,
  bgColor = 'bg-white',
  children,
  withoutMargin = false,
  defaultHeight: fixedHeight = false,
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
        className={classNames({
          'fixed bottom-0 z-40 w-full justify-center': true,
          'h-[calc(100vh-50px)]': fixedHeight,
          'h-auto': !fixedHeight,
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
          className={classNames({
            'flex w-full text-center': true,
            'h-full': fixedHeight,
            'h-auto': !fixedHeight,
          })}
        >
          {/* This element is to trick the browser into centering the Downmodal contents. */}
          <span className="hidden sm:inline-block sm:align-middle" aria-hidden="true">
            &#8203;
          </span>
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
              className={`inline-block h-full w-full rounded-t-3xl ${bgColor} ${
                withoutMargin ? '' : 'px-4 py-5'
              } text-left shadow-xl transition-all sm:max-w-lg sm:align-middle lg:rounded-b-3xl`}
            >
              <div className="absolute top-4 right-4 flex h-7 w-7 items-center">
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
