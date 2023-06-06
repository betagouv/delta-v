import { Table } from '@/components/common/Table';
import { Typography } from '@/components/common/Typography';
import { DeclarationResponse } from '@/stores/declaration/appState.store';
import { DetailedProduct } from '@/stores/simulator/appState.store';

export interface ITaxTableProps {
  declarationResponse: DeclarationResponse;
  loading?: boolean;
}

export const TaxTable: React.FC<ITaxTableProps> = ({ declarationResponse, loading }) => {
  const headers = [
    {
      title: 'Achats',
    },
    {
      title: '',
    },
    {
      title: 'Droits et taxes',
    },
  ];

  const renderLine = (detailedProduct: DetailedProduct) => {
    return (
      <>
        <td className="py-small">
          <div className="flex flex-row items-center gap-1">
            <Typography color="black" size="text-sm">
              {detailedProduct.customId}
            </Typography>
            <Typography color="black" size="text-sm">
              {detailedProduct.id}
            </Typography>
          </div>
        </td>
        <td className="py-small">
          <div className="flex flex-col justify-center px-3">
            <Typography color="black" size="text-sm">
              {detailedProduct.name}
            </Typography>
            <Typography color="black" size="text-sm">
              {detailedProduct.customName}
            </Typography>
            <Typography color="black" size="text-sm">{`${detailedProduct.unitPrice}e`}</Typography>
          </div>
        </td>
        <td className="py-small">
          <div className="flex flex-col">
            <Typography
              color="black"
              size="text-lg"
              textPosition="text-right"
            >{`${detailedProduct.unitTaxes}e`}</Typography>
          </div>
        </td>
      </>
    );
  };

  return (
    <>
      {!loading ? (
        <div>
          <Table
            headers={headers}
            data={declarationResponse.products ?? []}
            render={(item: DetailedProduct) => renderLine(item)}
          />
          <div className="flex justify-end">
            <div className="flex flex-col">
              <Typography color="black" size="text-sm" textPosition="text-right">
                TOTAL
              </Typography>
              <Typography color="black" size="text-lg" textPosition="text-right">
                {`${declarationResponse.totalTaxesAmount}e`}
              </Typography>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
