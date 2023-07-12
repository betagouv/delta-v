import { useState } from 'react';

import { useForm } from 'react-hook-form';

import { DataElement } from '..';
import { ExternalLink } from '@/components/common/ExternalLink';
import { Typography } from '@/components/common/Typography';
import { Radio } from '@/components/input/StandardInputs/Radio';

export interface FormData {
  moreThan10k?: boolean;
}

interface EventChangeRadio {
  type: string;
  target: {
    name: string;
    value?: 'true' | 'false';
  };
}

const ContentMoney: React.FC = () => {
  const [moreThan10k, setMoreThan10k] = useState<boolean | undefined>(undefined);

  const { register } = useForm<FormData>({
    defaultValues: {
      moreThan10k: undefined,
    },
  });

  register('moreThan10k', {
    onChange: ({ type, target: { name, value } }: EventChangeRadio) => {
      const notResetSteps = !name || type !== 'change';
      if (notResetSteps) {
        return;
      }
      setMoreThan10k(value === 'true');
    },
  });

  return (
    <div className="mt-4 flex w-full flex-col items-center gap-4">
      <div className="mb-2 flex flex-col items-center gap-4">
        <Typography weight="bold" color="secondary" size="text-base">
          Pour un total de plus de 10 000 € ?
        </Typography>
        <Radio
          name="moreThan10k"
          register={register('moreThan10k')}
          radioValues={[
            { id: 'true', value: 'Oui' },
            { id: 'false', value: 'Non' },
          ]}
        />
      </div>
      {moreThan10k === false && <p>Vous n’avez rien à déclarer !</p>}
      {moreThan10k === true && (
        <>
          <div>
            Vous pouvez d’ores et déjà déclarer vos sommes et liquidités sur{' '}
            <ExternalLink href="https://www.douane.gouv.fr/dalia/Dalia.jsp" tag="span">
              <span className="text-link underline">Dalia</span>
            </ExternalLink>
            .
          </div>

          <p>
            Cette obligation de déclaration concerne toute forme de capitaux et quelle que soit
            votre nationalité ainsi que le motif ou la destination de votre voyage.
          </p>
          <p>
            Le seuil de 10 000 € s’applique également aux personnes entre lesquelles il existe une
            communauté d’intérêt (couples, familles…) dès lors que le total des fonds transportés
            par ces personnes dépasse le seuil de 10 000 €.
          </p>
        </>
      )}
    </div>
  );
};

export const Money: DataElement[] = [
  {
    id: '6',
    question: "Transportez-vous de l'argent en espèce ? ",
    iconName: 'money',
    answer: <ContentMoney />,
  },
];
