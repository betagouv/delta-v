import React from 'react';

import { ClipboardCopyIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';

export interface Product {
  id: string;
  name: string;
  info: string;
  childrenQuestion: string | null;
  nomenclatures: string[] | null;
  customDuty: number | null;
  vat: number | null;
  subProducts: Product[];
}

interface ProductTreeProps {
  product: Product;
}

export const ProductTree: React.FC<ProductTreeProps> = ({ product }) => {
  const isClicable = product.customDuty !== null && product.vat !== null;
  const onClick = () => {
    if (!isClicable) {
      return;
    }

    navigator.clipboard.writeText(product.id);
    toast.info(`L'Id du produit à été copié dans le presse papier`, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: 'colored',
    });
  };
  return (
    <>
      <div
        className={`text-xl inline-flex ${isClicable ? 'cursor-pointer text-blue-600' : ''}`}
        onClick={onClick}
      >
        {' '}
        {isClicable ? ' ➜ ' : ' • '}
        {product.name} {isClicable ? <ClipboardCopyIcon className="mt-1 h-5 w-5" /> : ''}
      </div>
      {product.subProducts.map((subProduct) => (
        <div className="ml-5" key={subProduct.id}>
          <ProductTree product={subProduct} />
        </div>
      ))}
    </>
  );
};
