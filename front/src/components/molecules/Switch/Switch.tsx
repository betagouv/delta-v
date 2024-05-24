import React, { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';

import clsxm from '@/utils/clsxm';

export interface SwitchProps {
  leftLabel: string;
  rightLabel: string;
  onLeftToggle?: () => void;
  onRightToggle?: () => void;
  active?: 'left' | 'right';
}

export const Switch = ({
  leftLabel,
  rightLabel,
  onLeftToggle,
  onRightToggle,
  active = 'left',
}: SwitchProps) => {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(0);
  const [rightWidth, setRightWidth] = useState(0);

  useEffect(() => {
    if (leftRef.current) {
      setLeftWidth(leftRef.current.offsetWidth + 20);
    }
    if (rightRef.current) {
      setRightWidth(rightRef.current.offsetWidth + 20);
    }
  }, [leftLabel, rightLabel]);

  return (
    <div className="relative w-fit">
      <div className="border border-secondary-300 flex flex-row justify-around rounded-full px-[14px] py-[8px] text-center gap-5 h-[42px]">
        <div
          ref={leftRef}
          className={clsxm({
            'z-10 text-base md:text-xs cursor-pointer flex items-center': true,
            'text-white': active === 'left',
            'text-disabled-text': active === 'right',
          })}
          onClick={onLeftToggle}
        >
          {leftLabel}
        </div>
        <div
          ref={rightRef}
          className={clsxm({
            'z-10 text-base md:text-xs cursor-pointer flex items-center': true,
            'text-white': active === 'right',
            'text-disabled-text': active === 'left',
          })}
          onClick={onRightToggle}
        >
          {rightLabel}
        </div>
      </div>
      <motion.div
        className="absolute bg-primary-600 h-[34px] rounded-full top-1"
        animate={{
          right: active === 'right' ? '4px' : 'unset',
          left: active === 'left' ? '4px' : 'unset',
          width: active === 'right' ? rightWidth : leftWidth,
        }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};
