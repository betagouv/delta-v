import React, { useEffect, useState } from 'react';

interface ProgressBarProps {
  from?: number;
  to: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ from, to }: ProgressBarProps) => {
  const [value, setValue] = useState(from ?? to);

  useEffect(() => {
    setValue(to);
  }, []);

  return (
    <div className="w-full">
      <div className="h-1.5 w-full bg-gray-100" />
      <div
        className="z-10 mt-[-6px] h-1.5 bg-[#6A6AF4] transition-[width] delay-150 duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
