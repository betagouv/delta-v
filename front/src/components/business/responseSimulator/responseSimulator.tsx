import React from 'react';

interface Product {
  name: string;
  amount: number;
  unitPrice: number;
  totalPrice: number;
  totalCustomDuty: number;
  totalVat: number;
  customDuty: number;
  vat: number;
}

export interface ResponseData {
  products?: Product[];
  total: number;
  totalCustomDuty: number;
  totalVat: number;
}

interface ResponseSimulatorProps {
  response?: ResponseData;
}

export const ResponseSimulator: React.FC<ResponseSimulatorProps> = ({ response }) => {
  return (
    <>
      {response && (
        <div>
          <div>-----------------------------------</div>
          {response.products && response.products.length >= 0 && (
            <div>
              <div className="text-xl">Liste des produits</div>
              <div>-----------------------------------</div>
            </div>
          )}
          {response.products &&
            response.products.map((product, index) => (
              <div key={index}>
                <div className="text-base font-bold">{product.name}</div>
                <div className="text-base">Nombre : {product.amount}</div>
                <div className="text-base">Prix unitaire : {product.unitPrice}€</div>
                <div className="text-base">Prix total : {product.totalPrice}€</div>
                <div className="text-base">Prix TVA : {product.totalVat}€</div>
                <div className="text-base">Prix droit de douane : {product.totalCustomDuty}€</div>
                {response.products && response.products.length > index + 1 && <div>------</div>}
              </div>
            ))}
          <div>-----------------------------------</div>
          <div>Total des achats : {response.total}€</div>
          <div>Total droit de douane : {response.totalCustomDuty}€</div>
          <div>Total TVA : {response.totalVat}€</div>
        </div>
      )}
    </>
  );
};
