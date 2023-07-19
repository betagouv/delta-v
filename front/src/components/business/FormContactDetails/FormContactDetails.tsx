/* eslint-disable no-nested-ternary */

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { getSchema } from './schema';
import { Button } from '@/components/common/Button';
import { InputGroup } from '@/components/input/InputGroup';

interface FormContactDetailsProps {
  onSubmit: (data: FormDeclarationData) => void;
  defaultValues?: Partial<FormDeclarationData>;
}

export interface FormDeclarationData {
  lastName: string;
  firstName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phoneNumber: string;
}

export const FormContactDetails = ({ onSubmit, defaultValues }: FormContactDetailsProps) => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isValid },
  } = useForm<FormDeclarationData>({
    mode: 'onBlur',
    resolver: yupResolver(getSchema()),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 mb-4">
          <div className="w-56">
            <InputGroup
              type="text"
              name="lastName"
              label="Nom"
              fullWidth={true}
              placeholder="Nom"
              register={register('lastName')}
              control={control}
              error={errors?.lastName?.message as string | undefined}
              required
            />
          </div>
          <div className="w-56">
            <InputGroup
              type="text"
              name="firstName"
              label="Prénom"
              fullWidth={true}
              placeholder="Prénom"
              register={register('firstName')}
              control={control}
              error={errors?.firstName?.message as string | undefined}
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <InputGroup
            type="text"
            name="address"
            label="Adresse"
            fullWidth={true}
            placeholder="Adresse"
            register={register('address')}
            control={control}
            error={errors?.address?.message as string | undefined}
            required
          />
          <div className="flex flex-row gap-4 w-full">
            <div className="w-28">
              <InputGroup
                type="text"
                name="postalCode"
                label="Code postal"
                fullWidth={true}
                placeholder="Code postal"
                register={register('postalCode')}
                control={control}
                error={errors?.postalCode?.message as string | undefined}
                required
              />
            </div>
            <div className="flex-1">
              <InputGroup
                type="text"
                name="city"
                label="Ville"
                fullWidth={true}
                placeholder="Ville"
                register={register('city')}
                control={control}
                error={errors?.city?.message as string | undefined}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mb-4">
          <InputGroup
            type="text"
            name="mail"
            fullWidth={true}
            placeholder="Email"
            label="Email"
            register={register('email')}
            control={control}
            error={errors?.email?.message as string | undefined}
            required
          />
          <InputGroup
            type="text"
            name="phone"
            label="Téléphone"
            fullWidth={false}
            placeholder="Téléphone"
            register={register('phoneNumber')}
            control={control}
            error={errors?.phoneNumber?.message as string | undefined}
            required
          />
        </div>
      </div>

      <div className="mb-8 flex-1" />
      <Button fullWidth={true} type="submit" disabled={!isValid}>
        Valider
      </Button>
    </form>
  );
};
