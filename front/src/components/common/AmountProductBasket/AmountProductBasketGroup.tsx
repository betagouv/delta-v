import { Icon } from '../Icon';
import { Typography } from '../Typography';
import { AmountProductBasket } from './AmountProductBasket';
import { getAmountCategoryName, getMessageOverMaximumAmount } from '@/model/amount';
import { GroupedAmountProduct } from '@/stores/simulator/appState.store';

interface AmountProductBasketGroupProps {
  amountProductGroup: GroupedAmountProduct;
}

// const [productType, setProductType] = useState<
//   'alcohol' | 'tobacco' | 'valueProduct' | undefined
// >();
// const [openModal, setOpenModal] = useState<boolean>(false);
// const openModalProductType = (amountProduct?: AmountProduct) => {
//   setProductType(amountProduct ? getAmountProductType(amountProduct) : 'valueProduct');

//   setTimeout(() => {
//     setOpenModal(true);
//   }, 150);
// };

export const AmountProductBasketGroup: React.FC<AmountProductBasketGroupProps> = ({
  amountProductGroup,
}) => {
  console.log(amountProductGroup);

  return (
    <div className="flex flex-col gap-3">
      <div className="mt-2">
        <Typography color="light-gray">
          {getAmountCategoryName(amountProductGroup.group)}
        </Typography>
      </div>
      {amountProductGroup.products.map((product) => (
        <AmountProductBasket
          key={product.id}
          containError={amountProductGroup.isOverMaximum}
          product={product}
        />
      ))}
      {amountProductGroup.isOverMaximum && (
        <div className="flex flex-row gap-1 text-error">
          <div className="h-4 w-4">
            <Icon name="error" />
          </div>
          <p className="flex-1 text-xs">
            Vous dépassez la limite légale d'unités{' '}
            {getMessageOverMaximumAmount(amountProductGroup.group)}. Pour connaître les quantités
            maximales autorisées{' '}
            {/* <span
              className="text-link"
              onClick={() => {
                openModalProductType(
                  amountProductGroup.products[0]
                    ? amountProductGroup.products[0].amountProduct
                    : undefined,
                );
              }}
            >
              cliquez ici
            </span> */}
          </p>
        </div>
      )}
    </div>
  );
};
