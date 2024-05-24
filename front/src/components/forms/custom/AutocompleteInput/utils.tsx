import { Tooltip } from '@/components/atoms/Tooltip';
import { Typography } from '@/components/atoms/Typography';
import clsxm from '@/utils/clsxm';

export type Suggestion = {
  label: string;
  value: string;
  tags: string[];
  disabled?: boolean;
  disabledTooltipMessage?: string;
};

export const findStringsStartingWithSearchStrings = (
  searchStrings: string[],
  strings: string[],
) => {
  return searchStrings.some((searchStringPart) => {
    return strings.some((stringPart) => stringPart.startsWith(searchStringPart));
  });
};

export const getMatchingResult = (searchValue: string, options: Suggestion[]) => {
  const searchValueParts = searchValue.split(/[ -]/).filter((part) => part.trim() !== '');
  const flattenedSearchValueParts = searchValueParts.flatMap((part) => part.toLowerCase());

  return options.filter((option) => {
    const labelParts = option.label.split(' ').filter((part) => part.trim() !== '');
    const flattenedLabelParts = labelParts.flatMap((part) => part.toLowerCase());
    const flattenedTagsParts = option.tags.flatMap((part) => part.toLowerCase());

    return findStringsStartingWithSearchStrings(flattenedSearchValueParts, [
      ...flattenedLabelParts,
      ...flattenedTagsParts,
    ]);
  });
};

export const getRenderedOption = ({
  item,
  disableClick,
  onOptionClick,
  helperText,
}: {
  item: Suggestion;
  disableClick: boolean;
  onOptionClick: (item: Suggestion) => void;
  helperText?: string;
}) => {
  const labelString = (
    <div className="hover:text-[#6A6AF4] text-sm md:text-xs h-full w-full flex items-center gap-2.5">
      {item.label}
      {helperText && (
        <Typography color="placeholder" size="text-xs" desktopSize="text-xs" italic>
          {helperText}
        </Typography>
      )}
    </div>
  );
  let label;
  if (disableClick && item.disabledTooltipMessage) {
    label = <Tooltip content={item.disabledTooltipMessage}>{labelString}</Tooltip>;
  } else {
    label = labelString;
  }
  return (
    <div
      className={clsxm({
        'text-left hover:bg-[#6a6af40D] cursor-pointer flex items-center h-10 pl-4': true,
        'cursor-not-allowed': disableClick,
        'text-slate-400': item.disabled,
      })}
      onClick={() => onOptionClick(item)}
    >
      {label}
    </div>
  );
};

export const checkDisableClick = (item: Suggestion, disableClickOnDisabledItem: boolean) => {
  if (disableClickOnDisabledItem) {
    return !!item.disabled;
  }
  return false;
};
