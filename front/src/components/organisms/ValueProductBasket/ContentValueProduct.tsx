import classNames from 'classnames';

import { Typography } from '../../atoms/Typography';

interface DetailedCalculation {
  unitPrice: number;
  vat: number;
  unitVat: number;
  customDuty: number;
  unitCustomDuty: number;
}

interface ContentValueProductProps {
  detailedCalculation: DetailedCalculation;
  displaySmall?: boolean;
}

export const ContentValueProduct: React.FC<ContentValueProductProps> = ({
  detailedCalculation: { customDuty, vat, unitCustomDuty, unitPrice, unitVat },
  displaySmall = false,
}: ContentValueProductProps) => {
  return (
    <>
      <div className="mt-2">
        <Typography weight="bold" color="black" size={displaySmall ? 'text-xs' : 'text-sm'}>
          Calcul des droits de douane
        </Typography>
      </div>
      <p
        className={classNames({
          'w-full text-black': true,
          'text-sm': !displaySmall,
          'text-xs': displaySmall,
        })}
      >
        {unitPrice} <span className="text-secondary-900">x {customDuty}% =</span> {unitCustomDuty} €
      </p>
      <div className="mt-2">
        <Typography weight="bold" color="black" size={displaySmall ? 'text-xs' : 'text-sm'}>
          Calcul de la TVA
        </Typography>
      </div>
      <p
        className={classNames({
          'w-full text-black': true,
          'text-sm': !displaySmall,
          'text-xs': displaySmall,
        })}
      >
        ({unitPrice} + {unitCustomDuty}) <span className="text-secondary-900">x {vat}% =</span>{' '}
        {unitVat} €
      </p>
    </>
  );
};
