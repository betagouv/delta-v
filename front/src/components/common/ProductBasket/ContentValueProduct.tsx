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
}

export const ContentValueProduct: React.FC<ContentValueProductProps> = ({
  detailedCalculation: { customDuty, vat, unitCustomDuty, unitPrice, unitVat },
}: ContentValueProductProps) => {
  return (
    <>
      <div className="mt-2">
        <Typography color="primary" size="text-base">
          Calcul de la TVA
        </Typography>
      </div>
      <div className="flex flex-row">
        <Typography color="primary" size="text-base">
          {unitPrice}
        </Typography>
        <div className="ml-1">
          <Typography color="secondary" size="text-base">
            x {vat}% =
          </Typography>
        </div>
        <div className="ml-1">
          <Typography color="primary" size="text-base">
            {unitVat} €
          </Typography>
        </div>
      </div>
      <div className="mt-2">
        <Typography color="primary" size="text-base">
          Calcul des droits de douanes
        </Typography>
      </div>
      <div className="flex flex-row">
        <Typography color="primary" size="text-base">
          {unitPrice}
        </Typography>
        <div className="ml-1">
          <Typography color="secondary" size="text-base">
            x {customDuty}% =
          </Typography>
        </div>
        <div className="ml-1">
          <Typography color="primary" size="text-base">
            {unitCustomDuty} €
          </Typography>
        </div>
      </div>
    </>
  );
};
