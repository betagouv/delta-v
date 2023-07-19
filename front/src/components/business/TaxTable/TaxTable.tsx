import { TaxItem } from './TaxItem';
import { Typography } from '@/components/common/Typography';
import { DeclarationResponse } from '@/stores/declaration/appState.store';

export interface ITaxTableProps {
  declarationResponse: DeclarationResponse;
  loading?: boolean;
}

export const TaxTable: React.FC<ITaxTableProps> = ({ declarationResponse, loading }) => {
  return !loading ? (
    <div className="flex flex-col px-4 gap-4">
      <Typography size="text-base" weight="bold" color="black">
        Marchandises
      </Typography>
      <div>
        <div className="flex flex-col gap-4">
          {declarationResponse.products.map((detailedProduct) => (
            <TaxItem
              detailedProduct={detailedProduct}
              withCalculation={declarationResponse.canCalculateTaxes}
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
