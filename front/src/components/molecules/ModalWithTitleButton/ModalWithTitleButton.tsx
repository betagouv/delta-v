import React, { Fragment } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import { Icon } from '../../atoms/Icon';
import { Typography } from '../../atoms/Typography';
import { Color, Weight } from '../../atoms/Typography/style/typography.style';
import { Button } from '@/components/atoms/Button';
import clsxm from '@/utils/clsxm';

export interface IModalWithTitleButtonProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: any;
  preventClose?: boolean;
  withMargin?: boolean;
  noPadding?: boolean;
  titleColor?: Color;
  titleWeight?: Weight;
  scrollable?: boolean;
  onResetAll?: () => void;
  isDefaultValues?: boolean;
}

export const ModalWithTitleButton: React.FC<IModalWithTitleButtonProps> = ({
  open,
  onClose = () => {},
  title,
  children,
  preventClose = false,
  withMargin = true,
  noPadding = false,
  titleColor = 'primary',
  titleWeight = 'bold',
  scrollable = false,
  isDefaultValues,
  onResetAll,
}: IModalWithTitleButtonProps) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className={clsxm({
          'fixed inset-0 z-40 w-full overflow-visible': true,
          'overflow-scroll': scrollable,
        })}
        onClose={preventClose ? () => {} : onClose}
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

          {/* This element is to trick the browser into centering the ModalWithTitleButton contents. */}
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
                'overflow-hidden relative z-50 my-largeBase inline-block w-full p-ModalWithTitleButtonMobile md:p-ModalWithTitleButtonDesktop rounded-lg md:rounded-[20px] bg-white text-left align-bottom shadow-xl transition-all sm:max-w-lg sm:align-middle':
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
                <div className="text-center flex flex-row px-10 pt-[50px] pb-10 gap-3 items-center">
                  <Typography size="text-[26px]" color={titleColor} weight={titleWeight}>
                    {title}
                  </Typography>

                  <Button
                    type="button"
                    disabled={isDefaultValues}
                    onClick={onResetAll}
                    variant="normal"
                    color="tertiary"
                    size="xs"
                  >
                    Tout effacer
                  </Button>
                </div>
              )}
              {children && (
                <div
                  className={`flex flex-1 bg-gray-100 ${
                    withMargin && 'sm:mt-base md:m-0'
                  } w-full justify-center`}
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
