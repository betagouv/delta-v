import { useState } from 'react';

import { CartProductCard, CartProductCardProps } from './CartProductCard';

export interface CartProductCardsProps {
  items: CartProductCardProps[];
}

export const CartProductCards: React.FC<CartProductCardsProps> = ({
  items,
}: CartProductCardsProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const handleCheckedChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
    } else {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((selectedId) => selectedId !== id),
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => (
        <CartProductCard
          key={item.product.customName}
          {...item}
          isChecked={selectedIds.includes(item.product.customId)}
          onCheckedChange={handleCheckedChange}
        />
      ))}
    </div>
  );
};
