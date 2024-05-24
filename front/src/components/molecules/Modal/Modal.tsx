import React, { Fragment, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { Color, TextSize, Weight } from '../../atoms/Typography/style/typography.style';
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
  titleColor?: Color;
  titleWeight?: Weight;
  desktopTitleSize?: TextSize;
  desktopSubtitleSize?: TextSize;
  scrollable?: boolean;
  noInitialFocus?: boolean;
  bgColor?: `bg-${string}`;
  verticalPosition?: `top-${string}` | `-top-${string}` | `bottom-${string}` | `-bottom-${string}`;
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
  titleColor = 'primary',
  titleWeight = 'bold',
  desktopTitleSize = 'text-lg',
  desktopSubtitleSize,
  scrollable = false,
  noInitialFocus = false,
  bgColor = 'bg-white',
  verticalPosition,
}: IModalProps) => {
  const dialogRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={clsxm({
          'fixed inset-0 z-40 w-full overflow-visible': true,
          'overflow-scroll': scrollable,
        })}
        onClose={preventClose ? () => {} : onClose}
        initialFocus={noInitialFocus ? dialogRef : undefined}
      >
        <div
          className={clsxm({
            'relative flex min-h-screen justify-center px-small pt-small pb-20 text-center': true,
            'items-center': !verticalPosition,
          })}
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
            <Dialog.Overlay className="fixed inset-0 bg-black/60 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
            ref={dialogRef}
          >
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
              className={clsxm(
                {
                  'absolute overflow-hidden z-50 my-largeBase inline-block w-full p-modalMobile md:p-modalDesktop rounded-lg md:rounded-[20px] text-left align-bottom shadow-xl transition-all sm:max-w-[544px] sm:align-middle':
                    true,
                  'p-0 md:p-0': noPadding,
                  'h-fit': verticalPosition,
                },
                verticalPosition ?? '',
                bgColor,
              )}
            >
              {!preventClose && (
                <div className="absolute top-4 right-4 flex h-7 w-7 items-center cursor-pointer">
                  <Icon name="clear" onClick={onClose} />
                </div>
              )}
              {title && (
                <div className="text-center">
                  <Dialog.Title>
                    <Typography
                      size="text-lg"
                      color={titleColor}
                      weight={titleWeight}
                      desktopSize={desktopTitleSize}
                      lineHeight="leading-4"
                    >
                      {title}
                    </Typography>
                  </Dialog.Title>
                </div>
              )}
              {subtitle && (
                <div className="mt-5 text-center">
                  <Typography
                    size="text-sm"
                    color="secondary"
                    lineHeight="leading-4"
                    desktopSize={desktopSubtitleSize}
                  >
                    {subtitle}
                  </Typography>
                </div>
              )}
              {children && (
                <div
                  className={clsxm({
                    'flex justify-center': true,
                    'sm:mt-base md:m-0': withMargin,
                  })}
                >
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
