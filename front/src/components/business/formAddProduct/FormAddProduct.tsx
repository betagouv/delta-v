import React from 'react';

import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';

interface FormAddProductProps {
  register: any;
  control: any;
}

export interface FormSimulatorData {
  price?: number;
  devise?: string;
}

const selectOptions = [
  {
    value: 'EURO',
    id: 'eur',
  },
];

export const FormAddProduct: React.FC<FormAddProductProps> = ({
  register,
  control,
}: FormAddProductProps) => {
  return (
    <>
      <InputGroup
        label="Saisissez le montant"
        type="number"
        fullWidth={false}
        name="price"
        options={selectOptions}
        register={register('price', { required: true })}
        control={control}
      />
      <br />
      <InputGroup
        label="Choisissez la devise"
        type="simple-select"
        fullWidth={false}
        name="devise"
        options={selectOptions}
        register={register('devise', { required: true })}
        control={control}
      />
      <div className="absolute inset-x-0 bottom-0 w-full">
        <div className="p-4">
          <Button fullWidth={true} type="submit">
            Valider
          </Button>
        </div>
      </div>
    </>
  );
};
