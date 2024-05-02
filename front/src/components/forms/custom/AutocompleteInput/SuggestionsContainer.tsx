import React, { useEffect, useRef } from 'react';

import { Tooltip } from '@/components/atoms/Tooltip';
import clsxm from '@/utils/clsxm';

export type Suggestion = {
  label: string;
  value: string;
  disabled?: boolean;
  disabledTooltipMessage?: string;
};

type Props = {
  items: Suggestion[];
  onItemClick: (item: Suggestion) => void;
  onOutsideClick?: () => void;
  disableClickOnDisabledItem?: boolean;
};

export const SuggestionsContainer: React.FC<Props> = ({
  items,
  onItemClick,
  onOutsideClick,
  disableClickOnDisabledItem,
}: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        if (onOutsideClick) {
          onOutsideClick();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = (item: Suggestion) => {
    const disableClick = disableClickOnDisabledItem ? item.disabled : false;
    if (!disableClick) {
      onItemClick(item);
    }
  };

  return (
    <div
      className="z-10 flex flex-col absolute bg-white w-full gap-1 p-1 rounded-lg border-2"
      ref={containerRef}
    >
      {items.map((item) => {
        const disableClick = disableClickOnDisabledItem ? item.disabled : false;
        const renderedName =
          disableClick && item.disabledTooltipMessage ? (
            <Tooltip content={item.disabledTooltipMessage}>{item.label}</Tooltip>
          ) : (
            item.label
          );
        return (
          <div
            key={item.value}
            className={clsxm({
              'text-left hover:bg-slate-100 cursor-pointer': true,
              'cursor-not-allowed': disableClick,
              'text-slate-400': item.disabled,
            })}
            onClick={() => handleClick(item)}
          >
            {renderedName}
          </div>
        );
      })}
    </div>
  );
};
