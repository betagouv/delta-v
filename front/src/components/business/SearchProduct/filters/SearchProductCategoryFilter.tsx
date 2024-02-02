import { Icon } from '@/components/common/Icon';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Typography } from '@/components/common/Typography';
import clsxm from '@/utils/clsxm';

interface CategoryFilterButtonProps {
  onClick?: () => void;
  open?: boolean;
}

export const SearchProductCategoryFilter = ({ onClick, open }: CategoryFilterButtonProps) => {
  // const [isOpen, setIsOpen] = useState<boolean>(open ?? false);

  const handleOnClick = () => {
    // if (onClick) {
    //   setIsOpen(!isOpen);
    //   onClick(isOpen);
    // }
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
