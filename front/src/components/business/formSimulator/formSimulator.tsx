import React from 'react';

import { Button } from '@dataesr/react-dsfr';
import { useFieldArray } from 'react-hook-form';

import { InputGroup } from '@/components/input/InputGroup';

interface FormSimulatorProps {
  onChangeBorder: (value: string) => void;
  onChangeMeanOfTransport: (e: any) => void;
  meanOfTransport?: string;
  register: any;
  control: any;
  errors: any;
}

export const FormSimulator: React.FC<FormSimulatorProps> = ({ register, control, errors }) => {
  const options = [
    { value: 'Avion', id: 'plane' },
    { value: 'Bateau', id: 'boat' },
    { value: 'Train', id: 'train' },
    { value: 'Voiture', id: 'car' },
  ];
  const { fields } = useFieldArray({
    control,
    name: 'shopingProducts',
  });

  return (
    <>
      <InputGroup
        name="border"
        label="Voyageur Frontalier"
        type="toggle"
        register={register('border')}
        control={control}
        error={errors?.border?.message}
      />

      <br />
      <InputGroup
        name="age"
        label="Age"
        type="number"
        register={register('age')}
        error={errors?.age?.message}
      />
      <br />
      <InputGroup
        name="meanOfTransport"
        label="Moyen de transport"
        type="select"
        register={register('meanOfTransport')}
        options={options}
        control={control}
        error={errors?.meanOfTransport?.message}
      />
      <br />
      <div>
        <div className="text-sm">Liste des produits</div>
        {fields.map((value, index) => (
          <div className="flex flex-row gap-5" key={index}>
            <div className="grow">
              <InputGroup
                key={value.id}
                name={`shopingProducts.${index}.id`}
                label="Id produit"
                type="text"
                register={register(`shopingProducts.${index}.id`)}
                error={errors?.shopingProducts?.[index]?.id?.message}
              />
            </div>
            <div className="grow">
              <InputGroup
                key={value.id}
                name={`shopingProducts.${index}.amount`}
                label="Quantité produit"
                type="number"
                register={register(`shopingProducts.${index}.amount`)}
                error={errors?.shopingProducts?.[index]?.amount?.message}
              />
            </div>
            <div className="grow">
              <InputGroup
                key={value.id}
                name={`shopingProducts.${index}.price`}
                label="Prix unitaire produit"
                type="number"
                register={register(`shopingProducts.${index}.price`)}
                error={errors?.shopingProducts?.[index]?.price?.message}
              />
            </div>
          </div>
        ))}
      </div>
      {/* <input hidden {...register('shopingProducts')}></input> */}
      {errors?.shopingProducts && (
        <div className="text-red-500">{errors.shopingProducts.message}</div>
      )}

      <Button submit size="sm" title="title">
        Simuler
      </Button>
    </>
  );
};
