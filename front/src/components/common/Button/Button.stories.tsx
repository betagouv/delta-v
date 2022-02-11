import { Meta } from '@storybook/react';
import React from 'react';

import { Button } from './Button';

export default {
  title: 'Components/Common/Button',
  component: Button,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div style={{ background: 'lightgrey' }}>
    <Button>Normal</Button>
    <br />
    <br />
    <Button color="secondary">Normal with color</Button>
    <br />
    <br />
    <Button icon="menu">Normal with icon</Button>
    <br />
    <br />
    <Button icon="menu" iconPosition="left">
      Normal with left icon
    </Button>
    <br />
    <br />
    <Button disabled icon="menu">
      Normal disabled
    </Button>
    <br />
    <br />
    <Button loading icon="menu">
      Normal loading
    </Button>
    <br />
    <br />
    <Button variant="outlined">Outlined</Button>
    <br />
    <br />
    <Button variant="outlined" color="secondary">
      Outlined with color
    </Button>
    <br />
    <br />
    <Button variant="outlined" icon="menu">
      Outlined with icon
    </Button>
    <br />
    <br />
    <Button variant="outlined" icon="menu" disabled>
      Outlined disabled
    </Button>
    <br />
    <br />
    <Button variant="ghost">Ghost</Button>
    <br />
    <br />
    <Button variant="ghost" color="secondary">
      Ghost with color
    </Button>
    <br />
    <br />
    <Button variant="ghost" icon="menu">
      Ghost with icon
    </Button>
    <br />
    <br />
    <Button variant="ghost" icon="menu" disabled>
      Ghost with icon
    </Button>
  </div>
);

export const withDifferentSize = (): JSX.Element => (
  <div style={{ background: 'lightgrey' }}>
    <Button size="xs" icon="mail">
      Button xs
    </Button>
    <br />
    <br />
    <Button size="sm" icon="mail">
      Button sm
    </Button>
    <br />
    <br />
    <Button size="base" icon="mail">
      Button base
    </Button>
    <br />
    <br />
    <Button size="lg" icon="mail">
      Button lg
    </Button>
    <br />
    <br />
    <Button size="xl" icon="mail">
      Button xl
    </Button>
    <br />
    <br />
  </div>
);
