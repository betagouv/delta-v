import React from 'react';

import { Meta } from '@storybook/react';

import { Button } from '../Button';
import { Tooltip } from './Tooltip';

export default {
  title: 'Components/Atoms/Tooltip',
  component: Tooltip,
} as Meta;

export const Primary = (): JSX.Element => (
  <>
    <Tooltip content="Tooltip classique">
      <div>Survol moi</div>
    </Tooltip>
    <Tooltip
      side="left"
      content={
        <div className="flex flex-col gap-2">
          <p>On peut tout ajouter ici !</p>
          <Button>Confirmer</Button>
        </div>
      }
    >
      <span>A gauche avec contenu</span>
    </Tooltip>
    <Tooltip content="Tooltip text" side="bottom">
      <span>En bas avec texte</span>
    </Tooltip>
  </>
);
