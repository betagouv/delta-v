import { Icon } from '@/components/atoms/Icon';
import { Typography } from '@/components/atoms/Typography';

export interface SelectCountryButtonProps {
  onClick: () => void;
  countryLabel?: string;
  isDefaultCountry?: boolean;
}

export const SelectCountryButton: React.FC<SelectCountryButtonProps> = ({
  onClick,
  countryLabel,
  isDefaultCountry,
}) => {
  return (
    <div className="flex flex-row gap-[10px] items-center cursor-pointer" onClick={onClick}>
      <Typography color="black" size="text-xs" weight="bold" desktopSize="text-sm">
        {countryLabel ?? 'Sélectionner le pays de provenance'}
      </Typography>
      {countryLabel && isDefaultCountry && (
        <Typography color="placeholder" size="text-xs" desktopSize="text-sm" italic>
          Par défaut
        </Typography>
      )}
      <Icon name="chevron-down" size="base" />
    </div>
  );
};
