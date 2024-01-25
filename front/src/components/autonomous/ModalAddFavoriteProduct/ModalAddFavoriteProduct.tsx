import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { getSchema } from './schema';
import { Button } from '@/components/common/Button';
import DownModal from '@/components/common/DownModal';
import { Typography } from '@/components/common/Typography';
import { InputGroup } from '@/components/input/InputGroup';

export interface FormAddFavoriteData {
  name: string;
}

interface ModalAddFavoriteProductProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormAddFavoriteData) => void;
  value?: string;
}

export const ModalAddFavoriteProduct: React.FC<ModalAddFavoriteProductProps> = ({
  onClose,
  open,
  onSubmit,
  value,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormAddFavoriteData>({
    resolver: yupResolver(getSchema()),
    mode: 'onBlur',
  });
  const [added, setAdded] = useState(false);

  const onSubmitForm = (data: FormAddFavoriteData) => {
    onSubmit(data);
    setAdded(true);
  };

  const handleClose = () => {
    setAdded(false);
    onClose();
  };

  return (
    <>
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
    </>
  );
};
