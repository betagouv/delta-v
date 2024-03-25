import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMediaQuery } from 'react-responsive';

import { getSchema } from './schema';
import { Button } from '@/components/atoms/Button';
import { Typography } from '@/components/atoms/Typography';
import { InputGroup } from '@/components/input/InputGroup';
import DownModal from '@/components/molecules/DownModal';
import Modal from '@/components/molecules/Modal';

const FAVORITE_MAXIMUM_NAME_LENGTH = 30;

export interface FormAddFavoriteData {
  name: string;
}

interface ModalAddFavoriteProductProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormAddFavoriteData) => void;
  value?: string;
}

const getNameLengthHelperText = (value: string, limit: number): string => {
  if (value.length <= limit) {
    return `${limit - value.length} caractères restants`;
  }
  return `${limit} caractères maximum`;
};

export const ModalAddFavoriteProduct: React.FC<ModalAddFavoriteProductProps> = ({
  onClose,
  open,
  onSubmit,
  value,
}) => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormAddFavoriteData>({
    resolver: yupResolver(getSchema()),
    mode: 'onBlur',
  });
  const [added, setAdded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [helperText, setHelperText] = useState(
    `${FAVORITE_MAXIMUM_NAME_LENGTH} caractères maximum`,
  );

  const onSubmitForm = (data: FormAddFavoriteData) => {
    onSubmit(data);
    setAdded(true);
  };

  const handleClose = () => {
    setAdded(false);
    onClose();
  };

  const isMobile = useMediaQuery({
    query: '(max-width: 767px)',
  });

  useEffect(() => {
    const inputValue = watch('name') ?? '';
    setHelperText(getNameLengthHelperText(inputValue, FAVORITE_MAXIMUM_NAME_LENGTH));
    if (!isError && inputValue.length > FAVORITE_MAXIMUM_NAME_LENGTH) {
      setIsError(true);
    }
    if (isError && inputValue.length <= FAVORITE_MAXIMUM_NAME_LENGTH) {
      setIsError(false);
    }
  }, [watch('name')]);

  const MobileModal = () => {
    return (
      <DownModal
        bgColor="bg-white"
        open={open}
        onClose={handleClose}
        title="Ajouter aux favoris"
        titlePosition="text-left"
      >
        <div className="mt-[30px]">
          {added ? (
            <div className="flex flex-col gap-[30px] mb-2.5 justify-center items-center">
              <Typography size="text-xs" color="black" textPosition="text-center">
                La marchandise "{value}" <br /> à été ajouté à vos favoris.
              </Typography>
              <div className="w-36 flex self-center">
                <Button fullWidth type="button" onClick={handleClose}>
                  Fermer
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-1 flex-col gap-[30px]">
              <div className="flex flex-col gap-[6px]">
                <InputGroup
                  type="text"
                  fullWidth
                  name="name"
                  placeholder="Exemple : Jeans, pantalon noir, slim..."
                  register={register('name', { required: false })}
                  error={errors.name?.message as string | undefined}
                  withBorder
                />
                <div className="ml-5">
                  <Typography color={errors.name ? 'error' : 'black'} size="text-3xs">
                    30 caractères maximum
                  </Typography>
                </div>
              </div>
              <div className="flex-col flex items-center justify-center gap-4 mb-[10px]">
                <div className="w-36 flex">
                  <Button fullWidth type="submit">
                    Ajouter
                  </Button>
                </div>
                <Typography onClick={handleClose} underline color="primary">
                  Annuler
                </Typography>
              </div>
            </form>
          )}
        </div>
      </DownModal>
    );
  };

  const DesktopModal = () => {
    return (
      <Modal open={open} onClose={handleClose}>
        <div className="flex flex-col items-center gap-5">
          <Typography
            desktopSize="md:text-[26px]"
            color="black"
            desktopWeight="bold"
            textPosition="text-center"
          >
            Ajouter en favoris
          </Typography>
          {added ? (
            <div className="flex flex-col gap-[30px] mb-2.5 justify-center items-center">
              <Typography size="text-xs" color="black" textPosition="text-center">
                La marchandise "{value}" <br /> à été ajouté à vos favoris.
              </Typography>
              <div className="w-36 flex self-center">
                <Button fullWidth type="button" onClick={handleClose}>
                  Fermer
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <div className="flex items-center gap-[10px]">
                <InputGroup
                  type="text"
                  fullWidth
                  name="name"
                  placeholder="Exemple : Jeans, pantalon noir, slim..."
                  register={register('name', { required: false })}
                  error={isError ? '' : undefined}
                  withBorder
                />
                <div className="w-[112px] h-[34px] flex">
                  <Button fullWidth type="submit">
                    <span className="text-xs font-normal">Enregistrer</span>
                  </Button>
                </div>
              </div>
              <div className="ml-5">
                <Typography desktopSize="text-2xs" color={isError ? 'error' : 'black'}>
                  {helperText}
                </Typography>
              </div>
            </form>
          )}
        </div>
      </Modal>
    );
  };
  return <>{isMobile ? <MobileModal /> : <DesktopModal />}</>;
};
