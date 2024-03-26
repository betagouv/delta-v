import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';

interface SubmitSearchButtonProps {
  onClick?: () => void;
}

export const SearchProductSubmitButton = ({ onClick }: SubmitSearchButtonProps) => {
  return (
    <button
      className="bg-primary-600 w-[134px] h-[34px] rounded-full flex items-center px-5 justify-between ml-5"
      onClick={onClick}
      type="button"
    >
      <Typography color="white" size="text-2xs" textPosition="text-left">
        Rechercher
      </Typography>
      <Icon name="search" color="white" size="sm" />
    </button>
  );
};
