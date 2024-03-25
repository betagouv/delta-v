import { Meta } from '@storybook/react';

import { Card } from './Card';

export default {
  title: 'Components/Common/Card',
  component: Card,
} as Meta;

export const withVariant = (): JSX.Element => (
  <div className="p-3">
    <p>Basic card horizontal :</p>
    <br />
    <Card
      title="Préparer mon voyage"
      description="Les documents à prévoir avant votre voyage, les conseils..."
      svgName="luggages"
      fullWidth={true}
    />
    <br />
    <p>Basic card horizontal not full width :</p>
    <br />
    <Card
      title="Préparer mon voyage"
      description="Les documents à prévoir avant votre voyage, les conseils..."
      svgName="calculator"
      fullWidth={false}
    />
    <br />
    <p>Basic card horizontal with click :</p>
    <br />
    <Card
      title="Préparer mon voyage"
      description="Les documents à prévoir avant votre voyage, les conseils..."
      svgName="train"
      fullWidth={true}
      // eslint-disable-next-line no-alert
      onClick={() => alert('clicked')}
    />
    <br />
    <p>Card with subtitle :</p>
    <br />
    <Card
      title="Info Douane Service"
      subtitle="0 800 84 40 40"
      description="
      Du lundi au vendredi, sauf jours fériés, de 8h30 à 18h.
      Service et appel gratuits."
      svgName="phone"
    />
    <br />
    <p>Basic card vertical :</p>
    <br />
    <div className="flex flex-row gap-4">
      <Card
        title="Mail"
        subtitle="0 800 84 40 40"
        description="Vous pouvez nous poser votre question par mail"
        svgName="mail"
        variant="vertical"
      />
      <Card
        title="Mail"
        subtitle="0 800 84 40 40"
        description="Vous pouvez nous poser votre question par mail"
        svgName="mail"
        variant="vertical"
      />
    </div>
    <br />
  </div>
);
