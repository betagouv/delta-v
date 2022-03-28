import React from 'react';

import { Icon } from './Icon';
import { getAllAvailableIcons } from './selection.utils';

export default { title: 'Resources/Icons' };

const IconBlock = ({ name }: { name: string }) => (
  <div
    style={{
      float: 'left',
      width: '50px',
      height: '100px',
      textAlign: 'center',
      margin: '0px 20px',
    }}
  >
    <Icon name={name} color="black" />
    <p>{name}</p>
  </div>
);

const IconDocumentation = () => {
  const availableIcons = getAllAvailableIcons();

  return (
    <div style={{ padding: '40px' }}>
      {availableIcons.map((name: string) => (
        <IconBlock key={name} name={name} />
      ))}
    </div>
  );
};

export const base = (): JSX.Element => <IconDocumentation />;
