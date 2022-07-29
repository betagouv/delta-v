import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Andorra } from './Andorra';
import { Eu } from './Eu';
import { NonEu } from './NonEu';
import { NonEuBorder } from './NonEuBorder';
import { AccordionData } from '@/components/common/Accordion/Accordion';
import { Radio } from '@/components/input/StandardInputs/Radio';
import { CountryType } from '@/utils/country.util';

export interface FormData {
  buying?: boolean;
}

export interface BuyingProps {
  countryType: CountryType;
  border: boolean;
}

interface EventChangeRadio {
  type: string;
  target: {
    name: string;
    value?: 'true' | 'false';
  };
}

const ContentBuying: React.FC<BuyingProps> = ({ border, countryType }: BuyingProps) => {
  const [buying, setBuying] = useState<boolean | undefined>(undefined);

  const { register } = useForm<FormData>({
    defaultValues: {
      buying: undefined,
    },
  });

  const contentDeclareSomething = (): React.ReactNode => {
    if (countryType === CountryType.EU) {
      return <Eu />;
    }
    if (countryType === CountryType.ANDORRA) {
      return <Andorra />;
    }
    if (countryType === CountryType.NON_EU) {
      if (border) {
        return <NonEuBorder />;
      }
      return <NonEu />;
    }

    return <></>;
  };

  register('buying', {
    onChange: ({ type, target: { name, value } }: EventChangeRadio) => {
      const notResetSteps = !name || type !== 'change';
      if (notResetSteps) {
        return;
      }
      setBuying(value === 'true');
    },
  });

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-4">
      <div className="mb-2">
        <Radio
          name="adult"
          register={register('buying')}
          radioValues={[
            { id: 'true', value: 'Oui' },
            { id: 'false', value: 'Non' },
          ]}
        />
      </div>
      {buying === false && <p>Vous n’avez rien à déclarer !</p>}
      {buying === true && contentDeclareSomething()}
    </div>
  );
};

export const Buying = (props: BuyingProps): AccordionData[] => {
  return [
    {
      id: '3',
      question: 'Avez-vous fait des achats ?',
      iconName: 'basketColor',
      answer: <ContentBuying {...props} />,
    },
  ];
};
