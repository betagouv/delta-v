import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';
import { SvgIcon } from '@/components/molecules/SvgIcon';
import clsxm from '@/utils/clsxm';

interface CategoryFilterButtonProps {
  onClick?: () => void;
  open?: boolean;
}

export const SearchProductCategoryFilter = ({ onClick, open }: CategoryFilterButtonProps) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <div
      className={clsxm({
        'h-full flex items-center px-5 rounded-full bg-white gap-11': true,
        'cursor-pointer': onClick,
      })}
      onClick={handleOnClick}
    >
      <div className="flex items-center gap-[10px]">
        <SvgIcon name="filter" className="h-3 w-3" />
        <Typography color="black" weight="bold" size="text-2xs">
          Filtrer par catégories
        </Typography>
      </div>
      <span
        className={clsxm({
          'rotate-180 transition-all': open,
          'rotate-0 transition-all': !open,
        })}
      >
        <Icon name="chevron-down" size="sm" />
      </span>
    </div>
  );
};
