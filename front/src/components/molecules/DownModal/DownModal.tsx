import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';

import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';

export interface IDownModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  bgColor?: string;
  children?: any;
  withoutMargin?: boolean;
  defaultHeight?: boolean;
  titlePosition?: 'text-left' | 'text-center' | 'text-right';
  preventClose?: boolean;
}

export const DownModal: React.FC<IDownModalProps> = ({
  open,
  onClose = () => {},
  title,
  bgColor = 'bg-white',
  children,
  withoutMargin = false,
  defaultHeight: fixedHeight = false,
  titlePosition = 'text-center',
  preventClose = false,
  subtitle,
}: IDownModalProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={classNames({
          'fixed bottom-0 z-40 w-full justify-center max-h-screen overflow-scroll': true,
          'h-[calc(90vh-50px)]': fixedHeight,
          'h-auto': !fixedHeight,
        })}
        onClose={preventClose ? () => {} : onClose}
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
            'flex w-full text-center place-content-center': true,
            'h-full': fixedHeight,
            'h-auto': !fixedHeight,
          })}
        >
          {/* This element is to trick the browser into centering the Downmodal contents. */}
          <span className="sm:inline-block sm:align-middle hidden" aria-hidden="true">
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
              className={`relative inline-block h-full w-full rounded-t-3xl z-10 ${bgColor} ${
                withoutMargin ? '' : 'px-4 py-5'
              } sm:max-w-lg sm:align-middle lg:rounded-b-3xl text-left shadow-xl transition-all`}
            >
              {!preventClose && (
                <div className="absolute top-4 right-4 flex h-7 w-7 items-center cursor-pointer">
                  <Icon name="clear" onClick={onClose} />
                </div>
              )}
              {title && (
                <div>
                  <Dialog.Title>
                    <Typography
                      size="text-lg"
                      color="black"
                      weight="bold"
                      lineHeight="leading-4"
                      textPosition={titlePosition}
                    >
                      {title}
                    </Typography>
                  </Dialog.Title>
                </div>
              )}
              {subtitle && (
                <div className="mt-[30px] text-center">
                  <Typography size="text-sm" color="secondary" lineHeight="leading-4">
                    {subtitle}
                  </Typography>
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
