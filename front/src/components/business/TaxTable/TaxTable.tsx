import { Typography } from '@/components/common/Typography';
import { getUnit } from '@/model/amount';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { DetailedProduct } from '@/stores/simulator/appState.store';
import { useStore } from '@/stores/store';

export interface ITaxTableProps {
  declarationResponse: DeclarationResponse;
  loading?: boolean;
}

export const TaxTable: React.FC<ITaxTableProps> = ({ declarationResponse, loading }) => {
  const { findProduct } = useStore((state) => ({
    findProduct: state.findProduct,
  }));
  const renderLine = (detailedProduct: DetailedProduct) => {
    return (
      <div
        className="p-5 border border-secondary-100 bg-white rounded-xl flex flex-col justify-start gap-2"
        key={detailedProduct.id}
      >
        <Typography color="black" size="text-xs" weight="bold">
          {detailedProduct.customName}
        </Typography>
        {detailedProduct.name !== detailedProduct.customName && (
          <Typography color="black" size="text-xs">
            {detailedProduct.name}
          </Typography>
        )}
        <div className="flex flex-row justify-between w-3/6">
          <Typography color="black" size="text-xs">
            {detailedProduct.originalCurrency ? "Prix d'achat" : 'Quantité'}
          </Typography>
          <Typography color="black" size="text-xs">
            {detailedProduct.unitPrice}{' '}
            {detailedProduct.originalCurrency
              ? '€'
              : getUnit(findProduct(detailedProduct.id)?.amountProduct)}
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
    );
  };

  return !loading ? (
    <div className="flex flex-col px-4 gap-4">
      <Typography size="text-base" weight="bold" color="black">
        Marchandises
      </Typography>
      <div>
        <div className="flex flex-col gap-4">
          {declarationResponse.products.map((detailedProduct) => renderLine(detailedProduct))}
        </div>
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
