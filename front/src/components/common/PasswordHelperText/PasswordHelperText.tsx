import React from 'react';

import cs from 'classnames';

export interface PasswordRequirements {
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
  length: boolean;
}

export const checkPasswordRequirements = (password: string): PasswordRequirements => {
  return {
    length: password?.length > 7,
    special: /[@$!%*#?&]+/.test(password),
    lowercase: /[a-z]+/.test(password),
    uppercase: /[A-Z]+/.test(password),
    number: /\d+/.test(password),
  };
};

export const PasswordHelperText: React.FC<{ password: string }> = ({ password }) => {
  const passwordRequirements = checkPasswordRequirements(password);
  return (
    <>
      <span className={cs({ 'text-success': passwordRequirements.uppercase })}>1 majuscule, </span>
      <span className={cs({ 'text-success': passwordRequirements.lowercase })}>1 minuscule, </span>
      <span className={cs({ 'text-success': passwordRequirements.number })}>1 chiffre, </span>
      <span className={cs({ 'text-success': passwordRequirements.special })}>
        1 caractère spécial,{' '}
      </span>
      <span className={cs({ 'text-success': passwordRequirements.length })}>
        8 caractères minimum
      </span>
    </>
  );
};
