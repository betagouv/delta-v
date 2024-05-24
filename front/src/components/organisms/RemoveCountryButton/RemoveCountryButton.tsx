import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';

export interface RemoveCountryButtonProps {
  onClick: () => void;
  countryLabel: string;
  isDefaultCountry?: boolean;
}

export const RemoveCountryButton: React.FC<RemoveCountryButtonProps> = ({
  onClick,
  countryLabel,
  isDefaultCountry,
}) => {
  return (
    <div
      className="p-[10px] flex flex-row gap-[10px] items-center cursor-pointer border rounded-md w-fit bg-white"
      onClick={onClick}
    >
      <div className="flex pr-1">
        <Icon name="cross-thin" size="sm" />
      </div>
      <Typography color="black" size="text-xs" desktopSize="text-xs">
        {countryLabel}
      </Typography>
      {isDefaultCountry && (
        <Typography color="placeholder" size="text-2xs" desktopSize="md:text-[8px]" italic>
          Par défaut
        </Typography>
      )}
    </div>
  );
};
