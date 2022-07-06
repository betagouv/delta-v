import React from 'react';

import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';

interface FormAddProductProps {
  register: any;
  control: any;
  disabled?: boolean;
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
  disabled = false,
}: FormAddProductProps) => {
  return (
    <>
      <InputGroup
        disabled={disabled}
        label="Saisissez le montant"
        placeholder="Montant"
        type="number"
        fullWidth={false}
        name="price"
        options={selectOptions}
        register={register('price', { required: true })}
        control={control}
      />
      <InputGroup
        disabled={disabled}
        label="Choisissez la devise"
        type="simple-select"
        fullWidth={false}
        name="devise"
        options={selectOptions}
        register={register('devise', { required: true })}
        control={control}
      />
      <div className="flex-1" />
      <Button disabled={disabled} fullWidth={true} type="submit">
        Valider
      </Button>
    </>
  );
};
