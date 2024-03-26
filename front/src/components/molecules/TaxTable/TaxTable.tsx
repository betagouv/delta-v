import { TaxItem } from './TaxItem';
import { Typography } from '@/components/atoms/Typography';
import { DeclarationResponse } from '@/stores/declaration/appState.store';

export interface ITaxTableProps {
  declarationResponse: DeclarationResponse;
  loading?: boolean;
  noDetails?: boolean;
}

export const TaxTable: React.FC<ITaxTableProps> = ({ declarationResponse, loading, noDetails }) => {
  return !loading ? (
    <div className="flex bg-secondary-bg flex-col px-4 py-7 gap-4 md:px-10">
      <Typography size="text-base" weight="bold" color="black">
        Marchandises
      </Typography>
      <div>
        <div className="flex flex-col gap-5 md:gap-[10px]">
          {declarationResponse.products.map((detailedProduct) => (
            <TaxItem
              detailedProduct={detailedProduct}
              withCalculation={declarationResponse.canCalculateTaxes}
              noDetails={noDetails}
            />
          ))}
        </div>
        <div className="flex flex-row justify-between p-5">
          <Typography size="text-base" weight="bold">
            TOTAL
          </Typography>
          <Typography size="text-base" weight="bold">
            {declarationResponse.canCalculateTaxes
              ? `${declarationResponse.totalTaxesAmount}€`
              : 'Non renseignées'}
          </Typography>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
