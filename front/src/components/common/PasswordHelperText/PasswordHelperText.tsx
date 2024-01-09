import React, { useEffect, useState } from 'react';

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

const RuleContainer: React.FC<{ successRule: boolean; children: string }> = ({
  successRule,
  children,
}) => {
  return (
    <span
      className={cs({
        'text-success': successRule,
      })}
    >
      {children}
    </span>
  );
};

export const PasswordHelperText: React.FC<{ password: string }> = ({ password }) => {
  const [passwordRequirements, setPasswordRequirements] = useState<PasswordRequirements>({
    length: false,
    special: false,
    lowercase: false,
    uppercase: false,
    number: false,
  });

  useEffect(() => {
    setPasswordRequirements(checkPasswordRequirements(password));
  }, [password]);

  return (
    <div className="flex flex-wrap gap-x-[2px] [&>*]:whitespace-nowrap">
      <RuleContainer successRule={passwordRequirements.uppercase}>1 majuscule,</RuleContainer>
      <RuleContainer successRule={passwordRequirements.lowercase}>1 minuscule,</RuleContainer>
      <RuleContainer successRule={passwordRequirements.number}>1 chiffre,</RuleContainer>
      <RuleContainer successRule={passwordRequirements.special}>1 caractère spécial,</RuleContainer>
      <RuleContainer successRule={passwordRequirements.length}>8 caractères minimum</RuleContainer>
    </div>
  );
};
