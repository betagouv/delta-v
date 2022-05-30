import React from 'react';

interface ProgressBarProps {
  progression: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progression }: ProgressBarProps) => {
  return (
    <div className="w-full">
      <div className="h-1.5 bg-[#6A6AF4]" style={{ width: `${progression}%` }}></div>
    </div>
  );
};
