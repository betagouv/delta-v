import React from 'react';

interface HeaderProps {
  leftButtons: React.ReactNode;
  rightButtons: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ leftButtons, rightButtons }: HeaderProps) => {
  return (
    <>
      <div className="flex flex-row">
        {leftButtons}
        <div className="flex-1" />
        {rightButtons}
      </div>
    </>
  );
};
