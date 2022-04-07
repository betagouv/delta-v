import React, { useMemo } from 'react';

import { getNames } from 'i18n-iso-countries';

import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';

interface FormSimulatorProps {
  remove: (index: number) => void;
  fields: Record<'id', string>[];
  register: any;
  control: any;
  errors: any;
}

export const FormSimulator: React.FC<FormSimulatorProps> = ({
  register,
  remove,
  control,
  errors,
  fields,
}) => {
  const meanOfTransportOptions = [
    { value: 'Avion', id: 'plane' },
    { value: 'Bateau', id: 'boat' },
    { value: 'Train', id: 'train' },
    { value: 'Voiture', id: 'car' },
    { value: 'Autre', id: 'other' },
  ];

  const countriesOptions = useMemo(() => {
    const countries = getNames('fr', { select: 'official' });
    const keys = Object.keys(countries);
    return keys.map((key) => ({ value: countries[key] ?? '', id: key }));
  }, []);

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
        options={meanOfTransportOptions}
        control={control}
        error={errors?.meanOfTransport?.message}
      />
      <br />
      <InputGroup
        name="country"
        label="Pays d'origine"
        type="select"
        control={control}
        options={countriesOptions}
      />
      <br />
      <div>
        {fields.length > 0 && <div className="mb-4 text-lg">Liste des produits</div>}

        {fields.map((value, index) => (
          <>
            <div className="mb-4 flex flex-row items-end gap-5" key={index}>
              <input key={value.id} {...register(`shopingProducts.${index}.id`)} hidden />
              <div className="grow">
                <InputGroup
                  key={value.id}
                  name={`shopingProducts.${index}.name`}
                  disabled
                  label="Nom du produit"
                  type="text"
                  register={register(`shopingProducts.${index}.name`)}
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

              <div className="mb-1 grow">
                <Button type="button" size="sm" onClick={() => remove(index)}>
                  Retirer
                </Button>
              </div>
            </div>
          </>
        ))}
      </div>
      {/* <input hidden {...register('shopingProducts')}></input> */}
      {errors?.shopingProducts && (
        <div className="text-red-500">{errors.shopingProducts.message}</div>
      )}
      <br />
      <Button type="submit" size="base">
        Simuler
      </Button>
    </>
  );
};
