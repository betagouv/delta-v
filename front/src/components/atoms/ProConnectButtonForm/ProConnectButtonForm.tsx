import React, { useState } from 'react';

import { useForm } from 'react-hook-form';

import { Icon } from '../Icon';
import { Link } from '../Link';
import { Typography } from '../Typography';

export interface ProConnectButtonFormProps {
  onSubmit: () => void;
}

export const ProConnectButtonForm: React.FC<ProConnectButtonFormProps> = ({ onSubmit }) => {
  const { handleSubmit } = useForm();

  const [showFormError, setShowFormError] = useState(false);

  const onFormChange = () => {
    if (showFormError) {
      setShowFormError(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full justify-center items-center"
      onChange={onFormChange}
    >
      <div>
        <button className="proconnect-button" type="submit">
          <span className="proconnect-sr-only">S'identifier avec ProConnect</span>
        </button>
      </div>
      <Link href="https://www.proconnect.gouv.fr/" external={true}>
        <div className="flex flex-row w-full justify-center items-center">
          <Typography underline>
            Qu’est-ce que ProConnect ? <Icon name="external" size="base" />
          </Typography>
        </div>
      </Link>
    </form>
  );
};
