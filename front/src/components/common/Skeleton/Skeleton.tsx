import React from 'react';

export interface ISkeletonProps {
  variant?: 'details' | 'card' | 'card-compact' | 'table' | 'page' | 'tile';
  height?: string;
  width?: string;
}

export const Skeleton: React.FC<ISkeletonProps> = ({
  variant = 'table',
  height,
  width,
}: ISkeletonProps) => {
  const skeletonTile = () => <div className="w-24 bg-gray-300 h-6 rounded-md " />;

  const skeletonDetails = () => (
    <div className="w-60 h-24 border-2 rounded-md mx-auto mt-20">
      <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
        <div className="w-12 bg-gray-300 h-12 rounded-full " />
        <div className="flex flex-col space-y-3">
          <div className="w-36 bg-gray-300 h-6 rounded-md " />
          <div className="w-24 bg-gray-300 h-6 rounded-md " />
        </div>
      </div>
    </div>
  );

  const skeletonTable = () => (
    <div className="w-full rounded-md" style={{ height, width }}>
      <div className="flex animate-pulse flex-row items-center h-full rounded-md">
        <div className="w-full bg-gray-300 h-full rounded-md" />
      </div>
    </div>
  );

  let element: JSX.Element;

  switch (variant) {
    case 'details':
      element = skeletonDetails();
      break;
    case 'tile':
      element = skeletonTile();
      break;
    default:
      element = skeletonTable();
      break;
  }

  return <div className="h-full rounded-md">{element}</div>;
};
