import { Meta, StoryObj } from '@storybook/react';

import { ActualityCard } from './ActualityCard';

const meta: Meta<typeof ActualityCard> = {
  title: 'Components/Business/ActualityCard',
  component: ActualityCard,
};

const todayDate = new Date();
const todayMilliseconds = todayDate.getTime();
const beforeMilliseconds = todayMilliseconds - 432000000;
const beforeDate = new Date(beforeMilliseconds);

export default meta;
type Story = StoryObj<typeof ActualityCard>;

export const Playground: Story = {
  args: {
    title: 'Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet',
    creationDate: new Date(),
    content:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
  },
};

export const Base = () => (
  <div>
    <ActualityCard
      title="CreationDate < 5 jours"
      creationDate={new Date()}
      content="Une ActualityCard récente (moins de 5 jours) affichera le temps écoulé depuis la date de création. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet ut perspiciatis unde omnis iste natus."
    />
    <br />
    <ActualityCard
      title="CreationDate ≥ 5 jours"
      creationDate={beforeDate}
      content="Une ActualityCard datant de plus de 5 jours affichera la date de création absolue au lieu du temps écoulé depuis la date de création. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet."
    />
  </div>
);
