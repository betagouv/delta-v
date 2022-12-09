import classNames from 'classnames';

import { Typography } from '../Typography';

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
        <Typography color="primary" size={displaySmall ? 'text-sm' : 'text-base'}>
          Calcul des droits de douane
        </Typography>
      </div>
      <p
        className={classNames({
          'w-full text-primary-700': true,
          'text-base': !displaySmall,
          'text-sm': displaySmall,
        })}
      >
        {unitPrice} <span className="text-secondary-900">x {customDuty}% =</span> {unitCustomDuty} €
      </p>
      <div className="mt-2">
        <Typography color="primary" size={displaySmall ? 'text-sm' : 'text-base'}>
          Calcul de la TVA
        </Typography>
      </div>
      <p
        className={classNames({
          'w-full text-primary-700': true,
          'text-base': !displaySmall,
          'text-sm': displaySmall,
        })}
      >
        ({unitPrice} + {unitCustomDuty}) <span className="text-secondary-900">x {vat}% =</span>{' '}
        {unitVat} €
      </p>
    </>
  );
};
