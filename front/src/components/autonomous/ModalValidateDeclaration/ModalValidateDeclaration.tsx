import React, { useState } from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { Typography } from '@/components/common/Typography';

dayjs.extend(duration); // extend dayjs with duration plugin

interface ModalValidateDeclarationForm {
  validateInformation: boolean;
  validateDocument: boolean;
  validateMarchandise: boolean;
}

interface ModalValidateDeclarationProps {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onValidate: () => void;
  declarationId: string;
}

export const ModalValidateDeclaration: React.FC<ModalValidateDeclarationProps> = ({
  onClose,
  open,
  isLoading,
  onValidate,
  declarationId,
}) => {
  const { register, handleSubmit } = useForm<ModalValidateDeclarationForm>({
    defaultValues: {
      validateInformation: false,
      validateDocument: false,
      validateMarchandise: false,
    },
  });

  const [validateInformation, setValidateInformation] = useState(false);
  const [validateDocument, setValidateDocument] = useState(false);
  const [validateMarchandise, setValidateMarchandise] = useState(false);

  const onSubmit = (data: ModalValidateDeclarationForm) => {
    if (data.validateInformation && data.validateDocument && data.validateMarchandise) {
      onValidate();
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose} withMargin={false}>
        <form className="flex flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center gap-1 justify-center">
            <Typography size="text-2xs" color="secondary">
              Numéro de quittance
            </Typography>
            <Typography size="text-sm" color="black" weight="bold">
              {declarationId}
            </Typography>
          </div>
          <div className="px-7 flex mt-5">
            <Typography size="text-xs" color="secondary" textPosition="text-center">
              Êtes-vous sur de vouloir valider la déclaration ?
            </Typography>
          </div>
          <div className="justify-start flex flex-1 flex-col items-start mt-5 gap-4">
            <div className="flex flex-1 flex-row items-center text-start gap-2">
              <input
                id="validate-information"
                {...register('validateInformation', {
                  onChange: (e) => {
                    setValidateInformation(e.target.checked);
                  },
                })}
                type="checkbox"
                value=""
                className="w-4 h-4 text-primary-600 bg-white border-black focus:ring-0 rounded-[2px]"
              />
              <label className="text-xs text-primary-600 ">Les informations sont validées</label>
            </div>
            <div className="flex flex-1 flex-row items-center text-start gap-2">
              <input
                id="validate-document"
                {...register('validateDocument', {
                  onChange: (e) => {
                    setValidateDocument(e.target.checked);
                  },
                })}
                type="checkbox"
                value=""
                className="w-4 h-4 text-primary-600 bg-white border-black focus:ring-0 rounded-[2px]"
              />
              <label className="text-xs text-primary-600 ">Les documents sont validés</label>
            </div>
            <div className="flex flex-1 flex-row items-center text-start gap-2">
              <input
                id="validate-marchandise"
                {...register('validateMarchandise', {
                  onChange: (e) => {
                    setValidateMarchandise(e.target.checked);
                  },
                })}
                type="checkbox"
                value=""
                className="w-4 h-4 text-primary-600 bg-white border-black focus:ring-0 rounded-[2px]"
              />
              <label className="text-xs text-primary-600 ">
                La déclaration de marchandise est correcte
              </label>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center mt-7">
            <Button
              disabled={
                isLoading || !validateInformation || !validateDocument || !validateMarchandise
              }
              type="submit"
            >
              Valider la déclaration
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
