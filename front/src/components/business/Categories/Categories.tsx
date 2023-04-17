import { useForm } from 'react-hook-form';

import { SvgNames } from '@/components/common/SvgIcon';
import { RadioCard } from '@/components/input/StandardInputs/RadioCard';

interface CategoryCard {
  name: string;
  icon: SvgNames;
}

export type CategoriesProps = {
  title: string;
  categories: CategoryCard[];
};

export const Categories = ({ title, categories }: CategoriesProps) => {
  const getCategoryCards = categories.map((category) => ({
    id: category.name,
    value: category.name,
    svgIcon: category.icon,
  }));
  const { control } = useForm();
  return (
    <div className="grid grid-rows-[20px_1fr]">
      <span>{title}</span>
      <RadioCard
        name="category"
        control={control}
        rules={{ required: true }}
        radioCardValues={getCategoryCards}
      />
    </div>
  );
};
