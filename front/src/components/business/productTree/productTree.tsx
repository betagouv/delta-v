import React from 'react';

import { PlusCircleIcon } from '@heroicons/react/solid';

import { Product } from '@/stores/product.store';

interface ProductTreeProps {
  product: Product;
  onAddProduct: (product: Product) => void;
}

export const ProductTree: React.FC<ProductTreeProps> = ({ product, onAddProduct }) => {
  const isClickable = product.customDuty !== null && product.vat !== null;
  const onClick = () => {
    if (!isClickable) {
      return;
    }

    onAddProduct(product);
  };
  return (
    <>
      <div
        className={`text-xl inline-flex ${isClickable ? 'cursor-pointer text-blue-600' : ''}`}
        onClick={onClick}
      >
        {' '}
        {isClickable ? ' ➜ ' : ' • '}
        {product.name} {isClickable ? <PlusCircleIcon className="ml-1 mt-1 h-5 w-5" /> : ''}
      </div>
      {product.subProducts.map((subProduct) => (
        <div className="ml-5" key={subProduct.id}>
          <ProductTree product={subProduct} onAddProduct={onAddProduct} />
        </div>
      ))}
    </>
  );
};
