import { Typography } from '@/components/common/Typography';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { DetailedProduct } from '@/stores/simulator/appState.store';

export interface ITaxTableProps {
  declarationResponse: DeclarationResponse;
  loading?: boolean;
}

export const TaxTable: React.FC<ITaxTableProps> = ({ declarationResponse, loading }) => {
  const renderLine = (detailedProduct: DetailedProduct) => {
    return (
      <>
        <div className="p-5 border border-secondary-100 bg-white rounded-xl flex flex-col justify-start gap-2">
          <Typography color="black" size="text-xs" weight="bold">
            {detailedProduct.name.replace('.', '')}
          </Typography>
          <Typography color="black" size="text-xs">
            {detailedProduct.customId}
          </Typography>
          <div className="flex flex-row justify-between w-3/6">
            <Typography color="black" size="text-xs">
              Prix d'achat
            </Typography>
            <Typography color="black" size="text-xs">
              {detailedProduct.unitPrice} €
            </Typography>
          </div>
          <div className="te flex flex-row justify-between w-full">
            <Typography size="text-xs" weight="bold">
              Taxes dues
            </Typography>
            <Typography size="text-xs" weight="bold">
              {detailedProduct.unitTaxes} €
            </Typography>
          </div>
        </div>
      </>
    );
  };

  return !loading ? (
    <div className="flex flex-col px-4 gap-4">
      <Typography size="text-base" weight="bold" color="black">
        Marchandises
      </Typography>
      <div>
        {declarationResponse.products.map((detailedProduct) => renderLine(detailedProduct))}
        <div className="flex flex-row justify-between p-5">
          <Typography size="text-base" weight="bold">
            TOTAL
          </Typography>
          <Typography size="text-base" weight="bold">
            {`${declarationResponse.totalTaxesAmount}e`}
          </Typography>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
